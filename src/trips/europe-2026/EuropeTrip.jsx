import { useState } from "react";
import DayMap from "../../components/DayMap";

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
    title: "羽田発 ─ ドバイ乗継 ─ ブダペスト着",
    color: "#7a5c9a",
    icon: "🛫",
    schedule: [
      { time: "00:05 JST", label: "羽田（HND）出発", desc: "エミレーツ。第3ターミナル。機内で一眠りを", icon: "✈", important: true },
      { time: "06:55頃 DXB", label: "ドバイ（DXB）着（推定）", desc: "乗継 3時間10分。ターミナル3内で移動。JST 11:55頃", icon: "🇦🇪" },
      { time: "10:05頃 DXB", label: "ドバイ（DXB）発（推定）", desc: "JST 15:05頃。時刻は予約画面「View more details」で確認を", icon: "✈" },
      { time: "13:05 BUD", label: "ブダペスト（BUD）着", desc: "ターミナル2b。入国審査でEES（EU新入域システム）の生体登録があり通常より時間がかかる可能性あり。JST 21:05", icon: "🏁", important: true, coords: [47.4369, 19.2556] },
      { time: "14:00頃", label: "100E エアポートエクスプレス 乗車", desc: "Deák Ferenc tér まで約40分・2,500HUF/人。市内交通パスは使えず専用券が必要", icon: "🚌", coords: [47.4369, 19.2556] },
      { time: "15:00頃", label: "ホテル チェックイン", desc: "到着日は無理をせず夕食・両替まわりで。翌朝に備えて早めに就寝", icon: "🏨", important: true, coords: [47.4979, 19.0402] },
    ],
    memo: {
      bg: "linear-gradient(135deg,#f0eef8,#ede8f5)",
      border: "#c8bce8",
      titleColor: "#5a3a9a",
      textColor: "#3a2a6a",
      icon: "🇭🇺",
      title: "ブダペスト空港 → 市内アクセス",
      body: (
        <>
          <b>100E エアポートエクスプレス（推奨）</b>：Deák Ferenc tér 行き。専用券 2,500HUF/人・約40分。2025年10月に2,200→2,500HUFへ改定。<br/>
          <b>節約：200E バス＋地下鉄M3</b>：Kőbánya-Kispest 乗換、所要はほぼ同じで500HUF/人。荷物が多いと乗換が負担。<br/>
          <b>EES（EU新入域システム）</b>：シェンゲン圏初入域時に指紋と顔写真の登録が必要。予約画面にも案内あり。列が伸びる場合があります。
        </>
      ),
    },
  },
  {
    day: 2,
    date: "11月19日（木）",
    title: "ブダペスト ─ 終日観光",
    color: "#7a5c9a",
    icon: "🏰",
    schedule: [
      { time: "終日", label: "ブダペスト 市内観光", desc: "観光先は後で確定。日の入りが16:15頃と早いので、夜景・屋内施設を後半に組み込む順が有利", icon: "🗺", important: true },
      { time: "どこかで", label: "翌朝の列車を確認", desc: "ブダペスト東駅（Keleti）までの経路と所要を確認しておくと翌朝が楽。座席指定はÖBBサイトまたはMÁV START Europaで", icon: "🚆" },
    ],
    memo: {
      bg: "linear-gradient(135deg,#f8f0ec,#f5ece8)",
      border: "#e8c8b8",
      titleColor: "#9a4a2a",
      textColor: "#5a3020",
      icon: "♨",
      title: "ブダペスト 観光メモ",
      body: (
        <>
          <b>王宮の丘・漁夫の砦</b>：ドナウ越しに国会議事堂を望む定番の眺め。夜景も◎<br/>
          <b>マーチャーシュ教会</b>：王宮の丘に隣接。11月は営業中（時間確認を）<br/>
          <b>セーチェニ温泉</b>：ネオバロックの建物で屋外の湯。11月の寒さがむしろ効く。水着・サンダル持参<br/>
          <b>ハンガリー国会議事堂</b>：ガイドツアー要予約（英語ツアーは公式サイトから）<br/>
          <b>ヴェレシュマルティ広場</b>：11月中旬からクリスマスマーケット開催。食のクオリティが高いと評判<br/>
          <b>日本との時差</b>：現地時間＋8時間が日本時間。現地9時＝日本17時
        </>
      ),
    },
  },
  {
    day: 3,
    date: "11月20日（金）",
    title: "ブダペスト → ウィーン（鉄道 約2時間40分）",
    color: "#4a7a9a",
    icon: "🚄",
    schedule: [
      { time: "午前", label: "ブダペスト東駅（Keleti）発", desc: "Railjet / EuroCity の直通。午前便に乗れば午後がまるごとウィーンに。早割券は変更不可なので時間に余裕を", icon: "🚆", important: true, coords: [47.5001, 19.0839] },
      { time: "昼過ぎ", label: "ウィーン中央駅 着", desc: "U1で市内中心まで直通。ホテルへ荷物を預けて昼食", icon: "🚉", coords: [48.1848, 16.3765] },
      { time: "15:00以降", label: "ウィーン市内散策", desc: "観光先は後で確定。チェックイン後そのまま市内へ", icon: "🗺", coords: [48.2085, 16.3721] },
    ],
    memo: {
      bg: "linear-gradient(135deg,#eef4fa,#e8f0f8)",
      border: "#b8d0e8",
      titleColor: "#2a5a8a",
      textColor: "#1a3a5a",
      icon: "🚆",
      title: "ブダペスト → ウィーン 鉄道メモ",
      body: (
        <>
          <b>ÖBB Sparschiene Europa</b>：€19.90〜（早割・枚数限定・変更不可）<br/>
          <b>MÁV START Europa</b>：€13〜（MÁV自社運賃のほうが安い場合あり・座席指定別途€3程度）<br/>
          <b>発着駅</b>：ブダペスト東駅（Keleti）→ ウィーン中央駅。<br/>
          <b>⚠ RegioJetは南駅（Déli）発</b>：東駅の近くに宿を取る場合は価格差より駅の一致を優先したほうが朝が楽。<br/>
          <b>早割</b>：出発6ヶ月前から販売。11/20発はすでに解禁済み。売り切れると当日券で3〜4倍。
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
    title: "ウィーン → プラハ（鉄道 約4時間20分）",
    color: "#3a7a5a",
    icon: "🚄",
    schedule: [
      { time: "朝〜午前", label: "ウィーン中央駅 発", desc: "3都市間で最も長い移動。8時台に出れば昼過ぎにプラハ着。早割券は変更不可なので余裕を持って駅へ", icon: "🚆", important: true, coords: [48.1848, 16.3765] },
      { time: "昼過ぎ", label: "プラハ本駅（hlavní nádraží）着", desc: "旧市街まで徒歩圏の宿なら荷物を置いてそのまま動ける", icon: "🚉", coords: [50.0833, 14.4356] },
      { time: "午後", label: "プラハ 市内散策", desc: "チェックイン後、旧市街広場・カレル橋など。到着日の午後は気ままに", icon: "🗺", coords: [50.087, 14.4208] },
    ],
    memo: {
      bg: "linear-gradient(135deg,#eef8f0,#e8f5ec)",
      border: "#b8e0c8",
      titleColor: "#2a6a4a",
      textColor: "#1a4a30",
      icon: "🚆",
      title: "ウィーン → プラハ 鉄道メモ",
      body: (
        <>
          <b>ÖBB Sparschiene / First Minute</b>：€14.90〜（早割・枚数限定・変更不可）<br/>
          <b>RegioJet</b>：€15前後〜。ウィーン中央駅 → プラハ本駅で駅が一致<br/>
          <b>⚠ 日曜は混みやすい</b>：早めに確保を。<br/>
          <b>早割</b>：11/22発はすでに解禁済み。売り切れると当日券で3〜4倍。
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
      { time: "14:45 PRG", label: "プラハ（PRG）出発", desc: "エミレーツ。第1ターミナル。JST 22:45", icon: "✈", important: true, coords: [50.1008, 14.26] },
      { time: "23:15頃 DXB", label: "ドバイ（DXB）着（推定）", desc: "乗継 3時間15分の深夜乗継。JST 翌04:15頃", icon: "🇦🇪" },
      { time: "機中泊", label: "ドバイ発 02:30頃（推定）", desc: "JST 07:30頃。時刻は予約画面で確認を", icon: "😴" },
    ],
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
      { time: "02:30頃 DXB", label: "ドバイ（DXB）発（推定）", desc: "JST 07:30頃", icon: "✈" },
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
  { item: "エミレーツ 往復航空券（大人2名・エコノミー）", cost: 0, note: "予約済・金額は予約画面で確認" },
  { item: "鉄道 ブダペスト→ウィーン（2名）", cost: 0, note: "手配要 €13〜/人（MÁV）または €19.90〜/人（ÖBB）" },
  { item: "鉄道 ウィーン→プラハ（2名）", cost: 0, note: "手配要 €14.90〜/人（ÖBB）または €15〜/人（RegioJet）" },
  { item: "ブダペスト 2泊（2名）", cost: 0, note: "手配要" },
  { item: "ウィーン 2泊（2名）", cost: 0, note: "手配要" },
  { item: "プラハ 2泊（2名）", cost: 0, note: "手配要" },
  { item: "空港バス 100E（ブダペスト空港→市内、2名）", cost: 5000, note: "2,500HUF×2名（概算¥2,500/人）" },
  { item: "宿泊税 ブダペスト（室料の4%×2泊）", cost: 0, note: "現地払い（概算）" },
  { item: "宿泊税 ウィーン（室料の5%×2泊）", cost: 0, note: "現地払い（2027/7から8%）" },
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
        .eu-nav-bar { position:sticky; top:0; z-index:100; background:rgba(247,243,237,.92); backdrop-filter:blur(12px); border-bottom:1px solid rgba(0,0,0,.08); display:flex; justify-content:center; overflow-x:auto; }
        .eu-nav-btn { font-family:'Zen Maru Gothic',sans-serif; border:none; background:none; padding:1rem 1.2rem; font-size:.82rem; cursor:pointer; color:#6a6058; letter-spacing:.05em; white-space:nowrap; transition:all .3s; border-bottom:2px solid transparent; }
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
              ※ 航空券・宿泊・鉄道は予約後に金額を更新します。<br />
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
                </li>
              ))}
            </ol>

            {DAYS[activeDay].booking && (
              <div
                className="eu-booking-card"
                role="button" tabIndex={0}
                aria-expanded={expandedBooking === `day-${activeDay}`}
                onClick={() => setExpandedBooking(expandedBooking === `day-${activeDay}` ? null : `day-${activeDay}`)}
                onKeyDown={e => handleCardKeyDown(e, () => setExpandedBooking(expandedBooking === `day-${activeDay}` ? null : `day-${activeDay}`))}>
                <div className="eu-booking-header" style={{ borderLeft: `3px solid ${DAYS[activeDay].color}` }}>
                  <span><span aria-hidden="true">📋</span> {DAYS[activeDay].booking.title}</span>
                  <span className="eu-booking-toggle" aria-hidden="true"
                    style={{ transform: expandedBooking === `day-${activeDay}` ? "rotate(180deg)" : "none" }}>▼</span>
                </div>
                {expandedBooking === `day-${activeDay}` && (
                  <>
                    <div className="eu-booking-details">
                      {DAYS[activeDay].booking.details.map((d, i) => (
                        <div className="eu-booking-row" key={i}>
                          <span className="eu-booking-row-label">{d.label}</span>
                          <span className="eu-booking-row-value">{d.value}</span>
                        </div>
                      ))}
                    </div>
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
          </div>
        )}
      </main>
    </div>
  );
}
