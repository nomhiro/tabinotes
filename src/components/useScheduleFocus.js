import { useEffect, useState } from "react";

/**
 * Tracks which timeline item has scrolled up to the bottom edge of a sticky element
 * (for example a sticky map). Returns null while the timeline is still below it.
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
        const remaining = Math.max(0, document.documentElement.scrollHeight - (window.scrollY + window.innerHeight));
        let line = Math.max(0, anchor.getBoundingClientRect().bottom) + 12;
        // Items near the end can never scroll up to the map edge. Over the last stretch of
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
