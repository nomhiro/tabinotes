import { useState } from "react";
import DayMap from "../../components/DayMap";
import PlansMap from "../../components/PlansMap";

const PLANS = [
  {
    id: "A",
    name: "A案 西ルート",
    sub: "オーストリア・アルプス",
    color: "#0f5c8c",
    icon: "🏔",
    countries: "オーストリアのみ",
    leave: "年休5日",
    cost: "約110万円",
    route: "ウィーン空港 → インスブルック(2泊)〔シュトゥーバイ氷河〕 → ザルツブルク(2泊)〔ハルシュタット〕 → メルク修道院 → ウィーン(3泊)",
    schedule: [
      { time: "11/22 着", label: "ウィーン国際空港", desc: "ANA NH205で06:20着。市内までS7で約16分。復路は11/29 NH206で11:25発", icon: "✈", kind: "air", coords: [48.1103, 16.5697] },
      { time: "11/22", label: "Railjet でインスブルックへ", desc: "約4時間15分", icon: "🚄" },
      { time: "Day1-2", label: "インスブルック 旧市街（2泊）", desc: "黄金の小屋根、宮廷教会、ホーフブルク。旧市街クリスマスマーケットは11/15開幕。背後に2,300m級のノルトケッテが立ち上がり、街並みと雪山が同じ視界に入る", icon: "🏘", kind: "base", important: true, coords: [47.2683, 11.3933] },
      { time: "Day2", label: "シュトゥーバイ氷河（Eisgrat 2,900m）", desc: "★本命の雪山。2026/27冬季は10月3日から営業。オーストリア最大の氷河スキー場で、歩行者往復券でスキーなしで上がれる。インスブルックからバス約1時間", icon: "🎿", kind: "snow", important: true, coords: [47.0106, 11.1233] },
      { time: "Day3", label: "Railjet でザルツブルクへ", desc: "約2時間", icon: "🚄" },
      { time: "Day3-5", label: "ザルツブルク 旧市街（2泊）", desc: "ホーエンザルツブルク城塞（ケーブルカー往復込み €15.50）、大聖堂、ゲトライデガッセ。ドーム広場・レジデンツ広場のマーケットは11/19開幕", icon: "🏰", kind: "base", important: true, coords: [47.7998, 13.0447] },
      { time: "Day4", label: "ハルシュタット（日帰り）", desc: "★湖枠の主役。世界遺産の湖畔集落。鉄道＋渡し船「Stefanie」（オーストリアの湖で唯一の通年運航）で対岸へ。塩坑・ケーブルカー・氷穴は冬季休止なので「歩いて湖と山を眺める日」。片道約2時間30分", icon: "🛶", kind: "nat", important: true, coords: [47.5622, 13.6493] },
      { time: "Day5", label: "メルク修道院", desc: "★渓谷枠。ドナウ川を見下ろす断崖のバロック建築。11/3〜3月はガイドツアー限定（11:00／13:30／15:00）。大人€16＋ツアー€4。遊覧船は11/1で終了しているのでテラスから渓谷を眺める。ザルツブルクから約2時間15分", icon: "⛪", kind: "spot", important: true, coords: [48.2281, 15.3339] },
      { time: "Day5 車窓", label: "ヴァッハウ渓谷（デュルンシュタイン）", desc: "世界遺産のドナウ渓谷。メルク〜クレムス間。11月末は遊覧船が終了しているため鉄道の車窓で味わう", icon: "🍇", kind: "nat", coords: [48.3956, 15.5203] },
      { time: "Day5-7", label: "ウィーン（シュテファン大聖堂）3泊", desc: "国立図書館プルンクザール、美術史美術館（月曜休館なので土曜に）、王宮。市庁舎広場マーケット11/13、シュピッテルベルク11/13、フライウング11/14開幕。メルクから鉄道約1時間", icon: "🕍", kind: "base", important: true, coords: [48.2085, 16.3721] },
      { time: "Day6", label: "シェーンブルン宮殿", desc: "時間指定・要予約。ステート€28／パレス€38。宮殿前マーケットは11/6開幕で、ウィーンで最も早く開き1/6まで続く", icon: "👑", kind: "spot", coords: [48.1845, 16.3122] },
      { time: "Day6", label: "ベルヴェデーレ宮殿", desc: "クリムト「接吻」。バロック宮殿＋世紀末絵画", icon: "🖼", kind: "spot", coords: [48.1914, 16.3809] },
      { time: "Day6 夜", label: "ウィーン・コンツェルトハウス", desc: "11月末はシーズン中。日程確定後すぐプログラム確認を", icon: "🎻", kind: "spot", coords: [48.2003, 16.3775] },
      { time: "11/29 発", label: "ウィーン国際空港 → 帰国", desc: "ANA NH206 11:25発", icon: "✈" },
    ],
    refs: [
      { label: "ヒンタートゥクス氷河（荒天時の振替）", desc: "365日営業。氷河内部のナトゥーア・アイス・パラストは常に0℃で天候に左右されない。インスブルックから片道約2時間", mapUrl: "https://www.google.com/maps/search/?api=1&query=47.0672%2C11.6636" },
    ],
  },
  {
    id: "C",
    name: "C案 中欧4か国",
    sub: "オーストリア／ハンガリー／スロバキア／チェコ",
    color: "#7a3b8f",
    icon: "🏰",
    countries: "オーストリア／ハンガリー／スロバキア／チェコ",
    leave: "年休7日",
    cost: "約118万円",
    route: "ウィーン(2泊) → ブダペスト(3泊)〔ドナウベンド〕 → ブラチスラバ(1泊) → プラハ(3泊)〔チェスキー・クルムロフ〕→ プラハ発で帰国",
    schedule: [
      { time: "11/22 着", label: "ウィーン国際空港", desc: "ANA NH205で06:20着。EESの生体登録で列が伸びる想定。市内までS7で約16分", icon: "✈", kind: "air", coords: [48.1103, 16.5697] },
      { time: "Day1-2", label: "ウィーン（シュテファン大聖堂）2泊", desc: "国立図書館プルンクザール、王宮、市庁舎広場マーケット。夕食はフィグルミュラー、休憩はカフェ・ツェントラル", icon: "🕍", kind: "base", important: true, coords: [48.2085, 16.3721] },
      { time: "Day2", label: "シェーンブルン宮殿", desc: "宮殿前マーケットは11/6開幕。ウィーンで最も早い", icon: "👑", kind: "spot", coords: [48.1845, 16.3122] },
      { time: "Day2", label: "ベルヴェデーレ宮殿", desc: "クリムト「接吻」", icon: "🖼", kind: "spot", coords: [48.1914, 16.3809] },
      { time: "Day3", label: "Railjet でブダペストへ", desc: "2時間30分", icon: "🚄" },
      { time: "Day3-5", label: "ブダペスト（漁夫の砦）3泊", desc: "王宮の丘、マーチャーシュ教会。ドナウ越しに国会議事堂を望む定番の眺め", icon: "🏰", kind: "base", important: true, coords: [47.5025, 19.0347] },
      { time: "Day3-5", label: "ヴェレシュマルティ広場マーケット", desc: "11月15日頃〜1月1日。食べ物のレベルが中欧で最高と言われる", icon: "🎄", kind: "spot", coords: [47.4966, 19.051] },
      { time: "Day4", label: "ハンガリー国会議事堂", desc: "ガイドツアー要予約。ネオゴシックの内装は中欧屈指", icon: "🏛", kind: "spot", coords: [47.5072, 19.0456] },
      { time: "Day4", label: "セーチェニ温泉", desc: "ネオバロックの建物で屋外の湯。11月末の寒さがむしろ効く。水着とサンダル持参", icon: "♨", kind: "nat", coords: [47.5188, 19.0832] },
      { time: "Day5", label: "センテンドレ（日帰り）", desc: "バロックの家並みが残る小さな街。通年営業でクリスマスマーケットもあり", icon: "🏘", kind: "nat", coords: [47.6694, 19.0761] },
      { time: "Day5", label: "ヴィシェグラード城塞（日帰り）", desc: "★渓谷枠の主役。丘の上からドナウが90度に折れ曲がる眺望", icon: "🗻", kind: "nat", important: true, coords: [47.7947, 18.9814] },
      { time: "Day5", label: "エステルゴム大聖堂（日帰り）", desc: "ハンガリー最大の教会。裏手のテラスは無料で眺望がほぼ同等。ドーム閉鎖は1月中旬〜2月下旬なので11月は問題なし。ドナウベンド日帰りで往復約3時間", icon: "⛪", kind: "spot", coords: [47.7969, 18.7361] },
      { time: "Day6", label: "ブラチスラバ 旧市街広場（1泊）", desc: "★マーケット点灯式が11月27日＝この日程の初日に当たる。10:00〜22:00、1/3まで。プリマツィアール広場、フランシスコ会広場にも市が立つ。ブダペストから鉄道2時間30分", icon: "🎄", kind: "base", important: true, coords: [48.1441, 17.1073] },
      { time: "Day6", label: "ブラチスラバ城", desc: "丘の上の白い城。旧市街は半日で回れるコンパクトさ", icon: "🏰", kind: "spot", coords: [48.1421, 17.1002] },
      { time: "Day7", label: "鉄道でプラハへ", desc: "約4時間（この日程の最長区間）", icon: "🚄" },
      { time: "Day7-9", label: "プラハ 旧市街広場（3泊）", desc: "★マーケット開幕が11月28日＝到着日に当たる。10:00〜22:00、2027/1/6まで。ツリーとティーン教会の組み合わせが「あの写真」", icon: "🎄", kind: "base", important: true, coords: [50.087, 14.4208] },
      { time: "Day7 夜", label: "カレル橋", desc: "夜の人が少ない時間が狙い目", icon: "🌉", kind: "spot", coords: [50.0865, 14.4114] },
      { time: "Day8", label: "プラハ城・聖ヴィート大聖堂", desc: "旧王宮、黄金小路。丘の上から赤い屋根の海を見下ろす", icon: "🏰", kind: "spot", coords: [50.09, 14.4003] },
      { time: "Day8", label: "ストラホフ修道院図書館", desc: "ウィーンのプルンクザールが気に入ったなら必ず刺さる", icon: "📚", kind: "spot", coords: [50.0866, 14.3891] },
      { time: "Day9", label: "チェスキー・クルムロフ（日帰り）", desc: "ヴルタヴァ川がS字に囲む世界遺産。マーケットは11/20開幕（11/27説もあり要確認）。月〜木11:00〜18:00、金〜日10:00〜19:00。プラハからバス片道2時間30分、1日32〜36便、€9〜25。日没後のイルミネーションが本番", icon: "🏘", kind: "nat", important: true, coords: [48.8127, 14.3175] },
      { time: "12/1 発", label: "プラハ空港 → 帰国", desc: "★C案の要。日本直行便がないためフランクフルト等で1回乗り継ぎ。ウィーンへ戻る鉄道4時間＋前泊が不要になり、1日を観光に回せる", icon: "✈", kind: "air", important: true, coords: [50.1008, 14.26] },
    ],
    refs: [
      { label: "ハイタトラ／ロムニツキー・シュティート（参考・組込は非現実的）", desc: "標高2,634m、ロープウェイは通年毎日運行、往復€89・Gopass事前予約必須。ただしブラチスラバから約4時間・プラハから約8時間で、入れるとブダペストかプラハを丸ごと諦めることになる", mapUrl: "https://www.google.com/maps/search/?api=1&query=49.1951%2C20.2133" },
    ],
  },
  {
    id: "D",
    name: "D案 3か国",
    sub: "オーストリア／ハンガリー／スロバキア",
    color: "#16786a",
    icon: "🚩",
    countries: "オーストリア／ハンガリー／スロバキア",
    leave: "年休5日",
    cost: "約99万円",
    route: "ウィーン(2泊) → ブダペスト(3泊)〔ドナウベンド〕 → ブラチスラバ(1泊) → ウィーン(1泊)",
    schedule: [
      { time: "11/22 着", label: "ウィーン国際空港", desc: "ANA直行の往復がそのまま使える。3案で最も帰国便への接続が安全。復路は11/29 NH206で11:25発", icon: "✈", kind: "air", coords: [48.1103, 16.5697] },
      { time: "Day1-2", label: "ウィーン（シュテファン大聖堂）2泊", desc: "前半2泊＋最終日にもう1泊で計3泊。最終日に美術史美術館（月曜休館で取り逃した分）を回収できる設計", icon: "🕍", kind: "base", important: true, coords: [48.2085, 16.3721] },
      { time: "Day2", label: "シェーンブルン宮殿", desc: "宮殿前マーケットは11/6開幕", icon: "👑", kind: "spot", coords: [48.1845, 16.3122] },
      { time: "Day2", label: "ベルヴェデーレ宮殿", desc: "クリムト「接吻」", icon: "🖼", kind: "spot", coords: [48.1914, 16.3809] },
      { time: "Day3", label: "Railjet でブダペストへ", desc: "2時間30分", icon: "🚄" },
      { time: "Day3-5", label: "ブダペスト（漁夫の砦）3泊", desc: "王宮の丘、マーチャーシュ教会、ドナウ越しの国会議事堂", icon: "🏰", kind: "base", important: true, coords: [47.5025, 19.0347] },
      { time: "Day4", label: "ハンガリー国会議事堂", desc: "ガイドツアー要予約", icon: "🏛", kind: "spot", coords: [47.5072, 19.0456] },
      { time: "Day4", label: "セーチェニ温泉", desc: "11月末の寒さが効く。水着とサンダル持参", icon: "♨", kind: "nat", coords: [47.5188, 19.0832] },
      { time: "Day5", label: "センテンドレ（日帰り）", desc: "バロックの家並み。通年営業", icon: "🏘", kind: "nat", coords: [47.6694, 19.0761] },
      { time: "Day5", label: "ヴィシェグラード城塞（日帰り）", desc: "★この案の自然枠の主役。ドナウベンドの眺望", icon: "🗻", kind: "nat", important: true, coords: [47.7947, 18.9814] },
      { time: "Day5", label: "エステルゴム大聖堂（日帰り）", desc: "ハンガリー最大の教会。ドナウベンド日帰りで往復約3時間", icon: "⛪", kind: "spot", coords: [47.7969, 18.7361] },
      { time: "Day6", label: "ブラチスラバ 旧市街広場（1泊）", desc: "★マーケット点灯式11月27日に当たる。ブダペストから鉄道2時間30分、翌日ウィーンへは列車1時間", icon: "🎄", kind: "base", important: true, coords: [48.1441, 17.1073] },
      { time: "Day6", label: "ブラチスラバ城", desc: "丘の上の白い城", icon: "🏰", kind: "spot", coords: [48.1421, 17.1002] },
      { time: "Day7", label: "鉄道でウィーンへ戻る（1泊）", desc: "約1時間", icon: "🚄" },
      { time: "Day7", label: "美術史美術館", desc: "€22オンライン／€24現地。月曜休館なので土曜のこの日に配置", icon: "🖼", kind: "spot", coords: [48.2038, 16.3617] },
      { time: "11/29 発", label: "ウィーン国際空港 → 帰国", desc: "ANA NH206 11:25発", icon: "✈" },
    ],
  },
];

