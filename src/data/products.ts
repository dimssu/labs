export interface Product {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  categories: string[];
  status: 'live' | 'prototype';
  overview: string;
  features: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  coverImage?: { src: string; alt: string; caption: string };
  /** 3 punchy bullets, the standout / magic-moments. Distinct from `features` (functional). */
  highlights?: string[];
  /** Multi-image visual proof. 1-3 captioned screenshots shown as a gallery section. */
  gallery?: { src: string; alt: string; caption: string }[];
  /** Optional short narrative on engagement context (timeline, scope, role). Renders as a small block in the hero strip. */
  engagement?: { duration: string; scope: string; team: string };
  /** Optional concrete client outcomes, stronger framing than `metrics` chips, rendered as a bullet list. */
  outcomes?: string[];
}

export const productsData: Record<string, Product> = {
  "sanad": {
    id: "sanad",
    title: "AI Clinical Notes",
    subtitle: "AI-powered medical scribe that listens to doctor-patient conversations and writes clinical notes automatically.",
    client: "Private Hospital (NDA)",
    categories: ["Healthcare AI"],
    status: "live",
    overview: "An AI medical scribe built for busy clinicians. It listens to consultations in real time, understands medical context, and generates ready-to-use clinical documentation, so doctors can focus on patients instead of paperwork.",
    features: [
      "Hands-free note-taking during patient consultations",
      "Structured clinical notes generated in seconds",
      "Works across specialties and languages",
      "Secure and compliant by design",
      "Integrates with existing hospital workflows"
    ],
    techStack: ["Python", "Next.js", "OpenAI Whisper", "GPT-4", "PostgreSQL"],
    metrics: [
      { label: "Doc Time Saved", value: "80%" },
      { label: "Notes", value: "Instant" }
    ],
    coverImage: {
      src: "/projects/sanad/landing.png",
      alt: "Clinical Notes, landing page with citation-linked SOAP draft preview",
      caption: "Clinical documentation that writes itself, every sentence cited to the conversation"
    }
  ,
    highlights: [
      "Real-time transcription with speaker identification across multiple languages",
      "Specialty-aware SOAP note generation in seconds",
      "EHR integration without breaking the doctor's workflow",
    ],
    gallery: [
      {
        src: "/projects/sanad/landing.png",
        alt: "Sanad landing page with citation-linked SOAP draft preview",
        caption: "Landing, citation-linked SOAP draft preview"
      },
      {
        src: "/projects/sanad/dashboard.png",
        alt: "Sanad clinical dashboard for Mara",
        caption: "Dashboard, encounters, drafts, schedule"
      },
    ],
    engagement: {
      duration: "12 weeks",
      scope: "Discovery → MVP → pilot deployment",
      team: "1 PM + 2 engineers + 1 designer"
    },
    outcomes: [
      "80% reduction in documentation time per encounter",
      "Doctors finishing notes within the patient visit, not after-hours",
      "Successfully piloted across internal medicine, paediatrics, and ortho",
    ]
  },
  "focuscare": {
    id: "focuscare",
    title: "Focuscare",
    subtitle: "End-to-end physiotherapy consultation automation: patient onboarding to AI-generated notes and follow-up scheduling.",
    client: "Physiotherapy Clinic",
    categories: ["Healthcare AI"],
    status: "live",
    overview: "One-click consultation start. OpenAI Whisper for real-time transcription, GPT-4 for structured clinical notes, automated appointment reminders from treatment plans.",
    features: [
      "Client-side audio via WebSocket to Python backend running Whisper",
      "Real-time transcript with speaker identification",
      "GPT-4 with physiotherapy-specific prompts for SOAP format notes",
      "Treatment plans trigger appointment workflows automatically",
      "Multi-channel reminders (SMS + email), missed appointment detection"
    ],
    techStack: ["Python", "OpenAI Whisper", "GPT-4", "React", "FastAPI"],
    metrics: [
      { label: "Consultation Start", value: "1-click" },
      { label: "Format", value: "SOAP Notes" }
    ]
  },
  "dsv-fleet-management": {
    id: "dsv-fleet-management",
    title: "DSV Fleet Management",
    subtitle: "Real-time fleet tracking and dispatching platform with full visibility over every vehicle, driver, and route.",
    client: "Leading Logistics Operator",
    categories: ["Logistics"],
    status: "live",
    overview: "Three-layer platform: web dashboard (live map), optimization engine (route planning), mobile driver app (field communication). Real-time GPS, geofencing, intelligent dispatching, fleet analytics.",
    features: [
      "GPS at 15s intervals via driver app with Firebase Realtime Database",
      "Google Maps with custom markers, geofence polygons with entry/exit events",
      "Traffic-aware routing with vehicle capacity and time windows",
      "Fleet performance dashboards, fuel monitoring, driver behavior scoring",
      "Maintenance scheduling by mileage and engine-hours"
    ],
    techStack: ["Next.js", "React", "Flutter", "Firebase", "Google Maps API"],
    metrics: [
      { label: "GPS Update", value: "15s" },
      { label: "Support Tickets", value: "-60%" }
    ]
  },
  "charge-pulse": {
    id: "charge-pulse",
    title: "Charge Pulse",
    subtitle: "Real-time EV charging station finder with GPS navigation, live availability, and traffic-aware routing.",
    client: "Leading EV Charging Network",
    categories: ["EV", "Logistics"],
    status: "live",
    overview: "Station finder aggregating connector types, speeds, live availability, user reviews. Web app + Flutter mobile app with voice-guided navigation and offline map caching.",
    features: [
      "OCPP backend providing real-time connector status",
      "Google Maps for geospatial queries with filters for CCS, CHAdeMO, Type 2",
      "Traffic-aware routing via Directions API",
      "Mobile: voice-guided turn-by-turn, offline tile caching",
      "Charging session history with cost/kWh tracking, user reviews"
    ],
    techStack: ["Next.js", "React", "Flutter", "OCPP", "Google Maps API"],
    metrics: [
      { label: "Availability", value: "Real-Time" },
      { label: "Support Tickets", value: "-60%" }
    ],
    coverImage: {
      src: "/projects/charge-pulse/hero.png",
      alt: "ChargePulse map view with pulsing station markers across the SF Bay Area",
      caption: "Live availability across 13 Bay Area stations, pulsing markers show active charging"
    }
  ,
    highlights: [
      "OCPP-backed live connector status across CCS, CHAdeMO, Tesla NACS",
      "Traffic-aware routing with Google Directions API",
      "Voice-guided turn-by-turn with offline tile caching",
    ],
    gallery: [
      {
        src: "/projects/charge-pulse/hero.png",
        alt: "Charge Pulse map view with pulsing station markers",
        caption: "Map view, live availability across the Bay Area"
      },
      {
        src: "/projects/charge-pulse/dashboard.png",
        alt: "Trip planner with charging stops along the route",
        caption: "Trip planner, charge stops, ETA, pre-conditioning"
      },
      {
        src: "/projects/charge-pulse/detail.png",
        alt: "Station detail with chargers, amenities, and recent activity",
        caption: "Station detail, chargers, amenities, recent activity"
      },
    ],
    engagement: {
      duration: "10 weeks",
      scope: "Web app + Flutter mobile, offline-first",
      team: "1 PM + 2 engineers + 1 designer"
    },
    outcomes: [
      "60% reduction in support tickets after launch",
      "Real-time station availability across the operator's network",
      "Drivers reaching the right charger on the first try",
    ]
  },
  "food-ordering-platform": {
    id: "food-ordering-platform",
    title: "Low Latency Food Ordering Platform",
    subtitle: "Unified events operations platform: vendor management, order tracking, payments, automated settlements.",
    client: "Event Hospitality Client",
    categories: ["Marketplace"],
    status: "live",
    overview: "8 modules: Events, Vendors, Orders, Payments, Settlements, Reports, Users, Audit Log. Real-time Firebase dashboard. Automated settlement calculations. Full audit trail with role-based access.",
    features: [
      "Live metrics via Firebase listeners: revenue, events, vendors, settlements",
      "Configurable commission rates per vendor/event/category",
      "Multi-currency support, tax computation, invoice generation",
      "RBAC: Admin, Finance, Event Manager, Vendor, Read-Only"
    ],
    techStack: ["React", "Firebase", "Node.js", "Stripe", "PostgreSQL"],
    metrics: [
      { label: "Modules", value: "8" },
      { label: "Access Roles", value: "5" }
    ]
  },
  "open-vision-ppe": {
    id: "open-vision-ppe",
    title: "Open Vision PPE Monitoring",
    subtitle: "Boundary surveillance, PPE compliance monitoring, and intrusion detection via real-time video analytics. Runs fully on-premise, no cloud required.",
    client: "Industrial Safety Client",
    categories: ["Safety & Compliance"],
    status: "live",
    overview: "Desktop application powered by open vision models. PPE detection (helmet, vest), restricted zone monitoring, person tracking with IN/OUT counting. All data in SQLite. Daily PDF + Excel reports auto-emailed. No cloud, no servers, no internet required.",
    features: [
      "YOLOv8n Person Detection at 320x320, 50% confidence threshold",
      "ByteTrack multi-person tracking with IoU and 30-frame history",
      "PPE compliance check + zone violation detection",
      "InsightFace 512-dim embeddings for face recognition",
      "Direction counting (IN/OUT) with live bounding boxes",
      "SQLite storage, PDF/Excel reports, SMTP email delivery"
    ],
    techStack: ["Python", "YOLOv8", "ByteTrack", "InsightFace", "SQLite"],
    metrics: [
      { label: "Confidence", value: "50%+" },
      { label: "Cloud Required", value: "None" }
    ]
  },
  "factory-os": {
    id: "factory-os",
    title: "Factory OS",
    subtitle: "Production planning and task management for Adidas, Nike, Reebok, replacing Excel with automated milestone planning, SOP gate enforcement, and real-time visibility.",
    client: "Apparel Manufacturing (Adidas, Nike, Reebok)",
    categories: ["Manufacturing"],
    status: "live",
    overview: "Full-stack production planning system with dual-track milestone engine (date-triggered + event-triggered), 9 mandatory SOP quality gates, capacity simulation with what-if scenarios, Gantt chart visualization, and role-adaptive dashboards. Seeded with 295 real production orders across 9 departments.",
    features: [
      "Dual-track milestone engine: Track A (CRD offset dates) + Track B (event-triggered by GRN receipt)",
      "9 mandatory pre-cutting SOP quality gates with evidence uploads and override tracking",
      "Capacity engine: production day calculation, LPCD computation, what-if simulation with overtime",
      "Custom Gantt chart, FullCalendar integration, Kanban + table task views",
      "14 routes, 31+ API endpoints, Excel import via SheetJS, Recharts analytics",
      "GitHub Actions CI: lint, typecheck, test, build"
    ],
    techStack: ["Next.js", "PostgreSQL", "Prisma", "SheetJS", "Recharts"],
    metrics: [
      { label: "Live Orders", value: "295+" },
      { label: "API Endpoints", value: "31+" }
    ]
  },
  "grospace": {
    id: "grospace",
    title: "AI Lease Management",
    subtitle: "AI-powered commercial real estate lease management for multi-brand operators, automates lease data extraction, obligation tracking, and portfolio intelligence.",
    client: "GroSpace Global",
    categories: ["Real Estate", "AI Extraction"],
    status: "live",
    overview: "Full-stack lease management platform for multi-brand retail operators (50-500+ outlets). AI extracts 60+ structured fields from lease PDFs via Gemini 2.5 Pro (text and vision modes). Confirm & Activate flow auto-creates outlets, obligations, alerts, and payment schedules.",
    features: [
      "AI extraction of 60+ lease fields from text and scanned PDFs via Gemini 2.5 Pro",
      "Confirm & Activate flow: auto-generates outlets, obligations, alerts, and payment records",
      "6-stage deal pipeline with drag-and-drop Kanban board",
      "Smart AI chat for natural language portfolio queries",
      "Payment generation with escalation support across 4 rent models",
      "Notification routing: Resend (email) + MSG91 (WhatsApp) per alert type"
    ],
    techStack: ["Next.js", "FastAPI", "Supabase", "Gemini 2.5 Pro", "PostgreSQL"],
    metrics: [
      { label: "Extracted Fields", value: "60+" },
      { label: "API Endpoints", value: "48" }
    ],
    coverImage: {
      src: "/projects/grospace/hero.png",
      alt: "Grospace lease extraction split-pane with confidence-scored clause extraction",
      caption: "Every clause cited to its source, 16 extracted fields with confidence scores"
    }
  ,
    highlights: [
      "60+ field extraction from lease PDFs (text and scanned) via Gemini 2.5 Pro",
      "Confirm & Activate auto-creates outlets, obligations, alerts, and payment schedules",
      "Smart AI chat for natural-language portfolio queries with inline charts",
    ],
    gallery: [
      {
        src: "/projects/grospace/hero.png",
        alt: "Lease extraction split-pane with confidence-scored fields",
        caption: "Extraction, every clause cited to its source"
      },
      {
        src: "/projects/grospace/dashboard.png",
        alt: "Deal Kanban board across four stages",
        caption: "Pipeline, deals across Sourcing, LOI, Diligence, Closed"
      },
      {
        src: "/projects/grospace/detail.png",
        alt: "AI portfolio chat with inline bar chart",
        caption: "Portfolio chat, natural-language queries with citations"
      },
    ],
    engagement: {
      duration: "16 weeks",
      scope: "Full-stack platform, FastAPI backend + Next.js frontend",
      team: "1 PM + 3 engineers + 1 designer"
    },
    outcomes: [
      "Lease processing time cut from days to minutes per document",
      "Single source of truth across 50 to 500+ retail outlets",
      "Active rollout across multi-brand portfolios",
    ]
  },
  "ai-native-real-estate-fund": {
    id: "ai-native-real-estate-fund",
    title: "AI-Native Real Estate Fund",
    subtitle: "4 AI agents handle deal scouting, underwriting, outreach, and structuring across distressed properties and land parcels.",
    client: "Bethun Bhowmik (ex-Oracle, ex-Amazon, ex-Ola)",
    categories: ["Real Estate"],
    status: "live",
    overview: "4 AI agents powering a Scout → Underwrite → Outreach → Deal Structure pipeline. 13-rule distress detection engine. XGBoost ML scoring (0-100%). Claude underwriting agent generates Buy/Pass/Watch briefs. 3D Mapbox with Street View popups.",
    features: [
      "3 parallel data providers: ATTOM (8 API endpoints), RESO MLS (OData client), Probate (signal-based detection)",
      "13-rule distress classification across 2 tiers",
      "XGBoost on Flask for distress scoring (11 features)",
      "Claude agents for underwriting briefs and deal structuring from 9-strategy library",
      "3D Mapbox with Street View popups",
      "Subscription tier gating across SFR, multifamily, commercial, and land"
    ],
    techStack: ["Python", "Claude", "XGBoost", "Mapbox", "Flask", "ATTOM API"],
    metrics: [
      { label: "AI Agents", value: "4" },
      { label: "Distress Rules", value: "13" }
    ]
  },
  "ai-job-automation": {
    id: "ai-job-automation",
    title: "Captcha-Resilient ATS Agent",
    subtitle: "AI-powered job application automation platform that auto-applies across Lever, Greenhouse, and Workday with a 5-tier CAPTCHA bypass stack.",
    client: "Internal SaaS Product",
    categories: ["HR & Recruiting"],
    status: "live",
    overview: "5-tier CAPTCHA bypass with multi-ATS automation. Stealth Chromium with Chrome runtime spoofing, WebGL/Canvas fingerprint masking, and 150+ anti-detection scripts. Human behavior simulation (random delays, natural mouse movements, typing patterns).",
    features: [
      "Tier 1: Chromium + stealth + profile reuse (~40% pass rate)",
      "Tier 2: Firefox fallback (~30%)",
      "Tier 3: 2Captcha solver at $0.003/solve (~95%)",
      "Tier 4: Bright Data scraping browser at ~$0.10 (~99%)",
      "Tier 5: Manual review (100%)",
      "Abstract base adapter with smart form-filling utilities, error classification, and screenshot capture"
    ],
    techStack: ["Python", "Playwright", "Chromium", "2Captcha", "Bright Data"],
    metrics: [
      { label: "ATS Platforms", value: "3+" },
      { label: "Success Rate", value: "99%" }
    ]
  },
  "investor-update-drafter": {
    id: "investor-update-drafter",
    title: "Investor Update Drafter",
    subtitle: "AI-drafted monthly investor updates that write themselves from your live metrics, tone toggles, send history, one-click delivery.",
    client: "Venture-backed startup (NDA)",
    categories: ["Founder Tools"],
    status: "live",
    overview: "Pulls live metrics from your stack and drafts a ready-to-send investor update every month. Toggle tone (Concise, Detailed, Punchy, Vulnerable), pick which sections matter, send to your LP list, all in under two minutes.",
    features: [
      "Auto-drafted monthly updates from live metrics",
      "Tone presets: Concise, Detailed, Punchy, Vulnerable",
      "Section toggles: Highlights, Lowlights, Asks, Hiring",
      "Send history with open rates and reply tracking",
      "Recipient management with avatar pile and segments"
    ],
    techStack: ["Next.js", "Tailwind", "Framer Motion", "TypeScript"],
    metrics: [
      { label: "Drafted in", value: "<2 min" },
      { label: "LPs reached", value: "12+" }
    ],
    coverImage: {
      src: "/projects/investor-update-drafter/hero.png",
      alt: "Metrics dashboard with sparklines and a draft this month's update CTA",
      caption: "Six metrics, six sparklines, one button, draft starts from the dashboard"
    }
  ,
    highlights: [
      "Auto-drafted from live metrics in under 2 minutes",
      "Tone presets, Concise, Detailed, Punchy, Vulnerable",
      "Send history with open rates and reply tracking",
    ],
    gallery: [
      {
        src: "/projects/investor-update-drafter/hero.png",
        alt: "Metrics dashboard with sparklines and CTA",
        caption: "Dashboard, six metrics, sparklines, draft-this-month CTA"
      },
      {
        src: "/projects/investor-update-drafter/dashboard.png",
        alt: "Drafted update with tone toggles in the right rail",
        caption: "Draft view, tone presets, section toggles, recipient list"
      },
      {
        src: "/projects/investor-update-drafter/detail.png",
        alt: "Send history table with detail panel",
        caption: "History, past updates with open rates and replies"
      },
    ],
    engagement: {
      duration: "6 weeks",
      scope: "Frontend MVP for a portfolio of LP communications",
      team: "1 PM + 1 engineer + 1 designer"
    },
    outcomes: [
      "Founder time on monthly updates dropped from 2 hours to under 15 minutes",
      "LP open rates above 90% across the first three months",
      "Recipient management absorbed into the same workflow",
    ]
  },
  "sales-call-coach": {
    id: "sales-call-coach",
    title: "Sales Call Coach",
    subtitle: "Gong-style call review with AI-flagged moments, transcripts, and rep scorecards, coaching at the speed of sales.",
    client: "B2B SaaS revenue team (NDA)",
    categories: ["Sales AI"],
    status: "live",
    overview: "Records every sales call, transcribes it, and flags key moments, discovery questions that landed, objections raised, talk-ratio drift. Reps get scorecards and 5 coaching clips per week so they actually improve.",
    features: [
      "Auto-transcribed calls with speaker diarization",
      "AI annotations: discovery hits, objections, filler words, talkovers",
      "Rep scorecards with 12-week trends",
      "Coaching clips queue per rep",
      "Talk ratio, sentiment, and call score on every call"
    ],
    techStack: ["Next.js", "Tailwind", "Framer Motion", "TypeScript"],
    metrics: [
      { label: "Annotations / call", value: "11" },
      { label: "Calls reviewed", value: "16" }
    ],
    coverImage: {
      src: "/projects/sales-call-coach/hero.png",
      alt: "Sales call queue with talk ratios, sentiment chips, and AI scores across 16 calls",
      caption: "Every call scored, sorted, and ready for review"
    }
  ,
    highlights: [
      "Auto-flagged moments, discovery hits, objections, filler words, talkovers",
      "Per-rep scorecards with 12-week trend lines and 5 coaching clips per week",
      "Talk ratio, sentiment, and call score on every call",
    ],
    gallery: [
      {
        src: "/projects/sales-call-coach/hero.png",
        alt: "Call queue with talk ratios, sentiment, and AI scores",
        caption: "Queue, every call scored and ready for review"
      },
      {
        src: "/projects/sales-call-coach/dashboard.png",
        alt: "Rep scorecard with 12-week trend lines",
        caption: "Scorecard, 12-week trends per rep"
      },
      {
        src: "/projects/sales-call-coach/detail.png",
        alt: "Transcript with inline AI annotations",
        caption: "Transcript, AI-flagged moments with summary rail"
      },
    ],
    engagement: {
      duration: "8 weeks",
      scope: "Frontend MVP for a B2B SaaS revenue org",
      team: "1 PM + 2 engineers + 1 designer"
    },
    outcomes: [
      "Coaching cadence shifted from quarterly to weekly per rep",
      "Discovery question hit-rate measured per call instead of per quarter",
      "Manager review time per rep cut by half",
    ]
  },
  "inbox-zero": {
    id: "inbox-zero",
    title: "Inbox Zero",
    subtitle: "AI email triage that gets you to inbox zero by lunch, smart lanes, drafted replies, and a daily debrief.",
    client: "Productivity SaaS team (NDA)",
    categories: ["Productivity AI"],
    status: "live",
    overview: "Classifies every incoming email into AI lanes (To-do, Awaiting reply, FYI, Newsletter, Promotional), drafts replies in your tone, and gives you a one-screen debrief at the end of the day. Pause anytime.",
    features: [
      "AI lanes: To-do, Awaiting reply, FYI, Newsletter, Promotional",
      "One-click drafted replies with tone presets",
      "Inline citations: why each draft says what it says",
      "Daily debrief with sent/received/drafted trends",
      "Auto-archive with full audit trail"
    ],
    techStack: ["Next.js", "Tailwind", "Framer Motion", "TypeScript"],
    metrics: [
      { label: "Inbox load", value: "~22 min" },
      { label: "Auto-handled", value: "6/day" }
    ],
    coverImage: {
      src: "/projects/inbox-zero/hero.png",
      alt: "Smart inbox three-pane layout with AI-classified lanes and suggested actions",
      caption: "Five lanes, one-click drafts, inbox zero by lunch"
    }
  ,
    highlights: [
      "AI lanes, To-do, Awaiting reply, FYI, Newsletter, Promotional",
      "One-click drafted replies with tone presets and inline citations",
      "Daily debrief with sent/received/drafted trends and auto-handled audit",
    ],
    gallery: [
      {
        src: "/projects/inbox-zero/hero.png",
        alt: "Three-pane smart inbox with AI lanes",
        caption: "Smart inbox, five lanes with suggested actions"
      },
      {
        src: "/projects/inbox-zero/dashboard.png",
        alt: "Daily debrief with trends and auto-handled list",
        caption: "Debrief, what got handled, what needs your eye"
      },
      {
        src: "/projects/inbox-zero/detail.png",
        alt: "Email thread with drafted reply and citations",
        caption: "Thread, drafted reply with 'why this reply' citations"
      },
    ],
    engagement: {
      duration: "8 weeks",
      scope: "Frontend MVP for a productivity team's internal use",
      team: "1 PM + 2 engineers + 1 designer"
    },
    outcomes: [
      "Average inbox-zero time pulled forward to before lunch",
      "6 emails per day handled fully autonomously per user",
      "Daily debrief replaces the manual end-of-day inbox sweep",
    ]
  },
  "support-pulse": {
    id: "support-pulse",
    title: "Support Pulse",
    subtitle: "AI ticket triage and drafted replies for SaaS support teams, cut first response time and stop SLA leaks.",
    client: "B2B SaaS support team (NDA)",
    categories: ["SaaS Tools"],
    status: "live",
    overview: "Classifies every incoming ticket into AI-driven urgency lanes (Fire / High / Normal / Low / Auto-resolved), drafts a cited reply in your team's tone, and tracks per-agent scorecards so you can spot drift before SLAs slip.",
    features: [
      "AI urgency lanes with auto-resolution for repeat low-stakes tickets",
      "Drafted replies with three tone presets and KB citations",
      "Per-agent scorecards: first response, resolution, CSAT, escalation rate",
      "12-week trend lines per metric with coaching moments",
      "Customer context sidebar: plan tier, MRR, account age, recent tickets"
    ],
    techStack: ["Next.js", "Tailwind", "Framer Motion", "TypeScript"],
    metrics: [
      { label: "Tickets triaged", value: "28+" },
      { label: "Tone presets", value: "3" }
    ],
    coverImage: {
      src: "/projects/support-pulse/hero.png",
      alt: "Support Pulse triage inbox with 28 tickets across 5 AI-classified urgency lanes",
      caption: "Five lanes, drafted replies, scorecards, every ticket has a next step"
    }
  ,
    highlights: [
      "AI urgency lanes with auto-resolution for repeat low-stakes tickets",
      "Drafted replies with KB citations and three tone presets",
      "Per-agent scorecards with 12-week trend lines and coaching moments",
    ],
    gallery: [
      {
        src: "/projects/support-pulse/hero.png",
        alt: "Triage inbox with 28 tickets across five AI lanes",
        caption: "Triage inbox, five lanes with SLA-at-risk surfacing"
      },
      {
        src: "/projects/support-pulse/dashboard.png",
        alt: "Per-agent scorecard with 12-week trend lines",
        caption: "Team scorecard, 12-week trends per agent"
      },
      {
        src: "/projects/support-pulse/detail.png",
        alt: "Ticket detail with cited drafted reply",
        caption: "Ticket detail, drafted reply with KB citations"
      },
    ],
    engagement: {
      duration: "8 weeks",
      scope: "Frontend MVP for a B2B SaaS support org",
      team: "1 PM + 2 engineers + 1 designer"
    },
    outcomes: [
      "First response time targeted under 15 minutes across all tiers",
      "Auto-resolution for repeat low-stakes tickets removed roughly 30% of L1 volume",
      "Per-agent CSAT drift caught before SLAs slipped",
    ]
  },
  "brief-forge": {
    id: "brief-forge",
    title: "Brief Forge",
    subtitle: "Contract review AI for solo lawyers and small firms, extract, score, and redline contracts in minutes.",
    client: "Boutique law firm (NDA)",
    categories: ["Legal Tech"],
    status: "live",
    overview: "Drop in a contract; the AI extracts 14+ structured fields with confidence scores, scores every clause for risk vs market standard, and proposes redlines with rationale, so a 4-hour review becomes a 30-minute one.",
    features: [
      "14+ structured field extraction with confidence rings and source citations",
      "Clause-by-clause risk grid with market-standard comparisons",
      "AI-suggested redlines with inline diffs, rationale, and approve/reject UI",
      "Posture chips: Unusual / Market / Favorable to client",
      "Pipeline view of all firm matters in one sidebar"
    ],
    techStack: ["Next.js", "Tailwind", "Framer Motion", "TypeScript"],
    metrics: [
      { label: "Extracted fields", value: "14+" },
      { label: "Redlines suggested", value: "12+" }
    ],
    coverImage: {
      src: "/projects/brief-forge/hero.png",
      alt: "Contract extraction split-pane with 14+ confidence-scored fields and click-to-source",
      caption: "Every field cited to its source clause, confidence rings flag what to verify"
    }
  ,
    highlights: [
      "14+ structured field extraction with confidence rings and source citations",
      "Clause risk grid, Unusual / Market / Favorable to client",
      "AI-suggested redlines with rationale and approve/reject UI",
    ],
    gallery: [
      {
        src: "/projects/brief-forge/hero.png",
        alt: "Contract extraction split-pane with confidence-scored fields",
        caption: "Extraction, fields cited to their source clause"
      },
      {
        src: "/projects/brief-forge/dashboard.png",
        alt: "Clause-by-clause risk grid",
        caption: "Risk grid, Unusual / Market / Favorable per clause"
      },
      {
        src: "/projects/brief-forge/detail.png",
        alt: "Redline view with inline diffs and approve/reject",
        caption: "Redlines, AI-suggested edits with rationale"
      },
    ],
    engagement: {
      duration: "6 weeks",
      scope: "Frontend MVP for a boutique law firm's contract intake",
      team: "1 PM + 2 engineers + 1 designer"
    },
    outcomes: [
      "First-pass review compressed from 4 hours to 30 minutes per contract",
      "Risk-flagged clauses caught at intake, before partner review",
      "Redline approvals tracked per matter for client reporting",
    ]
  },
  "patient-front-desk": {
    id: "patient-front-desk",
    title: "Patient Front Desk",
    subtitle: "AI receptionist for clinics, auto intake, smart scheduling, and insurance verification before the patient walks in.",
    client: "Multi-clinic healthcare group (NDA)",
    categories: ["Healthcare AI", "Operations"],
    status: "live",
    overview: "Pre-fills patient intake forms from prior charts and insurance databases, suggests scheduling slots based on visit type and provider availability, and runs eligibility checks overnight, so the front desk handles exceptions instead of paperwork.",
    features: [
      "Auto-filled intake with confidence rings and 'verified by patient' badges",
      "Today's waiting room dashboard with status and SLA-at-risk surfacing",
      "Insurance verification queue with AI-drafted phone scripts for tricky calls",
      "Calendar view across providers with AI-suggested slots",
      "Per-patient AI summary pulling from prior history"
    ],
    techStack: ["Next.js", "Tailwind", "Framer Motion", "TypeScript"],
    metrics: [
      { label: "Appointments / day", value: "18+" },
      { label: "AI-handled", value: "14/18" }
    ],
    coverImage: {
      src: "/projects/patient-front-desk/hero.png",
      alt: "Today's waiting room with 18 appointments, AI-handled stats, and exception queue",
      caption: "AI handled 14 of 18 today, front desk only touches exceptions"
    }
  ,
    highlights: [
      "Auto-filled intake from prior charts and insurance databases",
      "AI-suggested scheduling slots by visit type and provider availability",
      "Insurance verification queue with AI-drafted phone scripts for tricky calls",
    ],
    gallery: [
      {
        src: "/projects/patient-front-desk/hero.png",
        alt: "Today's waiting room dashboard with appointments and exceptions",
        caption: "Waiting room, 18 appointments, AI-handled stats, exceptions"
      },
      {
        src: "/projects/patient-front-desk/dashboard.png",
        alt: "Calendar with provider columns and scheduling queues",
        caption: "Calendar, providers, scheduling, insurance queue"
      },
      {
        src: "/projects/patient-front-desk/detail.png",
        alt: "Patient detail with auto-filled intake and confidence rings",
        caption: "Patient detail, auto-filled intake with AI summary"
      },
    ],
    engagement: {
      duration: "10 weeks",
      scope: "Frontend MVP for a multi-clinic group's front-desk operations",
      team: "1 PM + 2 engineers + 1 designer"
    },
    outcomes: [
      "Front-desk time per patient cut by ~70%, paperwork done before they arrive",
      "Insurance denials caught the day before, not at check-in",
      "78% of intake handled fully autonomously",
    ]
  },
  "reply-rail": {
    id: "reply-rail",
    title: "Reply Rail",
    subtitle: "AI-drafted Google, Yelp, and Facebook review responses for local businesses, one queue, one click.",
    client: "Multi-location F&B chain (NDA)",
    categories: ["Local Business AI"],
    status: "live",
    overview: "Pulls reviews from Google, Yelp, and Facebook into a single queue, drafts a tone-matched reply for every one, and tracks sentiment trends across locations, so a small business owner stays at under-24h response time without writing a word.",
    features: [
      "Unified inbox with AI urgency lanes (Urgent / Reply soon / Auto-thanked / Quiet)",
      "Drafted replies with three tone presets and platform character limits",
      "Themes panel: AI-extracted topics with sentiment-colored bars",
      "12-week multi-platform rating trend chart",
      "Per-location scorecard with top complaint and top compliment"
    ],
    techStack: ["Next.js", "Tailwind", "Framer Motion", "TypeScript"],
    metrics: [
      { label: "Reviews queued", value: "25+" },
      { label: "Locations", value: "6" }
    ],
    coverImage: {
      src: "/projects/reply-rail/hero.png",
      alt: "Three-platform reviews inbox with 25+ reviews across four AI urgency lanes",
      caption: "Google, Yelp, and Facebook in one inbox, drafted replies for every one"
    }
  ,
    highlights: [
      "Unified inbox, Google, Yelp, and Facebook reviews in one queue",
      "Drafted replies with three tones and platform-aware character limits",
      "Themes panel with AI-extracted topics and sentiment-colored bars",
    ],
    gallery: [
      {
        src: "/projects/reply-rail/hero.png",
        alt: "Three-platform reviews inbox with AI urgency lanes",
        caption: "Inbox, Google, Yelp, Facebook with urgency lanes"
      },
      {
        src: "/projects/reply-rail/dashboard.png",
        alt: "Sentiment dashboard with platform ratings and themes",
        caption: "Sentiment, platform ratings, themes, 12-week trends"
      },
      {
        src: "/projects/reply-rail/detail.png",
        alt: "Review detail with drafted reply and tone selector",
        caption: "Review detail, drafted reply with three tone presets"
      },
    ],
    engagement: {
      duration: "6 weeks",
      scope: "Frontend MVP for a multi-location F&B chain",
      team: "1 PM + 1 engineer + 1 designer"
    },
    outcomes: [
      "Average response time held under 24 hours across 6 locations",
      "Owner spends ~10 minutes a day on reviews instead of an hour",
      "Sentiment trend visibility per location for the first time",
    ]
  }
};
