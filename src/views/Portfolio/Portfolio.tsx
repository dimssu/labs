'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Activity, ExternalLink } from 'lucide-react';
import styles from './Portfolio.module.scss';
import ScreenshotFrame from '../../components/ScreenshotFrame/ScreenshotFrame';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  description: string;
  categories: string[];
  status: 'live' | 'prototype';
  metrics: { label: string; value: string }[];
  tags: string[];
  link: string;
  filterCategory: string;
  accent: string;
  coverImage?: string;
  coverAlt?: string;
  coverCaption?: string;
}

const projects: PortfolioProject[] = [
  {
    id: "investor-update-drafter",
    title: "Investor Update Drafter",
    client: "Venture-backed startup (NDA)",
    description: "Pulls live metrics from your stack and drafts a ready-to-send investor update every month. Toggle tone, pick sections, send to your LP list — the average update goes out in under two minutes.",
    categories: ["Founder Tools"],
    status: "live" as const,
    metrics: [{ label: "Drafted in", value: "<2 min" }, { label: "LPs", value: "12+" }],
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    link: "/product/investor-update-drafter",
    filterCategory: "AI Builds",
    accent: "#3b82f6",
    coverImage: "/projects/investor-update-drafter/dashboard.png",
    coverAlt: "Drafted update with tone toggles in the right rail",
    coverCaption: "Concise, detailed, punchy, vulnerable — pick a tone"
  },
  {
    id: "sales-call-coach",
    title: "Sales Call Coach",
    client: "B2B SaaS revenue team (NDA)",
    description: "Records every sales call, transcribes it, and flags the moments that matter — discovery questions that landed, objections raised, talk-ratio drift. Reps get scorecards and 5 coaching clips per week so improvement is measurable.",
    categories: ["Sales AI"],
    status: "live" as const,
    metrics: [{ label: "Annotations / call", value: "11" }, { label: "Calls", value: "16+" }],
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    link: "/product/sales-call-coach",
    filterCategory: "AI Builds",
    accent: "#3b82f6",
    coverImage: "/projects/sales-call-coach/dashboard.png",
    coverAlt: "Rep scorecard with 12-week trend lines for talk ratio and discovery questions",
    coverCaption: "Scorecards with 12-week trends per rep"
  },
  {
    id: "inbox-zero",
    title: "Inbox Zero",
    client: "Productivity SaaS team (NDA)",
    description: "AI email triage that sorts every incoming message into one of five lanes and drafts a tone-matched reply for the ones you'll actually send. A daily debrief shows what got handled, what needs your eye, and how the week is trending.",
    categories: ["Productivity AI"],
    status: "live" as const,
    metrics: [{ label: "Load", value: "~22 min" }, { label: "Auto-handled", value: "6/day" }],
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    link: "/product/inbox-zero",
    filterCategory: "AI Builds",
    accent: "#3b82f6",
    coverImage: "/projects/inbox-zero/dashboard.png",
    coverAlt: "Daily debrief with sent/received/drafted trends and auto-handled list",
    coverCaption: "Daily debrief — what got handled, what needs your eye"
  },
  {
    id: "support-pulse",
    title: "Support Pulse",
    client: "B2B SaaS support team (NDA)",
    description: "Classifies every incoming ticket into AI urgency lanes and drafts a cited reply in your team's tone. Per-agent scorecards surface drift in CSAT, response time, or escalation rate before SLAs slip.",
    categories: ["SaaS Tools"],
    status: "live" as const,
    metrics: [{ label: "Tickets triaged", value: "28+" }, { label: "Tone presets", value: "3" }],
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    link: "/product/support-pulse",
    filterCategory: "AI Builds",
    accent: "#3b82f6",
    coverImage: "/projects/support-pulse/dashboard.png",
    coverAlt: "Per-agent scorecard with 12-week trend lines for response time and CSAT",
    coverCaption: "Scorecards with 12-week trends per agent"
  },
  {
    id: "brief-forge",
    title: "Brief Forge",
    client: "Boutique law firm (NDA)",
    description: "Drop in a contract; the AI extracts 14+ structured fields, scores every clause for risk versus market standard, and proposes redlines with rationale. A 4-hour review becomes a 30-minute one.",
    categories: ["Legal Tech"],
    status: "live" as const,
    metrics: [{ label: "Fields extracted", value: "14+" }, { label: "Redlines", value: "12+" }],
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    link: "/product/brief-forge",
    filterCategory: "AI Builds",
    accent: "#3b82f6",
    coverImage: "/projects/brief-forge/dashboard.png",
    coverAlt: "Clause-by-clause risk grid with red/amber/green badges and market comparison",
    coverCaption: "Every clause scored — high risk, market, or favorable"
  },
  {
    id: "patient-front-desk",
    title: "Patient Front Desk",
    client: "Multi-clinic healthcare group (NDA)",
    description: "Pre-fills patient intake forms from prior charts and insurance databases, suggests scheduling slots by visit type, and runs eligibility checks overnight. The front desk handles exceptions instead of paperwork.",
    categories: ["Healthcare AI"],
    status: "live" as const,
    metrics: [{ label: "Appts/day", value: "18+" }, { label: "AI-handled", value: "78%" }],
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    link: "/product/patient-front-desk",
    filterCategory: "AI Builds",
    accent: "#3b82f6",
    coverImage: "/projects/patient-front-desk/dashboard.png",
    coverAlt: "Calendar view with provider columns and scheduling + insurance verification queues",
    coverCaption: "Calendar + AI-suggested slots, insurance queue, and phone scripts"
  },
  {
    id: "reply-rail",
    title: "Reply Rail",
    client: "Multi-location F&B chain (NDA)",
    description: "Pulls reviews from Google, Yelp, and Facebook into a single queue and drafts a tone-matched reply for every one. Tracks sentiment trends across locations so a small business stays at sub-24h response without writing a word.",
    categories: ["Local Business AI"],
    status: "live" as const,
    metrics: [{ label: "Reviews queued", value: "25+" }, { label: "Locations", value: "6" }],
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    link: "/product/reply-rail",
    filterCategory: "AI Builds",
    accent: "#3b82f6",
    coverImage: "/projects/reply-rail/dashboard.png",
    coverAlt: "Sentiment dashboard with platform rating cards, themes, and 12-week trends",
    coverCaption: "Sentiment trends across Google, Yelp, and Facebook"
  },
  {
    id: "sanad",
    title: "AI Clinical Notes",
    client: "Private Hospital (NDA)",
    description: "AI medical scribe that listens to consultations and writes structured clinical notes in seconds. Built for busy specialists across multiple languages — currently saving 80% of documentation time per encounter.",
    categories: ["Healthcare AI"],
    status: "live" as const,
    metrics: [{ label: "Doc Time", value: "-80%" }, { label: "Notes", value: "Instant" }],
    tags: ["Python", "Next.js", "OpenAI Whisper"],
    link: "/product/sanad",
    filterCategory: "AI Builds",
    accent: "#3b82f6",
    coverImage: "/projects/sanad/dashboard.png",
    coverAlt: "Clinical Notes dashboard — Welcome back, Mara",
    coverCaption: "Today view — encounters, drafts, schedule"
  },
  {
    id: "charge-pulse",
    title: "Charge Pulse",
    client: "Leading EV Charging Network",
    description: "Live EV charging station finder with real-time connector availability, voice-guided turn-by-turn navigation, and offline map tiles. Cut customer support tickets by 60% by surfacing the right station before drivers arrive.",
    categories: ["EV", "Logistics"],
    status: "live" as const,
    metrics: [{ label: "Availability", value: "Real-Time" }, { label: "Support Tickets", value: "-60%" }],
    tags: ["Next.js", "React", "Flutter"],
    link: "/product/charge-pulse",
    filterCategory: "Mobile",
    accent: "#3b82f6",
    coverImage: "/projects/charge-pulse/dashboard.png",
    coverAlt: "ChargePulse trip planner with charging stops along the route",
    coverCaption: "Trip planner — charge stops, ETA, and pre-conditioning"
  },
  {
    id: "grospace",
    title: "AI Lease Management",
    client: "GroSpace Global",
    description: "AI lease management for multi-brand retail operators with 50–500+ outlets. Extracts 60+ fields from lease PDFs (text and scanned), tracks every obligation, and answers portfolio questions in natural language.",
    categories: ["Real Estate", "AI Extraction"],
    status: "live" as const,
    metrics: [{ label: "Extracted Fields", value: "60+" }, { label: "API Endpoints", value: "48" }],
    tags: ["Next.js", "FastAPI", "Gemini 2.5 Pro"],
    link: "/product/grospace",
    filterCategory: "Web",
    accent: "#3b82f6",
    coverImage: "/projects/grospace/dashboard.png",
    coverAlt: "Grospace deal Kanban board with 14 deals across 4 stages",
    coverCaption: "Pipeline view — $182M across 14 deals in 4 stages"
  }
];

