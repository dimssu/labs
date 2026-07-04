'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

/**
 * useReveal — a scroll-entrance trigger engineered so content can NEVER get
 * stuck hidden. The armed (hidden) state lives in CSS gated on `html.js`, so
 * SSR / no-JS / crawlers always see finished content. Once JS runs this hook
 * decides when to un-arm, with three independent paths to "shown":
 *
 *   1. IntersectionObserver fires when the element scrolls into view (the happy
 *      path — gives us the staggered entrance).
 *   2. A scroll listener re-checks the bounding box. A fast fling can outrun the
 *      IO sampler and leave a section blank forever; this catches that — the
 *      moment the element is at/above the viewport it reveals.
 *   3. A failsafe timer reveals unconditionally after a grace period, so tab
 *      throttling / detached observers / any edge case still resolve to visible.
 *
 * Reduced-motion and no-IO environments resolve to shown immediately.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  options: { threshold?: number; rootMargin?: string; failsafeMs?: number } = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.14, rootMargin = '0px 0px -8% 0px', failsafeMs = 1400 } = options;
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (reduce || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    let done = false;
    let io: IntersectionObserver | null = null;
    let timer = 0;

    const reveal = () => {
      if (done) return;
      done = true;
      setShown(true);
      io?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
    };

    // Fling-safe: reveal as soon as the element reaches the lower viewport.
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.94 && r.bottom > 0) reveal();
    };

    io = new IntersectionObserver(
      (entries) => entries[0]?.isIntersecting && reveal(),
      { threshold, rootMargin }
    );
    io.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });

    // Unconditional failsafe — content is never left hidden.
    timer = window.setTimeout(reveal, failsafeMs);

    // Initial check last, once timer/io are assigned (avoids TDZ).
    onScroll();

    return () => {
      io?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, shown];
}
