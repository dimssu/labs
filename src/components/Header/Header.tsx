'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from '../Logo';

const navLinks = [
  { name: 'Work', path: '/portfolio' },
  { name: 'Services', path: '/our-services' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact-us' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme');
    const initial = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light';
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('app-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.headerContainer}`}>
        {/* LEFT: mark + wordmark */}
        <Link href="/" className={styles.logoLink} aria-label="BuildspaceLabs home">
          <Logo />
          <span className={styles.wordmark}>BuildspaceLabs</span>
        </Link>

        {/* CENTER: primary navigation */}
        <nav className={styles.navDesktop} aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              aria-current={pathname === link.path ? 'page' : undefined}
              className={`${styles.navLink} ${pathname === link.path ? styles.active : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* RIGHT: utility cluster */}
        <div className={styles.rightSection}>
          <button
            className={styles.themeToggleBtn}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link href="/contact-us" className={styles.ctaLink}>
            <span>Start a build</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>

          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav} aria-label="Primary mobile">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                aria-current={pathname === link.path ? 'page' : undefined}
                className={`${styles.mobileNavLink} ${pathname === link.path ? styles.active : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact-us"
            className={styles.mobileCta}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>Start a build</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      )}
    </header>
  );
}
