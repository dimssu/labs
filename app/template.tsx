import type { ReactNode } from 'react';
import styles from './template.module.scss';

/* Per-route wrapper. Next remounts this on every navigation, so the CSS
   entrance in template.module.scss replays each time the route changes.
   Kept as a server component — the motion is pure CSS, gated on html.js. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className={styles.pageTransition}>{children}</div>;
}
