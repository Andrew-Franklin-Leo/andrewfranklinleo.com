---
sidebar_position: 1
---

# Firebase

Authentication and database layer.

## Services Used

| Service | Purpose |
|---------|---------|
| Firebase Auth | User authentication (email/password, Google) |
| Firestore | User profiles, purchases, referrals, usage tracking |

## SDK Configuration

### Client SDK (`src/lib/firebase/client.ts`)

```typescript
// Public environment variables
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

### Admin SDK (`src/lib/firebase/admin.ts`)

```typescript
// Server-side environment variables
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY  // JSON-escaped private key
```

## Firestore Collections

### `users`
```typescript
{
  uid: string;
  email: string;
  displayName: string;
  tier: 'free' | 'practitioner' | 'operator' | 'atomic_circle' | 'early_operator';
  stripeCustomerId: string;
  subscriptionId: string;
  subscriptionStatus: 'active' | 'trialing' | 'past_due' | 'canceled';
  createdAt: Timestamp;
  referralCode: string;
  referredBy: string | null;
}
```

### `purchases`
```typescript
{
  userId: string;
  productId: string;
  priceId: string;
  amount: number;
  currency: string;
  purchasedAt: Timestamp;
  sessionId: string;
}
```

### `referrals`
```typescript
{
  referrerCode: string;
  referredUserId: string;
  commission: number;
  status: 'pending' | 'paid';
  createdAt: Timestamp;
}
```

### `api_usage`
```typescript
{
  userId: string;
  endpoint: string;
  count: number;
  month: string; // "2026-03"
}
```

### `student_verifications`
```typescript
{
  userId: string;
  email: string;
  institution: string;
  dateOfBirth: string;
  verified: boolean;
  verifiedAt: Timestamp;
}
```

## Auth Provider

`src/components/AuthProvider.tsx` wraps the app with Firebase auth context:

```typescript
const { user, loading } = useAuth();
// user is null when not authenticated
// user.uid, user.email available when authenticated
```
