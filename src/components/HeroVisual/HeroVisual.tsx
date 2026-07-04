'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import styles from './HeroVisual.module.scss';

/**
 * HeroVisual — the signature moment. The isometric "inputs → live system"
 * illustration is mounted on a lit blueprint stage and made to feel alive:
 *  - pointer-driven 3D parallax (layers at different depths tilt toward the cursor)
 *  - a slow AI "scan" sweep across the surface
 *  - blueprint registration crop-marks that draw in on load
 *  - a floating, pulsing "Live · in production" status chip
 * Everything degrades to a clean static lit plate under reduced motion.
 */
export default function HeroVisual({
  src = '/media/hero.webp',
  alt,
  priority = true,
}: {
  src?: string;
  alt: string;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  // Normalised pointer offset (-0.5 … 0.5) → spring-smoothed tilt.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 140, damping: 18, mass: 0.5 } as const;
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), spring);
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), spring);
  // Deeper layer (illustration) drifts opposite for parallax; shallow layer leads.
  const artX = useSpring(useTransform(px, [-0.5, 0.5], [14, -14]), spring);
  const artY = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), spring);
  const chipX = useSpring(useTransform(px, [-0.5, 0.5], [-22, 22]), spring);
  const chipY = useSpring(useTransform(py, [-0.5, 0.5], [-16, 16]), spring);

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      ref={wrapRef}
      className={styles.wrap}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        className={styles.stage}
        style={reduce ? undefined : { rotateX: rx, rotateY: ry }}
      >
        {/* blueprint grid + accent aura live in the module ::before/::after */}
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.aura} aria-hidden="true" />

        {/* registration crop-marks — draw in on load */}
        {['tl', 'tr', 'bl', 'br'].map((c) => (
          <span key={c} className={`${styles.crop} ${styles[c]}`} aria-hidden="true" />
        ))}

        <motion.div
          className={styles.art}
          style={reduce ? undefined : { x: artX, y: artY }}
        >
          <div className={styles.artFloat}>
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes="(max-width: 940px) 88vw, 540px"
              className={styles.img}
            />
            {/* AI scan sweep */}
            <span className={styles.scan} aria-hidden="true" />
          </div>
        </motion.div>

        {/* floating live-status chip, shallowest layer */}
        <motion.div
          className={styles.chip}
          style={reduce ? undefined : { x: chipX, y: chipY }}
        >
          <span className={styles.chipDot} aria-hidden="true" />
          <span className={styles.chipText}>Live · in production</span>
        </motion.div>

        {/* a second, quieter tag — the "shipping" side */}
        <motion.div
          className={styles.tag}
          style={reduce ? undefined : { x: chipX, y: chipY }}
        >
          <span className={styles.tagKey}>latency</span>
          <span className={styles.tagVal}>&lt; 200ms</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
