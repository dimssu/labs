'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * App-wide framer-motion config. `reducedMotion="user"` makes every
 * framer-motion animation honour the OS "reduce motion" setting — transform /
 * layout animations are suppressed (opacity still allowed) without any
 * per-component wiring. Covers Button press, animated arrows, and card hovers,
 * which the global CSS reduced-motion rule can't reach (framer runs via WAAPI).
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
