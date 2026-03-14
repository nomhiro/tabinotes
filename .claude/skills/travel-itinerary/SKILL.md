---
name: travel-itinerary
description: 予約PDF等から旅行のしおり（React JSX）を作成するスキル。予約情報の抽出、観光・食事・料金のWeb検索、タイムライン形式のUI構築、GitHub Pagesデプロイまでを一貫して行う。旅行しおり、旅のしおり、旅行計画の作成時にトリガーする。
---

# 旅行しおり作成スキル

予約書類（PDF等）と旅行の概要から、見やすくて実用的な旅行のしおりをReact JSXで作成する。

## 全体フロー

### Phase 1: 情報収集
1. **予約PDFから情報抽出**: ホテル名・予約番号・住所・電話番号・チェックイン時間・料金・部屋タイプ・食事プラン、航空券の便名・座席・料金、レンタカーの出発返却場所・料金など
2. **ユーザーから概要ヒアリング**: 以下のチェックリストを参考に質問する
   - 旅行日程（具体的な日付）
   - メンバー（名前）
   - 出発地・移動手段（新幹線 / 飛行機 / 自家用車 / レンタカー）
   - 行きたいエリア・テーマ（桜・温泉・グルメなど）
   - 宿泊先の予約状況（予約済み → 詳細を聞く / 未定 → プレースホルダー設置）
   - 行きたい場所・やりたいこと（具体的 or おまかせ）
3. **未確定スポットの扱い**: ユーザーが明言していない観光地・飲食店は勝手に含めない。確認してから追加する
4. **予約情報が未定の場合**: `booking.details` にプレースホルダー（`"（後日追加）"`）を設置し、後から埋められるようにする

### Phase 2: 概要作成
1. 全日程のタイムラインをざっくり作成
2. 予約情報をすべて埋め込む
3. 費用一覧を作成
4. ユーザーに確認

### Phase 3: 各日の詳細化（1日ずつ順次）
1. **Web検索で調査**: 観光スポットの営業時間・料金・所要時間・見どころ・回り方のコツ
2. **具体的な時刻入りスケジュール作成**: 移動時間も考慮
3. **情報メモボックス追加**: 料金・営業時間・予約方法・TIPSなどを1つのボックスにまとめる
4. **リンク追加**: 各スポットに公式サイト（🌐）と Google Map（📍）のリンク
5. **ディナー候補**（食事なしプランの日）: 3〜4店を候補として掲載（ジャンル・特徴・電話番号・Mapリンク）

### Phase 4: リンク整備・地図マップ
- 全スポットに公式サイトリンク（🌐）と Google Maps リンク（📍）を追加
- 予約カード展開時に「🌐 公式サイト」「📍 Google Map」ボタンを表示
- Google Maps リンク形式: `https://maps.google.com/?q=スポット名` またはユーザー提供の短縮URL
- **各スポットに `coords: [lat, lng]` を追加**（Google Maps で正確な座標を確認）
- **DayMap コンポーネント**でDay別マップを表示（ピン＋移動ルート線）

### Phase 5: デプロイ準備
- Vite + React プロジェクトとして構成
- GitHub Actions で GitHub Pages に自動デプロイ
- `vite.config.js` の `base` をリポジトリ名に合わせる

## UIコンポーネント設計

### 全体構造
```
カバーページ（旅行タイトル・日程・メンバー、min-height:30vh）
ナビゲーションバー（Day1〜DayN + 費用タブ、sticky）
↓
日別コンテンツ or 費用一覧
```

### 日別コンテンツの構成
```
DAYラベル + 日付
タイトル（テーマカラー）
情報メモボックス（その日の重要情報。料金・営業時間・TIP等）
タイムライン（時刻・アイコン・ラベル・リンク・説明）
予約カード（展開式。予約番号・部屋・料金等 + 公式/Mapリンク）
レンタカーカード（該当日のみ表示）
ディナー候補カード（該当日のみ表示）
```

### データ構造
各日の schedule アイテム:
```js
{
  time: "09:00",           // 時刻表示
  label: "スポット名",      // ラベル（絵文字を含めない）
  desc: "説明文",           // 詳細テキスト
  icon: "🏯",              // アイコン絵文字（1つだけ）
  important: true,         // 重要フラグ（ドットに色がつく）
  url: "https://...",      // 公式サイトリンク（任意）
  mapUrl: "https://...",   // Google Map リンク（任意）
  coords: [32.8060, 130.7058], // 緯度経度（マップ表示用・任意）
}
```

