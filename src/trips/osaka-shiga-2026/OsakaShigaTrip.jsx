import { useState } from "react";
import DayMap from "../../components/DayMap";

const DAYS = [
  {
    day: 1,
    date: "3月21日（土）",
    title: "大阪集合 → 寿司ディナー",
    color: "#4A7FB5",
    icon: "🍣",
    schedule: [
      { time: "夕方", label: "立ち寿司 杉尾 西中島店", desc: "西中島南方駅から徒歩1分。1貫110円〜の本格立ち食い寿司。営業 17:00〜23:00（土曜）", icon: "🍣", important: true, mapUrl: "https://maps.app.goo.gl/ZatLMrg1RoqmF6617", coords: [34.72667, 135.49929] },
      { time: "夜", label: "りの：江坂の父の家へ", desc: "ファーストフィオーレ江坂ネクシス", icon: "🏠", mapUrl: "https://maps.app.goo.gl/9QawGCpdtMXDNPbK9", coords: [34.7562728, 135.5005592] },
      { time: "深夜", label: "ひろき：SARASA HOTEL 新大阪へ", desc: "チェックイン 24:00〜。御堂筋線 新大阪駅7番出口より徒歩3分", icon: "🏨", mapUrl: "https://maps.google.com/?q=SARASA+HOTEL+新大阪", coords: [34.7335, 135.5005] },
    ],
    booking: {
      title: "SARASA HOTEL 新大阪",
      url: "https://hotel.travel.yahoo.co.jp/",
      mapUrl: "https://maps.google.com/?q=SARASA+HOTEL+新大阪",
      details: [
        { label: "予約番号", value: "IN1548587770" },
        { label: "プラン", value: "シンデレラプラン（素泊まり）" },
        { label: "チェックイン", value: "24:00〜29:00" },
        { label: "チェックアウト", value: "10:00" },
        { label: "部屋", value: "禁煙スタンダードシングルルーム 14平米" },
        { label: "住所", value: "大阪市淀川区西中島7-1-17" },
        { label: "TEL", value: "06-6304-9300" },
        { label: "料金", value: "¥9,800" },
      ],
    },
  },
  {
    day: 2,
    date: "3月22日（日）",
    title: "ヘアドネーション → 琵琶湖マリオット",
    color: "#5B8C5A",
    icon: "✂",
    schedule: [
      { time: "10:00", label: "SARASA HOTEL チェックアウト", desc: "ひろき：ホテルを出発", icon: "🚪" },
      { time: "午前", label: "大阪でランチ（未定）", desc: "お店は現地で決定", icon: "🍽" },
      { time: "12:30", label: "エイブル美容室（ヘアドネーション）", desc: "南草津駅東口から徒歩4分。TEL: 077-567-2828", icon: "✂", important: true, mapUrl: "https://maps.google.com/?q=エイブル美容室+南草津", coords: [35.00376, 135.94726] },
      { time: "ヘアドネ後", label: "南草津駅へ徒歩移動", desc: "美容室から徒歩4分で駅へ", icon: "🚶" },
      { time: "〜14:20", label: "南草津駅 → 守山駅", desc: "JR琵琶湖線で約10分・¥200", icon: "🚃", coords: [35.00376, 135.94726] },
      { time: "14:30", label: "守山駅西口 → バスでマリオットへ", desc: "近江鉄道バス 木の浜線 1番乗り場発。約34分・¥520", icon: "🚌", important: true, mapUrl: "https://maps.google.com/?q=守山駅+滋賀", coords: [35.0504, 135.9957] },
      { time: "15:04", label: "琵琶湖マリオットホテル到着", desc: "チェックイン 15:00〜。温泉でゆっくり", icon: "🏨", mapUrl: "https://maps.google.com/?q=琵琶湖マリオットホテル", coords: [35.125023, 135.954697] },
    ],
    booking: {
      title: "琵琶湖マリオットホテル",
      url: "https://www.biwako-marriott.com/",
      mapUrl: "https://maps.google.com/?q=琵琶湖マリオットホテル",
      details: [
        { label: "予約番号", value: "2026021730913387" },
        { label: "プラン", value: "TOYOTAプラン（朝食無料＋レストラン20%OFF）" },
        { label: "チェックイン", value: "15:00" },
        { label: "チェックアウト", value: "11:00" },
        { label: "部屋", value: "デラックスキングルーム（琵琶湖側/禁煙）" },
        { label: "住所", value: "滋賀県守山市今浜町十軒家2876" },
        { label: "TEL", value: "077-585-6300" },
        { label: "料金", value: "¥16,000＋入湯税¥300" },
      ],
    },
  },
  {
    day: 3,
    date: "3月23日（月）",
    title: "チェックアウト → ひろき名古屋へ",
    color: "#8B6BAE",
    icon: "🚄",
    schedule: [
      { time: "朝", label: "ホテルで朝食", desc: "TOYOTAプラン特典の無料朝食", icon: "🍳", coords: [35.125023, 135.954697] },
      { time: "〜9:45", label: "マリオット → 堅田駅", desc: "無料シャトルバスで約15分。時刻はフロントで要確認", icon: "🚌", important: true, coords: [35.125023, 135.954697] },
      { time: "10:08", label: "堅田駅 発（JR湖西線）", desc: "京都行。6駅・約22分。着ホーム6番線", icon: "🚃", coords: [35.1212, 135.9152] },
      { time: "10:30", label: "京都駅 着", desc: "乗換15分。12番線へ移動", icon: "🚶", coords: [34.9856, 135.7584] },
      { time: "10:45", label: "のぞみ10号 発（東京行）", desc: "N700S系。12番線発 → 14番線着。自由席 ¥2,530", icon: "🚄", important: true, coords: [34.9856, 135.7584] },
      { time: "11:19", label: "名古屋駅 着", desc: "おつかれさまでした！運賃合計 ¥5,170（IC優先）", icon: "🏠", coords: [35.1709, 136.8815] },
    ],
    booking: {
      title: "琵琶湖マリオットホテル（チェックアウト）",
      url: "https://www.biwako-marriott.com/",
      mapUrl: "https://maps.google.com/?q=琵琶湖マリオットホテル",
      details: [
        { label: "チェックアウト", value: "11:00まで（ひろきは早朝出発）" },
        { label: "朝食", value: "プラン特典で無料" },
        { label: "シャトルバス", value: "堅田駅行き（フロントで時刻確認）" },
      ],
    },
  },
];

