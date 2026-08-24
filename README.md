# Parul Gupta — Portfolio

An interactive, cinematic developer portfolio built with React, TypeScript, and Tailwind CSS — featuring a WebGL shader background, an interactive terminal, and a project inspector modal for each build.

**Projects featured:**
- [PulseOps](https://github.com/parulgupta-afk/pulseops) — production-grade on-call & incident platform
- [Pocket-Triage](https://github.com/parulgupta-afk/Pocket-Triage) — AI-assisted emergency first-aid triage
- [SkyCall](https://github.com/parulgupta-afk/SkyCall-app) — flight meta-search + AI concierge
- [NutriVibe](https://github.com/parulgupta-afk/NutriVibe-app) — AI-powered food safety
- Beacon (crowdsourced hazard/SOS map)
- Disaster Mesh (offline-first BLE mesh network)

## Run locally

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Build for production

```bash
npm run build
```

Output is written to `dist/`. Deploy it to Vercel, Netlify, GitHub Pages, or any static host.

## Editing content

All project, skills, and experience data lives in one file: `src/data/portfolioData.ts`. Update `PROJECTS_DATA`, `CAPABILITIES_DATA`, and `EXPERIENCE_DATA` there to add or change content — the rest of the UI reads from it.
