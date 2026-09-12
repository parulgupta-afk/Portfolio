# Parul Gupta — Engineering Portfolio

Premium Engineering OS portfolio for software engineering recruiting.

**Static site works with zero API keys and zero paid services.**

## Design

| Layer | Share |
|-------|------|
| Professional product UI | ~80% |
| Engineering OS (⌘K, labs, architecture) | ~15% |
| Discoverable commands | ~5% |

Palette: obsidian · graphite · ice cyan · subtle lime status.

## Featured systems

| Project | Stack highlights |
|---------|------------------|
| **Priceloop** | FastAPI · PostgreSQL · Stripe · Redis/Celery scaffold |
| **CodeForge** | Express · Socket.IO · Gemini/Groq · Docker sandbox |
| **PulseOps** | Node · queues · realtime incident workflows |

## Local development

```bash
npm ci
npm run dev
```

Open http://localhost:3000

### Quality gates

```bash
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
npx playwright install chromium   # once
npm run e2e
```

### Optional AI API

```bash
cp .env.example .env
# set GEMINI_API_KEY
npm run api
# optional: VITE_API_URL=http://localhost:8787
```

Without the API, the AI agent uses local grounded retrieval from `src/data/portfolioData.ts`.

## Deploy (static, free)

```bash
npm run build
```

Deploy the `dist/` folder to:

- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages (set Vite `base` if needed)

No database required for the portfolio site.

## Command Center (⌘K / Ctrl+K)

| Command | Action |
|---------|--------|
| `help` | Navigate to summary |
| `whoami` | About |
| `sudo inspect parul` | Recruiter Mode |
| `trace codeforge` / `priceloop` / `pulseops` | System Trace |
| `open resume` | Resume section |
| `recruiter mode` | Recruiter Mode |
| `engineering mode` | Engineering Lab |

## Metric policy

Claims use **implemented / measured / demo / count** semantics. No fabricated uptime or RPS.

## Content source of truth

`src/data/portfolioData.ts`

## License

Private portfolio project.
