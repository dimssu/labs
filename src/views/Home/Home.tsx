'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../../components/Reveal';
import Parallax from '../../components/Parallax';
import HeroVisual from '../../components/HeroVisual';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Home.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Eyebrow from '../../components/Eyebrow';
import ScreenshotFrame from '../../components/ScreenshotFrame';
import CountUp from '../../components/CountUp';
import Highlight from '../../components/Highlight';
import { ArrowRightMotion } from '../../components/motion-icons';

const MotionLink = motion.create(Link);

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');

/* --- Content ------------------------------------------------------------ */

const PROOF = [
  {
    end: 80, suffix: '%', label: 'less documentation time', source: 'AI Clinical Notes, healthcare',
    img: '/media/docs.webp', alt: 'Documentation time falling — a stack of clinical notes with a downward arrow',
  },
  {
    end: 60, suffix: '%', label: 'fewer support tickets', source: 'Charge Pulse, EV logistics',
    img: '/media/tickets.webp', alt: 'Fewer support tickets — a shrinking stack of ticket cards with a downward arrow',
  },
  {
    end: 4, suffix: '', label: 'industries in production', source: 'Healthcare, logistics, real estate, sales',
    img: '/media/products.webp', alt: 'Products running in production across four industries',
  },
];

const ENGAGEMENTS = [
  {
    img: '/media/eng-custom.webp',
    alt: 'A blueprint wireframe built end-to-end into a finished, live product',
    title: 'Custom software, built end-to-end',
    desc: 'We scope, design, and ship the whole product — first prototype to production — with a senior team that owns delivery.',
    href: '/our-services#custom',
  },
  {
    img: '/media/eng-modules.webp',
    alt: 'A production-ready AI module snapping into a running system',
    title: 'Production-ready AI modules',
    desc: 'Drop-in extraction, triage, drafting, and agents, engineered to hold up against real inputs instead of demo data.',
    href: '/our-services#products',
  },
  {
    img: '/media/eng-partner.webp',
    alt: 'Senior technical leadership as a load-bearing pillar steering the roadmap',
    title: 'Fractional CTO and product partner',
    desc: 'Senior technical leadership on call for architecture, hiring, and roadmap while you build the team in-house.',
    href: '/our-services#fractional-cto',
  },
];

const INDUSTRIES = [
  { img: '/media/ind-healthcare.webp', name: 'Healthcare', line: 'Clinical documentation, patient intake, and front-desk automation.' },
  { img: '/media/ind-logistics.webp', name: 'Logistics & mobility', line: 'Fleet, routing, and operational tooling that runs at the edge.' },
  { img: '/media/ind-realestate.webp', name: 'Real estate', line: 'Lease abstraction and obligation tracking from raw documents.' },
  { img: '/media/ind-sales.webp', name: 'Sales & support', line: 'Call scoring, ticket triage, and drafted, cited replies.' },
];

type Work = {
  id: string;
  src: string;
  alt: string;
  title: string;
  industry: string;
  outcome: string;
};

const WORK: Work[] = [
  {
    id: 'sanad',
    src: '/projects/sanad/dashboard.png',
    alt: 'AI Clinical Notes clinician dashboard with encounters and drafts awaiting review',
    title: 'AI Clinical Notes',
    industry: 'Healthcare',
    outcome:
      'Clinical notes are written during the visit, every line cited back to the conversation — cutting documentation time by 80%.',
  },
  {
    id: 'grospace',
    src: '/projects/grospace/hero.png',
    alt: 'AI Lease Management extraction split-pane with confidence-scored fields cited to the source clause',
    title: 'AI Lease Management',
    industry: 'Real estate',
    outcome:
      'Lease PDFs become structured, obligation-tracked portfolios in minutes instead of days, each field cited to its clause.',
  },
  {
    id: 'sales-call-coach',
    src: '/projects/sales-call-coach/dashboard.png',
    alt: 'Sales Call Coach rep scorecard with twelve-week performance trend lines and team benchmarks',
    title: 'Sales Call Coach',
    industry: 'Sales',
    outcome:
      'Every sales call is scored and flagged, with coaching clips queued for each rep, each week — no manual review.',
  },
  {
    id: 'support-pulse',
    src: '/projects/support-pulse/dashboard.png',
    alt: 'Support Pulse per-agent scorecard with trend lines across first response and resolution',
    title: 'Support Pulse',
    industry: 'SaaS support',
    outcome:
      'Every support ticket is triaged into urgency lanes with a drafted, cited reply waiting for the agent.',
  },
];

const OPERATE = [
  {
    key: 'Regulated data',
    text: 'HIPAA and BAA-ready architecture with FHIR R4 interoperability, built for teams that carry compliance obligations.',
  },
  {
    key: 'Deployment & residency',
    text: 'Deploy on your cloud, on-premise, or at the edge. Your data stays in your environment, in your chosen region.',
  },
  {
    key: 'Agreements',
    text: 'A data-processing agreement is available on request, with terms that fit your procurement and security review.',
  },
];

