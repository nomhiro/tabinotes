import { useState } from "react";
import DayMap from "../../components/DayMap";
import WeatherWidget from "../../components/WeatherWidget";

const DAYS = [
  {
    day: 1,
    date: "7月31日（金）",
    title: "宏樹は大阪出張 → 梅田で前泊",
    color: "#5A7DB3",
    icon: "🏙",
    weather: { name: "大阪", lat: 34.7025, lon: 135.4959, tripDate: "2026-07-31" },
    schedule: [
      { time: "日中", label: "宏樹：大阪で出張", desc: "梅田周辺で業務。理乃はこの日は自宅（翌朝早くに広島へ）", icon: "💼" },
      { time: "15:00〜", label: "ホテルビナリオ梅田 チェックイン", desc: "阪急梅田駅 茶屋町出口から徒歩8分。素泊まりプラン（10時アウト）", icon: "🏨", important: true, mapUrl: "https://maps.google.com/?q=ホテルビナリオ梅田", coords: [34.7078, 135.5008] },
      { time: "夜", label: "梅田で夕食", desc: "茶屋町・梅田エリアで軽めに。翌朝は新大阪から広島へ新幹線移動", icon: "🍶", mapUrl: "https://maps.google.com/?q=梅田+茶屋町" },
    ],
    booking: {
      title: "ホテルビナリオ梅田（宏樹）",
      mapUrl: "https://maps.google.com/?q=ホテルビナリオ梅田",
      details: [
        { label: "予約番号", value: "IN1637290819" },
        { label: "部屋", value: "バリューシングル<禁煙>" },
        { label: "食事", value: "素泊まり（食事なし）" },
        { label: "チェックイン", value: "7/31（金）15:00" },
        { label: "チェックアウト", value: "8/1（土）〜10:00" },
        { label: "アクセス", value: "阪急梅田駅 茶屋町出口 徒歩8分" },
        { label: "TEL", value: "06-6373-1111" },
        { label: "住所", value: "大阪市北区豊崎3-9-1" },
        { label: "料金", value: "¥5,865（オンラインカード決済）" },
      ],
    },
  },
  {
    day: 2,
    date: "8月1日（土）",
    title: "宏樹はAzure勉強会／理乃は宮島 → 夜ホテルで合流",
    color: "#C0554E",
    icon: "🚄",
    weather: { name: "広島", lat: 34.3853, lon: 132.4553, tripDate: "2026-08-01" },
    schedule: [
      { time: "早朝", label: "【理乃】自宅 → 広島（新幹線）", desc: "朝早くに自宅を出発して広島入り", icon: "🚄" },
      { time: "07:00", label: "【宏樹】ホテルビナリオ梅田 チェックアウト", desc: "梅田から新大阪へ", icon: "🏨" },
      { time: "08:00頃", label: "【宏樹】新大阪 → 広島（のぞみ）", desc: "山陽新幹線で約1時間25分", icon: "🚅", important: true },
      { time: "09:00頃", label: "【理乃】広島駅 → 宮島口 → フェリーで宮島へ", desc: "JR山陽本線で宮島口まで約27分＋フェリー約10分", icon: "⛴" },
      { time: "09:25頃", label: "【宏樹】広島駅 到着", desc: "会場のおりづるタワー6F（ドリーム・アーツ広島本社）へ。受付は10:30から", icon: "🚉" },
      { time: "10:30", label: "【宏樹】Azure Travelers 勉強会 広島の旅", desc: "受付10:30／11:00〜18:00。会場はおりづるタワー6F（ドリーム・アーツ広島本社）。パネルディスカッション・LT・Azureクイズ等。理乃が夕日を見るタワーと同じ建物！", icon: "💻", important: true, url: "https://jat.connpass.com/event/382813/", mapUrl: "https://maps.google.com/?q=おりづるタワー", coords: [34.3956, 132.4538] },
      { time: "10:20", label: "【理乃】宮島到着・厳島神社 参拝", desc: "海に浮かぶ朱塗りの大鳥居と社殿。世界遺産をじっくり", icon: "⛩", important: true, mapUrl: "https://maps.google.com/?q=厳島神社", coords: [34.2959, 132.3197] },
      { time: "11:30", label: "【理乃】焼き牡蠣ランチ・食べ歩き", desc: "牡蠣は必食！焼がきのはやし／牡蠣屋 など。もみじ饅頭・あなごめしも◎", icon: "🦪", mapUrl: "https://maps.google.com/?q=宮島+表参道商店街", coords: [34.2977, 132.3213] },
      { time: "〜14:30", label: "【理乃】宮島を出発（早めに！）", desc: "護国神社の御朱印は16:30締切。フェリー＋JRで広島市内へ（下のメモ参照）", icon: "⛴", important: true },
      { time: "16:00", label: "【理乃】広島護国神社 参拝・御朱印", desc: "広島城内に鎮座。授与所は9:00〜16:30。初穂料¥500", icon: "🖌", important: true, url: "https://www.h-gokoku.or.jp/", mapUrl: "https://maps.google.com/?q=広島護国神社", coords: [34.4026, 132.4590] },
      { time: "16:50", label: "【理乃】広島城 散策", desc: "護国神社のすぐ隣。天守や堀を眺めておりづるタワーへ", icon: "🏯", mapUrl: "https://maps.google.com/?q=広島城", coords: [34.4033, 132.4593] },
      { time: "18:00", label: "【理乃】おりづるタワー（夕日）", desc: "屋上「ひろしまの丘」から原爆ドーム越しの夕日。7〜9月は20:00まで（最終入場19:00）／日没は約19:10。大人¥2,200。※宏樹のイベント会場もこのおりづるタワー6F！", icon: "🌇", important: true, url: "https://www.orizurutower.jp/", mapUrl: "https://maps.google.com/?q=おりづるタワー", coords: [34.3954, 132.4536] },
      { time: "18:30", label: "【宏樹】懇親会", desc: "18:30〜20:30。会費¥6,000（会場払い・概算）。会場は当日案内（申込時点で場所未定）", icon: "🍻", url: "https://connpass.com/event/382815/" },
      { time: "19:30", label: "【理乃】紙屋町・本通りで夕食", desc: "平和大通り〜本通り商店街エリアで。宏樹は懇親会のため各自で", icon: "🍽", mapUrl: "https://maps.google.com/?q=広島+本通り商店街", coords: [34.3927, 132.4575] },
      { time: "21:00頃", label: "アパホテル〈広島駅前大橋〉で合流・チェックイン", desc: "JR広島駅南口 徒歩4分。大浴殿でゆっくり", icon: "🏨", important: true, mapUrl: "https://maps.google.com/?q=アパホテル+広島駅前大橋", coords: [34.3958, 132.4757] },
    ],
    booking: {
      title: "アパホテル〈広島駅前大橋〉（2名）",
      mapUrl: "https://maps.google.com/?q=アパホテル+広島駅前大橋",
      details: [
        { label: "予約番号", value: "IN1600764125" },
        { label: "食事", value: "素泊まり（食事なし）・大浴殿完備" },
        { label: "チェックイン", value: "8/1（土）15:00" },
        { label: "チェックアウト", value: "8/2（日）〜10:00" },
        { label: "アクセス", value: "JR広島駅 南口 徒歩4分" },
        { label: "料金", value: "¥16,200（オンラインカード決済）" },
      ],
    },
  },
  {
    day: 3,
    date: "8月2日（日）",
    title: "モーニング → 呉（大和ミュージアム）→ 広島焼き → 帰宅",
    color: "#3F7D8C",
    icon: "⚓",
    weather: { name: "広島", lat: 34.3853, lon: 132.4553, tripDate: "2026-08-02" },
    schedule: [
      { time: "08:00", label: "広島駅周辺でモーニング", desc: "候補：コメダ珈琲店 ヴィアイン広島新幹線口／NICKSTOCK広島駅前（7:00〜）／ルーエぶらじる（モーニング発祥）", icon: "☕", mapUrl: "https://maps.google.com/?q=広島駅+モーニング", coords: [34.3975, 132.4747] },
      { time: "09:30", label: "アパホテル チェックアウト・荷物をロッカーへ", desc: "身軽になって呉へ。広島駅のコインロッカーが便利", icon: "🧳" },
      { time: "10:00", label: "広島駅 → 呉駅（JR呉線）", desc: "快速「安芸路ライナー」で約40分。海沿いを走る呉線", icon: "🚃", important: true },
      { time: "10:45", label: "呉駅 到着", desc: "大和ミュージアム・鉄のくじら館ともに駅から徒歩約5分", icon: "🚉", coords: [34.2426, 132.5551] },
      { time: "11:00", label: "大和ミュージアム 見学", desc: "戦艦「大和」の1/10巨大模型と造船・科学技術の展示。2026年4月にリニューアル。9:00〜18:00（入館17:30まで）", icon: "🚢", important: true, url: "https://yamato-museum.com/", mapUrl: "https://maps.google.com/?q=大和ミュージアム", coords: [34.2410, 132.5556] },
      { time: "12:30", label: "呉海自カレーで昼食", desc: "海上自衛隊の艦艇レシピを再現した名物カレー。候補は下のカード参照", icon: "🍛", mapUrl: "https://maps.google.com/?q=呉+海自カレー", coords: [34.2422, 132.5553] },
      { time: "14:00", label: "鉄のくじら館（海上自衛隊呉史料館）", desc: "実物の潜水艦「あきしお」を陸上展示、内部も見学可。入館無料・所要40〜60分。10:00〜18:00（入館17:30まで）", icon: "🐋", important: true, url: "https://www.jmsdf-kure-museum.go.jp/", mapUrl: "https://maps.google.com/?q=鉄のくじら館", coords: [34.2413, 132.5566] },
      { time: "15:30", label: "呉駅 → 広島駅（JR呉線）", desc: "約40分で広島へ戻る", icon: "🚃" },
      { time: "16:30", label: "広島駅 到着・荷物ピックアップ", desc: "ロッカーの荷物を回収", icon: "🚉", coords: [34.3975, 132.4747] },
      { time: "17:00", label: "広島焼き（お好み焼き）で夕食", desc: "広島駅から歩ける店をいくつか候補に（下のカード参照）", icon: "🥞", coords: [34.3970, 132.4755] },
      { time: "18:30頃", label: "広島駅 → 自宅（新幹線）", desc: "お土産を買って帰路へ。おつかれさまでした！", icon: "🚄", important: true },
    ],
    dinner: {
      title: "広島焼き（お好み焼き）候補 ※広島駅から徒歩圏",
      options: [
        { name: "電光石火 駅前ひろば店", genre: "お好み焼き", desc: "ふわとろ卵が名物。ミシュラン「ビブグルマン」掲載。広島駅すぐの駅前ひろば（お好み共和国ひろしま村）内", mapUrl: "https://maps.google.com/?q=電光石火+駅前ひろば店", coords: [34.3970, 132.4753] },
        { name: "お好み焼みっちゃん総本店 ekie店", genre: "お好み焼き", desc: "広島風お好み焼きの元祖といわれる老舗。広島駅ビルekie内でアクセス抜群", mapUrl: "https://maps.google.com/?q=みっちゃん総本店+ekie", coords: [34.3976, 132.4762] },
        { name: "麗ちゃん", genre: "お好み焼き", desc: "広島駅ビルASSE内・駅徒歩1分の老舗。地元でも定番の一軒", mapUrl: "https://maps.google.com/?q=麗ちゃん+広島駅", coords: [34.3972, 132.4758] },
      ],
    },
  },
];

