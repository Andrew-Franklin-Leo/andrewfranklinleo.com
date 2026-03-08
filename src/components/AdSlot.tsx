'use client';

import Link from 'next/link';

interface AdSlotProps {
    position: 'banner' | 'sidebar' | 'inline' | 'footer';
    vertical?: string;
    region?: string;
}

// Advertising slot component — serves internal promos or partner ads
// Configured via Firestore ads collection or defaults to house ads

const HOUSE_ADS = {
    banner: {
        headline: 'Governance Intelligence Terminal',
        body: 'Real-time regulatory tracking across 50+ jurisdictions. Bloomberg-comparable intelligence for AI enterprise operators.',
        cta: 'Learn More',
        href: '/intelligence',
        tag: 'Q4 2026',
    },
    sidebar: {
        headline: 'The Obligation Summit',
        body: 'The annual gathering for governance practitioners. London, Q4 2026.',
        cta: 'Register Interest',
        href: '/events',
        tag: 'Annual Conference',
    },
    inline: {
        headline: 'Subscribe to Obligation Intelligence',
        body: 'Governance frameworks, regulatory tracking, and accountability architecture. From $29/month.',
        cta: 'View Plans',
        href: '/subscribe',
        tag: null,
    },
    footer: {
        headline: 'Become a Podcast Sponsor',
        body: 'Single sponsor slot per episode. Reach enterprise CROs, AI ethics leads, and institutional investors.',
        cta: 'Enquire',
        href: '/contact',
        tag: '$5K-$15K/episode',
    },
};

export default function AdSlot({ position }: AdSlotProps) {
    const ad = HOUSE_ADS[position];

    return (
        <div style={{
            background: 'rgba(245, 166, 35, 0.04)',
            border: '1px solid rgba(245, 166, 35, 0.12)',
            borderRadius: '8px',
            padding: position === 'banner' ? '1.25rem 1.5rem' : '1rem 1.25rem',
            ...(position === 'banner' ? { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' } : {}),
        }}>
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.4 }}>Sponsored</span>
                    {ad.tag && <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)' }}>{ad.tag}</span>}
                </div>
                <h4 style={{ fontSize: position === 'banner' ? '1rem' : '0.9rem', marginBottom: '0.25rem' }}>{ad.headline}</h4>
                <p style={{ fontSize: '0.82rem', opacity: 0.7, lineHeight: 1.5 }}>{ad.body}</p>
            </div>
            <Link href={ad.href} className="btn btn-ghost" style={{
                fontSize: '0.8rem', padding: '0.4rem 1rem', whiteSpace: 'nowrap',
                ...(position !== 'banner' ? { marginTop: '0.75rem' } : {}),
            }}>
                {ad.cta}
            </Link>
        </div>
    );
}
