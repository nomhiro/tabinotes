import { useState } from "react";
import DayMap from "../../components/DayMap";

const DAYS = [
  {
    day: 1,
    date: "5月5日（火）",
    title: "大阪観光 → さんふらわあ乗船",
    color: "#E8734A",
    icon: "⛴",
    schedule: [
      { time: "日中", label: "大阪観光", desc: "出港までの時間を大阪で楽しむ", icon: "🏙" },
      { time: "18:05", label: "大阪南港 乗船手続き", desc: "出港60分前を目安に手続き", icon: "🎫", important: true, mapUrl: "https://maps.google.com/?q=大阪南港さんふらわあターミナル", coords: [34.6359, 135.4104] },
      { time: "19:05", label: "大阪南港 出港", desc: "さんふらわあ むらさき", icon: "⛴", url: "https://www.ferry-sunflower.co.jp/" },
      { time: "船中泊", label: "プライベートベッドでゆっくり", desc: "翌朝 別府着", icon: "🌙" },
    ],
    booking: {
      title: "さんふらわあ むらさき",
      url: "https://www.ferry-sunflower.co.jp/",
      details: [
        { label: "予約番号", value: "36137" },
        { label: "アクセスキー", value: "139" },
        { label: "等級", value: "プライベートベッド" },
        { label: "区間", value: "大阪 19:05 → 別府 翌06:55" },
        { label: "料金", value: "¥31,160" },
      ],
    },
  },
  {
    day: 2,
    date: "5月6日（水）",
    title: "別府到着 → 地獄めぐり",
    color: "#D94F4F",
    icon: "♨",
    schedule: [
      { time: "06:55", label: "別府観光港 到着", desc: "さんふらわあ下船後、港のターミナルへ", icon: "🚢", mapUrl: "https://maps.google.com/?q=別府観光港", coords: [33.2803, 131.5054] },
      { time: "07:30", label: "レンタカー受取", desc: "ニッポンレンタカー 別府観光港前店", icon: "🚗", important: true, url: "https://www.nipponrentacar.co.jp/", mapUrl: "https://maps.google.com/?q=ニッポンレンタカー+別府観光港前", coords: [33.2800, 131.5060] },
      { time: "08:00", label: "海地獄（共通観覧券を購入）", desc: "コバルトブルーの熱泉は圧巻！国指定名勝。温泉たまごも名物。共通観覧券 ¥2,400/人（公式HPのクーポンで¥200引き）", icon: "♨", important: true, url: "https://www.beppu-jigoku.com/umi/", mapUrl: "https://maps.google.com/?q=海地獄+別府", coords: [33.3192, 131.4450] },
      { time: "08:30", label: "鬼石坊主地獄", desc: "灰色の熱泥がボコボコ湧く様子は迫力満点。海地獄のすぐ隣、徒歩すぐ", icon: "♨", url: "https://www.beppu-jigoku.com/onishi/", mapUrl: "https://maps.google.com/?q=鬼石坊主地獄", coords: [33.3186, 131.4447] },
      { time: "08:50", label: "かまど地獄", desc: "1丁目〜6丁目まで様々な泉質を一度に楽しめる。足湯あり！", icon: "♨", url: "https://www.beppu-jigoku.com/kamado/", mapUrl: "https://maps.google.com/?q=かまど地獄+別府", coords: [33.3178, 131.4456] },
      { time: "09:20", label: "鬼山地獄（ワニ地獄）", desc: "約80頭のワニが温泉熱で飼育されている。かまど地獄から徒歩1分", icon: "🐊", url: "https://www.beppu-jigoku.com/oniyama/", mapUrl: "https://maps.google.com/?q=鬼山地獄+別府", coords: [33.3175, 131.4460] },
      { time: "09:40", label: "白池地獄", desc: "青白い池と熱帯魚館。和風庭園の静かな雰囲気。国指定名勝", icon: "♨", url: "https://www.beppu-jigoku.com/shiraike/", mapUrl: "https://maps.google.com/?q=白池地獄+別府", coords: [33.3170, 131.4468] },
      { time: "10:00", label: "車で血の池エリアへ移動", desc: "鉄輪エリアから約3km、車で約5分", icon: "🚗" },
      { time: "10:10", label: "血の池地獄", desc: "日本最古の天然地獄。赤い熱泥の池は約1,300㎡の迫力。展望台からの眺めが◎。名物「血の池軟膏」をお土産に", icon: "♨", important: true, url: "https://www.beppu-jigoku.com/chinoike/", mapUrl: "https://maps.google.com/?q=血の池地獄+別府", coords: [33.3219, 131.4582] },
      { time: "10:40", label: "龍巻地獄", desc: "間欠泉の地獄。約30〜40分間隔で噴出するので、血の池地獄とどちらを先にするかは噴出タイミング次第で", icon: "♨", url: "https://www.beppu-jigoku.com/tatsumaki/", mapUrl: "https://maps.google.com/?q=龍巻地獄+別府", coords: [33.3222, 131.4590] },
      { time: "11:10", label: "地獄蒸し工房 鉄輪でランチ", desc: "温泉の蒸気で海鮮・野菜を蒸す別府名物！鉄輪エリアに戻って体験", icon: "🍽", url: "https://jigokumushi.com/", mapUrl: "https://maps.google.com/?q=地獄蒸し工房鉄輪", coords: [33.3165, 131.4478] },
      { time: "13:00", label: "鉄輪温泉街を散策", desc: "湯けむりの街並みを散歩。足湯や食べ歩きも楽しめる", icon: "🚶", mapUrl: "https://maps.google.com/?q=鉄輪温泉+別府", coords: [33.3160, 131.4475] },
      { time: "15:00", label: "ホテルチェックイン", desc: "美湯の宿 両築別邸", icon: "🏨", mapUrl: "https://maps.google.com/?q=美湯の宿+両築別邸", coords: [33.3006, 131.4753] },
      { time: "15:30", label: "温泉でゆっくり", desc: "宿の温泉を満喫。※入湯税 大人250円/人が別途必要", icon: "♨" },
      { time: "18:00", label: "夕食へ出発", desc: "別府グルメを食べに出かけよう！", icon: "🍽", important: true },
    ],
    dinner: {
      title: "別府ディナー候補",
      options: [
        { name: "とよ常 本店", genre: "天丼", desc: "丼からはみ出す特大海老天の「特上天丼」が名物。創業以来の秘伝のタレ。人気店なので早めに", tel: "0977-23-3333", mapUrl: "https://maps.google.com/?q=とよ常+本店+別府", coords: [33.2794, 131.4991] },
        { name: "六盛 本店", genre: "別府冷麺", desc: "別府冷麺の名店。和風だしと牛骨スープにコシのある自家製麺。中華そばも通の間で人気", tel: "0977-21-2972", mapUrl: "https://maps.google.com/?q=六盛+本店+別府+冷麺", coords: [33.2801, 131.4950] },
        { name: "ひでさん", genre: "地鶏炭火焼", desc: "鉄輪の高台にある鶏肉料理店。七輪で焼く地鶏が絶品。夜景も◎。〆の別府冷麺も人気", mapUrl: "https://maps.google.com/?q=ひでさん+鉄輪+別府", coords: [33.3130, 131.4500] },
        { name: "海鮮いづつ", genre: "海鮮", desc: "魚屋直営の新鮮な海鮮。旬の魚が敷き詰められた海鮮丼が人気。リーズナブル", mapUrl: "https://maps.google.com/?q=海鮮いづつ+別府", coords: [33.2793, 131.4960] },
      ],
    },
    booking: {
      title: "美湯の宿 両築別邸",
      url: "https://www.ryoutiku.com/",
      mapUrl: "https://maps.google.com/?q=美湯の宿+両築別邸",
      details: [
        { label: "予約番号", value: "IY1549819023" },
        { label: "部屋", value: "スタンダード和洋室（6畳+セミダブルツイン）" },
        { label: "食事", value: "朝食付" },
        { label: "チェックイン", value: "15:00〜21:00" },
        { label: "住所", value: "大分県別府市観海寺3" },
        { label: "TEL", value: "0977-26-0022" },
        { label: "料金", value: "¥21,780" },
      ],
    },
  },
  {
    day: 3,
    date: "5月7日（木）",
    title: "九重夢大吊橋 → 阿蘇絶景ドライブ",
    color: "#3A8C6E",
    icon: "🌿",
    schedule: [
      { time: "〜10:00", label: "チェックアウト", desc: "美湯の宿 両築別邸", icon: "🏨" },
      { time: "10:00", label: "九重方面へドライブ", desc: "別府から車で約1時間。やまなみハイウェイ方面へ", icon: "🚗" },
      { time: "11:00", label: "九重\"夢\"大吊橋", desc: "高さ173m・長さ390mの日本一の人道大吊橋！震動の滝や九酔渓の絶景を一望", icon: "🌉", important: true, url: "https://www.yumeooturihashi.com/", mapUrl: "https://maps.app.goo.gl/rB2jTpPDrqwPW96Y9", coords: [33.1536, 131.2467] },
      { time: "11:45", label: "やまなみハイウェイで阿蘇へ", desc: "九重から阿蘇・大観峰まで約40分の絶景ドライブ", icon: "🚗" },
      { time: "12:30", label: "大観峰", desc: "標高936mの阿蘇外輪山の最高峰。360度の大パノラマで阿蘇五岳の涅槃像を望む。お土産店・食堂あり", icon: "⛰", important: true, mapUrl: "https://maps.google.com/?q=大観峰+阿蘇", coords: [33.0550, 131.0589] },
      { time: "13:15", label: "カルデラ内へ下る", desc: "大観峰からカルデラ盆地へ。約20分", icon: "🚗" },
      { time: "13:30", label: "阿蘇神社 ＆ 門前町でランチ", desc: "肥後国一の宮。復興した楼門は必見。門前町「仲町通り」であか牛グルメや食べ歩き、湧水の水基めぐりも", icon: "⛩", url: "https://asojinja.or.jp/", mapUrl: "https://maps.google.com/?q=阿蘇神社", coords: [32.9494, 131.1230] },
      { time: "14:30", label: "阿蘇パノラマラインを南へ", desc: "阿蘇山の山腹を走る絶景ルート。約30分", icon: "🚗" },
      { time: "15:00", label: "草千里ヶ浜", desc: "直径約1kmの大草原に馬が放牧される牧歌的風景。中岳の噴煙をバックに。乗馬体験も可能。阿蘇火山博物館も併設", icon: "🌿", important: true, mapUrl: "https://maps.google.com/?q=草千里ヶ浜", coords: [32.8914, 131.0661] },
      { time: "15:45", label: "阿蘇中岳火口（規制状況次第）", desc: "直径600m・深さ130mの火口から噴き上がる白煙は圧巻。※火山活動により立入規制の場合あり。事前に要確認", icon: "🌋", url: "https://www.aso.ne.jp/~volcano/", mapUrl: "https://maps.google.com/?q=阿蘇中岳火口", coords: [32.8842, 131.0843] },
      { time: "16:30", label: "南阿蘇方面へ", desc: "中岳から休暇村 南阿蘇まで約30分", icon: "🚗" },
      { time: "17:00", label: "ホテルチェックイン", desc: "休暇村 南阿蘇", icon: "🏨", mapUrl: "https://maps.google.com/?q=休暇村+南阿蘇", coords: [32.8553, 131.1367] },
      { time: "夜", label: "夕朝食付プラン", desc: "フルーツキングダムKumamoto春の収穫祭×プレミアムビュッフェ", icon: "🍽" },
    ],
    booking: {
      title: "休暇村 南阿蘇",
      url: "https://www.qkamura.or.jp/aso/",
      mapUrl: "https://maps.google.com/?q=休暇村+南阿蘇",
      details: [
        { label: "予約番号", value: "IY1549837713" },
        { label: "部屋", value: "和室8畳（禁煙・バスなし・トイレ付）" },
        { label: "食事", value: "夕朝食付" },
        { label: "住所", value: "熊本県阿蘇郡高森町高森3219" },
        { label: "TEL", value: "0967-62-2111" },
        { label: "料金", value: "¥28,800" },
      ],
    },
  },
  {
    day: 4,
    date: "5月8日（金）",
    title: "高千穂峡 → 熊本",
    color: "#2B7A9E",
    icon: "🛶",
    schedule: [
      { time: "〜10:00", label: "チェックアウト", desc: "休暇村 南阿蘇", icon: "🏨" },
      { time: "10:00", label: "南阿蘇から高千穂へ", desc: "車で約1時間。南阿蘇の田園風景を抜けて高千穂町へ", icon: "🚗" },
      { time: "11:00", label: "天岩戸神社（西本宮）", desc: "天照大御神が隠れた天岩戸を祀る神社。神職の案内で遥拝所から御神体を参拝できる（9:00〜16:40・無料・所要約15分）", icon: "⛩", important: true, url: "https://amanoiwato-jinja.jp/", mapUrl: "https://maps.google.com/?q=天岩戸神社+西本宮", coords: [32.7625, 131.3575] },
      { time: "11:30", label: "天安河原", desc: "西本宮から川沿いを徒歩約10分。八百万の神が集まったとされる大洞窟。無数に積まれた石が神秘的", icon: "⛩", mapUrl: "https://maps.google.com/?q=天安河原", coords: [32.7595, 131.3545] },
      { time: "12:15", label: "高千穂でランチ", desc: "高千穂牛の「肉めし定食」が名物。道の駅高千穂のレストランもおすすめ", icon: "🍽", mapUrl: "https://maps.google.com/?q=道の駅+高千穂", coords: [32.7230, 131.3120] },
      { time: "13:15", label: "高千穂神社", desc: "高千穂郷八十八社の総社。夫婦杉は縁結びのパワースポット。樹齢800年の秩父杉も見事", icon: "⛩", url: "https://takachiho-kanko.info/sightseeing/3/", mapUrl: "https://maps.google.com/?q=高千穂神社", coords: [32.7132, 131.3070] },
      { time: "13:45", label: "高千穂峡 貸しボート", desc: "真名井の滝を間近で見上げる絶景体験！柱状節理の断崖が迫力満点。乗船時間30分", icon: "🛶", important: true, url: "https://takachiho-kanko.info/boat/detail.php", mapUrl: "https://maps.google.com/?q=高千穂峡+ボート乗り場", coords: [32.7160, 131.2990] },
      { time: "14:30", label: "高千穂峡 遊歩道を散策", desc: "ボート後は遊歩道からも真名井の滝や峡谷の絶景を楽しむ", icon: "🚶", mapUrl: "https://maps.google.com/?q=高千穂峡+遊歩道", coords: [32.7155, 131.2985] },
      { time: "15:15", label: "熊本市内へ出発", desc: "高千穂から熊本市内まで車で約2時間", icon: "🚗" },
      { time: "17:15", label: "ホテルチェックイン", desc: "熊本ホテルキャッスル（城側キングダブル）", icon: "🏨", mapUrl: "https://maps.google.com/?q=熊本ホテルキャッスル", coords: [32.8064, 130.7057] },
      { time: "18:00", label: "熊本グルメを満喫", desc: "馬刺し・太平燕・辛子蓮根など（食事なしプラン）", icon: "🍜" },
    ],
    booking: {
      title: "熊本ホテルキャッスル",
      url: "https://www.hotel-castle.co.jp/",
      mapUrl: "https://maps.google.com/?q=熊本ホテルキャッスル",
      details: [
        { label: "予約番号", value: "IK1549847163" },
        { label: "部屋", value: "【城側】キングダブル 28平米" },
        { label: "食事", value: "食事なし" },
        { label: "住所", value: "熊本市中央区城東町4-2" },
        { label: "TEL", value: "096-326-3311" },
        { label: "料金", value: "¥10,080" },
      ],
    },
  },
  {
    day: 5,
    date: "5月9日（土）",
    title: "熊本観光 → 小牧へ帰還",
    color: "#6B5CA5",
    icon: "✈",
    schedule: [
      { time: "〜09:00", label: "チェックアウト", desc: "熊本ホテルキャッスル。ホテルから熊本城は徒歩すぐ！", icon: "🏨" },
      { time: "09:00", label: "熊本城 見学", desc: "日本三名城。2021年に天守閣の復旧完了、内部はミュージアムに。最上階からの360度パノラマは必見。特別見学通路から復旧工事の様子も", icon: "🏯", important: true, mapUrl: "https://maps.google.com/?q=熊本城", url: "https://castle.kumamoto-guide.jp/", coords: [32.8060, 130.7058] },
      { time: "11:00", label: "熊本市内でランチ", desc: "馬刺し・太平燕・辛子蓮根など熊本名物を。上通・下通アーケード周辺に名店多数", icon: "🍽", mapUrl: "https://maps.google.com/?q=下通アーケード+熊本", coords: [32.8018, 130.7110] },
      { time: "15:30", label: "熊本空港方面へ出発", desc: "市内から空港まで車で約40〜50分。余裕を持って移動", icon: "🚗" },
      { time: "16:30", label: "レンタカー返却", desc: "ニッポンレンタカー 熊本空港店。返却後に空港へ送迎あり", icon: "🚗", important: true, url: "https://www.nipponrentacar.co.jp/", mapUrl: "https://maps.google.com/?q=ニッポンレンタカー+熊本空港", coords: [32.8372, 130.8555] },
      { time: "17:00", label: "阿蘇くまもと空港", desc: "搭乗手続き＆空港でお土産の最終チェック", icon: "✈", mapUrl: "https://maps.google.com/?q=阿蘇くまもと空港", coords: [32.8373, 130.8553] },
      { time: "18:55", label: "熊本空港 出発（FDA2026便）", desc: "搭乗15分前までにチェックイン。予約番号 or QRコードを持参", icon: "✈", important: true, url: "https://www.fujidreamairlines.com/", photo: "https://photos.app.goo.gl/gScHdSE65EV4Vasu6" },
      { time: "20:15", label: "名古屋（小牧）到着", desc: "おつかれさまでした！素敵な九州旅行の思い出を！", icon: "🏠", mapUrl: "https://maps.google.com/?q=県営名古屋空港", coords: [35.2550, 136.9237] },
    ],
    booking: {
      title: "FDA フジドリームエアラインズ",
      url: "https://www.fujidreamairlines.com/",
      details: [
        { label: "予約番号", value: "TV3H25" },
        { label: "便名", value: "FDA2026" },
        { label: "区間", value: "熊本 18:55 → 名古屋小牧 20:15" },
        { label: "座席", value: "10H（ヒロキ様）/ 10K（リノ様）" },
        { label: "料金", value: "¥32,440" },
      ],
    },
  },
];

