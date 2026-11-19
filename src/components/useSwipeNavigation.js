import { useCallback, useEffect, useRef } from "react";

const MIN_DISTANCE = 60; // px. これ以上動かしたらスワイプとみなす
const MAX_DURATION = 700; // ms. これより遅い動きはスクロールやドラッグとみなす
const DIRECTION_RATIO = 1.5; // 横の移動量が縦の何倍以上なら横スワイプとみなすか

// スワイプを無視する場所: 地図（ドラッグで動かす）、入力欄、日程ナビ（自前で横スクロールする）
const IGNORE_SELECTOR = ".leaflet-container, input, textarea, select, audio, video, nav, [data-no-swipe]";

// 横スクロールできる要素の中で始まった操作は、その要素のスクロールを優先する
function isInsideHorizontalScroller(target, boundary) {
  for (let el = target; el && el !== boundary && el.nodeType === 1; el = el.parentElement) {
    if (el.scrollWidth <= el.clientWidth) continue;
    const overflowX = window.getComputedStyle(el).overflowX;
    if (overflowX === "auto" || overflowX === "scroll") return true;
  }
  return false;
}

/**
 * 左右のスワイプで日程を切り替えるためのフック。
 *
 * - onSwipe(direction): 左へスワイプ（次へ）= 1、右へスワイプ（前へ）= -1
 * - activeKey: 表示中の日程が変わったときに値が変わるキー。変わった後、
 *   アクティブなナビボタンを見える位置へ寄せる。スワイプで切り替えた場合は、
 *   本文の先頭へスクロールも戻す。
 *
 * 戻り値のハンドラを、スワイプを受け付けたい要素（ページ全体の div など）に渡す。
 */
export default function useSwipeNavigation(onSwipe, activeKey) {
  const start = useRef(null);
  const swiped = useRef(false);
  const onSwipeRef = useRef(onSwipe);
  onSwipeRef.current = onSwipe;
  const firstRun = useRef(true);

  const onTouchStart = useCallback((e) => {
    start.current = null;
    // ピンチ操作・拡大中は対象外
    if (e.touches.length !== 1) return;
    if (window.visualViewport && window.visualViewport.scale > 1.01) return;
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (target.closest(IGNORE_SELECTOR)) return;
    if (isInsideHorizontalScroller(target, e.currentTarget)) return;
    const t = e.touches[0];
    start.current = { x: t.clientX, y: t.clientY, time: Date.now() };
  }, []);

  const onTouchEnd = useCallback((e) => {
    const s = start.current;
    start.current = null;
    if (!s) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - s.x;
    const dy = t.clientY - s.y;
    if (Date.now() - s.time > MAX_DURATION) return;
    if (Math.abs(dx) < MIN_DISTANCE) return;
    if (Math.abs(dx) < Math.abs(dy) * DIRECTION_RATIO) return;
    swiped.current = true;
    onSwipeRef.current(dx < 0 ? 1 : -1);
  }, []);

  const onTouchCancel = useCallback(() => {
    start.current = null;
  }, []);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const nav = document.querySelector('nav[aria-label="日程ナビゲーション"]');
    if (!nav) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const active = nav.querySelector('[aria-pressed="true"]');
    if (active) {
      // 横方向だけを動かす（ページ全体の縦スクロールは変えない）
      const left = active.offsetLeft - (nav.clientWidth - active.offsetWidth) / 2;
      nav.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
    }
    if (swiped.current) {
      swiped.current = false;
      // スクロール位置が本文より下なら、本文の先頭（固定ナビの直下）へ戻す
      const main = document.querySelector("main");
      if (main) {
        const top = main.getBoundingClientRect().top - nav.offsetHeight;
        if (top < 0) window.scrollTo({ top: window.scrollY + top, behavior: "auto" });
      }
    }
  }, [activeKey]);

  return { onTouchStart, onTouchEnd, onTouchCancel };
}
