# Parul Gupta — Portfolio

Cinematic, black-first developer portfolio built with React 19, TypeScript, Vite, Tailwind CSS 4 and Three.js.

## Develop
```bash
npm ci
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```

## Structure
- `src/components/CinematicPortfolio.tsx` — page shell, intro, selected work, experience timeline, contact
- `src/components/SkillsOrbit.tsx` — 3D skills section (lazy-loaded so Three.js stays out of the first load)
- `src/components/AboutSection.tsx`, `PixelPortrait.tsx` — about + hero portrait
- `src/data/portfolioData.ts` — all profile, project and experience content (edit here)
- `public/` — resume, portrait cutout, favicon and social-share image

Deployed on Vercel (`vercel.json` adds SPA rewrites, security headers and asset caching).