const filters = ['All', 'AI Builds', 'Web', 'Mobile'];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.filterCategory === activeFilter);

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        {/* Hero */}
        <section className={styles.heroSection}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className={styles.heroContent}
            >
              <span className={styles.monoLabel}>{'// the work'}</span>
              <h1 className={styles.pageTitle}>
                Real products.<br />
                <span className={styles.gradientText}>Real clients. In production.</span>
              </h1>
              <p className={styles.pageSubtitle}>
                Real products built for real teams — from client engagements to shipped MVPs. Click any card to read the deep-dive: architecture, decisions, what shipped.
              </p>

              <div className={styles.heroMeta}>
                <span className={styles.heroMetaItem}>
                  <span className={styles.heroMetaDot} aria-hidden="true" />
                  {projects.length} shipped
                </span>
                <span className={styles.heroMetaDivider} aria-hidden="true" />
                <span className={styles.heroMetaItem}>
                  Across healthcare, logistics, real estate, sales and ops
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter + Grid */}
        <section className={`container ${styles.portfolioSection}`}>
          <motion.div
            className={styles.filtersWrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {filters.map(f => (
              <button
                key={f}
                className={`${styles.filterBtn} ${activeFilter === f ? styles.active : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
                {f !== 'All' && (
                  <span className={styles.filterCount}>
                    {f === 'All' ? projects.length : projects.filter(p => p.filterCategory === f).length}
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          <motion.div layout className={styles.grid}>
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={project.link}
                    className={styles.card}
                    style={{ '--card-accent': project.accent } as React.CSSProperties}
                  >
                    {project.coverImage && (
                      <div className={styles.cardCover}>
                        <ScreenshotFrame
                          seamless
                          src={project.coverImage}
                          alt={project.coverAlt ?? project.title}
                          routeLabel={project.coverImage.split('/').pop()!.replace('.png', '')}
                          aspect="16 / 10"
                          sizes="(max-width: 768px) 100vw, 360px"
                        />
                      </div>
                    )}

                    {/* Card top */}
                    <div className={styles.cardTop}>
                      <div className={styles.categoryRow}>
                        {project.categories.map(c => (
                          <span key={c} className={styles.categoryChip}>{c}</span>
                        ))}
                      </div>
                      <span className={`${styles.statusBadge} ${styles.live}`}>
                        <Activity size={10} className={styles.blink} />
                        Shipped
                      </span>
                    </div>

                    {/* Title */}
                    <div className={styles.titleRow}>
                      <h3 className={styles.title}>{project.title}</h3>
                      <ExternalLink size={18} className={styles.icon} />
                    </div>
                    <p className={styles.client}>{project.client}</p>
                    <p className={styles.description}>{project.description}</p>

                    {/* Metrics */}
                    <div className={styles.metricsRow}>
                      {project.metrics.map((m, i) => (
                        <div key={i} className={styles.metric}>
                          <span className={styles.metricValue} style={{ color: project.accent }}>{m.value}</span>
                          <span className={styles.metricLabel}>{m.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className={styles.tags}>
                      {project.tags.map(t => (
                        <span key={t} className={styles.tag}>{t}</span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