`booking` はオプショナル。宿泊がない日（日帰り・最終日など）は省略可。
予約情報が未定の場合はプレースホルダーを設置:
```js
booking: {
  title: "ホテル名（仮）",
  details: [
    { label: "ホテル名", value: "（後日追加）" },
  ],
}
```

COSTS アイテムに `note`（任意）を追加可能:
```js
{ item: "高速代（名古屋→浜松）", cost: 2010, note: "ETC休日割引" }
```
`note` がある場合は費用一覧で項目名の横に小さく表示する。

dinner の options アイテムにも `coords` を追加可能:
```js
{ name: "店名", genre: "ジャンル", desc: "説明", tel: "...", mapUrl: "...", coords: [lat, lng] }
```

### 移動手段のバリエーション
- **レンタカー**: `RENTAL_CAR` 定数を定義し、該当日に予約カードとして表示
- **自家用車**: `RENTAL_CAR` は不要。高速料金は COSTS に記載、ルート情報は情報メモボックスや schedule の desc に記載
- **公共交通**: 予約がある場合は `booking` に新幹線・航空券情報を記載

### アクセシビリティ必須パターン

新しい旅行コンポーネントを作成する際は必ず以下を含めること。

#### ランドマーク・見出し構造
```jsx
<header className="cover">          {/* div ではなく header */}
  <a href="#/" className="cover-back">← 旅の一覧</a>  {/* 必ず設置 */}
  <div className="cover-pattern" aria-hidden="true" />
  <div className="cover-content">
    <h1 className="cover-title">旅行タイトル</h1>  {/* div ではなく h1 */}
  </div>
</header>

<nav className="nav-bar" aria-label="日程ナビゲーション">  {/* div ではなく nav */}
  <button aria-pressed={isActive}>  {/* 選択状態を通知 */}
    <span aria-hidden="true">{icon}</span> Day1  {/* 絵文字は aria-hidden */}
  </button>
</nav>

<main>  {/* コンテンツを main で囲む */}
  <h2 className="day-title">...</h2>  {/* div ではなく h2 */}
  <h2 className="cost-title">...</h2>
</main>
```

#### 情報メモボックスの見出し
```jsx
{/* 見出しは <h3>。<div> は NG — 視覚的に見出しなら見出し要素を使う */}
<h3 style={{ fontWeight:700, fontSize:".88rem", ... }}>
  ⛰ メモタイトル
  <a className="memo-link" href="..." target="_blank" rel="noopener noreferrer"
    style={{ fontSize:".75rem", ... }}>
    <span aria-hidden="true">🌐</span> 公式サイト
  </a>
</h3>
```

#### タイムライン（ol/li）
```jsx
<ol className="timeline">  {/* div ではなく ol */}
  <li className="tl-item">  {/* div ではなく li */}
    <div className="tl-dot" aria-hidden="true" />
    <span className="emoji" aria-hidden="true">{icon}</span>
  </li>
</ol>
```
CSS: `.timeline { list-style:none; }`

#### 費用テーブル
```jsx
<table className="cost-table" aria-label="旅費一覧"><tbody>
  <tr className="cost-row"><td>...</td><td>...</td></tr>
</tbody><tfoot>
  <tr className="cost-total"><td>...</td><td>...</td></tr>
</tfoot></table>
```
CSS: `.cost-table { width:100%; border-collapse:collapse; }` / `.cost-row td { ... }` / `.cost-total td { ... }`

#### 予約カード（キーボード対応）
```jsx
const handleCardKeyDown = (e, callback) => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); callback(); }
};

<div className="booking-card" role="button" tabIndex={0}
  aria-expanded={isExpanded}
  onClick={toggle}
  onKeyDown={e => handleCardKeyDown(e, toggle)}>
  <span aria-hidden="true">📋</span> タイトル
  <span className="booking-toggle" aria-hidden="true">▼</span>
</div>
```

#### WebLink / MapLink
```jsx
const WebLink = ({ href }) => href ? (
  <a href={href} target="_blank" rel="noopener noreferrer"
    aria-label="公式サイト" onClick={e=>e.stopPropagation()}>
    <span aria-hidden="true">🌐</span>
  </a>
) : null;
```