const COMPARE_NOTES = [
  { title: "A案は西へ、C案・D案は東へ一直線", body: "この2方向は完全に逆で、7日間で両方を回るのは物理的に無理だと一目で分かる。" },
  { title: "A案だけがアルプス山脈の中に入る", body: "インスブルックとシュトゥーバイ氷河は山地のど真ん中。逆にC案・D案のルートはドナウ川沿いの平野部をなぞっており、標高のある地形がルート上に一切ない。「雪山が無い」のは地図の形からくる必然。" },
  { title: "D案は三角形が小さい", body: "ウィーン・ブダペスト・ブラチスラバの3都市が半径200km圏に収まっていて、これが「全区間2時間30分以内」の理由。" },
  { title: "ブラチスラバはウィーンの目と鼻の先", body: "約55km、列車1時間。C案でもD案でも、ここは苦労なく足せる。" },
  { title: "チェスキー・クルムロフはプラハとウィーンのほぼ中間", body: "C案では「プラハからの日帰り」にしているが、プラハからウィーンへ移動する途中で1泊する使い方も自然。帰国便をウィーン発にする場合はこちらが効率的。" },
  { title: "ハイタトラは地図の右端", body: "ブラチスラバから直線でも約320km、鉄道4時間超。C案のルートから大きく外れる。" },
];

