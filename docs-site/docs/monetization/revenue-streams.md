---
sidebar_position: 1
---

# Revenue Streams

9 distinct revenue streams with 31 Stripe products live.

## Revenue Architecture

```
Revenue Streams (9)
├── 1. Subscriptions         $0–$149/mo     (6 tiers)
├── 2. Speaking              $1.5K–$75K     (per engagement)
├── 3. Events & Summits      $250–$75K      (5 ticket types)
├── 4. Constraint Council    $500–$2.5K/yr  (3 membership tiers)
├── 5. Intelligence Products $500–$100K/yr  (Obligation Monitor + Sector Intel)
├── 6. Case Studies          $25–$8K        (Standard, Premium, Teaching, Corporate)
├── 7. Podcast Sponsorship   $5K–$15K       (per episode/package)
├── 8. Referral Programme    $0             (zero-cost, 10% commission)
└── 9. Licensing             $500–$10K/yr   (Editorial, Data, Enterprise, Academic)
```

## Stream 1: Subscriptions

| Tier | Monthly | Annual | Stripe Product |
|------|---------|--------|----------------|
| Reader | Free | Free | N/A |
| Practitioner | $29/mo | $278/yr (save 20%) | `STRIPE_PRICE_PRACTITIONER_*` |
| Operator | $149/mo | $1,428/yr (save 20%) | `STRIPE_PRICE_OPERATOR_*` |
| Atomic Circle | N/A | $250/yr | `STRIPE_PRICE_ATOMIC_CIRCLE_YEARLY` |
| Early Operator | N/A | $99/yr | `STRIPE_PRICE_EARLY_OPERATOR_YEARLY` |

**Implementation:**
- `src/app/subscribe/page.tsx` — 6-tier pricing page with PricingToggle
- `src/components/CheckoutButton.tsx` — Handles both subscription and one-time
- `src/app/api/checkout/route.ts` — Creates Stripe Checkout sessions
- `src/lib/paywall.ts` — Metered paywall (3 free articles/month)

## Stream 2: Speaking

| Format | Price Range |
|--------|------------|
| Keynote | $15K–$75K |
| Workshop (half-day) | $5K–$25K |
| Panel/Fireside | $1.5K–$10K |

**Implementation:** `src/app/speaking/page.tsx` — Inquiry form routes to `/api/contact`

## Stream 3: Events & Summits

| Event | Price | Stripe Product |
|-------|-------|----------------|
| Summit Standard | $1,500 | `STRIPE_PRICE_EVENT_SUMMIT_STANDARD` |
| Summit Executive | $3,000 | `STRIPE_PRICE_EVENT_SUMMIT_EXECUTIVE` |
| Certification Day | $1,500 | `STRIPE_PRICE_EVENT_CERTIFICATION` |
| Quarterly Roundtable | $250 | `STRIPE_PRICE_EVENT_ROUNDTABLE` |
| Event Replay | $99 | `STRIPE_PRICE_EVENT_REPLAY` |

**Implementation:** `src/app/events/page.tsx` — CheckoutButton for each ticket type

## Stream 4: Constraint Council

| Tier | Annual | Stripe Product |
|------|--------|----------------|
| Associate | $500/yr | `STRIPE_PRICE_COUNCIL_ASSOCIATE` |
| Fellow | $1,500/yr | `STRIPE_PRICE_COUNCIL_FELLOW` |
| Senior Fellow | $2,500/yr | `STRIPE_PRICE_COUNCIL_SENIOR` |

**Implementation:** `src/app/council/page.tsx` — 3-tier membership with CheckoutButton

## Stream 5: Intelligence Products

| Product | Price | Billing | Stripe Product |
|---------|-------|---------|----------------|
| Obligation Monitor | $500/mo | Monthly | `STRIPE_PRICE_OBLIGATION_MONITOR` |
| Sector Intel: Financial | $1,500/yr | Annual | `STRIPE_PRICE_SECTOR_INTEL_FINANCIAL` |
| Sector Intel: Healthcare | $1,500/yr | Annual | `STRIPE_PRICE_SECTOR_INTEL_HEALTHCARE` |
| Sector Intel: Legal | $2,000/yr | Annual | `STRIPE_PRICE_SECTOR_INTEL_LEGAL` |

**Implementation:** `src/app/intelligence/page.tsx` — CheckoutButton for each product

## Stream 6: Case Studies

| Product | Price | Type | Stripe Product |
|---------|-------|------|----------------|
| Standard Case Study | $25 | One-time | `STRIPE_PRICE_CASE_STUDY_STANDARD` |
| Premium Case Study | $75 | One-time | `STRIPE_PRICE_CASE_STUDY_PREMIUM` |
| Teaching Licence | $500 | One-time | `STRIPE_PRICE_TEACHING_LICENCE` |
| Corporate Bundle (50) | $5,000 | One-time | `STRIPE_PRICE_CORPORATE_BUNDLE_50` |
| Corporate Bundle (100+) | $15,000 | One-time | `STRIPE_PRICE_CORPORATE_BUNDLE_100` |

**Implementation:** `src/app/case-studies/page.tsx` — CheckoutButton with `mode: 'payment'`

## Stream 7: Podcast Sponsorship

| Package | Price | Stripe Product |
|---------|-------|----------------|
| Single Episode | $5,000 | `STRIPE_PRICE_PODCAST_SPONSOR_SINGLE` |
| Quarterly (3 eps) | $12,000 | `STRIPE_PRICE_PODCAST_SPONSOR_QUARTERLY` |
| Annual (12 eps) | $40,000 | `STRIPE_PRICE_PODCAST_SPONSOR_ANNUAL` |

**Implementation:** `src/app/podcast/page.tsx` — CheckoutButton for each tier

## Stream 8: Referral Programme

- 10% commission on referred subscriber revenue
- Tracked via referral codes in localStorage
- Commission calculated in Stripe webhook handler
- Reward milestones trigger email notifications

**Implementation:**
- `src/app/referral/page.tsx` — Programme overview + unique link generation
- `src/app/api/webhooks/stripe/route.ts` — Commission processing

## Stream 9: Licensing

| Licence Type | Price | Stripe Product |
|-------------|-------|----------------|
| Editorial Syndication | $2,500/yr | `STRIPE_PRICE_LICENSING_EDITORIAL` |
| Data API Access | $5,000/yr | `STRIPE_PRICE_LICENSING_DATA` |
| Enterprise Content | $10,000/yr | `STRIPE_PRICE_LICENSING_ENTERPRISE` |
| Academic | $500/yr | `STRIPE_PRICE_LICENSING_ACADEMIC` |

**Implementation:** `src/app/licensing/page.tsx` — CheckoutButton for each licence
