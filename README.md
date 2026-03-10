# 🌋 九州の旅 2026.5.5–5.9

別府・阿蘇・高千穂・熊本を巡る4泊5日の旅行しおりです。

## 🚀 セットアップ手順

### 1. GitHubにリポジトリを作成
- GitHub で新しいリポジトリを作成（例: `kyushu-travel`）
- **Public** にする（GitHub Pages の無料利用に必要）

### 2. リポジトリ名を設定に反映
`vite.config.js` の `base` をリポジトリ名に合わせる：
```js
base: '/kyushu-travel/',  // ← 自分のリポジトリ名に変更
```

### 3. プッシュ
```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kyushu-travel.git
git push -u origin main
```

### 4. GitHub Pages を有効化
1. リポジトリの **Settings** → **Pages**
2. **Source** を **GitHub Actions** に変更
3. push すると自動でデプロイされる

### 5. 完成！
`https://YOUR_USERNAME.github.io/kyushu-travel/` でアクセス可能に！

## 🛠 ローカル開発
```bash
npm install
npm run dev
```
