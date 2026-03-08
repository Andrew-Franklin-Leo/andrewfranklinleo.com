import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST(req: NextRequest) {
  try {
    const { email, tier } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const validTiers = ['free', 'practitioner', 'institutional'];
    const subscriberTier = validTiers.includes(tier) ? tier : 'free';

    const ref = adminDb.collection('newsletter_subscribers');
    const existing = await ref.where('email', '==', email.toLowerCase()).get();
    if (!existing.empty) {
      return NextResponse.json({ message: 'Already subscribed', status: 'existing' });
    }

    await ref.add({
      email: email.toLowerCase(),
      tier: subscriberTier,
      subscribedAt: new Date().toISOString(),
      status: 'active',
    });

    return NextResponse.json({ message: 'Subscribed successfully', status: 'new' });
  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
