import Link from 'next/link';
import styles from './Footer.module.scss';
import Logo from '../Logo';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.brand}>
          <div className={styles.logoWrapper}>
            <Logo />
          </div>
          <p className={styles.tagline}>India&apos;s AI-native product studio. We build AI products that ship.</p>
        </div>
        
        <div className={styles.linksBlock}>
          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>Company</h4>
            <Link href="/portfolio" className={styles.link}>Portfolio</Link>
            <Link href="/our-services" className={styles.link}>Services</Link>
            <Link href="/contact-us" className={styles.link}>Contact</Link>
          </div>
          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>Legal</h4>
            <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
            <Link href="/terms" className={styles.link}>Terms & Conditions</Link>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} BuildspaceLabs. Built in India.</p>
        <a href="mailto:priyanshu@vruoom.com" className={styles.footerEmail}>priyanshu@vruoom.com</a>
      </div>
    </footer>
  );
}
