// DayMap - 日別マップコンポーネント（Leaflet + OpenStreetMap）
// 配置先: src/components/DayMap.jsx
//
// 依存パッケージ: npm install leaflet react-leaflet
// Leaflet CSS: index.html に <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" /> を追加
//
// 使い方:
//   <DayMap schedule={DAYS[activeDay].schedule} color={DAYS[activeDay].color} dinner={DAYS[activeDay].dinner} />

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Day切替時に全ピンが収まるようズーム自動調整
function FitBounds({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [35, 35], maxZoom: 15 });
    }
  }, [bounds, map]);
  return null;
}

// 番号付き丸ピン（DivIconでデフォルトアイコン問題を回避）
function numberedIcon(n, color) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:26px;height:26px;border-radius:50%;
      background:${color};color:#fff;
      display:flex;align-items:center;justify-content:center;
      font-size:12px;font-weight:700;
      font-family:'Zen Maru Gothic',sans-serif;
      box-shadow:0 2px 6px rgba(0,0,0,.3);
      border:2px solid #fff;
    ">${n}</div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -16],
  });
}

export default function DayMap({ schedule, color, dinner }) {
  // coords を持つアイテムだけ抽出し、番号を振る
  const spots = useMemo(() => {
    const items = [];
    let n = 1;
    schedule.forEach((s) => {
      if (s.coords) items.push({ ...s, n: n++ });
    });
    // ディナー候補も地図に表示
    if (dinner?.options) {
      dinner.options.forEach((d) => {
        if (d.coords) items.push({ label: d.name, desc: d.genre, icon: "🍽", coords: d.coords, n: n++ });
      });
    }
    return items;
  }, [schedule, dinner]);

  // 全ピンを含むboundsを計算
  const bounds = useMemo(() => {
    if (spots.length === 0) return null;
    return L.latLngBounds(spots.map((s) => s.coords));
  }, [spots]);

  if (spots.length === 0) return null;

  return (
    <div style={{
      marginBottom: "2rem",
      borderRadius: "6px",
      overflow: "hidden",
      boxShadow: "0 1px 8px rgba(0,0,0,.06)",
    }}>
      <MapContainer
        center={spots[0].coords}
        zoom={12}
        style={{ height: "300px", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds bounds={bounds} />
        {spots.map((s, i) => (
          <Marker key={i} position={s.coords} icon={numberedIcon(s.n, color)}>
            <Popup>
              <div style={{ fontFamily: "'Zen Maru Gothic',sans-serif", fontSize: "13px", lineHeight: 1.5 }}>
                <strong><span aria-hidden="true">{s.icon}</span> {s.label}</strong>
                {s.time && <div style={{ fontSize: "11px", color: "#756d65" }}>{s.time}</div>}
                {s.desc && <div style={{ fontSize: "12px", color: "#6a6058", marginTop: "2px" }}>{s.desc}</div>}
              </div>
            </Popup>
          </Marker>
        ))}
        {/* 2つ以上のピンがあればルート線を描画 */}
        {spots.length >= 2 && (
          <Polyline
            positions={spots.map((s) => s.coords)}
            pathOptions={{ color, weight: 3, opacity: 0.6, dashArray: "8 6" }}
          />
        )}
      </MapContainer>
    </div>
  );
}
