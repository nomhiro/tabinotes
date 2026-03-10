import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/tabinotes/', // ← GitHubリポジトリ名に合わせて変更
})
