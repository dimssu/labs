'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type FC } from 'react';
import { useReducedMotion } from 'framer-motion';
import styles from './ScreenshotFrame.module.scss';

interface ScreenshotFrameProps {
  /** Screenshot source. Optional so the frame can also render as an empty plate. */
  src?: string;
  alt?: string;
  /** Legacy caption fallback (was the fake browser route). */
  routeLabel?: string;
  /** Fill the parent's height instead of using the intrinsic aspect ratio. */
  fill?: boolean;
  /** Drop the plate's own border/shadow/caption so it reads flush inside a parent. */
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
  /** Accepted for API compatibility; no longer feeds a caption bar. */
  plateNo?: string;
  /** Accepted for API compatibility; no longer feeds a caption bar. */
  slug?: string;
  /** Accepted for API compatibility; no longer feeds a caption bar. */
  figLabel?: string;
  /** Explicit caption. The mono caption bar renders ONLY when this is a non-empty string. */
  caption?: string;
  /** Run the S1 register reveal on scroll-into-view. Default true. */
  reveal?: boolean;
}

/**
 * The Plate — a product screenshot mounted as a numbered registration plate:
 * true-white surface, sharp corners, one hairline rule, a single lifted shadow,
 * four cobalt L-shaped crop-marks, and an OPTIONAL monospace caption bar below
 * the image. The caption bar renders only when an explicit non-empty `caption`
 * prop is supplied; there is no auto-composed PLATE / SLUG / FIG. line.
 * On scroll into view it performs the S1 register: crop-marks draw and the image
 * wipes in left-to-right behind a hairline. Fully token-driven and reduced-motion safe.
 */
const ScreenshotFrame: FC<ScreenshotFrameProps> = ({
  src,
  alt = '',
  routeLabel,
  fill = false,
  seamless = false,
  aspect,
  bottomFade = false,
  objectPosition = 'top center',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 1040px',
  className = '',
  plateNo,
  slug,
  figLabel,
  caption,
  reveal = true,
}) => {
  const prefersReduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Captions are OFF by default. The mono caption bar renders ONLY when an
  // explicit, non-empty `caption` is passed. plateNo/slug/figLabel/routeLabel
  // are accepted for API compatibility but no longer compose a caption line.
  const captionText = caption && caption.trim() ? caption : undefined;

  // Static when the reveal is opted out or the visitor prefers reduced motion:
  // compose instantly, no wipe.
  const isStatic = !reveal || !!prefersReduced;

  useEffect(() => {
    if (isStatic) {
      setRevealed(true);
      return;
    }
    const node = rootRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [isStatic]);

  const rootClass = [
    styles.frame,
    fill ? styles.frameFill : '',
    seamless ? styles.frameSeamless : '',
    revealed ? styles.revealed : '',
    isStatic ? styles.isStatic : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <figure ref={rootRef} className={rootClass}>
      <div
        className={`${styles.shot} ${fill ? styles.shotFill : ''}`}
        style={!fill && aspect ? { aspectRatio: aspect } : undefined}
      >
        {src && (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={styles.img}
            style={{ objectPosition }}
          />
        )}
        {bottomFade && <span className={styles.bottomFade} aria-hidden="true" />}
      </div>

      {!seamless && captionText && (
        <figcaption className={styles.caption}>
          <span className={styles.captionText}>{captionText}</span>
        </figcaption>
      )}
    </figure>
  );
};

export default ScreenshotFrame;
