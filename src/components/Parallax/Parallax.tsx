'use client';

import { useRef, type ReactNode, type ElementType } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionStyle } from 'framer-motion';

/**
 * Parallax — translates its child as the section scrolls through the viewport.
 * Depth without jank: a single GPU transform driven by scroll progress. Set a
 * negative `amount` to drift up, positive to lag behind. Reduced-motion → static.
 */
export default function Parallax({
  children,
  amount = 40,
  className,
  as = 'div',
  style,
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
  as?: ElementType;
  style?: MotionStyle;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  const MotionTag = motion(as as 'div');

  return (
    <MotionTag ref={ref} className={className} style={reduce ? style : { ...style, y }}>
      {children}
    </MotionTag>
  );
}