const CADENCE = [
  { step: '01', title: 'Prototype early', text: 'Something running in your hands early on — a working prototype, not a deck.' },
  { step: '02', title: 'Production-hardened over weeks', text: 'We harden it against real inputs, real load, and real edge cases.' },
  { step: '03', title: 'We stay through iteration', text: 'Monitoring, hardening, and handover — not a Figma file and goodbye.' },
];

/* --- Sections ----------------------------------------------------------- */

function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <span className={styles.heroGlow} aria-hidden="true" />
      <div className={styles.shell}>
        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <Reveal delay={0.02}>
              <Eyebrow>AI-native product studio · a Vruoom company</Eyebrow>
            </Reveal>
            <Reveal variant="blur" delay={0.08}>
              <h1 id="hero-title" className={styles.heroTitle}>
                We design and ship production AI products.
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className={styles.heroLede}>
                A <Highlight>senior-only team</Highlight> — no junior pool — owns your
                build from first prototype to production. AI sits at the core of what
                we ship, not pasted on at the end.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <div className={styles.heroActions}>
                <Button href="/contact-us" variant="primary">Start a build</Button>
                <Button href="/portfolio" variant="secondary" magnetic={false}>See the work</Button>
              </div>
            </Reveal>
            <Reveal delay={0.34}>
              <p className={styles.heroTrust}>
                We prototype early and harden toward production over the weeks that follow.
              </p>
            </Reveal>
          </div>

          <Reveal className={styles.heroVisual} variant="scale" delay={0.14}>
            <HeroVisual alt="Design, engineering, and AI inputs assembled upward into one elevated, live production system" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProofStrip() {
  return (
    <section className={styles.proof} aria-label="Results in production">
      <div className={styles.shell}>
        <div className={styles.proofRow}>
          {PROOF.map((p, i) => (
            <Reveal key={p.label} className={styles.proofCell} delay={i * 0.08}>
              <Parallax amount={10} className={styles.proofMedia}>
                <Image src={p.img} alt={p.alt} fill sizes="96px" className={styles.proofImg} />
              </Parallax>
              <CountUp end={p.end} suffix={p.suffix} className={cx(styles.proofValue, 'tnum')} />
              <span className={styles.proofLabel}>{p.label}</span>
              <span className={styles.proofSource}>{p.source}</span>
            </Reveal>
          ))}
        </div>
        <div className={styles.proofFoot}>
          <p className={styles.proofIndustries}>
            Trusted by teams across healthcare, logistics, real estate, and sales.
          </p>
          <p className={styles.proofNote}>Outcomes measured on live deployments.</p>
          {/* SLOT: real client logos */}
        </div>
      </div>
    </section>
  );
}

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
      {standfirst && <Reveal delay={0.12}><p className={styles.sectionStandfirst}>{standfirst}</p></Reveal>}
    </header>
  );
}

