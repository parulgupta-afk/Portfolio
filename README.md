# Parul Gupta — Engineering Portfolio

Premium Engineering OS portfolio: recruiter-first primary path, deeper systems via ⌘K.

## Design philosophy

| Layer | Share |
|-------|------|
| Professional product UI | ~80% |
| Engineering OS | ~15% |
| Discoverable hacker commands | ~5% |

**Palette locked:** obsidian · graphite · ice cyan · subtle lime status.

## Featured systems

- **Priceloop** — price tracking, FastAPI, PostgreSQL, Stripe  
- **CodeForge** — AI coding agent, sandbox, repair loops  
- **PulseOps** — incident / on-call workflows  

## Engineering features

- 30-second engineer summary  
- Flagship / applied / experiment tiers  
- Recruiter Mode (role evidence, no fake %)  
- Stack evidence (“Used in”)  
- System Trace (`> trace codeforge` etc.)  
- Architecture explorer, labs, security (honest claims)  
- AI agent grounded in `portfolioData` (+ optional API)  

## Scripts

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run test        # requires vitest + jsdom (install if missing)
npm run api         # optional Gemini portfolio API
```

## Metric policy

| Label | Meaning |
|-------|---------|
| MEASURED | Observed in this environment |
| IMPLEMENTED | Present in repository |
| DEMO / SIMULATED | Illustrative only |
| COUNT | Personal count (e.g. DSA) |

No fake cluster uptime or invented production SLAs.

## Content source of truth

`src/data/portfolioData.ts`
