import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { firstName, lastName, email, organization, inquiryType, message } = data;

        if (!email || !firstName || !message) {
            return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
        }

        await adminDb.collection('inquiries').add({
            firstName,
            lastName: lastName || '',
            email: email.toLowerCase(),
            organization: organization || '',
            inquiryType: inquiryType || 'general',
            message,
            status: 'new',
            createdAt: new Date().toISOString(),
        });

        // Also add to subscribers if not exists
        const existing = await adminDb.collection('subscribers')
            .where('email', '==', email.toLowerCase()).get();
        if (existing.empty) {
            await adminDb.collection('subscribers').add({
                email: email.toLowerCase(),
                tier: 'free',
                subscribedAt: new Date().toISOString(),
                source: `contact_${inquiryType}`,
                active: true,
            });
        }

        return NextResponse.json({ message: 'Inquiry submitted successfully' });
    } catch (error) {
        console.error('Contact error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
