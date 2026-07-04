'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../../components/Reveal';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Portfolio.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Eyebrow from '../../components/Eyebrow';
import ScreenshotFrame from '../../components/ScreenshotFrame';
import CountUp from '../../components/CountUp';
import { productsData } from '../../data/products';

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');

/* Canonical work order — named-client marquee pieces first, NDA / internal
   builds fall to the end. Every field below is read live from productsData;
   the presentation layer only adds a sector label, a one-line outcome, and the
   real screenshot to show as the card thumbnail. Nothing here is invented. */
const ORDER = [
  'sanad',
  'focuscare',
  'dsv-fleet-management',
  'charge-pulse',
  'food-ordering-platform',
  'open-vision-ppe',
  'factory-os',
  'grospace',
  'ai-native-real-estate-fund',
  'ai-job-automation',
  'investor-update-drafter',
  'sales-call-coach',
  'inbox-zero',
  'support-pulse',
  'brief-forge',
  'patient-front-desk',
  'reply-rail',
] as const;

type PlateConfig = { file: string; alt: string };
type IllustrationConfig = { file: string; alt: string };

interface Presentation {
  sector: string;
  line: string;
  plate?: PlateConfig;
  illustration?: IllustrationConfig;
}

/* sector       = filter/label bucket (one per product, never double-counted).
   line         = one honest, in-production outcome sentence.
   plate        = the product's real screenshot to show as the card thumbnail.
   illustration = on-brand isometric visual (in /media) for NDA / internal builds
                  we can't screenshot — a deliberate brand tile, not a blank slot. */
