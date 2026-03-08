'use client';

import { useState } from 'react';

interface CheckoutButtonProps {
    tier?: string;
    product?: string;
    label: string;
    className?: string;
    style?: React.CSSProperties;
    billing?: 'monthly' | 'annual';
    email?: string;
    quantity?: number;
}

export default function CheckoutButton({ tier, product, label, className = 'btn btn-primary', style, billing, email, quantity }: CheckoutButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        try {
            // Get referral code from localStorage
            const referralCode = typeof window !== 'undefined' ? localStorage.getItem('referral_code') || '' : '';

            const endpoint = product ? '/api/checkout-onetime' : '/api/checkout';
            const body = product
                ? { product, email, quantity }
                : { tier, email, billing, referralCode };

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || 'Checkout failed');
            }

            const { url } = await res.json();
            if (url) window.location.href = url;
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Checkout failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className={className}
            style={{ cursor: loading ? 'wait' : 'pointer', ...style }}
        >
            {loading ? 'Redirecting...' : label}
        </button>
    );
}
