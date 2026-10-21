# Portfolio audit & changes (2026-10-21)

## Critical findings (pre-change)

1. **Priceloop overclaim** — Portfolio said AI matching, forecasting, embeddings, LLM insights. Repo README + PROJECT_STATUS: only JWT auth, product tracking, Stripe Checkout/webhooks, one practice-site scraper adapter. Matching/forecasting/alerts **planned**.
2. **CodeForge provider** — Portfolio said Anthropic API. Repo: Gemini primary, Groq fallback, mock for CI. Local subprocess is **not** a security boundary.
3. **SkyCall booking** — Needed clearer distinction: click-out meta-search vs real PCI booking; holds are an engineering model.
4. **Flagship selection** — PulseOps was marked flagship; user priority is Priceloop, CodeForge, SkyCall.
5. **Resume** — `public/resume.pdf` exists; UI tooltips still said "Add public/resume.pdf".
6. **Hero** — Missing education line and GitHub/LinkedIn CTAs for 5-second recruiter scan.

## Changes implemented

### Data accuracy (`src/data/portfolioData.ts`)
- PROFILE: clearer tagline, Expected 2028, internship-focused status.
- Priceloop / CodeForge / SkyCall: rewritten to match verified READMEs; planned vs shipped explicit.
- Project order: priceloop → codeforge → skycall → pulseops → nutrivibe → verge → quilio.
- Softened AI skill text that claimed Priceloop LLM market analysis; softed Next.js frontend claim.

### UI
- `ProjectsSection.tsx`: FLAGSHIP_IDS = priceloop, codeforge, skycall; first-row order updated.
- `HeroSection.tsx`: education line; Resume download filename; GitHub + LinkedIn links; slightly reduced hero min-height; fixed resume tooltip.
- `TopNavBar.tsx`: resume tooltip fixed.
- `index.html`: meta description aligned with accurate flagships.
- `README.md`: structure table, flagship accuracy note, edit-in-one-place guidance.

### Not changed (intentional)
- Cinematic visual system, intro sequence, SkillsOrbit 3D (already lazy-loaded per README).
- Experience/education bullets (left as-is; verify CGPA / HackerRank / CodeXIntern against your records).
- PulseOps, NutriVibe, Verge, Quilio copy (not fully re-audited against every repo file; flagships prioritized).

## Verification status

| Check | Status |
|-------|--------|
| Project copy vs Priceloop README | Corrected |
| Project copy vs CodeForge README | Corrected |
| Project copy vs SkyCall README | Corrected |
| Resume file present | Yes (`public/resume.pdf`) |
| npm install / typecheck / build | Run locally after `npm ci` (sandbox install was flaky) |
| Live deployment | Not redeployed from this environment |
| Screenshots | Still empty `imageUrl` fields — supply real app screenshots |

## Remaining actions for you

1. **Commit & push** these changes; redeploy Vercel.
2. **Screenshots** for Priceloop, CodeForge, SkyCall (dashboard, agent run, search results) → put under `public/projects/` and set `imageUrl` in `portfolioData.ts`.
3. Confirm LinkedIn URL and CodeXIntern dates/CGPA/HackerRank claims match reality.
4. Pin on GitHub: Portfolio, Priceloop, CodeForge, SkyCall (in that order).
5. Optional: shorten skill groups if the 3D orbit feels crowded; keep categories without percentages.

## Suggested GitHub profile README

```markdown
# Parul Gupta

B.Tech Computer Science Engineering · Guru Nanak Dev University · Expected 2028

I build full-stack applications and AI-powered systems — auth, APIs, data, and product UI.

### Selected work
- **Priceloop** — Price tracking with JWT auth, PostgreSQL, and real Stripe billing
- **CodeForge** — Autonomous coding agent with bounded repair and optional Docker sandbox
- **SkyCall** — Flight meta-search with Redis caching, BullMQ, and WebSocket alerts

### Stack
TypeScript · React · Node.js / Express · FastAPI · PostgreSQL · MongoDB · Redis · Docker · Gemini API

[Portfolio](https://parulgupta-portfolio.vercel.app) · [GitHub](https://github.com/parulgupta-afk) · [LinkedIn](https://linkedin.com/in/parul-gupta-180250354)
```
