import { cp, mkdir, rename, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";
import react from "@vitejs/plugin-react";

export async function buildShare(token, output, { pagesRepository } = {}) {
  const isPages = pagesRepository !== undefined;
  if (!isPages && !/^[a-f0-9]{64}$/.test(token || "")) {
    throw new Error("SHARE_TOKEN must be 64 lowercase hexadecimal characters generated from 32 random bytes.");
  }
  if (isPages && (!/^[a-zA-Z0-9_-][a-zA-Z0-9._-]*$/.test(pagesRepository) || token !== "europe-2026")) {
    throw new Error("Invalid GitHub Pages repository or public share path.");
  }

  await build({
    configFile: false,
    root: resolve("share"),
    base: isPages ? `/${pagesRepository}/${token}/` : `/${token}/`,
    publicDir: false,
    plugins: [react()],
    build: {
      outDir: output,
      emptyOutDir: true,
      assetsDir: "assets",
      sourcemap: false,
    },
  });
  await mkdir(resolve(output, token), { recursive: true });
  await rename(resolve(output, "index.html"), resolve(output, token, "index.html"));
  await rename(resolve(output, "assets"), resolve(output, token, "assets"));
  await cp(resolve("public/phrases"), resolve(output, token, "phrases"), { recursive: true });
  if (!isPages) {
    await writeFile(resolve(output, "_headers"), [
      "/*",
      "  Cache-Control: no-store",
      "  Referrer-Policy: no-referrer",
      "  X-Robots-Tag: noindex, nofollow, noarchive",
      "",
    ].join("\n"));
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  if (process.argv.slice(2).includes("--pages")) {
    const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] || "tabinotes";
    await buildShare("europe-2026", resolve("dist-share"), { pagesRepository: repository });
  } else {
    await buildShare(process.env.SHARE_TOKEN, resolve("dist-share"));
  }
}
