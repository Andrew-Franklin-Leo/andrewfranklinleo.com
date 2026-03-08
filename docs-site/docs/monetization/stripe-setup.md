---
sidebar_position: 2
---

# Stripe Setup

31 products created via automated setup script. All price IDs stored in `.env.local`.

## Setup Script

`scripts/setup-stripe.ts` creates all 31 Stripe products and prices automatically.

```bash
npx tsx scripts/setup-stripe.ts
```

**What the script does:**
1. Reads `STRIPE_SECRET_KEY` from `.env.local`
2. Creates 31 products with metadata (`platform: andrewfranklinleo.com`)
3. Creates prices (recurring or one-time) for each product
4. Auto-updates `.env.local` with all price IDs
5. Outputs copy-paste env block as backup

## Product Breakdown

| Category | Count | Type |
|----------|-------|------|
| Subscriptions (Monthly) | 2 | Recurring (month) |
| Subscriptions (Annual) | 4 | Recurring (year) |
| Council Memberships | 3 | Recurring (year) |
| Newsletter | 1 | Recurring (month) |
| Intelligence | 1 | Recurring (month) |
| Sector Intelligence | 3 | Recurring (year) |
| Case Studies | 2 | One-time |
| Teaching & Corporate | 3 | One-time |
| Event Tickets | 5 | One-time |
| Podcast Sponsorship | 3 | One-time |
| Licensing | 4 | One-time |
| **Total** | **31** | |

## Checkout Configuration

All checkout sessions include:

```typescript
{
  automatic_tax: { enabled: true },
  tax_id_collection: { enabled: true },
  allow_promotion_codes: true,
  metadata: { referral_code, source }
}
```

## Webhook Events (6)

| Event | Handler |
|-------|---------|
| `checkout.session.completed` | Create user, activate subscription, process gifts, referral tracking |
| `customer.subscription.updated` | Update user tier in Firestore |
| `customer.subscription.deleted` | Downgrade to free, send cancellation email |
| `invoice.payment_succeeded` | Send invoice email, update billing records |
| `invoice.payment_failed` | Send dunning email, flag account |
| `customer.subscription.trial_will_end` | Send trial ending reminder (3 days before) |

## Billing Portal

Stripe Customer Portal configured for:
- Plan upgrades/downgrades
- Payment method management
- Invoice history
- Subscription cancellation

Endpoint: `POST /api/billing-portal`
