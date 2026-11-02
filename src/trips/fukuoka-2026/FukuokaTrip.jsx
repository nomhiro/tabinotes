import { useState } from "react";
import DayMap from "../../components/DayMap";
import PlacePreview from "../../components/PlacePreview";
import WeatherWidget from "../../components/WeatherWidget";

const DAYS = [
  {
    day: 1,
    date: "11月3日（火・祝）",
    title: "名古屋から福岡へ日帰り観光 → 海の中道・友人と濱田屋・櫛田神社・ライトアップ",
    color: "#3b4f8f",
    icon: "🌃",
    weather: { name: "福岡（天神）", lat: 33.5904, lon: 130.3996, tripDate: "2026-11-03" },
    booking: {
      title: "宿泊：西鉄イン天神",
      details: [
        { label: "ホテル名", value: "西鉄イン天神（「西鉄イン福岡」とは別施設）" },
        { label: "住所", value: "福岡市中央区渡辺通4-7-1" },
        { label: "チェックイン", value: "15:00〜（フロント24時間対応）" },
        { label: "荷物", value: "1階の無料セルフクロークを利用可（チェックイン当日）" },
        { label: "到着予定", value: "21時〜22時頃。予約時の到着予定より遅れる場合は事前連絡を" },
      ],
      url: "https://inn-tenjin.nnr-h.com/",
      mapUrl: "https://maps.google.com/?q=西鉄イン天神",
    },
    extraBookings: [
      {
        key: "shinkansen",
        icon: "🚄",
        title: "新幹線：のぞみ101号（名古屋 → 博多）",
        details: [
          { label: "区間", value: "名古屋 6:20発 → 博多 9:39着" },
          { label: "発車番線", value: "名古屋駅 17番線（当日変更に注意）" },
          { label: "乗り換え", value: "JR中央本線 名古屋6:11着 → 6:20発。乗換わずか9分（標準7分）" },
          { label: "事前準備", value: "乗車券・新幹線きっぷは事前に用意。トイレも事前に済ませる" },
        ],
        url: "https://timetable.jr-odekake.net/train-timetable/314391?date=20261103",
      },
    ],
    schedule: [
      { time: "05:10頃", label: "自宅を車で出発", desc: "勝川駅まで約20分（道路状況により変動）", icon: "🚗", important: true },
      { time: "05:30〜05:45頃", label: "勝川駅で駐車・ホームへ", desc: "駐車場から駅までの移動、改札、乗車準備に約15分確保。送迎の場合は短縮可能", icon: "🅿️", mapUrl: "https://maps.google.com/?q=勝川駅", coords: [35.2227, 137.0123] },
      { time: "05:51 → 06:11", label: "勝川 → 名古屋（JR中央本線）", desc: "名古屋行・乗換なし約20分（目安250円）。名古屋駅7番線着の案内。日曜・祝日ダイヤ", icon: "🚃", important: true, url: "https://www.jorudan.co.jp/time/to/%E5%8B%9D%E5%B7%9D_%E5%90%8D%E5%8F%A4%E5%B1%8B/?Ddd=03&Dym=202611&r=%E4%B8%AD%E5%A4%AE%E6%9C%AC%E7%B7%9A%EF%BC%88%E6%9D%B1%E6%B5%B7%EF%BC%89", mapUrl: "https://maps.google.com/?q=名古屋駅", coords: [35.1709, 136.8815] },
      { time: "06:11〜06:20", label: "新幹線ホームへ移動・乗車", desc: "乗換時間は9分のみ（標準7分）。JRの遅延や混雑で間に合わない恐れあり。新幹線乗換口へ直行", icon: "🏃", important: true, url: "https://mb.jorudan.co.jp/os/noritxt/nagoya/chuo_line_jr_tokai-tokaido-san-yo_shinkansen.html" },
      { time: "06:20 → 09:39", label: "名古屋 → 博多（のぞみ101号）", desc: "名古屋駅17番線発（当日変更に注意）。車内でひと休み", icon: "🚄", important: true, url: "https://timetable.jr-odekake.net/train-timetable/314391?date=20261103", mapUrl: "https://maps.google.com/?q=博多駅", coords: [33.5897, 130.4207] },
      { time: "09:39〜10:15", label: "西鉄イン天神で荷物を預ける", desc: "博多駅→地下鉄七隈線で天神南（乗車約4分）→徒歩約5分。1階の無料セルフクロークを利用。チェックインは15:00から", icon: "🧳", url: "https://inn-tenjin.nnr-h.com/", mapUrl: "https://maps.google.com/?q=西鉄イン天神", coords: [33.5800, 130.3995] },
      { time: "10:15〜11:40", label: "海の中道海浜公園へ移動", desc: "ホテル→天神南駅→地下鉄で博多→JR鹿児島本線で香椎→JR香椎線で西戸崎→徒歩約10分で西口。例：博多10:40頃→香椎乗換→西戸崎11:29頃（11/3のJR時刻は要再確認）", icon: "🚆", url: "https://uminaka-park.jp/other/access/", mapUrl: "https://maps.google.com/?q=西戸崎駅", coords: [33.6525, 130.3365] },
      { time: "11:40〜12:25", label: "海の中道海浜公園（短縮）", desc: "西口から花の丘を中心にVlog撮影。13:30の合流に間に合わせるため約45分で切り上げ。11月の開園は9:30〜17:00", icon: "🌼", important: true, url: "https://uminaka-park.jp/guide/open-hour/", mapUrl: "https://maps.google.com/?q=海の中道海浜公園", coords: [33.6600, 130.3560] },
      { time: "12:25〜13:25", label: "博多駅へ戻る", desc: "西口から西戸崎駅まで徒歩約10分→JR香椎線で香椎→JR鹿児島本線で博多（約40分）。列車は事前に時刻確認。遅れそうなら公園を早めに切り上げる", icon: "🚆", important: true, url: "https://uminaka-park.jp/other/access/", mapUrl: "https://maps.google.com/?q=博多駅", coords: [33.5897, 130.4207] },
      { time: "13:30", label: "博多駅で友人と合流", desc: "待ち合わせ場所は要確認", icon: "🤝", important: true, mapUrl: "https://maps.google.com/?q=博多駅", coords: [33.5897, 130.4207] },
      { time: "13:30〜", label: "博多水たき 濱田屋（博多駅）で食事", desc: "博多駅直結「くうてん」10階。営業時間・予約は要確認", icon: "🍲", important: true, url: "https://mizutaki-hamadaya.jp/", mapUrl: "https://maps.google.com/?q=博多水たき 濱田屋 博多駅 くうてん", coords: [33.5897, 130.4207] },
      { time: "〜16:00頃", label: "友人と行動（時間確保）", desc: "16:00頃まで友人と一緒に過ごす。行き先は未定", icon: "👫" },
      { time: "16:00〜16:30", label: "櫛田神社へ移動", desc: "博多駅から地下鉄または徒歩で約15〜20分", icon: "🚇" },
      { time: "16:30〜17:15", label: "櫛田神社", desc: "参拝・飾り山笠。御朱印など社務所の受付は早めに", icon: "⛩", important: true, mapUrl: "https://maps.google.com/?q=櫛田神社", coords: [33.5927, 130.4116] },
      { time: "17:15〜17:30", label: "ライトアップ会場へ徒歩移動", desc: "東長寺方面へ約10〜15分", icon: "🚶" },
      { time: "17:30〜19:00", label: "博多旧市街ライトアップウォーク", desc: "11/3が最終日。東長寺など寺院を鑑賞。有料会場はチケットが必要", icon: "🏮", important: true, url: "https://www.hakata-light.jp/", mapUrl: "https://maps.google.com/?q=東長寺 福岡", coords: [33.5895, 130.4140] },
      { time: "19:00〜20:30", label: "博多・中洲周辺で夕食", desc: "ラーメン、もつ鍋、水炊きなど、好みで選択", icon: "🍜", important: true, mapUrl: "https://maps.google.com/?q=中洲 福岡", coords: [33.5930, 130.4060] },
      { time: "20:30〜21:10頃", label: "西鉄イン天神へ戻り、チェックイン", desc: "櫛田神社前駅→七隈線で天神南（2分）→徒歩約5分。夕食場所により移動時間は変動", icon: "🏨", url: "https://inn-tenjin.nnr-h.com/", mapUrl: "https://maps.google.com/?q=西鉄イン天神", coords: [33.5800, 130.3995] },
      { time: "21:10〜22:00", label: "ホテルで休憩", desc: "予定が押しても22時頃までに戻る余裕あり", icon: "🛌" },
    ],
  },
];

