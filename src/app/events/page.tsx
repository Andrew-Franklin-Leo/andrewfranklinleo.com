import type { Metadata } from 'next';
import CheckoutButton from '@/components/CheckoutButton';
import EventRegistrationForm from './EventRegistrationForm';

export const metadata: Metadata = {
    title: 'The Obligation Summit & Events — Andrew Palupillai | Obligation Intelligence',
    description: 'The Obligation Summit annual conference, ORF Protocol Certification workshops, Quarterly Constraint Roundtables, Governance Dinners, and speaking engagements.',
};

const events = [
    {
        name: 'The Obligation Summit',
        tag: 'Annual Conference',
        format: '1-day hybrid (London / Virtual)',
        date: 'Q4 2026 — Date TBA',
        description: 'The defining annual gathering for AI governance practitioners, enterprise operators, regulators, and institutional investors. One stage. No panels of platitudes. Every session built on obligation infrastructure, the ORF Protocol, and binding accountability systems.',
        pricing: ['Standard: $1,500', 'Executive: $3,000', 'Sponsors: $25,000 — $75,000'],
        products: [
            { label: 'Standard Ticket — $1,500', product: 'event_summit_standard' },
            { label: 'Executive Ticket — $3,000', product: 'event_summit_executive' },
        ],
        featured: true,
    },
    {
        name: 'ORF Protocol Certification Day',
        tag: 'Workshop',
        format: '4-hour intensive workshop',
        date: 'Rolling — Next cohort Q2 2026',
        description: 'Hands-on certification in the Obligation-Rights-Finality Protocol. Learn to map obligation chains, identify finality gaps, and implement binding governance architecture. Groups of 10-25 practitioners.',
        pricing: ['$1,500 — $2,500 per person', 'Group rates available for 10+'],
        products: [
            { label: 'Register — $1,500', product: 'event_certification' },
        ],
        featured: false,
    },
    {
        name: 'Quarterly Constraint Roundtables',
        tag: 'Virtual',
        format: '90-minute virtual roundtable',
        date: 'Every quarter — Next: Q2 2026',
        description: 'Structured peer discussion for governance practitioners. Each session focuses on a single constraint problem — real cases, real architectures, real failures. Limited to 30 participants.',
        pricing: ['$250 — $500 per session', 'Free for Operator-tier subscribers'],
        products: [
            { label: 'Book Seat — $250', product: 'event_roundtable' },
        ],
        featured: false,
    },
    {
        name: 'The Governance Dinner',
        tag: 'Invite-Only',
        format: 'Private dinner — 20-30 senior practitioners',
        date: 'Bi-annual — London & New York',
        description: 'An invite-only dinner for senior governance practitioners, CROs, regulators, and institutional investors. No recordings. No attribution. Candid discussion on governance problems that cannot be solved in public forums.',
        pricing: ['By invitation only', 'Nomination via Constraint Council members'],
        products: [],
        featured: false,
    },
    {
        name: 'Event Replays',
        tag: 'On-Demand',
        format: 'Recorded sessions from past events',
        date: 'Available now',
        description: 'Access recorded sessions from The Obligation Summit, Certification Days, and selected roundtables. Includes full presentations, Q&A segments, and supplementary materials.',
        pricing: ['$99 per event replay', 'Free for Operator+ subscribers'],
        products: [
            { label: 'Purchase Replay — $99', product: 'event_replay' },
        ],
        featured: false,
    },
];

export default function EventsPage() {
    return (
        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <p className="hero__eyebrow">// Events & Summits</p>
            <h1 className="section-title" style={{ maxWidth: '750px' }}>
                The Obligation <span className="accent">Summit</span>
            </h1>
            <p style={{ fontSize: '1.1rem', maxWidth: '660px', marginBottom: '1.5rem', opacity: 0.88, lineHeight: 1.85 }}>
                The annual gathering where obligation infrastructure meets institutional practice. Enterprise operators, regulators, and investors — one stage, one framework, no filler.
            </p>
            <p style={{ fontSize: '0.95rem', maxWidth: '600px', marginBottom: '3.5rem', opacity: 0.7, lineHeight: 1.7 }}>
                Plus workshops, roundtables, private dinners, event replays, and keynote engagements throughout the year.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '4rem' }}>
                {events.map((ev) => (
                    <div key={ev.name} className={`card${ev.featured ? ' card--gold' : ''}`} style={ev.featured ? { borderColor: 'var(--accent-gold)' } : {}}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{ev.name}</h3>
                                <p style={{ fontSize: '0.85rem', opacity: 0.6, fontFamily: 'var(--font-mono)' }}>{ev.format}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <span className={`card__tag${ev.featured ? ' card__tag--gold' : ''}`}>{ev.tag}</span>
                                <span className="card__tag">{ev.date}</span>
                            </div>
                        </div>
                        <p style={{ fontSize: '0.95rem', opacity: 0.85, lineHeight: 1.7 }}>{ev.description}</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '0.5rem' }}>
                            {ev.pricing.map((p) => (
                                <span key={p} style={{ fontSize: '0.88rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)' }}>{p}</span>
                            ))}
                        </div>
                        {ev.products.length > 0 ? (
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                {ev.products.map((p) => (
                                    <CheckoutButton
                                        key={p.product}
                                        product={p.product}
                                        label={p.label}
                                        className={`btn ${ev.featured ? 'btn-primary' : 'btn-ghost'}`}
                                        style={{ fontSize: '0.85rem' }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <a href="#register-interest" className="btn btn-ghost">Request Invitation</a>
                        )}
                    </div>
                ))}
            </div>

            <EventRegistrationForm />
        </div>
    );
}
