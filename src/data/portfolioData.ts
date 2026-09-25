import { ProjectItem, CapabilityItem, ExperienceItem } from '../types';

export const PROFILE = {
  name: 'Parul Gupta',
  handle: 'PARUL_GUPTA',
  role: 'Software Engineer · Full-Stack · AI Systems',
  tagline:
    'I build full-stack and AI-powered applications across frontend, backend, data, authentication, and deployment layers.',
  email: 'parulmahajan863@gmail.com',
  github: 'https://github.com/parulgupta-afk',
  linkedin: 'https://linkedin.com/in/parul-gupta-180250354',
  education: 'B.Tech CSE · Guru Nanak Dev University · CGPA 8.90',
  availability: 'Open to software engineering roles and internships',
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'priceloop',
    modNumber: 'MOD_01',
    category: 'PRICE INTELLIGENCE',
    title: 'Priceloop',
    tagline: 'AI-powered e-commerce price intelligence platform',
    description: 'Tracks, matches, and forecasts e-commerce product pricing, with LLM-generated insights on top.',
    fullOverview: 'Priceloop (formerly PricePulse AI) is an AI-powered price intelligence platform with a React/TypeScript/Tailwind/shadcn frontend and a Python/FastAPI backend. It tracks e-commerce pricing via compliant scraping, matches products and forecasts price trends using scikit-learn and embeddings, and surfaces LLM-generated insights — built in phases from a documented Roadmap, SRS, and DRD.',
    architectureDetails: [
      'Python/FastAPI backend with PostgreSQL, Redis, and Celery for background scraping/processing jobs',
      'Compliant, publicly-accessible-data scraping via httpx, BeautifulSoup, and Playwright',
      'Product matching and price forecasting using scikit-learn, embeddings, and pgvector',
      'Phased build (Roadmap + SRS + DRD) with Docker and GitHub Actions for CI/infra'
    ],
    tags: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery'],
    imageUrl: '',
    statusVariant: 'organic',
    liveDemoUrl: '',
    githubUrl: 'https://github.com/parulgupta-afk/Priceloop',
    specs: {
      latency: 'Async scraping pipeline',
      concurrency: 'Celery background workers',
      availability: 'Phased build (in progress)',
      encryption: 'Compliant data access'
    }
  },

  {
    id: 'codeforge',
    modNumber: 'MOD_02',
    category: 'AI CODING AGENT',
    title: 'CodeForge',
    tagline: 'Autonomous coding agent with sandboxed execution',
    description: 'A self-correcting autonomous coding agent that plans, writes, and runs code inside an isolated Docker sandbox.',
    fullOverview: 'CodeForge is a self-correcting autonomous coding agent built with a Node.js/Express/TypeScript backend and a React/TypeScript frontend. It uses the Anthropic API for agent reasoning and controls a Docker-based sandbox (via dockerode) with custom resource limits, network isolation, and timeout enforcement — built in-house instead of a managed sandbox like E2B, to demonstrate deeper systems engineering.',
    architectureDetails: [
      'Node.js/Express/TypeScript backend driving an agent loop against the Anthropic API',
      'Docker-based sandbox execution via dockerode with custom resource limits, network isolation, and timeout enforcement',
      'React/TypeScript frontend for interacting with and observing agent runs',
      'Deployment-ready client/server architecture, consistent with the rest of the portfolio projects'
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'Docker', 'Anthropic API'],
    imageUrl: '',
    statusVariant: 'clinical',
    liveDemoUrl: 'https://code-forge-jade.vercel.app',
    githubUrl: 'https://github.com/parulgupta-afk/CodeForge',
    specs: {
      latency: 'Sandboxed agent loop',
      concurrency: 'Isolated Docker runs',
      availability: 'In development',
      encryption: 'Network-isolated sandbox'
    }
  },

  {
    id: 'pulseops',
    modNumber: 'MOD_03',
    category: 'INCIDENT MANAGEMENT',
    title: 'PulseOps',
    tagline: 'Real-time on-call & incident response platform',
    description: 'A PagerDuty-style on-call and incident response platform with live scheduling, escalation, and AI-assisted triage.',
    fullOverview: 'PulseOps is a real-time on-call and incident response platform with a React/TypeScript/Vite frontend and a Node/Express/TypeScript backend. It pushes live on-call schedules over Socket.io/Redis Pub/Sub, queues incident ingestion through BullMQ with idempotency keys, and uses a vector-backed RAG pipeline to surface similar past incidents and suggested runbook steps during triage.',
    architectureDetails: [
      'Socket.io + Redis Pub/Sub for live-pushed on-call schedules and incident updates',
      'BullMQ event-driven queue with idempotency keys, retry-with-backoff, and circuit breakers on notification providers',
      'RAG-powered incident triage: PostgreSQL + pgvector similarity search over past incidents via the Gemini API',
      'Escalation policies via Twilio/SendGrid, multi-tenant orgs with roles, and a public status page'
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'Socket.io', 'Redis', 'PostgreSQL', 'Gemini API'],
    imageUrl: '',
    statusVariant: 'primary',
    liveDemoUrl: '',
    githubUrl: 'https://github.com/parulgupta-afk/pulseops',
    specs: {
      latency: 'Live WebSocket push',
      concurrency: 'BullMQ queued ingestion',
      availability: 'Multi-tenant orgs',
      encryption: 'Role-based access'
    }
  },

  {
    id: 'skycall',
    modNumber: 'MOD_04',
    category: 'TRAVEL',
    title: 'SkyCall',
    tagline: 'Real-time flight search & meta-search platform with AI concierge',
    description: 'A full-stack flight meta-search platform integrating the Duffel API to fetch and normalize real-time offers from 300+ airlines into a single unified model.',
    fullOverview: 'SkyCall is a full-stack flight search platform built with React, TypeScript, Express, and MongoDB. It integrates the Duffel API to pull live flight offers from 300+ airlines and normalizes them into one internal schema, then layers a redirect-based meta-search booking flow (Skyscanner/Kayak style) with click-out referral logging on top, avoiding payment/PCI overhead entirely.',
    architectureDetails: [
      'Modular MVC backend (types/services/controllers/routes) with centralized error handling and a /api/health diagnostics endpoint',
      '10-minute TTL in-memory caching layer plus rate limiting to cut down redundant third-party API calls',
      'Google Gemini-powered AI travel concierge with function-calling access to live flight search and Google Maps grounding for airport/terminal queries',
      'Price-alert system with persistent MongoDB storage for tracking routes and fare-drop notifications'
    ],
    tags: ['React', 'TypeScript', 'Express.js', 'MongoDB', 'Duffel API', 'Gemini API'],
    imageUrl: '',
    statusVariant: 'primary',
    liveDemoUrl: 'https://sky-call-app.vercel.app/',
    githubUrl: 'https://github.com/parulgupta-afk/SkyCall-app',
    specs: {
      latency: 'Cached search path',
      concurrency: '300+ Airlines Aggregated',
      availability: 'Rate-limited & Cached',
      encryption: 'JWT / Google OAuth'
    }
  },

  {
    id: 'nutrivibe',
    modNumber: 'MOD_05',
    category: 'HEALTH',
    title: 'NutriVibe',
    tagline: 'Personalized food safety app — scan, check, stay safe',
    description: 'A full-stack AI-powered food safety platform that scans product barcodes and labels to generate personalized safety verdicts based on allergies, dietary preferences, and medications.',
    fullOverview: 'NutriVibe is a MERN-stack app (React, Node.js, Express, MongoDB, Google Gemini API) that scans a product barcode or label and returns a personalized food safety verdict for the user, their allergies, dietary restrictions, and current medications. A unified rules engine replaced three duplicated, inconsistent safety-check implementations from earlier iterations.',
    architectureDetails: [
      'Open Food Facts API integration with response caching and self-healing image recovery',
      'Google Gemini API for plain-English ingredient explanations behind every safety verdict',
      'Medication-food interaction checks for clinically documented risks (e.g. grapefruit with statins, vitamin K with blood thinners)',
      'Multi-user family profiles, JWT + Google OAuth authentication, and a secure hashed/time-limited password-reset flow'
    ],
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Gemini API', 'Open Food Facts'],
    imageUrl: '',
    statusVariant: 'organic',
    liveDemoUrl: 'https://nutri-vibe-app-iota.vercel.app/',
    githubUrl: 'https://github.com/parulgupta-afk/NutriVibe-app',
    specs: {
      latency: 'Rule evaluation path',
      concurrency: 'Multi-profile Families',
      availability: 'Vercel + Render',
      encryption: 'JWT / Google OAuth'
    }
  },

  {
    id: 'verge',
    modNumber: 'MOD_06',
    category: 'ROAD INTELLIGENCE',
    title: 'Verge',
    tagline: 'Verified road-block status & smart rerouting',
    description: 'A real-time crowdsourced app for checking if a road is passable, with trust-scored reports feeding a rerouting engine.',
    fullOverview: 'Verge (formerly Beacon/Disaster Pulse) is a real-time crowdsourced road-status app: report a blockage, and a trust-weighted confidence system verifies it and feeds a custom rerouting engine. All 8 phases from the PRD are implemented with working code — Vite + React + TypeScript + MapLibre on the client, a Hono server, and a Supabase/PostGIS backend, with OSRM-based routing.',
    architectureDetails: [
      'Trust-weighted confidence system: Supabase anonymous auth, trust_weight-weighted scoring, 5km voter-proximity checks, and rate limiting on votes/reports',
      'Real server-side /api/routes/reroute endpoint (OSRM + blockage-avoidance logic)',
      'Supabase Storage photo upload for report verification, PostGIS-backed nearby-segments queries',
      'Vitest test suite (confidence formula, API validation, reroute logic) and GitHub Actions CI for server + client builds'
    ],
    tags: ['React', 'TypeScript', 'MapLibre', 'Hono', 'Supabase', 'PostGIS', 'OSRM'],
    imageUrl: '',
    statusVariant: 'urgent',
    liveDemoUrl: '',
    githubUrl: 'https://github.com/parulgupta-afk/verge',
    specs: {
      latency: 'Real-time Supabase updates',
      concurrency: 'Trust-weighted confidence',
      availability: 'All 8 PRD phases shipped',
      encryption: 'Supabase anonymous auth'
    }
  },

  {
    id: 'disaster-mesh',
    modNumber: 'MOD_07',
    category: 'OFFLINE-FIRST',
    title: 'Disaster Mesh',
    tagline: 'Offline-first BLE mesh network for disaster response',
    description: 'Phones form a Bluetooth Low Energy mesh network — no internet or cell towers needed — to relay SOS broadcasts, hazard reports, and "I\'m safe" messages across a disaster zone.',
    fullOverview: 'Disaster Mesh is an offline-first mobile app (Flutter) where phones discover each other over BLE and multi-hop, store-carry-forward relay messages beyond direct BLE range — enabling SOS broadcasts, hazard reports, and family status updates to propagate through a disaster zone with no internet or cell towers. Scoped as an 8-phase solo build: offline app skeleton, offline maps/GPS, BLE discovery and 2-phone messaging, multi-hop relay, core emergency features, backend sync, signed/trusted reports, and final polish.',
    architectureDetails: [
      'Flutter mobile app with flutter_reactive_ble for BLE discovery and multi-hop message relay',
      'sqflite for local storage and flutter_map + offline MBTiles/OSM tiles for maps that work with no connectivity',
      'Store-carry-forward relay so messages reach phones outside direct BLE range',
      'Node.js + Express + Prisma + PostgreSQL backend for sync once connectivity is available, with signed reports to distinguish official vs. citizen sources'
    ],
    tags: ['Flutter', 'BLE Mesh', 'Node.js', 'PostgreSQL', 'Prisma'],
    imageUrl: '',
    statusVariant: 'clinical',
    liveDemoUrl: '',
    githubUrl: '',
    specs: {
      latency: 'Multi-hop BLE relay',
      concurrency: 'Mesh peer discovery',
      availability: '8-phase solo build',
      encryption: 'Signed report verification'
    }
  },

  {
    id: 'quilio',
    modNumber: 'MOD_08',
    category: 'SOCIAL / AI',
    title: 'Quilio',
    tagline: 'Social blogging + GenAI learning platform',
    description: 'A social blogging platform blending Instagram/Medium/Reddit with GenAI — including a "chat with a blog" RAG feature.',
    fullOverview: 'Quilio (formerly Weave) is a social blogging + GenAI learning platform combining feed-based social discovery with AI-powered learning tools. Its core differentiator is "chat with a blog" — RAG-based Q&A over article content — alongside turning posts into learning experiences like quizzes, flashcards, and coding challenges. Built with React/Tailwind/Zustand, a Node/Express + MongoDB backend, and JWT + Google OAuth.',
    architectureDetails: [
      '"Chat with a blog": RAG-based Q&A over article content using an LLM + embeddings pipeline',
      'Blog-to-learning-experience generation: quizzes, flashcards, and coding challenges from post content',
      'Personalized feed combining content embeddings, behavioral signals, and collaborative filtering',
      'React/Tailwind/Zustand frontend, Node/Express + MongoDB backend, JWT + Google OAuth, Socket.io'
    ],
    tags: ['React', 'Node.js', 'MongoDB', 'LLM / RAG', 'Socket.io'],
    imageUrl: '',
    statusVariant: 'clinical',
    liveDemoUrl: '',
    githubUrl: 'https://github.com/parulgupta-afk/Quilio',
    specs: {
      latency: 'RAG-based blog Q&A',
      concurrency: 'Embeddings pipeline',
      availability: 'V1 core + chat-with-blog',
      encryption: 'JWT + Google OAuth'
    }
  }
];

