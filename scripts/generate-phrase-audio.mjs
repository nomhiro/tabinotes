// 会話フレーズの音声ファイルを Azure のニューラル音声で事前生成する。
//   npm run phrases:audio            … まだ無いファイルだけ作る
//   npm run phrases:audio -- --force … すべて作り直す
// 出力先: public/phrases/{言語コード}/{id}.mp3（ゆっくり版は {id}-slow.mp3）
// トークンは音声翻訳と同じ取得先（.env の VITE_SPEECH_TOKEN_URL）から取る。キーはリポジトリに置かない。

import { mkdir, writeFile, access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PHRASE_LANGS, PHRASES } from "../src/trips/europe-2026/phrases.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "phrases");
const FORCE = process.argv.includes("--force");
const SLOW_RATE = "-35%";
const OUTPUT_FORMAT = "audio-24khz-48kbitrate-mono-mp3";
const TOKEN_TTL_MS = 8 * 60 * 1000; // トークンの有効期限は10分。余裕を見て8分で取り直す

async function tokenUrl() {
  if (process.env.VITE_SPEECH_TOKEN_URL) return process.env.VITE_SPEECH_TOKEN_URL;
  const env = await readFile(path.join(ROOT, ".env"), "utf8").catch(() => "");
  const line = env.split(/\r?\n/).find((l) => l.startsWith("VITE_SPEECH_TOKEN_URL="));
  if (!line) throw new Error("VITE_SPEECH_TOKEN_URL が見つかりません（.env か環境変数で指定してください）");
  return line.slice("VITE_SPEECH_TOKEN_URL=".length).trim();
}

let cached = null;
async function getToken(url) {
  if (cached && Date.now() - cached.at < TOKEN_TTL_MS) return cached;
  const res = await fetch(url, { method: "POST" });
  if (!res.ok) throw new Error(`トークン取得に失敗しました（HTTP ${res.status}）`);
  const { authorizationToken, region } = await res.json();
  if (!authorizationToken || !region) throw new Error("トークン取得先の応答が不正です");
  cached = { token: authorizationToken, region, at: Date.now() };
  return cached;
}

const escapeXml = (s) => s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]);

function ssml(lang, text, slow) {
  const body = slow ? `<prosody rate="${SLOW_RATE}">${escapeXml(text)}</prosody>` : escapeXml(text);
  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${lang.locale}"><voice name="${lang.voice}">${body}</voice></speak>`;
}

async function synthesize(url, lang, text, slow) {
  for (let attempt = 1; ; attempt++) {
    const { token, region } = await getToken(url);
    const res = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": OUTPUT_FORMAT,
        "User-Agent": "tabinotes-phrase-audio",
      },
      body: ssml(lang, text, slow),
    });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    if (res.status === 401) cached = null;
    if (attempt >= 4 || ![401, 429, 500, 502, 503].includes(res.status)) {
      throw new Error(`音声合成に失敗しました（${lang.code} "${text}" HTTP ${res.status}）`);
    }
    await new Promise((r) => setTimeout(r, 1000 * 2 ** attempt));
  }
}

const exists = (p) => access(p).then(() => true, () => false);

async function main() {
  const url = await tokenUrl();
  let made = 0;
  let skipped = 0;
  for (const lang of PHRASE_LANGS) {
    await mkdir(path.join(OUT_DIR, lang.code), { recursive: true });
    for (const phrase of PHRASES) {
      const entry = phrase[lang.code];
      if (!entry) continue;
      for (const slow of [false, true]) {
        const file = path.join(OUT_DIR, lang.code, `${phrase.id}${slow ? "-slow" : ""}.mp3`);
        if (!FORCE && (await exists(file))) { skipped++; continue; }
        await writeFile(file, await synthesize(url, lang, entry.text, slow));
        made++;
        process.stdout.write(`✓ ${path.relative(ROOT, file)}\n`);
      }
    }
  }
  console.log(`完了: 生成 ${made} / スキップ ${skipped}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
