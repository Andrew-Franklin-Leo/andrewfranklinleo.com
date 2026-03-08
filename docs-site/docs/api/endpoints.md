---
sidebar_position: 1
---

# API Endpoints

All 12 API route handlers.

## Payment Endpoints

### POST `/api/checkout`

Creates a Stripe Checkout session for subscriptions.

**Request:**
```json
{
  "priceId": "practitioner_monthly",
  "billingPeriod": "monthly",
  "email": "user@example.com",
  "currency": "usd",
  "referralCode": "REF123"
}
```

**Response:** `{ "url": "https://checkout.stripe.com/..." }`

---

### POST `/api/checkout-onetime`

Creates a Stripe Checkout session for one-time purchases.

**Request:**
```json
{
  "priceId": "case_study_standard",
  "email": "user@example.com"
}
```

**Response:** `{ "url": "https://checkout.stripe.com/..." }`

---

### POST `/api/billing-portal`

Creates a Stripe Customer Portal session.

**Request:**
```json
{
  "customerId": "cus_..."
}
```

**Response:** `{ "url": "https://billing.stripe.com/..." }`

---

### POST `/api/gift`

Creates a gift subscription checkout session.

**Request:**
```json
{
  "priceId": "practitioner_annual",
  "purchaserEmail": "buyer@example.com",
  "recipientEmail": "recipient@example.com",
  "recipientName": "Jane",
  "giftMessage": "Happy birthday!"
}
```

**Response:** `{ "url": "https://checkout.stripe.com/..." }`

---

### POST `/api/invoices`

Retrieves invoice history for a customer.

**Request:**
```json
{
  "customerId": "cus_..."
}
```

**Response:**
```json
{
  "invoices": [
    {
      "id": "in_...",
      "amount_paid": 2900,
      "currency": "usd",
      "status": "paid",
      "created": 1709827200,
      "invoice_pdf": "https://...",
      "hosted_invoice_url": "https://..."
    }
  ]
}
```

## User Endpoints

### POST `/api/verify-student`

Verifies student eligibility for Early Operator pricing.

**Request:**
```json
{
  "name": "John Smith",
  "email": "john@university.edu",
  "dateOfBirth": "2000-01-15",
  "institution": "MIT"
}
```

**Validation:**
- Age must be under 28
- Email domain must be academic (`.edu`, `.ac.uk`, `.edu.au`, etc.)

**Response:** `{ "eligible": true, "checkoutUrl": "https://checkout.stripe.com/..." }`

---

### POST `/api/usage`

Returns API usage stats and rate limit status.

**Request:**
```json
{
  "userId": "uid_..."
}
```

**Response:**
```json
{
  "used": 45,
  "limit": 120,
  "remaining": 75,
  "tier": "operator",
  "resetDate": "2026-04-01"
}
```

**Rate limits by tier:**

| Tier | Requests/month |
|------|---------------|
| Free | 10 |
| Practitioner | 60 |
| Operator | 120 |
| Institutional | 300 |
| Enterprise | Unlimited |

---

### POST `/api/downloads`

Generates secure, time-limited download URLs.

**Request:**
```json
{
  "fileId": "case-study-financial-2026",
  "userId": "uid_..."
}
```

**Response:** `{ "downloadUrl": "https://...", "expiresAt": "2026-03-07T13:00:00Z" }`

## Communication Endpoints

### POST `/api/newsletter`

Newsletter signup.

**Request:**
```json
{
  "email": "user@example.com",
  "tier": "daily"
}
```

---

### POST `/api/subscribe`

Free tier account creation.

**Request:**
```json
{
  "email": "user@example.com",
  "name": "John Smith"
}
```

---

### POST `/api/contact`

Contact form submission.

**Request:**
```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "subject": "Speaking inquiry",
  "message": "..."
}
```

## Webhook Endpoint

### POST `/api/webhooks/stripe`

Handles 6 Stripe webhook events. See [Stripe Setup](/monetization/stripe-setup#webhook-events-6) for details.

**Required header:** `stripe-signature` for payload verification.
