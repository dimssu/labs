'use client';

import { motion } from 'framer-motion';
import Reveal from '../../components/Reveal';
import Parallax from '../../components/Parallax';
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

/* --- Small pieces ------------------------------------------------------- */

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
          <dd className={cx(styles.sheetVal, 'tnum')}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* Reusable section head — Eyebrow + serif h2 + optional standfirst, each
   revealed with a small stagger. Mirrors Home's SectionHead exactly. */
function SectionHead({
  eyebrow,
  title,
  standfirst,
  id,
}: {
  eyebrow: string;
  title: string;
  standfirst?: string;
  id: string;
}) {
  return (
    <header className={styles.sectionHead}>
      <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
      <Reveal delay={0.06}><h2 id={id} className={styles.sectionTitle}>{title}</h2></Reveal>
      {standfirst && (
        <Reveal delay={0.12}><p className={styles.sectionStandfirst}>{standfirst}</p></Reveal>
      )}
    </header>
  );
}

/* --- Sections ----------------------------------------------------------- */

function Masthead() {
  return (
    <section className={styles.masthead} aria-labelledby="services-title">
      <span className={styles.heroGlow} aria-hidden="true" />
      <div className={styles.shell}>
        <div className={styles.mastGrid}>
          <div className={styles.mastText}>
            <Reveal delay={0.02}>
              <Eyebrow>What we do</Eyebrow>
            </Reveal>
            <Reveal variant="blur" delay={0.08}>
              <h1 id="services-title" className={styles.mastTitle}>
                Three engagements, one senior team.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className={styles.mastLede}>
                Pick the engagement that matches the moment — a full end-to-end build,
                a hardened module dropped into your stack, or fractional leadership.
                The same senior team is behind all three.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className={styles.mastActions}>
                <Button href="/contact-us" variant="primary">Start a build</Button>
                <Button href="/portfolio" variant="secondary" magnetic={false}>See the work</Button>
              </div>
            </Reveal>
          </div>

          <Reveal className={styles.mastVisual} variant="scale" delay={0.14}>
            <Parallax amount={16} className={styles.mastStage}>
              <div className={styles.mastPlate}>
                <Image
                  src="/media/services.webp"
                  alt="A senior team assembling one production system from design, engineering, and AI workstreams"
                  fill
                  priority
                  sizes="(max-width: 900px) 92vw, 460px"
                  className={styles.mastImg}
                />
              </div>
            </Parallax>
          </Reveal>
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
        <SectionHead
          id="offer-title"
          eyebrow="What we offer"
          title="Pick the one that fits"
          standfirst="A quick overview of the three — each links to its full detail below."
        />

        <ol className={styles.offerGrid}>
          {ENGAGEMENTS.map((e, i) => (
            <Reveal as="li" key={e.anchor} className={styles.offerCardWrap} delay={i * 0.08}>
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

/* The three detailed engagements, stacked as alternating editorial rows inside
   one section so the rhythm stays tight. Each row keeps its own anchor id +
   scroll-margin so the #custom / #products / #fractional-cto deep links still land. */
function EngagementRow({ engagement, index }: { engagement: Engagement; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <article
      id={engagement.anchor}
      className={cx(styles.engRow, reversed && styles.engReversed)}
      aria-labelledby={`eng-${engagement.anchor}`}
    >
      <Reveal className={styles.engBody} variant={reversed ? 'right' : 'left'}>
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

      <Parallax amount={reversed ? 18 : -18} className={styles.engPlate}>
        <ScreenshotFrame
          src={engagement.plate.src}
          alt={engagement.plate.alt}
          aspect="16 / 10"
          reveal={false}
          sizes="(max-width: 1024px) 92vw, 520px"
        />
      </Parallax>
    </article>
  );
}

function Engagements() {
  return (
    <section className={cx(styles.section, styles.engagements)} aria-label="How each engagement works">
      <div className={styles.shell}>
        <div className={styles.engStack}>
          {ENGAGEMENTS.map((e, i) => (
            <EngagementRow key={e.anchor} engagement={e} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Modules() {
  return (
    <section className={cx(styles.section, styles.sectionAlt)} aria-labelledby="modules-title">
      <div className={styles.shell}>
        <SectionHead
          id="modules-title"
          eyebrow="Deployable modules"
          title="Ten modules already live in production"
          standfirst="Each of these is a product we've shipped and hardened across clients, packaged as a deployable module — drop any one into your stack. Open one to see how it works."
        />

        <Reveal className={styles.moduleTable} style={{ display: 'block' }}>
          <div className={styles.moduleHead} aria-hidden="true">
            <span>Module</span>
            <span>Sector</span>
            <span className={styles.colStatus}>Status</span>
          </div>
          <div role="list">
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
        </Reveal>

        <div className={styles.proofHead}>
          <Reveal><Eyebrow>Flagship results</Eyebrow></Reveal>
        </div>
        <ul className={styles.proofGrid}>
          {PROOF_GRID.map((p, i) => (
            <Reveal as="li" key={p.slug} className={styles.proofCardWrap} delay={i * 0.06}>
              <Link href={`/product/${p.slug}`} className={styles.proofCard}>
                <div className={styles.proofTop}>
                  <span className={styles.proofSector}>{p.sector}</span>
                  <LivePill />
                </div>
                <h3 className={styles.proofTitle}>{p.title}</h3>
                <span className={cx(styles.proofMetric, 'tnum')}>{p.metric}</span>
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
        <Reveal variant="scale" className={styles.closePanel}>
          <span className={styles.closeGrid2} aria-hidden="true" />
          <span className={styles.closeGlow} aria-hidden="true" />
          <div className={styles.closeInner}>
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
        </Reveal>
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
        <Engagements />
        <Modules />
        <Close />
      </main>
      <Footer />
    </div>
  );
}
