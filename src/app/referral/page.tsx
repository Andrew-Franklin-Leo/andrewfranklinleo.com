"use client";

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const REWARDS = [
    {
        count: 1,
        title: '1 Referral',
        reward: '"Atomic Constraint" framework PDF (annotated)',
        desc: 'The core constraint-mapping framework used by enterprise governance teams, with Andrew\'s annotations.',
    },
    {
        count: 3,
        title: '3 Referrals',
        reward: '1-month free Practitioner upgrade',
        desc: 'Full archive access, annotated PDFs, and the monthly Governance Signal briefing for one month.',
    },
    {
        count: 5,
        title: '5 Referrals',
        reward: '"Obligation Infrastructure" book',
        desc: 'Physical or digital copy of the forthcoming book on building obligation-grade systems.',
    },
    {
        count: 10,
        title: '10 Referrals',
        reward: 'Quarterly Constraint Roundtable invitation',
        desc: 'Join a private quarterly call with Andrew and senior governance practitioners.',
    },
];

function ReferralContent() {
    const searchParams = useSearchParams();
    const refCode = searchParams.get('ref');

    useEffect(() => {
        if (refCode) {
            localStorage.setItem('referral_code', refCode);
        }
    }, [refCode]);

    return (
        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <p className="hero__eyebrow">// Referral Programme</p>
            <h1 className="section-title" style={{ maxWidth: '700px' }}>
                Share Obligation Intelligence. <span className="accent">Earn Rewards.</span>
            </h1>
            <p style={{ fontSize: '1.1rem', maxWidth: '600px', marginBottom: '3.5rem', opacity: 0.85, lineHeight: 1.85 }}>
                Every referral strengthens the governance practitioner network. Share your unique link,
                and unlock exclusive resources as your community grows.
            </p>

            {refCode && (
                <div className="card" style={{ maxWidth: '540px', marginBottom: '2.5rem', borderColor: '#3b82f6' }}>
                    <p style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                        You were referred with code: <strong className="accent" style={{ fontFamily: 'var(--font-mono, monospace)' }}>{refCode}</strong>
                    </p>
                    <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                        This code has been saved. It will be applied when you subscribe.
                    </p>
                </div>
            )}

            {/* Reward Tiers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
                {REWARDS.map((r) => (
                    <div key={r.count} className="pricing-card">
                        <div className="pricing-card__badge" style={{ position: 'static', marginBottom: '0.75rem', transform: 'none' }}>
                            {r.title}
                        </div>
                        <div className="pricing-card__name" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                            {r.reward}
                        </div>
                        <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.6 }}>
                            {r.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* Enterprise Referral */}
            <div className="thesis-block" style={{ marginBottom: '3rem' }}>
                <h2 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                    Enterprise <span className="accent">Referral</span>
                </h2>
                <p style={{ marginBottom: '1rem' }}>
                    Refer an enterprise or institutional client and receive <strong>10-15% of first-year revenue</strong> as
                    a referral commission. Applies to Institutional tier engagements ($5K-$25K/year).
                </p>
                <p style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
                    Contact us to register as an enterprise referral partner and receive your dedicated tracking link.
                </p>
                <Link href="/contact" className="btn btn-ghost">Become a Referral Partner</Link>
            </div>

            {/* CTA */}
            <div className="card" style={{ maxWidth: '540px' }}>
                <h3>Ready to Subscribe?</h3>
                <p style={{ fontSize: '0.95rem', opacity: 0.8, marginBottom: '1.25rem' }}>
                    {refCode
                        ? `Your referral code (${refCode}) will be applied automatically at checkout.`
                        : 'Choose your access tier and join the Obligation Intelligence network.'
                    }
                </p>
                <Link href="/subscribe" className="btn btn-primary" style={{ textAlign: 'center', justifyContent: 'center' }}>
                    View Access Tiers
                </Link>
            </div>
        </div>
    );
}

export default function ReferralPage() {
    return (
        <Suspense fallback={
            <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem', textAlign: 'center' }}>
                <p style={{ opacity: 0.6 }}>Loading referral programme...</p>
            </div>
        }>
            <ReferralContent />
        </Suspense>
    );
}
