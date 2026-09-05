import { useState } from "react";
import DayMap from "../../components/DayMap";
import PlacePreview from "../../components/PlacePreview";

const PRAGUE_OLD_TOWN_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Prague_Old_Town.JPG?width=1200",
  alt: "赤い屋根が連なるプラハ旧市街の街並み",
  credit: "Kallerna / Wikimedia Commons / Public domain",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Prague_Old_Town.JPG",
};

const CHAIN_BRIDGE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Sz%C3%A9chenyi_Chain_Bridge_in_Budapest_at_night.jpg?width=1200",
  alt: "夜間にライトアップされたセーチェニ鎖橋",
  credit: "Wilfredor / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Sz%C3%A9chenyi_Chain_Bridge_in_Budapest_at_night.jpg",
};

const VARKERT_BAZAR_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/VarkertBazarFotoThalerTamas2.JPG?width=1200",
  alt: "ヴァールケルト・バザールのネオルネサンス庭園と回廊",
  credit: "Thaler Tamas / Wikimedia Commons / CC BY-SA 3.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:VarkertBazarFotoThalerTamas2.JPG",
};

const BUDA_CASTLE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Buda_Castle_from_the_Danube_River.jpg?width=1200",
  alt: "ドナウ川から望むブダ王宮のパノラマ",
  credit: "Mgimelfarb / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Buda_Castle_from_the_Danube_River.jpg",
};

const MATTHIAS_CHURCH_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Matthias_Church,_Budapest,_2017.jpg?width=1200",
  alt: "ジョルナイ瓦が鮮やかなマーチャーシュ教会",
  credit: "Stefan Schäfer / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Matthias_Church,_Budapest,_2017.jpg",
};

const FISHERMANS_BASTION_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Fishermans_bastion_Budapest_IMG_1429.JPG?width=1200",
  alt: "白亜の尖塔と回廊が美しい漁夫の砦",
  credit: "Bjoertvedt / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Fishermans_bastion_Budapest_IMG_1429.JPG",
};

const PARLIAMENT_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Parliament_Building_(Budapest,_Hungary).jpg?width=1200",
  alt: "ドナウ河畔に佇むハンガリー国会議事堂",
  credit: "Andrew Shiva / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Parliament_Building_(Budapest,_Hungary).jpg",
};

const POSTAL_SAVINGS_BANK_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Budapest_-_Postatakar%C3%A9kp%C3%A9nzt%C3%A1r.jpg?width=1200",
  alt: "レフネル・エデン設計の旧郵便貯金局（ハンガリー・アールヌーヴォー建築）",
  credit: "Wikimedia Commons / CC BY-SA",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Budapest_-_Postatakar%C3%A9kp%C3%A9nzt%C3%A1r.jpg",
};

const ST_STEPHEN_BASILICA_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Saint_Stephen%27s_Basilica_Budapest.jpg?width=1200",
  alt: "ブダペスト最大のカトリック教会 聖イシュトヴァーン大聖堂",
  credit: "Jorge Láscar / Wikimedia Commons / CC BY-SA 3.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Saint_Stephen%27s_Basilica_Budapest.jpg",
};

const OPERA_HOUSE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Hungarian_State_Opera_House_in_Budapest.jpg?width=1200",
  alt: "ネオルネサンス様式の豪奢なハンガリー国立歌劇場",
  credit: "Jeremy Oakley / Wikimedia Commons / CC BY 2.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Hungarian_State_Opera_House_in_Budapest.jpg",
};

const HEROES_SQUARE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Heroes_Square_Budapest,_Hungary.jpg?width=1200",
  alt: "建国千年記念碑がそびえる英雄広場",
  credit: "Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Heroes_Square_Budapest,_Hungary.jpg",
};

const VAJDAHUNYAD_CASTLE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Budapest,_Vajdahunyad_Castle.jpg?width=1200",
  alt: "市民公園内のヴァイダフニャディ城",
  credit: "Batomi / Wikimedia Commons / CC BY-SA 3.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Budapest,_Vajdahunyad_Castle.jpg",
};

const ST_STEPHANS_VIENNA_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Wien_-_Stephansdom_(1).JPG?width=1200",
  alt: "ウィーンのシンボル シュテファン大聖堂",
  credit: "C.Stadler/Bwag / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Wien_-_Stephansdom_(1).JPG",
};

const SCHONBRUNN_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Sch%C3%B6nbrunn_palace.jpg?width=1200",
  alt: "ハプスブルク家の離宮 シェーンブルン宮殿",
  credit: "Simon Matzinger / Wikimedia Commons / CC BY-SA 3.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Sch%C3%B6nbrunn_palace.jpg",
};

const PRUNKSAAL_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Wien%2C_%C3%96sterreichische_Nationalbibliothek%2C_Prunksaal_(1726)_(27870057169).jpg?width=1200",
  alt: "オーストリア国立図書館 プルンクザール（豪華絢爛なバロック建築）",
  credit: "Herbert Frank / Wikimedia Commons / CC BY 2.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Wien,_%C3%96sterreichische_Nationalbibliothek,_Prunksaal_(1726)_(27870057169).jpg",
};

const BELVEDERE_PALACE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Wien_-_Schloss_Belvedere%2C_oberes_(1).JPG?width=1200",
  alt: "バロック建築の傑作 ベルヴェデーレ上宮",
  credit: "C.Stadler/Bwag / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Wien_-_Schloss_Belvedere,_oberes_(1).JPG",
};

const RATHAUS_MARKET_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Wien_-_Christkindlmarkt%2C_Rathausplatz.JPG?width=1200",
  alt: "市庁舎前広場のクリスマスマーケット（ウィーン・クリスマス・ドリーム）",
  credit: "C.Stadler/Bwag / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Wien_-_Christkindlmarkt,_Rathausplatz.JPG",
};

const PETERSKIRCHE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Wien_-_Peterskirche%2C_Innenansicht.JPG?width=1200",
  alt: "ペーター教会の壮麗なバロック様式の祭壇とドーム天井",
  credit: "C.Stadler/Bwag / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Wien_-_Peterskirche,_Innenansicht.JPG",
};

const KHM_CAFE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Cafe_Kunsthistorisches_Museum_Wien.jpg?width=1200",
  alt: "美術史美術館の八角形大ドーム下に広がる豪奢なカフェ・レストラン",
  credit: "Wikimedia Commons / CC BY-SA 3.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Cafe_Kunsthistorisches_Museum_Wien.jpg",
};

const CHARLES_BRIDGE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Charles_Bridge,_Prague_pic1.JPG?width=1200",
  alt: "ヴルタヴァ川にかかるカレル橋とプラハ城の遠景",
  credit: "Alf van Beem / Wikimedia Commons / Public domain",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Charles_Bridge,_Prague_pic1.JPG",
};

const ST_VITUS_CATHEDRAL_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Saint_Vitus_Cathedral_in_Prague,_Czech_Republic.jpg?width=1200",
  alt: "プラハ城内にそびえる聖ヴィート大聖堂のゴシック様式ファサード",
  credit: "Eric Ward / Wikimedia Commons / CC BY-SA 2.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Saint_Vitus_Cathedral_in_Prague,_Czech_Republic.jpg",
};

const STRAHOV_LIBRARY_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Strahov_Theological_Hall,_Prague_-_7565.jpg?width=1200",
  alt: "ストラホフ修道院図書館の壮麗なバロック様式「神学の間」",
  credit: "Jorge Láscar / Wikimedia Commons / CC BY 2.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Strahov_Theological_Hall,_Prague_-_7565.jpg",
};

const ASTRONOMICAL_CLOCK_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/The_Prague_Astronomical_Clock_in_Old_Town_-_8559.jpg?width=1200",
  alt: "旧市庁舎の壁面に佇むプラハの天文時計（プラハのオルロイ）",
  credit: "Wikimedia Commons / CC BY-SA 3.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:The_Prague_Astronomical_Clock_in_Old_Town_-_8559.jpg",
};

const GOLDEN_LANE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Prague_-_Zlata_ulicka.jpg?width=1200",
  alt: "プラハ城内の色鮮やかで可愛らしい黄金の小路",
  credit: "Wikimedia Commons / CC BY-SA",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Prague_-_Zlata_ulicka.jpg",
};

const TYN_CHURCH_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Church_of_Our_Lady_before_T%C3%BDn,_Prague.jpg?width=1200",
  alt: "旧市街広場にそびえるティーン聖母教会のゴシック様式双塔",
  credit: "LibertinaGrim / Wikimedia Commons / CC BY-SA 3.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Church_of_Our_Lady_before_T%C3%BDn,_Prague.jpg",
};

