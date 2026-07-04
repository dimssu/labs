import type { ReactNode } from 'react';
import styles from './Eyebrow.module.scss';

const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(' ');

/**
 * Eyebrow — the one small sentence-case label that opens a section. Replaces the
 * old all-caps monospace slug. A short accent tick precedes it. One per section.
 */
export default function Eyebrow({
  children,
  accent = false,
  className,
}: {
  children: ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <p className={cx(styles.eyebrow, accent && styles.accent, className)}>
      <span className={styles.tick} aria-hidden="true" />
      {children}
    </p>
  );
}
