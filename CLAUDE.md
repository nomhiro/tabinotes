# 旅のしおり

複数の旅行しおりを管理するアプリ。
React JSX + Vite で構築し GitHub Pages でデプロイ。
ハッシュルーティング（`#/` = 一覧、`#/trip/{id}` = 各旅行）でページ遷移。

## 技術スタック
- React (Vite)、CSS-in-JS (inline style + `<style>`)
- Leaflet + react-leaflet（日別マップ表示、OpenStreetMap タイル）
- フォント: Noto Serif JP + Zen Maru Gothic (Google Fonts CDN)
- デプロイ: GitHub Pages (GitHub Actions 自動ビルド)

## コマンド
- `npm run dev` - ローカル開発サーバ
- `npm run build` - 本番ビルド (dist/)
- `npm run preview` - ビルド結果のプレビュー

## ファイル構成
- `src/App.jsx` - ハッシュルーター（一覧 or 旅行しおりを切替）
- `src/trips/TripList.jsx` - 旅行一覧ページ
- `src/trips/registry.js` - 旅行メタデータ配列（TRIPS）
- `src/trips/kyushu-2026/KyushuTrip.jsx` - 九州旅行しおり（データ・スタイル・UI含む）
- `src/components/DayMap.jsx` - 日別マップコンポーネント（Leaflet、ピン＋ルート線）
- `src/main.jsx` - エントリポイント
- `vite.config.js` - base を GitHub リポジトリ名に合わせて設定
- `.github/workflows/deploy.yml` - GitHub Pages 自動デプロイ

## 規約
- 各旅行の .jsx ファイル冒頭にデータ定数（DAYS, RENTAL_CAR, COSTS）を定義
- 新しい旅行を追加するには: `src/trips/{id}/` にコンポーネント作成 → `registry.js` にエントリ追加
- schedule の `icon` と `label` で絵文字を重複させない
- 未確定の観光スポット・飲食店は勝手に追加しない
- 予約スクリーンショットは Google Photos 共有リンクで管理。schedule に `photo` フィールド（URL文字列）を追加するとタイムライン上に📷アイコンが表示される

## アクセシビリティ規約
新規コンポーネント作成・既存修正時に必ず守ること。

### HTML構造
- カバー → `<header>`、ナビバー → `<nav aria-label="日程ナビゲーション">`、コンテンツ → `<main>`
- タイトル → `<h1>`、日タイトル/費用タイトル → `<h2>`（見出しレベルを飛ばさない）
- 情報メモボックスの見出し → `<h3>`（`<div>` は NG。視覚的に見出しなら必ず見出し要素を使う）
- タイムライン → `<ol>` + `<li>`（list-style:none）
- 費用テーブル → `<table>` + `<tbody>` + `<tfoot>`（border-collapse:collapse、width:100%）
- カバーの装飾パターン → `aria-hidden="true"`
- DayMap の外側 div → `role="region" aria-label="本日のルートマップ"`（`role="img"` は NG、マップはインタラクティブ）
- DayMap ポップアップ内の色 → 時刻: `#756d65`、説明: `#6a6058`（`#888` `#555` は NG）

### キーボード操作
- 予約カード（div onClick）→ `role="button" tabIndex={0} onKeyDown={handleCardKeyDown} aria-expanded={...}`
- `handleCardKeyDown`: Enter / Space で発火、`e.preventDefault()` 必須
- ナビボタン → `aria-pressed={isActive}`

### 絵文字の扱い
- 装飾的な絵文字（タイムラインアイコン等）→ `<span aria-hidden="true">🏯</span>`
- WebLink / MapLink → `title` ではなく `aria-label` を使用、絵文字本体は `aria-hidden`
- booking-links 内 → `<span aria-hidden="true">🌐</span> 公式サイト`（テキスト併記）
- メモボックス内リンク → `<a className="memo-link" ...><span aria-hidden="true">🌐</span> 公式サイト</a>`
- 夕食 Map リンク → `<a className="dinner-map-link" ...><span aria-hidden="true">📍</span> Map</a>`
- DayMap ポップアップ内 → `<span aria-hidden="true">{icon}</span> {label}`

### フォーカス
- 全インタラクティブ要素に `:focus-visible` スタイルを定義
- `outline: none` を使わない（代替のフォーカスインジケーターがある場合のみ許可）
- cover-back リンク → `:focus-visible { outline:2px solid white; }`
- メモ内リンク → `.memo-link:focus-visible { outline:2px solid currentColor; outline-offset:1px; }`
- 夕食 Map リンク → `.dinner-map-link:focus-visible { outline:2px solid #5a8a6e; outline-offset:1px; }`
- AuthGate input/button → `<style>` 内に `:focus-visible` を定義（インラインスタイルでは不可）
- インラインスタイルのみのリンクにも CSS クラスを付与して `:focus-visible` を確保する

### コントラスト
- 禁止色（WCAG AA 未達）: `#9a918a`(~3.5:1)、`#8a7f76`(~3.5:1)、`#7a7068`(~3.8:1)、`#888`(~3.5:1)、`#555`(白背景では十分だが統一性のため非推奨)
- ミュートテキスト全般 → `#756d65`（時刻、日付、注釈、予約ラベル、トグル矢印、DayMapポップアップ時刻等）
- 説明テキスト（.tl-desc、ナビボタン、ジャンルバッジ等） → `#6a6058`
- フォームラベル → `#5a5048`
- カバーの opacity → label: 0.8以上、members: 0.85以上（0.65や0.7は NG）
- TripList の `.trip-card-members` → opacity: 0.85以上
- TripList の `.trip-list-label` → `#6a6058`
- AuthGate サブタイトル → `#756d65`
- インラインスタイル（JSX `style={{}}`）内の色も必ず監査する（CSS クラスだけでなく）
- CSS ルールの重複定義を避ける（同じセレクタが複数箇所にあると保守性が低下）

### モーション
- 全コンポーネントの `<style>` 末尾に `@media (prefers-reduced-motion: reduce)` を含める

### フォーム（AuthGate）
- 入力に `<label htmlFor="...">` 必須（placeholder だけは NG）
- エラーメッセージ → `id` + `aria-describedby` + `role="alert"`
- エラー時 → `aria-invalid="true"`

### アナウンスメント
- App.jsx: `aria-live="polite"` リージョンでページ遷移を通知
- 各旅行コンポーネント: `<main>` 内に `aria-live="polite"` でタブ切替（日程/費用）を通知
- sr-only スタイル → `clipPath: "inset(50%)"`（`clip: "rect(0,0,0,0)"` は非推奨）

## カスタムコマンド
- `/add-day-detail Day2` - 指定日のスケジュールを Web 検索で詳細化
- `/add-spot 水前寺成趣園をDay5に追加` - スポットを検索して追加
- `/add-photo {URL} を {場所名} に追加` - Google Photos リンクを予約データに紐づけ
- `/build-deploy` - ビルド＆コミット準備

## スキル
- `.claude/skills/travel-itinerary/` - 旅行しおり作成の全ワークフロー・UI設計ルール・参考実装
