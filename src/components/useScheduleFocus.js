import { useEffect, useState } from "react";

// Reading line position within the visible area below the sticky element (0 = top, 1 = bottom).
const READING_LINE_RATIO = 0.25;

/**
 * Tracks which timeline item crosses the reading line in the visible area below a sticky
 * element (for example a sticky map). Returns null until an item reaches that line.
 */
export default function useScheduleFocus(listRef, anchorRef, resetKey) {
  const [state, setState] = useState({ key: resetKey, index: null });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const list = listRef.current;
      const anchor = anchorRef.current;
      let index = null;
      if (list && anchor && list.lastElementChild) {
        const items = Array.from(list.children);
        // scrollHeight is rounded; ignore subpixel remainders at the bottom of the page.
        const remaining = Math.max(0, Math.floor(document.documentElement.scrollHeight - (window.scrollY + window.innerHeight)));
        const top = Math.max(0, anchor.getBoundingClientRect().bottom);
        let line = top + (window.innerHeight - top) * READING_LINE_RATIO;
        // Items near the end can never scroll up to the reading line. Over the last stretch of
        // scrolling, move the reading line down just far enough to reach the final item.
        const shortfall = items[items.length - 1].getBoundingClientRect().top - remaining - line + 1;
        if (shortfall > 0) line += Math.max(0, shortfall - remaining);
        items.forEach((item, i) => {
          if (item.getBoundingClientRect().top <= line) index = i;
        });
      }
      setState((prev) => (prev.key === resetKey && prev.index === index ? prev : { key: resetKey, index }));
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    request();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, [listRef, anchorRef, resetKey]);

  return state.key === resetKey ? state.index : null;
}