const COSTS = [
  { item: "SARASA HOTEL 新大阪（ひろき1泊）", cost: 9800 },
  { item: "琵琶湖マリオット（1泊2名）", cost: 16300 },
  { item: "JR 南草津→守山", cost: 200 },
  { item: "近江鉄道バス 守山→マリオット", cost: 520 },
  { item: "JR 堅田→京都→名古屋", cost: 5170 },
];

const WebLink = ({ href }) => href ? (<a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", fontSize:"0.82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }} aria-label="公式サイト" onClick={e=>e.stopPropagation()}><span aria-hidden="true">🌐</span></a>) : null;
const MapLink = ({ href }) => href ? (<a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", fontSize:"0.82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }} aria-label="Google Map" onClick={e=>e.stopPropagation()}><span aria-hidden="true">📍</span></a>) : null;
const handleCardKeyDown = (e, callback) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); callback(); } };

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
        .cover { position:relative; min-height:30vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:linear-gradient(175deg,#0d2847 0%,#1a3a5c 30%,#2d5a8a 55%,#6b4c9a 80%,#8b6bae 100%); overflow:hidden; padding:2rem; }
        .cover::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 20% 80%,rgba(107,76,154,.3) 0%,transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(26,58,92,.4) 0%,transparent 50%); }
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
        .nav-bar { position:sticky; top:0; z-index:100; background:rgba(247,243,237,.92); backdrop-filter:blur(12px); border-bottom:1px solid rgba(0,0,0,.08); display:flex; justify-content:center; overflow-x:auto; }
        .nav-btn { font-family:'Zen Maru Gothic',sans-serif; border:none; background:none; padding:1rem 1.2rem; font-size:.82rem; cursor:pointer; color:#6a6058; letter-spacing:.05em; white-space:nowrap; transition:all .3s; border-bottom:2px solid transparent; }
        .nav-btn:hover { color:#2C2421; }
        .nav-btn:focus-visible { color:#2C2421; outline:2px solid #2C2421; outline-offset:-2px; border-radius:2px; }
        .nav-btn.active { color:#2C2421; font-weight:700; border-bottom-color:currentColor; }
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
        .cost-section { max-width:720px; margin:0 auto; padding:3rem 1.5rem; animation:fadeIn .5s ease-out; }
        .cost-title { font-size:1.6rem; font-weight:600; letter-spacing:.08em; margin-bottom:2rem; text-align:center; margin-top:0; }
        .cost-table { background:white; border-radius:6px; overflow:hidden; box-shadow:0 1px 8px rgba(0,0,0,.06); width:100%; border-collapse:collapse; }
        .cost-row td { padding:1rem 1.4rem; font-size:.9rem; border-bottom:1px solid #f0ece6; }
        .cost-row:last-child td { border-bottom:none; }
        .cost-row-item { font-family:'Zen Maru Gothic',sans-serif; color:#5a5048; }
        .cost-row-value { font-weight:600; font-variant-numeric:tabular-nums; text-align:right; }
        .cost-total td { padding:1.2rem 1.4rem; background:#2C2421; color:white; }
        .cost-total-label { font-family:'Zen Maru Gothic',sans-serif; font-size:.9rem; letter-spacing:.1em; }
        .cost-total-value { font-size:1.3rem; font-weight:700; font-variant-numeric:tabular-nums; text-align:right; }
        .cost-note { text-align:center; margin-top:1.5rem; font-size:.78rem; color:#756d65; line-height:1.7; }
        @media (max-width:500px) { .nav-btn{padding:.8rem .7rem;font-size:.72rem} .day-section{padding:2rem 1rem} .booking-row-label{min-width:75px} }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration:0.01ms!important; transition-duration:0.01ms!important; } }
      `}</style>

      <header className="cover">
        <a href="#/" className="cover-back">← 旅の一覧</a>
        <div className="cover-pattern" aria-hidden="true" />
        <div className="cover-content">
          <div className="cover-label">Travel Booklet</div>
          <h1 className="cover-title">大阪・滋賀の旅</h1>
          <div className="cover-sub">新大阪 ・ 南草津 ・ 琵琶湖</div>
          <div className="cover-date">2026. 3. 21 sat — 3. 23 mon</div>
          <div className="cover-members">のむら ひろき ・ りの</div>
        </div>
      </header>

      <nav className="nav-bar" aria-label="日程ナビゲーション">
        {DAYS.map((d, i) => (
          <button key={i} className={`nav-btn ${!showCost && activeDay === i ? "active" : ""}`}
            aria-pressed={!showCost && activeDay === i}
            onClick={() => { setActiveDay(i); setShowCost(false); setExpandedBooking(null); }}>
            <span aria-hidden="true">{d.icon}</span> Day{d.day}
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
                <td className="cost-row-item">{c.item}</td>
                <td className="cost-row-value">¥{c.cost.toLocaleString()}</td>
              </tr>
            ))}
            </tbody><tfoot>
            <tr className="cost-total">
              <td className="cost-total-label">予約済み合計</td>
              <td className="cost-total-value">¥{totalCost.toLocaleString()}</td>
            </tr>
            </tfoot></table>
          <div className="cost-note">※ 上記は予約済みの交通・宿泊費用です。<br />現地での食事・入場料等は含まれていません。<br />琵琶湖マリオットは入湯税 大人150円/人が別途必要です。</div>
        </div>
      ) : (
        <div className="day-section" key={`day-${activeDay}`}>
          <div className="day-header">
            <span className="day-number" style={{ background: DAYS[activeDay].color }}>DAY {DAYS[activeDay].day}</span>
            <span className="day-date">{DAYS[activeDay].date}</span>
          </div>
          <h2 className="day-title" style={{ color: DAYS[activeDay].color }}>{DAYS[activeDay].title}</h2>

          {activeDay === 1 && (
            <div style={{ background:"linear-gradient(135deg,#f0f7f2,#f5f9f0)", border:"1px solid #c8ddc5", borderRadius:"6px", padding:"1rem 1.2rem", marginBottom:"2rem", fontSize:".82rem", lineHeight:1.7, color:"#3a5a40" }}>
              <h3 style={{ fontFamily:"'Zen Maru Gothic',sans-serif", fontWeight:700, fontSize:".88rem", marginBottom:".5rem", color:"#5B8C5A", display:"flex", alignItems:"center", gap:".5rem", flexWrap:"wrap" }}>
                ✂ ヘアドネーション＆移動メモ
              </h3>
              <div>
                <b>ヘアドネーション予約</b>：12:30〜 エイブル美容室（南草津駅東口 徒歩4分）<br/>
                <b>TEL</b>：077-567-2828<br/>
                <b>マリオットへの移動</b>：南草津 →（JR 10分）→ 守山 →（バス 34分）→ マリオット<br/>
                <b>守山駅バス時刻</b>：<b>14:30発 → 15:04着</b>（本数少ないので注意！次は17:20発）<br/>
                <b>バス乗り場</b>：守山駅<b>西口1番</b>乗り場（近江鉄道バス 木の浜線）<br/>
                <b>⚠ 健康保険資格情報</b>：チェックイン時に提示が必要（マイナポータル画面 or 資格確認書）
              </div>
            </div>
          )}

          {activeDay === 2 && (
            <div style={{ background:"linear-gradient(135deg,#f3f0f8,#f6f3fa)", border:"1px solid #cfc5e0", borderRadius:"6px", padding:"1rem 1.2rem", marginBottom:"2rem", fontSize:".82rem", lineHeight:1.7, color:"#3a2a5a" }}>
              <h3 style={{ fontFamily:"'Zen Maru Gothic',sans-serif", fontWeight:700, fontSize:".88rem", marginBottom:".5rem", color:"#8B6BAE", display:"flex", alignItems:"center", gap:".5rem", flexWrap:"wrap" }}>
                🚄 帰りの電車メモ
              </h3>
              <div>
                <b>朝食</b>：TOYOTAプラン特典で無料<br/>
                <b>シャトルバス</b>：マリオット → 堅田駅（約15分・無料）※時刻はフロントで要確認<br/>
                <b>堅田駅 10:08発</b>に間に合うよう、9:45頃までにシャトルに乗る<br/>
                <b>京都駅で乗換</b>：6番線着 → 12番線発（乗換15分）<br/>
                <b>運賃</b>：¥2,640（湖西線）＋ ¥2,530（新幹線自由席）＝ <b>¥5,170</b>（IC優先）
              </div>
            </div>
          )}

          {DAYS[activeDay].schedule.some(s => s.coords) && (
            <DayMap
              schedule={DAYS[activeDay].schedule}
              color={DAYS[activeDay].color}
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
                  {(item.url || item.mapUrl) && (
                    <span className="tl-links">
                      <WebLink href={item.url} />
                      <MapLink href={item.mapUrl} />
                    </span>
                  )}
                </div>
                {item.desc && <div className="tl-desc">{item.desc}</div>}
              </li>
            ))}
          </ol>

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
                {(DAYS[activeDay].booking.url || DAYS[activeDay].booking.mapUrl) && (
                  <div className="booking-links">
                    {DAYS[activeDay].booking.url && (<a href={DAYS[activeDay].booking.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}><span aria-hidden="true">🌐</span> 公式サイト</a>)}
                    {DAYS[activeDay].booking.mapUrl && (<a href={DAYS[activeDay].booking.mapUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}><span aria-hidden="true">📍</span> Google Map</a>)}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
      </main>
    </div>
  );
}
