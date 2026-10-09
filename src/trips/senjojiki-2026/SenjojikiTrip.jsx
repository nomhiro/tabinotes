import { useState } from "react";
import DayMap from "../../components/DayMap";
import PlacePreview from "../../components/PlacePreview";
import WeatherWidget from "../../components/WeatherWidget";
const OFFICIAL_URL = "https://chuo-alps.com/";
const SUGANODAI_MAP_URL = "https://maps.google.com/?q=菅の台バスセンター";
const ONSEN_URL = "https://www.seiryuen.jp/";
const MEIJITEI_URL = "https://www.meijitei.com/komaganeten.html";
const MEIJITEI_MAP_URL = "https://maps.app.goo.gl/K5Z9Up4QwQPuTpYc6";

const DAYS = [
  {
    day: 1,
    date: "10月11日（日）",
    title: "春日井を夜に出発 → 菅の台で車中泊",
    color: "#3d5a80",
    icon: "🚗",
    weather: { name: "駒ヶ根", lat: 35.73, lon: 137.93, tripDate: "2026-10-11" },
    schedule: [
      { time: "夕方", label: "荷物の積み込み・ガソリン満タン", desc: "寝袋・防寒着・サンシェードなど車中泊の装備を最終確認", icon: "🎒" },
      { time: "20:30頃", label: "春日井を出発", desc: "中央道で駒ヶ根へ（約1.5時間の概算）。日曜夜に混むのは名古屋方面の上り線で、行きの下り線は空いている想定", icon: "🚗", important: true },
      { time: "21:30〜22:00頃", label: "トイレ休憩・食料調達", desc: "中央道の駒ヶ岳SA（下り）か、駒ヶ根IC付近のコンビニで。朝食もここで買っておくと山上で動きやすい", icon: "🛒" },
      { time: "22:30頃", label: "菅の台バスセンター駐車場に到着", desc: "300台・24時間・1日800円。満車の場合は係員が別の駐車場へ案内", icon: "🅿️", important: true, url: OFFICIAL_URL, mapUrl: SUGANODAI_MAP_URL },
      { time: "23:00", label: "就寝（アラーム 4:00）", desc: "標高850m付近で夜は冷える。アイドリングに頼らず寝袋で寒さをしのぐ", icon: "😴" },
    ],
  },
  {
    day: 2,
    date: "10月12日（月）",
    title: "始発で千畳敷カールへ → 13時台に下山",
    color: "#b5573a",
    icon: "🏔️",
    weather: { name: "千畳敷", lat: 35.79, lon: 137.81, tripDate: "2026-10-12" },
    schedule: [
      { time: "4:00", label: "起床", desc: "公式のライブカメラ・運行情報・天気を確認", icon: "⏰", url: OFFICIAL_URL },
      { time: "4:15〜4:30", label: "身支度 → バス乗り場の列へ", desc: "トイレを済ませ、荷物を持って菅の台バスセンターのバス乗り場へ", icon: "🧥", mapUrl: SUGANODAI_MAP_URL },
      { time: "5:15", label: "通常の始発バスで菅の台を出発", desc: "公式PDFからの読み取りのため、前日までに時刻表で要確認", icon: "🚌", important: true, url: OFFICIAL_URL },
      { time: "5:45〜6:00", label: "しらび平 着 → ロープウェイ（約7.5分）", desc: "バスの到着に合わせて早朝運転・臨時運転がある", icon: "🚠" },
      { time: "6:00〜6:30", label: "千畳敷駅 着（標高2,612m）", desc: "まず防寒着を着る。日中でも10℃を下回り、霜が降りていることも", icon: "🏔️", important: true },
      { time: "6:30〜8:00", label: "カール周遊の遊歩道", desc: "一周約40分。朝の斜光が一番きれいな時間", icon: "🥾" },
      { time: "8:00〜8:30", label: "剣ヶ池の周辺で撮影", desc: "この時間からバス待ちが伸びてくる", icon: "📸" },
      { time: "8:30〜9:30", label: "山上のレストラン・売店で朝食・休憩", desc: "営業時間は未確認。朝食は車内で済ませておくと動きやすい", icon: "☕" },
      { time: "9:30〜12:00", label: "自由時間", desc: "カールをもう一周しながら駅周辺で休む。体力があれば乗越浄土方面へ少し登る（時間と装備を見ながら）。木曽駒ヶ岳山頂は往復5〜6時間かかり、13時台に下りる今回の計画とは両立しにくいので見送り推奨", icon: "🌄" },
      { time: "12:00", label: "昼食", desc: "山上の売店・レストランで。営業時間は要確認", icon: "🍙" },
      { time: "13:00〜13:30", label: "下りロープウェイに乗る", desc: "15〜16時の下山ピークを避ける。日帰りの最終は、ロープウェイが千畳敷17:00発", icon: "🚡", important: true },
      { time: "14:00〜15:00", label: "しらび平からバスで菅の台へ", desc: "バスの最終はしらび平17:20発", icon: "🚌" },
      { time: "15:00〜16:00", label: "日帰り温泉（清流苑）", desc: "場所・営業時間・料金は公式サイトで確認（10/12は祝日）", icon: "♨️", url: ONSEN_URL },
      { time: "16:15〜17:15頃", label: "夕食：明治亭 駒ヶ根店（ソースかつ丼）", desc: "駒ヶ根名物のソースかつ丼。営業時間・祝日の営業は公式サイトで確認。渋滞を避ける時間調整を兼ねる", icon: "🍽", important: true, url: MEIJITEI_URL, mapUrl: MEIJITEI_MAP_URL },
      { time: "17:30〜18:00", label: "駒ヶ根を出発", desc: "連休最終日の夕方は中央道の名古屋方面が混みやすい。早めに出るか遅めに出る", icon: "🚗" },
      { time: "20:00〜21:00", label: "春日井に帰着", desc: "渋滞次第", icon: "🏠" },
    ],
    booking: {
      title: "ロープウェイ＋バス往復チケット（大人2名）",
      url: OFFICIAL_URL,
      mapUrl: SUGANODAI_MAP_URL,
      details: [
        { label: "商品名", value: "【公式販売】中央アルプス駒ヶ岳 ロープウェイ乗車チケット" },
        { label: "プラン", value: "ロープウェイ【往復】＋路線バス【往復】" },
        { label: "利用日", value: "2026年10月12日（月）" },
        { label: "集合場所", value: "菅の台バスセンター" },
        { label: "人数", value: "大人 × 2" },
        { label: "支払額", value: "¥9,320" },
        { label: "注文番号", value: "05103001100012947907" },
        { label: "状態", value: "バウチャー送付済み" },
        { label: "運行会社", value: "中央アルプス観光(株)" },
        { label: "注意", value: "チケットに記載の利用予定日のみ乗車可。往復券の復路の条件は予約画面の注意事項で確認" },
      ],
    },
  },
];

