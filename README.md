# 旅のしおり

React + Viteで作成した旅行しおりです。配信はCloudflare Workers Static Assets、ソース管理と自動デプロイはCloudflare BuildsのGitHub連携を利用します。

## ローカル開発

```bash
npm ci
npm run dev
```

## ビルド確認

```bash
npm run lint
npm run build
```

## Cloudflare初回設定

1. Cloudflareで対象ドメインのDNSが管理されていることを確認する。
2. Wranglerを認証する。

   ```bash
   npx wrangler login
   npx wrangler whoami
   ```

3. Cloudflare Workers Freeプランで、アカウントIDを確認する。
4. Cloudflare Workers & PagesでGitHubリポジトリを接続し、`main`へのpushでCloudflare Buildsが実行されるようにする。認証を迂回するURLを増やさないため、Preview buildsは無効化する。
5. Cloudflare Workersで独自ドメインをWorkerに割り当てる。
6. Cloudflare Accessで独自ドメインをSelf-hosted applicationとして登録し、許可したメールアドレスまたはGoogle IdPだけに制限する。
7. 認証済みの独自ドメインで表示を確認した後、GitHub Pagesを停止する。

`wrangler.jsonc`では`workers.dev`とPreview URLを無効化しています。独自ドメインのCloudflare Accessを迂回できる公開URLは作成しません。

## 無料枠を維持する運用

- Workerは静的アセット配信だけに使用する。動的Workerコードは追加しない。
- Workers Freeプランを維持し、有料Workersプランへ切り替えない。
- D1、R2、KV、Workers AI、Queues、Durable Objectsなどの追加リソースを作成しない。
- 静的アセット配信は無料・無制限だが、Worker処理を追加した場合はFreeプランの日次リクエスト上限に近づくため、追加前に必ず料金と上限を確認する。
- Cloudflare Accessの許可ユーザー数をFreeプランの上限以内に保つ。
- `workers_dev`と`preview_urls`を有効化しない。
- CloudflareダッシュボードのWorkers使用量、プラン、Accessユーザー数を定期的に確認する。

## 自動デプロイ

Cloudflare Buildsが`main`へのpushを検知し、Viteのビルド後にCloudflare Workersへデプロイします。APIトークンをGitHub Secretsに保存する必要はありません。
