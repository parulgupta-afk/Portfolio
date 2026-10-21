import { ProjectItem, CapabilityItem, ExperienceItem, SkillGroup, AchievementItem } from '../types';

export const PROFILE = {
  name: 'Parul Gupta',
  handle: 'PARUL_GUPTA',
  role: 'Software Engineer · Full-Stack · AI Systems',
  tagline:
    'Computer Science Engineering student building full-stack applications and AI-powered systems, with a focus on practical engineering, reliable backends, and clear user experiences.',
  email: 'parulmahajan863@gmail.com',
  github: 'https://github.com/parulgupta-afk',
  linkedin: 'https://linkedin.com/in/parul-gupta-180250354',
  education: 'B.Tech CSE · Guru Nanak Dev University · Expected 2028 · CGPA 8.90',
  status: 'Open to software engineering internships and entry-level roles',
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'priceloop',
    modNumber: 'MOD_01',
    category: 'PRICE INTELLIGENCE',
    title: 'Priceloop',
    tagline: 'Price-tracking platform with auth, product tracking, and real Stripe billing',
    description:
      'Register, track products across marketplace listings, and manage paid plans via real Stripe Checkout. Analytics, matching, forecasting, and alerts are planned — not yet shipped.',
    fullOverview:
      'Priceloop is a price-tracking platform with a React/TypeScript dashboard and a FastAPI backend. Implemented today: JWT authentication, per-user product tracking with marketplace listings, PostgreSQL persistence (Alembic migrations), real Stripe Checkout + webhook subscription updates, health endpoints, and one working scraper adapter (books.toscrape.com) with multi-currency price normalization. Cross-marketplace matching, forecasting, anomaly detection, and alerts are documented as planned and are not claimed as complete.',
    architectureDetails: [
      'FastAPI + SQLAlchemy + Alembic + PostgreSQL for users, products, listings, and subscriptions',
      'JWT auth with verified per-user data isolation (covered by backend tests)',
      'Stripe Checkout sessions and verified webhooks that update subscription status',
      'Scraper package with one working adapter and fixture-based tests; Celery app present but no tasks registered yet',
      'Docker Compose (dev + prod layouts), GitHub Actions CI for backend tests and frontend typecheck/build'
    ],
    tags: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis', 'Stripe', 'Docker'],
    imageUrl: '',
    statusVariant: 'organic',
    liveDemoUrl: '',
    githubUrl: 'https://github.com/parulgupta-afk/Priceloop',
    specs: {
      architecture: 'JWT API + dashboard',
      runtime: 'Postgres + Stripe webhooks',
      status: 'Core auth & billing live; analytics planned',
      security: 'JWT isolation + verified webhooks'
    }
  },

  {
    id: 'codeforge',
    modNumber: 'MOD_02',
    category: 'AI CODING AGENT',
    title: 'CodeForge',
    tagline: 'Autonomous coding agent with bounded repair and optional Docker sandbox',
    description:
      'Task → LLM generates Python → execute in sandbox → classify errors → repair (max 3) → result. Focus on bounded autonomy and isolation of untrusted code.',
    fullOverview:
      'CodeForge is an autonomous coding agent with a Node.js/Express/TypeScript orchestrator and a React studio UI over Socket.IO. The agent loop uses Gemini (primary), Groq (fallback), or a mock LLM for CI. Generated Python runs either in a local subprocess (default, not a security boundary) or in Docker with network disabled, memory/CPU/PID limits, non-root user, and capability drops. Errors are classified and the agent attempts bounded repairs (max 3). Optional PostgreSQL when DATABASE_URL is set. Tests cover classifier, orchestrator, provider fallback, and local sandbox safety; Docker security tests are separate and require a daemon.',
    architectureDetails: [
      'Express orchestrator + Socket.IO studio; Gemini / Groq / mock providers with explicit fallback',
      'Bounded repair loop: generate → execute → classify → repair (capped attempts)',
      'Docker mode: NetworkMode none, 512MB memory, 1 CPU, PID 64, nobody user, dropped capabilities',
      'Local subprocess mode for solo demos only — timeouts and output limits, not isolation',
      'CI: typecheck, tests under USE_MOCK_LLM, server + client build; no real API keys required'
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'Socket.IO', 'Docker', 'Gemini API'],
    imageUrl: '',
    statusVariant: 'clinical',
    liveDemoUrl: 'https://code-forge-jade.vercel.app',
    githubUrl: 'https://github.com/parulgupta-afk/CodeForge',
    specs: {
      architecture: 'Agent loop + classifier',
      runtime: 'Docker or local Python',
      status: 'MVP with tests & CI',
      security: 'Docker isolation optional; local is not a sandbox'
    }
  },

  {
    id: 'skycall',
    modNumber: 'MOD_04',
    category: 'TRAVEL',
    title: 'SkyCall',
    tagline: 'Flight meta-search with caching, queues, WebSockets, and click-out booking',
    description:
      'Live provider search (Duffel + sample fallback), Redis caching with stampede protection, BullMQ price alerts, authenticated WebSockets, and airline click-out with signed tokens. Booking holds are an engineering model with idempotency — not a completed real booking flow.',
    fullOverview:
      'SkyCall is a full-stack flight meta-search platform (React/Vite client, Express/TypeScript API, MongoDB, Redis, BullMQ). Search goes through a FlightProvider abstraction (Duffel live offers + sample fallback). Identical searches are cached in Redis with singleflight stampede protection. Price alerts are evaluated in the background and delivered over JWT-authenticated WebSockets. Booking path is click-out to airline/Google Flights with server-signed anti-tamper tokens; optional booking holds demonstrate idempotency and last-seat race handling as an engineering model, not production PCI booking. Ops: Zod validation, rate limits, request IDs, /health/live and /health/ready, multi-stage Docker, GitHub Actions CI.',
    architectureDetails: [
      'Validation (Zod) → Controller → Service → Repository / FlightProvider',
      'Redis TTL cache with getOrSetCache singleflight; BullMQ retries/backoff for alerts',
      'JWT WebSocket auth, heartbeat, per-user alert delivery',
      'Click-out tokens signed with a separate secret; optional booking holds with Idempotency-Key',
      'Docker multi-stage non-root image, Compose healthchecks, CI badge on the repo'
    ],
    tags: ['React', 'TypeScript', 'Express', 'MongoDB', 'Redis', 'BullMQ', 'Duffel API'],
    imageUrl: '',
    statusVariant: 'primary',
    liveDemoUrl: 'https://sky-call-app.vercel.app/',
    githubUrl: 'https://github.com/parulgupta-afk/SkyCall-app',
    specs: {
      architecture: 'Provider abstraction + cache',
      runtime: 'Redis + BullMQ jobs',
      status: 'Meta-search + click-out live',
      security: 'JWT / signed click-out tokens'
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
    liveDemoUrl: 'https://pulseops-server.vercel.app',
    githubUrl: 'https://github.com/parulgupta-afk/pulseops',
    specs: {
      architecture: 'Live WebSocket push',
      runtime: 'BullMQ queued ingestion',
      status: 'Multi-tenant orgs',
      security: 'Role-based access'
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
      architecture: 'Rule evaluation path',
      runtime: 'Multi-profile Families',
      status: 'Vercel + Render',
      security: 'JWT / Google OAuth'
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
      architecture: 'Real-time Supabase updates',
      runtime: 'Trust-weighted confidence',
      status: 'All 8 PRD phases shipped',
      security: 'Supabase anonymous auth'
    }
  },

  {
    id: 'quilio',
    modNumber: 'MOD_07',
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
      architecture: 'RAG-based blog Q&A',
      runtime: 'Embeddings pipeline',
      status: 'V1 core + chat-with-blog',
      security: 'JWT + Google OAuth'
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
    description: 'Building responsive, component-driven frontends with React, TypeScript, Tailwind CSS, and solid HTML/CSS fundamentals.',
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
    description: 'RESTful API design, JWT and Google OAuth authentication, and MVC backend architecture with MySQL, PostgreSQL, and MongoDB.',
    capacity: 88,
    icon: 'architecture',
    accentColor: '#38bdf8',
    subMetrics: [
      { label: 'APIs', value: 'REST' },
      { label: 'Auth', value: 'JWT / OAuth' },
      { label: 'DBs', value: 'MySQL / SQL / Mongo' }
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
    title: 'Systems & Core CS',
    description: 'C++, SQL, and core computer science: Operating Systems, DBMS / RDBMS, and Computer Networks, applied across real-time (Socket.io/WebSockets) and sandboxed (Docker) backend projects.',
    capacity: 80,
    icon: 'architecture',
    accentColor: '#22d3ee',
    subMetrics: [
      { label: 'Languages', value: 'C++ / SQL' },
      { label: 'Core', value: 'OS / DBMS / Networks' },
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
    id: 'exp-inamigos',
    role: 'AI Web Development Intern',
    company: 'InAmigos Foundation',
    period: '',
    status: 'ACTIVE',
    bullets: [
      'Selected for the AI Web Development Internship program.',
      'Developed an NGO awareness webpage highlighting the organization\'s mission, initiatives, projects, and social impact.',
      'Used HTML and CSS to structure and style the webpage, with emphasis on clear information architecture and visual presentation.',
      'Designed content and call-to-action sections to help visitors understand the NGO\'s work and engage with its initiatives.'
    ],
    techStack: ['HTML5', 'CSS3', 'Responsive Web Design', 'UI Development'],
    impactScore: 'NGO awareness web page'
  },
  {
    id: 'exp-2',
    role: 'Bachelor of Technology (B.Tech), Computer Science and Engineering',
    company: 'Guru Nanak Dev University, Amritsar',
    period: 'EXPECTED JUNE 2028',
    status: 'ACTIVE',
    bullets: [
      'CGPA 8.90/10, coursework spanning OOP, Operating Systems, DBMS / RDBMS, and Computer Networks.',
      'Solved 1000+ DSA problems across LeetCode and GeeksforGeeks alongside coursework.',
      'HackerRank Certified: Software Engineer, Problem Solving (Intermediate), SQL (Intermediate).'
    ],
    techStack: ['DSA', 'OOP', 'DBMS / RDBMS', 'SQL', 'MySQL', 'Computer Networks'],
    impactScore: 'CGPA 8.90/10'
  }
];


/** College hackathons — only verified outcomes; no invented event names or dates. */
export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: 'ach-hack-win',
    category: 'hackathon',
    title: 'Hackathon Winner — ₹5,000 Cash Prize',
    summary:
      'Won the most recent college hackathon I participated in and received a cash prize of ₹5,000.',
    detail:
      'Following recognition of the winning project, the judges invited me to participate in other hackathons.',
    highlight: '₹5,000',
  },
  {
    id: 'ach-hack-multi',
    category: 'hackathon',
    title: 'Multi-Department College Hackathons',
    summary:
      'Participated in hackathons organized by multiple departments at my college.',
    detail:
      'Built and presented projects under timed conditions across different departmental events.',
  },
];

