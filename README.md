# Parul Gupta — Portfolio

Single-page developer portfolio built with React 19, TypeScript, Vite, Tailwind CSS 4 and Three.js.
All profile, project, experience and education content lives in one typed data file.

Configured domain: <https://parulgupta-portfolio.vercel.app> (set in `index.html`, `public/robots.txt`, `public/sitemap.xml`).

## Sections

Hero · About · Skills · Projects · Experience · Education & Achievements · Contact

Navigation tracks the visible section with an `IntersectionObserver`. Section IDs: `about`, `skills`, `work`, `experience`, `education`, `contact`.

## Run locally

Prerequisites: Node.js 20+ and npm.

```bash
npm ci              # install exactly what package-lock.json specifies
npm run dev         # dev server on http://localhost:3000
npm run typecheck   # tsc --noEmit  (npm run lint is the same check; there is no ESLint config)
npm run build       # production build into dist/
npm run preview     # serve the production build locally
```

There is no unit-test runner in this project. CI (`.github/workflows/ci.yml`) runs `npm ci`, `npm run lint` and `npm run build`.
No environment variables are required.

## Project structure

| Path | Purpose |
|------|---------|
| `src/data/portfolioData.ts` | Profile, projects, experience, education, achievements, skills — edit content here |
| `src/types.ts` | Shared TypeScript types for that data |
| `src/components/CinematicPortfolio.tsx` | Page shell: intro, header/nav, hero, projects, experience, contact |
| `src/components/AboutSection.tsx` | About copy + scroll-driven flower animation |
| `src/components/SkillsOrbit.tsx` | Lazy-loaded 3D skills section (WebGL); renders a static grid if WebGL is unavailable |
| `src/components/EducationAchievements.tsx` | Education, certifications, and the "Achievements & highlights" subsection |
| `src/components/motion.tsx` | Shared scroll-reveal / count-up hooks |
| `src/components/PixelPortrait.tsx` | Canvas portrait used in the hero |
| `public/` | `resume.pdf`, favicon, social preview image, `robots.txt`, `sitemap.xml` |
| `vercel.json` | SPA rewrite, security headers, asset caching |

## Accessibility & motion

- Respects `prefers-reduced-motion`: the intro is skipped, counters show final values, and the project marquee becomes a static wrapped grid.
- The project marquee duplicates cards only to loop seamlessly; duplicates are `inert` and `aria-hidden`, and a Pause/Play control is provided.
- Modals move focus in, trap Tab, close on Escape and restore focus; background content is `inert` while a modal or the intro is open.

## Content accuracy

Project descriptions are meant to match each repository's code and README. Planned features are labelled as planned.
Live-demo links in `portfolioData.ts` should be re-checked periodically; leave `liveDemoUrl` empty to show only the source link.
