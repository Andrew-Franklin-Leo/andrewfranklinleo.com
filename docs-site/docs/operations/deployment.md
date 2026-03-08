---
sidebar_position: 1
---

# Deployment & Operations

Vercel deployment pipeline, environment configuration, and monitoring.

## Deployment Target

| Property | Value |
|----------|-------|
| Platform | Vercel |
| Framework | Next.js 16 (App Router) |
| Build | Static Site Generation (SSG) |
| CDN | Vercel Edge Network (global) |
| Domain | `andrewfranklinleo.com` |

## Build Verification

```bash
npm run build
```

Must pass with:
- 0 TypeScript errors
- 0 ESLint errors
- 27 static routes generated
- 66+ dynamic routes generated
- All 93+ pages in sitemap

## Environment Variables

### Required for Production

| Variable | Source | Required |
|----------|--------|----------|
| `NEXT_PUBLIC_BASE_URL` | Config | Yes |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Console | Yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Console | Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Console | Yes |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Console | Yes |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Console | Yes |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase Console | Yes |
| `FIREBASE_PROJECT_ID` | Firebase Console | Yes |
| `FIREBASE_CLIENT_EMAIL` | Firebase Console | Yes |
| `FIREBASE_PRIVATE_KEY` | Firebase Console | Yes |
| `STRIPE_SECRET_KEY` | Stripe Dashboard | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard | Yes |
| `EMAIL_PROVIDER` | Config (`resend`) | Yes |
| `EMAIL_API_KEY` | Resend/SendGrid | Yes |
| 31x `STRIPE_PRICE_*` | `setup-stripe.ts` output | Yes |

**Total: 46 environment variables**

## Activation Checklist

### Step 1: Firebase
- [ ] Create Firebase project
- [ ] Enable Email/Password authentication
- [ ] Enable Google authentication
- [ ] Create Firestore database
- [ ] Set Firestore security rules
- [ ] Copy client config to `NEXT_PUBLIC_FIREBASE_*` vars
- [ ] Generate service account key for `FIREBASE_*` admin vars

### Step 2: Stripe
- [x] Create 31 products via `setup-stripe.ts`
- [x] All 31 price IDs in `.env.local`
- [ ] Configure Billing Portal in Stripe Dashboard
- [ ] Add webhook endpoint: `https://andrewfranklinleo.com/api/webhooks/stripe`
- [ ] Subscribe to 6 events (checkout.session.completed, etc.)
- [ ] Copy webhook signing secret to `STRIPE_WEBHOOK_SECRET`

### Step 3: Email
- [ ] Create Resend account
- [ ] Verify sending domain (`andrewfranklinleo.com`)
- [ ] Generate API key
- [ ] Add `EMAIL_API_KEY` to environment

### Step 4: Vercel
- [ ] Connect GitHub repository
- [ ] Add all 46 environment variables
- [ ] Configure custom domain
- [ ] Enable automatic deployments from main branch
- [ ] Verify build succeeds

### Step 5: Post-Deploy
- [ ] Test Stripe checkout (use test mode first)
- [ ] Test webhook delivery
- [ ] Test email delivery
- [ ] Verify all 93+ routes load
- [ ] Check Lighthouse scores (Performance 90+, SEO 100)
- [ ] Monitor error logs for first 24 hours
