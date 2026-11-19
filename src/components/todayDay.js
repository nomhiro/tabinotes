import { useEffect } from "react";

const dateFormatters = new Map();

// 指定タイムゾーンでの今日の日付を "YYYY-MM-DD" で返す
function todayIn(timeZone, now) {
  let formatter = dateFormatters.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" });
    dateFormatters.set(timeZone, formatter);
  }
  return formatter.format(now);
}

// day.weather.tripDate ("2026-11-18") があればそれを、無ければ day.date ("11月3日（火・祝）") と year から "YYYY-MM-DD" を作る
function dayDateKey(day, year) {
  if (day.weather?.tripDate) return day.weather.tripDate;
  const m = day.date?.match(/(\d+)月(\d+)日/);
  return m ? `${year}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}` : null;
}

/**
 * 今日（現地時間）にあたる日の DAYS 内の添字を返す。該当する日が無ければ 0（1つ目）。
 * 各日に weather.timezone があればその日のタイムゾーンで、無ければ timeZone で「今日」を判定する。
 */
export function getTodayDayIndex(days, { timeZone = "Asia/Tokyo", year = 2026, now = new Date() } = {}) {
  const index = days.findIndex((day) => {
    const key = dayDateKey(day, year);
    return key !== null && key === todayIn(day.weather?.timezone ?? timeZone, now);
  });
  return index === -1 ? 0 : index;
}

/**
 * 最初の表示時に、選択中のナビボタンが横スクロールで隠れていたら見える位置へ寄せる。
 */
export function useRevealActiveNavButton(navRef) {
  useEffect(() => {
    const nav = navRef.current;
    const active = nav?.querySelector('[aria-pressed="true"]');
    if (!nav || !active) return;
    nav.scrollLeft = active.offsetLeft - (nav.clientWidth - active.offsetWidth) / 2;
  }, [navRef]);
}