const COSTS = [
  { item: "ホテルビナリオ梅田（7/31・宏樹）", cost: 5865 },
  { item: "アパホテル〈広島駅前大橋〉（8/1・2名）", cost: 16200 },
  { item: "新幹線 新大阪⇔広島（宏樹・往復 ※概算）", cost: 21000 },
  { item: "おりづるタワー 入場（8/1・理乃）", cost: 2200 },
  { item: "懇親会 会費（8/1・宏樹 ※概算）", cost: 6000 },
  { item: "広島護国神社 御朱印 初穂料", cost: 500 },
];

const WebLink = ({ href }) => href ? (<a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", fontSize:"0.82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }} aria-label="公式サイト" onClick={e=>e.stopPropagation()}><span aria-hidden="true">🌐</span></a>) : null;
const MapLink = ({ href }) => href ? (<a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", fontSize:"0.82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }} aria-label="Google Map" onClick={e=>e.stopPropagation()}><span aria-hidden="true">📍</span></a>) : null;
const PhotoLink = ({ href }) => href ? (<a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", fontSize:"0.82rem", opacity:0.7, transition:"opacity 0.2s", cursor:"pointer", flexShrink:0 }} aria-label="予約写真" onClick={e=>e.stopPropagation()}><span aria-hidden="true">📷</span></a>) : null;
const handleCardKeyDown = (e, callback) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); callback(); } };

