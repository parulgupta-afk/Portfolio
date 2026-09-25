# Parul Gupta — Engineering Portfolio

Software Engineer portfolio focused on full-stack and AI-powered systems.

**Static site. No paid services required.**

## Positioning

Software Engineer · Full-Stack · AI Systems

## Flagship systems

| Project | Stack highlights | Links |
|---------|------------------|-------|
| **Priceloop** | FastAPI · data pipeline · price intelligence | [Source](https://github.com/parulgupta-afk/Priceloop) |
| **CodeForge** | Express · sandboxed agent · repair loop | [Demo](https://code-forge-jade.vercel.app) · [Source](https://github.com/parulgupta-afk/CodeForge) |
| **PulseOps** | Real-time incident / on-call workflows | [Source](https://github.com/parulgupta-afk/pulseops) |

Applied: [SkyCall](https://sky-call-app.vercel.app/) · [NutriVibe](https://nutri-vibe-app-iota.vercel.app/) · Verge  
Experimental: Disaster Mesh (no public source linked) · Quilio

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

```bash
npm run typecheck   # tsc --noEmit
npm run build
```

Deploy the `dist/` folder to Vercel, Netlify, or Cloudflare Pages.

## Resume

Place your PDF at:

```text
public/resume.pdf
```

The site links **Resume** in the nav and hero to `/resume.pdf`. Until that file is added, the link will 404 — this is intentional, not a fabricated document.

## Production URL

```text
Live: https://parulgupta-portfolio.vercel.app
```

## Content source

`src/data/portfolioData.ts` — projects, demos, experience, profile.

## Design notes

- Recruiter-first navigation and project hierarchy
- Engineering OS visual language without fake telemetry or metrics
- Live Demo / GitHub only when real URLs exist
- Specs fields: architecture · runtime · status · security