const COSTS = [
  { item: "JR 勝川 → 名古屋", cost: 250, note: "目安" },
];

const WebLink = ({ href }) => href ? (<a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", fontSize:"0.82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }} aria-label="公式サイト" onClick={e=>e.stopPropagation()}><span aria-hidden="true">🌐</span></a>) : null;
const MapLink = ({ href }) => href ? (<a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", fontSize:"0.82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }} aria-label="Google Map" onClick={e=>e.stopPropagation()}><span aria-hidden="true">📍</span></a>) : null;
const PhotoLink = ({ href }) => href ? (<a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", fontSize:"0.82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }} aria-label="予約写真" onClick={e=>e.stopPropagation()}><span aria-hidden="true">📷</span></a>) : null;
const handleCardKeyDown = (e, callback) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); callback(); } };
const formatShortDate = (date) => {
  const m = date.match(/(\d+)月(\d+)日（(.)）/);
  return m ? `${m[1]}/${m[2]}(${m[3]})` : "";
};

export default function FukuokaTrip() {
  const [activeDay, setActiveDay] = useState(0);
  const [showCost, setShowCost] = useState(false);
  const [expandedBooking, setExpandedBooking] = useState(null);
  const totalCost = COSTS.reduce((s, c) => s + c.cost, 0);

  return (
    <div style={{ fontFamily: "'Noto Serif JP', 'Hiragino Mincho ProN', serif", background: "#F7F3ED", minHeight: "100vh", color: "#2C2421" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;600;700&family=Zen+Maru+Gothic:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .cover { position:relative; min-height:30vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:linear-gradient(175deg,#1a2342 0%,#2b3a6e 35%,#3b4f8f 58%,#b5654a 82%,#e0955a 100%); overflow:hidden; padding:2rem; }
        .cover::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 20% 80%,rgba(224,149,90,.35) 0%,transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(26,35,66,.45) 0%,transparent 50%); }
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
          <h1 className="cover-title">福岡の旅</h1>
          <div className="cover-sub">海の中道 ・ 博多 ・ 博多旧市街</div>
          <div className="cover-date">2026. 11. 3 tue</div>
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
              <td className="cost-total-label">判明分の小計（概算）</td>
              <td className="cost-total-value">¥{totalCost.toLocaleString()}</td>
            </tr>
            </tfoot></table>
          <div className="cost-note">※ 勝川→名古屋は日曜・祝日ダイヤの目安です。新幹線・地下鉄・JR・バス・船・入場料・食事代は含まれていません。<br />電車・バスの所要時間と観光時間は目安で、乗換待ち・混雑により前後します。出発前に遅延・運休情報と発車番線を再確認してください。</div>
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

          <div style={{ background:"linear-gradient(135deg,#eef0fa,#f3f0f8)", border:"1px solid #c6cce6", borderRadius:"6px", padding:"1rem 1.2rem", marginBottom:"2rem", fontSize:".82rem", lineHeight:1.7, color:"#2f3a63" }}>
            <h3 style={{ fontFamily:"'Zen Maru Gothic',sans-serif", fontWeight:700, fontSize:".88rem", marginBottom:".5rem", color:"#3b4f8f", display:"flex", alignItems:"center", gap:".5rem", flexWrap:"wrap" }}>
              <span aria-hidden="true">⚠️</span> 朝の乗り換えと当日の確認事項
              <a href="https://inn-tenjin.nnr-h.com/" target="_blank" rel="noopener noreferrer" className="memo-link" style={{ fontSize:".75rem", color:"#3b4f8f", textDecoration:"none", border:"1px solid #c6cce6", padding:".15rem .5rem", borderRadius:"3px" }}><span aria-hidden="true">🌐</span> 西鉄イン天神</a>
            </h3>
            <div>
              <b>朝の確定予定</b>：自宅5:10頃出発 → 勝川5:51発 → 名古屋6:11着 → 新幹線6:20発<br/>
              <b>乗り換え</b>：名古屋駅は9分のみ。遅延・ホーム移動で間に合わない恐れがあるため、きっぷは事前に準備して乗換口へ直行（接続は保証されません）<br/>
              <b>ホテル</b>：「西鉄イン天神」（福岡市中央区渡辺通4-7-1）。「西鉄イン福岡」とは別施設。チェックイン15:00〜、1階に無料セルフクローク<br/>
              <b>福岡のJR</b>：祝日11/3の博多10:40頃の列車は候補。正確な接続は当日確認<br/>
              <b>公園</b>：11月の開園は9:30〜17:00。西戸崎駅から花の丘に便利な西口まで徒歩約10分<br/>
              <b>合流</b>：13:30に博多駅で友人と合流し、濱田屋で食事。16:00頃まで友人と行動。海の中道の帰り（西戸崎→博多約40分）は余裕が少ないため、列車時刻を事前に確認
            </div>
          </div>

          <div style={{ background:"linear-gradient(135deg,#fbf3ec,#fbf0e6)", border:"1px solid #e8cdb8", borderRadius:"6px", padding:"1rem 1.2rem", marginBottom:"2rem", fontSize:".82rem", lineHeight:1.7, color:"#6a4a38" }}>
            <h3 style={{ fontFamily:"'Zen Maru Gothic',sans-serif", fontWeight:700, fontSize:".88rem", marginBottom:".5rem", color:"#a8552f", display:"flex", alignItems:"center", gap:".5rem", flexWrap:"wrap" }}>
              <span aria-hidden="true">🏮</span> 博多旧市街ライトアップウォーク＆撮影メモ
              <a href="https://www.hakata-light.jp/" target="_blank" rel="noopener noreferrer" className="memo-link" style={{ fontSize:".75rem", color:"#a8552f", textDecoration:"none", border:"1px solid #e8cdb8", padding:".15rem .5rem", borderRadius:"3px" }}><span aria-hidden="true">🌐</span> 公式サイト</a>
            </h3>
            <div>
              <b>開催</b>：2026年11月3日が最終日、17:30開始<br/>
              <b>終了時刻</b>：御供所・冷泉エリアは21:00まで（最終入場20:45）、呉服町エリアは21:30まで（最終入場21:15）<br/>
              <b>櫛田神社</b>：賑わい広場は無料会場だが、照明演出そのものはありません。撮影候補は東長寺など<br/>
              <b>チケット</b>：有料会場はチケットが必要<br/>
              <b>Vlog</b>：公園・神社・寺院の撮影規則を事前に確認。三脚や商用・収益化を伴う撮影は許可が必要な場合あり
            </div>
          </div>

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
