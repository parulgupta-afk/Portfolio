import { ProjectItem, CapabilityItem, ExperienceItem } from '../types';

export const PROFILE = {
  name: 'Parul Gupta',
  handle: 'PARUL_GUPTA',
  role: 'Full Stack Developer',
  email: 'parulmahajan863@gmail.com',
  github: 'https://github.com/parulgupta-afk',
  linkedin: 'https://linkedin.com/in/parul-gupta-180250354',
};

export const SYSTEM_METRICS = {
  status: 'OPTIMAL',
  uptime: '99.999%',
  loadAvg: [0.14, 0.08, 0.05],
  memoryAllocated: '64.2%',
  activeNodes: 128,
  version: 'v2.5.0_PROD',
  profileId: 'PG_DEV_001',
  architectId: 'MERN-STACK-01',
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'pulseops',
    modNumber: 'MOD_01',
    category: 'INCIDENT MANAGEMENT',
    title: 'PulseOps',
    tagline: 'Production-grade on-call & incident platform (PagerDuty-style)',
    description:
      'Scoped on-call incident management platform with real-time updates, constraint-based scheduling, automated escalation, RAG triage, SLA/error-budget analytics, and full observability.',
    fullOverview:
      'PulseOps is a multi-phase, production-oriented incident and on-call platform. It covers auth/orgs, real-time incident state via Socket.io + Redis pub/sub, a genuine constraint-satisfaction rotation generator (with blackout dates + fairness/violation reports), BullMQ-powered notification workers with retry/backoff and escalation policies, Gemini + pgvector RAG triage grounded in past incidents, AI postmortems, fatigue analytics, public status pages, SLA/error-budget tracking, OpenTelemetry + Prometheus metrics, rate limiting, DLQ, graceful shutdown, and CI.',
    architectureDetails: [
      'Real-time fan-out: Socket.io + Redis pub/sub (no polling)',
      'Constraint-based on-call rotation with blackouts, fairness report, and violation diagnostics',
      'BullMQ workers for paging + escalation with retry/backoff and DLQ recovery',
      'RAG triage: Gemini embeddings + pgvector HNSW over past resolved incidents',
      'Observability: pino structured logs, OpenTelemetry, Prometheus /metrics (incident_ingestion p95 target)',
      'Stretch: AI postmortems, on-call fatigue analytics, public status page, SLA/error-budget burn rate',
    ],
    metrics: {
      health: '99.9%',
      exec: 'p95 < 200ms',
      uptime: 'SLA tracked',
      requestsPerSec: 'Real-time + queue',
    },
    tags: [
      'React',
      'TypeScript',
      'Express',
      'PostgreSQL',
      'pgvector',
      'Redis',
      'BullMQ',
      'Socket.io',
      'Gemini',
      'OpenTelemetry',
      'Prometheus',
    ],
    imageUrl: 'https://picsum.photos/seed/pulseops-incident/1600/900',
    statusVariant: 'primary',
    liveDemoUrl: '',
    githubUrl: 'https://github.com/parulgupta-afk/pulseops',
    specs: {
      latency: 'p95 ingestion target < 200ms',
      concurrency: 'Redis-backed rate limits + queues',
      availability: 'Graceful shutdown + DLQ',
      encryption: 'JWT + role-based access',
    },
  },
  {
    id: 'pocket-triage',
    modNumber: 'MOD_02',
    category: 'HEALTH / EMERGENCY',
    title: 'Pocket-Triage',
    tagline: 'Scalable AI-assisted emergency first-aid triage',
    description:
      'Voice + text emergency triage platform with RAG-grounded first-aid protocols, async workers, live staff dashboard, and step-by-step guided protocols (CPR metronome + timers).',
    fullOverview:
      'Pocket-Triage is an end-to-end emergency first-aid system: bystanders describe symptoms (voice or text), the system retrieves relevant protocol chunks via pgvector, generates a grounded Gemini response with severity + key actions, and can hand off into timed step-by-step guidance. Critical/Urgent cases auto-create staff incidents and push live via Supabase Realtime. Architecture includes Redis/BullMQ async path with sync fallback, idempotency, circuit breaker, retries/DLQ, RBAC + audit logs, structured logging, metrics, k6 load scripts, Docker, and GitHub Actions CI.',
    architectureDetails: [
      'Client → API → Redis/BullMQ workers (RAG + Gemini) → Postgres/pgvector, with sync fallback',
      'Protocol chunk ingestion + versioning; embeddings for retrieval',
      'Live staff dashboard via Supabase Realtime for CRITICAL/URGENT cases',
      'Guided protocol walkthroughs with Web Speech, CPR metronome, and real countdown timers',
      'Anonymous triage + one-time status token; staff can push dispatch status updates',
      'Production hardening: rate limits, idempotency, circuit breaker, RBAC, audit logs, metrics, tests, CI',
    ],
    metrics: {
      health: '99.9%',
      exec: 'Async + sync fallback',
      uptime: 'Worker resilient',
      requestsPerSec: 'Queue + Realtime',
    },
    tags: [
      'React',
      'TypeScript',
      'Express',
      'Supabase',
      'pgvector',
      'Redis',
      'BullMQ',
      'Gemini',
      'Vitest',
      'k6',
    ],
    imageUrl: 'https://picsum.photos/seed/pocket-triage-aid/1600/900',
    statusVariant: 'urgent',
    liveDemoUrl: '',
    githubUrl: 'https://github.com/parulgupta-afk/Pocket-Triage',
    specs: {
      latency: 'Async job + status poll',
      concurrency: 'BullMQ workers + rate limits',
      availability: 'Sync fallback if Redis down',
      encryption: 'Supabase Auth + RBAC',
    },
  },
  {
    id: 'skycall',
    modNumber: 'MOD_03',
    category: 'TRAVEL',
    title: 'SkyCall',
    tagline: 'Real-time flight search & meta-search platform with AI concierge',
    description:
      'A full-stack flight meta-search platform integrating the Duffel API to fetch and normalize real-time offers from 300+ airlines into a single unified model.',
    fullOverview:
      'SkyCall is a full-stack flight search platform built with React, TypeScript, Express, and MongoDB. It integrates the Duffel API to pull live flight offers from 300+ airlines and normalizes them into one internal schema, then layers a redirect-based meta-search booking flow (Skyscanner/Kayak style) with click-out referral logging on top, avoiding payment/PCI overhead entirely.',
    architectureDetails: [
      'Modular MVC backend (types/services/controllers/routes) with centralized error handling and a /api/health diagnostics endpoint',
      '10-minute TTL in-memory caching layer plus rate limiting to cut down redundant third-party API calls',
      'Google Gemini-powered AI travel concierge with function-calling access to live flight search and Google Maps grounding for airport/terminal queries',
      'Price-alert system with persistent MongoDB storage for tracking routes and fare-drop notifications',
    ],
    metrics: {
      health: '99.9%',
      exec: '12ms',
      uptime: '99.9%',
      requestsPerSec: '300+ airlines',
    },
    tags: ['React', 'TypeScript', 'Express.js', 'MongoDB', 'Duffel API', 'Gemini API'],
    imageUrl: 'https://picsum.photos/seed/skycall-flight/1600/900',
    statusVariant: 'primary',
    liveDemoUrl: '',
    githubUrl: 'https://github.com/parulgupta-afk/SkyCall-app',
    specs: {
      latency: '< 12ms Cached Response',
      concurrency: '300+ Airlines Aggregated',
      availability: 'Rate-limited & Cached',
      encryption: 'JWT / Google OAuth',
    },
  },
  {
    id: 'nutrivibe',
    modNumber: 'MOD_04',
    category: 'HEALTH',
    title: 'NutriVibe',
    tagline: 'Personalized food safety app — scan, check, stay safe',
    description:
      'A full-stack AI-powered food safety platform that scans product barcodes and labels to generate personalized safety verdicts based on allergies, dietary preferences, and medications.',
    fullOverview:
      'NutriVibe is a MERN-stack app (React, Node.js, Express, MongoDB, Google Gemini API) that scans a product barcode or label and returns a personalized food safety verdict for the user, their allergies, dietary restrictions, and current medications. A unified rules engine replaced three duplicated, inconsistent safety-check implementations from earlier iterations.',
    architectureDetails: [
      'Open Food Facts API integration with response caching and self-healing image recovery',
      'Google Gemini API for plain-English ingredient explanations behind every safety verdict',
      'Medication-food interaction checks for clinically documented risks (e.g. grapefruit with statins, vitamin K with blood thinners)',
      'Multi-user family profiles, JWT + Google OAuth authentication, and a secure hashed/time-limited password-reset flow',
    ],
    metrics: {
      health: '100%',
      exec: '8ms',
      uptime: '99.9%',
      requestsPerSec: 'Live barcode scan',
    },
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Gemini API', 'Open Food Facts'],
    imageUrl: 'https://picsum.photos/seed/nutrivibe-food/1600/900',
    statusVariant: 'organic',
    liveDemoUrl: '',
    githubUrl: 'https://github.com/parulgupta-afk/NutriVibe-app',
    specs: {
      latency: '< 8ms Rule Evaluation',
      concurrency: 'Multi-profile Families',
      availability: 'Vercel + Render',
      encryption: 'JWT / Google OAuth',
    },
  },
  {
    id: 'beacon',
    modNumber: 'MOD_05',
    category: 'DISASTER RESPONSE',
    title: 'Beacon',
    tagline: 'Crowdsourced live hazard & SOS map',
    description:
      'A real-time crowdsourced web app that plots hazard and SOS reports as live pins on a map, with community corroboration and an "I\'m safe" check-in.',
    fullOverview:
      'Beacon is a scoped-down, fast-turnaround real-time project built ahead of the full disaster-mesh app: users report a hazard or SOS, everyone else\'s map updates instantly, and other users can confirm a report to upgrade it from unverified to corroborated — plus a simple "I\'m safe" check-in for affected areas.',
    architectureDetails: [
      'Live map of hazard/SOS pins updated in real time via Supabase Realtime',
      'Community confirmation flow that upgrades reports from unverified to corroborated',
      '"I\'m safe" check-in for people in an affected area',
      'Deliberately scoped small as a fast build ahead of the full offline-first disaster-mesh app',
    ],
    metrics: {
      health: '99.9%',
      exec: '—',
      uptime: '—',
      requestsPerSec: 'Realtime pins',
    },
    tags: ['React', 'Supabase Realtime', 'Maps', 'WebSockets'],
    imageUrl: 'https://picsum.photos/seed/beacon-map/1600/900',
    statusVariant: 'urgent',
    liveDemoUrl: '',
    githubUrl: '',
    specs: {
      latency: 'Live map sync',
      concurrency: 'Crowdsourced reports',
      availability: 'In development',
      encryption: 'Supabase Auth',
    },
  },
  {
    id: 'disaster-mesh',
    modNumber: 'MOD_06',
    category: 'OFFLINE-FIRST',
    title: 'Disaster Mesh',
    tagline: 'Offline-first BLE mesh network for disaster response',
    description:
      'Phones form a Bluetooth Low Energy mesh network — no internet or cell towers needed — to relay SOS broadcasts, hazard reports, and "I\'m safe" messages across a disaster zone.',
    fullOverview:
      'Disaster Mesh is an offline-first mobile app (Flutter) where phones discover each other over BLE and multi-hop, store-carry-forward relay messages beyond direct BLE range — enabling SOS broadcasts, hazard reports, and family status updates to propagate through a disaster zone with no internet or cell towers. Scoped as an 8-phase solo build: offline app skeleton, offline maps/GPS, BLE discovery and 2-phone messaging, multi-hop relay, core emergency features, backend sync, signed/trusted reports, and final polish.',
    architectureDetails: [
      'Flutter mobile app with flutter_reactive_ble for BLE discovery and multi-hop message relay',
      'sqflite for local storage and flutter_map + offline MBTiles/OSM tiles for maps that work with no connectivity',
      'Store-carry-forward relay so messages reach phones outside direct BLE range',
      'Node.js + Express + Prisma + PostgreSQL backend for sync once connectivity is available, with signed reports to distinguish official vs. citizen sources',
    ],
    metrics: {
      health: 'IN_DEV',
      exec: '—',
      uptime: '—',
      requestsPerSec: 'Offline mesh',
    },
    tags: ['Flutter', 'BLE Mesh', 'Node.js', 'PostgreSQL', 'Prisma'],
    imageUrl: 'https://picsum.photos/seed/disaster-mesh-signal/1600/900',
    statusVariant: 'clinical',
    liveDemoUrl: '',
    githubUrl: '',
    specs: {
      latency: 'Multi-hop BLE relay',
      concurrency: 'Mesh peer discovery',
      availability: '8-phase solo build',
      encryption: 'Signed report verification',
    },
  },
];