export const OTHER_REPOS = [
  { name: 'Pocket-Triage', url: 'https://github.com/parulgupta-afk/Pocket-Triage' },
  { name: 'Him-Agni', url: 'https://github.com/parulgupta-afk/Him-Agni' },
  { name: 'AI-Chat-Application', url: 'https://github.com/parulgupta-afk/AI-Chat-Application' },
  { name: 'text-summarizer', url: 'https://github.com/parulgupta-afk/text-summarizer' },
  { name: 'Razorpay-clone', url: 'https://github.com/parulgupta-afk/Razorpay-clone' },
  { name: 'Fund-the-Cause', url: 'https://github.com/parulgupta-afk/Fund-the-Cause' },
];

export const CAPABILITIES_DATA: CapabilityItem[] = [
  {
    id: 'prc-01',
    code: 'PRC_01',
    title: 'React / Next.js',
    description: 'Building responsive, component-driven frontends with React.js, Next.js, Tailwind CSS, and TypeScript.',
    capacity: 90,
    icon: 'code_blocks',
    accentColor: '#34d399',
    subMetrics: [
      { label: 'Styling', value: 'Tailwind' },
      { label: 'Type Safety', value: 'TypeScript' },
      { label: 'State', value: 'Hooks' }
    ]
  },
  {
    id: 'prc-02',
    code: 'PRC_02',
    title: 'Node.js / Express',
    description: 'RESTful API design, JWT and Google OAuth authentication, and MVC backend architecture with MongoDB, MySQL, and PostgreSQL.',
    capacity: 88,
    icon: 'architecture',
    accentColor: '#38bdf8',
    subMetrics: [
      { label: 'APIs', value: 'REST' },
      { label: 'Auth', value: 'JWT / OAuth' },
      { label: 'DBs', value: 'Mongo / SQL' }
    ]
  },
  {
    id: 'prc-03',
    code: 'PRC_03',
    title: 'Generative AI Integration',
    description: 'Wiring Google Gemini API into product features — ingredient explanations, AI travel concierges, and function-calling tool use.',
    capacity: 85,
    icon: 'sparkles',
    accentColor: '#34d399',
    subMetrics: [
      { label: 'Model', value: 'Gemini API' },
      { label: 'Pattern', value: 'Function calling' },
      { label: 'Use', value: 'In-product AI' }
    ]
  },
  {
    id: 'prc-04',
    code: 'PRC_04',
    title: 'DSA / Problem Solving',
    description: '1000+ Data Structures & Algorithms problems solved across LeetCode and GeeksforGeeks — arrays, trees, graphs, DP, greedy, and advanced structures.',
    capacity: 92,
    icon: 'design_services',
    accentColor: '#38bdf8',
    subMetrics: [
      { label: 'Problems', value: '1000+' },
      { label: 'Platforms', value: 'LeetCode / GfG' },
      { label: 'Focus', value: 'DSA Fundamentals' }
    ]
  },
  {
    id: 'prc-05',
    code: 'PRC_05',
    title: 'Systems & CS Fundamentals',
    description: 'C++ and core computer science: Operating Systems, DBMS, and Computer Networks, applied across real-time (Socket.io/WebSockets) and sandboxed (Docker) backend projects.',
    capacity: 80,
    icon: 'architecture',
    accentColor: '#22d3ee',
    subMetrics: [
      { label: 'Language', value: 'C++' },
      { label: 'Coursework', value: 'OS / DBMS / Networks' },
      { label: 'Applied via', value: 'Socket.io / Docker' }
    ]
  }
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
      'Collaborated via Git/GitHub with modular coding practices, version control workflows, and code reviews in an Agile team.'
    ],
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'Git', 'Postman'],
    impactScore: 'Full-stack e-commerce'
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
      'HackerRank Certified: Software Engineer, Problem Solving (Intermediate), SQL (Intermediate).'
    ],
    techStack: ['DSA', 'OOP', 'DBMS', 'Computer Networks'],
    impactScore: 'CGPA 8.90/10'
  }
];
