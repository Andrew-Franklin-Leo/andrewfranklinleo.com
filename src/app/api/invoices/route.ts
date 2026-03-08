import { NextRequest, NextResponse } from 'next/server';
import { getCustomerInvoices } from '@/lib/stripe';
import { adminDb } from '@/lib/firebase/admin';

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json() as { email: string };
        if (!email) {
            return NextResponse.json({ error: 'Email required' }, { status: 400 });
        }

        const stakeholders = await adminDb.collection('stakeholders')
            .where('email', '==', email.toLowerCase())
            .limit(1)
            .get();

        if (stakeholders.empty) {
            return NextResponse.json({ invoices: [] });
        }

        const customerId = stakeholders.docs[0].data().stripeCustomerId;
        if (!customerId) {
            return NextResponse.json({ invoices: [] });
        }

        const invoices = await getCustomerInvoices(customerId);
        return NextResponse.json({ invoices });
    } catch (error) {
        console.error('Invoice retrieval error:', error);
        return NextResponse.json({ error: 'Failed to retrieve invoices' }, { status: 500 });
    }
}