export const CAPABILITIES_DATA: CapabilityItem[] = [
  {
    id: 'prc-01',
    code: 'PRC_01',
    title: 'React / Next.js',
    description:
      'Building responsive, component-driven frontends with React.js, Next.js, Tailwind CSS, and TypeScript.',
    capacity: 90,
    icon: 'code_blocks',
    accentColor: '#4cd9e0',
    subMetrics: [
      { label: 'Styling', value: 'Tailwind' },
      { label: 'Type Safety', value: 'TypeScript' },
      { label: 'State', value: 'Hooks' },
    ],
  },
  {
    id: 'prc-02',
    code: 'PRC_02',
    title: 'Node.js / Express',
    description:
      'RESTful API design, JWT and Google OAuth authentication, and MVC backend architecture with MongoDB, MySQL, and PostgreSQL.',
    capacity: 88,
    icon: 'architecture',
    accentColor: '#80d4d8',
    subMetrics: [
      { label: 'APIs', value: 'REST' },
      { label: 'Auth', value: 'JWT / OAuth' },
      { label: 'DBs', value: 'Mongo / SQL' },
    ],
  },
  {
    id: 'prc-03',
    code: 'PRC_03',
    title: 'Generative AI Integration',
    description:
      'Wiring Google Gemini API into product features — ingredient explanations, AI travel concierges, RAG triage, and function-calling tool use.',
    capacity: 85,
    icon: 'sparkles',
    accentColor: '#4cd9e0',
    subMetrics: [
      { label: 'Model', value: 'Gemini API' },
      { label: 'Pattern', value: 'RAG + Function calling' },
      { label: 'Use', value: 'In-product AI' },
    ],
  },
  {
    id: 'prc-04',
    code: 'PRC_04',
    title: 'DSA / Problem Solving',
    description:
      '1000+ Data Structures & Algorithms problems solved across LeetCode and GeeksforGeeks — arrays, trees, graphs, DP, greedy, and advanced structures.',
    capacity: 92,
    icon: 'design_services',
    accentColor: '#80d4d8',
    subMetrics: [
      { label: 'Problems', value: '1000+' },
      { label: 'Platforms', value: 'LeetCode / GfG' },
      { label: 'Focus', value: 'DSA Fundamentals' },
    ],
  },
  {
    id: 'prc-05',
    code: 'PRC_05',
    title: 'Distributed Systems',
    description:
      'Real-time systems, job queues, observability, and reliability patterns — Socket.io, Redis/BullMQ, OpenTelemetry, Prometheus, DLQ, rate limiting.',
    capacity: 82,
    icon: 'hub',
    accentColor: '#4cd9e0',
    subMetrics: [
      { label: 'Realtime', value: 'Socket.io / Redis' },
      { label: 'Queues', value: 'BullMQ' },
      { label: 'Obs', value: 'OTel + Prometheus' },
    ],
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Software Developer Intern',
    company: 'CodeXIntern (Remote)',
    period: 'AUG 2025 — OCT 2025',
    status: 'COMPLETED',
    bullets: [
      'Contributed to a full-stack e-commerce application — new features, bug fixes, and stability improvements across frontend and backend.',
      'Built and integrated RESTful APIs using Node.js and Express.js, working with MongoDB for data storage and retrieval.',
      'Debugged application issues with Postman and browser devtools, improving API reliability across multiple modules.',
      'Collaborated via Git/GitHub with modular coding practices, version control workflows, and code reviews in an Agile team.',
    ],
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'Git', 'Postman'],
    impactScore: 'Full-stack e-commerce',
  },
  {
    id: 'exp-2',
    role: 'B.Tech, Computer Engineering',
    company: 'Guru Nanak Dev University, Amritsar',
    period: 'EXPECTED JUNE 2028',
    status: 'ACTIVE',
    bullets: [
      'CGPA 8.90/10, coursework spanning OOP, Operating Systems, DBMS, and Computer Networks.',
      'Solved 1000+ DSA problems across LeetCode and GeeksforGeeks alongside coursework.',
      'HackerRank Certified: Software Engineer, Problem Solving (Intermediate), SQL (Intermediate).',
    ],
    techStack: ['DSA', 'OOP', 'DBMS', 'Computer Networks'],
    impactScore: 'CGPA 8.90/10',
  },
];