const MapLink = ({ href }) => href ? (<a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", fontSize:"0.82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }} className="tl-link" aria-label="Google Map"><span aria-hidden="true">📍</span></a>) : null;

export default function EuropePlansTrip() {
  const [activeTab, setActiveTab] = useState("compare");
  const activePlan = PLANS.find((p) => p.id === activeTab);

  return (
    <div style={{ fontFamily: "'Noto Serif JP', 'Hiragino Mincho ProN', serif", background: "#F7F3ED", minHeight: "100vh", color: "#2C2421" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;600;700&family=Zen+Maru+Gothic:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .cover { position:relative; min-height:30vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:linear-gradient(175deg,#0d2847 0%,#0f5c8c 32%,#3f4b8f 58%,#7a3b8f 82%,#16786a 100%); overflow:hidden; padding:2rem; }
        .cover::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 20% 80%,rgba(122,59,143,.3) 0%,transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(15,92,140,.4) 0%,transparent 50%); }
        .cover-pattern { position:absolute; inset:0; opacity:.06; background-image:repeating-linear-gradient(0deg,transparent,transparent 40px,#fff 40px,#fff 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,#fff 40px,#fff 41px); }
        .cover-content { position:relative; z-index:2; text-align:center; color:white; animation:fadeUp 1.2s ease-out; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .cover-label { font-family:'Zen Maru Gothic',sans-serif; font-size:.85rem; letter-spacing:.5em; opacity:.8; margin-bottom:1.5rem; }
        .cover-title { font-size:clamp(2.5rem,7vw,4.5rem); font-weight:700; letter-spacing:.15em; line-height:1.3; margin-top:0; margin-bottom:.5rem; text-shadow:0 4px 30px rgba(0,0,0,.3); }
        .cover-sub { font-size:clamp(1rem,3vw,1.4rem); font-weight:300; letter-spacing:.3em; opacity:.85; margin-bottom:2rem; }
        .cover-date { font-family:'Zen Maru Gothic',sans-serif; display:inline-block; border:1px solid rgba(255,255,255,.4); padding:.6rem 2rem; font-size:.95rem; letter-spacing:.2em; border-radius:2px; }
        .cover-members { margin-top:2rem; font-size:.95rem; opacity:.85; letter-spacing:.15em; }
        .cover-back { position:absolute; top:1.5rem; left:1.5rem; z-index:3; color:rgba(255,255,255,.75); text-decoration:none; font-family:'Zen Maru Gothic',sans-serif; font-size:.85rem; letter-spacing:.05em; transition:color .2s; }
        .cover-back:hover { color:white; }
        .cover-back:focus-visible { color:white; outline:2px solid white; outline-offset:2px; border-radius:2px; }
        .nav-bar { position:sticky; top:0; z-index:100; background:rgba(247,243,237,.92); backdrop-filter:blur(12px); border-bottom:1px solid rgba(0,0,0,.08); display:flex; justify-content:safe center; overflow-x:auto; -webkit-overflow-scrolling:touch; }
        .nav-btn { flex:0 0 auto; font-family:'Zen Maru Gothic',sans-serif; border:none; background:none; padding:1rem 1.2rem; font-size:.82rem; cursor:pointer; color:#6a6058; letter-spacing:.05em; white-space:nowrap; transition:all .3s; border-bottom:2px solid transparent; }
        .nav-btn:hover { color:#2C2421; }
        .nav-btn:focus-visible { color:#2C2421; outline:2px solid #2C2421; outline-offset:-2px; border-radius:2px; }
        .nav-btn.active { color:#2C2421; font-weight:700; border-bottom-color:currentColor; }
        .nav-btn-date { font-size:.72rem; color:#6a6058; letter-spacing:0; }
        .nav-btn.active .nav-btn-date { color:#2C2421; }
        .plan-section { max-width:720px; margin:0 auto; padding:3rem 1.5rem; animation:fadeIn .5s ease-out; }
        .day-header { display:flex; align-items:center; gap:1rem; margin-bottom:.5rem; flex-wrap:wrap; }
        .day-number { font-family:'Zen Maru Gothic',sans-serif; font-size:.75rem; font-weight:700; letter-spacing:.15em; padding:.3rem .8rem; border-radius:2px; color:white; }
        .day-date { font-family:'Zen Maru Gothic',sans-serif; font-size:.85rem; color:#756d65; letter-spacing:.1em; }
        .day-title { font-size:clamp(1.4rem,4vw,1.8rem); font-weight:600; letter-spacing:.08em; margin:0 0 .4rem; line-height:1.4; }
        .plan-countries { font-family:'Zen Maru Gothic',sans-serif; font-size:.85rem; color:#6a6058; margin-bottom:2rem; letter-spacing:.05em; }
        .memo-box { border:1px solid #d8d0c6; background:linear-gradient(135deg,#fbf8f3,#f7f3ed); border-radius:6px; padding:1rem 1.2rem; margin-bottom:2rem; font-size:.82rem; line-height:1.7; color:#3a3229; }
        .memo-box h3 { font-family:'Zen Maru Gothic',sans-serif; font-weight:700; font-size:.88rem; margin-bottom:.5rem; display:flex; align-items:center; gap:.5rem; flex-wrap:wrap; }
        .memo-box ul { list-style:none; display:grid; gap:.7rem; }
        .memo-link { color:#5a8a6e; text-decoration:none; margin-left:.3rem; }
        .memo-link:hover { text-decoration:underline; }
        .memo-link:focus-visible { outline:2px solid currentColor; outline-offset:1px; border-radius:3px; }
        .timeline { position:relative; padding-left:2rem; list-style:none; }
        .timeline::before { content:''; position:absolute; left:5px; top:8px; bottom:8px; width:1px; background:#d4cdc5; }
        .tl-item { position:relative; padding-bottom:1.8rem; padding-left:1rem; }
        .tl-item:last-child { padding-bottom:0; }
        .tl-dot { position:absolute; left:-2rem; top:4px; width:11px; height:11px; border-radius:50%; background:#d4cdc5; border:2px solid #F7F3ED; z-index:1; }
        .tl-dot.important { width:13px; height:13px; }
        .tl-time { font-family:'Zen Maru Gothic',sans-serif; font-size:.78rem; color:#756d65; letter-spacing:.05em; margin-bottom:.2rem; }
        .tl-label { font-weight:500; font-size:1rem; letter-spacing:.04em; display:flex; align-items:center; gap:.5rem; flex-wrap:wrap; }
        .tl-label .emoji { font-size:1.1rem; }
        .tl-desc { font-size:.82rem; color:#6a6058; margin-top:.2rem; line-height:1.6; }
        .tl-item.important .tl-label { font-weight:600; }
        .tl-link:hover { opacity:1!important; }
        .tl-link:focus-visible { outline:2px solid #2C2421; outline-offset:1px; border-radius:2px; }
        .compare-title { font-size:1.6rem; font-weight:600; letter-spacing:.08em; margin:0 0 2rem; text-align:center; }
        .compare-wrap { overflow-x:auto; background:white; border-radius:6px; box-shadow:0 1px 8px rgba(0,0,0,.06); margin-bottom:2.5rem; }
        .compare-table { width:100%; border-collapse:collapse; font-size:.82rem; min-width:560px; }
        .compare-table th, .compare-table td { padding:.9rem 1rem; text-align:left; vertical-align:top; border-bottom:1px solid #f0ece6; line-height:1.6; }
        .compare-table thead th { font-family:'Zen Maru Gothic',sans-serif; font-size:.78rem; letter-spacing:.08em; color:#5a5048; background:#f3efe8; white-space:nowrap; }
        .compare-table tbody tr:last-child th, .compare-table tbody tr:last-child td { border-bottom:none; }
        .compare-table .plan-cell { font-family:'Zen Maru Gothic',sans-serif; font-weight:700; white-space:nowrap; }
        .compare-table .num-cell { font-variant-numeric:tabular-nums; white-space:nowrap; font-weight:600; }
        .map-legend { display:flex; flex-wrap:wrap; gap:.8rem 1.2rem; padding:.9rem 1.1rem; background:white; font-family:'Zen Maru Gothic',sans-serif; font-size:.75rem; color:#6a6058; }
        .legend-item { display:inline-flex; align-items:center; gap:.4rem; }
        .legend-dot { width:13px; height:13px; border-radius:50%; border:2px solid #fff; box-shadow:0 0 0 1px #cfc7bd; flex-shrink:0; }
        .legend-line { width:22px; height:4px; border-radius:2px; flex-shrink:0; }
        .notes-list { list-style:none; display:grid; gap:1rem; margin-bottom:2rem; }
        .notes-list li { background:white; border-radius:6px; padding:1rem 1.2rem; box-shadow:0 1px 8px rgba(0,0,0,.06); font-size:.85rem; line-height:1.7; color:#3a3229; }
        .notes-list b { font-family:'Zen Maru Gothic',sans-serif; display:block; margin-bottom:.3rem; color:#2C2421; }
        .section-sub { font-family:'Zen Maru Gothic',sans-serif; font-size:1rem; font-weight:700; letter-spacing:.08em; margin:0 0 1rem; display:flex; align-items:center; gap:.5rem; }
        .page-note { text-align:center; font-size:.78rem; color:#756d65; line-height:1.7; }
        @media (max-width:500px) { .nav-btn{padding:.8rem .7rem;font-size:.72rem} .nav-btn-date{font-size:.65rem} .plan-section{padding:2rem 1rem} }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration:0.01ms!important; transition-duration:0.01ms!important; } }
      `}</style>

      <header className="cover">
        <a href="#/" className="cover-back">← 旅の一覧</a>
        <div className="cover-pattern" aria-hidden="true" />
        <div className="cover-content">
          <div className="cover-label">Travel Plan Candidates</div>
          <h1 className="cover-title">ヨーロッパの旅</h1>
          <div className="cover-sub">A案 ・ C案 ・ D案</div>
          <div className="cover-date">2026. 11. 22 — 12. 1（検討中）</div>
          <div className="cover-members">のむら ひろき ・ りの</div>
        </div>
      </header>

      <nav className="nav-bar" aria-label="プラン候補ナビゲーション">
        <button className={`nav-btn ${activeTab === "compare" ? "active" : ""}`} aria-pressed={activeTab === "compare"} onClick={() => setActiveTab("compare")}>
          <span aria-hidden="true">⚖</span> 比較 <span className="nav-btn-date">3案</span>
        </button>
        {PLANS.map((p) => (
          <button
            key={p.id}
            className={`nav-btn ${activeTab === p.id ? "active" : ""}`}
            aria-pressed={activeTab === p.id}
            style={activeTab === p.id ? { borderBottomColor: p.color } : undefined}
            onClick={() => setActiveTab(p.id)}
          >
            <span aria-hidden="true">{p.icon}</span> {p.id}案 <span className="nav-btn-date">{p.leave}</span>
          </button>
        ))}
      </nav>

      <main>
        <div aria-live="polite" aria-atomic="true" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)", whiteSpace: "nowrap" }}>
          {activeTab === "compare" ? "3案の比較を表示中" : `${activePlan.name}の行程を表示中`}
        </div>

        {activeTab === "compare" ? (
          <div className="plan-section" key="compare">
            <h2 className="compare-title">3案の比較</h2>

            <PlansMap plans={PLANS} label="A案・C案・D案のルート比較マップ" />

            <div className="compare-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th scope="col">案</th>
                    <th scope="col">国</th>
                    <th scope="col">ルート（〔 〕は日帰り）</th>
                    <th scope="col">年休</th>
                    <th scope="col">費用（2名）</th>
                  </tr>
                </thead>
                <tbody>
                  {PLANS.map((p) => (
                    <tr key={p.id}>
                      <th scope="row" className="plan-cell" style={{ color: p.color }}>
                        <span aria-hidden="true">{p.icon}</span> {p.id}案
                      </th>
                      <td>{p.countries}</td>
                      <td>{p.route}</td>
                      <td className="num-cell">{p.leave.replace("年休", "")}</td>
                      <td className="num-cell">{p.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="section-sub">
              <span aria-hidden="true">🗺</span> 地図を見て分かること
            </h3>
            <ul className="notes-list">
              {COMPARE_NOTES.map((n, i) => (
                <li key={i}>
                  <b>{n.title}</b>
                  {n.body}
                </li>
              ))}
            </ul>

            <div className="page-note">
              ※ 各案の詳細は上のタブから。営業日程・運賃は渡航前に公式サイトで確認してください。
              <br />
              調査日 2026年8月16日。地図データ © OpenStreetMap contributors
            </div>
          </div>
        ) : (
          <div className="plan-section" key={`plan-${activePlan.id}`}>
            <div className="day-header">
              <span className="day-number" style={{ background: activePlan.color }}>
                {activePlan.id}案
              </span>
              <span className="day-date">
                {activePlan.leave} ／ {activePlan.cost}（2名）
              </span>
            </div>
            <h2 className="day-title" style={{ color: activePlan.color }}>
              {activePlan.name}
            </h2>
            <p className="plan-countries">{activePlan.sub}</p>

            <div className="memo-box" style={{ borderLeft: `3px solid ${activePlan.color}` }}>
              <h3 style={{ color: activePlan.color }}>
                <span aria-hidden="true">🧭</span> ルート概要
              </h3>
              <div>{activePlan.route}</div>
            </div>

            <DayMap schedule={activePlan.schedule} color={activePlan.color} label={`${activePlan.name}のルートマップ`} />

            <ol className="timeline">
              {activePlan.schedule.map((item, i) => (
                <li key={i} className={`tl-item ${item.important ? "important" : ""}`}>
                  <div className={`tl-dot ${item.important ? "important" : ""}`} aria-hidden="true" style={item.important ? { background: activePlan.color } : {}} />
                  <div className="tl-time">{item.time}</div>
                  <div className="tl-label">
                    <span className="emoji" aria-hidden="true">{item.icon}</span>
                    {item.label}
                    {item.coords && <MapLink href={`https://www.google.com/maps/search/?api=1&query=${item.coords[0]}%2C${item.coords[1]}`} />}
                  </div>
                  {item.desc && <div className="tl-desc">{item.desc}</div>}
                </li>
              ))}
            </ol>

            {activePlan.refs && (
              <div className="memo-box" style={{ marginTop: "2.5rem", marginBottom: 0, borderLeft: `3px solid ${activePlan.color}` }}>
                <h3 style={{ color: activePlan.color }}>
                  <span aria-hidden="true">📎</span> 参考・予備プラン
                </h3>
                <ul>
                  {activePlan.refs.map((r, i) => (
                    <li key={i}>
                      <b>{r.label}</b>
                      <br />
                      {r.desc}
                      {r.mapUrl && (
                        <a className="memo-link" href={r.mapUrl} target="_blank" rel="noopener noreferrer">
                          <span aria-hidden="true">📍</span> Map
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
