import { useState } from "react";
import DayMap from "../../components/DayMap";
import PlacePreview from "../../components/PlacePreview";

const PRAGUE_OLD_TOWN_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Prague_Old_Town.JPG?width=1200",
  alt: "赤い屋根が連なるプラハ旧市街の街並み",
  credit: "Kallerna / Wikimedia Commons / Public domain",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Prague_Old_Town.JPG",
};

// ─── データ定数 ───────────────────────────────────────────────────────────────

const DAYS = [
  {
    day: 0,
    date: "11月17日（火）",
    title: "前日移動 ─ 羽田第3ターミナルへ",
    color: "#5a6a8a",
    icon: "✈",
    schedule: [
      { time: "〜21:05", label: "羽田 第3ターミナル 到着（推奨）", desc: "出発3時間前。首都圏外から向かう場合は夕方に出発。新幹線なら品川・浜松町乗換でモノレール or 京急", icon: "🚄", important: true },
      { time: "深夜", label: "保安検査・出国", desc: "搭乗は日付が変わる直前（00:05発）。免税ショップや両替はターミナル内で", icon: "🛂" },
    ],
  },
  {
    day: 1,
    date: "11月18日（水）",
    title: "羽田発 ─ ドバイ乗継 ─ ブダペスト着 ＆ 王宮の丘・夜景コース",
    color: "#7a5c9a",
    icon: "🛫",
    schedule: [
      { time: "00:05 JST", label: "羽田（HND）出発", desc: "EK313・エミレーツ。第3ターミナル。Boeing 777-300ER／飛行11時間50分", icon: "✈", important: true },
      { time: "06:55 DXB", label: "ドバイ（DXB）着", desc: "EK313到着。乗継 3時間10分。ターミナル3内で乗り継ぎ", icon: "🇦🇪" },
      { time: "10:05 DXB", label: "ドバイ（DXB）発", desc: "EK111・エミレーツ。Boeing 777-300ER／飛行6時間。現地時間", icon: "✈" },
      { time: "13:05 BUD", label: "ブダペスト（BUD）着", desc: "EK111到着。ターミナル2B。入国審査でEES（EU新入域システム）の生体登録があり通常より時間がかかる可能性あり。総所要21時間", icon: "🏁", important: true, coords: [47.4369, 19.2556] },
      { time: "14:00頃", label: "100E エアポートエクスプレス 乗車", desc: "市内行き直通バスに乗車。ホテル最寄りの「Kálvin tér M（カービン広場）」で降車（約35分・専用券 2,500HUF/人・クレカタッチ決済可）", icon: "🚌", coords: [47.4369, 19.2556] },
      { time: "14:45頃", label: "Kálvin tér M 降車 ─ ホテルへ移動", desc: "Kálvin térから徒歩約10分、または地下鉄M4線で1駅「Rákóczi tér」へ（徒歩3分）", icon: "🚶", coords: [47.4896, 19.0617] },
      { time: "15:00頃", label: "The Amberlyn Suite Hotel チェックイン", desc: "チェックインして荷物を置きひと息・身支度。キッチン・リビング付きスイートアパートホテル（2泊）", icon: "🏨", important: true, url: "https://www.booking.com/hotel/hu/the-amberlyn-aparthotel.ja.html", mapUrl: "https://maps.google.com/?q=The+Amberlyn+Suite+Hotel+Budapest", coords: [47.4937, 19.0682] },
      { time: "15:45", label: "ホテル出発 ─ ドナウ河畔・くさり橋へ", desc: "トラム47/49番でDeák Ferenc tér経由、または地下鉄M4＋トラム2番でドナウ河畔へ移動。くさり橋ペシュト側へ", icon: "🚃", coords: [47.4937, 19.0682] },
      { time: "16:15", label: "くさり橋（Széchenyi Lánchíd）渡橋", desc: "【コース1】ドナウ川にかかるブダペスト最古の美しい吊り橋。歩行者専用歩道を歩きながらペシュト側からブダ側へ渡橋（徒歩約15分）。日没（16:15頃）の夕暮れの光が差し込む絶景", icon: "🌉", important: true, mapUrl: "https://maps.google.com/?q=Sz%C3%A9chenyi+L%C3%A1nch%C3%ADd", coords: [47.4990, 19.0437] },
      { time: "16:30", label: "ヴァールケルト・バザール（Várkert Bazár）", desc: "【コース2】王宮の東麓に広がるネオルネサンス様式の庭園・回廊建築（ミクローシュ・イブル設計）。美しい庭園からエスカレーター/エレベーターを使って王宮の丘へ無料で上がれる（徒歩5分）", icon: "🏛", url: "https://varkertbazar.hu/", mapUrl: "https://maps.google.com/?q=V%C3%A1rkert+Baz%C3%A1r+Budapest", coords: [47.4947, 19.0416] },
      { time: "16:45", label: "ブダ王宮（Budavári Palota）＆ 展望テラス", desc: "【コース3】歴代国王の居城であった壮大な宮殿。サヴォイア公オイゲン騎馬像前のテラスから、夕暮れ〜ライトアップで黄金に輝き始めるドナウ川・くさり橋・対岸の国会議事堂を一望（徒歩15分）", icon: "🏰", important: true, url: "https://budacastlebudapest.com/", mapUrl: "https://maps.google.com/?q=Buda+Castle+Budapest", coords: [47.4962, 19.0396] },
      { time: "17:15", label: "ルスヴルム・ツクラースダ（Ruszwurm Cukrászda）", desc: "【コース4】1827年創業、王宮の丘で最も古くハプスブルク皇妃エリザベート（シシィ）も愛した老舗カフェ。名物の伝統カスタードケーキ「ルスヴルム・クレーメシュ」で優雅なカフェ休憩（徒歩1分）", icon: "☕", important: true, url: "http://www.ruszwurm.hu/", mapUrl: "https://maps.google.com/?q=Ruszwurm+Cukr%C3%A1szda+Budapest", coords: [47.5015, 19.0331] },
      { time: "17:50", label: "三位一体広場（Szentháromság tér）", desc: "【コース5】王宮地区の中心広場。ペスト終息を神に感謝して18世紀初頭に建てられたバロック様式の「三位一体の柱」が中央にそびえる（徒歩すぐ）", icon: "🏛", mapUrl: "https://maps.google.com/?q=Szenth%C3%A1roms%C3%A1g+t%C3%A9r+Budapest", coords: [47.5017, 19.0341] },
      { time: "18:00", label: "マーチャーシュ教会（Mátyás-templom）", desc: "【コース6】歴代ハンガリー国王の戴冠式が行われたゴシック様式の名教会。色鮮やかなジョルナイ製ダイヤモンド柄の屋根瓦と壮麗な尖塔がライトアップされて夜空に浮かび上がる（徒歩すぐ）", icon: "⛪", important: true, url: "https://matyas-templom.hu/", mapUrl: "https://maps.google.com/?q=Matthias+Church+Budapest", coords: [47.5019, 19.0342] },
      { time: "18:20", label: "漁夫の砦（Halászbástya）", desc: "【コース7】7つの尖塔と白亜の回廊が連なるロマンチックな展望砦。回廊のアーチ窓越しに、漆黒のドナウ川と黄金色に輝く国会議事堂を見渡すブダペスト随一の夜景名所（徒歩すぐ・夜間は上層テラスも無料開放）", icon: "🏰", important: true, url: "https://www.fishermansbastion.com/", mapUrl: "https://maps.google.com/?q=Fisherman%27s+Bastion+Budapest", coords: [47.5022, 19.0347] },
      { time: "18:50", label: "ホワイト・レイヴン・スカイバー＆ラウンジ", desc: "【コース8・GOAL】ヒルトン・ブダペストの屋上に位置する最高峰ルーフトップバー。マーチャーシュ教会の屋根瓦とドナウ夜景を間近に見下ろしながら、特製カクテルとディナーで初日の夜を乾杯（スマートカジュアル・要事前予約）", icon: "🍸", important: true, url: "https://whiteravenskybar.com/", mapUrl: "https://maps.google.com/?q=White+Raven+Skybar+Budapest", coords: [47.5027, 19.0340] },
      { time: "21:00", label: "ホテル帰着 ＆ 就寝", desc: "三位一体広場前から16番バスでDeák Ferenc térへ（約10分）。地下鉄M4でThe Amberlyn Suite Hotelへ戻り就寝", icon: "🏨", coords: [47.4937, 19.0682] },
    ],
    booking: {
      title: "エミレーツ航空券（往路）",
      details: [
        { label: "予約番号", value: "K78ZN2" },
        { label: "搭乗者", value: "Mr Hiroki Nomura ／ Ms Rino Nomura" },
        { label: "区間", value: "東京（羽田）→ ドバイ → ブダペスト" },
        { label: "便名", value: "EK313 ／ EK111" },
        { label: "出発", value: "2026年11月18日（水）00:05 羽田（HND）" },
        { label: "到着", value: "2026年11月18日（水）13:05 ブダペスト（BUD）" },
        { label: "所要時間", value: "21時間00分（ドバイ乗継 3時間10分）" },
        { label: "機材", value: "Boeing 777-300ER（両便）" },
        { label: "運賃", value: "エコノミー ／ Saver（確定）" },
      ],
      url: "https://www.emirates.com/jp/japanese/manage-booking/",
    },
    extraBookings: [
      {
        key: "amberlyn-hotel-d1",
        icon: "🏨",
        title: "The Amberlyn Suite Hotel（ブダペスト 2泊）",
        url: "https://www.booking.com/hotel/hu/the-amberlyn-aparthotel.ja.html",
        mapUrl: "https://maps.google.com/?q=The+Amberlyn+Suite+Hotel+Budapest",
        details: [
          { label: "施設名", value: "The Amberlyn Suite Hotel（ジ・アンバリン スイート ホテル）" },
          { label: "宿泊期間", value: "2026年11月18日（水）〜 11月20日（金）（2泊）" },
          { label: "部屋・人数", value: "大人2名 ／ 1部屋（スイート）" },
          { label: "住所", value: "1085 Budapest, Rökk Szilárd u. 4, Hungary" },
          { label: "最寄り", value: "地下鉄M4「Rákóczi tér」駅 徒歩3分 ／ 100Eバス「Kálvin tér」徒歩約10分" },
          { label: "チェックイン", value: "15:00〜 ／ チェックアウト 〜11:00" },
          { label: "料金目安", value: "約 €150（約¥25,000 / 2泊・現地宿泊税4%別途）" },
          { label: "予約状況", value: "Booking.com（手配予定）" },
        ],
      },
    ],
    memo: {
      bg: "linear-gradient(135deg,#f0eef8,#ede8f5)",
      border: "#c8bce8",
      titleColor: "#5a3a9a",
      textColor: "#3a2a6a",
      icon: "🇭🇺",
      title: "ブダペスト初日 ＆ 王宮の丘コース情報メモ",
      body: (
        <>
          <b>100E エアポートエクスプレス</b>：空港 ⇄ 市内を約35〜40分で結ぶ直通バス（専用券 2,500HUF/人・約¥1,050）。車内決済端末にクレカタッチ決済で乗車可能。<br/>
          <b>王宮の丘へのアクセス</b>：くさり橋を渡った後、ヴァールケルト・バザール（Várkert Bazár）の庭園内にあるエレベーター＆エスカレーターを利用すると、王宮の丘上層まで無料でスムーズに上がれます。<br/>
          <b>ルスヴルム・ツクラースダ（Ruszwurm）</b>：1827年創業。名物「ルスヴルム・クレーメシュ（Ruszwurm krémes）」は必食の伝統カスタードパイ。営業時間 10:00〜19:00。<br/>
          <b>漁夫の砦（Halászbástya）</b>：夜間は上層展望テラスも無料開放。アーチ窓から国会議事堂のライトアップを望む絶景写真スポット。<br/>
          <b>ホワイト・レイヴン・スカイバー（White Raven）</b>：ヒルトン屋上（14:00〜24:00）。人気店のため公式サイト（whiteravenskybar.com）から3週間前より要予約（スマートカジュアル）。<br/>
          <b>日の入り時刻</b>：11月中旬は16:15頃。16時過ぎから日没のマジックアワーとライトアップが始まり、王宮の丘からの夜景が最も美しい時間帯になります。
        </>
      ),
    },
  },
  {
    day: 2,
    date: "11月19日（木）",
    title: "ブダペスト ─ 国会議事堂・アンドラーシ通り・英雄広場 ＆ ナイトクルーズ",
    color: "#7a5c9a",
    icon: "🏰",
    schedule: [
      { time: "09:00", label: "ホテル出発 → Kossuth Lajos térへ", desc: "地下鉄M4（Rákóczi tér → Kálvin tér）＋ M3/M2線に乗換えて「Kossuth Lajos tér」駅へ移動（約20分）", icon: "🚇", coords: [47.4937, 19.0682] },
      { time: "09:30", label: "ハンガリー国会議事堂（Országház）", desc: "【コース1】ドナウ河畔に佇む壮麗なネオゴシック建築。大階段の間・ドームの間（聖イシュトヴァーンの王冠）・旧上院議場を巡る内部ツアー（非EU大人14,000HUF・要事前予約）。河畔の「ドナウ川遊歩道の靴」もすぐ（徒歩10分）", icon: "🏛", important: true, url: "https://www.parlament.hu/en/web/house-of-the-national-assembly/", mapUrl: "https://maps.google.com/?q=Hungarian+Parliament+Building", coords: [47.5071, 19.0457] },
      { time: "10:45", label: "旧郵便貯金局（Postatakarékpénztár）", desc: "【コース2】「ハンガリーのガウディ」レフネル・エデン設計のアール・ヌーヴォー建築傑作（現ハンガリー国立銀行別館・Hold u. 4）。ジョルナイ陶器のカラフルな屋根飾りやミツバチ・植物モチーフの外観レリーフが見どころ（外観見学・徒歩5分）", icon: "🏦", mapUrl: "https://maps.google.com/?q=Postatakar%C3%A9kp%C3%A9nzt%C3%A1r+Hold+utca+4+Budapest", coords: [47.5034, 19.0532] },
      { time: "11:15", label: "聖イシュトヴァーン大聖堂（Szent István-bazilika）", desc: "【コース3】初代国王を祀るブダペスト最大のカトリック教会。高さ96mの大ドーム、黄金の天井装飾、聖遺物（右手のミイラ）が見どころ。展望パノラマテラスからは市内360度を一望（徒歩10分）", icon: "⛪", important: true, url: "https://www.bazilika.biz/", mapUrl: "https://maps.google.com/?q=St.+Stephen%27s+Basilica+Budapest", coords: [47.5009, 19.0540] },
      { time: "12:00", label: "アンドラーシ通り（Andrássy út）散策 ＆ ランチ", desc: "【コース4】「ブダペストのシャンゼリゼ」と称される世界遺産の大通り。優美な19世紀貴族邸宅が並ぶ並木道を散策しながら、伝統レストランで名物グヤーシュやパプリカーシュ・チルケのランチ（徒歩3分）", icon: "🍽", important: true, mapUrl: "https://maps.google.com/?q=Andr%C3%A1ssy+%C3%BAt+Budapest", coords: [47.5018, 19.0583] },
      { time: "13:30", label: "ハンガリー国立歌劇場（Magyar Állami Operaház）", desc: "【コース5】ミクローシュ・イブル設計によるネオルネサンス様式の豪奢な歌劇場。大理石の大階段、金箔とフレスコ画で飾られた壮麗な客席、スフィンクス像が美しい（徒歩10分）", icon: "🎭", url: "https://www.opera.hu/", mapUrl: "https://maps.google.com/?q=Hungarian+State+Opera+House", coords: [47.5028, 19.0582] },
      { time: "14:15", label: "リスト・フェレンツ記念館（Liszt Ferenc Emlékmúzeum）", desc: "【コース6】大作曲家フランツ・リストが晩年に暮らした旧音楽院のアパートメント（Vörösmarty u. 35）。愛用のベーゼンドルファーやチッカリングのピアノ、直筆楽譜、書斎が当時のまま保存されている（入場2,000HUF・徒歩7分）", icon: "🎼", important: true, url: "https://lisztmuseum.hu/", mapUrl: "https://maps.google.com/?q=Liszt+Ferenc+Memorial+Museum+Budapest", coords: [47.5070, 19.0664] },
      { time: "15:15", label: "英雄広場（Hősök tere）", desc: "【コース7】地下鉄M1線（世界遺産）に乗車またはアンドラーシ通りを進み、ハンガリー建国1000年を記念して造られた大広場へ。大天使ガブリエル像と歴代英雄の列柱像が立ち並ぶ（徒歩3分）", icon: "🏛", important: true, mapUrl: "https://maps.google.com/?q=H%C5%91s%C3%B6k+tere+Budapest", coords: [47.5149, 19.0779] },
      { time: "15:45", label: "市民公園（Városliget）", desc: "【コース8】英雄広場の背後に広がる広大な歴史的公園。池やヴァイダフニャディ城の景観を楽しみながら散策（徒歩8分）", icon: "🌳", url: "https://ligetbudapest.hu/", mapUrl: "https://maps.google.com/?q=V%C3%A1rosliget+Budapest", coords: [47.5142, 19.0833] },
      { time: "16:15", label: "国立民族博物館（Néprajzi Múzeum）", desc: "【コース9・GOAL】市民公園内に2022年オープンした世界最高峰の現代建築（リゲット・ブダペスト計画）。緩やかに湾曲した巨大な屋上緑地テラスから公園と市内を一望。伝統文化・民族資料の充実展示（GOAL）", icon: "🏛", important: true, url: "https://www.neprajz.hu/", mapUrl: "https://maps.google.com/?q=Museum+of+Ethnography+Budapest", coords: [47.5126, 19.0805] },
      { time: "18:00", label: "ペシュト中心部へ移動 ＆ ディナー", desc: "世界遺産の地下鉄M1線（レトロな黄色い車両）で市内中心Vörösmarty tér方面へ戻りディナー。乗船場所のヴィガード広場（Vigadó tér）へ移動", icon: "🍽", coords: [47.4950, 19.0505] },
      { time: "20:00", label: "ドナウ川 ナイト観光クルーズ（ウェルカムドリンク付）", desc: "Vigadó tér 5番桟橋（Mahart Cruises）から出航。漆黒のドナウ川から黄金色に輝く国会議事堂・ブダ城・くさり橋を船上から一望する約1時間のパノラマクルーズ（ドリンク1杯付）", icon: "🚢", important: true, url: "https://www.getyourguide.com/ja-jp/budapest-l29/budapest-by-night-sightseeing-cruise-with-welcome-drink-t69093/?ranking_uuid=fe4b4ba7-6cca-4332-84b1-3f2915ccea8c&q=%E3%82%AF%E3%83%AB%E3%83%BC%E3%82%BA%EF%BC%86%E3%83%9C%E3%83%BC%E3%83%88%E3%83%84%E3%82%A2%E3%83%BC%2C+%E3%83%96%E3%83%80%E3%83%9A%E3%82%B9%E3%83%88", coords: [47.4950, 19.0505] },
      { time: "21:30", label: "ホテル帰着 ＆ 翌朝の移動準備", desc: "The Amberlyn Suite Hotelへ帰着。翌朝のウィーン行きRailjet（Keleti 08:40発）に向けて荷造り・就寝", icon: "🏨", coords: [47.4937, 19.0682] },
    ],
    booking: {
      title: "ドナウ川 ナイト観光クルーズ（GetYourGuide）",
      details: [
        { label: "ツアー名", value: "ブダペスト：ウェルカムドリンク付き ナイト観光クルーズ" },
        { label: "日時目安", value: "2026年11月19日（木）夜（20:00頃出航便推奨）" },
        { label: "所要時間", value: "約50〜60分" },
        { label: "集合場所", value: "Vigadó tér 5. ponton（ヴィガード広場 第5桟橋・Mahart Cruises）" },
        { label: "含まれるもの", value: "クルーズ乗船券、ウェルカムドリンク1杯（スパークリングワイン/ワイン/ジュース等）" },
        { label: "料金目安", value: "約 €18 / 人（2名で約 ¥6,000）" },
        { label: "予約サイト", value: "GetYourGuide（商品コード: t69093）" },
      ],
      url: "https://www.getyourguide.com/ja-jp/budapest-l29/budapest-by-night-sightseeing-cruise-with-welcome-drink-t69093/?ranking_uuid=fe4b4ba7-6cca-4332-84b1-3f2915ccea8c&q=%E3%82%AF%E3%83%AB%E3%83%BC%E3%82%BA%EF%BC%86%E3%83%9C%E3%83%BC%E3%83%88%E3%83%84%E3%82%A2%E3%83%BC%2C+%E3%83%96%E3%83%80%E3%83%9A%E3%82%B9%E3%83%88",
    },
    extraBookings: [
      {
        key: "amberlyn-hotel-d2",
        icon: "🏨",
        title: "The Amberlyn Suite Hotel（連泊 2日目）",
        url: "https://www.booking.com/hotel/hu/the-amberlyn-aparthotel.ja.html",
        mapUrl: "https://maps.google.com/?q=The+Amberlyn+Suite+Hotel+Budapest",
        details: [
          { label: "施設名", value: "The Amberlyn Suite Hotel（ジ・アンバリン スイート ホテル）" },
          { label: "住所", value: "1085 Budapest, Rökk Szilárd u. 4, Hungary" },
          { label: "最寄り", value: "地下鉄M4「Rákóczi tér」駅 徒歩3分" },
          { label: "翌朝アクセス", value: "チェックアウト後、地下鉄M4でKeleti駅へ直通2駅（約5分）" },
        ],
      },
    ],
    memo: {
      bg: "linear-gradient(135deg,#f8f0ec,#f5ece8)",
      border: "#e8c8b8",
      titleColor: "#9a4a2a",
      textColor: "#5a3020",
      icon: "🇭🇺",
      title: "ブダペスト2日目 観光＆料金メモ",
      body: (
        <>
          <b>国会議事堂（Országház）</b>：外観見学は無料。内部ガイドツアーは非EU大人14,000HUF（約¥5,800/人・要事前予約）。公式サイト（parlament.hu）から早めのチケット確保を推奨。<br/>
          <b>郵便貯金局（Postatakarékpénztár）</b>：レフネル・エデン設計（Hold u. 4）。外観のジョルナイ陶器タイルや有機的装飾を鑑賞。<br/>
          <b>聖イシュトヴァーン大聖堂</b>：教会入場料 2,300HUF、パノラマ展望テラス＋宝物館 4,300HUF。<br/>
          <b>リスト・フェレンツ記念館</b>：大人 2,000HUF。月〜金 10:00〜18:00、土 9:00〜17:00（日祝休館）。地下鉄M1線 Vörösmarty utca駅すぐ。<br/>
          <b>国立民族博物館（Néprajzi Múzeum）</b>：2022年オープンの現代建築。屋上庭園散策。常設展 1,700HUF〜（火〜日 10:00〜18:00/木〜20:00、月曜休館）。<br/>
          <b>ドナウ川 ナイトクルーズ</b>：GetYourGuideにて約€18/人（約¥3,000/人・ウェルカムドリンク付）。出航15分前にはVigadó tér 5番桟橋へ。<br/>
          <b>市内交通 24時間乗車券</b>：2,500HUF（約¥1,050/人）。地下鉄M1〜M4・トラム・路線バスが24時間乗り放題。BudapestGOアプリまたは券売機で購入。
        </>
      ),
    },
  },
  {
    day: 3,
    date: "11月20日（金）",
    title: "ブダペスト → ウィーン（朝の鉄道移動・所要2時間40分）",
    color: "#4a7a9a",
    icon: "🚄",
    schedule: [
      { time: "07:45頃", label: "ホテル チェックアウト・Keleti駅へ移動", desc: "The Amberlyn Suite Hotelをチェックアウト。地下鉄M4「Rákóczi tér」から「Keleti pályaudvar」へ直通2駅（約5分）。出発30分前には駅に到着", icon: "🏨", coords: [47.4937, 19.0682] },
      { time: "08:40", label: "ブダペスト東駅（Keleti）発", desc: "Railjet 62（直通・約2時間40分）。ÖBB/MÁV共同運行。車内Wi-Fi・電源あり。早割券は変更不可", icon: "🚆", important: true, coords: [47.5001, 19.0839] },
      { time: "11:20", label: "ウィーン中央駅（Wien Hbf）着", desc: "地下鉄U1で市内中心（Stephansplatz）まで直通約5分。明るい時間に到着", icon: "🚉", coords: [48.1848, 16.3765] },
      { time: "11:50", label: "ホテルへ荷物預け ＆ ランチ", desc: "ホテルにスーツケースを預けて身軽になり、ウィーン風シュニッツェル等のランチへ", icon: "🍽", coords: [48.2085, 16.3721] },
      { time: "13:30〜", label: "ウィーン市内散策", desc: "ケルントナー通り、シュテファン大聖堂、伝統カフェ（カフェ・ツェントラル等）をのんびり巡る", icon: "🗺", important: true, coords: [48.2085, 16.3721] },
    ],
    booking: {
      title: "鉄道チケット（ブダペスト → ウィーン）",
      details: [
        { label: "推奨列車", value: "Railjet 62（直通）" },
        { label: "区間", value: "ブダペスト東駅（Keleti）→ ウィーン中央駅（Wien Hbf）" },
        { label: "出発", value: "2026年11月20日（金）08:40発" },
        { label: "到着", value: "2026年11月20日（金）11:20着" },
        { label: "所要時間", value: "2時間40分" },
        { label: "運賃目安", value: "早割 €19.90〜 ＋ 指定席 €3 / 人" },
        { label: "予約先", value: "ÖBB（オーストリア連邦鉄道）または MÁV（ハンガリー国鉄）" },
      ],
      url: "https://www.oebb.at/en/",
    },
    memo: {
      bg: "linear-gradient(135deg,#eef4fa,#e8f0f8)",
      border: "#b8d0e8",
      titleColor: "#2a5a8a",
      textColor: "#1a3a5a",
      icon: "🚆",
      title: "ブダペスト → ウィーン 鉄道予約メモ",
      body: (
        <>
          <b>おすすめ便</b>：08:40発（Railjet 62）→ 11:20着。朝食後に出発し、お昼前にウィーンへ着けるベストな時間帯です。<br/>
          <b>ÖBB Sparschiene Europa</b>：€19.90〜（早割・枚数限定・変更不可）。ÖBB公式アプリまたはwebで予約可能。<br/>
          <b>MÁV START Europa</b>：€13〜（ハンガリー国鉄サイトのほうが安い場合あり・座席指定別途€3）。<br/>
          <b>発着駅の注意</b>：ÖBB Railjetは「ブダペスト東駅（Keleti）」発、「ウィーン中央駅（Wien Hbf）」着です。<br/>
          <b>座席指定</b>：混雑期でなくても2名並び席＆大型荷物置き場近くを確保するため、座席指定（約€3/人）の追加を強く推奨します。
        </>
      ),
    },
  },
  {
    day: 4,
    date: "11月21日（土）",
    title: "ウィーン ─ 終日観光",
    color: "#4a7a9a",
    icon: "👑",
    schedule: [
      { time: "終日", label: "ウィーン 市内観光", desc: "観光先は後で確定。土曜なので美術館の混雑と、日曜休業の店を意識した順番にすると無駄がない", icon: "🗺", important: true },
    ],
    memo: {
      bg: "linear-gradient(135deg,#f8f4e8,#f5efdc)",
      border: "#e8d8a0",
      titleColor: "#8a6a10",
      textColor: "#5a4808",
      icon: "👑",
      title: "ウィーン 観光メモ",
      body: (
        <>
          <b>シェーンブルン宮殿</b>：時間指定・要予約。宮殿前クリスマスマーケットは11/6開幕<br/>
          <b>美術史美術館</b>：€22オンライン／€24現地。<b>月曜休館</b>のため土曜の今日に配置するのが最適<br/>
          <b>ベルヴェデーレ宮殿</b>：クリムト「接吻」。バロック宮殿と世紀末絵画<br/>
          <b>市庁舎広場クリスマスマーケット</b>：11月中旬〜。ウィーン最大規模<br/>
          <b>カフェ文化</b>：カフェ・ツェントラル（王宮近く）、カフェ・ランドマン（市庁舎前）等<br/>
          <b>日曜</b>：翌日は移動日。日曜午前に開いている店を確認しておくと◎
        </>
      ),
    },
  },
  {
    day: 5,
    date: "11月22日（日）",
    title: "ウィーン → プラハ（朝の鉄道移動・所要4時間13分）",
    color: "#3a7a5a",
    icon: "🚄",
    schedule: [
      { time: "06:30頃", label: "ホテル チェックアウト・駅へ移動", desc: "ウィーン中央駅へ移動。駅構内のベーカリーで朝食・コーヒーを調達（車内食堂車も利用可能）", icon: "🥐", coords: [48.1848, 16.3765] },
      { time: "07:10", label: "ウィーン中央駅（Wien Hbf）発", desc: "Railjet 72（直通・約4時間13分）。※ゆっくり出発の場合は09:10発（Railjet 256）も選択肢。日曜は混雑するため座席指定必須", icon: "🚆", important: true, coords: [48.1848, 16.3765] },
      { time: "11:23", label: "プラハ本駅（hlavní nádraží）着", desc: "地下鉄C線またはトラム・徒歩でホテルへ。明るいお昼前に到着でき安全・スムーズ", icon: "🚉", coords: [50.0833, 14.4356] },
      { time: "12:00", label: "ホテルへ荷物預け ＆ チェコランチ", desc: "荷物を預けて旧市街へ。伝統的なグヤーシュやチェコビールで乾杯", icon: "🍺", coords: [50.087, 14.4208] },
      { time: "13:30〜", label: "プラハ 旧市街散策", desc: "旧市街広場、天文時計、カレル橋を散策。日没（16:15頃）のカレル橋ライトアップへ", icon: "🏰", important: true, coords: [50.087, 14.4208], image: PRAGUE_OLD_TOWN_IMAGE },
    ],
    booking: {
      title: "鉄道チケット（ウィーン → プラハ）",
      details: [
        { label: "推奨列車", value: "Railjet 72（直通）" },
        { label: "後発候補", value: "Railjet 256（09:10発 → 13:23着）" },
        { label: "区間", value: "ウィーン中央駅（Wien Hbf）→ プラハ本駅（Praha hl.n.）" },
        { label: "出発", value: "2026年11月22日（日）07:10発" },
        { label: "到着", value: "2026年11月22日（日）11:23着" },
        { label: "所要時間", value: "4時間13分" },
        { label: "運賃目安", value: "早割 €14.90〜 ＋ 指定席 €3 / 人" },
        { label: "予約先", value: "ÖBB公式サイト（oebb.at）または ČDチェコ鉄道（cd.cz）" },
      ],
      url: "https://www.oebb.at/en/",
    },
    memo: {
      bg: "linear-gradient(135deg,#eef8f0,#e8f5ec)",
      border: "#b8e0c8",
      titleColor: "#2a6a4a",
      textColor: "#1a4a30",
      icon: "🚆",
      title: "ウィーン → プラハ 鉄道予約メモ",
      body: (
        <>
          <b>おすすめ便</b>：07:10発（Railjet 72）→ 11:23着。4時間超の移動ですが、車窓や車内朝食を楽しんでいるとお昼前にプラハへ到着します。<br/>
          <b>日曜便の注意（座席指定必須）</b>：日曜日は移動客・週末旅行者で非常に混雑します。自由席では立ち席や離れ離れになるリスクがあるため、必ず座席指定（約€3/人）を追加してください。<br/>
          <b>ÖBB Sparschiene / ČD First Minute</b>：€14.90〜（早割・枚数限定・変更不可）。ÖBB公式アプリまたはチェコ鉄道（ČD）サイトで予約可能。<br/>
          <b>発着駅</b>：ウィーン中央駅（Wien Hbf）→ プラハ本駅（Praha hlavní nádraží）。どちらも市内中心部へ好アクセスです。
        </>
      ),
    },
  },
  {
    day: 6,
    date: "11月23日（月）",
    title: "プラハ ─ 終日観光",
    color: "#3a7a5a",
    icon: "🏰",
    schedule: [
      { time: "終日", label: "プラハ 市内観光", desc: "翌日は午前中しか使えないので、見たいものはこの日に寄せること", icon: "🗺", important: true },
      { time: "夜", label: "荷造り", desc: "翌朝の空港移動の経路と所要をここで確定させておく。トロリーバス59のルート・始発時刻を確認", icon: "🧳" },
    ],
    memo: {
      bg: "linear-gradient(135deg,#f0f8f4,#eaf5f0)",
      border: "#b0dcc8",
      titleColor: "#1a6a40",
      textColor: "#0a3a20",
      icon: "🏯",
      title: "プラハ 観光メモ",
      body: (
        <>
          <b>プラハ城・聖ヴィート大聖堂</b>：丘の上から赤い屋根の街を見下ろす。旧王宮・黄金小路も<br/>
          <b>カレル橋</b>：朝早い時間または夜が人少なめ<br/>
          <b>旧市街広場・天文時計</b>：クリスマスマーケットは11/28頃開幕予定（要確認）<br/>
          <b>ストラホフ修道院図書館</b>：バロックの書架が圧巻。要入場料<br/>
          <b>チェスキー・クルムロフ日帰り</b>：プラハからバス片道約2時間30分。ただし翌日は出発日なので今日が唯一のチャンス。行く場合は早朝発で帰りを16時台までに<br/>
          <b>⚠ 翌日注意</b>：14:45発フライトのため、10:30にはホテルを出る必要あり
        </>
      ),
    },
  },
  {
    day: 7,
    date: "11月24日（火）",
    title: "プラハ午前 ─ 出発 ─ ドバイ乗継（機中泊）",
    color: "#7a5a3a",
    icon: "🛫",
    schedule: [
      { time: "朝", label: "チェックアウト", desc: "荷物はフロントに預け、午前だけプラハを満喫", icon: "🧳", important: true },
      { time: "10:30", label: "ホテル発", desc: "トロリーバス59＋地下鉄A線（Nádraží Veleslavín 乗換）で45〜60分。90分券1枚で通し・約50CZK/人", icon: "🚌", important: true },
      { time: "11:45", label: "プラハ空港 着", desc: "出発3時間前。第1ターミナル", icon: "✈", coords: [50.1008, 14.26] },
      { time: "14:45 PRG", label: "プラハ（PRG）出発", desc: "EK140・エミレーツ。第1ターミナル。Airbus A380-800／飛行5時間55分。JST 22:45", icon: "✈", important: true, coords: [50.1008, 14.26] },
      { time: "23:40 DXB", label: "ドバイ（DXB）着", desc: "EK140到着。乗継 3時間15分の深夜乗継。JST 翌04:40頃", icon: "🇦🇪" },
      { time: "02:55 DXB", label: "ドバイ（DXB）発", desc: "EK318・エミレーツ。Airbus A380-800／飛行9時間25分。日付は11月25日（水）", icon: "😴" },
    ],
    booking: {
      title: "エミレーツ航空券（復路）",
      details: [
        { label: "予約番号", value: "K78ZN2" },
        { label: "搭乗者", value: "Mr Hiroki Nomura ／ Ms Rino Nomura" },
        { label: "区間", value: "プラハ → ドバイ → 東京（成田）" },
        { label: "便名", value: "EK140 ／ EK318" },
        { label: "出発", value: "2026年11月24日（火）14:45 プラハ（PRG）" },
        { label: "到着", value: "2026年11月25日（水）17:20 成田（NRT）" },
        { label: "所要時間", value: "18時間35分（ドバイ乗継 3時間15分）" },
        { label: "機材", value: "Airbus A380-800（両便）" },
        { label: "運賃", value: "エコノミー ／ Saver（確定）" },
      ],
      url: "https://www.emirates.com/jp/japanese/manage-booking/",
    },
    memo: {
      bg: "linear-gradient(135deg,#f8f0e8,#f5ebe0)",
      border: "#e0c8a8",
      titleColor: "#8a5a20",
      textColor: "#5a3a10",
      icon: "✈",
      title: "プラハ空港 → 市内アクセス（逆方向）",
      body: (
        <>
          <b>トロリーバス59＋地下鉄A線（推奨）</b>：Nádraží Veleslavín 乗換。90分券1枚・約50CZK/人。所要45〜60分<br/>
          <b>Airport Express（AEバス）</b>：プラハ本駅から乗換なし。60〜100CZK（金額は現地の券売機で確認）。所要35〜45分<br/>
          <b>⚠ ドバイは深夜乗継</b>：乗継 3時間15分。深夜のため飲食・免税店は限られる場合あり
        </>
      ),
    },
  },
  {
    day: 8,
    date: "11月25日（水）",
    title: "成田着 ─ 帰国",
    color: "#5a6a8a",
    icon: "🏠",
    schedule: [
      { time: "02:55 DXB", label: "ドバイ（DXB）発", desc: "EK318・エミレーツ。Airbus A380-800／飛行9時間25分", icon: "✈" },
      { time: "17:20 NRT", label: "成田（NRT）着", desc: "第2ターミナル。Visit Japan Web の入国・税関申告は機内で済ませておくと並ばずに済む", icon: "🏁", important: true },
      { time: "18:30頃", label: "入国・手荷物受取 完了", desc: "首都圏外へ向かう場合、この時刻から在来線＋新幹線の最終に間に合うか事前確認を。厳しければ都内1泊を検討", icon: "🚄" },
    ],
    memo: {
      bg: "linear-gradient(135deg,#eef4f8,#e8f0f5)",
      border: "#b8cce0",
      titleColor: "#2a4a6a",
      textColor: "#1a3050",
      icon: "📱",
      title: "帰国前に済ませておくこと",
      body: (
        <>
          <b>Visit Japan Web</b>：乳幼児を含む全員分。入国審査・税関申告をオンライン登録。ドバイ→成田の機内で完了させると成田での列が短い。予約画面にも必須と明記あり<br/>
          <b>⚠ 出発空港に注意</b>：出発は羽田（HND）、帰着は成田（NRT）。羽田に車を置いた・羽田で買い物した、という前提は使えません<br/>
          <b>首都圏外への最終</b>：成田18:30頃発を起算点に在来線＋新幹線の終電を確認。厳しければ都内1泊が安全
        </>
      ),
    },
  },
];

