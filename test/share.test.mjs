import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { parse } from "@babel/parser";
import { buildShare } from "../scripts/build-share.mjs";

const source = await readFile(new URL("../src/trips/europe-2026/EuropeTrip.jsx", import.meta.url), "utf8");
const shared = await readFile(new URL("../share/EuropeSharedTrip.jsx", import.meta.url), "utf8");
const registry = await readFile(new URL("../src/trips/registry.js", import.meta.url), "utf8");
const membersLabel = registry.match(/id: 'europe-2026',[\s\S]*?members: '([^']+)'/)?.[1];
const members = membersLabel ? [membersLabel, ...membersLabel.split(/[ ・]+/).filter(name => name.length > 2)] : [];
const passengerNames = [...source.matchAll(/label: "(?:搭乗者|乗客)", value: "([^"]+)"/g)]
  .flatMap(match => match[1].split(/\s*[／/]\s*/))
  .filter(name => /[A-Za-z]/.test(name));
const passengerParts = passengerNames.flatMap(name => name.split(/[\s（]+/).filter(part => /^[A-Za-z]{4,}$/.test(part)));
const bookingSecrets = [...source.matchAll(/label: "(?:予約番号|予約コード|PIN番号|アクセスキー)", value: "([^"]+)"/g)]
  .map(match => match[1]);
bookingSecrets.push(...[...source.matchAll(/予約番号\s+([A-Z0-9]{6,})/g)].map(match => match[1]));
const bookingLinks = [...source.matchAll(/https:\/\/www\.getyourguide\.com\/booking\/[A-Za-z0-9]+/g)].map(match => match[0]);

function daysFrom(code) {
  const tree = parse(code, { sourceType: "module", plugins: ["jsx"] });
  return tree.program.body.flatMap(node => node.declarations || [])
    .find(node => node.id.name === "DAYS").init.elements;
}

function field(node, key) {
  return node.properties.find(property => property.key?.name === key)?.value;
}

test("共有用の全日程と画像を維持し、非公開情報を含めない", () => {
  assert.ok(members?.length && passengerNames.length && bookingSecrets.length);
  const originalDays = daysFrom(source);
  const publicDays = daysFrom(shared);
  assert.equal(publicDays.length, originalDays.length);
  for (const [index, day] of originalDays.entries()) {
    const original = field(day, "schedule").elements;
    const published = field(publicDays[index], "schedule").elements;
    assert.equal(published.length, original.length);
    for (const [itemIndex, item] of original.entries()) {
      assert.equal(field(published[itemIndex], "label")?.value, field(item, "label")?.value);
      for (const key of ["image", "coords", "photo", "mapUrl"]) {
        const originalValue = field(item, key);
        const sharedValue = field(published[itemIndex], key);
        assert.equal(
          sharedValue && shared.slice(sharedValue.start, sharedValue.end),
          originalValue && source.slice(originalValue.start, originalValue.end),
          `Day ${index}, item ${itemIndex}: ${key}`,
        );
      }
    }
  }
  for (const secret of [...members, ...passengerNames, ...passengerParts, ...bookingSecrets, ...bookingLinks]) {
    assert.ok(!shared.toLowerCase().includes(secret.toLowerCase()), "共有データに非公開情報が含まれています");
  }
  assert.doesNotMatch(shared, /[¥￥€£]|\b(?:HUF|CZK|EUR|JPY|USD)\b|予約番号|予約コード|PIN番号|アクセスキー/i);
});

test("トークンを検証し、公開ビルドを独立させて再発行時に旧リンクを除去する", async t => {
  const output = await mkdtemp(join(tmpdir(), "tabinotes-share-"));
  t.after(() => rm(output, { recursive: true, force: true }));
  await assert.rejects(buildShare("../invalid", output), /SHARE_TOKEN/);
  const first = "a".repeat(64);
  const second = "b".repeat(64);
  await buildShare(first, output);
  await assert.rejects(buildShare("", output), /SHARE_TOKEN/);
  assert.ok((await readdir(output)).includes(first));
  const html = await readFile(join(output, first, "index.html"), "utf8");
  const paths = [...html.matchAll(/(?:src|href)="(\/[^"]+\.(?:js|css))"/g)].map(match => match[1]);
  assert.equal(paths.length, 2);
  for (const path of paths) {
    assert.ok(path.startsWith(`/${first}/assets/`));
    const asset = await readFile(resolve(output, `.${path}`), "utf8");
    for (const secret of [...members, ...passengerNames, ...passengerParts, ...bookingSecrets, ...bookingLinks]) {
      assert.ok(!asset.toLowerCase().includes(secret.toLowerCase()), "公開アセットに非公開情報が含まれています");
    }
  }
  const headers = await readFile(join(output, "_headers"), "utf8");
  assert.match(headers, /Cache-Control: no-store/);
  assert.match(headers, /Referrer-Policy: no-referrer/);
  assert.match(headers, /X-Robots-Tag: noindex/);
  await buildShare(second, output);
  assert.deepEqual((await readdir(output)).sort(), [second, "_headers"].sort());
});

test("GitHub Pagesでは公開用パス以下に共有アセットだけを出力する", async t => {
  const output = await mkdtemp(join(tmpdir(), "tabinotes-pages-"));
  t.after(() => rm(output, { recursive: true, force: true }));
  await assert.rejects(buildShare("europe-2026", output, { pagesRepository: "../unsafe" }), /Invalid/);
  await assert.rejects(buildShare("../unsafe", output, { pagesRepository: "tabinotes" }), /Invalid/);
  await buildShare("europe-2026", output, { pagesRepository: "tabinotes" });
  assert.deepEqual(await readdir(output), ["europe-2026"]);
  const html = await readFile(join(output, "europe-2026", "index.html"), "utf8");
  const paths = [...html.matchAll(/(?:src|href)="(\/[^"]+\.(?:js|css))"/g)].map(match => match[1]);
  assert.equal(paths.length, 2);
  for (const path of paths) {
    assert.ok(path.startsWith("/tabinotes/europe-2026/assets/"));
    const asset = await readFile(resolve(output, `.${path.slice("/tabinotes".length)}`), "utf8");
    for (const secret of [...members, ...passengerNames, ...passengerParts, ...bookingSecrets, ...bookingLinks]) {
      assert.ok(!asset.toLowerCase().includes(secret.toLowerCase()), "公開アセットに非公開情報が含まれています");
    }
  }
  assert.ok((await readdir(join(output, "europe-2026", "phrases", "de"))).some(name => name.endsWith(".mp3")));
});
