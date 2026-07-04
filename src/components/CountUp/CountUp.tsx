'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * CountUp — animates a number from 0 to `end` once it scrolls into view, to
 * draw the eye to a key metric. Content-safe: renders the final value on the
 * server / with JS off / under reduced motion (SEO and no-flash friendly), and
 * only counts when JS is present, the element is in view, and motion is allowed.
 */
export default function CountUp({
  end,
  suffix = '',
  prefix = '',
  duration = 1100,
  className,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(end);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setValue(end);
      return;
    }
    // If the metric is already on-screen at load, keep the real (SSR) number —
    // arming to 0 here would flash end→0 before counting. Only metrics that
    // start below the fold arm to 0 and count up as they scroll into view.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setValue(end);
      return;
    }
    setValue(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
          setValue(Math.round(eased * end));
          if (t < 1) raf = requestAnimationFrame(tick);
          else setValue(end);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
