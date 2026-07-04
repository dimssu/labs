'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import Reveal from '../../components/Reveal';
import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';
import styles from './Services.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Eyebrow from '../../components/Eyebrow';
import ScreenshotFrame from '../../components/ScreenshotFrame';
import { ArrowRightMotion } from '../../components/motion-icons';

const MotionA = motion.a;

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');

/* --- Content ------------------------------------------------------------ */

type SheetRow = { label: string; value: string };

type Engagement = {
  anchor: string;
  /* Short label that opens the section (the Eyebrow). */
  tag: string;
  title: string;
  tagline: string;
  /* One tight, plain-language line for the overview card — "best when…". */
  bestWhen: string;
  bullets: string[];
  /* Plain-language deliverable line — the honest "what you get". */
  whatYouGet: string;
  sheet: SheetRow[];
  plate: { src: string; alt: string };
};

/* Three engagements. Anchors match the JsonLd itemList in
   app/our-services/page.tsx (#custom / #products / #fractional-cto) — keep them. */
const ENGAGEMENTS: Engagement[] = [
  {
    anchor: 'custom',
    tag: 'Custom build',
    title: 'Custom software, built end-to-end',
    bestWhen: 'You want one senior team to own the whole build.',
    tagline:
      'When you have a problem and want a senior team to architect, build, and ship the answer, from first prototype through to production.',
    bullets: [
      'Tightly scoped engagements that produce a working prototype early in the build.',
      'A small senior team — engineering, product, and design — owning the build through to production.',
      'Architecture, infrastructure, and deployment handled, with nothing under the hood left as a black box.',
    ],
    whatYouGet: 'A production system, its full source, and a complete handover.',
    sheet: [
      { label: 'Duration', value: '8 to 16 weeks' },
      { label: 'Team', value: '1 PM + 2 to 3 engineers + 1 designer' },
    ],
    plate: {
      src: '/projects/grospace/hero.png',
      alt: 'AI Lease Management extraction split-pane with confidence-scored fields cited to the source clause',
    },
  },
  {
    anchor: 'products',
    tag: 'Productised modules',
    title: 'Production-ready AI modules you can deploy',
    bestWhen: 'You want a proven module live in your stack, fast.',
    tagline:
      'When the problem is well understood and you want a sharp, hardened solution dropped into your stack, running in about a week instead of a quarter.',
    bullets: [
      'A library of modular AI products we have already shipped and hardened across clients.',
      'Configurable, integrated, and brandable — typically live inside a week, not a quarter.',
      'A senior engineer works alongside you through the rollout, not a support queue.',
    ],
    whatYouGet: 'A configured module, its source, and a clean integration into your stack.',
    sheet: [
      { label: 'Duration', value: 'Live in about a week' },
      { label: 'Team', value: '1 senior engineer alongside your rollout' },
    ],
    plate: {
      src: '/projects/support-pulse/hero.png',
      alt: 'Support Pulse triage inbox with tickets across five AI-classified urgency lanes',
    },
  },
  {
    anchor: 'fractional-cto',
    tag: 'Fractional CTO',
    title: 'Fractional CTO and product partner',
    bestWhen: 'You want a senior technical partner, not a vendor.',
    tagline:
      'When you are a founder who wants a senior technical co-pilot rather than a vendor, on call for the decisions that set the trajectory.',
    bullets: [
      'Hands-on technical leadership across architecture, hiring, and ship cadence.',
      'Engagements structured around build cost plus equity or revenue share, so incentives are aligned.',
      'A small senior team behind the lead, so the strategy ships and the team grows with the work.',
    ],
    whatYouGet: 'Hands-on ownership of architecture, hiring, and ship cadence, month to month.',
    sheet: [
      { label: 'Duration', value: 'Ongoing, month to month' },
      { label: 'Team', value: '1 senior lead + team behind the work' },
    ],
    plate: {
      src: '/projects/investor-update-drafter/hero.png',
      alt: 'Investor Update Drafter metrics dashboard with sparklines and a draft-this-month action',
    },
  },
];

type ModuleRow = {
  module: string;
  sector: string;
  slug: string;
};

/* Module index — the catalogue of shipped, deployable modules. Each row deep-links
   to its product detail page. All live. */
const MODULE_INDEX: ModuleRow[] = [
  { module: 'AI Clinical Notes', sector: 'Healthcare', slug: 'sanad' },
  { module: 'AI Lease Management', sector: 'Real Estate', slug: 'grospace' },
  { module: 'Support Pulse', sector: 'SaaS Support', slug: 'support-pulse' },
  { module: 'Sales Call Coach', sector: 'Sales', slug: 'sales-call-coach' },
  { module: 'Inbox Zero', sector: 'Productivity', slug: 'inbox-zero' },
  { module: 'Brief Forge', sector: 'Legal', slug: 'brief-forge' },
  { module: 'Patient Front Desk', sector: 'Healthcare Ops', slug: 'patient-front-desk' },
  { module: 'Reply Rail', sector: 'Local Business', slug: 'reply-rail' },
  { module: 'Investor Update Drafter', sector: 'Founder Tools', slug: 'investor-update-drafter' },
  { module: 'Charge Pulse', sector: 'EV / Logistics', slug: 'charge-pulse' },
];

