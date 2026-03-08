---
sidebar_position: 1
---

# Architecture Overview

## System Architecture

```
                    ┌─────────────────────────────┐
                    │         Vercel CDN           │
                    │    (Global Edge Network)     │
                    └──────────┬──────────────────┘
                               │
                    ┌──────────▼──────────────────┐
                    │      Next.js 16 App          │
                    │     (App Router / SSG)       │
                    ├─────────────────────────────┤
                    │  93+ Routes (Static + SSG)   │
                    │  12 API Route Handlers       │
                    │  21 React Components         │
                    │  8 Library Modules            │
                    └──┬──────┬──────┬────────────┘
                       │      │      │
            ┌──────────▼┐  ┌─▼────┐ ┌▼──────────┐
            │ Firebase   │  │Stripe│ │ Resend/   │
            │ Auth +     │  │ API  │ │ SendGrid  │
            │ Firestore  │  │      │ │           │
            └────────────┘  └──────┘ └───────────┘
```

## Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (pages)/            # 27 page routes
│   ├── api/                # 12 API route handlers
│   ├── layout.tsx          # Root layout (nav, footer, providers)
│   ├── globals.css         # Design system (2000+ lines)
│   ├── sitemap.ts          # Dynamic sitemap (93+ URLs)
│   └── robots.ts           # SEO robots configuration
├── components/             # 21 reusable components
│   ├── NavClient.tsx       # Forbes-style mega-navigation
│   ├── CheckoutButton.tsx  # Stripe checkout (subscription + one-time)
│   ├── PaywallGate.tsx     # Metered paywall engine
│   ├── PricingToggle.tsx   # Annual/monthly toggle
│   ├── GiftModal.tsx       # Gift subscription flow
│   ├── InvoiceList.tsx     # Invoice history with PDF download
│   ├── AdSlot.tsx          # Advertising/sponsored content
│   ├── StudentVerification.tsx  # Academic eligibility verification
│   ├── ReadingList.tsx     # Persistent reading list (localStorage)
│   ├── FollowButton.tsx    # Follow/personalization system
│   ├── SaveButton.tsx      # Save article to reading list
│   ├── ShareButtons.tsx    # Social sharing (LinkedIn, X, email)
│   ├── AuthProvider.tsx    # Firebase auth context
│   └── ServiceWorkerRegistration.tsx  # PWA registration
├── lib/                    # Core libraries
│   ├── stripe.ts           # Stripe SDK (subscriptions, one-time, billing portal, gifts, invoices)
│   ├── paywall.ts          # Metered paywall (3 free/month, useSyncExternalStore)
│   ├── email.ts            # Transactional email (6 templates)
│   ├── usage.ts            # API usage tracking and rate limiting
│   ├── essays.ts           # Essay loader from markdown
│   ├── search.ts           # Full-text search aggregator
│   └── firebase/           # Firebase client + admin SDKs
└── data/                   # Static data structures
    ├── verticals.ts        # 12 industry verticals
    ├── regions.ts          # 11 geographic regions
    ├── entities.ts         # 10 ecosystem entities
    ├── products.ts         # 6 products
    ├── rankings.ts         # 5 proprietary indices
    └── tracker.ts          # 15 regulatory entries
```

## Route Map

### Static Routes (27)

| Route | Type | Auth | Purpose |
|-------|------|------|---------|
| `/` | SSG | Public | Landing page |
| `/about` | SSG | Public | Professional bio |
| `/essays` | SSG | Public | Framework archive |
| `/subscribe` | Client | Public | 6-tier pricing with checkout |
| `/newsletter` | Client | Public | Newsletter tiers |
| `/contact` | SSG | Public | Contact form |
| `/portal` | Client | Auth | Stakeholder dashboard |
| `/gift` | Client | Public | Gift subscriptions |
| `/gift/success` | SSG | Public | Gift confirmation |
| `/council` | SSG | Public | Constraint Council |
| `/events` | SSG | Public | Summit + events |
| `/speaking` | SSG | Public | Speaking engagements |
| `/case-studies` | SSG | Public | Case study marketplace |
| `/intelligence` | SSG | Public | Intelligence products |
| `/podcast` | SSG | Public | Podcast + sponsorship |
| `/rankings` | SSG | Public | Proprietary indices |
| `/tracker` | Client | Public | Regulatory tracker |
| `/search` | Client | Public | Full-text search |
| `/video` | SSG | Public | Video content |
| `/community` | SSG | Public | Discussion forum |
| `/api-docs` | SSG | Public | API documentation |
| `/licensing` | SSG | Public | Content licensing |
| `/enterprise` | SSG | Public | Enterprise plans |
| `/my-feed` | Client | Public | Personalized feed |
| `/referral` | Client | Public | Referral programme |
| `/authors` | SSG | Public | Author directory |
| `/verticals` | SSG | Public | Vertical index |
| `/regions` | SSG | Public | Region index |
| `/entities` | SSG | Public | Entity index |
| `/products` | SSG | Public | Product index |

### Dynamic Routes (66+ pages)

| Pattern | Count | Source |
|---------|-------|--------|
| `/essays/[slug]` | 7 | `content/essays/` |
| `/verticals/[slug]` | 12 | `src/data/verticals.ts` |
| `/regions/[slug]` | 11 | `src/data/regions.ts` |
| `/entities/[slug]` | 10 | `src/data/entities.ts` |
| `/products/[slug]` | 6 | `src/data/products.ts` |
| `/rankings/[slug]` | 5 | `src/data/rankings.ts` |
| `/authors/[slug]` | 1 | Hardcoded |

### API Routes (12)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/checkout` | POST | Subscription checkout |
| `/api/checkout-onetime` | POST | One-time purchase checkout |
| `/api/billing-portal` | POST | Stripe Customer Portal |
| `/api/gift` | POST | Gift subscription checkout |
| `/api/invoices` | POST | Invoice history |
| `/api/verify-student` | POST | Student verification |
| `/api/usage` | POST | API usage tracking |
| `/api/downloads` | POST | Secure file downloads |
| `/api/newsletter` | POST | Newsletter signup |
| `/api/subscribe` | POST | Free tier signup |
| `/api/contact` | POST | Contact form |
| `/api/webhooks/stripe` | POST | Stripe webhook (6 events) |

## Design System

| Property | Value |
|----------|-------|
| Background | `#0D1117` |
| Text | `#F0F0F0` |
| Accent Gold | `#F5A623` (CTAs, prices, highlights) |
| Accent Blue | `#4A9EFF` (links, tags, code) |
| Heading Font | Playfair Display (400, 500, 700) |
| Body Font | Inter (300–700) |
| Mono Font | JetBrains Mono (400, 500) |
| Border | `rgba(33, 38, 45, 0.6)` |
