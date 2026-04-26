import { useState, useEffect } from "react";

const REFRESH_MS = 10 * 60 * 1000;

const WMO = {
  0: { icon: "☀", label: "快晴" },
  1: { icon: "🌤", label: "概ね晴れ" },
  2: { icon: "⛅", label: "一部曇り" },
  3: { icon: "☁", label: "曇り" },
  45: { icon: "🌫", label: "霧" },
  48: { icon: "🌫", label: "霧氷" },
  51: { icon: "🌦", label: "霧雨（弱）" },
  53: { icon: "🌦", label: "霧雨" },
  55: { icon: "🌦", label: "霧雨（強）" },
  56: { icon: "🌧", label: "着氷性霧雨" },
  57: { icon: "🌧", label: "着氷性霧雨（強）" },
  61: { icon: "🌧", label: "雨（弱）" },
  63: { icon: "🌧", label: "雨" },
  65: { icon: "🌧", label: "雨（強）" },
  66: { icon: "🌧", label: "着氷性雨" },
  67: { icon: "🌧", label: "着氷性雨（強）" },
  71: { icon: "🌨", label: "雪（弱）" },
  73: { icon: "🌨", label: "雪" },
  75: { icon: "🌨", label: "雪（強）" },
  77: { icon: "🌨", label: "霧雪" },
  80: { icon: "🌧", label: "にわか雨（弱）" },
  81: { icon: "🌧", label: "にわか雨" },
  82: { icon: "⛈", label: "にわか雨（強）" },
  85: { icon: "🌨", label: "にわか雪（弱）" },
  86: { icon: "🌨", label: "にわか雪（強）" },
  95: { icon: "⛈", label: "雷雨" },
  96: { icon: "⛈", label: "雷雨（雹）" },
  99: { icon: "⛈", label: "雷雨（雹強）" },
};

function fmtTime(d) {
  if (!d) return "";
  return d.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
}

export default function WeatherWidget({ lat, lon, locationName, color = "#2C2421" }) {
  const [state, setState] = useState({ status: "loading", data: null, error: null, updatedAt: null });

  useEffect(() => {
    if (lat == null || lon == null) {
      setState({ status: "idle", data: null, error: null, updatedAt: null });
      return;
    }
    let cancelled = false;
    const controller = new AbortController();

    async function load() {
      setState((s) => ({ ...s, status: s.data ? "refreshing" : "loading", error: null }));
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature&timezone=Asia%2FTokyo`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`取得失敗 (HTTP ${res.status})`);
        const json = await res.json();
        if (cancelled) return;
        setState({ status: "ok", data: json.current, error: null, updatedAt: new Date() });
      } catch (e) {
        if (cancelled || e.name === "AbortError") return;
        setState((s) => ({ status: "error", data: s.data, error: e.message || "取得に失敗しました", updatedAt: s.updatedAt }));
      }
    }

    load();
    const id = setInterval(load, REFRESH_MS);
    return () => {
      cancelled = true;
      controller.abort();
      clearInterval(id);
    };
  }, [lat, lon]);

  if (lat == null || lon == null) return null;

  const code = state.data?.weather_code;
  const wm = WMO[code] || { icon: "🌡", label: "天気情報" };
  const temp = state.data?.temperature_2m;
  const apparent = state.data?.apparent_temperature;
  const humidity = state.data?.relative_humidity_2m;
  const wind = state.data?.wind_speed_10m;

  return (
    <div className="weather-widget" role="region" aria-label={`${locationName ?? "現在地"}の天気`}>
      <style>{`
        .weather-widget { display:flex; flex-wrap:wrap; align-items:center; gap:.6rem 1rem; background:white; border:1px solid #e8e1d6; border-radius:8px; padding:.7rem 1rem; box-shadow:0 1px 6px rgba(0,0,0,.04); margin-bottom:2rem; font-family:'Zen Maru Gothic',sans-serif; }
        .weather-widget .ww-place { display:flex; align-items:center; gap:.4rem; font-size:.82rem; color:#5a5048; font-weight:700; letter-spacing:.05em; }
        .weather-widget .ww-place-pin { color:#756d65; font-size:.85rem; }
        .weather-widget .ww-divider { width:1px; height:1.4rem; background:#e8e1d6; }
        .weather-widget .ww-main { display:flex; align-items:center; gap:.4rem; }
        .weather-widget .ww-icon { font-size:1.5rem; line-height:1; }
        .weather-widget .ww-temp { font-family:'Noto Serif JP',serif; font-size:1.3rem; font-weight:700; color:#2C2421; font-variant-numeric:tabular-nums; }
        .weather-widget .ww-cond { font-size:.82rem; color:#6a6058; }
        .weather-widget .ww-meta { display:flex; gap:.9rem; font-size:.75rem; color:#756d65; flex-wrap:wrap; }
        .weather-widget .ww-meta b { font-weight:500; color:#5a5048; font-variant-numeric:tabular-nums; }
        .weather-widget .ww-updated { margin-left:auto; font-size:.7rem; color:#756d65; letter-spacing:.05em; }
        .weather-widget .ww-skeleton { color:#756d65; font-size:.82rem; }
        .weather-widget .ww-error { color:#a04040; font-size:.78rem; }
        @media (max-width:500px) {
          .weather-widget { gap:.4rem .8rem; padding:.6rem .8rem; }
          .weather-widget .ww-temp { font-size:1.15rem; }
          .weather-widget .ww-icon { font-size:1.3rem; }
          .weather-widget .ww-updated { margin-left:0; flex-basis:100%; text-align:right; }
          .weather-widget .ww-divider { display:none; }
        }
        @media (prefers-reduced-motion: reduce) { .weather-widget, .weather-widget * { transition-duration:0.01ms!important; animation-duration:0.01ms!important; } }
      `}</style>

      {locationName && (
        <span className="ww-place">
          <span className="ww-place-pin" aria-hidden="true">📍</span>
          {locationName}
        </span>
      )}

      <span className="ww-divider" aria-hidden="true" />

      {state.status === "loading" && !state.data && (
        <span className="ww-skeleton" aria-live="polite">天気を取得中…</span>
      )}

      {state.status === "error" && !state.data && (
        <span className="ww-error" role="alert">天気を取得できませんでした</span>
      )}

      {state.data && (
        <>
          <span className="ww-main">
            <span className="ww-icon" aria-hidden="true">{wm.icon}</span>
            <span className="ww-temp">
              {temp != null ? Math.round(temp) : "—"}
              <span style={{ fontSize: ".9rem", marginLeft: ".05rem" }}>℃</span>
            </span>
            <span className="ww-cond">{wm.label}</span>
          </span>
          <span className="ww-meta">
            {apparent != null && <span>体感 <b>{Math.round(apparent)}℃</b></span>}
            {humidity != null && <span>湿度 <b>{Math.round(humidity)}%</b></span>}
            {wind != null && <span>風 <b>{wind.toFixed(1)} m/s</b></span>}
          </span>
          <span className="ww-updated" aria-live="polite">
            {state.status === "refreshing" ? "更新中…" : `更新 ${fmtTime(state.updatedAt)}`}
          </span>
        </>
      )}
    </div>
  );
}
