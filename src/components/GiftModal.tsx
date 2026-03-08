'use client';

import { useState, FormEvent } from 'react';

interface GiftModalProps {
    isOpen: boolean;
    onClose: () => void;
    tier: string;
    tierLabel: string;
}

export default function GiftModal({ isOpen, onClose, tier, tierLabel }: GiftModalProps) {
    const [purchaserEmail, setPurchaserEmail] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/gift', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tier, purchaserEmail, recipientEmail, recipientName, message }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || 'Gift checkout failed');
            }

            const { url } = await res.json();
            if (url) window.location.href = url;
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
        }} onClick={onClose}>
            <div className="card" style={{ maxWidth: '480px', width: '100%', padding: '2rem' }} onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div>
                        <h2 style={{ fontSize: '1.3rem', marginBottom: '0.25rem' }}>Gift a Subscription</h2>
                        <p style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)' }}>{tierLabel} tier</p>
                    </div>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--light-text)', fontSize: '1.5rem', cursor: 'pointer', opacity: 0.5 }}>&times;</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', opacity: 0.7, display: 'block', marginBottom: '0.3rem' }}>Your email</label>
                        <input type="email" required value={purchaserEmail} onChange={(e) => setPurchaserEmail(e.target.value)} placeholder="you@company.com" style={inputStyle} />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', opacity: 0.7, display: 'block', marginBottom: '0.3rem' }}>Recipient email</label>
                        <input type="email" required value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} placeholder="recipient@company.com" style={inputStyle} />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', opacity: 0.7, display: 'block', marginBottom: '0.3rem' }}>Recipient name (optional)</label>
                        <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Jane Smith" style={inputStyle} />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', opacity: 0.7, display: 'block', marginBottom: '0.3rem' }}>Personal message (optional)</label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Thought you'd find this valuable..." rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>
                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', cursor: loading ? 'wait' : 'pointer', justifyContent: 'center' }}>
                        {loading ? 'Redirecting to checkout...' : `Purchase Gift — ${tierLabel}`}
                    </button>
                    <p style={{ fontSize: '0.75rem', opacity: 0.5, textAlign: 'center' }}>
                        The recipient will receive an email with activation instructions.
                    </p>
                </form>
            </div>
        </div>
    );
}

const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem',
    background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)',
    borderRadius: '8px', color: 'var(--light-text)',
    fontFamily: 'var(--font-sans)', fontSize: '0.9rem',
};
