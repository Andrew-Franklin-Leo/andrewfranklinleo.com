import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST(req: NextRequest) {
    try {
        const { email, referralCode } = await req.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
        }

        const subscriberRef = adminDb.collection('subscribers');

        // Check for duplicate
        const existing = await subscriberRef.where('email', '==', email.toLowerCase()).get();
        if (!existing.empty) {
            return NextResponse.json({ message: 'Already subscribed', status: 'existing' });
        }

        // Create subscriber
        await subscriberRef.add({
            email: email.toLowerCase(),
            tier: 'free',
            subscribedAt: new Date().toISOString(),
            referredBy: referralCode || null,
            source: 'website',
            active: true,
        });

        // Credit referrer if applicable
        if (referralCode) {
            const referrerQuery = await adminDb
                .collection('stakeholders')
                .where('referralCode', '==', referralCode)
                .limit(1)
                .get();

            if (!referrerQuery.empty) {
                const referrerDoc = referrerQuery.docs[0];
                const currentCount = referrerDoc.data().referralCount || 0;
                await referrerDoc.ref.update({ referralCount: currentCount + 1 });

                // Log referral in ledger
                await adminDb.collection('referral_ledger').add({
                    referrerId: referrerDoc.id,
                    referredEmail: email.toLowerCase(),
                    timestamp: new Date().toISOString(),
                    rewarded: false,
                });
            }
        }

        return NextResponse.json({ message: 'Subscribed successfully', status: 'new' });
    } catch (error) {
        console.error('Subscribe error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
