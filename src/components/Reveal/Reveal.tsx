'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './Reveal.module.scss';

const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(' ');

/**
 * Reveal — a robust, content-safe scroll entrance.
 *
 * Design goals (learned the hard way): content must NEVER get stuck hidden.
 *  - Default (SSR / no-JS): fully visible. The animated-out state is gated behind
 *    `html.js` (added pre-paint by the inline script in layout.tsx), so crawlers
 *    and JS-off visitors always see content.
 *  - JS present: the element arms to opacity:0 / y:16 and an IntersectionObserver
 *    reveals it once when it scrolls into view. Above-fold elements reveal on mount.
 *  - Reduced motion: shown immediately (both via JS and a CSS fallback).
 *
 * Supports `as` (div/li/ul/ol), a per-item `delay` (seconds), and a motion
 * `variant`: 'rise' (default fade-up), 'scale' (fade + gentle scale-in, for
 * framed visuals), 'clip' (cinematic left-to-right wipe, for wide imagery), or
 * 'left'/'right' (directional slide, for alternating editorial rows).
 * Every variant collapses to the finished state under reduced motion / no-JS.
 */
type Tag = 'div' | 'li' | 'ul' | 'ol' | 'section';
type Variant = 'rise' | 'scale' | 'clip' | 'left' | 'right';

export default function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
  variant = 'rise',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
  variant?: Variant;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window === 'undefined' ||
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = as as 'div';
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      className={cx(
        styles.reveal,
        variant !== 'rise' && styles[variant],
        inView && styles.inView,
        className
      )}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Comp>
  );
}
