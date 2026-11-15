import { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";

const FOCUS_ZOOM = 15;

function FocusView({ points, bounds }) {
  const map = useMap();
  const isFirst = useRef(true);
  useEffect(() => {
    const first = isFirst.current;
    isFirst.current = false;
    const animate = !first && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Wait briefly so fast scrolling settles on one destination instead of chaining pans.
    const timer = setTimeout(() => {
      if (points?.length === 1) {
        map.setView(points[0], FOCUS_ZOOM, { animate });
        return;
      }
      const target = points ? L.latLngBounds(points) : bounds;
      if (target?.isValid()) map.fitBounds(target, { padding: [30, 30], maxZoom: FOCUS_ZOOM, animate });
    }, first ? 0 : 150);
    return () => clearTimeout(timer);
  }, [map, points, bounds]);
  return null;
}

function FitBounds({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [35, 35], maxZoom: 15 });
    }
  }, [bounds, map]);
  return null;
}

function numberedIcon(n, color, active = false) {
  const size = active ? 34 : 26;
  return L.divIcon({
    className: "",
    html: `<div style="
      width:${size}px;height:${size}px;border-radius:50%;
      background:${color};color:#fff;
      display:flex;align-items:center;justify-content:center;
      font-size:${active ? 14 : 12}px;font-weight:700;
      font-family:'Zen Maru Gothic',sans-serif;
      box-shadow:${active ? `0 0 0 4px ${color}55,0 3px 10px rgba(0,0,0,.35)` : "0 2px 6px rgba(0,0,0,.3)"};
      border:${active ? 3 : 2}px solid #fff;
    ">${n}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 3)],
  });
}

function findFocus(schedule, focusIndex) {
  const item = focusIndex == null ? null : schedule[focusIndex];
  if (!item) return null;
  if (item.coords) return { points: [item.coords], scheduleIndex: focusIndex, segment: false };

  // Transit rows have no pin: show the leg from the previous pin to the next one.
  let prev = null;
  for (let i = focusIndex - 1; i >= 0; i--) {
    if (schedule[i].coords) { prev = i; break; }
  }
  const nextOffset = schedule.slice(focusIndex + 1).findIndex((s) => s.coords);
  const next = nextOffset === -1 ? null : focusIndex + 1 + nextOffset;
  const ends = [prev, next].filter((i) => i !== null);
  if (ends.length === 0) return null;
  return {
    points: ends.map((i) => schedule[i].coords),
    scheduleIndex: next ?? prev,
    segment: ends.length === 2,
  };
}

/**
 * focusIndex: omit for the classic whole-route map. Pass a schedule index (or null for the
 * whole route) to follow the itinerary item the reader is currently looking at.
 */
export default function DayMap({
  schedule,
  color,
  dinner,
  label = "本日のルートマップ",
  focusIndex,
  height = "300px",
  style,
}) {
  const followFocus = focusIndex !== undefined;
  const spots = useMemo(() => {
    const items = [];
    let n = 1;
    schedule.forEach((s, scheduleIndex) => {
      if (s.coords) items.push({ ...s, n: n++, scheduleIndex });
    });
    if (dinner?.options) {
      dinner.options.forEach((d) => {
        if (d.coords) items.push({ label: d.name, desc: d.genre, icon: "🍽", coords: d.coords, n: n++ });
      });
    }
    return items;
  }, [schedule, dinner]);

  const bounds = useMemo(() => {
    if (spots.length === 0) return null;
    return L.latLngBounds(spots.map((s) => s.coords));
  }, [spots]);

  const icons = useMemo(() => spots.map((s) => numberedIcon(s.n, color)), [spots, color]);
  const focus = useMemo(() => (followFocus ? findFocus(schedule, focusIndex) : null), [followFocus, schedule, focusIndex]);
  const activeSpot = focus ? spots.find((s) => s.scheduleIndex === focus.scheduleIndex) ?? null : null;
  const activeIcon = useMemo(() => (activeSpot ? numberedIcon(activeSpot.n, color, true) : null), [activeSpot, color]);

  if (spots.length === 0) return null;

  return (
    <div
      role="region"
      aria-label={label}
      style={{
        marginBottom: "2rem",
        borderRadius: "6px",
        overflow: "hidden",
        boxShadow: "0 1px 8px rgba(0,0,0,.06)",
        ...style,
      }}
    >
      <MapContainer
        center={spots[0].coords}
        zoom={12}
        style={{ height, width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {followFocus ? <FocusView points={focus?.points ?? null} bounds={bounds} /> : <FitBounds bounds={bounds} />}
        {spots.map((s, i) => {
          const isActive = s === activeSpot;
          return (
            <Marker
              key={i}
              position={s.coords}
              icon={isActive ? activeIcon : icons[i]}
              zIndexOffset={isActive ? 1000 : 0}
            >
              <Popup>
                <div style={{ fontFamily: "'Zen Maru Gothic',sans-serif", fontSize: "13px", lineHeight: 1.5 }}>
                  <strong><span aria-hidden="true">{s.icon}</span> {s.label}</strong>
                  {s.time && <div style={{ fontSize: "11px", color: "#756d65" }}>{s.time}</div>}
                  {s.desc && <div style={{ fontSize: "12px", color: "#6a6058", marginTop: "2px" }}>{s.desc}</div>}
                </div>
              </Popup>
              {isActive && (
                <Tooltip permanent direction="top" offset={[0, -18]}>
                  <span
                    style={{
                      display: "block",
                      maxWidth: "min(15rem, 55vw)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontFamily: "'Zen Maru Gothic',sans-serif",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#2C2421",
                    }}
                  >
                    {s.n}. {s.label}
                  </span>
                </Tooltip>
              )}
            </Marker>
          );
        })}
        {spots.length >= 2 && (
          <Polyline
            positions={spots.map((s) => s.coords)}
            pathOptions={{ color, weight: 3, opacity: 0.6, dashArray: "8 6" }}
          />
        )}
        {focus?.segment && (
          <Polyline positions={focus.points} pathOptions={{ color, weight: 5, opacity: 0.9 }} />
        )}
      </MapContainer>
    </div>
  );
}
