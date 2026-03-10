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

## カスタムコマンド
- `/add-day-detail Day2` - 指定日のスケジュールを Web 検索で詳細化
- `/add-spot 水前寺成趣園をDay5に追加` - スポットを検索して追加
- `/build-deploy` - ビルド＆コミット準備

## スキル
- `.claude/skills/travel-itinerary/` - 旅行しおり作成の全ワークフロー・UI設計ルール・参考実装
