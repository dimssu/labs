import type { FC } from 'react';
import styles from './StatusBadge.module.scss';

interface StatusBadgeProps {
  status: 'live' | 'prototype';
  /** Override the default label ('IN PRODUCTION' for live, 'PROTOTYPE'). */
  label?: string;
}

/**
 * Status badge — a leading dot plus a mono uppercase ink label. Filled cobalt
 * dot signals live / in production; a hollow ink ring signals a prototype.
 * No fill, no green.
 */
const StatusBadge: FC<StatusBadgeProps> = ({ status, label }) => {
  const text = label ?? (status === 'live' ? 'IN PRODUCTION' : 'PROTOTYPE');
  const dotClass = status === 'live' ? styles.dotLive : styles.dotProto;

  return (
    <span className={styles.badge}>
      <span className={`${styles.dot} ${dotClass}`} aria-hidden="true" />
      <span className={styles.label}>{text}</span>
    </span>
  );
};

export default StatusBadge;