function Engagements() {
  return (
    <section className={styles.section} aria-labelledby="do-title">
      <div className={styles.shell}>
        <SectionHead
          id="do-title"
          eyebrow="What we do"
          title="Three ways to bring in a senior team"
          standfirst="From a full end-to-end build to fractional leadership — the same senior team behind all three."
        />
        <ul className={styles.engGrid}>
          {ENGAGEMENTS.map((e, i) => (
            <Reveal as="li" key={e.title} delay={i * 0.1}>
              <MotionLink href={e.href} className={styles.engCard} initial="idle" whileHover="active">
                <span className={styles.engMedia}>
                  <Image
                    src={e.img}
                    alt={e.alt}
                    fill
                    sizes="(max-width: 900px) 92vw, 380px"
                    className={styles.engImg}
                  />
                  <span className={styles.engMediaGrid} aria-hidden="true" />
                </span>
                <span className={styles.engBody}>
                  <h3 className={styles.engTitle}>{e.title}</h3>
                  <p className={styles.engDesc}>{e.desc}</p>
                  <span className={styles.engMore}>
                    How it works
                    <ArrowRightMotion size={15} />
                  </span>
                </span>
              </MotionLink>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section className={cx(styles.section, styles.industriesSection)} aria-labelledby="ind-title">
      <div className={styles.shell}>
        <SectionHead
          id="ind-title"
          eyebrow="Where we work"
          title="Built for the industries we know"
          standfirst="Shipped across regulated and operational domains — we speak your problem before we build."
        />
        <ul className={styles.indGrid}>
          {INDUSTRIES.map((ind, i) => (
            <Reveal as="li" key={ind.name} className={styles.indCard} delay={i * 0.08}>
              <span className={styles.indMedia}>
                <Image src={ind.img} alt={ind.name} fill sizes="(max-width: 900px) 92vw, 300px" className={styles.indImg} />
              </span>
              <h3 className={styles.indName}>{ind.name}</h3>
              <p className={styles.indLine}>{ind.line}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WorkRow({ item, index }: { item: Work; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <Reveal
      className={cx(styles.workRow, reversed && styles.workReversed)}
      variant={reversed ? 'right' : 'left'}
    >
      <Link href={`/product/${item.id}`} className={styles.workLink} aria-label={`${item.title}, view project`}>
        <div className={styles.workText}>
          <div className={styles.workMeta}>
            <span className={cx(styles.workIndex, 'tnum')} aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className={styles.workIndustry}>{item.industry}</span>
            <span className={styles.statusDot}>
              <span className={styles.dot} aria-hidden="true" />
              Live
            </span>
          </div>
          <h3 className={styles.workTitle}>{item.title}</h3>
          <p className={styles.workOutcome}>{item.outcome}</p>
          <span className={styles.workCta}>
            View project
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 8h8M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <Parallax amount={reversed ? 18 : -18} className={styles.workShot}>
          <ScreenshotFrame
            src={item.src}
            alt={item.alt}
            aspect="16 / 10"
            reveal={false}
            sizes="(max-width: 1024px) 92vw, 560px"
          />
        </Parallax>
      </Link>
    </Reveal>
  );
}

function SelectedWork() {
  return (
    <section className={cx(styles.section, styles.workSection)} aria-labelledby="work-title">
      <div className={styles.shell}>
        <SectionHead
          id="work-title"
          eyebrow="Selected work"
          title="Real products, in production"
          standfirst="A selection of the products we've designed, built, and shipped for real teams."
        />
        <div className={styles.workStack}>
          {WORK.map((item, i) => (
            <WorkRow key={item.id} item={item} index={i} />
          ))}
        </div>
        {/* SLOT: one deep case study */}
        <div className={styles.sectionCta}>
          <Button href="/portfolio" variant="text">See the full portfolio</Button>
        </div>
      </div>
    </section>
  );
}

/* Specialist-studio spotlight — advertises Atelier, our travel & tourism studio.
   The screenshot is a live capture of the real site; the number is its own proof. */
function TravelStudio() {
  return (
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
                A dedicated studio for travel &amp; tourism
              </h2>
              <p className={styles.studioLede}>
                Atelier is our specialist studio for travel and tourism brands —
                cinematic websites engineered for speed and direct bookings.
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
                  sizes="(max-width: 940px) 92vw, 560px"
                  className={styles.studioImg}
                />
              </span>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Operate() {
  return (
    <section className={styles.operate} aria-labelledby="operate-title">
      <div className={styles.shell}>
        <div className={styles.operateIntro}>
          <SectionHead
            id="operate-title"
            eyebrow="How we operate"
            title="Built for regulated, real-world data"
            standfirst="How we build for teams that carry compliance, security, and uptime obligations."
          />
          <Parallax amount={22} className={styles.operateVisual}>
            <Image
              src="/media/operate-infra.webp"
              alt="Protected data at the center of a shield, deployable across cloud, on-premise, and edge"
              fill
              sizes="(max-width: 900px) 92vw, 460px"
              className={styles.operateImg}
            />
          </Parallax>
        </div>
        <div className={styles.operateGrid}>
          <dl className={styles.operateList}>
            {OPERATE.map((row) => (
              <Reveal key={row.key}>
                <div className={styles.operateItem}>
                  <dt className={styles.operateKey}>{row.key}</dt>
                  <dd className={styles.operateText}>{row.text}</dd>
                </div>
              </Reveal>
            ))}
            {/* SLOT: certifications (SOC 2 / ISO) when available */}
          </dl>

          <ol className={styles.cadence} aria-label="How an engagement runs">
            {CADENCE.map((c) => (
              <Reveal as="li" key={c.step} className={styles.cadenceStep}>
                <span className={cx(styles.cadenceNo, 'tnum')} aria-hidden="true">{c.step}</span>
                <div>
                  <h3 className={styles.cadenceTitle}>{c.title}</h3>
                  <p className={styles.cadenceText}>{c.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
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
              <h2 id="close-title" className={styles.closeTitle}>Have something to build?</h2>
              <p className={styles.closeLede}>
                Tell us what you are trying to ship. A senior builder reads it and
                replies within one business day.
              </p>
              <Button href="/contact-us" variant="primary">Start a build</Button>
            </div>

            <dl className={styles.closeCoords}>
              {[
                { k: 'Director', v: <a href="mailto:aryan@vruoom.com" className={styles.coordLink}>aryan@vruoom.com</a> },
                { k: 'CTO', v: <a href="mailto:priyanshu@vruoom.com" className={styles.coordLink}>priyanshu@vruoom.com</a> },
                { k: 'Studio', v: 'India, working with teams worldwide' },
                { k: 'Response', v: 'Within one business day' },
                { k: 'Entity', v: 'BuildspaceLabs, a Vruoom company' },
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

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <Hero />
        <ProofStrip />
        <Engagements />
        <Industries />
        <SelectedWork />
        <TravelStudio />
        <Operate />
        <Close />
      </main>
      <Footer />
    </div>
  );
}