const MUNICIPAL_HOUSE_IMAGE = {
  src: "https://commons.wikimedia.org/wiki/Special:FilePath/Prague_Municipal_House_01.jpg?width=1200",
  alt: "アールヌーヴォー建築の最高傑作 プラハ市民会館（Obecní dům）",
  credit: "Uoaei1 / Wikimedia Commons / CC BY-SA 4.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Prague_Municipal_House_01.jpg",
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
      { time: "14:00頃", label: "100E エアポートエクスプレス 乗車", desc: "市内行き直通バスに乗車。「Astoria M（アストリア）」で降車（約35分・専用券 2,500HUF/人・クレカタッチ決済可）", icon: "🚌", coords: [47.4369, 19.2556] },
      { time: "14:45頃", label: "Astoria M 降車 ─ ホテルへ移動", desc: "Astoria Mバス停からホテル（Károly krt. 10）へ徒歩約1分。大通り沿いでアクセス抜群", icon: "🚶", coords: [47.4947, 19.0595] },
      { time: "15:00頃", label: "Budapest Panorama Central チェックイン", desc: "チェックインして荷物を置きひと息・身支度。スーペリア ダブルルーム スパバス付（2泊）", icon: "🏨", important: true, url: "https://budapestpanoramacentral.com/", mapUrl: "https://maps.google.com/?q=Budapest+Panorama+Central", coords: [47.4947, 19.0595] },
      { time: "15:45", label: "ホテル出発 ─ ドナウ河畔・くさり橋へ", desc: "Astoriaから徒歩約10分、またはトラム47/49番でDeák Ferenc tér経由でドナウ河畔へ移動。くさり橋ペシュト側へ", icon: "🚃", coords: [47.4947, 19.0595] },
      { time: "16:15", label: "くさり橋（Széchenyi Lánchíd）渡橋", desc: "【コース1】ドナウ川にかかるブダペスト最古の美しい吊り橋。歩行者専用歩道を歩きながらペシュト側からブダ側へ渡橋（徒歩約15分）。日没（16:15頃）の夕暮れの光が差し込む絶景", icon: "🌉", important: true, mapUrl: "https://maps.google.com/?q=Sz%C3%A9chenyi+L%C3%A1nch%C3%ADd", coords: [47.4990, 19.0437], image: CHAIN_BRIDGE_IMAGE },
      { time: "16:30", label: "ヴァールケルト・バザール（Várkert Bazár）", desc: "【コース2】王宮の東麓に広がるネオルネサンス様式の庭園・回廊建築（ミクローシュ・イブル設計）。美しい庭園からエスカレーター/エレベーターを使って王宮の丘へ無料で上がれる（徒歩5分）", icon: "🏛", url: "https://varkertbazar.hu/", mapUrl: "https://maps.google.com/?q=V%C3%A1rkert+Baz%C3%A1r+Budapest", coords: [47.4947, 19.0416], image: VARKERT_BAZAR_IMAGE },
      { time: "16:45", label: "ブダ王宮（Budavári Palota）＆ 展望テラス", desc: "【コース3】歴代国王の居城であった壮大な宮殿。サヴォイア公オイゲン騎馬像前のテラスから、夕暮れ〜ライトアップで黄金に輝き始めるドナウ川・くさり橋・対岸の国会議事堂を一望（徒歩15分）", icon: "🏰", important: true, url: "https://budacastlebudapest.com/", mapUrl: "https://maps.google.com/?q=Buda+Castle+Budapest", coords: [47.4962, 19.0396], image: BUDA_CASTLE_IMAGE },
      { time: "17:15", label: "ルスヴルム・ツクラースダ（Ruszwurm Cukrászda）", desc: "【コース4】1827年創業、王宮の丘で最も古くハプスブルク皇妃エリザベート（シシィ）も愛した老舗カフェ。名物の伝統カスタードケーキ「ルスヴルム・クレーメシュ」で優雅なカフェ休憩（徒歩1分）", icon: "☕", important: true, url: "http://www.ruszwurm.hu/", mapUrl: "https://maps.google.com/?q=Ruszwurm+Cukr%C3%A1szda+Budapest", coords: [47.5015, 19.0331] },
      { time: "17:50", label: "三位一体広場（Szentháromság tér）", desc: "【コース5】王宮地区の中心広場。ペスト終息を神に感謝して18世紀初頭に建てられたバロック様式の「三位一体の柱」が中央にそびえる（徒歩すぐ）", icon: "🏛", mapUrl: "https://maps.google.com/?q=Szenth%C3%A1roms%C3%A1g+t%C3%A9r+Budapest", coords: [47.5017, 19.0341] },
      { time: "18:00", label: "マーチャーシュ教会（Mátyás-templom）", desc: "【コース6】歴代ハンガリー国王の戴冠式が行われたゴシック様式の名教会。色鮮やかなジョルナイ製ダイヤモンド柄の屋根瓦と壮麗な尖塔がライトアップされて夜空に浮かび上がる（徒歩すぐ）", icon: "⛪", important: true, url: "https://matyas-templom.hu/", mapUrl: "https://maps.google.com/?q=Matthias+Church+Budapest", coords: [47.5019, 19.0342], image: MATTHIAS_CHURCH_IMAGE },
      { time: "18:20", label: "漁夫の砦（Halászbástya）", desc: "【コース7】7つの尖塔と白亜の回廊が連なるロマンチックな展望砦。回廊のアーチ窓越しに、漆黒のドナウ川と黄金色に輝く国会議事堂を見渡すブダペスト随一の夜景名所（徒歩すぐ・夜間は上層テラスも無料開放）", icon: "🏰", important: true, url: "https://www.fishermansbastion.com/", mapUrl: "https://maps.google.com/?q=Fisherman%27s+Bastion+Budapest", coords: [47.5022, 19.0347], image: FISHERMANS_BASTION_IMAGE },
      { time: "18:50", label: "ホワイト・レイヴン・スカイバー＆ラウンジ", desc: "【コース8・GOAL】ヒルトン・ブダペストの屋上に位置する最高峰ルーフトップバー。マーチャーシュ教会の屋根瓦とドナウ夜景を間近に見下ろしながら、特製カクテルとディナーで初日の夜を乾杯（スマートカジュアル・要事前予約）", icon: "🍸", important: true, url: "https://whiteravenskybar.com/", mapUrl: "https://maps.google.com/?q=White+Raven+Skybar+Budapest", coords: [47.5027, 19.0340] },
      { time: "21:00", label: "ホテル帰着 ＆ 就寝", desc: "三位一体広場前から16番バスでDeák Ferenc térへ（約10分）。徒歩約5分またはトラムでBudapest Panorama Centralへ戻り就寝", icon: "🏨", coords: [47.4947, 19.0595] },
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
        key: "budapest-panorama-central-d1",
        icon: "🏨",
        title: "Budapest Panorama Central（ブダペスト 2泊）",
        url: "https://budapestpanoramacentral.com/",
        mapUrl: "https://maps.google.com/?q=Budapest+Panorama+Central",
        details: [
          { label: "施設名", value: "Budapest Panorama Central（ブダペスト パノラマ セントラル）" },
          { label: "宿泊期間", value: "2026年11月18日（水）〜 11月20日（金）（2泊）" },
          { label: "部屋・人数", value: "スーペリア ダブルルーム スパバス付 ／ 大人2名・1部屋" },
          { label: "住所", value: "1052 Budapest, Károly krt. 10, Hungary" },
          { label: "最寄り", value: "地下鉄M2「Astoria」駅 徒歩1分 ／ 100E空港バス「Astoria M」降車すぐ" },
          { label: "チェックイン", value: "14:00〜 ／ チェックアウト 〜11:00" },
          { label: "料金", value: "換算目安 ¥26,397（合計料金・2泊）" },
          { label: "予約状況", value: "予約確定" },
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
      { time: "09:00", label: "ホテル出発 → Kossuth Lajos térへ", desc: "地下鉄M2「Astoria」駅から直通2駅で「Kossuth Lajos tér」駅へ移動（約5分・乗換なし）", icon: "🚇", coords: [47.4947, 19.0595] },
      { time: "09:30", label: "ハンガリー国会議事堂（Országház）", desc: "【コース1】ドナウ河畔に佇む壮麗なネオゴシック建築。大階段の間・ドームの間（聖イシュトヴァーンの王冠）・旧上院議場を巡る内部ツアー（非EU大人14,000HUF・要事前予約）。河畔の「ドナウ川遊歩道の靴」もすぐ（徒歩10分）", icon: "🏛", important: true, url: "https://www.parlament.hu/en/web/house-of-the-national-assembly/", mapUrl: "https://maps.google.com/?q=Hungarian+Parliament+Building", coords: [47.5071, 19.0457], image: PARLIAMENT_IMAGE },
      { time: "10:45", label: "旧郵便貯金局（Postatakarékpénztár）", desc: "【コース2】「ハンガリーのガウディ」レフネル・エデン設計のアール・ヌーヴォー建築傑作（現ハンガリー国立銀行別館・Hold u. 4）。ジョルナイ陶器のカラフルな屋根飾りやミツバチ・植物モチーフの外観レリーフが見どころ（外観見学・徒歩5分）", icon: "🏦", mapUrl: "https://maps.google.com/?q=Postatakar%C3%A9kp%C3%A9nzt%C3%A1r+Hold+utca+4+Budapest", coords: [47.5034, 19.0532], image: POSTAL_SAVINGS_BANK_IMAGE },
      { time: "11:15", label: "聖イシュトヴァーン大聖堂（Szent István-bazilika）", desc: "【コース3】初代国王を祀るブダペスト最大のカトリック教会。高さ96mの大ドーム、黄金の天井装飾、聖遺物（右手のミイラ）が見どころ。展望パノラマテラスからは市内360度を一望（徒歩10分）", icon: "⛪", important: true, url: "https://www.bazilika.biz/", mapUrl: "https://maps.google.com/?q=St.+Stephen%27s+Basilica+Budapest", coords: [47.5009, 19.0540], image: ST_STEPHEN_BASILICA_IMAGE },
      { time: "12:00", label: "アンドラーシ通り（Andrássy út）散策 ＆ ランチ", desc: "【コース4】「ブダペストのシャンゼリゼ」と称される世界遺産の大通り。優美な19世紀貴族邸宅が並ぶ並木道を散策しながら、伝統レストランで名物グヤーシュやパプリカーシュ・チルケのランチ（徒歩3分）", icon: "🍽", important: true, mapUrl: "https://maps.google.com/?q=Andr%C3%A1ssy+%C3%BAt+Budapest", coords: [47.5018, 19.0583] },
      { time: "13:30", label: "ハンガリー国立歌劇場（Magyar Állami Operaház）", desc: "【コース5】ミクローシュ・イブル設計によるネオルネサンス様式の豪奢な歌劇場。大理石の大階段、金箔とフレスコ画で飾られた壮麗な客席、スフィンクス像が美しい（徒歩10分）", icon: "🎭", url: "https://www.opera.hu/", mapUrl: "https://maps.google.com/?q=Hungarian+State+Opera+House", coords: [47.5028, 19.0582], image: OPERA_HOUSE_IMAGE },
      { time: "14:15", label: "リスト・フェレンツ記念館（Liszt Ferenc Emlékmúzeum）", desc: "【コース6】大作曲家フランツ・リストが晩年に暮らした旧音楽院のアパートメント（Vörösmarty u. 35）。愛用のベーゼンドルファーやチッカリングのピアノ、直筆楽譜、書斎が当時のまま保存されている（入場2,000HUF・徒歩7分）", icon: "🎼", important: true, url: "https://lisztmuseum.hu/", mapUrl: "https://maps.google.com/?q=Liszt+Ferenc+Memorial+Museum+Budapest", coords: [47.5070, 19.0664] },
      { time: "15:15", label: "英雄広場（Hősök tere）", desc: "【コース7】地下鉄M1線（世界遺産）に乗車またはアンドラーシ通りを進み、ハンガリー建国1000年を記念して造られた大広場へ。大天使ガブリエル像と歴代英雄の列柱像が立ち並ぶ（徒歩3分）", icon: "🏛", important: true, mapUrl: "https://maps.google.com/?q=H%C5%91s%C3%B6k+tere+Budapest", coords: [47.5149, 19.0779], image: HEROES_SQUARE_IMAGE },
      { time: "15:45", label: "市民公園（Városliget）", desc: "【コース8】英雄広場の背後に広がる広大な歴史的公園。池やヴァイダフニャディ城の景観を楽しみながら散策（徒歩8分）", icon: "🌳", url: "https://ligetbudapest.hu/", mapUrl: "https://maps.google.com/?q=V%C3%A1rosliget+Budapest", coords: [47.5142, 19.0833], image: VAJDAHUNYAD_CASTLE_IMAGE },
      { time: "16:15", label: "国立民族博物館（Néprajzi Múzeum）", desc: "【コース9・GOAL】市民公園内に2022年オープンした世界最高峰の現代建築（リゲット・ブダペスト計画）。緩やかに湾曲した巨大な屋上緑地テラスから公園と市内を一望。伝統文化・民族資料の充実展示（GOAL）", icon: "🏛", important: true, url: "https://www.neprajz.hu/", mapUrl: "https://maps.google.com/?q=Museum+of+Ethnography+Budapest", coords: [47.5126, 19.0805] },
      { time: "18:00", label: "ペシュト中心部へ移動 ＆ ディナー", desc: "世界遺産の地下鉄M1線（レトロな黄色い車両）で市内中心Vörösmarty tér方面へ戻りディナー。乗船場所のヴィガード広場（Vigadó tér）へ移動", icon: "🍽", coords: [47.4950, 19.0505] },
      { time: "20:00", label: "ドナウ川 ナイト観光クルーズ（ウェルカムドリンク付）", desc: "Vigadó tér 5番桟橋（Mahart Cruises）から出航。漆黒のドナウ川から黄金色に輝く国会議事堂・ブダ城・くさり橋を船上から一望する約1時間のパノラマクルーズ（ドリンク1杯付）", icon: "🚢", important: true, url: "https://www.getyourguide.com/ja-jp/budapest-l29/budapest-by-night-sightseeing-cruise-with-welcome-drink-t69093/?ranking_uuid=fe4b4ba7-6cca-4332-84b1-3f2915ccea8c&q=%E3%82%AF%E3%83%AB%E3%83%BC%E3%82%BA%EF%BC%86%E3%83%9C%E3%83%BC%E3%83%88%E3%83%84%E3%82%A2%E3%83%BC%2C+%E3%83%96%E3%83%80%E3%83%9A%E3%82%B9%E3%83%88", coords: [47.4950, 19.0505] },
      { time: "21:30", label: "ホテル帰着 ＆ 翌朝の移動準備", desc: "Budapest Panorama Centralへ帰着。翌朝のウィーン行きRailjet（Keleti 08:40発）に向けて荷造り・就寝", icon: "🏨", coords: [47.4947, 19.0595] },
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
        key: "budapest-panorama-central-d2",
        icon: "🏨",
        title: "Budapest Panorama Central（連泊 2日目）",
        url: "https://budapestpanoramacentral.com/",
        mapUrl: "https://maps.google.com/?q=Budapest+Panorama+Central",
        details: [
          { label: "施設名", value: "Budapest Panorama Central（ブダペスト パノラマ セントラル）" },
          { label: "部屋", value: "スーペリア ダブルルーム スパバス付" },
          { label: "住所", value: "1052 Budapest, Károly krt. 10, Hungary" },
          { label: "最寄り", value: "地下鉄M2「Astoria」駅 徒歩1分" },
          { label: "翌朝アクセス", value: "チェックアウト後、地下鉄M2「Astoria」からKeleti駅へ直通2駅（約4分）" },
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
    title: "ブダペスト → ウィーン ＆ 旧市街散策・バロック宮廷図書館・市庁舎クリスマスマーケット",
    color: "#4a7a9a",
    icon: "🚄",
    schedule: [
      { time: "07:45頃", label: "ホテル チェックアウト・Keleti駅へ移動", desc: "Budapest Panorama Centralをチェックアウト。地下鉄M2「Astoria」から「Keleti pályaudvar」へ直通2駅（約4分）。出発30分前には駅に到着", icon: "🏨", coords: [47.4947, 19.0595] },
      { time: "08:40", label: "ブダペスト東駅（Keleti）発", desc: "Railjet 62（直通・約2時間40分）。ÖBB/MÁV共同運行。車内Wi-Fi・電源あり。車窓の風景を眺めながら快適に移動", icon: "🚆", important: true, coords: [47.5001, 19.0839] },
      { time: "11:20", label: "ウィーン中央駅（Wien Hbf）着", desc: "音楽と芸術の都ウィーンに到着。駅構内で48時間市内交通券を購入（またはWienMobilアプリで有効化）", icon: "🚉", coords: [48.1848, 16.3765] },
      { time: "11:50", label: "ウィーン中央駅 → ARCOTEL Wimberger Wien", desc: "Wien Hbfからトラム18番でWestbahnhof方面へ直通約18分。ホテルはNeubaugürtel 34-36、西駅・U6駅すぐの好立地", icon: "🚋", coords: [48.2049, 16.3378] },
      { time: "12:15", label: "ホテル到着・荷物預け（アーリーチェックイン確認）", desc: "12:00〜13:00の到着をリクエスト済み。入室できれば身支度、できなければ荷物を預けて身軽になり旧市街へ", icon: "🏨", important: true, url: "https://www.arcotel.com/en/hotels/vienna/arcotel-wimberger/", mapUrl: "https://maps.google.com/?q=ARCOTEL+Wimberger+Wien", coords: [48.2049, 16.3378] },
      { time: "12:45", label: "地下鉄U3で旧市街中心へ移動", desc: "徒歩4分のWestbahnhof（西駅）から地下鉄U3に乗車。乗換なし直通8分で「Stephansplatz」駅へ到着", icon: "🚇", coords: [48.2085, 16.3721] },
      { time: "13:00", label: "Lugeck（ルゲック）でウィーンランチ", desc: "【ランチ】フィグルミュラー系列のモダンタバーン。歴史的洋館（Regensburger Hof）で名物シュニッツェルやグラシュを気取らず上質に堪能（徒歩3分）", icon: "🍽", important: true, url: "https://www.lugeck.com/", mapUrl: "https://maps.google.com/?q=Lugeck+Vienna", coords: [48.2096, 16.3749] },
      { time: "14:00", label: "シュテファン大聖堂（Stephansdom）＆ 北塔展望台", desc: "【コース1】ウィーンの象徴。壮麗なゴシック建築と色鮮やかなモザイク屋根。エレベーターで上がれる「北塔（Pummerinの大鐘）」から旧市街の街並みを一望（徒歩すぐ）", icon: "⛪", important: true, url: "https://www.stephanskirche.at/", mapUrl: "https://maps.google.com/?q=Stephansdom+Vienna", coords: [48.2085, 16.3721], image: ST_STEPHANS_VIENNA_IMAGE },
      { time: "14:45", label: "グラーベン ＆ ペーター教会（Peterskirche）散策", desc: "【コース2】歩行者天国の優美な大通り「グラーベン」を散策。ペスト記念柱と、壮麗なバロック装飾が施されたペーター教会へ立ち寄り（入場無料・徒歩5分）", icon: "🏛", url: "https://www.peterskirche.at/", mapUrl: "https://maps.google.com/?q=Peterskirche+Vienna", coords: [48.2094, 16.3700], image: PETERSKIRCHE_IMAGE },
      { time: "15:30", label: "オーストリア国立図書館 プルンクザール（Prunksaal）", desc: "【コース3】ホーフブルク（王宮）ヨーゼフ広場にある「世界一美しいバロック宮廷図書館」。20万冊の革装丁古書と壮大な天井フレスコ画が織りなす空間（入場€10・徒歩5分）", icon: "📚", important: true, url: "https://www.onb.ac.at/en/museums/state-hall", mapUrl: "https://maps.google.com/?q=Prunksaal+der+%C3%96sterreichischen+Nationalbibliothek", coords: [48.2064, 16.3669], image: PRUNKSAAL_IMAGE },
      { time: "16:30", label: "ゲルストナー皇室御用達菓子店（Gerstner）カフェ休憩", desc: "【カフェ】1847年創業、国立歌劇場向かいの老舗。1階ショップから3階サロンへ上がると宮殿のような豪奢な空間。本場のザッハトルテやメランジェで贅沢なティータイム（徒歩7分）", icon: "☕", important: true, url: "https://www.gerstner-konditorei.at/", mapUrl: "https://maps.google.com/?q=Gerstner+K.u.K.+Hofzuckerb%C3%A4cker+Vienna", coords: [48.2033, 16.3698] },
      { time: "17:30", label: "市庁舎前広場 クリスマスマーケット（Christkindlmarkt）", desc: "【コース4】ウィーン最大規模の夢のマーケット。壮麗なネオゴシック様式の市庁舎が金色にライトアップされ、巨大ツリーと無数の屋台が輝く絶景。特製マグカップで温かいプンシュを味わう（トラム1番で移動約10分）", icon: "🎄", important: true, url: "https://www.christkindlmarkt.at/", mapUrl: "https://maps.google.com/?q=Christkindlmarkt+Rathausplatz+Vienna", coords: [48.2109, 16.3575], image: RATHAUS_MARKET_IMAGE },
      { time: "19:15", label: "Meissl & Schadn で正統派ディナー", desc: "【ディナー】リング通り沿いの上品なレストラン。オープンキッチンで揚げる本場仔牛のウィーナーシュニッツェルをゆったりと堪能（市庁舎からトラム1番で約10分・要事前予約）", icon: "🍽", important: true, url: "https://meisslundschadn.at/en/meissl-schadn-vienna/", mapUrl: "https://maps.google.com/?q=Meissl+%26+Schadn+Wien", coords: [48.2017, 16.3734] },
      { time: "21:15", label: "夜景トラム ＆ ホテル帰着", desc: "ライトアップされたリング通りの建築美を眺めながらトラムまたは地下鉄でWestbahnhofへ戻り、ARCOTEL Wimbergerでゆっくり休む", icon: "🏨", coords: [48.2049, 16.3378] },
    ],
    dinner: {
      title: "ウィーン初日 ディナー候補（金曜夜・予約推奨）",
      options: [
        {
          name: "Meissl & Schadn Wien",
          genre: "正統派仔牛シュニッツェル・オープンキッチン",
          desc: "リング通り沿いの格式ある名店。職人が目の前で叩いて揚げる本場仔牛のシュニッツェル。落ち着いた夫婦ディナーに最適",
          tel: "+43 1 90211",
          url: "https://meisslundschadn.at/en/meissl-schadn-vienna/",
          mapUrl: "https://maps.google.com/?q=Meissl+%26+Schadn+Wien",
          coords: [48.2017, 16.3734],
        },
        {
          name: "Plachutta Wollzeile",
          genre: "皇帝が愛した名物宮廷料理ターフェルシュピッツ",
          desc: "ブイヨンで柔らかく煮込んだ最高級牛肉。熱々スープから骨髄トースト、ホースラディッシュソースまで味わう至高の体験",
          tel: "+43 1 5121577",
          url: "https://www.plachutta.at/en/",
          mapUrl: "https://maps.google.com/?q=Plachutta+Wollzeile+Vienna",
          coords: [48.2089, 16.3780],
        },
        {
          name: "Lugeck（フィグルミュラー系列）",
          genre: "現代風ウィーン料理＆オーストリアワイン",
          desc: "歴史あるRegensburger Hof内のスタイリッシュなタバーン。名物シュニッツェルやグラシュを気取らず上質な雰囲気で",
          tel: "+43 1 5125060",
          url: "https://www.lugeck.com/",
          mapUrl: "https://maps.google.com/?q=Lugeck+Vienna",
          coords: [48.2096, 16.3749],
        },
      ],
    },
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
      title: "ウィーン初日 到着＆市内観光メモ",
      body: (
        <>
          <b>48時間市内交通券</b>：大人 €14.10 /人（WienMobilアプリまたは駅券売機で購入）。地下鉄・トラム・バスが48時間乗り放題。<br/>
          <b>ホテルアクセス</b>：ウィーン西駅（Westbahnhof）から徒歩4分、U6 Burggasse-Stadthalleから徒歩1分。西駅から旧市街中心（Stephansplatz）へは地下鉄U3で直通わずか8分。<br/>
          <b>国立図書館プルンクザール</b>：王宮ヨーゼフ広場。開館 10:00〜18:00。入場料大人€10。世界屈指のバロック宮廷図書館。<br/>
          <b>ゲルストナー（Gerstner）</b>：オペラ座前（10:00〜21:00）。3階の宮殿サロンが格別。名物ザッハトルテとメランジェ。<br/>
          <b>市庁舎前クリスマスマーケット</b>：10:00〜22:00（入場無料）。16:30の日没以降、市庁舎の黄金ライトアップとイルミネーションが最高潮を迎えます。<br/>
          <b>ディナー予約</b>：金曜夜は混み合うため、Meissl & Schadn や Plachutta は日本出発前のweb予約を推奨。
        </>
      ),
    },
    extraBookings: [
      {
        key: "arcotel-wimberger-vienna",
        icon: "🏨",
        title: "ARCOTEL Wimberger Wien（ウィーン 2泊）",
        url: "https://www.arcotel.com/en/hotels/vienna/arcotel-wimberger/",
        mapUrl: "https://maps.google.com/?q=ARCOTEL+Wimberger+Wien",
        details: [
          { label: "施設名", value: "ARCOTEL Wimberger Wien" },
          { label: "宿泊期間", value: "2026年11月20日（金）〜 11月22日（日）（2泊）" },
          { label: "部屋・人数", value: "コンフォート ダブルルーム ／ 大人2名・1部屋" },
          { label: "住所", value: "Neubaugürtel 34-36, 07区 ノイバウ, 1070 ウィーン, オーストリア" },
          { label: "電話", value: "+43 1 521650" },
          { label: "チェックイン", value: "15:00から（12:00〜13:00の到着・チェックインをリクエスト済み／空き状況による）" },
          { label: "チェックアウト", value: "2026年11月22日（日）11:00まで" },
          { label: "食事", value: "なし（禁煙ルーム）" },
          { label: "料金", value: "€198.61（支払済・約¥40,277／税・サービス料込み）" },
          { label: "予約状況", value: "Booking.com 予約済（予約番号 5340692962）" },
        ],
      },
    ],
  },
  {
    day: 4,
    date: "11月21日（土）",
    title: "ウィーン ─ シェーンブルン宮殿・ベルヴェデーレ上宮 ＆ 芸術とマーケット巡り",
    color: "#4a7a9a",
    icon: "👑",
    schedule: [
      { time: "08:45", label: "ホテル出発 → 西駅からシェーンブルンへ", desc: "Westbahnhofからトラム52/60番またはU6→U4で約15〜20分。朝の澄んだ空気の中、夏の離宮へ向かう", icon: "🚋", coords: [48.2049, 16.3378] },
      { time: "09:15", label: "シェーンブルン宮殿（Schloss Schönbrunn）", desc: "【コース1】ハプスブルク家の夏の離宮（世界遺産）。マリア・テレジアが愛した壮麗な大広間やモーツァルトが演奏した鏡の間を巡るグランドツアー（要事前予約・日本語オーディオ付・約50分）", icon: "👑", important: true, url: "https://www.schoenbrunn.at/en/", mapUrl: "https://maps.google.com/?q=Sch%C3%B6nbrunn+Palace+Vienna", coords: [48.1858, 16.3128], image: SCHONBRUNN_IMAGE },
      { time: "10:30", label: "宮殿庭園 ＆ グロリエッテ遠望", desc: "【コース2】幾何学模様の広大なバロック庭園を散策。丘の上に立つ優美な凱旋門「グロリエッテ」の景観を楽しむ（徒歩15分）", icon: "🌳", mapUrl: "https://maps.google.com/?q=Gloriette+Sch%C3%B6nbrunn", coords: [48.1782, 16.3087] },
      { time: "11:15", label: "シェーンブルン宮殿前 クリスマスマーケット", desc: "【コース3】宮殿の前庭に広がる優雅なマーケット（11/6開幕）。壮麗な宮殿を背景に、質の高い伝統工芸品や木製オーナメントが並ぶ（徒歩すぐ）", icon: "🎄", important: true, url: "https://www.weihnachtsmarkt.co.at/", mapUrl: "https://maps.google.com/?q=Kultur-+und+Weihnachtsmarkt+Schloss+Sch%C3%B6nbrunn", coords: [48.1870, 16.3140] },
      { time: "12:15", label: "地下鉄U4で市内中心へ移動", desc: "地下鉄U4「Schönbrunn」駅から「Karlsplatz」へ直通約9分。リンク通り方面へ移動", icon: "🚇", coords: [48.2000, 16.3690] },
      { time: "12:45", label: "美術史美術館 カフェ・レストラン（KHM Café）でランチ", desc: "【ランチ＆カフェ】「世界一美しいミュージアムカフェ」。八角形の大ドーム直下、壮麗な大理石と金箔の空間で伝統料理やスイーツを堪能（美術館入場券が必要・徒歩7分）", icon: "🍽", important: true, url: "https://www.khm.at/en/visit/cafe-restaurant/", mapUrl: "https://maps.google.com/?q=Kunsthistorisches+Museum+Wien", coords: [48.2038, 16.3617], image: KHM_CAFE_IMAGE },
      { time: "14:15", label: "ベルヴェデーレ上宮（Oberes Belvedere）", desc: "【コース4】バロックの傑作宮殿。クリムトの世界的名作『接吻（The Kiss）』や『ユディト』、エゴン・シーレの絵画を鑑賞。上宮南庭園からの眺めも格別（要日時指定予約・トラムD番または18番で移動）", icon: "🖼", important: true, url: "https://www.belvedere.at/en", mapUrl: "https://maps.google.com/?q=Upper+Belvedere+Vienna", coords: [48.1915, 16.3809], image: BELVEDERE_PALACE_IMAGE },
      { time: "15:45", label: "ベルヴェデーレ宮殿 クリスマス村", desc: "【コース5】上宮前のバロック池を取り囲むロマンチックなクリスマス村。池の水面に宮殿とイルミネーションが映り込む絶好の写真スポット（徒歩すぐ）", icon: "🎄", mapUrl: "https://maps.google.com/?q=Weihnachtsdorf+Schloss+Belvedere", coords: [48.1925, 16.3815] },
      { time: "17:00", label: "シュピッテルベルク クリスマスマーケット", desc: "【コース6】ホテル近くのノイバウ地区。石畳の小道に暖色のランプと屋台が並び、ウィーンっ子に最も親しまれる温かいマーケット。散策しながらオーガニックフードや温かいドリンクを楽しむ（トラム18番→西駅、またはU3 Volkstheater）", icon: "🧣", important: true, url: "https://spittelberg.at/", mapUrl: "https://maps.google.com/?q=Weihnachtsmarkt+am+Spittelberg", coords: [48.2033, 16.3536] },
      { time: "18:45", label: "Glacis Beisl（グラシス・バイスル）で夫婦ディナー", desc: "【ディナー】ミュージアム・クォーター裏手の洗練されたビストロ。地元で評判のグラシュや旬のウィーン料理、オーストリアワインを落ち着いた雰囲気で堪能（シュピッテルベルクから徒歩5分・ホテルへも徒歩10分）", icon: "🍽", important: true, url: "https://www.glacisbeisl.at/", mapUrl: "https://maps.google.com/?q=Glacis+Beisl+Vienna", coords: [48.2040, 16.3570] },
      { time: "20:45", label: "ホテル帰着 ＆ 翌朝プラハ移動の荷造り・就寝", desc: "ホテル（ARCOTEL Wimberger）へ徒歩で帰着。翌朝はウィーン中央駅07:10発のRailjet 72（プラハ行き）のため早めに就寝", icon: "🏨", coords: [48.2049, 16.3378] },
    ],
    dinner: {
      title: "ウィーン2日目 ディナー候補（ホテル近く＆名店）",
      options: [
        {
          name: "Glacis Beisl（グラシス・バイスル）",
          genre: "洗練されたウィーン郷土ビストロ・中庭",
          desc: "MQ裏手、ホテルから徒歩10分。観光客の喧騒を離れ、地元の大人が通う本格グラシュや季節のウィーン料理を上質ワインとともに",
          tel: "+43 1 5265660",
          url: "https://www.glacisbeisl.at/",
          mapUrl: "https://maps.google.com/?q=Glacis+Beisl+Vienna",
          coords: [48.2040, 16.3570],
        },
        {
          name: "Zum Schwarzen Kameel（黒ラクダ）",
          genre: "1618年創業の歴史的名店・アールヌーヴォー",
          desc: "ベートーヴェンも愛した伝説の老舗。手軽なオープンサンドイッチとワインのバーから、格調高いダイニングルームまで",
          tel: "+43 1 5338125",
          url: "https://www.kameel.at/",
          mapUrl: "https://maps.google.com/?q=Zum+Schwarzen+Kameel+Vienna",
          coords: [48.2100, 16.3686],
        },
        {
          name: "Gasthaus Steman",
          genre: "地元で愛されるアットホームな老舗バイスル",
          desc: "6区の住宅街に佇む温かい木の内装。家庭的で丁寧なターフェルシュピッツやシュニッツェルをリーズナブルに味わえる隠れ家",
          tel: "+43 1 5877864",
          url: "https://www.steman.at/",
          mapUrl: "https://maps.google.com/?q=Gasthaus+Steman+Vienna",
          coords: [48.1970, 16.3548],
        },
      ],
    },
    memo: {
      bg: "linear-gradient(135deg,#f8f4e8,#f5efdc)",
      border: "#e8d8a0",
      titleColor: "#8a6a10",
      textColor: "#5a4808",
      icon: "👑",
      title: "ウィーン2日目 観光＆予約・移動メモ",
      body: (
        <>
          <b>シェーンブルン宮殿</b>：時間指定・要予約（グランドツアー推奨・日本語オーディオ付）。午前中（09:30前）が最も空いています。<br/>
          <b>ベルヴェデーレ上宮</b>：クリムト『接吻』所蔵。<b>日時指定チケットの事前購入が必須</b>（時間枠を過ぎると入場制限あり）。<br/>
          <b>美術史美術館カフェ</b>：大ドーム下の絶景カフェ。美術館チケットで入場可能。12:00〜13:30は混み合うため少し早めの入店がスムーズ。<br/>
          <b>シュピッテルベルク・マーケット</b>：土曜11:00〜21:30。ホテル徒歩圏。石畳の路地に地元工芸品やオーガニック屋台が立ち並ぶ隠れ家マーケット。<br/>
          <b>翌朝の移動（注意）</b>：Day 5はウィーン中央駅 07:10発（Railjet 72）。日曜早朝はトラム間隔が開くため、ホテルは06:30頃に出発推奨（トラム18番約20分またはタクシー約10分）。
        </>
      ),
    },
  },
  {
    day: 5,
    date: "11月22日（日）",
    title: "ウィーン → プラハ ＆ 旧市街広場・天文時計・カレル橋トワイライト",
    color: "#3a7a5a",
    icon: "🚄",
    schedule: [
      { time: "06:30頃", label: "ホテル チェックアウト・駅へ移動", desc: "ARCOTEL Wimbergerをチェックアウト。ウィーン中央駅へ移動し、駅構内のベーカリーで朝食やコーヒーを調達", icon: "🥐", coords: [48.1848, 16.3765] },
      { time: "07:10", label: "ウィーン中央駅（Wien Hbf）発", desc: "Railjet 72（直通・約4時間13分）。食堂車や車内Wi-Fi完備。日曜は混雑するため座席指定必須", icon: "🚆", important: true, coords: [48.1848, 16.3765] },
      { time: "11:23", label: "プラハ本駅（hlavní nádraží）着", desc: "百塔の街プラハに到着。地下鉄C線またはトラム・徒歩で宿（Youngmann House）へ移動（約15分）", icon: "🚉", coords: [50.0833, 14.4356] },
      { time: "11:50", label: "Youngmann House 荷物預け", desc: "Jungmannovo náměstí 14。地下鉄Můstek駅すぐの好立地。チェックイン（15:00）前に荷物を預けて身軽に旧市街へ", icon: "🏨", important: true, mapUrl: "https://maps.google.com/?q=Youngmann+House+Jungmannovo+n%C3%A1m%C4%9Bst%C3%AD+14+Prague", coords: [50.0837, 14.4205] },
      { time: "12:15", label: "U Pinkasů（ウ・ピンカスー）でチェコランチ", desc: "【ランチ】宿のすぐ真向かい！1843年にピルゼンから届いたピルスナー・ウルケルをプラハで初めて提供した歴史的ビアホール。名物スヴィーチコヴァー（牛肉のクリーム煮・クネドリーキ添え）と極上のウルケル生で乾杯（徒歩1分）", icon: "🍺", important: true, url: "https://www.upinkasu.cz/", mapUrl: "https://maps.google.com/?q=U+Pinkas%C5%AF+Prague", coords: [50.0832, 14.4223] },
      { time: "13:30", label: "旧市街広場（Staroměstské náměstí）＆ ティーン教会", desc: "【コース1】ゴシック・バロック・ロココ建築が立ち並ぶプラハの中心広場。おとぎ話の城のような2本の尖塔を持つ「ティーン聖母教会」の威容を鑑賞（徒歩7分）", icon: "🏰", important: true, mapUrl: "https://maps.google.com/?q=Old+Town+Square+Prague", coords: [50.0875, 14.4213], image: TYN_CHURCH_IMAGE },
      { time: "14:00", label: "旧市庁舎 天文時計（Orloj）＆ 展望塔", desc: "【コース2】600年以上の歴史を刻む世界最古級の天文時計。毎正時のからくり仕掛け「使徒の行進」を見学後、エレベーターで高さ約70mの展望塔へ。旧市街広場と赤い屋根の海を見渡す360度の大パノラマ（徒歩すぐ）", icon: "🕰", important: true, url: "https://prague.eu/en/objevujte/old-town-hall-with-astronomical-clock-staromestska-radnice-s-orlojem/", mapUrl: "https://maps.google.com/?q=Old+Town+Hall+Prague", coords: [50.0870, 14.4207], image: ASTRONOMICAL_CLOCK_IMAGE },
      { time: "15:15", label: "Youngmann House チェックイン", desc: "宿に戻りチェックイン。ダブルまたはツインルームで荷解き＆ひと息ついて夕暮れ観光の身支度（徒歩5分）", icon: "🏨", important: true, mapUrl: "https://maps.google.com/?q=Youngmann+House+Jungmannovo+n%C3%A1m%C4%9Bst%C3%AD+14+Prague", coords: [50.0837, 14.4205] },
      { time: "16:00", label: "旧市街橋塔 ＆ カレル橋トワイライト", desc: "【コース3】11月の日没は16:15頃！旧市街橋塔の上から、夕暮れに染まるヴルタヴァ川とライトアップされ始めたカレル橋・対岸のプラハ城を一望。その後、ガス灯が灯るカレル橋を渡り、聖ヤン・ネポムツキー像のレリーフに触れて幸運と再訪を祈願（徒歩10分）", icon: "🌉", important: true, url: "https://prague.eu/en/objevujte/old-town-bridge-tower-staromestska-mostecka-vez/", mapUrl: "https://maps.google.com/?q=Charles+Bridge+Prague", coords: [50.0865, 14.4114], image: CHARLES_BRIDGE_IMAGE },
      { time: "17:15", label: "マラー・ストラーナ ＆ カンパ島散策", desc: "【コース4】カレル橋を渡った先の小地区。ヴルタヴァ川沿いの静かなカンパ島、水車小屋の景観、平和のシンボル「ジョン・レノンの壁」をそぞろ歩き（徒歩すぐ）", icon: "🎨", mapUrl: "https://maps.google.com/?q=Lennon+Wall+Prague", coords: [50.0862, 14.4069] },
      { time: "18:30", label: "ディナー ＆ ヴルタヴァ川の夜景", desc: "【ディナー】カレル橋の夜景を目の前に望むリバーサイドレストラン「Mlýnec」または1902年創業の伝統サロン「Café Louvre」で優雅な夫婦ディナー", icon: "🍽", important: true, coords: [50.0858, 14.4137] },
      { time: "21:00", label: "夜景散策 ＆ ホテル帰着", desc: "黄金色に輝くカレル橋や旧市街の夜景を眺めながら、Youngmann Houseへ徒歩で戻り就寝", icon: "🏨", coords: [50.0837, 14.4205] },
    ],
    dinner: {
      title: "プラハ初日 ディナー候補（夫婦で楽しむ名店）",
      options: [
        {
          name: "Mlýnec（ムリーネツ）",
          genre: "カレル橋を目の前に望む最高峰モダンチェコ料理",
          desc: "カレル橋のたもと、ヴルタヴァ川に面した特等席。ミシュラン推奨。ライトアップされた橋を眺めながら、洗練されたモダンチェコ料理とワインを味わうロマンチックな夜に",
          tel: "+420 277 000 777",
          url: "https://www.mlynec.cz/",
          mapUrl: "https://maps.google.com/?q=Mlynec+Restaurant+Prague",
          coords: [50.0858, 14.4137],
        },
        {
          name: "Café Louvre（カフェ・ルーヴル）",
          genre: "1902年創業のアールヌーヴォー伝統カフェレストラン",
          desc: "カフカやアインシュタインが愛した優美なピンクのサロン。ホテルから徒歩3分。伝統チェコ料理（グヤーシュや鴨のロースト）を気品ある空間でリーズナブルに楽しめます",
          tel: "+420 224 930 949",
          url: "https://www.cafelouvre.cz/en",
          mapUrl: "https://maps.google.com/?q=Cafe+Louvre+Prague",
          coords: [50.0821, 14.4184],
        },
        {
          name: "Lokál Dlouhááá（ロカール）",
          genre: "活気あふれる最高品質タンク生ビール＆チェコ家庭料理",
          desc: "アンビアンテ系列の超人気店。徹底管理された新鮮なピルスナー・ウルケル（ハラディンカ）と、手作りのチェコ伝統家庭料理をカジュアルに堪能",
          tel: "+420 734 283 874",
          url: "https://lokal-dlouha.ambi.cz/en/",
          mapUrl: "https://maps.google.com/?q=Lokal+Dlouha+Prague",
          coords: [50.0903, 14.4258],
        },
      ],
    },
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
      icon: "🇨🇿",
      title: "プラハ初日 到着＆旧市街・カレル橋メモ",
      body: (
        <>
          <b>市内交通（PID 24時間券）</b>：車内または駅改札のオレンジ色端末にクレカタッチで購入（150 CZK/人・約¥1,000）。地下鉄・トラムが24時間乗り放題。<br/>
          <b>U Pinkasů（ウ・ピンカスー）</b>：宿（Youngmann House）の目の前。1843年創業。名物「スヴィーチコヴァー」は必食。<br/>
          <b>旧市庁舎 天文時計＆展望塔</b>：毎正時（9:00〜23:00）に使徒のからくり行進。展望塔はエレベーター完備（大人350 CZK）。広場と赤い屋根の街並みが一望できます。<br/>
          <b>旧市街橋塔＆トワイライト</b>：11月の日没は16:15頃。日没30分前の15:45〜16:00頃に橋塔へ上がると、夕暮れからガス灯・ライトアップへの美しいグラデーションを楽しめます（大人250 CZK）。<br/>
          <b>ディナー予約</b>：日曜日夜のMlýnecやCafé Louvreは事前予約（webまたは英語）を推奨。
        </>
      ),
    },
    extraBookings: [
      {
        key: "youngmann-house-prague",
        icon: "🏨",
        title: "Youngmann House（プラハ 2泊）",
        mapUrl: "https://maps.google.com/?q=Youngmann+House+Prague",
        details: [
          { label: "施設名", value: "Youngmann House" },
          { label: "住所", value: "Jungmannovo náměstí 757/14, 110 00 Praha 1, Czech Republic" },
          { label: "宿泊期間", value: "2026年11月22日（日）〜 11月24日（火）（2泊）" },
          { label: "部屋・人数", value: "ダブルまたはツインルーム ／ 大人2名" },
          { label: "チェックイン", value: "2026年11月22日（日）15:00〜" },
          { label: "チェックアウト", value: "2026年11月24日（火）午前" },
          { label: "料金", value: "¥28,407（支払い合計）／換算目安 ¥27,579" },
          { label: "予約状況", value: "Booking.com 予約済・返金不可" },
        ],
      },
    ],
  },
  {
    day: 6,
    date: "11月23日（月）",
    title: "プラハ ─ 絶景トラム22番・ストラホフ修道院・プラハ城・黄金の小路 ＆ 市民会館アールヌーヴォー",
    color: "#3a7a5a",
    icon: "🏰",
    schedule: [
      { time: "08:45", label: "ホテル出発 → トラム22番で丘の上へ", desc: "徒歩4分の国民劇場（Národní divadlo）停留所から名物トラム22番に乗車。ヴルタヴァ川を渡りマラー・ストラーナの坂を登る「動く展望台」を楽しみ、ストラホフ修道院最寄りの「Pohořelec」駅へ（約20分）", icon: "🚋", coords: [50.0811, 14.4138] },
      { time: "09:15", label: "ストラホフ修道院図書館（Strahovská knihovna）", desc: "【コース1】世界一美しいと称されるバロック様式の修道院図書館。壮大な天井フレスコ画が広がる「哲学の間」と「神学の間」を、混雑前の静かな朝一番にゆったり鑑賞（徒歩すぐ・入場150 CZK）", icon: "📚", important: true, url: "https://www.strahovskyklaster.cz/en/", mapUrl: "https://maps.google.com/?q=Strahov+Monastery+Library+Prague", coords: [50.0866, 14.3891], image: STRAHOV_LIBRARY_IMAGE },
      { time: "10:15", label: "ロレッタ教会前 ＆ フラッチャニ広場 展望テラス", desc: "【コース2】バロック建築のロレッタ教会前を通りプラハ城正門前のフラッチャニ広場へ。展望テラスから眼下に広がるプラハ市街の赤い屋根の海を一望（徒歩10分）", icon: "🏛", mapUrl: "https://maps.google.com/?q=Hradcany+Square+Prague", coords: [50.0895, 14.3980] },
      { time: "10:45", label: "プラハ城（Pražský hrad）メインサーキット", desc: "【コース3】千年の歴史を誇る世界最大級の城郭。聖ヴィート大聖堂（St. Vitus）の圧巻のゴシック建築とアルフォンス・ミュシャ（ムハ）制作の息をのむステンドグラス『聖キリルと聖メトディウス』、旧王宮の壮大なヴラディスラフ・ホール、聖イジー聖堂を見学（メインサーキットチケット 450 CZK）", icon: "🏰", important: true, url: "https://www.hrad.cz/en", mapUrl: "https://maps.google.com/?q=Prague+Castle", coords: [50.0909, 14.4005], image: ST_VITUS_CATHEDRAL_IMAGE },
      { time: "12:15", label: "黄金の小路（Zlatá ulička）", desc: "【コース4】城壁沿いに並ぶパステルカラーの可愛らしい小さな家々。かつて錬金術師や城警備兵が暮らし、作家フランツ・カフカが一時期仕事場とした22番の青い家を見学（サーキットチケットに含まれる・徒歩すぐ）", icon: "🏘", important: true, mapUrl: "https://maps.google.com/?q=Golden+Lane+Prague", coords: [50.0919, 14.4040], image: GOLDEN_LANE_IMAGE },
      { time: "13:00", label: "Kuchyň（クヒィニ）で絶景テラスランチ", desc: "【ランチ】プラハ城正門前（サラーバ宮殿テラス）。アンビアンテ系列。厨房の大鍋のフタを開けて好みの料理を直接選ぶユニークな伝統チェコ料理店。プラハの街並みを見下ろすパノラマテラスで極上のピルスナー生とチェコ料理を堪能（徒歩10分）", icon: "🍽", important: true, url: "https://kuchyn.ambi.cz/en/", mapUrl: "https://maps.google.com/?q=Kuchyn+Restaurant+Prague+Castle", coords: [50.0894, 14.3972] },
      { time: "14:30", label: "旧登城道（Staré zámecké schody）を下り新市街へ", desc: "【散策】プラハ城東門からブドウ畑沿いの「旧登城道」階段を下り、マラー・ストラーナ側へ。地下鉄A線「Malostranská」またはトラムでヴルタヴァ川を渡り「Náměstí Republiky（共和国広場）」へ移動（約15分）", icon: "🚶", coords: [50.0918, 14.4098] },
      { time: "15:30", label: "市民会館（Obecní dům）＆ 火薬塔（Prašná brána）", desc: "【コース5】プラハ・アールヌーヴォー建築の最高傑作。アルフォンス・ミュシャが壁画と天井画を手掛けた「市長の間」やスメタナホール、隣接する15世紀ゴシック様式の火薬塔を鑑賞（徒歩すぐ）", icon: "🏛", important: true, url: "https://www.obecnidum.cz/en/", mapUrl: "https://maps.google.com/?q=Municipal+House+Prague", coords: [50.0877, 14.4282], image: MUNICIPAL_HOUSE_IMAGE },
      { time: "16:30", label: "Kavárna Obecní dům または Café Imperialでカフェ休憩", desc: "【カフェ】市民会館1階の華麗なアールヌーヴォーカフェ、または徒歩5分の「Café Imperial」へ。大理石のテーブルとシャンデリアの下、名物ケーキとヴィエナコーヒーで優雅なティータイム", icon: "☕", important: true, url: "https://www.cafeimperial.cz/en/", mapUrl: "https://maps.google.com/?q=Cafe+Imperial+Prague", coords: [50.0898, 14.4326] },
      { time: "18:30", label: "Café Imperial で優雅なディナー", desc: "【ディナー】1914年創業、壁一面の陶器モザイク装飾が息をのむ美しさのアールデコ名店（ミシュラン選出）。有名シェフZdeněk Pohlreichによる名物「仔牛の頬肉の赤ワイン煮込み」や伝統スヴィーチコヴァーで特別な夫婦ディナー（要事前予約）", icon: "🍽", important: true, url: "https://www.cafeimperial.cz/en/", mapUrl: "https://maps.google.com/?q=Cafe+Imperial+Prague", coords: [50.0898, 14.4326] },
      { time: "20:30", label: "夜のヴァーツラフ広場散策 ＆ ホテル帰着", desc: "共和国広場からヴァーツラフ広場を通り、ライトアップされた国立博物館を遠望しながらYoungmann Houseへ徒歩で帰着。翌朝の帰国フライトに向けて荷造り・就寝", icon: "🧳", coords: [50.0837, 14.4205] },
    ],
    dinner: {
      title: "プラハ2日目 ディナー候補（アールデコ名店＆伝統料理）",
      options: [
        {
          name: "Café Imperial（カフェ・インペリアル）",
          genre: "1914年創業・壁一面の陶器モザイクが壮麗なアールデコ名店",
          desc: "ミシュランガイド選出。有名シェフ監修の「仔牛の頬肉の赤ワイン煮込み」や洗練されたチェコ料理。歴史的宮殿のような贅沢な空間で夫婦の忘れられない夜に",
          tel: "+420 246 011 440",
          url: "https://www.cafeimperial.cz/en/",
          mapUrl: "https://maps.google.com/?q=Cafe+Imperial+Prague",
          coords: [50.0898, 14.4326],
        },
        {
          name: "Plzeňská restaurace v Obecním domě",
          genre: "市民会館地下の壮麗なアールヌーヴォー伝統ビアホール",
          desc: "美しい陶器タイルとステンドグラスに囲まれたアールヌーヴォー地下ホール。伝統的なローストポーク、鴨料理、焼きたてプレッツェルとピルスナー生",
          tel: "+420 222 002 780",
          url: "https://www.plzenskarestaurace.cz/en/",
          mapUrl: "https://maps.google.com/?q=Plzenska+restaurace+v+Obecnim+dome",
          coords: [50.0877, 14.4282],
        },
        {
          name: "Čestr（チェストル）",
          genre: "熟成チェコ牛ステーキとクラフトビールのモダン名店",
          desc: "アンビアンテ系列のモダン肉料理店。国立博物館そば。チェコ原産の熟成牛を炭火で焼き上げる絶品ステーキを落ち着いたモダンな空間で堪能",
          tel: "+420 734 684 000",
          url: "https://cestr.ambi.cz/en/",
          mapUrl: "https://maps.google.com/?q=Cestr+Restaurant+Prague",
          coords: [50.0802, 14.4312],
        },
      ],
    },
    memo: {
      bg: "linear-gradient(135deg,#f0f8f4,#eaf5f0)",
      border: "#b0dcc8",
      titleColor: "#1a6a40",
      textColor: "#0a3a20",
      icon: "🏰",
      title: "プラハ城・ストラホフ修道院・市民会館 観光メモ",
      body: (
        <>
          <b>トラム22番の活用</b>：プラハ城へ徒歩で登ると長い急坂になりますが、トラム22番で「Pohořelec」まで上がると、ストラホフ修道院からプラハ城へ下り勾配で楽に周遊できます。<br/>
          <b>ストラホフ修道院図書館</b>：開館 9:00〜17:00（12:00〜13:00昼休み休館あり）。入場料 150 CZK。朝一番（9:15頃）が最も空いていて美しい光が差し込みます。<br/>
          <b>プラハ城 メインサーキット</b>：大人 450 CZK（2日間有効）。聖ヴィート大聖堂、旧王宮、聖イジー聖堂、黄金の小路に入場可能。聖ヴィート大聖堂のミュシャ（ムハ）ステンドグラスは必見。<br/>
          <b>Kuchyň（クヒィニ）</b>：プラハ城正門前サラーバ宮殿テラス。大鍋から直接料理を選ぶスタイルで、味もロケーションもプラハ屈指（web予約推奨）。<br/>
          <b>市民会館（Obecní dům）</b>：1階カフェ（Kavárna）は予約なしで利用可能。内部ガイドツアー（英語）に参加するとミュシャ装飾の「市長の間」に入場できます。<br/>
          <b>Café Imperial</b>：ディナーは大変人気のため、日本出発前に公式サイト（cafeimperial.cz）からテーブル予約を強く推奨します。
        </>
      ),
    },
  },
  {
    day: 7,
    date: "11月24日（火）",
    title: "朝のカレル橋静寂散歩 ＆ カフェ・ルーヴル朝食 ─ 空港出発 ─ ドバイ乗継",
    color: "#7a5a3a",
    icon: "🛫",
    schedule: [
      { time: "07:30", label: "朝の静寂のカレル橋 散策", desc: "【朝散歩】昼間の喧騒とは打って変わり、澄んだ空気と朝霧に包まれる早朝のカレル橋。朝日を浴びるプラハ城とヴルタヴァ川を眺めながら、ご夫婦で静かに記念撮影（ホテルから徒歩10分）", icon: "🌅", important: true, coords: [50.0865, 14.4114] },
      { time: "08:30", label: "Café Louvre（カフェ・ルーヴル）で優雅な朝食", desc: "【朝食】1902年創業の歴史的グランドカフェ（ホテル徒歩3分）。カフカやアインシュタインが過ごした気品あふれるサロンで、焼きたてオムレツやペストリー、ホットチョコレートの朝食をゆったり味わう", icon: "☕", important: true, url: "https://www.cafelouvre.cz/en", mapUrl: "https://maps.google.com/?q=Cafe+Louvre+Prague", coords: [50.0821, 14.4184] },
      { time: "09:30", label: "Youngmann House チェックアウト ＆ 荷造り", desc: "宿に戻りチェックアウト。荷物をピックアップし、空港移動の身支度を完了", icon: "🧳", important: true, mapUrl: "https://maps.google.com/?q=Youngmann+House+Jungmannovo+n%C3%A1m%C4%9Bst%C3%AD+14+Prague", coords: [50.0837, 14.4205] },
      { time: "10:30", label: "Youngmann House 発 → プラハ空港へ移動", desc: "地下鉄A線「Můstek」から直通10分で「Nádraží Veleslavín」駅へ。トロリーバス59番に乗換えて約17分でプラハ空港第1ターミナルへ到着（総所要約45分・90分券またはクレカタッチで約50 CZK/人）", icon: "🚌", important: true, mapUrl: "https://maps.google.com/?q=Youngmann+House+Jungmannovo+n%C3%A1m%C4%9Bst%C3%AD+14+Prague", coords: [50.0837, 14.4205] },
      { time: "11:45", label: "プラハ・ヴァーツラフ・ハヴェル空港 着", desc: "出発3時間前。第1ターミナル（非シェンゲン域便）にてエミレーツ航空チェックイン、手荷物預け、免税手続き（Tax Refund）、保安検査、出国審査", icon: "✈", important: true, coords: [50.1008, 14.26] },
      { time: "14:45 PRG", label: "プラハ（PRG）出発", desc: "EK140・エミレーツ。第1ターミナル。Airbus A380-800／飛行5時間55分。JST 22:45", icon: "✈", important: true, coords: [50.1008, 14.26] },
      { time: "23:40 DXB", label: "ドバイ（DXB）着", desc: "EK140到着。乗継 3時間15分の深夜乗継。ターミナル3内で乗り継ぎ。JST 翌04:40頃", icon: "🇦🇪" },
      { time: "02:55 DXB", label: "ドバイ（DXB）発", desc: "EK318・エミレーツ。Airbus A380-800／飛行9時間25分。日付は11月25日（水）", icon: "😴" },
    ],
    memo: {
      bg: "linear-gradient(135deg,#f8f0e8,#f5ebe0)",
      border: "#e0c8a8",
      titleColor: "#8a5a20",
      textColor: "#5a3a10",
      icon: "✈",
      title: "プラハ最終日 空港アクセス＆フライトメモ",
      body: (
        <>
          <b>朝のカレル橋（必見）</b>：日中は世界中からの観光客で混み合いますが、早朝7:30〜8:00は静寂に包まれ、写真撮影に最高の時間帯です。<br/>
          <b>空港アクセス（地下鉄A線＋トロリーバス59番）</b>：宿最寄りのMůstek駅から地下鉄A線で約10分の「Nádraží Veleslavín」へ。地上に出てすぐのバス乗り場から最新の連結トロリーバス59番に乗車（約17分・約5〜10分間隔で運行）。第1ターミナル（Terminal 1）で降車。90分券（40〜50 CZK）1枚で通し乗車可能です。<br/>
          <b>第1ターミナル（非シェンゲン便）</b>：日本・ドバイ行きは第1ターミナル発。出国審査と保安検査が出発ゲート直前にあるため、時間に余裕を持って行動を。<br/>
          <b>ドバイ深夜乗継</b>：3時間15分。ターミナル3のカフェやラウンジで休憩し、成田行きEK318便へ搭乗。
        </>
      ),
    },
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
  { item: "ブダペスト 2泊（Budapest Panorama Central）", cost: 26397, note: "予約済 換算目安 ¥26,397（スーペリア ダブルルーム スパバス付・2泊）" },
  { item: "ドナウ川 ナイトクルーズ（ウェルカムドリンク付・2名）", cost: 6000, note: "GetYourGuide 約€18×2名（約¥6,000）" },
  { item: "鉄道 ブダペスト→ウィーン（2名）", cost: 0, note: "手配要 早割€13〜/人（MÁV）または €19.90〜/人（ÖBB）" },
  { item: "鉄道 ウィーン→プラハ（2名）", cost: 0, note: "手配要 早割€14.90〜/人（ÖBB）または €15〜/人（RegioJet）" },
  { item: "ウィーン 2泊（ARCOTEL Wimberger Wien・2名）", cost: 40277, note: "予約済・支払済 €198.61（約¥40,277／税・サービス料込み）・予約番号 5340692962" },
  { item: "プラハ 2泊（Youngmann House・2名）", cost: 28407, note: "予約済・支払済 Booking.com（¥28,407／換算目安¥27,579）・返金不可" },
  { item: "空港バス 100E（ブダペスト空港→Astoria、2名）", cost: 2100, note: "2,500HUF×2名（クレカタッチ決済 約¥2,100）" },
  { item: "ブダペスト市内交通 24時間券（2名）", cost: 2100, note: "2,500HUF×2名（地下鉄・トラム乗り放題 約¥2,100）" },
  { item: "ウィーン市内交通 48時間券（2名）", cost: 4650, note: "€14.10×2名（WienMobilアプリまたは券売機 約¥4,650・乗り放題）" },
  { item: "国会議事堂 ガイドツアー（2名・任意）", cost: 0, note: "見学希望時 14,000HUF×2名（約¥11,600・要事前予約）／外観散策は無料" },
  { item: "シェーンブルン宮殿 グランドツアー（2名・任意）", cost: 0, note: "大人約€32×2名（要事前予約・日本語オーディオ付）" },
  { item: "ベルヴェデーレ上宮 入場券（2名・任意）", cost: 0, note: "大人約€19×2名（クリムト『接吻』・要日時指定予約）" },
  { item: "国立図書館 プルンクザール（2名・任意）", cost: 0, note: "大人€10×2名（約¥3,300）" },
  { item: "ブダ城 ＆ 英雄広場 散策", cost: 0, note: "外観・敷地散策無料（シクロー利用時 往復約5,000HUF/人）" },
  { item: "宿泊税 ブダペスト（室料の4%×2泊）", cost: 1000, note: "現地ホテル払い 目安約¥1,000" },
  { item: "宿泊税 ウィーン", cost: 0, note: "宿泊料金に市税5%を含む（追加支払いなし）" },
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
        .eu-nav-bar { position:sticky; top:0; z-index:100; background:rgba(247,243,237,.92); backdrop-filter:blur(12px); border-bottom:1px solid rgba(0,0,0,.08); display:flex; justify-content:safe center; overflow-x:auto; -webkit-overflow-scrolling:touch; }
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
        .dinner-map-link { font-family:'Zen Maru Gothic',sans-serif; font-size:.72rem; color:#5a8a6e; text-decoration:none; border:1px solid #d4e8dc; padding:.15rem .5rem; border-radius:3px; display:inline-flex; align-items:center; gap:.2rem; transition:all .2s; }
        .dinner-map-link:hover { background:#eef6f0; }
        .dinner-map-link:focus-visible { outline:2px solid #5a8a6e; outline-offset:1px; border-radius:3px; }
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
              ※ 航空券（2名合計¥457,440）、ウィーン宿泊（2名2泊・¥40,277相当）、プラハ宿泊（2名2泊・¥28,407）は予約済み・支払済みです。<br />
              宿泊税（ブダペスト4%・プラハ50CZK/人泊）は現地払いです。ウィーン市税5%は宿泊料金に含まれています。<br />
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
                dinner={DAYS[activeDay].dinner}
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

            {/* ディナー候補カード */}
            {DAYS[activeDay].dinner && (
              <div
                className="eu-booking-card"
                style={{ marginTop: "1.5rem" }}
                role="button" tabIndex={0}
                aria-expanded={expandedBooking === `dinner-${activeDay}`}
                onClick={() => setExpandedBooking(expandedBooking === `dinner-${activeDay}` ? null : `dinner-${activeDay}`)}
                onKeyDown={e => handleCardKeyDown(e, () => setExpandedBooking(expandedBooking === `dinner-${activeDay}` ? null : `dinner-${activeDay}`))}>
                <div className="eu-booking-header" style={{ borderLeft: "3px solid #E8734A" }}>
                  <span><span aria-hidden="true">🍽</span> {DAYS[activeDay].dinner.title}</span>
                  <span className="eu-booking-toggle" aria-hidden="true"
                    style={{ transform: expandedBooking === `dinner-${activeDay}` ? "rotate(180deg)" : "none" }}>▼</span>
                </div>
                {expandedBooking === `dinner-${activeDay}` && (
                  <div style={{ padding: "0 1.2rem 1.2rem" }}>
                    {DAYS[activeDay].dinner.options.map((opt, i) => (
                      <div key={i} style={{ padding: ".8rem 0", borderBottom: i < DAYS[activeDay].dinner.options.length - 1 ? "1px solid #f0ece6" : "none" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:".5rem", marginBottom:".25rem", flexWrap:"wrap" }}>
                          <span style={{ fontFamily:"'Zen Maru Gothic',sans-serif", fontWeight:700, fontSize:".92rem" }}>{opt.name}</span>
                          <span style={{ fontSize:".7rem", background:"#f0ece6", padding:".15rem .5rem", borderRadius:"2px", color:"#6a6058", fontFamily:"'Zen Maru Gothic',sans-serif" }}>{opt.genre}</span>
                          {opt.url && (
                            <a href={opt.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                              className="dinner-map-link">
                              <span aria-hidden="true">🌐</span> 公式サイト
                            </a>
                          )}
                          {opt.mapUrl && (
                            <a href={opt.mapUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                              className="dinner-map-link">
                              <span aria-hidden="true">📍</span> Map
                            </a>
                          )}
                        </div>
                        <div style={{ fontSize:".8rem", color:"#6a6058", lineHeight:1.5 }}>{opt.desc}</div>
                        {opt.tel && <div style={{ fontSize:".75rem", color:"#756d65", marginTop:".2rem" }}>TEL: {opt.tel}</div>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
