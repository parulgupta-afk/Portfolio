# Parul Gupta — Portfolio

Cinematic, recruiter-focused developer portfolio built with React 19, TypeScript, Vite, Tailwind CSS 4, and Three.js (skills orbit lazy-loaded).

**Live:** [parulgupta-portfolio.vercel.app](https://parulgupta-portfolio.vercel.app)

## Develop

```bash
npm ci
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```

## Structure

| Path | Role |
|------|------|
| `src/data/portfolioData.ts` | **Single source of truth** — profile, projects, experience, skills |
| `src/components/CinematicPortfolio.tsx` | Page shell, intro sequence, sections |
| `src/components/HeroSection.tsx` | First impression: name, role, CTAs |
| `src/components/ProjectsSection.tsx` | Featured + supporting project cards |
| `src/components/ProjectModal.tsx` | Architecture detail dialog |
| `src/components/SkillsOrbit.tsx` | 3D skills (lazy-loaded; respects `prefers-reduced-motion`) |
| `public/resume.pdf` | Downloadable resume |
| `public/og-image.png` | Social preview image |

## Flagship projects (verified against repos)

1. **Priceloop** — JWT auth, product tracking, PostgreSQL, real Stripe Checkout/webhooks; analytics/matching/forecasting planned
2. **CodeForge** — Autonomous coding agent: Gemini/Groq, bounded repair, optional Docker sandbox
3. **SkyCall** — Flight meta-search: Duffel provider, Redis cache, BullMQ alerts, WebSockets, click-out booking

Edit project copy only in `src/data/portfolioData.ts` so cards and modals stay consistent.

## Deploy

Vercel (`vercel.json`: SPA rewrites, security headers, asset caching).

## Accuracy note

Project descriptions match repository READMEs and status docs. Planned features are labeled as planned and are not presented as shipped.
