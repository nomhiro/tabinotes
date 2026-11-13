import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 実機で動いている版を確認できるよう、コミットとビルド日時をアプリに埋め込む
function buildId() {
  let commit = 'unknown'
  try {
    commit = execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
  } catch {
    // git が使えないビルド環境では日時だけにする
  }
  return `${commit} ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC`
}

export default defineConfig({
  plugins: [react()],
  base: '/',
  define: {
    __BUILD_ID__: JSON.stringify(buildId()),
  },
})
