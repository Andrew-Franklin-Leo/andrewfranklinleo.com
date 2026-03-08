'use client';

import { useState } from 'react';

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

export default function CouncilApplicationForm() {
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        try {
            await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    email: formData.get('email'),
                    organisation: formData.get('organisation'),
                    inquiryType: 'council',
                    tier: formData.get('tier'),
                    message: formData.get('message'),
                }),
            });
        } catch {
            // silent
        }
        setSent(true);
    };

    return (
        <div id="apply" className="thesis-block" style={{ maxWidth: '640px' }}>
            <h2 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                Apply for <span className="accent">Membership</span>
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
                Council membership is by application. We review every submission for governance experience,
                institutional relevance, and commitment to obligation infrastructure.
            </p>

            {sent ? (
                <div>
                    <h3 style={{ marginBottom: '1rem' }}>Application Received</h3>
                    <p>Thank you for applying. Andrew will review your application and respond within 48 hours.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>First Name</label>
                            <input type="text" name="firstName" required placeholder="Andrew" style={inputStyle} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Last Name</label>
                            <input type="text" name="lastName" required placeholder="Smith" style={inputStyle} />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Email</label>
                        <input type="email" name="email" required placeholder="cro@enterprise.com" style={inputStyle} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Organisation & Role</label>
                        <input type="text" name="organisation" required placeholder="Company / Institution — Your Title" style={inputStyle} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Preferred Tier</label>
                        <select name="tier" style={{ ...inputStyle, cursor: 'pointer' }}>
                            <option value="">Select tier...</option>
                            <option value="Associate ($500/year)">Associate — $500/year</option>
                            <option value="Fellow ($1,500/year)">Fellow — $1,500/year</option>
                            <option value="Senior Fellow ($2,500/year)">Senior Fellow — $2,500/year</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Why do you want to join the Council?</label>
                        <textarea
                            name="message"
                            required
                            rows={4}
                            placeholder="Describe your governance experience, what you hope to contribute, and what you want from the Council..."
                            style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', fontSize: '1rem', padding: '0.9rem 2rem' }}>
                        Submit Application →
                    </button>
                </form>
            )}
        </div>
    );
}
