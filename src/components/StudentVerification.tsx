'use client';

import { useState, FormEvent } from 'react';

export default function StudentVerification() {
    const [email, setEmail] = useState('');
    const [institution, setInstitution] = useState('');
    const [studentId, setStudentId] = useState('');
    const [graduationYear, setGraduationYear] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'approved' | 'pending' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/verify-student', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    institution,
                    studentId,
                    graduationYear: parseInt(graduationYear),
                    dateOfBirth,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Verification failed');

            setStatus(data.status === 'approved' ? 'approved' : 'pending');
            setMessage(data.message);
        } catch (err) {
            setStatus('error');
            setMessage(err instanceof Error ? err.message : 'Verification failed');
        }
    };

    if (status === 'approved' || status === 'pending') {
        return (
            <div className="card" style={{ padding: '1.5rem', maxWidth: '500px' }}>
                <div style={{ color: status === 'approved' ? '#4ade80' : 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {status === 'approved' ? 'Verified' : 'Pending Review'}
                </div>
                <p style={{ fontSize: '0.9rem', opacity: 0.85 }}>{message}</p>
            </div>
        );
    }

    return (
        <div className="card" style={{ padding: '1.5rem', maxWidth: '500px' }}>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>Student / Early-Career Verification</h3>
            <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '1rem' }}>
                Verify your eligibility for Early Operator pricing ($99/year with 5-year lock-in). Available for under-28s and current students.
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Academic email (e.g., name@university.edu)" style={inputStyle} />
                <input type="text" required value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="Institution name" style={inputStyle} />
                <input type="text" required value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="Student ID" style={inputStyle} />
                <input type="number" required value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} placeholder="Expected graduation year" min="2024" max="2035" style={inputStyle} />
                <input type="date" required value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} style={inputStyle} />
                <button type="submit" disabled={status === 'loading'} className="btn btn-primary" style={{ cursor: status === 'loading' ? 'wait' : 'pointer' }}>
                    {status === 'loading' ? 'Verifying...' : 'Verify Eligibility'}
                </button>
                {status === 'error' && <p style={{ fontSize: '0.82rem', color: '#f87171' }}>{message}</p>}
            </form>
        </div>
    );
}

const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.65rem 0.85rem',
    background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)',
    borderRadius: '8px', color: 'var(--light-text)',
    fontFamily: 'var(--font-sans)', fontSize: '0.88rem',
};
