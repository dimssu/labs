'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import styles from './Button.module.scss';
import { ArrowRightMotion } from '../motion-icons';
import { useMagnetic } from '@/lib/useMagnetic';

type Variant = 'primary' | 'secondary' | 'text';

const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(' ');

const MotionLink = motion.create(Link);

/**
 * Button — the single call-to-action primitive.
 *  - primary:   accent-filled, white label + a sweeping sheen; the one decisive
 *               action per view. Subtly magnetic (opt out with magnetic={false}).
 *  - secondary: hairline outline, ink label (quiet alternative)
 *  - text:      inline link with a trailing arrow + a drawn underline on hover
 * Renders as a Next <Link>. Arrow shown by default; opt out with arrow={false}.
 */
export default function Button({
  href,
  children,
  variant = 'primary',
  arrow = true,
  magnetic = true,
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  magnetic?: boolean;
  className?: string;
  [key: string]: unknown;
}) {
  const mag = useMagnetic();
  const useMag = magnetic && variant === 'primary';

  return (
    <MotionLink
      href={href}
      ref={useMag ? mag.ref : undefined}
      onMouseMove={useMag ? mag.onMouseMove : undefined}
      onMouseLeave={useMag ? mag.onMouseLeave : undefined}
      className={cx(styles.btn, styles[variant], className)}
      initial="idle"
      whileHover="active"
      whileFocus="active"
      whileTap={variant === 'text' ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 480, damping: 44, mass: 0.7 }}
      style={useMag ? mag.style : undefined}
      {...rest}
    >
      {variant === 'primary' && <span className={styles.sheen} aria-hidden="true" />}
      <span className={styles.label}>{children}</span>
      {arrow && (
        <span className={styles.arrow}>
          <ArrowRightMotion size={variant === 'text' ? 16 : 18} />
        </span>
      )}
    </MotionLink>
  );
}
