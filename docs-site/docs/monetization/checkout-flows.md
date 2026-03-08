---
sidebar_position: 3
---

# Checkout Flows

Every purchase path from page to payment.

## Subscription Checkout

```
User visits /subscribe
    → Selects tier
    → Clicks CheckoutButton
    → POST /api/checkout
        → stripe.checkout.sessions.create({ mode: 'subscription' })
    → Redirect to Stripe Checkout
    → Stripe webhook: checkout.session.completed
        → Create/update Firestore user doc
        → Send welcome email
        → Track referral (if applicable)
    → Redirect to /portal
```

## One-Time Purchase Checkout

```
User visits /case-studies, /events, /podcast, or /licensing
    → Clicks CheckoutButton
    → POST /api/checkout-onetime
        → stripe.checkout.sessions.create({ mode: 'payment' })
    → Redirect to Stripe Checkout
    → Stripe webhook: checkout.session.completed
        → Record purchase in Firestore
        → Send confirmation email
        → Deliver digital asset (if applicable)
    → Redirect to success page
```

## Gift Subscription Checkout

```
User visits /gift
    → Opens GiftModal
    → Enters recipient email, name, message
    → POST /api/gift
        → stripe.checkout.sessions.create({
            mode: 'subscription',
            metadata: { gift: true, recipientEmail, recipientName, giftMessage }
          })
    → Redirect to Stripe Checkout
    → Stripe webhook: checkout.session.completed
        → Create recipient account in Firestore
        → Send gift notification email to recipient
    → Redirect to /gift/success
```

## Billing Portal

```
Authenticated user on /portal
    → Clicks "Manage Billing"
    → POST /api/billing-portal
        → stripe.billingPortal.sessions.create()
    → Redirect to Stripe Customer Portal
    → User manages plan/payment/invoices
    → Returns to /portal
```

## Metered Paywall

```
User visits /essays/[slug]
    → PaywallGate checks view count (localStorage)
    → If views < 3: Show article + meter bar ("2 of 3 free articles remaining")
    → If views >= 3: Show blur overlay + subscribe CTA
    → If authenticated with active subscription: Show full article
```

## Student Verification

```
User on /subscribe
    → Clicks "Student? Verify eligibility"
    → StudentVerification form appears
    → Enters name, email, DOB, institution
    → POST /api/verify-student
        → Validates age (< 28)
        → Validates academic email domain (.edu, .ac.uk, etc.)
        → Records verification in Firestore
    → If eligible: Redirects to Early Operator checkout ($99/yr)
```
