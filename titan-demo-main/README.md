# Titan AI Growth Command Center

A production-ready Next.js implementation of the Titan dashboard. The app recreates Titan's dark blue command-center shell, responsive navigation, Jarvis workspace, evidence-first Shadow Autopilot, and simulated workwear scenario.

## The truth rule

Titan never presents simulated values as live values.

- `TITAN_DATA_MODE=demo` serves a fixed, visibly labelled 30-day sandbox fixture.
- `TITAN_DATA_MODE=live` selects an intentionally inert live provider and renders an unavailable state.
- Live mode never falls back to demo data.
- No TikTok API, credential, secret, write action, or commerce integration is included.
- Jarvis uses deterministic demo answers and cannot execute actions.

## Local development

Requirements: Node.js 20.9 or newer and pnpm 11.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

On PowerShell, copy the environment file with:

```powershell
Copy-Item .env.example .env.local
```

Then open [http://localhost:3000](http://localhost:3000).

The environment file is optional because the application safely defaults to demo mode. Set `TITAN_DATA_MODE=live` to verify the no-data/live-provider state.

## Validation

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Architecture

```text
src/
├── app/
│   ├── [section]/page.tsx       Routed dashboard sections
│   ├── api/
│   │   ├── dashboard/route.ts   Typed snapshot endpoint
│   │   ├── health/route.ts      Provider health and mode
│   │   └── jarvis/route.ts      Validated demo Jarvis endpoint
│   ├── error.tsx                Route error boundary
│   ├── global-error.tsx         Root error boundary
│   ├── loading.tsx              Dashboard skeleton
│   ├── not-found.tsx            Unknown-route state
│   └── page.tsx                 Overview route
├── components/
│   ├── brand/                   Titan mark and wordmark
│   ├── dashboard/               Shell, navigation, sections and Jarvis UI
│   └── ui/                      Accessible shared dialog
├── data/demo/                   Static scenario and Jarvis answers
└── lib/titan/
    ├── contracts.ts             Serializable domain/API contracts
    ├── env.ts                   Server-only environment validation
    ├── provider.ts              Provider interface
    ├── providers/               Separate demo and inert live adapters
    ├── route-utils.ts           Consistent no-store API responses
    └── service.ts               Provider selection and response metadata
```

The initial dashboard read happens in a Server Component. Client Components are limited to navigation, dialogs, decision selection, and the Jarvis interaction. API responses include mode, source, disclosure, request ID, generation timestamp, and a discriminated ready/unavailable status.

## Routes

- `/` — Overview
- `/autopilot` — Shadow Autopilot
- `/brief` — Jarvis brief
- `/sales` — Sales intelligence
- `/products` — Product signals
- `/content` — Content intelligence
- `/jarvis` — Expanded Jarvis workspace
- `/shop-setup` — Connection policy and empty state
- `/api/dashboard`, `/api/health`, `/api/jarvis` — server API

## Deploying to Vercel

Import this folder as a Vercel project. The standard `pnpm build` command and Next.js output are ready for deployment. Keep `TITAN_DATA_MODE=demo` until a reviewed server-side live provider exists. Future provider secrets must remain server-only and must not use a `NEXT_PUBLIC_` prefix.