const COSTS = [
  { item: "エミレーツ 往復航空券（大人2名・エコノミー）", cost: 457440, note: "予約済・予約番号 K78ZN2 ／ 運賃¥222,400・航空会社サーチャージ¥202,400・税金等¥32,640" },
  { item: "ブダペスト 2泊（The Amberlyn Suite Hotel）", cost: 25000, note: "手配予定 目安 €150（約¥25,000 / 2名1室2泊）" },
  { item: "ドナウ川 ナイトクルーズ（ウェルカムドリンク付・2名）", cost: 6000, note: "GetYourGuide 約€18×2名（約¥6,000）" },
  { item: "鉄道 ブダペスト→ウィーン（2名）", cost: 0, note: "手配要 早割€13〜/人（MÁV）または €19.90〜/人（ÖBB）" },
  { item: "鉄道 ウィーン→プラハ（2名）", cost: 0, note: "手配要 早割€14.90〜/人（ÖBB）または €15〜/人（RegioJet）" },
  { item: "ウィーン 2泊（2名）", cost: 0, note: "手配要" },
  { item: "プラハ 2泊（2名）", cost: 0, note: "手配要" },
  { item: "空港バス 100E（ブダペスト空港→Kálvin tér、2名）", cost: 2100, note: "2,500HUF×2名（クレカタッチ決済 約¥2,100）" },
  { item: "ブダペスト市内交通 24時間券（2名）", cost: 2100, note: "2,500HUF×2名（地下鉄・トラム乗り放題 約¥2,100）" },
  { item: "国会議事堂 ガイドツアー（2名・任意）", cost: 0, note: "見学希望時 14,000HUF×2名（約¥11,600・要事前予約）／外観散策は無料" },
  { item: "ブダ城 ＆ 英雄広場 散策", cost: 0, note: "外観・敷地散策無料（シクロー利用時 往復約5,000HUF/人）" },
  { item: "宿泊税 ブダペスト（室料の4%×2泊）", cost: 1000, note: "現地ホテル払い 目安約¥1,000" },
  { item: "宿泊税 ウィーン（室料の5%×2泊）", cost: 0, note: "現地払い（目安）" },
  { item: "宿泊税 プラハ（50CZK×2名×2泊）", cost: 0, note: "現地払い 約¥1,200" },
];