#### CSS必須項目
```css
/* フォーカススタイル — 全インタラクティブ要素に :focus-visible を定義 */
.nav-btn:focus-visible { outline:2px solid #2C2421; outline-offset:-2px; border-radius:2px; }
.booking-card:focus-visible { outline:2px solid #2C2421; outline-offset:1px; }
.cover-back:focus-visible { color:white; outline:2px solid white; outline-offset:2px; }
.booking-links a:focus-visible { outline:2px solid #5a8a6e; outline-offset:1px; }
.tl-links a:focus-visible { outline:2px solid #2C2421; outline-offset:1px; border-radius:2px; }
.memo-link:focus-visible { outline:2px solid currentColor; outline-offset:1px; border-radius:3px; }
.dinner-map-link:focus-visible { outline:2px solid #5a8a6e; outline-offset:1px; border-radius:3px; }

/* コントラスト — #9a918a, #8a7f76, #7a7068, #888 は禁止（WCAG AA 未達） */
.tl-time { color:#756d65; }
.tl-desc { color:#6a6058; }
.day-date { color:#756d65; }     /* #8a7f76 は NG */
.nav-btn { color:#6a6058; }      /* #7a7068 は NG */
.booking-toggle { color:#756d65; }
.booking-row-label { color:#756d65; }
.cost-note { color:#756d65; }
.cover-label { opacity:.8; }   /* .7 は NG */
.cover-members { opacity:.85; } /* .75 は NG */

/* モーション */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration:0.01ms!important; transition-duration:0.01ms!important; }
}
```

### デザインルール

#### フォント
- 本文: `'Noto Serif JP', 'Hiragino Mincho ProN', serif`
- UI要素: `'Zen Maru Gothic', sans-serif`

#### カラー
- 背景: `#F7F3ED`（和紙風）、テキスト: `#2C2421`
- 日ごとテーマカラーを配列で定義

#### 情報メモボックス
- 日ごとに背景グラデーションの色味を変える
- 内容: `<b>項目名</b>：値` の形式で改行区切り

#### 絵文字の重複禁止
- `icon` フィールドの絵文字がタイムライン左に表示されるため、`label` テキスト内に同じ絵文字を入れない

### DayMap（日別マップ）

各Dayタブにインタラクティブマップを表示する。Leaflet + OpenStreetMap（react-leaflet）を使用。

#### セットアップ
1. `npm install leaflet react-leaflet`
2. `index.html` の `<head>` に Leaflet CSS を追加:
   ```html
   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
   ```

#### コンポーネント
`src/components/DayMap.jsx` に共通コンポーネントとして配置。実装は `REFERENCE_DAYMAP.jsx` を参照。

- 外側 div → `role="region" aria-label="本日のルートマップ"`（`role="img"` は NG、マップはインタラクティブ）
- ポップアップ内の絵文字 → `<span aria-hidden="true">{icon}</span> {label}`
- ポップアップ内の色 → 時刻: `#756d65`、説明: `#6a6058`（`#888` `#555` は NG）
- Props: `schedule`（配列）, `color`（テーマカラー）, `dinner`（オプション）
- `coords` を持つアイテムだけフィルタしてピン表示
- 番号付きカスタムアイコン（`L.divIcon`）でデフォルトアイコン問題を回避
- テーマカラーの破線でスポット間を結ぶ移動ルート線（`Polyline`）
- 各ピンのポップアップにスポット名・時刻・説明
- `FitBounds` ヘルパーで全ピンが収まるよう自動ズーム
- `scrollWheelZoom={false}` でスクロール時の誤操作を防止

#### 配置
タイムラインの直前（情報メモボックスの下）に配置:
```jsx
{DAYS[activeDay].schedule.some(s => s.coords) && (
  <DayMap schedule={DAYS[activeDay].schedule} color={DAYS[activeDay].color} dinner={DAYS[activeDay].dinner} />
)}
```

#### 座標の取得
- Google Maps でスポットを検索し、URLの `@lat,lng` や `!3dlat!4dlng` から座標を取得
- `maps.app.goo.gl` 短縮URLは WebFetch でリダイレクト先URLから座標を読み取る
- 座標は `[lat, lng]` 形式（Leaflet標準）

## Web検索の指針

### 観光スポット調査時に調べること
- 営業時間・定休日・入場料（割引情報も）
- 所要時間の目安・おすすめの回り方
- 駐車場情報・予約要否（予約開始日・方法）
- 公式サイトURL

### 飲食店調査時に調べること
- ジャンル・名物メニュー・営業時間・予約の要否・電話番号

## 参考実装
- `.claude/skills/travel-itinerary/REFERENCE_COMPONENT.jsx` - 旅行しおり本体の完成版コンポーネント
- `.claude/skills/travel-itinerary/REFERENCE_DAYMAP.jsx` - DayMap（日別マップ）コンポーネント
