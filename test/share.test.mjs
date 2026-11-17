import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { buildShare } from "../scripts/build-share.mjs";

const days = JSON.parse(await readFile(new URL("../share/europe-2026.json", import.meta.url), "utf8"));
const source = await readFile(new URL("../src/trips/europe-2026/EuropeTrip.jsx", import.meta.url), "utf8");
const registry = await readFile(new URL("../src/trips/registry.js", import.meta.url), "utf8");
const membersLabel = registry.match(/id: 'europe-2026',[\s\S]*?members: '([^']+)'/)?.[1];
const members = membersLabel ? [membersLabel, ...membersLabel.split(/[ ・]+/).filter(name => name.length > 2)] : [];
const passengerNames = [...source.matchAll(/label: "搭乗者", value: "([^"]+)"/g)]
  .flatMap(match => match[1].split(/\s*[／/]\s*/));
const passengerParts = passengerNames.flatMap(name => name.split(/\s+/).filter(part => part.length > 3));
const bookingSecrets = [...source.matchAll(/label: "(?:予約番号|予約コード|PIN番号|アクセスキー)", value: "([^"]+)"/g)]
  .map(match => match[1]);

test("共有データは日程と予約情報だけを含み、名前・金額・予約認証情報を含まない", () => {
  assert.ok(members?.length && passengerNames.length && bookingSecrets.length);
  assert.equal(days.length, 9);
  const json = JSON.stringify(days);
  for (const secret of [...members, ...passengerNames, ...passengerParts, ...bookingSecrets]) {
    assert.ok(!json.toLowerCase().includes(secret.toLowerCase()), "共有データに非公開情報が含まれています");
  }
  assert.doesNotMatch(json, /[¥￥€£]|(?:HUF|CZK|EUR|JPY|USD)|円|料金|運賃|費用|無料|有料|支払|金額|予約番号|予約コード|PIN番号|アクセスキー/i);
  for (const day of days) {
    assert.deepEqual(Object.keys(day).sort(), ["bookings", "date", "day", "schedule", "title"]);
    assert.ok(day.schedule.length);
    for (const item of day.schedule) {
      assert.ok(Object.keys(item).every(key => ["time", "label", "icon", "desc", "mapUrl", "photo", "coords"].includes(key)));
      for (const [field, hosts] of [["mapUrl", ["maps.google.com", "www.google.com", "maps.app.goo.gl"]], ["photo", ["photos.app.goo.gl", "photos.google.com"]]]) {
        if (!item[field]) continue;
        const url = new URL(item[field]);
        assert.equal(url.protocol, "https:");
        assert.ok(hosts.includes(url.hostname));
      }
    }
    for (const booking of day.bookings) {
      assert.ok(Object.keys(booking).every(key => ["details", "title", "photo"].includes(key)));
      if (booking.photo) {
        const url = new URL(booking.photo);
        assert.equal(url.protocol, "https:");
        assert.ok(["photos.app.goo.gl", "photos.google.com"].includes(url.hostname));
      }
      for (const detail of booking.details) assert.deepEqual(Object.keys(detail).sort(), ["label", "value"]);
    }
  }
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
    for (const secret of [...members, ...passengerNames, ...passengerParts, ...bookingSecrets]) {
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