// ─── ヘルパー ──────────────────────────────────────────────────────────────────

const WebLink = ({ href }) => href ? (
  <a href={href} target="_blank" rel="noopener noreferrer" className="eu-tl-icon-link"
    style={{ textDecoration:"none", fontSize:".82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }}
    aria-label="公式サイト" onClick={e => e.stopPropagation()}>
    <span aria-hidden="true">🌐</span>
  </a>
) : null;

const MapLink = ({ href }) => href ? (
  <a href={href} target="_blank" rel="noopener noreferrer" className="eu-tl-icon-link"
    style={{ textDecoration:"none", fontSize:".82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }}
    aria-label="Google Map" onClick={e => e.stopPropagation()}>
    <span aria-hidden="true">📍</span>
  </a>
) : null;

const PhotoLink = ({ href }) => href ? (
  <a href={href} target="_blank" rel="noopener noreferrer" className="eu-tl-icon-link"
    style={{ textDecoration:"none", fontSize:".82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }}
    aria-label="予約写真" onClick={e => e.stopPropagation()}>
    <span aria-hidden="true">📷</span>
  </a>
) : null;

const handleCardKeyDown = (e, callback) => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); callback(); }
};

const formatShortDate = (date) => {
  const m = date.match(/(\d+)月(\d+)日（(.)）/);
  return m ? `${m[1]}/${m[2]}(${m[3]})` : "";
};

// ─── コンポーネント ────────────────────────────────────────────────────────────

export default function EuropeTrip() {
  const [activeDay, setActiveDay] = useState(0);
  const [showCost, setShowCost] = useState(false);
  const [expandedBooking, setExpandedBooking] = useState(null);
  const totalFixed = COSTS.filter(c => c.cost > 0).reduce((s, c) => s + c.cost, 0);

  return (
    <div style={{ fontFamily:"'Noto Serif JP','Hiragino Mincho ProN',serif", background:"#F7F3ED", minHeight:"100vh", color:"#2C2421" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;600;700&family=Zen+Maru+Gothic:wght@400;500;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        .eu-cover { position:relative; min-height:30vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:linear-gradient(175deg,#0d2847 0%,#1a3f6e 35%,#2a5a9a 58%,#7a3b8f 82%,#a04a7a 100%); overflow:hidden; padding:2rem; }
        .eu-cover::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 20% 80%,rgba(122,59,143,.35) 0%,transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(13,40,71,.45) 0%,transparent 50%); }
        .eu-cover-pattern { position:absolute; inset:0; opacity:.05; background-image:repeating-linear-gradient(0deg,transparent,transparent 40px,#fff 40px,#fff 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,#fff 40px,#fff 41px); }
        .eu-cover-content { position:relative; z-index:2; text-align:center; color:white; animation:euFadeUp 1.2s ease-out; }
        @keyframes euFadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes euFadeIn { from{opacity:0} to{opacity:1} }
        .eu-cover-label { font-family:'Zen Maru Gothic',sans-serif; font-size:.85rem; letter-spacing:.5em; opacity:.8; margin-bottom:1.5rem; }
        .eu-cover-title { font-size:clamp(2rem,6vw,4rem); font-weight:700; letter-spacing:.15em; line-height:1.3; margin-top:0; margin-bottom:.5rem; text-shadow:0 4px 30px rgba(0,0,0,.3); }
        .eu-cover-sub { font-size:clamp(.95rem,2.5vw,1.3rem); font-weight:300; letter-spacing:.3em; opacity:.85; margin-bottom:2rem; }
        .eu-cover-date { font-family:'Zen Maru Gothic',sans-serif; display:inline-block; border:1px solid rgba(255,255,255,.4); padding:.6rem 2rem; font-size:.95rem; letter-spacing:.2em; border-radius:2px; }
        .eu-cover-members { margin-top:2rem; font-size:.95rem; opacity:.85; letter-spacing:.15em; }
        .eu-cover-back { position:absolute; top:1.5rem; left:1.5rem; z-index:3; color:rgba(255,255,255,.7); text-decoration:none; font-family:'Zen Maru Gothic',sans-serif; font-size:.85rem; letter-spacing:.05em; transition:color .2s; }
        .eu-cover-back:hover { color:white; }
        .eu-cover-back:focus-visible { color:white; outline:2px solid white; outline-offset:2px; border-radius:2px; }
        .eu-nav-bar { position:sticky; top:0; z-index:100; background:rgba(247,243,237,.92); backdrop-filter:blur(12px); border-bottom:1px solid rgba(0,0,0,.08); display:flex; justify-content:flex-start; overflow-x:auto; }
        .eu-nav-btn { flex:0 0 auto; font-family:'Zen Maru Gothic',sans-serif; border:none; background:none; padding:1rem 1.2rem; font-size:.82rem; cursor:pointer; color:#6a6058; letter-spacing:.05em; white-space:nowrap; transition:all .3s; border-bottom:2px solid transparent; }
        .eu-nav-btn:hover { color:#2C2421; }
        .eu-nav-btn:focus-visible { color:#2C2421; outline:2px solid #2C2421; outline-offset:-2px; border-radius:2px; }
        .eu-nav-btn.active { color:#2C2421; font-weight:700; border-bottom-color:currentColor; }
        .eu-nav-btn-date { font-size:.72rem; color:#6a6058; letter-spacing:0; display:block; }
        .eu-nav-btn.active .eu-nav-btn-date { color:currentColor; }
        .eu-nav-btn.cost-btn { color:#8B6914; }
        .eu-nav-btn.cost-btn.active { color:#8B6914; border-bottom-color:#8B6914; }
        .eu-day-section { max-width:720px; margin:0 auto; padding:3rem 1.5rem; animation:euFadeIn .5s ease-out; }
        .eu-day-header { display:flex; align-items:center; gap:1rem; margin-bottom:.5rem; }
        .eu-day-number { font-family:'Zen Maru Gothic',sans-serif; font-size:.75rem; font-weight:700; letter-spacing:.15em; padding:.3rem .8rem; border-radius:2px; color:white; }
        .eu-day-date { font-family:'Zen Maru Gothic',sans-serif; font-size:.85rem; color:#756d65; letter-spacing:.1em; }
        .eu-day-title { font-size:clamp(1.3rem,3.5vw,1.7rem); font-weight:600; letter-spacing:.06em; margin-bottom:2rem; line-height:1.4; margin-top:0; }
        .eu-timeline { position:relative; padding-left:2rem; list-style:none; }
        .eu-timeline::before { content:''; position:absolute; left:5px; top:8px; bottom:8px; width:1px; background:#d4cdc5; }
        .eu-tl-item { position:relative; padding-bottom:1.8rem; padding-left:1rem; }
        .eu-tl-item:last-child { padding-bottom:0; }
        .eu-tl-dot { position:absolute; left:-2rem; top:4px; width:11px; height:11px; border-radius:50%; background:#d4cdc5; border:2px solid #F7F3ED; z-index:1; }
        .eu-tl-dot.important { width:13px; height:13px; }
        .eu-tl-time { font-family:'Zen Maru Gothic',sans-serif; font-size:.78rem; color:#756d65; letter-spacing:.05em; margin-bottom:.2rem; }
        .eu-tl-label { font-weight:500; font-size:1rem; letter-spacing:.04em; display:flex; align-items:center; gap:.5rem; flex-wrap:wrap; }
        .eu-tl-label .eu-emoji { font-size:1.1rem; }
        .eu-tl-desc { font-size:.82rem; color:#6a6058; margin-top:.2rem; line-height:1.6; }
        .eu-tl-item.important .eu-tl-label { font-weight:600; }
        .eu-tl-links { display:inline-flex; gap:.35rem; margin-left:.2rem; }
        .eu-tl-links a:hover { opacity:1!important; }
        .eu-tl-links a:focus-visible { outline:2px solid #2C2421; outline-offset:1px; border-radius:2px; }
        .eu-tl-icon-link:focus-visible { outline:2px solid #2C2421; outline-offset:1px; border-radius:2px; }
        .eu-booking-card { margin-top:2.5rem; background:white; border-radius:6px; overflow:hidden; box-shadow:0 1px 8px rgba(0,0,0,.06); cursor:pointer; transition:box-shadow .3s; }
        .eu-booking-card:hover { box-shadow:0 2px 16px rgba(0,0,0,.1); }
        .eu-booking-card:focus-visible { outline:2px solid #2C2421; outline-offset:1px; box-shadow:0 2px 16px rgba(0,0,0,.1); }
        .eu-booking-header { display:flex; align-items:center; justify-content:space-between; padding:1rem 1.2rem; font-family:'Zen Maru Gothic',sans-serif; font-weight:700; font-size:.9rem; letter-spacing:.05em; }
        .eu-booking-toggle { font-size:.75rem; color:#756d65; transition:transform .3s; }
        .eu-booking-details { padding:0 1.2rem 1.2rem; display:grid; gap:.6rem; }
        .eu-booking-row { display:flex; font-size:.82rem; line-height:1.5; }
        .eu-booking-row-label { font-family:'Zen Maru Gothic',sans-serif; color:#756d65; min-width:90px; flex-shrink:0; }
        .eu-booking-row-value { font-weight:500; word-break:break-all; }
        .eu-booking-links { display:flex; gap:.5rem; padding:.5rem 1.2rem 1rem; flex-wrap:wrap; }
        .eu-booking-links a { font-family:'Zen Maru Gothic',sans-serif; font-size:.78rem; color:#5a8a6e; text-decoration:none; padding:.3rem .7rem; border:1px solid #d4e8dc; border-radius:3px; transition:all .2s; display:inline-flex; align-items:center; gap:.3rem; }
        .eu-booking-links a:hover { background:#eef6f0; border-color:#5a8a6e; }
        .eu-booking-links a:focus-visible { outline:2px solid #5a8a6e; outline-offset:1px; }
        .eu-memo-box { border-radius:6px; padding:1rem 1.2rem; margin-bottom:2rem; font-size:.82rem; line-height:1.7; }
        .eu-memo-title { font-family:'Zen Maru Gothic',sans-serif; font-weight:700; font-size:.88rem; margin-bottom:.5rem; display:flex; align-items:center; gap:.5rem; flex-wrap:wrap; }
        .eu-memo-link:focus-visible { outline:2px solid currentColor; outline-offset:1px; border-radius:3px; }
        .eu-cost-section { max-width:720px; margin:0 auto; padding:3rem 1.5rem; animation:euFadeIn .5s ease-out; }
        .eu-cost-title { font-size:1.6rem; font-weight:600; letter-spacing:.08em; margin-bottom:2rem; text-align:center; margin-top:0; }
        .eu-cost-table { background:white; border-radius:6px; overflow:hidden; box-shadow:0 1px 8px rgba(0,0,0,.06); width:100%; border-collapse:collapse; }
        .eu-cost-row td { padding:1rem 1.4rem; font-size:.85rem; border-bottom:1px solid #f0ece6; vertical-align:top; }
        .eu-cost-row:last-child td { border-bottom:none; }
        .eu-cost-row-item { font-family:'Zen Maru Gothic',sans-serif; color:#5a5048; }
        .eu-cost-row-value { font-weight:600; font-variant-numeric:tabular-nums; text-align:right; white-space:nowrap; }
        .eu-cost-row-note { font-size:.75rem; color:#756d65; margin-top:.2rem; }
        .eu-cost-total td { padding:1.2rem 1.4rem; background:#2C2421; color:white; }
        .eu-cost-total-label { font-family:'Zen Maru Gothic',sans-serif; font-size:.9rem; letter-spacing:.1em; }
        .eu-cost-total-value { font-size:1.3rem; font-weight:700; font-variant-numeric:tabular-nums; text-align:right; }
        .eu-cost-note { text-align:center; margin-top:1.5rem; font-size:.78rem; color:#756d65; line-height:1.7; }
        .eu-route-box { background:white; border-radius:6px; padding:1.2rem 1.4rem; margin-bottom:2rem; box-shadow:0 1px 8px rgba(0,0,0,.06); font-size:.82rem; line-height:2; }
        .eu-route-title { font-family:'Zen Maru Gothic',sans-serif; font-weight:700; font-size:.88rem; margin-bottom:.8rem; color:#2a5a9a; display:flex; align-items:center; gap:.4rem; }
        .eu-route-row { display:flex; align-items:center; gap:.5rem; flex-wrap:wrap; color:#4a4038; }
        .eu-route-sep { color:#d4cdc5; font-size:.7rem; }
        @media (max-width:500px) { .eu-nav-btn{padding:.8rem .7rem;font-size:.72rem} .eu-nav-btn-date{font-size:.65rem} .eu-day-section{padding:2rem 1rem} .eu-booking-row-label{min-width:75px} }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration:0.01ms!important; transition-duration:0.01ms!important; } }
      `}</style>

      <header className="eu-cover">
        <a href="#/" className="eu-cover-back">← 旅の一覧</a>
        <div className="eu-cover-pattern" aria-hidden="true" />
        <div className="eu-cover-content">
          <div className="eu-cover-label">Travel Booklet</div>
          <h1 className="eu-cover-title">中欧の旅</h1>
          <div className="eu-cover-sub">Budapest ・ Wien ・ Praha</div>
          <div className="eu-cover-date">2026. 11. 18 wed — 11. 25 wed</div>
          <div className="eu-cover-members">のむら ひろき ・ りの</div>
        </div>
      </header>

      <nav className="eu-nav-bar" aria-label="日程ナビゲーション">
        {DAYS.map((d, i) => (
          <button key={i}
            className={`eu-nav-btn ${!showCost && activeDay === i ? "active" : ""}`}
            aria-pressed={!showCost && activeDay === i}
            onClick={() => { setActiveDay(i); setShowCost(false); setExpandedBooking(null); }}>
            <span aria-hidden="true">{d.icon}</span>{" "}
            {d.day === 0 ? "前日" : `Day${d.day}`}
            <span className="eu-nav-btn-date">{formatShortDate(d.date)}</span>
          </button>
        ))}
        <button
          className={`eu-nav-btn cost-btn ${showCost ? "active" : ""}`}
          aria-pressed={showCost}
          onClick={() => setShowCost(true)}>
          <span aria-hidden="true">💰</span> 費用
        </button>
      </nav>

      <main>
        <div
          aria-live="polite" aria-atomic="true"
          style={{ position:"absolute", width:1, height:1, overflow:"hidden", clipPath:"inset(50%)", whiteSpace:"nowrap" }}>
          {showCost ? "旅費まとめを表示中" : `${DAYS[activeDay].day === 0 ? "前日" : `Day${DAYS[activeDay].day}`} ${DAYS[activeDay].title}を表示中`}
        </div>

        {showCost ? (
          <div className="eu-cost-section" key="cost">
            <h2 className="eu-cost-title">旅費まとめ</h2>
            <table className="eu-cost-table" aria-label="旅費一覧">
              <tbody>
                {COSTS.map((c, i) => (
                  <tr className="eu-cost-row" key={i}>
                    <td className="eu-cost-row-item">
                      {c.item}
                      {c.note && <div className="eu-cost-row-note">{c.note}</div>}
                    </td>
                    <td className="eu-cost-row-value">
                      {c.cost > 0 ? `¥${c.cost.toLocaleString()}` : "─"}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="eu-cost-total">
                  <td className="eu-cost-total-label">確定済み小計</td>
                  <td className="eu-cost-total-value">¥{totalFixed.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
            <div className="eu-cost-note">
              ※ 航空券は予約済みです（2名合計¥457,440）。宿泊・鉄道は予約後に金額を更新します。<br />
              宿泊税（ブダペスト4%・ウィーン5%・プラハ50CZK/人泊）は現地払いです。<br />
              食費・市内交通・観光入場料は含まれていません。
            </div>
          </div>
        ) : (
          <div className="eu-day-section" key={`day-${activeDay}`}>
            {/* 全体ルート（Day0のみ表示） */}
            {activeDay === 0 && (
              <div className="eu-route-box">
                <div className="eu-route-title"><span aria-hidden="true">🗺</span> 全体ルート</div>
                <div className="eu-route-row">
                  <span><span aria-hidden="true">✈</span> 羽田 11/18 00:05</span>
                  <span className="eu-route-sep">─ドバイ乗継─</span>
                  <span><span aria-hidden="true">🇭🇺</span> ブダペスト 11/18着</span>
                  <span className="eu-route-sep">─鉄道─</span>
                  <span><span aria-hidden="true">🇦🇹</span> ウィーン 11/20</span>
                  <span className="eu-route-sep">─鉄道─</span>
                  <span><span aria-hidden="true">🇨🇿</span> プラハ 11/22</span>
                  <span className="eu-route-sep">─ドバイ乗継─</span>
                  <span><span aria-hidden="true">✈</span> 成田 11/25 17:20</span>
                </div>
                <div style={{ marginTop:".8rem", fontSize:".78rem", color:"#756d65", lineHeight:1.7 }}>
                  地上6泊（ブダペスト2泊・ウィーン2泊・プラハ2泊）＋機中2泊 ／ 大人2名・エコノミー<br/>
                  <span style={{ color:"#9a4a2a", fontWeight:600 }}>⚠ 出発：羽田（HND）第3ターミナル ／ 帰着：成田（NRT）第2ターミナル（空港が違います）</span>
                </div>
              </div>
            )}

            <div className="eu-day-header">
              <span className="eu-day-number" style={{ background: DAYS[activeDay].color }}>
                {DAYS[activeDay].day === 0 ? "前日" : `DAY ${DAYS[activeDay].day}`}
              </span>
              <span className="eu-day-date">{DAYS[activeDay].date}</span>
            </div>
            <h2 className="eu-day-title" style={{ color: DAYS[activeDay].color }}>{DAYS[activeDay].title}</h2>

            {/* メモボックス */}
            {DAYS[activeDay].memo && (
              <div className="eu-memo-box"
                style={{ background: DAYS[activeDay].memo.bg, border: `1px solid ${DAYS[activeDay].memo.border}`, color: DAYS[activeDay].memo.textColor }}>
                <h3 className="eu-memo-title" style={{ color: DAYS[activeDay].memo.titleColor }}>
                  <span aria-hidden="true">{DAYS[activeDay].memo.icon}</span>
                  {DAYS[activeDay].memo.title}
                </h3>
                <div>{DAYS[activeDay].memo.body}</div>
              </div>
            )}

            {/* マップ */}
            {DAYS[activeDay].schedule.some(s => s.coords) && (
              <DayMap
                schedule={DAYS[activeDay].schedule}
                color={DAYS[activeDay].color}
              />
            )}

            <ol className="eu-timeline">
              {DAYS[activeDay].schedule.map((item, i) => (
                <li key={i} className={`eu-tl-item ${item.important ? "important" : ""}`}>
                  <div
                    className={`eu-tl-dot ${item.important ? "important" : ""}`}
                    aria-hidden="true"
                    style={item.important ? { background: DAYS[activeDay].color } : {}}
                  />
                  <div className="eu-tl-time">{item.time}</div>
                  <div className="eu-tl-label">
                    <span className="eu-emoji" aria-hidden="true">{item.icon}</span>
                    {item.label}
                    {(item.url || item.mapUrl || item.photo) && (
                      <span className="eu-tl-links">
                        <WebLink href={item.url} />
                        <MapLink href={item.mapUrl} />
                        <PhotoLink href={item.photo} />
                      </span>
                    )}
                  </div>
                  {item.desc && <div className="eu-tl-desc">{item.desc}</div>}
                  <PlacePreview image={item.image} />
                </li>
              ))}
            </ol>

            {DAYS[activeDay].booking && (
              <div
                className="eu-booking-card"
                role="button" tabIndex={0}
                aria-expanded={expandedBooking === `booking-${activeDay}`}
                onClick={() => setExpandedBooking(expandedBooking === `booking-${activeDay}` ? null : `booking-${activeDay}`)}
                onKeyDown={e => handleCardKeyDown(e, () => setExpandedBooking(expandedBooking === `booking-${activeDay}` ? null : `booking-${activeDay}`))}>
                <div className="eu-booking-header" style={{ borderLeft: `3px solid ${DAYS[activeDay].color}` }}>
                  <span><span aria-hidden="true">{DAYS[activeDay].booking.icon || "📋"}</span> {DAYS[activeDay].booking.title}</span>
                  <span className="eu-booking-toggle" aria-hidden="true"
                    style={{ transform: expandedBooking === `booking-${activeDay}` ? "rotate(180deg)" : "none" }}>▼</span>
                </div>
                {expandedBooking === `booking-${activeDay}` && (
                  <>
                    <div className="eu-booking-details">
                      {DAYS[activeDay].booking.details.map((d, i) => (
                        <div className="eu-booking-row" key={i}>
                          <span className="eu-booking-row-label">{d.label}</span>
                          <span className="eu-booking-row-value">{d.value}</span>
                        </div>
                      ))}
                    </div>
                    <PlacePreview image={DAYS[activeDay].booking.image} variant="booking" />
                    {(DAYS[activeDay].booking.url || DAYS[activeDay].booking.mapUrl) && (
                      <div className="eu-booking-links">
                        {DAYS[activeDay].booking.url && (
                          <a href={DAYS[activeDay].booking.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                            <span aria-hidden="true">🌐</span> 公式サイト
                          </a>
                        )}
                        {DAYS[activeDay].booking.mapUrl && (
                          <a href={DAYS[activeDay].booking.mapUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                            <span aria-hidden="true">📍</span> Google Map
                          </a>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {DAYS[activeDay].extraBookings && DAYS[activeDay].extraBookings.map((b, bIdx) => {
              const bKey = b.key || `extra-${activeDay}-${bIdx}`;
              const isExp = expandedBooking === bKey;
              return (
                <div
                  key={bKey}
                  className="eu-booking-card"
                  style={{ marginTop: "1rem" }}
                  role="button" tabIndex={0}
                  aria-expanded={isExp}
                  onClick={() => setExpandedBooking(isExp ? null : bKey)}
                  onKeyDown={e => handleCardKeyDown(e, () => setExpandedBooking(isExp ? null : bKey))}>
                  <div className="eu-booking-header" style={{ borderLeft: `3px solid ${DAYS[activeDay].color}` }}>
                    <span><span aria-hidden="true">{b.icon || "📋"}</span> {b.title}</span>
                    <span className="eu-booking-toggle" aria-hidden="true"
                      style={{ transform: isExp ? "rotate(180deg)" : "none" }}>▼</span>
                  </div>
                  {isExp && (
                    <>
                      <div className="eu-booking-details">
                        {b.details.map((d, i) => (
                          <div className="eu-booking-row" key={i}>
                            <span className="eu-booking-row-label">{d.label}</span>
                            <span className="eu-booking-row-value">{d.value}</span>
                          </div>
                        ))}
                      </div>
                      <PlacePreview image={b.image} variant="booking" />
                      {(b.url || b.mapUrl) && (
                        <div className="eu-booking-links">
                          {b.url && (
                            <a href={b.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                              <span aria-hidden="true">🌐</span> 公式サイト
                            </a>
                          )}
                          {b.mapUrl && (
                            <a href={b.mapUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                              <span aria-hidden="true">📍</span> Google Map
                            </a>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
