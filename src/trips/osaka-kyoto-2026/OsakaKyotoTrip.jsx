import { useState } from "react";
import DayMap from "../../components/DayMap";
import PlacePreview from "../../components/PlacePreview";
import WeatherWidget from "../../components/WeatherWidget";

const DINNER_MAP_URL = "https://maps.app.goo.gl/HCBsoeE473EuPfH1A";

const DAYS = [
  {
    day: 1,
    date: "9月26日（土）",
    title: "京とれいんで京都へ → 京都水族館 → 大阪で3人ごはん",
    color: "#3F7FA6",
    icon: "🐬",
    weather: { name: "京都", lat: 34.9876, lon: 135.7447, tripDate: "2026-09-26" },
    schedule: [
      { time: "10:32発", label: "京とれいん 雅洛で大阪梅田 → 京都", desc: "阪急京都線の観光列車。予約不要・普通運賃のみで乗れる和モダン車両（土休日のみ運転・ほぼ1時間おき）。9:32発に乗れたらさらに余裕◎。水族館へは「烏丸」で下車が便利", icon: "🚃", important: true, url: "https://www.hankyu.co.jp/kyotrain-garaku/", mapUrl: "https://maps.google.com/?q=阪急大阪梅田駅", coords: [34.7053, 135.4983] },
      { time: "11:15頃", label: "烏丸 下車 → 京都駅 → 梅小路京都西", desc: "地下鉄烏丸線で四条→京都（2駅）、JR嵯峨野線で京都→梅小路京都西（1駅）。京都駅から歩いても約15分", icon: "🚉", mapUrl: "https://maps.google.com/?q=梅小路京都西駅", coords: [34.9875, 135.7422] },
      { time: "12:00頃", label: "京都水族館", desc: "梅小路京都西駅から徒歩約7分。オオサンショウウオ、チンアナゴ、ペンギン、イルカパフォーマンスなど。所要2〜3時間。9:30〜18:00", icon: "🐧", important: true, url: "https://www.kyoto-aquarium.com/", mapUrl: "https://maps.google.com/?q=京都水族館", coords: [34.9876, 135.7447] },
      { time: "15:30頃", label: "京都駅 → 大阪駅（JR新快速）", desc: "梅小路京都西 → 京都（1駅）→ 新快速で大阪まで約30分。夕食の場所に合わせて阪急（河原町・烏丸 → 大阪梅田）で戻ってもOK", icon: "🚆", mapUrl: "https://maps.google.com/?q=JR京都駅", coords: [34.9858, 135.7588] },
      { time: "夜", label: "3人で夜ごはん", desc: "宏樹の姉・理乃さん・私の3人で。お店は📍リンクで確認", icon: "🍽", important: true, mapUrl: DINNER_MAP_URL },
    ],
  },
  {
    day: 2,
    date: "9月27日（日）",
    title: "天王寺動物園でのんびり",
    color: "#5E8C4A",
    icon: "🦒",
    weather: { name: "大阪（天王寺）", lat: 34.6516, lon: 135.5082, tripDate: "2026-09-27" },
    schedule: [
      { time: "午前", label: "天王寺駅へ", desc: "JR・地下鉄「天王寺」／地下鉄「動物園前」から徒歩すぐ。新世界ゲート・てんしばゲートの2か所から入園できる", icon: "🚉", mapUrl: "https://maps.google.com/?q=天王寺駅", coords: [34.6466, 135.5140] },
      { time: "9:30〜", label: "天王寺動物園", desc: "約180種1,000点の動物がいる都会の動物園。ホッキョクグマ・ライオンのいる「アジアの熱帯雨林」「アフリカサバンナ」ゾーンが見どころ。9月の土日祝は18:00まで（入園は1時間前まで）", icon: "🦁", important: true, url: "https://www.tennojizoo.jp/", mapUrl: "https://maps.google.com/?q=天王寺動物園", coords: [34.6516, 135.5082] },
      { time: "午後", label: "解散・帰路", desc: "おつかれさまでした！", icon: "🏠" },
    ],
  },
];

