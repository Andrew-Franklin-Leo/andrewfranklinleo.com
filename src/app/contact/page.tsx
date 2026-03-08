'use client';

import { useState } from 'react';
import Link from 'next/link';

const inquiryTypes = [
    'Speaking Enquiry',
    'Institutional Subscription',
    'Framework Licensing',
    'Consulting / Advisory Retainer',
    'Constraint Council Membership',
    'Case Study Purchase',
    'Governance Intelligence Terminal',
    'Obligation Summit / Events',
    'Podcast Sponsorship',
    'Corporate Book Bundle',
    'ORF Certification',
    'Media / Press',
    'Other',
];

export default function ContactPage() {
    const [type, setType] = useState('');
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        organization: '',
        message: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, inquiryType: type }),
            });

            if (!res.ok) throw new Error('Failed to submit');
            setSent(true);
        } catch {
            setError('Failed to submit. Please email andrew.palupillai@frankmax.digital directly.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <p className="hero__eyebrow">// Contact</p>
            <h1 className="section-title">
                Get in <span className="accent">Touch</span>
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '4rem', alignItems: 'start' }}>
                {/* Form */}
                <div>
                    <p style={{ fontSize: '1.05rem', opacity: 0.88, lineHeight: 1.85, marginBottom: '2.5rem' }}>
                        For speaking, institutional access, framework licensing, consulting enquiries,
                        Constraint Council membership, case study purchases, or Governance Intelligence Terminal
                        access — use the form below. Andrew reviews all enquiries personally
                        and responds within 48 hours.
                    </p>

                    {sent ? (
                        <div className="thesis-block">
                            <h3 style={{ marginBottom: '1rem' }}>Enquiry Received</h3>
                            <p>Thank you. Andrew will review your enquiry and respond within 48 hours via email.</p>
                            <p style={{ marginTop: '1rem' }}>
                                <Link href="/essays" className="btn btn-secondary">Read Frameworks While You Wait</Link>
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={labelStyle}>First Name</label>
                                    <input type="text" required placeholder="Andrew" style={inputStyle}
                                        value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Last Name</label>
                                    <input type="text" required placeholder="Smith" style={inputStyle}
                                        value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>Email</label>
                                <input type="email" required placeholder="cro@enterprise.com" style={inputStyle}
                                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                            </div>

                            <div>
                                <label style={labelStyle}>Organisation</label>
                                <input type="text" placeholder="Company / Institution" style={inputStyle}
                                    value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} />
                            </div>

                            <div>
                                <label style={labelStyle}>Inquiry Type</label>
                                <select value={type} onChange={(e) => setType(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                                    <option value="">Select enquiry type...</option>
                                    {inquiryTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>

                            <div>
                                <label style={labelStyle}>Message</label>
                                <textarea required rows={5}
                                    placeholder="Describe the engagement, timeline, and specific requirement..."
                                    style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                            </div>

                            {error && <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>{error}</p>}

                            <button type="submit" disabled={loading} className="btn btn-primary"
                                style={{ alignSelf: 'flex-start', fontSize: '1rem', padding: '0.9rem 2rem', opacity: loading ? 0.6 : 1 }}>
                                {loading ? 'Submitting...' : 'Submit Enquiry'}
                            </button>
                        </form>
                    )}
                </div>

                {/* Sidebar */}
                <div style={{ position: 'sticky', top: '120px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="card">
                        <h3 style={{ fontSize: '1rem' }}>Direct Email</h3>
                        <a href="mailto:andrew.palupillai@frankmax.digital" style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', textDecoration: 'none', wordBreak: 'break-all' }}>
                            andrew.palupillai@frankmax.digital
                        </a>
                    </div>

                    <div className="card">
                        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Revenue Enquiries</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', opacity: 0.8 }}>
                            <span>Speaking: $1,500 - $75,000</span>
                            <span>Institutional: $5K - $25K/year</span>
                            <span>Analyst Access: $2K - $10K/month</span>
                            <span>Case Studies: $25 - $75 each</span>
                            <span>Council: $500 - $2,500/year</span>
                            <span>Terminal: $30K - $100K/year</span>
                        </div>
                    </div>

                    <div className="card">
                        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>The Constraint Council</h3>
                        <p style={{ fontSize: '0.88rem', opacity: 0.75, lineHeight: 1.65, marginBottom: '1rem' }}>
                            Paying member community for enterprise AI leaders. Quarterly roundtables, essay contributions,
                            and peer network access at $500 - $2,500/year.
                        </p>
                        <Link href="/council" style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', textDecoration: 'none' }}>
                            Learn more about the Council
                        </Link>
                    </div>

                    <div className="card">
                        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Quick Links</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            <Link href="/speaking" style={linkStyle}>Speaking fees & topics</Link>
                            <Link href="/subscribe" style={linkStyle}>Subscription tiers</Link>
                            <Link href="/intelligence" style={linkStyle}>Governance Intelligence</Link>
                            <Link href="/events" style={linkStyle}>Events & Summit</Link>
                            <Link href="/case-studies" style={linkStyle}>Case Studies</Link>
                            <Link href="/essays" style={linkStyle}>Framework archive</Link>
                            <Link href="/portal" style={linkStyle}>Stakeholder portal</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.8rem',
    color: 'var(--accent-blue)',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '0.5rem',
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    color: 'var(--light-text)',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.25s',
};

const linkStyle: React.CSSProperties = {
    color: 'var(--accent-gold)',
    fontSize: '0.9rem',
    textDecoration: 'none',
};