const RENTAL_CAR = {
  title: "ニッポンレンタカー",
  url: "https://www.nipponrentacar.co.jp/",
  details: [
    { label: "会員番号", value: "915853931" },
    { label: "クラス", value: "スタンダード" },
    { label: "出発", value: "5/6 07:30 別府観光港前店" },
    { label: "返却", value: "5/9 17:00 熊本空港店" },
    { label: "乗捨手数料込", value: "¥28,820" },
  ],
};

const COSTS = [
  { item: "さんふらわあ（大阪→別府）", cost: 31160 },
  { item: "レンタカー（3日間＋乗捨）", cost: 28820 },
  { item: "美湯の宿 両築別邸", cost: 21780 },
  { item: "休暇村 南阿蘇", cost: 28800 },
  { item: "熊本ホテルキャッスル", cost: 10080 },
  { item: "FDA（熊本→小牧）", cost: 32440 },
];

const WebLink = ({ href }) => href ? (<a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", fontSize:"0.82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }} title="公式サイト" onClick={e=>e.stopPropagation()}>🌐</a>) : null;
const MapLink = ({ href }) => href ? (<a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", fontSize:"0.82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }} title="Google Map" onClick={e=>e.stopPropagation()}>📍</a>) : null;
const PhotoLink = ({ href }) => href ? (<a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", fontSize:"0.82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }} title="予約スクリーンショット" onClick={e=>e.stopPropagation()}>📷</a>) : null;

