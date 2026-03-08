'use client';

import { useState } from 'react';

const eventNames = [
    'The Obligation Summit',
    'ORF Protocol Certification Day',
    'Quarterly Constraint Roundtables',
    'The Governance Dinner',
    'Speaking Engagements',
];

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

export default function EventRegistrationForm() {
    const [sent, setSent] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState('');

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
                    inquiryType: 'event',
                    event: selectedEvent,
                    message: formData.get('message'),
                }),
            });
        } catch {
            // silent
        }
        setSent(true);
    };

    return (
        <div id="register-interest" className="thesis-block" style={{ maxWidth: '640px' }}>
            <h2 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                Register <span className="accent">Interest</span>
            </h2>
            {sent ? (
                <div>
                    <h3 style={{ marginBottom: '1rem' }}>Enquiry Received</h3>
                    <p>Thank you for your interest. Andrew will review your registration and respond within 48 hours.</p>
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
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Organisation</label>
                        <input type="text" name="organisation" placeholder="Company / Institution" style={inputStyle} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Event Interest</label>
                        <select
                            value={selectedEvent}
                            onChange={(e) => setSelectedEvent(e.target.value)}
                            style={{ ...inputStyle, cursor: 'pointer' }}
                        >
                            <option value="">Select event...</option>
                            {eventNames.map((name) => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Message</label>
                        <textarea
                            name="message"
                            rows={4}
                            placeholder="Any specific interests, group size, or questions..."
                            style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', fontSize: '1rem', padding: '0.9rem 2rem' }}>
                        Submit Registration →
                    </button>
                </form>
            )}
        </div>
    );
}
