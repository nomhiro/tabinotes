// REFERENCE_COMPONENT.jsx - 旅行しおりコンポーネントの参考実装
// アクセシビリティ対応済み（2026-03-14更新）
// 新しい旅行を作成する際はこのファイルのHTML構造・ARIA属性・CSS設計を踏襲すること

import { useState } from "react";
import DayMap from "../../components/DayMap";

// === データ定数（DAYS, RENTAL_CAR, COSTS）は冒頭に定義 ===
const DAYS = [/* ... */];
const RENTAL_CAR = {/* ... */};
const COSTS = [/* ... */];

// === アクセシブルなリンクコンポーネント ===
// title ではなく aria-label を使用。絵文字は aria-hidden で隠す
const WebLink = ({ href }) => href ? (
  <a href={href} target="_blank" rel="noopener noreferrer"
    style={{ textDecoration:"none", fontSize:"0.82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }}
    aria-label="公式サイト" onClick={e=>e.stopPropagation()}>
    <span aria-hidden="true">🌐</span>
  </a>
) : null;

const MapLink = ({ href }) => href ? (
  <a href={href} target="_blank" rel="noopener noreferrer"
    style={{ textDecoration:"none", fontSize:"0.82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }}
    aria-label="Google Map" onClick={e=>e.stopPropagation()}>
    <span aria-hidden="true">📍</span>
  </a>
) : null;

// === キーボード操作ヘルパー ===
// div[role="button"] の Enter/Space 対応
const handleCardKeyDown = (e, callback) => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); callback(); }
};

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

        /* === カバー === */
        .cover { position:relative; min-height:30vh; display:flex; flex-direction:column; align-items:center; justify-content:center; overflow:hidden; padding:2rem; }
        .cover::before { content:''; position:absolute; inset:0; }
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

        /* === ナビゲーション === */
        .nav-bar { position:sticky; top:0; z-index:100; background:rgba(247,243,237,.92); backdrop-filter:blur(12px); border-bottom:1px solid rgba(0,0,0,.08); display:flex; justify-content:center; overflow-x:auto; }
        .nav-btn { font-family:'Zen Maru Gothic',sans-serif; border:none; background:none; padding:1rem 1.2rem; font-size:.82rem; cursor:pointer; color:#6a6058; letter-spacing:.05em; white-space:nowrap; transition:all .3s; border-bottom:2px solid transparent; }
        .nav-btn:hover { color:#2C2421; }
        .nav-btn:focus-visible { color:#2C2421; outline:2px solid #2C2421; outline-offset:-2px; border-radius:2px; }
        .nav-btn.active { color:#2C2421; font-weight:700; border-bottom-color:currentColor; }
        .nav-btn.cost-btn { color:#8B6914; }
        .nav-btn.cost-btn.active { color:#8B6914; border-bottom-color:#8B6914; }

        /* === 日別セクション === */
        .day-section { max-width:720px; margin:0 auto; padding:3rem 1.5rem; animation:fadeIn .5s ease-out; }
        .day-header { display:flex; align-items:center; gap:1rem; margin-bottom:.5rem; }
        .day-number { font-family:'Zen Maru Gothic',sans-serif; font-size:.75rem; font-weight:700; letter-spacing:.15em; padding:.3rem .8rem; border-radius:2px; color:white; }
        .day-date { font-family:'Zen Maru Gothic',sans-serif; font-size:.85rem; color:#756d65; letter-spacing:.1em; }
        .day-title { font-size:clamp(1.4rem,4vw,1.8rem); font-weight:600; letter-spacing:.08em; margin-bottom:2rem; line-height:1.4; margin-top:0; }

        /* === タイムライン（ol/li） === */
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
        .tl-links a:focus-visible { outline:2px solid #2C2421; outline-offset:1px; border-radius:2px; }
        .memo-link:focus-visible { outline:2px solid currentColor; outline-offset:1px; border-radius:3px; }
        .dinner-map-link:focus-visible { outline:2px solid #5a8a6e; outline-offset:1px; border-radius:3px; }

        /* === 予約カード === */
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

        /* === 費用テーブル（table） === */
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

        /* === レスポンシブ & モーション === */
        @media (max-width:500px) { .nav-btn{padding:.8rem .7rem;font-size:.72rem} .day-section{padding:2rem 1rem} .booking-row-label{min-width:75px} }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration:0.01ms!important; transition-duration:0.01ms!important; } }
      `}</style>

      {/* === カバー: header 要素 === */}
      <header className="cover">
        <a href="#/" className="cover-back">← 旅の一覧</a>
        <div className="cover-pattern" aria-hidden="true" />
        <div className="cover-content">
          <div className="cover-label">Travel Booklet</div>
          <h1 className="cover-title">旅行タイトル</h1>
          <div className="cover-sub">サブタイトル</div>
          <div className="cover-date">2026. X. X — X. X</div>
          <div className="cover-members">メンバー</div>
        </div>
      </header>

      {/* === ナビ: nav 要素 + aria-pressed === */}
      <nav className="nav-bar" aria-label="日程ナビゲーション">
        {DAYS.map((d, i) => (
          <button key={i} className={`nav-btn ${!showCost && activeDay === i ? "active" : ""}`}
            aria-pressed={!showCost && activeDay === i}
            onClick={() => { setActiveDay(i); setShowCost(false); setExpandedBooking(null); }}>
            <span aria-hidden="true">{d.icon}</span> Day{d.day}
          </button>
        ))}
        <button className={`nav-btn cost-btn ${showCost ? "active" : ""}`}
          aria-pressed={showCost} onClick={() => setShowCost(true)}>
          <span aria-hidden="true">💰</span> 費用
        </button>
      </nav>

      {/* === メインコンテンツ: main 要素 === */}
      <main>
      {/* タブ切替を通知する aria-live リージョン */}
      <div aria-live="polite" aria-atomic="true" style={{ position:"absolute", width:1, height:1, overflow:"hidden", clipPath:"inset(50%)", whiteSpace:"nowrap" }}>
        {showCost ? "旅費まとめを表示中" : `Day${DAYS[activeDay].day} ${DAYS[activeDay].title}を表示中`}
      </div>
      {showCost ? (
        <div className="cost-section" key="cost">
          {/* 費用見出し: h2 */}
          <h2 className="cost-title">旅費まとめ</h2>
          {/* 費用: table 要素 */}
          <table className="cost-table" aria-label="旅費一覧"><tbody>
            {COSTS.map((c, i) => (
              <tr className="cost-row" key={i}>
                <td className="cost-row-item">{c.item}</td>
                <td className="cost-row-value">¥{c.cost.toLocaleString()}</td>
              </tr>
            ))}
            </tbody><tfoot>
            <tr className="cost-total">
              <td className="cost-total-label">予約済み合計（2名分）</td>
              <td className="cost-total-value">¥{totalCost.toLocaleString()}</td>
            </tr>
            </tfoot></table>
          <div className="cost-note">※ 注記</div>
        </div>
      ) : (
        <div className="day-section" key={`day-${activeDay}`}>
          <div className="day-header">
            <span className="day-number" style={{ background: DAYS[activeDay].color }}>DAY {DAYS[activeDay].day}</span>
            <span className="day-date">{DAYS[activeDay].date}</span>
          </div>
          {/* 日タイトル: h2 */}
          <h2 className="day-title" style={{ color: DAYS[activeDay].color }}>{DAYS[activeDay].title}</h2>

          {/* 情報メモボックス（該当日のみ表示）
              見出しは <h3> を使う。リンクには className="memo-link" + 絵文字 aria-hidden を付与。例:
              <h3 style={{ fontWeight:700, fontSize:".88rem", ... }}>
                ⛰ メモタイトル
                <a className="memo-link" href="..." ...><span aria-hidden="true">🌐</span> 公式サイト</a>
              </h3>
          */}

          {/* DayMap */}
          {DAYS[activeDay].schedule.some(s => s.coords) && (
            <DayMap schedule={DAYS[activeDay].schedule} color={DAYS[activeDay].color} dinner={DAYS[activeDay].dinner} />
          )}

          {/* タイムライン: ol/li */}
          <ol className="timeline">
            {DAYS[activeDay].schedule.map((item, i) => (
              <li key={i} className={`tl-item ${item.important ? "important" : ""}`}>
                <div className={`tl-dot ${item.important ? "important" : ""}`} aria-hidden="true"
                  style={item.important ? { background: DAYS[activeDay].color } : {}} />
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

          {/* 予約カード: role="button" + tabIndex + onKeyDown + aria-expanded */}
          <div className="booking-card" role="button" tabIndex={0}
            aria-expanded={expandedBooking === `day-${activeDay}`}
            onClick={() => setExpandedBooking(expandedBooking === `day-${activeDay}` ? null : `day-${activeDay}`)}
            onKeyDown={e => handleCardKeyDown(e, () => setExpandedBooking(expandedBooking === `day-${activeDay}` ? null : `day-${activeDay}`))}>
            <div className="booking-header" style={{ borderLeft: `3px solid ${DAYS[activeDay].color}` }}>
              <span><span aria-hidden="true">📋</span> {DAYS[activeDay].booking.title}</span>
              <span className="booking-toggle" aria-hidden="true"
                style={{ transform: expandedBooking === `day-${activeDay}` ? "rotate(180deg)" : "none" }}>▼</span>
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
        </div>
      )}
      </main>
    </div>
  );
}
