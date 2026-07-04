'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import styles from './Button.module.scss';
import { ArrowRightMotion } from '../motion-icons';

type Variant = 'primary' | 'secondary' | 'text';

const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(' ');

const MotionLink = motion.create(Link);

/**
 * Button — the single call-to-action primitive.
 *  - primary:   accent-filled, white label (the one decisive action per view)
 *  - secondary: hairline outline, ink label (quiet alternative)
 *  - text:      inline link with a trailing arrow + a drawn underline on hover
 * Renders as a Next <Link>. Arrow shown by default; opt out with arrow={false}.
 */
export default function Button({
  href,
  children,
  variant = 'primary',
  arrow = true,
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <MotionLink
      href={href}
      className={cx(styles.btn, styles[variant], className)}
      initial="idle"
      whileHover="active"
      whileFocus="active"
      whileTap={variant === 'text' ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 480, damping: 44, mass: 0.7 }}
      {...rest}
    >
      <span className={styles.label}>{children}</span>
      {arrow && (
        <span className={styles.arrow}>
          <ArrowRightMotion size={variant === 'text' ? 16 : 18} />
        </span>
      )}
    </MotionLink>
  );
}