const COSTS = [
  { item: "ロープウェイ＋バス往復（大人2名）", cost: 9320, note: "予約済み" },
  { item: "菅の台駐車場", cost: 800, note: "1日分の目安・日またぎは要確認" },
];

const WebLink = ({ href }) => href ? (<a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", fontSize:"0.82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }} aria-label="公式サイト" onClick={e=>e.stopPropagation()}><span aria-hidden="true">🌐</span></a>) : null;
const MapLink = ({ href }) => href ? (<a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", fontSize:"0.82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }} aria-label="Google Map" onClick={e=>e.stopPropagation()}><span aria-hidden="true">📍</span></a>) : null;
const PhotoLink = ({ href }) => href ? (<a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", fontSize:"0.82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }} aria-label="予約写真" onClick={e=>e.stopPropagation()}><span aria-hidden="true">📷</span></a>) : null;
const handleCardKeyDown = (e, callback) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); callback(); } };
const formatShortDate = (date) => {
  const m = date.match(/(\d+)月(\d+)日（(.)）/);
  return m ? `${m[1]}/${m[2]}(${m[3]})` : "";
};

export default function SenjojikiTrip() {
  const [activeDay, setActiveDay] = useState(0);
  const [showCost, setShowCost] = useState(false);
  const [expandedBooking, setExpandedBooking] = useState(null);
  const totalCost = COSTS.reduce((s, c) => s + c.cost, 0);

  return (
    <div style={{ fontFamily: "'Noto Serif JP', 'Hiragino Mincho ProN', serif", background: "#F7F3ED", minHeight: "100vh", color: "#2C2421" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;600;700&family=Zen+Maru+Gothic:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .cover { position:relative; min-height:30vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:linear-gradient(175deg,#1c2e4a 0%,#3d5a80 40%,#6e4f63 72%,#9a4a30 100%); overflow:hidden; padding:2rem; }
        .cover::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 20% 80%,rgba(154,74,48,.4) 0%,transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(28,46,74,.5) 0%,transparent 50%); }
        .cover-pattern { position:absolute; inset:0; opacity:.06; background-image:repeating-linear-gradient(0deg,transparent,transparent 40px,#fff 40px,#fff 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,#fff 40px,#fff 41px); }
        .cover-content { position:relative; z-index:2; text-align:center; color:white; animation:fadeUp 1.2s ease-out; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .cover-label { font-family:'Zen Maru Gothic',sans-serif; font-size:.85rem; letter-spacing:.5em; opacity:.8; margin-bottom:1.5rem; }
        .cover-title { font-size:clamp(2.5rem,7vw,4.5rem); font-weight:700; letter-spacing:.15em; line-height:1.3; margin-top:0; margin-bottom:.5rem; text-shadow:0 4px 30px rgba(0,0,0,.3); }
        .cover-sub { font-size:clamp(1rem,3vw,1.4rem); font-weight:300; letter-spacing:.3em; opacity:.85; margin-bottom:2rem; }
        .cover-date { font-family:'Zen Maru Gothic',sans-serif; display:inline-block; border:1px solid rgba(255,255,255,.4); padding:.6rem 2rem; font-size:.95rem; letter-spacing:.2em; border-radius:2px; }
        .cover-members { margin-top:2rem; font-size:.95rem; opacity:.85; letter-spacing:.15em; }
        .cover-back { position:absolute; top:1.5rem; left:1.5rem; z-index:3; color:rgba(255,255,255,.7); text-decoration:none; font-family:'Zen Maru Gothic',sans-serif; font-size:.85rem; letter-spacing:.05em; transition:color .2s; }
        .cover-back:hover { color:white; }
        .cover-back:focus-visible { color:white; outline:2px solid white; outline-offset:2px; border-radius:2px; }
        .nav-bar { position:sticky; top:0; z-index:100; background:rgba(247,243,237,.92); backdrop-filter:blur(12px); border-bottom:1px solid rgba(0,0,0,.08); display:flex; justify-content:safe center; overflow-x:auto; -webkit-overflow-scrolling:touch; }
        .nav-btn { flex:0 0 auto; font-family:'Zen Maru Gothic',sans-serif; border:none; background:none; padding:1rem 1.2rem; font-size:.82rem; cursor:pointer; color:#6a6058; letter-spacing:.05em; white-space:nowrap; transition:all .3s; border-bottom:2px solid transparent; }
        .nav-btn:hover { color:#2C2421; }
        .nav-btn:focus-visible { color:#2C2421; outline:2px solid #2C2421; outline-offset:-2px; border-radius:2px; }
        .nav-btn.active { color:#2C2421; font-weight:700; border-bottom-color:currentColor; }
        .nav-btn-date { font-size:.72rem; color:#6a6058; letter-spacing:0; }
        .nav-btn.active .nav-btn-date { color:currentColor; }
        .nav-btn.cost-btn { color:#8B6914; }
        .nav-btn.cost-btn.active { color:#8B6914; border-bottom-color:#8B6914; }
        .day-section { max-width:720px; margin:0 auto; padding:3rem 1.5rem; animation:fadeIn .5s ease-out; }
        .day-header { display:flex; align-items:center; gap:1rem; margin-bottom:.5rem; }
        .day-number { font-family:'Zen Maru Gothic',sans-serif; font-size:.75rem; font-weight:700; letter-spacing:.15em; padding:.3rem .8rem; border-radius:2px; color:white; }
        .day-date { font-family:'Zen Maru Gothic',sans-serif; font-size:.85rem; color:#756d65; letter-spacing:.1em; }
        .day-title { font-size:clamp(1.4rem,4vw,1.8rem); font-weight:600; letter-spacing:.08em; margin-bottom:2rem; line-height:1.4; margin-top:0; }
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
        .tl-links { display:inline-flex; gap:.35rem; margin-left:.2rem; }
        .tl-links a:hover { opacity:1!important; }
        .booking-card { margin-top:2.5rem; background:white; border-radius:6px; overflow:hidden; box-shadow:0 1px 8px rgba(0,0,0,.06); cursor:pointer; transition:box-shadow .3s; }
        .booking-card:hover { box-shadow:0 2px 16px rgba(0,0,0,.1); }
        .booking-card:focus-visible { outline:2px solid #2C2421; outline-offset:1px; box-shadow:0 2px 16px rgba(0,0,0,.1); }
        .booking-header { display:flex; align-items:center; justify-content:space-between; padding:1rem 1.2rem; font-family:'Zen Maru Gothic',sans-serif; font-weight:700; font-size:.9rem; letter-spacing:.05em; }
        .booking-toggle { font-size:.75rem; color:#756d65; transition:transform .3s; }
        .booking-details { padding:0 1.2rem 1.2rem; display:grid; gap:.6rem; }
        .booking-row { display:flex; font-size:.82rem; line-height:1.5; }
        .booking-row-label { font-family:'Zen Maru Gothic',sans-serif; color:#756d65; min-width:90px; flex-shrink:0; }
        .booking-row-value { font-weight:500; word-break:break-all; }
        .booking-links { display:flex; gap:.5rem; padding:.5rem 1.2rem 1rem; flex-wrap:wrap; }
        .booking-links a { font-family:'Zen Maru Gothic',sans-serif; font-size:.78rem; color:#5a8a6e; text-decoration:none; padding:.3rem .7rem; border:1px solid #d4e8dc; border-radius:3px; transition:all .2s; display:inline-flex; align-items:center; gap:.3rem; }
        .booking-links a:hover { background:#eef6f0; border-color:#5a8a6e; }
        .booking-links a:focus-visible { outline:2px solid #5a8a6e; outline-offset:1px; }
        .tl-links a:focus-visible { outline:2px solid #2C2421; outline-offset:1px; border-radius:2px; }
        .memo-link:focus-visible { outline:2px solid currentColor; outline-offset:1px; border-radius:3px; }
        .dinner-map-link:focus-visible { outline:2px solid #5a8a6e; outline-offset:1px; border-radius:3px; }
        .cost-section { max-width:720px; margin:0 auto; padding:3rem 1.5rem; animation:fadeIn .5s ease-out; }
        .cost-title { font-size:1.6rem; font-weight:600; letter-spacing:.08em; margin-bottom:2rem; text-align:center; margin-top:0; }
        .cost-table { background:white; border-radius:6px; overflow:hidden; box-shadow:0 1px 8px rgba(0,0,0,.06); width:100%; border-collapse:collapse; }
        .cost-row td { padding:1rem 1.4rem; font-size:.9rem; border-bottom:1px solid #f0ece6; }
        .cost-row:last-child td { border-bottom:none; }
        .cost-row-item { font-family:'Zen Maru Gothic',sans-serif; color:#5a5048; }
        .cost-row-note { font-size:.72rem; color:#756d65; margin-left:.3rem; }
        .cost-row-value { font-weight:600; font-variant-numeric:tabular-nums; text-align:right; }
        .cost-total td { padding:1.2rem 1.4rem; background:#2C2421; color:white; }
        .cost-total-label { font-family:'Zen Maru Gothic',sans-serif; font-size:.9rem; letter-spacing:.1em; }
        .cost-total-value { font-size:1.3rem; font-weight:700; font-variant-numeric:tabular-nums; text-align:right; }
        .cost-note { text-align:center; margin-top:1.5rem; font-size:.78rem; color:#756d65; line-height:1.7; }
        @media (max-width:500px) { .cover-date{padding:.6rem 1rem;font-size:.8rem;letter-spacing:.1em;white-space:nowrap} .nav-btn{padding:.8rem .7rem;font-size:.72rem} .nav-btn-date{font-size:.65rem} .day-section{padding:2rem 1rem} .booking-row-label{min-width:75px} }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration:0.01ms!important; transition-duration:0.01ms!important; } }
      `}</style>

      <header className="cover">
        <a href="#/" className="cover-back">← 旅の一覧</a>
        <div className="cover-pattern" aria-hidden="true" />
        <div className="cover-content">
          <div className="cover-label">Travel Booklet</div>
          <h1 className="cover-title">千畳敷カール</h1>
          <div className="cover-sub">中央アルプス駒ヶ岳ロープウェイ</div>
          <div className="cover-date">2026. 10. 11 sun — 10. 12 mon</div>
          <div className="cover-members">大人2名</div>
        </div>
      </header>

      <nav className="nav-bar" aria-label="日程ナビゲーション">
        {DAYS.map((d, i) => (
          <button key={i} className={`nav-btn ${!showCost && activeDay === i ? "active" : ""}`}
            aria-pressed={!showCost && activeDay === i}
            onClick={() => { setActiveDay(i); setShowCost(false); setExpandedBooking(null); }}>
            <span aria-hidden="true">{d.icon}</span> Day{d.day} <span className="nav-btn-date">{formatShortDate(d.date)}</span>
          </button>
        ))}
        <button className={`nav-btn cost-btn ${showCost ? "active" : ""}`} aria-pressed={showCost} onClick={() => { setShowCost(true); setExpandedBooking(null); }}><span aria-hidden="true">💰</span> 費用</button>
      </nav>

      <main>
      <div aria-live="polite" aria-atomic="true" style={{ position:"absolute", width:1, height:1, overflow:"hidden", clipPath:"inset(50%)", whiteSpace:"nowrap" }}>
        {showCost ? "旅費まとめを表示中" : `Day${DAYS[activeDay].day} ${DAYS[activeDay].title}を表示中`}
      </div>
      {showCost ? (
        <div className="cost-section" key="cost">
          <h2 className="cost-title">旅費まとめ</h2>
          <table className="cost-table" aria-label="旅費一覧"><tbody>
            {COSTS.map((c, i) => (
              <tr className="cost-row" key={i}>
                <td className="cost-row-item">{c.item}{c.note && <span className="cost-row-note">（{c.note}）</span>}</td>
                <td className="cost-row-value">¥{c.cost.toLocaleString()}</td>
              </tr>
            ))}
            </tbody><tfoot>
            <tr className="cost-total">
              <td className="cost-total-label">合計（目安）</td>
              <td className="cost-total-value">¥{totalCost.toLocaleString()}</td>
            </tr>
            </tfoot></table>
          <div className="cost-note">※ ロープウェイ＋バス往復（大人2名分）は予約済み。駐車場は1日800円の目安で、夜をまたぐ分は加算される可能性があります。<br />ガソリン・高速料金・温泉・食事代は含まれていません。</div>
        </div>
      ) : (
        <div className="day-section" key={`day-${activeDay}`}>
          {DAYS[activeDay].weather && (
            <WeatherWidget
              key={`weather-${activeDay}`}
              lat={DAYS[activeDay].weather.lat}
              lon={DAYS[activeDay].weather.lon}
              locationName={DAYS[activeDay].weather.name}
              tripDate={DAYS[activeDay].weather.tripDate}
              color={DAYS[activeDay].color}
            />
          )}
          <div className="day-header">
            <span className="day-number" style={{ background: DAYS[activeDay].color }}>DAY {DAYS[activeDay].day}</span>
            <span className="day-date">{DAYS[activeDay].date}</span>
          </div>
          <h2 className="day-title" style={{ color: DAYS[activeDay].color }}>{DAYS[activeDay].title}</h2>

          {activeDay === 0 && (
            <>
              <div style={{ background:"linear-gradient(135deg,#eef2f8,#f1f4f9)", border:"1px solid #c3cfe0", borderRadius:"6px", padding:"1rem 1.2rem", marginBottom:"1rem", fontSize:".82rem", lineHeight:1.7, color:"#2a3d5a" }}>
                <h3 style={{ fontFamily:"'Zen Maru Gothic',sans-serif", fontWeight:700, fontSize:".88rem", marginBottom:".5rem", color:"#3d5a80", display:"flex", alignItems:"center", gap:".5rem", flexWrap:"wrap" }}>
                  <span aria-hidden="true">🌙</span> 車中泊メモ
                <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer" className="memo-link" style={{ fontSize:".75rem", color:"#3d5a80", textDecoration:"none", border:"1px solid #c3cfe0", padding:".15rem .5rem", borderRadius:"3px" }}><span aria-hidden="true">🌐</span> 公式サイト</a>
                </h3>
                <div>
                  <b>駐車場</b>：菅の台バスセンター駐車場（300台・24時間・1日800円）。満車の場合は係員の案内に従い周辺の臨時駐車場へ（場所は公式に載っていないので現地で確認）<br/>
                  <b>防寒</b>：標高850m付近の夜は冷える。寝袋か毛布、窓のサンシェード、耳栓を用意。アイドリングに頼らず寝袋で寒さをしのぐ<br/>
                  <b>寒くて眠れないとき</b>：無理をせず仮眠を優先し、列に並ぶ時間を少し遅らせる。始発にこだわりすぎないほうが日中の体力が持つ
                </div>
              </div>
              <div style={{ background:"linear-gradient(135deg,#fbf1ec,#fcf4ef)", border:"1px solid #e8c9bb", borderRadius:"6px", padding:"1rem 1.2rem", marginBottom:"1rem", fontSize:".82rem", lineHeight:1.7, color:"#5a3a2a" }}>
                <h3 style={{ fontFamily:"'Zen Maru Gothic',sans-serif", fontWeight:700, fontSize:".88rem", marginBottom:".5rem", color:"#9a4a30", display:"flex", alignItems:"center", gap:".5rem", flexWrap:"wrap" }}>
                  <span aria-hidden="true">✅</span> 出発前の確認事項（日曜の昼まで）
                <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer" className="memo-link" style={{ fontSize:".75rem", color:"#9a4a30", textDecoration:"none", border:"1px solid #e8c9bb", padding:".15rem .5rem", borderRadius:"3px" }}><span aria-hidden="true">🌐</span> 公式サイト</a>
                </h3>
                <div>
                  <b>混雑予想</b>：公式トップの混雑予想表で10/12が【大混雑】か確認。大混雑の日は、事前購入のチケットがあっても当日往復の人は上りロープウェイが制限される場合がある。制限が出そうなら、早朝指定きっぷを取る（最も確実）か、別日への変更を検討する<br/>
                  <b>早朝指定きっぷ（KKday）</b>：検討中。10/12も対象で、大人6,500〜8,000円・各便45名。5:00発の専用バスでロープウェイ早朝1〜3便に乗れる。受付4:30、集合は観光バス駐車場（通常のバス停から徒歩1分ほど）。売り切れ・販売締切は未確認。気象や人数不足で中止の場合は前日の正午ごろに連絡<br/>
                  <b>天気予報</b>：前日夜に確認（このページ上部の天気も参照）
                </div>
              </div>
              <div style={{ background:"linear-gradient(135deg,#eef2f8,#f1f4f9)", border:"1px solid #c3cfe0", borderRadius:"6px", padding:"1rem 1.2rem", marginBottom:"2rem", fontSize:".82rem", lineHeight:1.7, color:"#2a3d5a" }}>
                <h3 style={{ fontFamily:"'Zen Maru Gothic',sans-serif", fontWeight:700, fontSize:".88rem", marginBottom:".5rem", color:"#3d5a80", display:"flex", alignItems:"center", gap:".5rem", flexWrap:"wrap" }}>
                  <span aria-hidden="true">🧤</span> 持ち物
                </h3>
                <div>
                  <b>防寒</b>：ダウンかフリース、手袋、帽子、カイロ（千畳敷は日中でも10℃を下回る）<br/>
                  <b>足元</b>：歩きやすい運動靴<br/>
                  <b>車中泊</b>：寝袋か毛布、窓のサンシェード、耳栓<br/>
                  <b>その他</b>：現金（小銭含む）、モバイルバッテリー、飲み物、行動食、レジ袋
                </div>
              </div>
            </>
          )}

          {activeDay === 1 && (
            <>
              <div style={{ background:"linear-gradient(135deg,#fbf1ec,#fcf4ef)", border:"1px solid #e8c9bb", borderRadius:"6px", padding:"1rem 1.2rem", marginBottom:"2rem", fontSize:".82rem", lineHeight:1.7, color:"#5a3a2a" }}>
                <h3 style={{ fontFamily:"'Zen Maru Gothic',sans-serif", fontWeight:700, fontSize:".88rem", marginBottom:".5rem", color:"#9a4a30", display:"flex", alignItems:"center", gap:".5rem", flexWrap:"wrap" }}>
                  <span aria-hidden="true">✅</span> 当日の判断メモ
                <a href={OFFICIAL_URL} target="_blank" rel="noopener noreferrer" className="memo-link" style={{ fontSize:".75rem", color:"#9a4a30", textDecoration:"none", border:"1px solid #e8c9bb", padding:".15rem .5rem", borderRadius:"3px" }}><span aria-hidden="true">🌐</span> 公式サイト</a>
                </h3>
                <div>
                  <b>起床時</b>：ライブカメラ・運行情報・天気を確認。雨・強風・雲が厚いときは、出発を遅らせるか判断する<br/>
                  <b>混雑</b>：上り制限が出ている場合は、待ち時間を見て行動を決める<br/>
                  <b>未確認</b>：始発5:15、ロープウェイの具体的な早朝便の時刻、山上施設の営業時間、温泉と明治亭の営業時間（10/12は祝日）。前日までに公式の時刻表・各サイトで確認する
                </div>
              </div>
            </>
          )}

          {DAYS[activeDay].schedule.some(s => s.coords) && (
            <DayMap
              schedule={DAYS[activeDay].schedule}
              color={DAYS[activeDay].color}
              dinner={DAYS[activeDay].dinner}
            />
          )}

          <ol className="timeline">
            {DAYS[activeDay].schedule.map((item, i) => (
              <li key={i} className={`tl-item ${item.important ? "important" : ""}`}>
                <div className={`tl-dot ${item.important ? "important" : ""}`} aria-hidden="true" style={item.important ? { background: DAYS[activeDay].color } : {}} />
                <div className="tl-time">{item.time}</div>
                <div className="tl-label">
                  <span className="emoji" aria-hidden="true">{item.icon}</span>
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
                <PlacePreview image={item.image} />
              </li>
            ))}
          </ol>

          {DAYS[activeDay].booking && (
            <div className="booking-card" role="button" tabIndex={0}
              aria-expanded={expandedBooking === `day-${activeDay}`}
              onClick={() => setExpandedBooking(expandedBooking === `day-${activeDay}` ? null : `day-${activeDay}`)}
              onKeyDown={e => handleCardKeyDown(e, () => setExpandedBooking(expandedBooking === `day-${activeDay}` ? null : `day-${activeDay}`))}>
              <div className="booking-header" style={{ borderLeft: `3px solid ${DAYS[activeDay].color}` }}>
                <span><span aria-hidden="true">📋</span> {DAYS[activeDay].booking.title}</span>
                <span className="booking-toggle" aria-hidden="true" style={{ transform: expandedBooking === `day-${activeDay}` ? "rotate(180deg)" : "none" }}>▼</span>
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
                  <PlacePreview image={DAYS[activeDay].booking.image} variant="booking" />
                  {(DAYS[activeDay].booking.url || DAYS[activeDay].booking.mapUrl) && (
                    <div className="booking-links">
                      {DAYS[activeDay].booking.url && (<a href={DAYS[activeDay].booking.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}><span aria-hidden="true">🌐</span> 公式サイト</a>)}
                      {DAYS[activeDay].booking.mapUrl && (<a href={DAYS[activeDay].booking.mapUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}><span aria-hidden="true">📍</span> Google Map</a>)}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {DAYS[activeDay].extraBookings?.map((b) => (
            <div key={b.key} className="booking-card" style={{ marginTop: "1.5rem" }} role="button" tabIndex={0}
              aria-expanded={expandedBooking === b.key}
              onClick={() => setExpandedBooking(expandedBooking === b.key ? null : b.key)}
              onKeyDown={e => handleCardKeyDown(e, () => setExpandedBooking(expandedBooking === b.key ? null : b.key))}>
              <div className="booking-header" style={{ borderLeft: `3px solid ${DAYS[activeDay].color}` }}>
                <span><span aria-hidden="true">{b.icon || "📋"}</span> {b.title}</span>
                <span className="booking-toggle" aria-hidden="true" style={{ transform: expandedBooking === b.key ? "rotate(180deg)" : "none" }}>▼</span>
              </div>
              {expandedBooking === b.key && (
                <>
                  <div className="booking-details">
                    {b.details.map((d, i) => (
                      <div className="booking-row" key={i}><span className="booking-row-label">{d.label}</span><span className="booking-row-value">{d.value}</span></div>
                    ))}
                  </div>
                  <PlacePreview image={b.image} variant="booking" />
                  {(b.url || b.mapUrl) && (
                    <div className="booking-links">
                      {b.url && (<a href={b.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}><span aria-hidden="true">🌐</span> 公式サイト</a>)}
                      {b.mapUrl && (<a href={b.mapUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}><span aria-hidden="true">📍</span> Google Map</a>)}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          {DAYS[activeDay].dinner && (
            <div className="booking-card" style={{ marginTop: "1.5rem" }} role="button" tabIndex={0}
              aria-expanded={expandedBooking === "dinner"}
              onClick={() => setExpandedBooking(expandedBooking === "dinner" ? null : "dinner")}
              onKeyDown={e => handleCardKeyDown(e, () => setExpandedBooking(expandedBooking === "dinner" ? null : "dinner"))}>
              <div className="booking-header" style={{ borderLeft: "3px solid #C0554E" }}>
                <span><span aria-hidden="true">🍽</span> {DAYS[activeDay].dinner.title}</span>
                <span className="booking-toggle" aria-hidden="true" style={{ transform: expandedBooking === "dinner" ? "rotate(180deg)" : "none" }}>▼</span>
              </div>
              {expandedBooking === "dinner" && (
                <div style={{ padding: "0 1.2rem 1.2rem" }}>
                  {DAYS[activeDay].dinner.options.map((opt, i) => (
                    <div key={i} style={{ padding: ".8rem 0", borderBottom: i < DAYS[activeDay].dinner.options.length - 1 ? "1px solid #f0ece6" : "none" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:".5rem", marginBottom:".25rem", flexWrap:"wrap" }}>
                        <span style={{ fontFamily:"'Zen Maru Gothic',sans-serif", fontWeight:700, fontSize:".92rem" }}>{opt.name}</span>
                        <span style={{ fontSize:".7rem", background:"#f0ece6", padding:".15rem .5rem", borderRadius:"2px", color:"#6a6058", fontFamily:"'Zen Maru Gothic',sans-serif" }}>{opt.genre}</span>
                        {opt.mapUrl && (
                          <a href={opt.mapUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                            className="dinner-map-link"
                            style={{ fontSize:".72rem", color:"#5a8a6e", textDecoration:"none", border:"1px solid #d4e8dc", padding:".15rem .5rem", borderRadius:"3px", display:"inline-flex", alignItems:"center", gap:".2rem" }}>
                            <span aria-hidden="true">📍</span> Map
                          </a>
                        )}
                      </div>
                      <div style={{ fontSize:".8rem", color:"#6a6058", lineHeight:1.6 }}>{opt.desc}</div>
                      {opt.tel && (<div style={{ fontSize:".75rem", color:"#756d65", marginTop:".2rem", fontFamily:"'Zen Maru Gothic',sans-serif" }}>TEL: {opt.tel}</div>)}
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
