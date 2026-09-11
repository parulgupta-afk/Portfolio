# Parul Gupta — Engineering Portfolio

Premium engineering portfolio: recruiter-first UX with an optional Engineering OS layer (⌘K).

## Design philosophy

- **80%** professional product UI  
- **15%** engineering OS (architecture, labs, command center)  
- **5%** discoverable hacker commands  

Palette: obsidian · graphite · ice cyan · subtle lime status.

## Featured systems

| Project | Focus |
|---------|--------|
| **Priceloop** | Price tracking · FastAPI · PostgreSQL · Stripe |
| **CodeForge** | AI coding agent · sandbox · repair loops |
| **PulseOps** | Incident / on-call · queues · realtime |

Also: Pocket-Triage, SkyCall, NutriVibe, Beacon, Disaster Mesh.

## Features

- Hero + system panel + 30-second read  
- Flagship / applied / experiment project tiers  
- Recruiter Mode (role lens + evidence)  
- ⌘K Command Center (`whoami`, `trace codeforge`, …)  
- Architecture explorer, labs, stack evidence  
- Optional `npm run api` + Gemini-grounded agent  

## Scripts

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run api          # optional portfolio API
```

## Content

`src/data/portfolioData.ts` — single source of truth for projects and profile.

## Honest metrics policy

Demo/simulated diagnostics are labeled as such. No fake cluster uptime or invented production SLAs.