const PRESENTATION: Record<string, Presentation> = {
  sanad: {
    sector: 'HEALTHCARE',
    line: 'AI medical scribe that writes clinical notes during the visit, every line cited.',
    plate: {
      file: 'landing.png',
      alt: 'AI Clinical Notes landing page with a citation-linked SOAP note draft preview',
    },
  },
  focuscare: {
    sector: 'HEALTHCARE',
    line: 'Physiotherapy consultations from intake to AI notes and follow-up scheduling.',
    illustration: {
      file: 'ind-healthcare.webp',
      alt: 'Isometric illustration of a clinical note and stethoscope',
    },
  },
  'dsv-fleet-management': {
    sector: 'LOGISTICS',
    line: 'Real-time fleet tracking and dispatch across every vehicle, driver, and route.',
    illustration: {
      file: 'ind-logistics.webp',
      alt: 'Isometric illustration of a delivery vehicle tracked along a route',
    },
  },
  'charge-pulse': {
    sector: 'LOGISTICS',
    line: 'Live EV charging finder with availability, voice navigation, and offline maps.',
    plate: {
      file: 'hero.png',
      alt: 'Charge Pulse live map with pulsing EV station markers across the Bay Area',
    },
  },
  'food-ordering-platform': {
    sector: 'OPERATIONS',
    line: 'Events ordering operations with vendors, payments, and automated settlements.',
    illustration: {
      file: 'products.webp',
      alt: 'Isometric illustration of stacked operational modules',
    },
  },
  'open-vision-ppe': {
    sector: 'OPERATIONS',
    line: 'On-premise video analytics for PPE compliance and intrusion detection.',
    illustration: {
      file: 'operate-infra.webp',
      alt: 'Isometric illustration of a secured on-premise data system',
    },
  },
  'factory-os': {
    sector: 'OPERATIONS',
    line: 'Production planning that replaces spreadsheets with milestones and SOP gates.',
    illustration: {
      file: 'eng-modules.webp',
      alt: 'Isometric illustration of modular production components',
    },
  },
  grospace: {
    sector: 'REAL ESTATE',
    line: 'AI lease management that extracts 60+ fields and tracks every obligation.',
    plate: {
      file: 'hero.png',
      alt: 'AI Lease Management extraction split-pane with confidence-scored fields cited to source clauses',
    },
  },
  'ai-native-real-estate-fund': {
    sector: 'REAL ESTATE',
    line: 'Four AI agents scouting, underwriting, and structuring property deals.',
    illustration: {
      file: 'ind-realestate.webp',
      alt: 'Isometric illustration of a commercial building and a lease document',
    },
  },
  'ai-job-automation': {
    sector: 'PRODUCTIVITY',
    line: 'Job application agent that auto-applies across ATS with a CAPTCHA bypass stack.',
    illustration: {
      file: 'eng-custom.webp',
      alt: 'Isometric illustration of application screens progressing in sequence',
    },
  },
  'investor-update-drafter': {
    sector: 'PRODUCTIVITY',
    line: 'Monthly investor updates drafted from live metrics in under two minutes.',
    plate: {
      file: 'hero.png',
      alt: 'Investor Update Drafter metrics dashboard with sparklines and a draft-this-month action',
    },
  },
  'sales-call-coach': {
    sector: 'SALES & CX',
    line: 'Every sales call scored and flagged, with coaching clips ready each week.',
    plate: {
      file: 'hero.png',
      alt: 'Sales Call Coach call queue with talk ratios, sentiment, and AI scores across 16 calls',
    },
  },
  'inbox-zero': {
    sector: 'PRODUCTIVITY',
    line: 'AI email triage with smart lanes, drafted replies, and a daily debrief.',
    plate: {
      file: 'hero.png',
      alt: 'Inbox Zero three-pane smart inbox with AI-classified lanes and suggested actions',
    },
  },
  'support-pulse': {
    sector: 'SALES & CX',
    line: 'AI ticket triage and drafted replies that hold first response time in line.',
    plate: {
      file: 'hero.png',
      alt: 'Support Pulse triage inbox with 28 tickets across five AI urgency lanes',
    },
  },
  'brief-forge': {
    sector: 'PRODUCTIVITY',
    line: 'Contract review that extracts, scores, and redlines clauses in minutes.',
    plate: {
      file: 'hero.png',
      alt: 'Brief Forge contract extraction split-pane with confidence-scored fields and click-to-source',
    },
  },
  'patient-front-desk': {
    sector: 'HEALTHCARE',
    line: 'AI receptionist for intake, scheduling, and insurance before the patient arrives.',
    plate: {
      file: 'hero.png',
      alt: "Patient Front Desk today's waiting room with 18 appointments and an exception queue",
    },
  },
  'reply-rail': {
    sector: 'SALES & CX',
    line: 'Drafted Google, Yelp, and Facebook review responses in one shared queue.',
    plate: {
      file: 'hero.png',
      alt: 'Reply Rail unified reviews inbox with Google, Yelp, and Facebook across urgency lanes',
    },
  },
};

interface Exhibit {
  id: string;
  title: string;
  line: string;
  sector: string;
  status: 'live' | 'prototype';
  href: string;
  plate?: { src: string; alt: string };
  illus?: { src: string; alt: string };
}

const EXHIBITS: Exhibit[] = ORDER.map((id) => {
  const p = productsData[id];
  const pr = PRESENTATION[id];
  return {
    id,
    title: p.title,
    line: pr.line,
    sector: pr.sector,
    status: p.status,
    href: `/product/${id}`,
    plate: pr.plate
      ? { src: `/projects/${id}/${pr.plate.file}`, alt: pr.plate.alt }
      : undefined,
    illus: pr.illustration
      ? { src: `/media/${pr.illustration.file}`, alt: pr.illustration.alt }
      : undefined,
  };
});

const TOTAL = EXHIBITS.length;

/* Quiet text filter row. Each sector holds exactly one bucket per product, so
   the counts never double-count. Labels are cased for reading, not shouting. */
