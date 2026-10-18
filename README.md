# 旅のしおり

React + Viteで作成した旅行しおりです。配信はCloudflare Workers Static Assets、ソース管理と自動デプロイはCloudflare BuildsのGitHub連携を利用します。

## ローカル開発

```bash
npm ci
npm run dev
```

`npm run dev`はローカルのViteが見つからない場合、`predev`で`package-lock.json`に従って依存関係を復元します。GitHub Copilot AppのRun: devボタンもこのnpmスクリプトを実行するため、新しいworktreeでも初回起動時に必要な開発依存関係がインストールされます。Runボタン自体の起動設定はApp側の機能であり、このリポジトリからは変更できません。

## ビルド確認

```bash
npm run lint
npm run build
```

## 音声翻訳

旅行一覧の共通メニュー「音声翻訳」から、しおりとは独立した `#/translate` ページを開きます。ドイツ語（オーストリア）、ハンガリー語、チェコ語を選択し、日本語との双方向でマイク音声をAzure AI Speechによりテキストへ連続翻訳します。「入れ替え」で現地語→日本語と日本語→現地語を切り替えられます。相手の言葉を日本語で読むときにも、自分の日本語を現地語で相手に見せるときにも使えます。音声の読み上げは行いません。

途中結果と確定結果を表示し、停止・ページ移動時にマイクを解放します。言語や翻訳方向の切替時も聞き取りを停止するため、切替後にもう一度「翻訳を開始」を押してください。確定済みの翻訳には当時の翻訳方向を表示し、切替後も残します。

HTTPS（ローカル開発はlocalhost）、マイクの許可、インターネット接続が必要です。音声をAzureへ送信するため、相手の同意を得て利用してください。翻訳は直近100件を画面内だけに保持し、ページを離れると消えます。

操作欄を画面上部にまとめ、翻訳結果は画面の残りの高さと横幅を使って表示します。履歴が増えるとページをスクロールできます。使い方や方向切替時の注意は「使い方・注意事項」に折りたたんでおり、タップやキーボード操作で確認できます。

公開API接続先は `.env` の `VITE_SPEECH_TOKEN_URL` に設定しており、開発・本番ビルドの両方で使えます。別のAPIに接続する場合は `.env.local` で同じ変数を上書きします。ここにSpeechキーやトークンを記載してはいけません。

専用RGは `rg-trip-translator`（North Europe）。Azure Functionsが短期トークンを発行し、SpeechキーはAzure側に保持します。APIは試作用の公開エンドポイントで、インスタンスごとの簡易制限は厳密な不正利用対策・費用上限ではありません。Speech S0・Functions・Storage・監視は従量課金です。構成と再デプロイ手順は `api/README.md` を参照してください。

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
