'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePaywall } from '@/lib/paywall';

interface PaywallGateProps {
    slug: string;
    isGated: boolean;
    children: React.ReactNode;
}

export default function PaywallGate({ slug, isGated, children }: PaywallGateProps) {
    const { remaining, freeLimit, isAtLimit, hasViewed, recordView } = usePaywall();

    useEffect(() => {
        if (!isGated || hasViewed(slug)) return;
        recordView(slug);
    }, [slug, isGated, hasViewed, recordView]);

    // Not gated — show full content
    if (!isGated) return <>{children}</>;

    // Already viewed this article — always show
    if (hasViewed(slug)) return <>{children}</>;

    // Hit the paywall
    if (isAtLimit) {
        return (
            <div>
                <div style={{ position: 'relative', maxHeight: '400px', overflow: 'hidden' }}>
                    <div style={{ filter: 'blur(4px)', pointerEvents: 'none' }}>
                        {children}
                    </div>
                    <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px',
                        background: 'linear-gradient(transparent, var(--dark-bg))',
                    }} />
                </div>
                <div className="card" style={{ textAlign: 'center', padding: '2.5rem', marginTop: '-2rem', position: 'relative', zIndex: 1 }}>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>
                        You've reached your free article limit
                    </h3>
                    <p style={{ fontSize: '0.95rem', opacity: 0.75, marginBottom: '0.5rem' }}>
                        You've read {freeLimit} free articles this month.
                    </p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.65, marginBottom: '1.5rem' }}>
                        Subscribe to unlock unlimited access to governance frameworks, regulatory intelligence, and the full Obligation Intelligence archive.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/subscribe" className="btn btn-primary">Subscribe from $29/mo</Link>
                        <Link href="/subscribe#free-form" className="btn btn-ghost">Stay on Free</Link>
                    </div>
                    <p style={{ fontSize: '0.78rem', opacity: 0.45, marginTop: '1rem' }}>
                        14-day free trial on Practitioner tier. Cancel any time.
                    </p>
                </div>
            </div>
        );
    }

    // Still have free views — show content with meter
    return (
        <div>
            {remaining <= 2 && (
                <div style={{
                    background: 'rgba(245, 166, 35, 0.08)', border: '1px solid rgba(245, 166, 35, 0.2)',
                    borderRadius: '8px', padding: '0.75rem 1.25rem', marginBottom: '1.5rem',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem',
                }}>
                    <span style={{ fontSize: '0.85rem', opacity: 0.85 }}>
                        {remaining} free {remaining === 1 ? 'article' : 'articles'} remaining this month
                    </span>
                    <Link href="/subscribe" style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: 600 }}>
                        Subscribe for unlimited access
                    </Link>
                </div>
            )}
            {children}
        </div>
    );
}