const COSTS = [
  { item: "阪急 大阪梅田 → 烏丸（京とれいん 雅洛）", cost: 410, note: "1人・概算" },
  { item: "地下鉄＋JR 烏丸 → 梅小路京都西", cost: 370, note: "1人・概算" },
  { item: "京都水族館 入場料（大人）", cost: 2600, note: "1人" },
  { item: "JR 梅小路京都西 → 大阪", cost: 740, note: "1人・概算" },
  { item: "天王寺動物園 入園料（大人）", cost: 800, note: "1人" },
];
const WebLink = ({ href }) => href ? (<a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", fontSize:"0.82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }} aria-label="公式サイト" onClick={e=>e.stopPropagation()}><span aria-hidden="true">🌐</span></a>) : null;
const MapLink = ({ href }) => href ? (<a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", fontSize:"0.82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }} aria-label="Google Map" onClick={e=>e.stopPropagation()}><span aria-hidden="true">📍</span></a>) : null;
const PhotoLink = ({ href }) => href ? (<a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", fontSize:"0.82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }} aria-label="予約写真" onClick={e=>e.stopPropagation()}><span aria-hidden="true">📷</span></a>) : null;
const handleCardKeyDown = (e, callback) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); callback(); } };
const formatShortDate = (date) => {
  const m = date.match(/(\d+)月(\d+)日（(.)）/);
  return m ? `${m[1]}/${m[2]}(${m[3]})` : "";
};