export default function HiroshimaTrip() {
  const [activeDay, setActiveDay] = useState(0);
  const [showCost, setShowCost] = useState(false);
  const [expandedBooking, setExpandedBooking] = useState(null);
  const totalCost = COSTS.reduce((s, c) => s + c.cost, 0);

  return (
    <div style={{ fontFamily: "'Noto Serif JP', 'Hiragino Mincho ProN', serif", background: "#F7F3ED", minHeight: "100vh", color: "#2C2421" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;600;700&family=Zen+Maru+Gothic:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .cover { position:relative; min-height:30vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:linear-gradient(175deg,#7a2e2e 0%,#b34a4a 35%,#c85a3a 58%,#e0955a 82%,#efc07a 100%); overflow:hidden; padding:2rem; }
        .cover::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 20% 80%,rgba(224,149,90,.35) 0%,transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(122,46,46,.45) 0%,transparent 50%); }
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
        .dinner-map-link:focus-visible { outline:2px solid #5a8a6e; outline-offset:1px; border-radius:3px; }
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
          <h1 className="cover-title">広島の旅</h1>
          <div className="cover-sub">宮島 ・ 呉 ・ 広島</div>
          <div className="cover-date">2026. 7. 31 fri — 8. 2 sun</div>
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
              <td className="cost-total-label">小計（予約済み＋概算）</td>
              <td className="cost-total-value">¥{totalCost.toLocaleString()}</td>
            </tr>
            </tfoot></table>
          <div className="cost-note">※ ホテル2件は予約済み金額です。新幹線代（宏樹）は目安の概算です。<br />理乃さんの自宅⇔広島の新幹線代（区間未確定）、大和ミュージアムの入館料、呉線・市電・宮島フェリー等の運賃、各食事代は含まれていません。<br />鉄のくじら館（海上自衛隊呉史料館）は入館無料です。</div>
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

          {activeDay === 1 && (
            <div style={{ background:"linear-gradient(135deg,#f0f7f2,#f5f9f0)", border:"1px solid #c8ddc5", borderRadius:"6px", padding:"1rem 1.2rem", marginBottom:"2rem", fontSize:".82rem", lineHeight:1.7, color:"#3a5a40" }}>
              <h3 style={{ fontFamily:"'Zen Maru Gothic',sans-serif", fontWeight:700, fontSize:".88rem", marginBottom:".5rem", color:"#2f7d5a", display:"flex", alignItems:"center", gap:".5rem", flexWrap:"wrap" }}>
                <span aria-hidden="true">⛩</span> 宮島の回り方メモ（理乃）
                <a href="https://www.miyajima.or.jp/" target="_blank" rel="noopener noreferrer" className="memo-link" style={{ fontSize:".75rem", color:"#5a8a6e", textDecoration:"none", border:"1px solid #d4e8dc", padding:".15rem .5rem", borderRadius:"3px" }}><span aria-hidden="true">🌐</span> 宮島観光協会</a>
              </h3>
              <div>
                <b>行き方</b>：広島駅 →（JR山陽本線 約27分）→ 宮島口 →（フェリー約10分）→ 宮島<br/>
                <b>フェリー</b>：JR宮島フェリー／宮島松大汽船の2社。どちらもICカード可<br/>
                <b>牡蠣</b>：焼がきのはやし（焼がき発祥）／牡蠣屋 が名店。もみじ饅頭・あなごめしの食べ歩きも◎<br/>
                <b>大鳥居</b>：干潮時は歩いて近くまで、満潮時は海に浮かぶ姿に。当日の潮汐は観光協会サイトで確認<br/>
                <b>⚠ 御朱印の時間に注意</b>：<span style={{color:"#c0554e"}}>広島護国神社の御朱印は16:30まで</span>。宮島→護国神社は約1時間15分かかるので、<b>遅くとも14:30には宮島を出発</b>すると安心
              </div>
            </div>
          )}

          {activeDay === 1 && (
            <div style={{ background:"linear-gradient(135deg,#eef4fa,#f0f6fb)", border:"1px solid #c0d4e8", borderRadius:"6px", padding:"1rem 1.2rem", marginBottom:"2rem", fontSize:".82rem", lineHeight:1.7, color:"#2a4a6a" }}>
              <h3 style={{ fontFamily:"'Zen Maru Gothic',sans-serif", fontWeight:700, fontSize:".88rem", marginBottom:".5rem", color:"#3060a0", display:"flex", alignItems:"center", gap:".5rem", flexWrap:"wrap" }}>
                <span aria-hidden="true">💻</span> Azure Travelers 勉強会メモ（宏樹）
                <a href="https://jat.connpass.com/event/382813/" target="_blank" rel="noopener noreferrer" className="memo-link" style={{ fontSize:".75rem", color:"#3060a0", textDecoration:"none", border:"1px solid #c0d4e8", padding:".15rem .5rem", borderRadius:"3px" }}><span aria-hidden="true">🌐</span> イベント</a>
              </h3>
              <div>
                <b>イベント</b>：第10回 Azure Travelers 勉強会 広島の旅（#AzureTravelers）<br/>
                <b>日時</b>：8/1（土）受付10:30 ／ 11:00〜18:00<br/>
                <b>会場</b>：ドリーム・アーツ広島本社（<b>おりづるタワー6F</b>・広島市中区大手町1-2-1）→ <span style={{color:"#c0554e"}}>理乃が夕日を見るタワーと同じ建物！</span><br/>
                <b>内容</b>：パネルディスカッション、LT（5分）、Azureクイズ等。お土産を持ち寄る文化あり<br/>
                <b>懇親会</b>：18:30〜20:30／会費¥6,000（会場払い・概算）→ <a href="https://connpass.com/event/382815/" target="_blank" rel="noopener noreferrer" className="memo-link" style={{ color:"#3060a0" }}>懇親会ページ</a>（会場は当日案内）<br/>
                <b>合流</b>：夜、アパホテル〈広島駅前大橋〉で理乃と合流
              </div>
            </div>
          )}

          {activeDay === 2 && (
            <div style={{ background:"linear-gradient(135deg,#eef4f6,#f0f6f8)", border:"1px solid #bcd6dd", borderRadius:"6px", padding:"1rem 1.2rem", marginBottom:"2rem", fontSize:".82rem", lineHeight:1.7, color:"#2a4a52" }}>
              <h3 style={{ fontFamily:"'Zen Maru Gothic',sans-serif", fontWeight:700, fontSize:".88rem", marginBottom:".5rem", color:"#2f6f80", display:"flex", alignItems:"center", gap:".5rem", flexWrap:"wrap" }}>
                <span aria-hidden="true">🚢</span> 呉の見学メモ
                <a href="https://yamato-museum.com/" target="_blank" rel="noopener noreferrer" className="memo-link" style={{ fontSize:".75rem", color:"#2f6f80", textDecoration:"none", border:"1px solid #bcd6dd", padding:".15rem .5rem", borderRadius:"3px" }}><span aria-hidden="true">🌐</span> 大和ミュージアム</a>
              </h3>
              <div>
                <b>行き方</b>：広島駅 →（JR呉線 快速「安芸路ライナー」約40分）→ 呉駅。両施設とも呉駅から徒歩約5分<br/>
                <b>大和ミュージアム</b>：9:00〜18:00（入館17:30まで）。2026年4月にリニューアル、戦艦「大和」1/10模型は必見<br/>
                <b>鉄のくじら館</b>：10:00〜18:00（入館17:30まで）・<b>入館無料</b>・所要40〜60分。実物の潜水艦「あきしお」を陸上展示、内部も見学可<br/>
                <b>TIP</b>：大和ミュージアム → 海自カレー昼食 → 鉄のくじら館 の順が動線◎（2施設は隣接）
              </div>
            </div>
          )}

          {activeDay === 2 && (
            <div style={{ background:"linear-gradient(135deg,#fdf6ec,#fbf0e0)", border:"1px solid #e6d3b3", borderRadius:"6px", padding:"1rem 1.2rem", marginBottom:"2rem", fontSize:".82rem", lineHeight:1.7, color:"#5a4a30" }}>
              <h3 style={{ fontFamily:"'Zen Maru Gothic',sans-serif", fontWeight:700, fontSize:".88rem", marginBottom:".5rem", color:"#a8741f", display:"flex", alignItems:"center", gap:".5rem", flexWrap:"wrap" }}>
                <span aria-hidden="true">🍛</span> 呉海自カレーメモ
              </h3>
              <div>
                呉基地の艦艇レシピを再現した名物カレー。艦ごとに味が違い、食べ比べも楽しい。<br/>
                <b>呉ハイカラ食堂</b>：呉駅徒歩3分。潜水艦「そうりゅう」テッパンカレー等。火曜定休<br/>
                <b>呉阪急ホテル イルマーレ</b>：呉駅徒歩1分。護衛艦「うみぎり」の味を再現<br/>
                <b>うどん屋りゅう</b>：呉駅すぐ。潜水艦「けんりゅう」カレー、呉冷麺も<br/>
                <b>TIP</b>：日曜も営業の店が多いが、開店時間・定休日は事前確認を
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