type Proof = {
  title: string;
  sector: string;
  metric: string;
  slug: string;
};

/* Flagship proof modules — the strongest shipped metric per product. */
const PROOF_GRID: Proof[] = [
  { title: 'AI Clinical Notes', sector: 'Healthcare', metric: '80% less doc time', slug: 'sanad' },
  { title: 'AI Lease Management', sector: 'Real Estate', metric: '60+ fields extracted', slug: 'grospace' },
  { title: 'Support Pulse', sector: 'SaaS Support', metric: '28+ tickets triaged', slug: 'support-pulse' },
  { title: 'Charge Pulse', sector: 'EV / Logistics', metric: '60% fewer tickets', slug: 'charge-pulse' },
  { title: 'Sales Call Coach', sector: 'Sales', metric: '11 signals / call', slug: 'sales-call-coach' },
  { title: 'Brief Forge', sector: 'Legal', metric: '14+ fields drafted', slug: 'brief-forge' },
];

/* --- Motion ------------------------------------------------------------- */

/** Soft, once-only entrance. Renders fully visible under reduced motion. */
/* Small "Live" status pill — text conveys status, not colour alone. */
function LivePill() {
  return (
    <span className={styles.statusDot}>
      <span className={styles.dot} aria-hidden="true" />
      Live
    </span>
  );
}

