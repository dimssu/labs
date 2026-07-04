'use client';

import { motion } from 'framer-motion';

/**
 * Interactive icons. Each inherits the `idle` / `active` variant of its nearest
 * motion parent (a Button or card that flips to "active" on hover), so the icon
 * animates on the whole control's hover, not just when the pointer is over the
 * glyph. The resting `idle` state is the finished glyph — nothing is ever hidden
 * — and reduced motion is honoured app-wide via <MotionConfig reducedMotion="user">.
 */
const settle = { type: 'spring', stiffness: 480, damping: 44, mass: 0.7 } as const;

/**
 * Right arrow — nudges forward as one piece on hover (no redraw, no flicker),
 * matching the single translateX language used by the text and card CTAs.
 * Overdamped spring = firm, no overshoot, on-brand.
 */
export function ArrowRightMotion({ size = 18 }: { size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: 'block', flex: 'none' }}
      variants={{ idle: { x: 0 }, active: { x: 2.5 } }}
      transition={settle}
    >
      <path d="M4.5 12H19" />
      <path d="M13.5 6.5L19 12l-5.5 5.5" />
    </motion.svg>
  );
}
