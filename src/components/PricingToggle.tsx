'use client';

import { useState } from 'react';

interface PricingToggleProps {
    onToggle: (billing: 'monthly' | 'annual') => void;
    defaultBilling?: 'monthly' | 'annual';
    savingsLabel?: string;
}

export default function PricingToggle({ onToggle, defaultBilling = 'monthly', savingsLabel = 'Save 20%' }: PricingToggleProps) {
    const [billing, setBilling] = useState<'monthly' | 'annual'>(defaultBilling);

    const handleToggle = (value: 'monthly' | 'annual') => {
        setBilling(value);
        onToggle(value);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center', marginBottom: '2rem' }}>
            <button
                onClick={() => handleToggle('monthly')}
                style={{
                    background: billing === 'monthly' ? 'rgba(245, 166, 35, 0.15)' : 'transparent',
                    border: `1px solid ${billing === 'monthly' ? 'var(--accent-gold)' : 'var(--border-color)'}`,
                    color: billing === 'monthly' ? 'var(--accent-gold)' : 'var(--light-text)',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '8px 0 0 8px',
                    cursor: 'pointer',
                    fontSize: '0.88rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: billing === 'monthly' ? 600 : 400,
                    transition: 'all 0.2s',
                }}
            >
                Monthly
            </button>
            <button
                onClick={() => handleToggle('annual')}
                style={{
                    background: billing === 'annual' ? 'rgba(245, 166, 35, 0.15)' : 'transparent',
                    border: `1px solid ${billing === 'annual' ? 'var(--accent-gold)' : 'var(--border-color)'}`,
                    color: billing === 'annual' ? 'var(--accent-gold)' : 'var(--light-text)',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '0 8px 8px 0',
                    cursor: 'pointer',
                    fontSize: '0.88rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: billing === 'annual' ? 600 : 400,
                    transition: 'all 0.2s',
                    position: 'relative',
                }}
            >
                Annual
                {billing === 'annual' && (
                    <span style={{
                        position: 'absolute', top: '-10px', right: '-12px',
                        background: 'var(--accent-gold)', color: '#0D1117',
                        fontSize: '0.6rem', fontWeight: 700, padding: '2px 6px',
                        borderRadius: '4px', whiteSpace: 'nowrap',
                    }}>
                        {savingsLabel}
                    </span>
                )}
            </button>
        </div>
    );
}
