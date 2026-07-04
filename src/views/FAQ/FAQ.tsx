'use client';

import { type ReactNode } from 'react';
import Reveal from '../../components/Reveal';
import Image from 'next/image';
import styles from './FAQ.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Eyebrow from '../../components/Eyebrow';
import Accordion from '../../components/Accordion';
import { faqs } from '@/data/faq';

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Soft, once-only entrance. Renders fully visible under reduced motion. */
/* --- Sections ----------------------------------------------------------- */

function Masthead() {
  return (
    <section className={styles.masthead} aria-labelledby="faq-title">
      <div className={styles.shell}>
        <div className={styles.mastGrid}>
          <div className={styles.mastInner}>
            <Eyebrow>Questions</Eyebrow>
            <h1 id="faq-title" className={styles.mastTitle}>
              Questions, answered
            </h1>
            <p className={styles.mastLede}>
              Straight answers on scope, timelines, and what working with us
              actually looks like. If something here isn&rsquo;t covered, ask us directly.
            </p>
            <div className={styles.mastActions}>
              <Button href="/contact-us" variant="text">Ask us anything else</Button>
            </div>
          </div>
          <div className={styles.mastVisual}>
            <Image
              src="/media/faq.webp"
              alt="Finding a clear, verified answer among common questions"
              fill
              priority
              sizes="(max-width: 900px) 92vw, 420px"
              className={styles.mastImg}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className={styles.section} aria-label="Frequently asked questions">
      <div className={styles.shell}>
        <div className={styles.cats}>
          {faqs.map((cat) => {
            const slug = slugify(cat.category);
            return (
              <section
                key={slug}
                id={slug}
                className={styles.catBlock}
                aria-labelledby={`${slug}-head`}
              >
                <Reveal className={styles.catHead}>
                  <Eyebrow>{cat.category}</Eyebrow>
                  <h2 id={`${slug}-head`} className={styles.catTitle}>
                    {cat.description}
                  </h2>
                </Reveal>

                <Reveal className={styles.rows}>
                  {cat.questions.map((item) => (
                    <Accordion key={item.q} question={item.q} answer={item.a} />
                  ))}
                </Reveal>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Close() {
  return (
    <section className={styles.close} aria-labelledby="faq-close-title">
      <div className={styles.shell}>
        <div className={styles.closeInner}>
          <Eyebrow>Still curious</Eyebrow>
          <h2 id="faq-close-title" className={styles.closeTitle}>
            Still have questions?
          </h2>
          <p className={styles.closeLede}>
            Tell us what you&rsquo;re trying to build. A senior builder reads it
            and replies within one business day.
          </p>
          <Button href="/contact-us" variant="primary">Talk to us</Button>
        </div>
      </div>
    </section>
  );
}

export default function FAQ() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <Masthead />
        <Categories />
        <Close />
      </main>
      <Footer />
    </div>
  );
}
