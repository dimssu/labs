'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgress — a slim accent bar tracking read-progress across the whole
 * document. Spring-smoothed so it glides rather than snaps. Purely decorative
 * (aria-hidden); the global `.scrollProgressRoot` styles live in global.scss.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  return <motion.div className="scrollProgressRoot" style={{ scaleX }} aria-hidden="true" />;
}
