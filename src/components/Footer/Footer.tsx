import Link from 'next/link';
import Logo from '../Logo';
import Button from '../Button';
import styles from './Footer.module.scss';

/* Real contact channels — mirror Contact / FAQ views + JsonLd. Do not invent. */
const DIRECTOR_EMAIL = 'aryan@vruoom.com'; // Director
const STUDIO_EMAIL = 'priyanshu@vruoom.com'; // CTO
const WHATSAPP_DISPLAY = '+91 834 071 1366';
const WHATSAPP_HREF = 'https://wa.me/918340711366';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container-wide ${styles.footerContainer}`}>
        {/* Brand band — mark, positioning line, and one quiet call to action. */}
        <div className={styles.brandBand}>
          <div className={styles.brandLeft}>
            <Link href="/" className={styles.brandMark} aria-label="BuildspaceLabs home">
              <Logo />
              <span className={styles.brandName}>BuildspaceLabs</span>
            </Link>
            <p className={styles.brandLine}>
              An AI-native product studio. We design and ship production software,
              built by a senior team.
            </p>
          </div>
          <div className={styles.brandCta}>
            <span className={styles.brandCtaLabel}>Have something to build?</span>
            <Button href="/contact-us" variant="primary">Start a build</Button>
          </div>
        </div>

        <div className={styles.directory}>
          {/* PAGES */}
          <section className={styles.column} aria-labelledby="colophon-pages">
            <h2 id="colophon-pages" className={styles.columnTitle}>Pages</h2>
            <ul className={styles.list}>
              <li><Link href="/our-services" className={styles.link}>Services</Link></li>
              <li><Link href="/portfolio" className={styles.link}>Work</Link></li>
              <li><Link href="/faq" className={styles.link}>FAQ</Link></li>
              <li><Link href="/contact-us" className={styles.link}>Contact</Link></li>
            </ul>
          </section>

          {/* STUDIO */}
          <section className={styles.column} aria-labelledby="colophon-studio">
            <h2 id="colophon-studio" className={styles.columnTitle}>Studio</h2>
            <ul className={styles.list}>
              <li className={styles.line}>AI-native product studio</li>
              <li className={styles.line}>Designed and shipped in India</li>
              <li>
                <a
                  href="https://atelier-travel-studio.buildspacelabs.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Atelier — travel studio ↗
                </a>
              </li>
              <li className={styles.line}>A Vruoom company</li>
            </ul>
          </section>

          {/* CONTACT */}
          <section className={styles.column} aria-labelledby="colophon-contact">
            <h2 id="colophon-contact" className={styles.columnTitle}>Contact</h2>
            <ul className={styles.list}>
              <li>
                <a href={`mailto:${DIRECTOR_EMAIL}`} className={styles.link}>Director — {DIRECTOR_EMAIL}</a>
              </li>
              <li>
                <a href={`mailto:${STUDIO_EMAIL}`} className={styles.link}>CTO — {STUDIO_EMAIL}</a>
              </li>
              <li>
                <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  WhatsApp {WHATSAPP_DISPLAY}
                </a>
              </li>
            </ul>
          </section>
        </div>

        {/* Signature wordmark — large, faint, clipped by the footer edge. */}
        <div className={styles.signature} aria-hidden="true">BuildspaceLabs</div>

        {/* Colophon — honest parent entity, no build stamp. */}
        <div className={styles.specRule}>
          <span className={styles.specLine}>
            BuildspaceLabs, a Vruoom company&nbsp;·&nbsp;buildspacelabs.com&nbsp;·&nbsp;India
          </span>
          <span className={styles.build}>© {new Date().getFullYear()} BuildspaceLabs</span>
        </div>
      </div>
    </footer>
  );
}
