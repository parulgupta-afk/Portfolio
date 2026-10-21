# Portfolio infinite project marquee update

This update targets the existing `parulgupta-afk/Portfolio` React + TypeScript + Vite project.

## Files
- Replace `src/components/ProjectsSection.tsx` with the supplied file.
- Append the contents of `src/project-marquee.css.append` to the end of `src/index.css`.

## What changes
- Converts the project grid into two continuously scrolling horizontal rows.
- First row scrolls left; second row scrolls right.
- Uses the existing `PROJECTS_DATA`, live-demo links, GitHub links, and architecture modal callback.
- Keeps the additional GitHub repositories list.
- Pauses motion on hover/focus and respects `prefers-reduced-motion`.
- Adds no dependencies.

## Validate and deploy
From the portfolio repository root:
```bash
npm ci
npm run typecheck
npm run build
```
Commit the two changes and push to the connected deployment branch (typically `main`) to trigger the existing Vercel deployment.