const SECTORS: { key: string; label: string }[] = [
  { key: 'ALL', label: 'All work' },
  { key: 'HEALTHCARE', label: 'Healthcare' },
  { key: 'LOGISTICS', label: 'Logistics' },
  { key: 'REAL ESTATE', label: 'Real estate' },
  { key: 'OPERATIONS', label: 'Operations' },
  { key: 'SALES & CX', label: 'Sales & CX' },
  { key: 'PRODUCTIVITY', label: 'Productivity' },
];

const SECTOR_LABEL: Record<string, string> = Object.fromEntries(
  SECTORS.map((s) => [s.key, s.label])
);

/** Soft, once-only entrance. Renders fully visible under reduced motion. */
function StatusPill({ status }: { status: 'live' | 'prototype' }) {
  return (
    <span className={styles.statusPill}>
      <span className={styles.statusDot} aria-hidden="true" />
      {status === 'live' ? 'Live' : 'Prototype'}
    </span>
  );
}

function WorkCard({ item, delay }: { item: Exhibit; delay: number }) {
  return (
    <Reveal as="li" className={styles.cardCell} delay={delay}>
      <Link
        href={item.href}
        className={styles.card}
        aria-label={`${item.title}, view project`}
      >
        <div className={styles.cardMedia}>
          {item.plate ? (
            <ScreenshotFrame
              src={item.plate.src}
              alt={item.plate.alt}
              aspect="16 / 10"
              seamless
              reveal={false}
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 380px"
            />
          ) : item.illus ? (
            /* On-brand isometric tile for NDA / internal builds we can't screenshot. */
            <div className={styles.cardIllus}>
              <Image
                src={item.illus.src}
                alt={item.illus.alt}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 380px"
                className={styles.cardIllusImg}
              />
            </div>
          ) : (
            /* SLOT: product screenshot for {item.id} — branded blueprint tile until captured */
            <div className={styles.mediaPlaceholder} aria-hidden="true">
              <span className={styles.placeholderMark}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <rect x="1" y="1" width="28" height="28" rx="7" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
                  <rect x="7" y="8" width="10" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.3" opacity="0.7" />
                  <rect x="7" y="17" width="16" height="4" rx="1.5" fill="currentColor" opacity="0.28" />
                </svg>
              </span>
              <span className={styles.placeholderTitle}>{item.title}</span>
            </div>
          )}
        </div>

        <div className={styles.cardBody}>
          <div className={styles.cardMeta}>
            <span className={styles.cardSector}>
              {SECTOR_LABEL[item.sector] ?? item.sector}
            </span>
            <StatusPill status={item.status} />
          </div>
          <h3 className={styles.cardTitle}>{item.title}</h3>
          <p className={styles.cardLine}>{item.line}</p>
          <span className={styles.cardCta}>
            View project
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M4 8h8M8.5 4.5 12 8l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function Portfolio() {
  const [sector, setSector] = useState('ALL');

  const filtered = useMemo(
    () => (sector === 'ALL' ? EXHIBITS : EXHIBITS.filter((e) => e.sector === sector)),
    [sector]
  );

  const sectorCount = (key: string) =>
    key === 'ALL' ? TOTAL : EXHIBITS.filter((e) => e.sector === key).length;

  return (
    <div className={styles.page}>
      <Header />

      <main>
        {/* --- Masthead --------------------------------------------------- */}
        <section className={styles.masthead} aria-labelledby="work-title">
          <div className={styles.shell}>
            <div className={styles.mastGrid}>
              <div className={styles.mastheadInner}>
                <Eyebrow>Selected work</Eyebrow>
                <h1 id="work-title" className={styles.pageTitle}>
                  Products in production
                </h1>
                <p className={styles.lede}>
                  The products we&apos;ve designed, built, and shipped for real teams —
                  running today across regulated and operational domains, from
                  healthcare and logistics to real estate and revenue.
                </p>
                <div className={styles.mastheadActions}>
                  <Button href="/contact-us" variant="primary">Start a build</Button>
                  <Button href="/our-services" variant="text">See services</Button>
                </div>
              </div>
              <div className={styles.mastVisual}>
                <Image
                  src="/media/portfolio.webp"
                  alt="A curated gallery of shipped products running in production"
                  fill
                  priority
                  sizes="(max-width: 900px) 92vw, 440px"
                  className={styles.mastImg}
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- Work index ------------------------------------------------- */}
        <section className={styles.index} aria-labelledby="index-title">
          <div className={styles.shell}>
            <h2 id="index-title" className={styles.srOnly}>The work index</h2>

            <div
              className={styles.filterBar}
              role="group"
              aria-label="Filter work by sector"
            >
              <div className={styles.filterList}>
                {SECTORS.map((s) => {
                  const isActive = sector === s.key;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      className={cx(styles.filterBtn, isActive && styles.filterActive)}
                      aria-pressed={isActive}
                      onClick={() => setSector(s.key)}
                    >
                      <span className={styles.filterLabel}>{s.label}</span>
                      <span className={cx(styles.filterN, 'tnum')}>{sectorCount(s.key)}</span>
                    </button>
                  );
                })}
              </div>
              <p className={styles.filterStatus} aria-live="polite">
                Showing {filtered.length} of {TOTAL}
              </p>
            </div>

            <ul className={styles.grid}>
              {filtered.map((item, i) => (
                <WorkCard key={item.id} item={item} delay={(i % 3) * 0.06} />
              ))}
            </ul>
          </div>
        </section>

        {/* --- Specialist studio callout ---------------------------------- */}
        <section className={styles.studio} aria-labelledby="studio-title">
          <div className={styles.shell}>
            <Reveal>
              <a
                className={styles.studioCard}
                href="https://atelier-travel-studio.buildspacelabs.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.studioText}>
                  <Eyebrow>Specialist studio</Eyebrow>
                  <h2 id="studio-title" className={styles.studioTitle}>
                    Atelier — our travel &amp; tourism studio
                  </h2>
                  <p className={styles.studioLede}>
                    Beyond the product work here, we run a dedicated studio for travel
                    and tourism brands: cinematic websites engineered for speed and
                    direct bookings.
                  </p>
                  <ul className={styles.studioStats}>
                    <li>
                      <CountUp end={29} className={cx(styles.studioStatN, 'tnum')} />
                      <span className={styles.studioStatL}>brands transformed</span>
                    </li>
                    <li>
                      <CountUp end={21} suffix="+" className={cx(styles.studioStatN, 'tnum')} />
                      <span className={styles.studioStatL}>regions of India</span>
                    </li>
                    <li>
                      <CountUp end={100} suffix="%" className={cx(styles.studioStatN, 'tnum')} />
                      <span className={styles.studioStatL}>hand-built</span>
                    </li>
                  </ul>
                  <span className={styles.studioCta}>
                    Visit Atelier Travel Studio
                    <ArrowUpRight size={17} strokeWidth={2} aria-hidden="true" />
                  </span>
                </div>
                <div className={styles.studioShot}>
                  <span className={styles.studioShotFrame}>
                    <Image
                      src="/media/atelier-travel.webp"
                      alt="Atelier Travel Studio — a cinematic travel-agency website designed and built by BuildspaceLabs"
                      fill
                      sizes="(max-width: 940px) 92vw, 520px"
                      className={styles.studioImg}
                    />
                  </span>
                </div>
              </a>
            </Reveal>
          </div>
        </section>

        {/* --- Close ------------------------------------------------------ */}
        <section className={styles.close} aria-labelledby="close-title">
          <div className={styles.shell}>
            <div className={styles.closeInner}>
              <Eyebrow>Start here</Eyebrow>
              <h2 id="close-title" className={styles.closeTitle}>Have something to build?</h2>
              <p className={styles.closeLede}>
                Tell us what you&apos;re trying to ship. A senior builder reads it and
                replies within one business day.
              </p>
              <div className={styles.closeActions}>
                <Button href="/contact-us" variant="primary">Start a build</Button>
                <Button href="/our-services" variant="text">See services</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
