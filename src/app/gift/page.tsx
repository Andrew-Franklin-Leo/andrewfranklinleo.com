'use client';

import { useState } from 'react';
import GiftModal from '@/components/GiftModal';

const GIFT_TIERS = [
    { key: 'practitioner_annual', label: 'Practitioner', price: '$278/year', desc: 'Full essay archive, annotated PDFs, and monthly Governance Signal briefing.' },
    { key: 'operator_annual', label: 'Operator', price: '$1,428/year', desc: 'Everything in Practitioner plus live AMAs, Stakeholder Portal, and priority framework access.' },
    { key: 'atomicCircle', label: 'Atomic Circle', price: '$250/year', desc: 'Private strategy calls, exclusive constraint memos, and certification first access.' },
];

export default function GiftPage() {
    const [selectedTier, setSelectedTier] = useState<string | null>(null);

    return (
        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <p className="hero__eyebrow">// Gift Subscriptions</p>
            <h1 className="section-title">Give the Gift of <span className="accent">Governance Intelligence</span></h1>
            <p style={{ fontSize: '1.1rem', maxWidth: '650px', marginBottom: '3.5rem', opacity: 0.85, lineHeight: 1.85 }}>
                Gift an andrewfranklinleo.com subscription to a colleague, team member, or anyone who needs
                governance intelligence. The recipient receives full access with a personal message from you.
            </p>

            <div className="pricing-grid" style={{ marginBottom: '4rem' }}>
                {GIFT_TIERS.map((t, i) => (
                    <div key={t.key} className={`pricing-card${i === 1 ? ' pricing-card--featured' : ''}`}>
                        {i === 1 && <div className="pricing-card__badge">Most Popular Gift</div>}
                        <div className="pricing-card__name">{t.label}</div>
                        <div className="pricing-card__price">{t.price}</div>
                        <p style={{ fontSize: '0.88rem', opacity: 0.75, lineHeight: 1.5 }}>{t.desc}</p>
                        <button
                            onClick={() => setSelectedTier(t.key)}
                            className={`btn ${i === 1 ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ marginTop: '1rem', textAlign: 'center', justifyContent: 'center', width: '100%', cursor: 'pointer' }}
                        >
                            Gift {t.label}
                        </button>
                    </div>
                ))}
            </div>

            <div className="thesis-block" style={{ textAlign: 'center' }}>
                <h3 style={{ marginBottom: '1rem' }}>How Gift Subscriptions Work</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', maxWidth: '700px', margin: '0 auto', textAlign: 'left' }}>
                    <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>01</div>
                        <p style={{ fontSize: '0.9rem', opacity: 0.85 }}>Choose a tier and complete checkout. You pay — your recipient gets full access.</p>
                    </div>
                    <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>02</div>
                        <p style={{ fontSize: '0.9rem', opacity: 0.85 }}>The recipient receives an email with your personal message and activation link.</p>
                    </div>
                    <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>03</div>
                        <p style={{ fontSize: '0.9rem', opacity: 0.85 }}>They activate their subscription instantly — no payment required from them.</p>
                    </div>
                </div>
            </div>

            {selectedTier && (
                <GiftModal
                    isOpen={true}
                    onClose={() => setSelectedTier(null)}
                    tier={selectedTier}
                    tierLabel={GIFT_TIERS.find((t) => t.key === selectedTier)?.label || ''}
                />
            )}
        </div>
    );
}
