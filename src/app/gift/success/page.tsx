import Link from 'next/link';

export default function GiftSuccessPage() {
    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem', textAlign: 'center', maxWidth: '600px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'var(--accent-gold)' }}>&#10003;</div>
            <h1 className="section-title">Gift <span className="accent">Sent</span></h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.85, lineHeight: 1.85, marginBottom: '2rem' }}>
                Your gift subscription has been purchased successfully. The recipient will receive an email
                with activation instructions and your personal message.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/gift" className="btn btn-ghost">Send Another Gift</Link>
                <Link href="/" className="btn btn-primary">Return Home</Link>
            </div>
        </div>
    );
}
