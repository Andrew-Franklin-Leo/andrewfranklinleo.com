'use client';

import { useState, useEffect } from 'react';

interface Invoice {
    id: string;
    number: string | null;
    amount: number;
    currency: string;
    date: string;
    pdf: string | null;
    hosted_url: string | null;
}

export default function InvoiceList({ email }: { email: string }) {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!email) return;
        fetch('/api/invoices', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        })
            .then((res) => res.json())
            .then((data) => setInvoices(data.invoices || []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [email]);

    if (loading) return <p style={{ fontSize: '0.85rem', opacity: 0.5 }}>Loading invoices...</p>;
    if (invoices.length === 0) return <p style={{ fontSize: '0.85rem', opacity: 0.5 }}>No invoices yet.</p>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {invoices.map((inv) => {
                const amount = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: inv.currency.toUpperCase(),
                }).format(inv.amount / 100);

                return (
                    <div key={inv.id} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '0.75rem', borderBottom: '1px solid var(--border-color)',
                    }}>
                        <div>
                            <span style={{ fontSize: '0.88rem', fontFamily: 'var(--font-mono)' }}>{inv.number || inv.id.slice(0, 12)}</span>
                            <span style={{ fontSize: '0.78rem', opacity: 0.5, marginLeft: '1rem' }}>
                                {new Date(inv.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--accent-gold)' }}>{amount}</span>
                            {inv.pdf && (
                                <a href={inv.pdf} target="_blank" rel="noopener noreferrer"
                                   style={{ fontSize: '0.78rem', color: 'var(--accent-blue)', textDecoration: 'none' }}>
                                    PDF
                                </a>
                            )}
                            {inv.hosted_url && (
                                <a href={inv.hosted_url} target="_blank" rel="noopener noreferrer"
                                   style={{ fontSize: '0.78rem', color: 'var(--accent-blue)', textDecoration: 'none' }}>
                                    View
                                </a>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