/** Skill groups shown in the 3D skills section (order = top to bottom of the spiral). */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'languages',
    code: 'LANG_DEV',
    title: 'Programming Languages',
    description:
      'C++ for DSA, problem-solving and OOP; Java for core concepts; JavaScript (ES6+) and TypeScript across frontend and backend; Python for AI/ML-related work; SQL for relational databases.',
    items: ['C++', 'Java', 'JavaScript (ES6+)', 'TypeScript', 'Python', 'SQL'],
  },
  {
    id: 'frontend',
    code: 'FE_ENG',
    title: 'Frontend Development',
    description:
      'Responsive, component-driven interfaces with React.js, Next.js, Tailwind CSS and TypeScript, built on solid HTML5 / CSS3 and UI/UX principles.',
    items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'AngularJS', 'Responsive Design', 'UI/UX Principles'],
  },
  {
    id: 'backend',
    code: 'BE_ENG',
    title: 'Backend Development',
    description:
      'REST APIs, JWT and Google OAuth authentication and MVC architecture on Node.js and Express.js — plus real-time features with WebSockets and Socket.io, rate limiting and caching.',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Spring Boot', 'Django', 'JWT Auth', 'Google OAuth', 'MVC', 'API Integration', 'WebSockets', 'Socket.io', 'Rate Limiting', 'Caching', 'Error Handling & Debugging'],
  },
  {
    id: 'databases',
    code: 'DATA_OPS',
    title: 'Databases & Data',
    description:
      'MongoDB as the primary store, with MySQL, PostgreSQL and Redis — data modeling, database design, querying and integration, grounded in DBMS fundamentals.',
    items: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'DBMS', 'PDBMS', 'Database Design & Querying', 'Database Integration', 'Data Modeling'],
  },
  {
    id: 'ai',
    code: 'AI_ML',
    title: 'AI & Machine Learning',
    description:
      'LLM-powered applications: Gemini API integration, prompt engineering, embeddings and RAG — applied in CodeForge (autonomous coding agent) and product features such as SkyCall’s optional AI concierge and NutriVibe’s ingredient explanations.',
    items: ['Generative AI', 'LLMs', 'LLM API Integration', 'Gemini API', 'Prompt Engineering', 'Embeddings', 'RAG', 'AI-Powered Apps', 'Autonomous AI Agents', 'AI-Powered Features'],
  },
  {
    id: 'dsa',
    code: 'DSA_LAB',
    title: 'Data Structures & Algorithms',
    description:
      '1,000+ problems solved across LeetCode and GeeksforGeeks — from arrays, hashing and trees to graphs, recursion, dynamic programming and complexity analysis.',
    items: ['Arrays & Strings', 'Linked Lists', 'Stacks & Queues', 'Hashing', 'Trees & BSTs', 'Graphs', 'BFS / DFS', 'Recursion & Backtracking', 'Binary Search', 'Sorting & Searching', 'Greedy', 'Dynamic Programming', 'Complexity Analysis', 'OOP'],
  },
  {
    id: 'cs-core',
    code: 'CS_CORE',
    title: 'Computer Science Core',
    description:
      'The software-engineering fundamentals: OOP, DBMS, operating systems, computer networks, client-server architecture and MVC.',
    items: ['OOP', 'DBMS', 'PDBMS', 'Operating Systems', 'Computer Networks', 'SQL & Relational DBs', 'DSA', 'Software Dev Principles', 'Client-Server Architecture', 'MVC'],
  },
  {
    id: 'tools',
    code: 'DEV_TOOLS',
    title: 'Tools & Platforms',
    description:
      'Git and GitHub for version control, Postman for API testing, Docker for containers, Kafka for streaming, MongoDB Atlas, and Vercel and Render for deployment.',
    items: ['Git', 'GitHub', 'Postman', 'Docker', 'Redis', 'Kafka', 'MongoDB Atlas', 'Vercel', 'Render', 'WebSockets', 'Socket.io'],
  },
  {
    id: 'fullstack',
    code: 'FULL_STK',
    title: 'Full-Stack Development',
    description:
      'Primarily the MERN stack — React.js, Node.js, Express.js and MongoDB — extended with MySQL / SQL, Gemini and LLM API integration, authentication and deployment.',
    items: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL / SQL', 'Gemini API', 'Authentication', 'Authorization', 'Vercel', 'Render'],
  },
  {
    id: 'engineering',
    code: 'ENG_OPS',
    title: 'Engineering Skills',
    description:
      'Problem-solving, debugging, API design and integration, UI/UX awareness, version control and collaborative development, and continuous learning through project-based work.',
    items: ['Problem Solving', 'Analytical Thinking', 'Debugging', 'API Design', 'UI/UX Awareness', 'Version Control', 'Collaboration', 'Project-Based Learning'],
  },
];
