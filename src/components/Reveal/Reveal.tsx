'use client';

import { type ReactNode } from 'react';
import { useReveal } from '@/lib/useReveal';
import styles from './Reveal.module.scss';

const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(' ');

/**
 * Reveal — a content-safe scroll entrance. The hidden state is armed only under
 * `html.js` and is un-armed by useReveal (IntersectionObserver + fling-safe
 * scroll re-check + failsafe timer), so content can never get stuck invisible.
 *
 * Variants: 'rise' (fade-up, default), 'scale' (fade + gentle scale, for framed
 * visuals), 'blur' (fade + focus-in, premium), 'clip' (left-to-right wipe, wide
 * imagery), 'left' / 'right' (directional slide for alternating editorial rows).
 * All collapse to the finished state under reduced motion / no-JS.
 */
type Tag = 'div' | 'li' | 'ul' | 'ol' | 'section' | 'span';
type Variant = 'rise' | 'scale' | 'blur' | 'clip' | 'left' | 'right';

export default function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
  variant = 'rise',
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
  variant?: Variant;
  style?: React.CSSProperties;
}) {
  const [ref, shown] = useReveal<HTMLElement>();

  const Comp = as as 'div';
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      className={cx(styles.reveal, variant !== 'rise' && styles[variant], shown && styles.inView, className)}
      style={delay ? { transitionDelay: `${delay}s`, ...style } : style}
    >
      {children}
    </Comp>
  );
}
