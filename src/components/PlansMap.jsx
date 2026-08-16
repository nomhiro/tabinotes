import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// スポットの種別。色は白抜き文字とのコントラストが AA を満たす値に調整済み
export const KINDS = {
  base: { color: "#7a3b8f", sym: "泊", label: "宿泊拠点" },
  snow: { color: "#2a6f9e", sym: "雪", label: "雪山・氷河" },
  nat: { color: "#0f7565", sym: "自", label: "湖・渓谷・自然" },
  spot: { color: "#b3541e", sym: "見", label: "歴史的建築・見どころ" },
  air: { color: "#3f4b57", sym: "✈", label: "空港" },
};

function FitBounds({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [35, 35], maxZoom: 9 });
    }
  }, [bounds, map]);
  return null;
}

function kindIcon(kind) {
  const k = KINDS[kind] || KINDS.spot;
  return L.divIcon({
    className: "",
    html: `<div style="
      width:26px;height:26px;border-radius:50%;
      background:${k.color};color:#fff;
      display:flex;align-items:center;justify-content:center;
      font-size:12px;font-weight:700;
      font-family:'Zen Maru Gothic',sans-serif;
      box-shadow:0 2px 6px rgba(0,0,0,.3);
      border:2px solid #fff;
    ">${k.sym}</div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -16],
  });
}

/**
 * 複数プランのルートを1枚の地図に重ねて表示する。
 * plans: [{ id, name, color, schedule: [{ label, desc, time, icon, kind, coords }] }]
 *
 * 都市内の見どころ（kind:"spot"）は important 指定がなければ描かない。
 * 3案を重ねると同じ都市にピンが集中し、案ごとの骨格が読めなくなるため。
 */
export default function PlansMap({ plans, label = "プランのルート比較マップ", height = "440px" }) {
  const routes = useMemo(
    () =>
      plans.map((p) => ({
        id: p.id,
        name: p.name,
        color: p.color,
        spots: p.schedule.filter((s) => s.coords && (s.kind !== "spot" || s.important)),
      })),
    [plans]
  );

  const bounds = useMemo(() => {
    const all = routes.flatMap((r) => r.spots.map((s) => s.coords));
    return all.length ? L.latLngBounds(all) : null;
  }, [routes]);

  const usedKinds = useMemo(() => {
    const set = new Set();
    routes.forEach((r) => r.spots.forEach((s) => set.add(s.kind || "spot")));
    return Object.keys(KINDS).filter((k) => set.has(k));
  }, [routes]);

  if (!bounds) return null;

  return (
    <div
      role="region"
      aria-label={label}
      style={{ marginBottom: "2rem", borderRadius: "6px", overflow: "hidden", boxShadow: "0 1px 8px rgba(0,0,0,.06)" }}
    >
      <MapContainer center={routes[0].spots[0].coords} zoom={6} style={{ height, width: "100%" }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds bounds={bounds} />
        {routes.map((r) =>
          r.spots.length >= 2 ? (
            <Polyline key={`line-${r.id}`} positions={r.spots.map((s) => s.coords)} pathOptions={{ color: r.color, weight: 4, opacity: 0.75 }} />
          ) : null
        )}
        {routes.map((r) =>
          r.spots.map((s, i) => (
            <Marker key={`${r.id}-${i}`} position={s.coords} icon={kindIcon(s.kind)}>
              <Popup>
                <div style={{ fontFamily: "'Zen Maru Gothic',sans-serif", fontSize: "13px", lineHeight: 1.5 }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: r.color }}>{r.name}</div>
                  <strong>
                    <span aria-hidden="true">{s.icon}</span> {s.label}
                  </strong>
                  {s.time && <div style={{ fontSize: "11px", color: "#756d65" }}>{s.time}</div>}
                  {s.desc && <div style={{ fontSize: "12px", color: "#6a6058", marginTop: "2px" }}>{s.desc}</div>}
                </div>
              </Popup>
            </Marker>
          ))
        )}
      </MapContainer>

      <div className="map-legend">
        {routes.map((r) => (
          <span className="legend-item" key={`lg-${r.id}`}>
            <span className="legend-line" aria-hidden="true" style={{ background: r.color }} />
            {r.id}案のルート
          </span>
        ))}
        {usedKinds.map((k) => (
          <span className="legend-item" key={`lk-${k}`}>
            <span className="legend-dot" aria-hidden="true" style={{ background: KINDS[k].color }} />
            {KINDS[k].label}
          </span>
        ))}
      </div>
    </div>
  );
}
