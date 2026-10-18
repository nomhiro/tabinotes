const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const vm = require("node:vm");

const source = readFileSync(join(__dirname, "../src/functions/speechToken.js"), "utf8");

function createHandler({ env = {}, fetch = async () => new Response("test-token") } = {}) {
  let handler;
  const errors = [];
  vm.runInNewContext(source, {
    require(name) {
      if (name === "@azure/functions") {
        return { app: { http: (_, options) => { handler = options.handler; } } };
      }
      return require(name);
    },
    process: { env },
    fetch,
    AbortSignal,
  });
  return {
    request: (method = "POST", client = "192.0.2.1") => handler({
      method,
      headers: new Headers({ "x-forwarded-for": client }),
    }, { error: message => errors.push(message) }),
    errors,
  };
}

const configured = { SPEECH_KEY: "fake-key", SPEECH_REGION: "northeurope" };

test("preflight succeeds without credentials or an upstream call", async () => {
  const app = createHandler({ fetch: () => assert.fail("Unexpected token request") });
  const result = await app.request("OPTIONS");
  assert.equal(result.status, 204);
  assert.equal(result.headers["Access-Control-Allow-Origin"], "*");
});

test("missing configuration reports 503 and logs an explicit error", async () => {
  const app = createHandler();
  assert.equal((await app.request()).status, 503);
  assert.equal(app.errors.length, 1);
});

test("returns the token and region without permitting caches", async () => {
  const app = createHandler({
    env: configured,
    fetch: async (url, options) => {
      assert.equal(url, "https://northeurope.api.cognitive.microsoft.com/sts/v1.0/issueToken");
      assert.equal(options.headers["Ocp-Apim-Subscription-Key"], "fake-key");
      return new Response("test-token");
    },
  });
  const result = await app.request();
  assert.equal(result.status, 200);
  assert.equal(result.jsonBody.authorizationToken, "test-token");
  assert.equal(result.jsonBody.region, "northeurope");
  assert.equal(result.headers["Cache-Control"], "no-store");
  assert.equal(JSON.stringify(result).includes("fake-key"), false);
});

test("upstream failure, empty token, and network error fail closed", async () => {
  for (const fetch of [
    async () => new Response("private upstream message", { status: 401 }),
    async () => new Response(""),
    async () => { throw new Error("private upstream exception"); },
  ]) {
    const app = createHandler({ env: configured, fetch });
    const result = await app.request();
    assert.equal(result.status, 502);
    assert.equal(app.errors.length, 1);
    assert.equal(JSON.stringify(result).includes("private"), false);
  }
});

test("seventh request is limited per client; preflight does not consume budget", async () => {
  const app = createHandler({ env: configured });
  for (let i = 0; i < 6; i++) {
    assert.equal((await app.request("OPTIONS")).status, 204);
    assert.equal((await app.request()).status, 200);
  }
  assert.equal((await app.request()).status, 429);
  assert.equal((await app.request("POST", "192.0.2.2")).status, 200);
});