export default function TravelItinerary() {
  const [activeDay, setActiveDay] = useState(0);
  const [showCost, setShowCost] = useState(false);
  const [expandedBooking, setExpandedBooking] = useState(null);
  const totalCost = COSTS.reduce((s, c) => s + c.cost, 0);

  return (
    <div style={{ fontFamily: "'Noto Serif JP', 'Hiragino Mincho ProN', serif", background: "#F7F3ED", minHeight: "100vh", color: "#2C2421" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;600;700&family=Zen+Maru+Gothic:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .cover { position:relative; min-height:30vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:linear-gradient(175deg,#1a3a4a 0%,#2d5a4a 35%,#3a6b55 55%,#c85a3a 85%,#e87040 100%); overflow:hidden; padding:2rem; }
        .cover::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 20% 80%,rgba(232,112,64,.3) 0%,transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(26,58,74,.4) 0%,transparent 50%); }
        .cover-pattern { position:absolute; inset:0; opacity:.06; background-image:repeating-linear-gradient(0deg,transparent,transparent 40px,#fff 40px,#fff 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,#fff 40px,#fff 41px); }
        .cover-content { position:relative; z-index:2; text-align:center; color:white; animation:fadeUp 1.2s ease-out; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .cover-label { font-family:'Zen Maru Gothic',sans-serif; font-size:.85rem; letter-spacing:.5em; opacity:.7; margin-bottom:1.5rem; }
        .cover-title { font-size:clamp(2.5rem,7vw,4.5rem); font-weight:700; letter-spacing:.15em; line-height:1.3; margin-bottom:.5rem; text-shadow:0 4px 30px rgba(0,0,0,.3); }
        .cover-sub { font-size:clamp(1rem,3vw,1.4rem); font-weight:300; letter-spacing:.3em; opacity:.85; margin-bottom:2rem; }
        .cover-date { font-family:'Zen Maru Gothic',sans-serif; display:inline-block; border:1px solid rgba(255,255,255,.4); padding:.6rem 2rem; font-size:.95rem; letter-spacing:.2em; border-radius:2px; }
        .cover-members { margin-top:2rem; font-size:.95rem; opacity:.75; letter-spacing:.15em; }
        .cover-back { position:absolute; top:1.5rem; left:1.5rem; z-index:3; color:rgba(255,255,255,.7); text-decoration:none; font-family:'Zen Maru Gothic',sans-serif; font-size:.85rem; letter-spacing:.05em; transition:color .2s; }
        .cover-back:hover { color:white; }
        .nav-bar { position:sticky; top:0; z-index:100; background:rgba(247,243,237,.92); backdrop-filter:blur(12px); border-bottom:1px solid rgba(0,0,0,.08); display:flex; justify-content:center; overflow-x:auto; }
        .nav-btn { font-family:'Zen Maru Gothic',sans-serif; border:none; background:none; padding:1rem 1.2rem; font-size:.82rem; cursor:pointer; color:#7a7068; letter-spacing:.05em; white-space:nowrap; transition:all .3s; border-bottom:2px solid transparent; }
        .nav-btn:hover { color:#2C2421; }
        .nav-btn.active { color:#2C2421; font-weight:700; border-bottom-color:currentColor; }
        .nav-btn.cost-btn { color:#8B6914; }
        .nav-btn.cost-btn.active { color:#8B6914; border-bottom-color:#8B6914; }
        .day-section { max-width:720px; margin:0 auto; padding:3rem 1.5rem; animation:fadeIn .5s ease-out; }
        .day-header { display:flex; align-items:center; gap:1rem; margin-bottom:.5rem; }
        .day-number { font-family:'Zen Maru Gothic',sans-serif; font-size:.75rem; font-weight:700; letter-spacing:.15em; padding:.3rem .8rem; border-radius:2px; color:white; }
        .day-date { font-family:'Zen Maru Gothic',sans-serif; font-size:.85rem; color:#8a7f76; letter-spacing:.1em; }
        .day-title { font-size:clamp(1.4rem,4vw,1.8rem); font-weight:600; letter-spacing:.08em; margin-bottom:2rem; line-height:1.4; }
        .timeline { position:relative; padding-left:2rem; }
        .timeline::before { content:''; position:absolute; left:5px; top:8px; bottom:8px; width:1px; background:#d4cdc5; }
        .tl-item { position:relative; padding-bottom:1.8rem; padding-left:1rem; }
        .tl-item:last-child { padding-bottom:0; }
        .tl-dot { position:absolute; left:-2rem; top:4px; width:11px; height:11px; border-radius:50%; background:#d4cdc5; border:2px solid #F7F3ED; z-index:1; }
        .tl-dot.important { width:13px; height:13px; }
        .tl-time { font-family:'Zen Maru Gothic',sans-serif; font-size:.78rem; color:#9a918a; letter-spacing:.05em; margin-bottom:.2rem; }
        .tl-label { font-weight:500; font-size:1rem; letter-spacing:.04em; display:flex; align-items:center; gap:.5rem; flex-wrap:wrap; }
        .tl-label .emoji { font-size:1.1rem; }
        .tl-desc { font-size:.82rem; color:#7a7068; margin-top:.2rem; line-height:1.6; }
        .tl-item.important .tl-label { font-weight:600; }
        .tl-links { display:inline-flex; gap:.35rem; margin-left:.2rem; }
        .tl-links a:hover { opacity:1!important; }
        .booking-card { margin-top:2.5rem; background:white; border-radius:6px; overflow:hidden; box-shadow:0 1px 8px rgba(0,0,0,.06); cursor:pointer; transition:box-shadow .3s; }
        .booking-card:hover { box-shadow:0 2px 16px rgba(0,0,0,.1); }
        .booking-header { display:flex; align-items:center; justify-content:space-between; padding:1rem 1.2rem; font-family:'Zen Maru Gothic',sans-serif; font-weight:700; font-size:.9rem; letter-spacing:.05em; }
        .booking-toggle { font-size:.75rem; color:#9a918a; transition:transform .3s; }
        .booking-details { padding:0 1.2rem 1.2rem; display:grid; gap:.6rem; }
        .booking-row { display:flex; font-size:.82rem; line-height:1.5; }
        .booking-row-label { font-family:'Zen Maru Gothic',sans-serif; color:#9a918a; min-width:90px; flex-shrink:0; }
        .booking-row-value { font-weight:500; word-break:break-all; }
        .booking-links { display:flex; gap:.5rem; padding:.5rem 1.2rem 1rem; flex-wrap:wrap; }
        .booking-links a { font-family:'Zen Maru Gothic',sans-serif; font-size:.78rem; color:#5a8a6e; text-decoration:none; padding:.3rem .7rem; border:1px solid #d4e8dc; border-radius:3px; transition:all .2s; display:inline-flex; align-items:center; gap:.3rem; }
        .booking-links a:hover { background:#eef6f0; border-color:#5a8a6e; }
        .cost-section { max-width:720px; margin:0 auto; padding:3rem 1.5rem; animation:fadeIn .5s ease-out; }
        .cost-title { font-size:1.6rem; font-weight:600; letter-spacing:.08em; margin-bottom:2rem; text-align:center; }
        .cost-table { background:white; border-radius:6px; overflow:hidden; box-shadow:0 1px 8px rgba(0,0,0,.06); }
        .cost-row { display:flex; justify-content:space-between; align-items:center; padding:1rem 1.4rem; font-size:.9rem; border-bottom:1px solid #f0ece6; }
        .cost-row:last-child { border-bottom:none; }
        .cost-row-item { font-family:'Zen Maru Gothic',sans-serif; color:#5a5048; }
        .cost-row-value { font-weight:600; font-variant-numeric:tabular-nums; }
        .cost-total { display:flex; justify-content:space-between; align-items:center; padding:1.2rem 1.4rem; background:#2C2421; color:white; }
        .cost-total-label { font-family:'Zen Maru Gothic',sans-serif; font-size:.9rem; letter-spacing:.1em; }
        .cost-total-value { font-size:1.3rem; font-weight:700; font-variant-numeric:tabular-nums; }
        .cost-note { text-align:center; margin-top:1.5rem; font-size:.78rem; color:#9a918a; line-height:1.7; }
        @media (max-width:500px) { .nav-btn{padding:.8rem .7rem;font-size:.72rem} .day-section{padding:2rem 1rem} .booking-row-label{min-width:75px} }
      `}</style>

      <div className="cover">
        <a href="#/" className="cover-back">← 旅の一覧</a>
        <div className="cover-pattern" />
        <div className="cover-content">
          <div className="cover-label">Travel Booklet</div>
          <div className="cover-title">九州の旅</div>
          <div className="cover-sub">別府 ・ 阿蘇 ・ 高千穂 ・ 熊本</div>
          <div className="cover-date">2026. 5. 5 tue — 5. 9 sat</div>
          <div className="cover-members">のむら ひろき ・ りの</div>
        </div>
      </div>

      <div className="nav-bar">
        {DAYS.map((d, i) => (
          <button key={i} className={`nav-btn ${!showCost && activeDay === i ? "active" : ""}`}
            onClick={() => { setActiveDay(i); setShowCost(false); setExpandedBooking(null); }}>
            {d.icon} Day{d.day}
          </button>
        ))}
        <button className={`nav-btn cost-btn ${showCost ? "active" : ""}`} onClick={() => setShowCost(true)}>💰 費用</button>
      </div>

      {showCost ? (
        <div className="cost-section" key="cost">
          <div className="cost-title">旅費まとめ</div>
          <div className="cost-table">
            {COSTS.map((c, i) => (
              <div className="cost-row" key={i}>
                <span className="cost-row-item">{c.item}</span>
                <span className="cost-row-value">¥{c.cost.toLocaleString()}</span>
              </div>
            ))}
            <div className="cost-total">
              <span className="cost-total-label">予約済み合計（2名分）</span>
              <span className="cost-total-value">¥{totalCost.toLocaleString()}</span>
            </div>
          </div>
          <div className="cost-note">※ 上記は予約済みの交通・宿泊費用です。<br />現地での食事・入場料・駐車場代等は含まれていません。<br />別府温泉は入湯税 大人250円/人が別途必要です。</div>
        </div>
      ) : (
        <div className="day-section" key={`day-${activeDay}`}>
          <div className="day-header">
            <span className="day-number" style={{ background: DAYS[activeDay].color }}>DAY {DAYS[activeDay].day}</span>
            <span className="day-date">{DAYS[activeDay].date}</span>
          </div>
          <div className="day-title" style={{ color: DAYS[activeDay].color }}>{DAYS[activeDay].title}</div>

          {activeDay === 1 && (
            <div style={{ background:"linear-gradient(135deg,#fff5f5,#fff9f0)", border:"1px solid #f0ddd0", borderRadius:"6px", padding:"1rem 1.2rem", marginBottom:"2rem", fontSize:".82rem", lineHeight:1.7, color:"#5a4a40" }}>
              <div style={{ fontFamily:"'Zen Maru Gothic',sans-serif", fontWeight:700, fontSize:".88rem", marginBottom:".5rem", color:"#D94F4F", display:"flex", alignItems:"center", gap:".5rem", flexWrap:"wrap" }}>
                ♨ 地獄めぐりメモ
                <a href="https://www.beppu-jigoku.com/" target="_blank" rel="noopener noreferrer" style={{ fontSize:".75rem", color:"#5a8a6e", textDecoration:"none", border:"1px solid #d4e8dc", padding:".15rem .5rem", borderRadius:"3px" }}>🌐 公式サイト</a>
              </div>
              <div>
                <b>共通観覧券</b>：¥2,400/人（7ヶ所入場可・2日間有効）<br/>
                → <a href="https://www.beppu-jigoku.com/discount/" target="_blank" rel="noopener noreferrer" style={{ color:"#D94F4F" }}>公式HP割引クーポン</a>を印刷 or スマホ提示で<b>¥200引き</b><br/>
                <b>営業時間</b>：8:00〜17:00（年中無休）<br/>
                <b>エリア構成</b>：鉄輪エリア5ヶ所（徒歩で回れる）＋ 血の池エリア2ヶ所（車で5分）<br/>
                <b>所要時間</b>：全7ヶ所で約3〜3.5時間<br/>
                <b>駐車場</b>：全地獄に無料駐車場あり<br/>
                <b>TIP</b>：龍巻地獄は間欠泉で約30〜40分間隔。到着したらまず噴出時間を確認して、血の池地獄との順番を決めると◎
              </div>
            </div>
          )}

          {activeDay === 2 && (
            <div style={{ background:"linear-gradient(135deg,#f0f7f2,#f5f9f0)", border:"1px solid #c8ddc5", borderRadius:"6px", padding:"1rem 1.2rem", marginBottom:"2rem", fontSize:".82rem", lineHeight:1.7, color:"#3a5a40" }}>
              <div style={{ fontFamily:"'Zen Maru Gothic',sans-serif", fontWeight:700, fontSize:".88rem", marginBottom:".5rem", color:"#3A8C6E", display:"flex", alignItems:"center", gap:".5rem", flexWrap:"wrap" }}>
                ⛰ 阿蘇ドライブメモ
              </div>
              <div>
                <b>ルート</b>：別府 → 九重夢大吊橋 → やまなみハイウェイ → 大観峰 → 阿蘇神社 → 草千里 → 中岳 → 南阿蘇<br/>
                <b>総走行距離</b>：約130km（別府〜南阿蘇）<br/>
                <b>中岳火口</b>：火山活動により立入規制になることあり。<a href="https://www.aso.ne.jp/~volcano/" target="_blank" rel="noopener noreferrer" style={{ color:"#3A8C6E" }}>阿蘇火山防災会議</a>で当日の規制状況を要確認<br/>
                <b>ランチ</b>：阿蘇神社門前町であか牛丼がおすすめ！<br/>
                <b>TIP</b>：草千里は5月の新緑シーズンが最高。乗馬体験（約5分¥1,500〜）もできる
              </div>
            </div>
          )}

          {activeDay === 3 && (
            <div style={{ background:"linear-gradient(135deg,#eef4fa,#f0f6fb)", border:"1px solid #c0d4e8", borderRadius:"6px", padding:"1rem 1.2rem", marginBottom:"2rem", fontSize:".82rem", lineHeight:1.7, color:"#2a4a6a" }}>
              <div style={{ fontFamily:"'Zen Maru Gothic',sans-serif", fontWeight:700, fontSize:".88rem", marginBottom:".5rem", color:"#2B7A9E", display:"flex", alignItems:"center", gap:".5rem", flexWrap:"wrap" }}>
                🛶 高千穂峡ボート予約メモ
                <a href="https://eipro.jp/takachiho1/eventCalendars/index" target="_blank" rel="noopener noreferrer" style={{ fontSize:".75rem", color:"#2B7A9E", textDecoration:"none", border:"1px solid #c0d4e8", padding:".15rem .5rem", borderRadius:"3px" }}>🌐 予約サイト</a>
              </div>
              <div>
                <b>料金</b>：1艇 ¥4,100〜¥5,100（曜日・時期で変動）/ 1艇3名まで<br/>
                <b>乗船時間</b>：30分（超過10分毎¥1,000）<br/>
                <b>予約方法</b>：ネット予約のみ（電話不可）<br/>
                <b>予約期間</b>：乗船日の<b>2週間前 9:00</b> 〜 <b>2日前 9:00</b>まで<br/>
                → <span style={{color:"#c44"}}>5/8乗船分は 4/24(金) 9:00 に予約開始！</span><br/>
                <b>決済</b>：クレジットカードのみ<br/>
                <b>キャンセル</b>：2日前 8:59まで無料。以降は100%<br/>
                <b>営業時間</b>：8:30〜17:00（最終受付16:30）<br/>
                <b>駐車場</b>：第1御塩井駐車場が最寄り（有料）<br/>
                <b>⚠ 注意</b>：GW明けの金曜なので比較的取りやすいが、人気のため早めの予約を！増水時は運休あり
              </div>
            </div>
          )}

          {activeDay === 4 && (
            <div style={{ background:"linear-gradient(135deg,#f3f0f8,#f6f3fa)", border:"1px solid #cfc5e0", borderRadius:"6px", padding:"1rem 1.2rem", marginBottom:"2rem", fontSize:".82rem", lineHeight:1.7, color:"#3a2a5a" }}>
              <div style={{ fontFamily:"'Zen Maru Gothic',sans-serif", fontWeight:700, fontSize:".88rem", marginBottom:".5rem", color:"#6B5CA5", display:"flex", alignItems:"center", gap:".5rem", flexWrap:"wrap" }}>
                🏯 熊本城メモ
                <a href="https://castle.kumamoto-guide.jp/" target="_blank" rel="noopener noreferrer" style={{ fontSize:".75rem", color:"#6B5CA5", textDecoration:"none", border:"1px solid #cfc5e0", padding:".15rem .5rem", borderRadius:"3px" }}>🌐 公式サイト</a>
              </div>
              <div>
                <b>入園料</b>：高校生以上 ¥800 / 小中学生 ¥300<br/>
                <b>営業時間</b>：9:00〜17:00（最終入園16:00・天守閣最終登閣16:30）<br/>
                <b>入口</b>：土日は北口・南口どちらもOK（5/9は土曜日 ✓）<br/>
                <b>所要時間</b>：1.5〜2時間が目安<br/>
                <b>天守閣</b>：2021年復旧完了。内部は博物館で加藤家・細川家の資料や地震復旧の展示あり<br/>
                <b>見どころ</b>：武者返しの石垣、二様の石垣、宇土櫓（築城当時から現存）、天守閣最上階の眺望<br/>
                <b>無料ガイド</b>：城彩苑の総合観光案内所で受付（約45分・個人OK）<br/>
                <b>TIP</b>：ホテルキャッスルから熊本城は徒歩圏内。朝一番（9:00開園）なら混雑前にゆっくり見学できる
              </div>
            </div>
          )}

          {DAYS[activeDay].schedule.some(s => s.coords) && (
            <DayMap
              schedule={DAYS[activeDay].schedule}
              color={DAYS[activeDay].color}
              dinner={DAYS[activeDay].dinner}
            />
          )}

          <div className="timeline">
            {DAYS[activeDay].schedule.map((item, i) => (
              <div key={i} className={`tl-item ${item.important ? "important" : ""}`}>
                <div className={`tl-dot ${item.important ? "important" : ""}`} style={item.important ? { background: DAYS[activeDay].color } : {}} />
                <div className="tl-time">{item.time}</div>
                <div className="tl-label">
                  <span className="emoji">{item.icon}</span>
                  {item.label}
                  {(item.url || item.mapUrl || item.photo) && (
                    <span className="tl-links">
                      <WebLink href={item.url} />
                      <MapLink href={item.mapUrl} />
                      <PhotoLink href={item.photo} />
                    </span>
                  )}
                </div>
                {item.desc && <div className="tl-desc">{item.desc}</div>}
              </div>
            ))}
          </div>

          <div className="booking-card" onClick={() => setExpandedBooking(expandedBooking === `day-${activeDay}` ? null : `day-${activeDay}`)}>
            <div className="booking-header" style={{ borderLeft: `3px solid ${DAYS[activeDay].color}` }}>
              <span>📋 {DAYS[activeDay].booking.title}</span>
              <span className="booking-toggle" style={{ transform: expandedBooking === `day-${activeDay}` ? "rotate(180deg)" : "none" }}>▼</span>
            </div>
            {expandedBooking === `day-${activeDay}` && (
              <>
                <div className="booking-details">
                  {DAYS[activeDay].booking.details.map((d, i) => (
                    <div className="booking-row" key={i}>
                      <span className="booking-row-label">{d.label}</span>
                      <span className="booking-row-value">{d.value}</span>
                    </div>
                  ))}
                </div>
                {(DAYS[activeDay].booking.url || DAYS[activeDay].booking.mapUrl) && (
                  <div className="booking-links">
                    {DAYS[activeDay].booking.url && (<a href={DAYS[activeDay].booking.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>🌐 公式サイト</a>)}
                    {DAYS[activeDay].booking.mapUrl && (<a href={DAYS[activeDay].booking.mapUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>📍 Google Map</a>)}
                  </div>
                )}
              </>
            )}
          </div>

          {(activeDay === 1 || activeDay === 4) && (
            <div className="booking-card" style={{ marginTop: "1.5rem" }} onClick={() => setExpandedBooking(expandedBooking === "rental" ? null : "rental")}>
              <div className="booking-header" style={{ borderLeft: "3px solid #555" }}>
                <span>🚗 {RENTAL_CAR.title}（全行程）</span>
                <span className="booking-toggle" style={{ transform: expandedBooking === "rental" ? "rotate(180deg)" : "none" }}>▼</span>
              </div>
              {expandedBooking === "rental" && (
                <>
                  <div className="booking-details">
                    {RENTAL_CAR.details.map((d, i) => (
                      <div className="booking-row" key={i}><span className="booking-row-label">{d.label}</span><span className="booking-row-value">{d.value}</span></div>
                    ))}
                  </div>
                  <div className="booking-links">
                    <a href={RENTAL_CAR.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>🌐 公式サイト</a>
                  </div>
                </>
              )}
            </div>
          )}

          {DAYS[activeDay].dinner && (
            <div className="booking-card" style={{ marginTop: "1.5rem" }} onClick={() => setExpandedBooking(expandedBooking === "dinner" ? null : "dinner")}>
              <div className="booking-header" style={{ borderLeft: "3px solid #E8734A" }}>
                <span>🍽 {DAYS[activeDay].dinner.title}</span>
                <span className="booking-toggle" style={{ transform: expandedBooking === "dinner" ? "rotate(180deg)" : "none" }}>▼</span>
              </div>
              {expandedBooking === "dinner" && (
                <div style={{ padding: "0 1.2rem 1.2rem" }}>
                  {DAYS[activeDay].dinner.options.map((opt, i) => (
                    <div key={i} style={{ padding: ".8rem 0", borderBottom: i < DAYS[activeDay].dinner.options.length - 1 ? "1px solid #f0ece6" : "none" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:".5rem", marginBottom:".25rem", flexWrap:"wrap" }}>
                        <span style={{ fontFamily:"'Zen Maru Gothic',sans-serif", fontWeight:700, fontSize:".92rem" }}>{opt.name}</span>
                        <span style={{ fontSize:".7rem", background:"#f0ece6", padding:".15rem .5rem", borderRadius:"2px", color:"#7a7068", fontFamily:"'Zen Maru Gothic',sans-serif" }}>{opt.genre}</span>
                        {opt.mapUrl && (
                          <a href={opt.mapUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                            style={{ fontSize:".72rem", color:"#5a8a6e", textDecoration:"none", border:"1px solid #d4e8dc", padding:".15rem .5rem", borderRadius:"3px", display:"inline-flex", alignItems:"center", gap:".2rem" }}>
                            📍 Map
                          </a>
                        )}
                      </div>
                      <div style={{ fontSize:".8rem", color:"#7a7068", lineHeight:1.6 }}>{opt.desc}</div>
                      {opt.tel && (<div style={{ fontSize:".75rem", color:"#9a918a", marginTop:".2rem", fontFamily:"'Zen Maru Gothic',sans-serif" }}>TEL: {opt.tel}</div>)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
