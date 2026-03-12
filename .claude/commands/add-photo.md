指定された写真リンク（$ARGUMENTS）を旅行しおりに追加する。

引数の形式: `{Google Photos URL} を {対象の場所名} に追加`
例: `/add-photo https://photos.app.goo.gl/XygMxP8aercFjZnH8 を さんふらわあ に追加`

手順:
1. 対象の場所名で src/trips/ 配下の旅行ファイル（.jsx）を検索
2. 該当する schedule item または booking/RENTAL_CAR オブジェクトを特定
3. `photo` フィールドに Google Photos 共有リンクURLを追加
   - schedule item の場合: `{ time: "...", label: "...", photo: "https://photos.app.goo.gl/..." }`
   - booking の場合: `booking: { title: "...", photo: "https://photos.app.goo.gl/...", details: [...] }`
   - RENTAL_CAR の場合: `const RENTAL_CAR = { title: "...", photo: "https://photos.app.goo.gl/...", details: [...] }`
4. npm run build でビルドエラーがないことを確認
5. 変更をコミットしてプッシュ
