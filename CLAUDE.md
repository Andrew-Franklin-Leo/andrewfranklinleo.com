# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
AI governance authority platform for Andrew Palupillai (andrewfranklinleo.com). Revenue-generating media platform with 9 income streams, 27 routes, and institutional-grade content about AI governance and the ORF Protocol ecosystem.

## Key Commands
- `npm run dev` — Development server (Next.js 16)
- `npm run build` — Production build (must pass with 0 errors, 27 routes)
- `npm run lint` — ESLint (flat config in `eslint.config.mjs`)
- No test framework is configured

### Deployment & GitFlow
- **Branches**: `main` (production), `develop` (integration), `feature/*` (work branches)
- **Flow**: `feature/*` -> PR to `develop` -> PR to `main` -> auto-deploy to Firebase
- **GitHub Actions** (`.github/workflows/`):
  - `ci.yml` — Lint + build on PRs to `main`/`develop`
  - `deploy-preview.yml` — Firebase preview channel URL on PRs to `main`
  - `deploy-preprod.yml` — **(Option A)** Firebase pre-prod channel on push to `develop`
  - `deploy-production.yml` — **(Option A)** Firebase live deploy on push to `main`
  - `deploy-k8s.yml` — **(Option B)** K8s non-prod/prod with Docker image to GHCR
- **Option A — Firebase environments**:
  - Pre-prod: Firebase preview channel (30d expiry) on `develop` push
  - Production: https://andrewfranklinleo-site.web.app on `main` push
  - Dynamic routes run as Cloud Function (2nd Gen, us-central1)
- **Option B — Kubernetes environments**:
  - Non-prod: `andrewfranklinleo-nonprod` namespace (1 replica, low resources)
  - Prod: `andrewfranklinleo-prod` namespace (3 replicas, Ingress + TLS)
  - Manifests: `k8s/base.yml`, `k8s/non-prod/`, `k8s/prod/` (Kustomize)
  - Image: `ghcr.io/<owner>/andrewfranklinleo` via `Dockerfile`
  - Requires: `KUBE_CONFIG_NONPROD`, `KUBE_CONFIG_PROD` secrets
- **Local deploy** (Windows): `node -r "./patch-symlink.cjs" "./node_modules/firebase-tools/lib/bin/firebase.js" deploy`

## Tech Stack
- Next.js 16 (App Router), React 19, TypeScript 5 (strict mode)
- Tailwind CSS 4 + Custom CSS (`src/app/globals.css` — all styling lives here)
- Firebase (Auth + Firestore via client SDK and Admin SDK)
- Stripe (subscriptions, one-time payments, webhooks, billing portal)
- Vercel deployment, Firebase hosting config also present
- Path alias: `@/*` maps to `./src/*`

## Architecture

### Routing (App Router)
All pages are in `src/app/`. Dynamic routes use `[slug]` pattern:
- Content pages: `/essays/[slug]`, `/verticals/[slug]`, `/regions/[slug]`, `/entities/[slug]`, `/products/[slug]`, `/rankings/[slug]`, `/authors/[slug]`
- API routes: 12 endpoints in `src/app/api/` — checkout, billing-portal, webhooks/stripe, newsletter, contact, subscribe, gift, invoices, usage, downloads, verify-student, checkout-onetime
- Feed routes: `/feed.xml/route.ts`, `/robots.ts`, `/sitemap.ts`

### Data Layer
- **Static data**: `src/data/*.ts` — verticals, regions, entities, products, rankings, tracker. Exported as typed arrays/constants, no database.
- **Essays**: Markdown files in `content/essays/` (7 files). Loaded via `src/lib/essays.ts` which maps filenames like `essay-01-orf-protocol.md` to URL slugs like `orf-thesis`. Essay metadata (slugs, categories, gating) is hardcoded in `ESSAY_MAP` within that file.
- **Firestore collections**: `stakeholders` (user profiles + tiers), `subscribers`, `incentive_ledger`, `referrals`, `gifts`, `purchases`, `governance_signals`, `inquiries`, `content_metrics`

### Auth & Payments
- `src/components/AuthProvider.tsx` — React context providing `useAuth()` hook with `user`, `profile` (tier, referralCode), and `loading` state. User profiles stored in Firestore `stakeholders` collection.
- `src/lib/firebase/config.ts` — Client-side Firebase init (gracefully handles missing credentials for build)
- `src/lib/firebase/admin.ts` — Server-side Firebase Admin (exports `adminDb`, `adminAuth`)
- `src/lib/stripe.ts` — Stripe config with `PRICE_IDS` (subscriptions) and `ONETIME_PRICE_IDS` (products). All price IDs come from env vars.
- `src/app/api/webhooks/stripe/route.ts` — Handles checkout.session.completed, subscription updates/cancellations, payment success/failure, trial endings. Updates Firestore and sends emails.
- User tiers: `free`, `practitioner`, `operator`, `institutional`, `analyst`, `council`

### Paywall System
- `src/lib/paywall.ts` — Client-side metered paywall using localStorage. 3 free articles per 30 days. Essays marked `gated: true` in ESSAY_MAP are paywalled.
- `src/components/PaywallGate.tsx` — UI component for the paywall

### Key Components
- `NavClient.tsx` — Main navigation with dropdown menus and mobile hamburger
- `ReadingList.tsx` — Persistent reading list sidebar
- `CheckoutButton.tsx` / `PricingToggle.tsx` — Stripe checkout UI
- `ShareButtons.tsx` / `SaveButton.tsx` / `FollowButton.tsx` — Social/engagement

### Email
- `src/lib/email.ts` — Email functions (welcome, gift notification, payment failed, invoice, cancellation, referral reward)

## Agent Team
10 specialized agents in `.claude/agents/afl-*.md` — see `.claude/agents/QUICKSTART.md` for usage. Key agents: Orchestrator (pipeline coordination), Frontend Developer (UI), Backend Architect (Firebase/Stripe), Content Strategist (essays), Reality Checker (QA).

## Design System
- Dark theme: `#0D1117` background, `#F0F0F0` text
- Accents: Gold `#F5A623` (CTAs, prices), Blue `#4A9EFF` (links, tags)
- Fonts: Playfair Display (headings), Inter (body), JetBrains Mono (mono)
- CSS classes: `.btn-primary` (gold), `.btn-secondary` (outline), `.btn-ghost`, `.card`, `.card--gold`, `.grid-3`, `.reveal` (scroll animation)
- No emojis in content or UI

## Environment Variables
- Firebase client: `NEXT_PUBLIC_FIREBASE_*` (API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID)
- Firebase admin: `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`
- Stripe: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, plus ~30 `STRIPE_PRICE_*` vars for product/subscription price IDs
- The app builds successfully without credentials (Firebase config handles missing keys gracefully)

## Proprietary Terms (Always Capitalize)
ORF Protocol, Atomic Constraint, 15-Layer Reality Stack, Fragility Codex, Pre-Incident Governance, PIAR, Obligation Intelligence, Governance Signal, Constraint Council, Obligation Summit, Performance Tokens, Power Concentration Index (PCI), AINEFF, AINEF, AINEG, AINE, Aureya

## Revenue Streams
Subscriptions ($0-$149/mo), Speaking ($1.5K-$75K), Events ($250-$75K), Council ($500-$2.5K/yr), Intelligence ($500-$100K/yr), Case Studies ($25-$8K), Podcast ($5K-$15K/episode), Referrals (zero-cost), Institutional ($5K-$25K/yr)
