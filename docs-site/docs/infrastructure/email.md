---
sidebar_position: 3
---

# Email

Transactional email via Resend or SendGrid.

## Configuration

```bash
EMAIL_PROVIDER=resend       # or "sendgrid"
EMAIL_API_KEY=re_...        # API key for selected provider
```

## Email Library (`src/lib/email.ts`)

### Templates (6)

| Function | Trigger | Content |
|----------|---------|---------|
| `sendWelcomeEmail()` | New subscription | Welcome message, tier features, portal link |
| `sendGiftNotification()` | Gift purchase | Gift message, activation link |
| `sendPaymentFailedEmail()` | `invoice.payment_failed` | Update payment method CTA |
| `sendReferralRewardEmail()` | Referral milestone | Commission earned, referral count |
| `sendInvoiceEmail()` | `invoice.payment_succeeded` | Invoice PDF link, amount, date |
| `sendSubscriptionCancelledEmail()` | Subscription deleted | Win-back offer, feedback link |

### Template Design

All emails use dark-themed HTML matching platform branding:
- Background: `#0D1117`
- Text: `#F0F0F0`
- CTA buttons: `#F5A623` (gold)
- Links: `#4A9EFF` (blue)
- Font: system sans-serif stack

### Provider Abstraction

```typescript
// Automatically uses configured provider
await sendEmail({
  to: 'user@example.com',
  subject: 'Welcome to andrewfranklinleo.com',
  html: templateHtml,
});
```

Supports both Resend and SendGrid with identical interface.
