# Post-MBA Career Explorer

An interactive guide to post-MBA career paths — covering **salary**, the **day-to-day reality**, and **how to break in** for each. Goes beyond the usual list to include the niche paths: **PE portfolio operations** (KKR Capstone, Bain Capital Portfolio Group, Blackstone), **search funds / ETA**, the different flavors of **startup operating roles**, **luxury brand & hospitality** management (LVMH, Ritz-Carlton), and the paths that are **especially good for ex-MBB consultants**.

## Features

- **Explore** — browse 25 careers across 7 categories; filter by category or "great for ex-MBB", sort by comp / work-life / prestige / difficulty / ex-MBB fit.
- **Detail view** — compensation (entry → senior → ceiling + notes), ratings, a day in the life, pros/cons, a "how to break in" playbook (timing, who hires, what helps, common backgrounds), and exit paths.
- **Compare** — put up to 3 careers side by side.
- **Find my fit** — a 6-question quiz that ranks careers by how well they match your priorities (money, lifestyle, risk, structure, mission, analytical vs. people).

## Stack

React 18 + TypeScript + Vite 5 + Tailwind v3. No backend — all content lives in a typed dataset at `src/data/careers.ts` (the source of truth).

## Run locally

```bash
PATH=/opt/homebrew/bin:$PATH npm install
PATH=/opt/homebrew/bin:$PATH npm run dev     # http://localhost:5250
PATH=/opt/homebrew/bin:$PATH npm run build   # tsc + Vite production build
```

## Deploy

Vercel SPA (see `vercel.json`): build → `dist/`, with a `/* → /index.html` rewrite.

> Compensation figures are US-market estimates (2025–26) and vary widely by firm, city, and year. Directional exploration only — not financial or career advice.
