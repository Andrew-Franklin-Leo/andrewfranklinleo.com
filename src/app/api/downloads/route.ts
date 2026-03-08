import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

// Secure digital download delivery
// Validates purchase records before generating download links

const DOWNLOAD_MAP: Record<string, { filename: string; contentType: string; path: string }> = {
    case_study_standard: { filename: 'case-study.pdf', contentType: 'application/pdf', path: '/downloads/case-studies/' },
    case_study_premium: { filename: 'case-study-premium.pdf', contentType: 'application/pdf', path: '/downloads/case-studies/' },
    teaching_licence: { filename: 'teaching-licence-pack.zip', contentType: 'application/zip', path: '/downloads/teaching/' },
    orf_protocol_pdf: { filename: 'orf-protocol-annotated.pdf', contentType: 'application/pdf', path: '/downloads/frameworks/' },
    fragility_codex: { filename: 'fragility-codex.pdf', contentType: 'application/pdf', path: '/downloads/frameworks/' },
    atomic_constraint_pdf: { filename: 'atomic-constraint-annotated.pdf', contentType: 'application/pdf', path: '/downloads/frameworks/' },
};

export async function POST(req: NextRequest) {
    try {
        const { email, productId } = await req.json() as { email: string; productId: string };

        if (!email || !productId) {
            return NextResponse.json({ error: 'Email and productId required' }, { status: 400 });
        }

        const downloadInfo = DOWNLOAD_MAP[productId];
        if (!downloadInfo) {
            return NextResponse.json({ error: 'Invalid product' }, { status: 400 });
        }

        // Check purchase record
        const purchases = await adminDb.collection('purchases')
            .where('email', '==', email.toLowerCase())
            .where('product', '==', productId)
            .where('status', '==', 'completed')
            .limit(1)
            .get();

        // Also check active subscription (some downloads included in paid tiers)
        const stakeholders = await adminDb.collection('stakeholders')
            .where('email', '==', email.toLowerCase())
            .where('active', '==', true)
            .limit(1)
            .get();

        const hasPurchase = !purchases.empty;
        const tier = stakeholders.empty ? 'free' : (stakeholders.docs[0].data().tier || 'free');
        const paidTiers = ['practitioner', 'operator', 'atomicCircle', 'institutional'];
        const hasSubscriptionAccess = paidTiers.includes(tier);

        if (!hasPurchase && !hasSubscriptionAccess) {
            return NextResponse.json({ error: 'Purchase or active subscription required' }, { status: 403 });
        }

        // Generate time-limited download token
        const token = Buffer.from(JSON.stringify({
            email: email.toLowerCase(),
            product: productId,
            expires: Date.now() + 3600000, // 1 hour
        })).toString('base64url');

        // Log download
        await adminDb.collection('download_logs').add({
            email: email.toLowerCase(),
            product: productId,
            timestamp: new Date().toISOString(),
        });

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

        return NextResponse.json({
            downloadUrl: `${baseUrl}/api/downloads/serve?token=${token}`,
            filename: downloadInfo.filename,
            expiresIn: '1 hour',
        });
    } catch (error) {
        console.error('Download error:', error);
        return NextResponse.json({ error: 'Failed to generate download link' }, { status: 500 });
    }
}
