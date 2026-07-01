import Image from 'next/image';
import type { FC } from 'react';
import styles from './ScreenshotFrame.module.scss';

interface ScreenshotFrameProps {
  src: string;
  alt: string;
  /** Fake browser route shown in the titlebar pill, e.g. "chargepulse.app". */
  routeLabel: string;
  /** Fill the parent's height instead of using the intrinsic aspect ratio. */
  fill?: boolean;
  /** Drop the frame's own border/radius/shadow so it reads flush inside a parent card. */
  seamless?: boolean;
  /** CSS aspect-ratio for the screenshot area when not in `fill` mode. Default 16/10. */
  aspect?: string;
  /** Dissolve the bottom edge of the shot into the page background. */
  bottomFade?: boolean;
  /** CSS object-position for the screenshot (anchor the signature UI). Default 'top center'. */
  objectPosition?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * Dark "browser plate" that wraps a light-theme product screenshot so it never
 * sits as a bare bright rectangle on the near-black page. Monochrome window
 * dots (not the red/amber/green cliché) keep the one-accent rule intact.
 */
const ScreenshotFrame: FC<ScreenshotFrameProps> = ({
  src,
  alt,
  routeLabel,
  fill = false,
  seamless = false,
  aspect,
  bottomFade = false,
  objectPosition = 'top center',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 1040px',
  className = '',
}) => {
  return (
    <div className={`${styles.frame} ${fill ? styles.frameFill : ''} ${seamless ? styles.frameSeamless : ''} ${className}`}>
      <div className={styles.titlebar} aria-hidden="true">
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.urlPill}>{routeLabel}</span>
        <span className={styles.menu}>
          <i />
          <i />
          <i />
        </span>
      </div>
      <div
        className={`${styles.shot} ${fill ? styles.shotFill : ''}`}
        style={!fill && aspect ? { aspectRatio: aspect } : undefined}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={styles.img}
          style={{ objectPosition }}
        />
        {bottomFade && <span className={styles.bottomFade} aria-hidden="true" />}
      </div>
    </div>
  );
};

export default ScreenshotFrame;
