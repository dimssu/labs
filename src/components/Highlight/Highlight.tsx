'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './Highlight.module.scss';

const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(' ');

/**
 * Highlight — draws a soft royal-blue underline beneath an important phrase as
 * it scrolls into view, to pull the reader's eye to what matters. The text is
 * always fully legible (SSR / no-JS / reduced motion just show it un-drawn); the
 * underline animates in only when JS is present and the phrase enters the view.
 */
export default function Highlight({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.7 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={cx(styles.hl, on && styles.on, className)}>
      {children}
    </span>
  );
}
