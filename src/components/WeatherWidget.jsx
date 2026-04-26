import { useState, useEffect, useMemo } from "react";

const REFRESH_MS = 10 * 60 * 1000;
const FORECAST_RANGE_DAYS = 16;

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

function todayInJST() {
  const now = new Date();
  const jst = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
  const y = jst.getFullYear();
  const m = String(jst.getMonth() + 1).padStart(2, "0");
  const d = String(jst.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function diffDays(fromIso, toIso) {
  const a = new Date(`${fromIso}T00:00:00+09:00`);
  const b = new Date(`${toIso}T00:00:00+09:00`);
  return Math.round((b - a) / (24 * 60 * 60 * 1000));
}

function fmtTripDate(iso) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00+09:00`);
  const wd = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
  return `${d.getMonth() + 1}/${d.getDate()}（${wd}）`;
}

export default function WeatherWidget({ lat, lon, locationName, tripDate, color = "#2C2421" }) {
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
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&forecast_days=${FORECAST_RANGE_DAYS}`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`取得失敗 (HTTP ${res.status})`);
        const json = await res.json();
        if (cancelled) return;
        setState({ status: "ok", data: { current: json.current, daily: json.daily }, error: null, updatedAt: new Date() });
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

  const forecast = useMemo(() => {
    if (!tripDate) return null;
    const today = todayInJST();
    const delta = diffDays(today, tripDate);
    if (delta < 0) return { kind: "past", delta };
    if (delta >= FORECAST_RANGE_DAYS) return { kind: "outOfRange", delta };
    const daily = state.data?.daily;
    if (!daily?.time) return { kind: "loading", delta };
    const idx = daily.time.indexOf(tripDate);
    if (idx === -1) return { kind: "loading", delta };
    return {
      kind: "ok",
      delta,
      code: daily.weather_code?.[idx],
      tmax: daily.temperature_2m_max?.[idx],
      tmin: daily.temperature_2m_min?.[idx],
      pop: daily.precipitation_probability_max?.[idx],
    };
  }, [state.data, tripDate]);

  if (lat == null || lon == null) return null;

  const code = state.data?.current?.weather_code;
  const wm = WMO[code] || { icon: "🌡", label: "天気情報" };
  const temp = state.data?.current?.temperature_2m;
  const apparent = state.data?.current?.apparent_temperature;
  const humidity = state.data?.current?.relative_humidity_2m;
  const wind = state.data?.current?.wind_speed_10m;

  const fwm = forecast?.kind === "ok" ? (WMO[forecast.code] || { icon: "🌡", label: "—" }) : null;
  const isToday = forecast?.delta === 0;
  const tripDateLabel = fmtTripDate(tripDate);

  return (
    <div className="weather-widget" role="region" aria-label={`${locationName ?? "現在地"}の天気`}>
      <style>{`
        .weather-widget { display:flex; flex-direction:column; gap:.5rem; background:white; border:1px solid #e8e1d6; border-radius:8px; padding:.7rem 1rem; box-shadow:0 1px 6px rgba(0,0,0,.04); margin-bottom:2rem; font-family:'Zen Maru Gothic',sans-serif; }
        .weather-widget .ww-head { display:flex; flex-wrap:wrap; align-items:center; gap:.4rem .9rem; }
        .weather-widget .ww-place { display:flex; align-items:center; gap:.4rem; font-size:.82rem; color:#5a5048; font-weight:700; letter-spacing:.05em; }
        .weather-widget .ww-place-pin { color:#756d65; font-size:.85rem; }
        .weather-widget .ww-updated { margin-left:auto; font-size:.7rem; color:#756d65; letter-spacing:.05em; }
        .weather-widget .ww-row { display:flex; flex-wrap:wrap; align-items:center; gap:.4rem .9rem; padding:.35rem 0; border-top:1px dashed #ece5d8; }
        .weather-widget .ww-row:first-of-type { border-top:none; padding-top:0; }
        .weather-widget .ww-row-label { display:inline-flex; align-items:center; gap:.3rem; font-size:.72rem; color:#5a5048; font-weight:700; letter-spacing:.06em; min-width:5.4rem; }
        .weather-widget .ww-row-label-trip { color:#5a5048; }
        .weather-widget .ww-row-label-today { color:#3a6a8a; }
        .weather-widget .ww-trip-date { font-size:.78rem; color:#6a6058; font-variant-numeric:tabular-nums; }
        .weather-widget .ww-main { display:flex; align-items:center; gap:.4rem; }
        .weather-widget .ww-icon { font-size:1.4rem; line-height:1; }
        .weather-widget .ww-temp { font-family:'Noto Serif JP',serif; font-size:1.2rem; font-weight:700; color:#2C2421; font-variant-numeric:tabular-nums; }
        .weather-widget .ww-temp-range { font-family:'Noto Serif JP',serif; font-size:1rem; font-weight:700; color:#2C2421; font-variant-numeric:tabular-nums; }
        .weather-widget .ww-temp-range .ww-tmax { color:#c44a3a; }
        .weather-widget .ww-temp-range .ww-tsep { color:#a89888; margin:0 .15rem; }
        .weather-widget .ww-temp-range .ww-tmin { color:#3a6a8a; }
        .weather-widget .ww-cond { font-size:.8rem; color:#6a6058; }
        .weather-widget .ww-meta { display:flex; gap:.85rem; font-size:.74rem; color:#756d65; flex-wrap:wrap; }
        .weather-widget .ww-meta b { font-weight:500; color:#5a5048; font-variant-numeric:tabular-nums; }
        .weather-widget .ww-skeleton { color:#756d65; font-size:.8rem; }
        .weather-widget .ww-error { color:#a04040; font-size:.78rem; }
        .weather-widget .ww-note { font-size:.74rem; color:#756d65; }
        @media (max-width:500px) {
          .weather-widget { gap:.35rem; padding:.6rem .8rem; }
          .weather-widget .ww-temp { font-size:1.1rem; }
          .weather-widget .ww-temp-range { font-size:.95rem; }
          .weather-widget .ww-icon { font-size:1.25rem; }
          .weather-widget .ww-updated { margin-left:0; flex-basis:100%; text-align:right; }
          .weather-widget .ww-row-label { min-width:0; }
        }
        @media (prefers-reduced-motion: reduce) { .weather-widget, .weather-widget * { transition-duration:0.01ms!important; animation-duration:0.01ms!important; } }
      `}</style>

      <div className="ww-head">
        {locationName && (
          <span className="ww-place">
            <span className="ww-place-pin" aria-hidden="true">📍</span>
            {locationName}
          </span>
        )}
        <span className="ww-updated" aria-live="polite">
          {state.status === "loading" && !state.data ? "取得中…" : state.status === "refreshing" ? "更新中…" : state.updatedAt ? `更新 ${fmtTime(state.updatedAt)}` : ""}
        </span>
      </div>

      <div className="ww-row">
        <span className="ww-row-label ww-row-label-today" aria-label="現在の天気">
          <span aria-hidden="true">🕒</span> 現在
        </span>
        {state.status === "loading" && !state.data && (
          <span className="ww-skeleton" aria-live="polite">天気を取得中…</span>
        )}
        {state.status === "error" && !state.data && (
          <span className="ww-error" role="alert">天気を取得できませんでした</span>
        )}
        {state.data?.current && (
          <>
            <span className="ww-main">
              <span className="ww-icon" aria-hidden="true">{wm.icon}</span>
              <span className="ww-temp">
                {temp != null ? Math.round(temp) : "—"}
                <span style={{ fontSize: ".85rem", marginLeft: ".05rem" }}>℃</span>
              </span>
              <span className="ww-cond">{wm.label}</span>
            </span>
            <span className="ww-meta">
              {apparent != null && <span>体感 <b>{Math.round(apparent)}℃</b></span>}
              {humidity != null && <span>湿度 <b>{Math.round(humidity)}%</b></span>}
              {wind != null && <span>風 <b>{wind.toFixed(1)} m/s</b></span>}
            </span>
          </>
        )}
      </div>

      {tripDate && (
        <div className="ww-row">
          <span className="ww-row-label ww-row-label-trip" aria-label="旅行日の天気予報">
            <span aria-hidden="true">📅</span> {isToday ? "本日" : "旅行日"}
          </span>
          <span className="ww-trip-date">{tripDateLabel}</span>
          {forecast?.kind === "ok" && fwm && (
            <>
              <span className="ww-main">
                <span className="ww-icon" aria-hidden="true">{fwm.icon}</span>
                <span className="ww-temp-range">
                  <span className="ww-tmax">{forecast.tmax != null ? Math.round(forecast.tmax) : "—"}°</span>
                  <span className="ww-tsep" aria-hidden="true">/</span>
                  <span className="ww-tmin">{forecast.tmin != null ? Math.round(forecast.tmin) : "—"}°</span>
                </span>
                <span className="ww-cond">{fwm.label}</span>
              </span>
              {forecast.pop != null && (
                <span className="ww-meta"><span>降水確率 <b>{Math.round(forecast.pop)}%</b></span></span>
              )}
            </>
          )}
          {forecast?.kind === "loading" && state.status !== "error" && (
            <span className="ww-skeleton" aria-live="polite">予報を取得中…</span>
          )}
          {forecast?.kind === "loading" && state.status === "error" && (
            <span className="ww-error" role="alert">予報を取得できませんでした</span>
          )}
          {forecast?.kind === "outOfRange" && (
            <span className="ww-note">あと {forecast.delta} 日（予報範囲外・取得は出発16日前から）</span>
          )}
          {forecast?.kind === "past" && (
            <span className="ww-note">旅行日は過ぎました</span>
          )}
        </div>
      )}
    </div>
  );
}
