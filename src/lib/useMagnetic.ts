'use client';

import { useRef } from 'react';
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * useMagnetic — a subtle magnetic pull toward the cursor for a decisive control.
 * Low strength on purpose: the button feels alive and responsive, not gimmicky.
 * Spring-damped, capped, and fully disabled under reduced motion.
 */
export function useMagnetic(strength = 0.22, max = 8) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 260, damping: 20, mass: 0.4 } as const;
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    x.set(Math.max(-max, Math.min(max, dx)));
    y.set(Math.max(-max, Math.min(max, dy)));
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, onMouseMove, onMouseLeave, style: { x: sx, y: sy } };
}
