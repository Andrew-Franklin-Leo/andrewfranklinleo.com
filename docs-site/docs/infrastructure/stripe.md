---
sidebar_position: 2
---

# Stripe

Payment processing, subscriptions, and billing.

## Configuration

```bash
STRIPE_SECRET_KEY=sk_live_...        # Server-side API key
STRIPE_WEBHOOK_SECRET=whsec_...      # Webhook signature verification
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...  # Client-side key
```

## SDK Wrapper (`src/lib/stripe.ts`)

### Exports

| Function | Purpose |
|----------|---------|
| `createSubscriptionCheckout()` | Recurring subscription checkout session |
| `createOnetimeCheckout()` | One-time payment checkout session |
| `createBillingPortalSession()` | Customer self-service portal |
| `getCustomerInvoices()` | Invoice history retrieval |
| `createGiftCheckout()` | Gift subscription with recipient metadata |

### Price ID Maps

| Map | Count | Env Pattern |
|-----|-------|-------------|
| `PRICE_IDS` | 11 | `STRIPE_PRICE_*` (recurring) |
| `ONETIME_PRICE_IDS` | 20 | `STRIPE_PRICE_*` (one-time) |

## API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/checkout` | POST | Subscription checkout |
| `/api/checkout-onetime` | POST | One-time purchase |
| `/api/billing-portal` | POST | Billing portal session |
| `/api/gift` | POST | Gift subscription |
| `/api/invoices` | POST | Invoice history |
| `/api/webhooks/stripe` | POST | Webhook handler (6 events) |

## Webhook Security

```typescript
const event = stripe.webhooks.constructEvent(
  body,
  request.headers.get('stripe-signature'),
  process.env.STRIPE_WEBHOOK_SECRET
);
```

All webhook payloads verified with `STRIPE_WEBHOOK_SECRET` before processing.

## Tax Compliance

Every checkout session includes:
- `automatic_tax: { enabled: true }` — Stripe Tax calculates rates
- `tax_id_collection: { enabled: true }` — Collects EU VAT, UK VAT, etc.