/* Compact 2-row datasheet — hairline-separated, label + value. */
function DataSheet({ rows }: { rows: SheetRow[] }) {
  return (
    <dl className={styles.sheet}>
      {rows.map((row) => (
        <div key={row.label} className={styles.sheetRow}>
          <dt className={styles.sheetKey}>{row.label}</dt>
          <dd className={styles.sheetVal}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* --- Sections ----------------------------------------------------------- */

function Masthead() {
  return (
    <section className={styles.masthead} aria-labelledby="services-title">
      <div className={styles.shell}>
        <div className={styles.mastGrid}>
          <div className={styles.mastText}>
            <Eyebrow>What we do</Eyebrow>
            <h1 id="services-title" className={styles.mastTitle}>
              Three engagements, one senior team.
            </h1>
            <p className={styles.mastLede}>
              Pick the engagement that matches the moment — a full end-to-end build,
              a hardened module dropped into your stack, or fractional leadership.
              The same senior team is behind all three.
            </p>
            <div className={styles.mastActions}>
              <Button href="/contact-us" variant="primary">Start a build</Button>
              <Button href="/portfolio" variant="text">See the work</Button>
            </div>
          </div>
          <div className={styles.mastVisual}>
            <Image
              src="/media/services.webp"
              alt="A senior team assembling one production system from design, engineering, and AI workstreams"
              fill
              priority
              sizes="(max-width: 900px) 92vw, 460px"
              className={styles.mastImg}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* At-a-glance overview — the three offerings, scannable in seconds, each
   jumping to its detailed section below. This is the clarity anchor for the page. */
function OfferSummary() {
  return (
    <section className={styles.offer} aria-labelledby="offer-title">
      <div className={styles.shell}>
        <header className={styles.offerHead}>
          <Eyebrow>What we offer</Eyebrow>
          <h2 id="offer-title" className={styles.offerTitle}>Pick the one that fits</h2>
          <p className={styles.offerLede}>
            A quick overview of the three — each links to its full detail below.
          </p>
        </header>

        <ol className={styles.offerGrid}>
          {ENGAGEMENTS.map((e, i) => (
            <Reveal as="li" key={e.anchor} className={styles.offerCardWrap} delay={i * 0.1}>
              <MotionA
                href={`#${e.anchor}`}
                className={styles.offerCard}
                initial="idle"
                whileHover="active"
              >
                <span className={cx(styles.offerNo, 'tnum')} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.offerTag}>{e.tag}</h3>
                <p className={styles.offerBest}>{e.bestWhen}</p>
                <span className={styles.offerRule} aria-hidden="true" />
                <div className={styles.offerGet}>
                  <span className={styles.offerGetKey}>What you get</span>
                  <p className={styles.offerGetVal}>{e.whatYouGet}</p>
                </div>
                <div className={styles.offerFoot}>
                  <span className={styles.offerDuration}>{e.sheet[0].value}</span>
                  <span className={styles.offerJump}>
                    How it works
                    <ArrowRightMotion size={14} />
                  </span>
                </div>
              </MotionA>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function EngagementSection({ engagement, tone }: { engagement: Engagement; tone: 'base' | 'alt' }) {
  return (
    <section
      id={engagement.anchor}
      className={cx(styles.section, tone === 'alt' && styles.sectionAlt)}
      aria-labelledby={`eng-${engagement.anchor}`}
    >
      <div className={styles.shell}>
        <div className={styles.engGrid}>
          <Reveal className={styles.engBody}>
            <Eyebrow>{engagement.tag}</Eyebrow>
            <h2 id={`eng-${engagement.anchor}`} className={styles.engTitle}>
              {engagement.title}
            </h2>
            <p className={styles.engTagline}>{engagement.tagline}</p>

            <ul className={styles.tickList}>
              {engagement.bullets.map((b) => (
                <li key={b} className={styles.tickItem}>
                  <span className={styles.tickMark} aria-hidden="true">
                    <Check size={15} strokeWidth={2.25} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className={styles.deliver}>
              <span className={styles.deliverKey}>What you get</span>
              <p className={styles.deliverVal}>{engagement.whatYouGet}</p>
            </div>

            <DataSheet rows={engagement.sheet} />
          </Reveal>

          <div className={styles.engPlate}>
            <ScreenshotFrame
              src={engagement.plate.src}
              alt={engagement.plate.alt}
              aspect="16 / 10"
              reveal={false}
              sizes="(max-width: 1024px) 92vw, 520px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Modules() {
  return (
    <section className={cx(styles.section, styles.sectionAlt)} aria-labelledby="modules-title">
      <div className={styles.shell}>
        <header className={styles.sectionHead}>
          <Eyebrow>Deployable modules</Eyebrow>
          <h2 id="modules-title" className={styles.sectionTitle}>
            Ten modules already live in production
          </h2>
          <p className={styles.sectionStandfirst}>
            Each of these is a product we&apos;ve shipped and hardened across clients,
            packaged as a deployable module — drop any one into your stack. Open one to see how it works.
          </p>
        </header>

        <div className={styles.moduleTable} role="list">
          <div className={styles.moduleHead} aria-hidden="true">
            <span>Module</span>
            <span>Sector</span>
            <span className={styles.colStatus}>Status</span>
          </div>
          {MODULE_INDEX.map((row) => (
            <div key={row.slug} role="listitem">
              <Link href={`/product/${row.slug}`} className={styles.moduleRow}>
                <span className={styles.rowName}>{row.module}</span>
                <span className={styles.rowSector}>{row.sector}</span>
                <span className={styles.colStatus}>
                  <LivePill />
                </span>
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.proofHead}>
          <Eyebrow>Flagship results</Eyebrow>
        </div>
        <ul className={styles.proofGrid}>
          {PROOF_GRID.map((p, i) => (
            <Reveal as="li" key={p.slug} className={styles.proofCardWrap} delay={i * 0.05}>
              <Link href={`/product/${p.slug}`} className={styles.proofCard}>
                <div className={styles.proofTop}>
                  <span className={styles.proofSector}>{p.sector}</span>
                  <LivePill />
                </div>
                <h3 className={styles.proofTitle}>{p.title}</h3>
                <span className={styles.proofMetric}>{p.metric}</span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <div className={styles.sectionCta}>
          <Button href="/portfolio" variant="text">See the full portfolio</Button>
        </div>
      </div>
    </section>
  );
}

function Close() {
  return (
    <section className={styles.close} aria-labelledby="close-title">
      <div className={styles.shell}>
        <div className={styles.closeGrid}>
          <div className={styles.closeMain}>
            <Eyebrow>Start here</Eyebrow>
            <h2 id="close-title" className={styles.closeTitle}>Not sure which one fits?</h2>
            <p className={styles.closeLede}>
              Tell us what you are building. A senior builder reads it and replies,
              usually within one business day.
            </p>
            <Button href="/contact-us" variant="primary">Start a build</Button>
          </div>

          <dl className={styles.closeCoords}>
            {[
              {
                k: 'Director',
                v: (
                  <a href="mailto:aryan@vruoom.com" className={styles.coordLink}>
                    aryan@vruoom.com
                  </a>
                ),
              },
              {
                k: 'CTO',
                v: (
                  <a href="mailto:priyanshu@vruoom.com" className={styles.coordLink}>
                    priyanshu@vruoom.com
                  </a>
                ),
              },
              { k: 'Studio', v: 'India, working globally' },
              { k: 'Response', v: 'Within one business day' },
              { k: 'Parent', v: 'Vruoom' },
            ].map((row) => (
              <div key={row.k} className={styles.coordRow}>
                <dt className={styles.coordKey}>{row.k}</dt>
                <dd className={styles.coordVal}>{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <Masthead />
        <OfferSummary />
        {ENGAGEMENTS.map((e, i) => (
          <EngagementSection key={e.anchor} engagement={e} tone={i % 2 === 1 ? 'alt' : 'base'} />
        ))}
        <Modules />
        <Close />
      </main>
      <Footer />
    </div>
  );
}