export default function OsakaKyotoTrip() {
  const [activeDay, setActiveDay] = useState(0);
  const [showCost, setShowCost] = useState(false);
  const [expandedBooking, setExpandedBooking] = useState(null);
  const totalCost = COSTS.reduce((s, c) => s + c.cost, 0);

  return (
    <div style={{ fontFamily: "'Noto Serif JP', 'Hiragino Mincho ProN', serif", background: "#F7F3ED", minHeight: "100vh", color: "#2C2421" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;600;700&family=Zen+Maru+Gothic:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .cover { position:relative; min-height:30vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:linear-gradient(175deg,#1f3f5c 0%,#2f6a8f 35%,#3f7fa6 58%,#6f9f6a 82%,#a9c98a 100%); overflow:hidden; padding:2rem; }
        .cover::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 20% 80%,rgba(169,201,138,.35) 0%,transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(31,63,92,.45) 0%,transparent 50%); }
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
        @media (max-width:500px) { .nav-btn{padding:.8rem .7rem;font-size:.72rem} .nav-btn-date{font-size:.65rem} .day-section{padding:2rem 1rem} .booking-row-label{min-width:75px} }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration:0.01ms!important; transition-duration:0.01ms!important; } }
      `}</style>

      <header className="cover">
        <a href="#/" className="cover-back">← 旅の一覧</a>
        <div className="cover-pattern" aria-hidden="true" />
        <div className="cover-content">
          <div className="cover-label">Travel Booklet</div>
          <h1 className="cover-title">大阪・京都の旅</h1>
          <div className="cover-sub">京都水族館 ・ 天王寺動物園</div>
          <div className="cover-date">2026. 9. 26 sat — 9. 27 sun</div>
          <div className="cover-members">宏樹の姉 ・ りの ・ わたし</div>
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
        <button className={`nav-btn cost-btn ${showCost ? "active" : ""}`} aria-pressed={showCost} onClick={() => setShowCost(true)}><span aria-hidden="true">💰</span> 費用</button>
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
              <td className="cost-total-label">1人あたり小計（概算）</td>
              <td className="cost-total-value">¥{totalCost.toLocaleString()}</td>
            </tr>
            </tfoot></table>
          <div className="cost-note">※ 交通費はICカード利用時の目安です（1人あたり）。天王寺動物園は2026年7月1日から大人¥800に改定。<br />天王寺までの交通費、昼食・夕食代は含まれていません。</div>
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
            <div style={{ background:"linear-gradient(135deg,#eef4fa,#f0f6fb)", border:"1px solid #c0d4e8", borderRadius:"6px", padding:"1rem 1.2rem", marginBottom:"2rem", fontSize:".82rem", lineHeight:1.7, color:"#2a4a6a" }}>
              <h3 style={{ fontFamily:"'Zen Maru Gothic',sans-serif", fontWeight:700, fontSize:".88rem", marginBottom:".5rem", color:"#2f6a8f", display:"flex", alignItems:"center", gap:".5rem", flexWrap:"wrap" }}>
                <span aria-hidden="true">🚃</span> 京とれいん 雅洛 ＆ 京都水族館メモ
                <a href="https://www.kyoto-aquarium.com/" target="_blank" rel="noopener noreferrer" className="memo-link" style={{ fontSize:".75rem", color:"#2f6a8f", textDecoration:"none", border:"1px solid #c0d4e8", padding:".15rem .5rem", borderRadius:"3px" }}><span aria-hidden="true">🌐</span> 京都水族館</a>
              </h3>
              <div>
                <b>京とれいん 雅洛</b>：阪急 大阪梅田 ⇔ 京都河原町。<b>土休日のみ</b>・予約不要・普通運賃（大阪梅田→烏丸 ¥410）。大阪梅田発は9:32〜の毎時32分頃が目安（当日の時刻は <a href="https://www.hankyu.co.jp/kyotrain-garaku/service/" target="_blank" rel="noopener noreferrer" className="memo-link" style={{ color:"#2f6a8f" }}>運行情報</a> で確認）<br/>
                <b>京都水族館</b>：9:30〜18:00（季節で変動・年中無休）／大人 ¥2,600・高校生 ¥2,000<br/>
                <b>アクセス</b>：JR嵯峨野線「梅小路京都西」徒歩約7分／JR京都駅 徒歩約15分。梅小路公園の中にある<br/>
                <b>TIP</b>：イルカパフォーマンス等の時間は入口・公式サイトで確認して回る順番を決めると◎。チケットは公式Webで事前購入すると入口がスムーズ<br/>
                <b>夜ごはん</b>：宏樹の姉・理乃さん・私の3人。<a href={DINNER_MAP_URL} target="_blank" rel="noopener noreferrer" className="memo-link" style={{ color:"#2f6a8f" }}><span aria-hidden="true">📍</span> お店のMap</a>
              </div>
            </div>
          )}

          {activeDay === 1 && (
            <div style={{ background:"linear-gradient(135deg,#f0f7f2,#f5f9f0)", border:"1px solid #c8ddc5", borderRadius:"6px", padding:"1rem 1.2rem", marginBottom:"2rem", fontSize:".82rem", lineHeight:1.7, color:"#3a5a40" }}>
              <h3 style={{ fontFamily:"'Zen Maru Gothic',sans-serif", fontWeight:700, fontSize:".88rem", marginBottom:".5rem", color:"#3f6f33", display:"flex", alignItems:"center", gap:".5rem", flexWrap:"wrap" }}>
                <span aria-hidden="true">🦒</span> 天王寺動物園メモ
                <a href="https://www.tennojizoo.jp/info/outline/" target="_blank" rel="noopener noreferrer" className="memo-link" style={{ fontSize:".75rem", color:"#3f6f33", textDecoration:"none", border:"1px solid #c8ddc5", padding:".15rem .5rem", borderRadius:"3px" }}><span aria-hidden="true">🌐</span> 公式サイト</a>
              </h3>
              <div>
                <b>開園時間</b>：9:30〜17:00（<b>9月の土日祝は18:00まで</b>）・入園は閉園1時間前まで<br/>
                <b>入園料</b>：大人 ¥800（2026年7月1日改定）<br/>
                <b>休園日</b>：月曜日（祝日の場合は翌日）→ 日曜なので開園<br/>
                <b>アクセス</b>：JR・地下鉄「天王寺」／地下鉄「動物園前」から徒歩すぐ。入口は新世界ゲートとてんしばゲートの2か所
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
