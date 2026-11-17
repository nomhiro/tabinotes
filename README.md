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

## 共有しおり（中欧の旅）

共有用の画面は認証済みサイトとは別にGitHub Pagesで公開します。元のサイトのCloudflare Accessは変更しません。`dist-share` には `share/` の共有用データと画面だけを出力し、元の旅行コンポーネントや他の旅行は含めません。現時点で対応しているのは中欧の旅のみです。

共有画面では日程・地図・選択した予約情報を表示し、旅行者の名前、金額、予約番号やPINなどを除外します。元のしおりのすべてのメモ・歴史・会話などは含まれません。写真リンクが追加されている場合は共有されるため、**リンク先の画像内に写った名前や金額は隠せません**。予約の日時や宿泊先も共有されます。GitHub Pagesの共有URLは公開され、誰でも閲覧・転送できます。

`share/europe-2026.json` は手作業で確認した公開用コピーです。元のしおりから自動更新されません。日程を変更した場合は共有用コピーも更新し、氏名・金額・予約認証情報・個別の予約管理URLや写真の内容を確認してから再デプロイしてください。自動テストは確認の補助であり、公開内容の目視確認の代わりにはなりません。

### GitHub Pagesでの公開

GitHub Pagesの公開元をGitHub Actionsに設定すると、`.github/workflows/share-pages.yml` が `main` への関連する変更をビルド・公開します。共有URLは `https://nomhiro.github.io/tabinotes/europe-2026/` です。認証済みサイトへのリンク設定は変更しないため、URLは直接共有してください。GitHub PagesではCloudflare用の `_headers` は適用されず、配信済みの内容はキャッシュされる可能性があります。

```bash
npm run build:share:pages
```

このリポジトリ自体が公開されている場合、GitHub Pagesに含めない元データもリポジトリから閲覧できます。公開前にリポジトリの公開範囲も確認してください。

### Cloudflare Workerを使用する場合

1. Cloudflareに既存の認証済みWorkerとは別の `tabinotes-share` Workerと公開用の専用ホスト名を用意します。既存WorkerのAccessを解除したり、既存の `dist/` を公開したりしないでください。`wrangler-share.jsonc` は共有用アセットだけを配信し、workers.devとプレビューURLは無効です。
2. 手元で次のコマンドを実行し、生成した値を安全に保管します。値をGitにコミットしないでください。

   ```bash
   node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
   ```

3. 共有Workerのビルド環境変数 `SHARE_TOKEN` に生成した値を設定し、`npm ci && npm run build:share` を実行します。デプロイには `npx wrangler deploy --config wrangler-share.jsonc` を使用します。Cloudflare Buildsを使う場合は、共有Workerに別のビルド・デプロイ設定を設けます。`dist-share/` はビルドのたびに消去・再生成されるため、他のファイルを置かないでください。
4. 公開ホスト名で `https://公開ホスト名/生成した値/` がログインなしで開き、`/` と推測した別のパスが404になることを確認します。名前・費用・予約認証情報が表示されないこと、元のサイトとその `/assets/` が未認証では取得できないことも確認します。
5. 認証済みサイトのビルド環境変数 `VITE_EUROPE_SHARE_URL` に上記の完全なURL（末尾 `/` を含む）を設定し、元のWorkerを再ビルド・再デプロイします。中欧の旅のカバーにある「共有リンク」から確認・コピーできます。URLを設定しない場合は未設定と表示されます。

共有を停止するには共有Workerの公開ホスト名を外すかWorkerの配信を停止します。再発行するには新しいランダム値を生成し、共有Workerを再ビルド・再デプロイした後、認証済みサイトのURL設定も更新します。新しいビルドには古いパスは含まれません。ただし、既に保存・転送された内容は回収できません。

共有データとビルドの検証:

```bash
npm run test:share
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
