import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Video — andrewfranklinleo.com | Governance Intelligence',
  description: 'Video briefings, framework explainers, and governance intelligence documentaries.',
};

const SERIES = [
  {
    name: 'Framework Explainers',
    tag: 'Series',
    description: 'Visual walkthroughs of the ORF Protocol, 15-Layer Reality Stack, Fragility Codex, and Atomic Constraint. Each episode breaks down a core framework in under 15 minutes.',
    episodes: [
      { title: 'The ORF Protocol in 12 Minutes', duration: '12:34', status: 'Coming Q2 2026' },
      { title: 'Atomic Constraint: One Rule to Bind Them All', duration: '9:45', status: 'Coming Q2 2026' },
      { title: 'The 15-Layer Reality Stack Visualized', duration: '14:22', status: 'Coming Q3 2026' },
    ],
  },
  {
    name: 'Governance Briefings',
    tag: 'Weekly',
    description: 'Weekly 5-minute video briefings on regulatory developments, enforcement actions, and governance signals across all tracked jurisdictions.',
    episodes: [
      { title: 'EU AI Act: Implementation Timeline Update', duration: '5:12', status: 'Coming Q2 2026' },
      { title: 'US State-Level AI Laws: Colorado and Beyond', duration: '5:45', status: 'Coming Q2 2026' },
      { title: 'APAC Governance Roundup: Singapore, Japan, Australia', duration: '6:10', status: 'Coming Q3 2026' },
    ],
  },
  {
    name: 'Obligation Intelligence Documentaries',
    tag: 'Quarterly',
    description: 'Long-form documentary investigations into AI governance failures, institutional accountability gaps, and the infrastructure being built to close them.',
    episodes: [
      { title: 'The Accountability Gap: Why AI Governance Failed', duration: '28:00', status: 'Coming Q3 2026' },
      { title: 'Inside the Fragility Codex: 1,300 Ways Systems Fail', duration: '32:00', status: 'Coming Q4 2026' },
    ],
  },
];

export default function VideoPage() {
  return (
    <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      <p className="hero__eyebrow">// Video</p>
      <h1 className="section-title">Governance Intelligence <span className="accent">Video</span></h1>
      <p style={{ fontSize: '1.1rem', maxWidth: '650px', marginBottom: '3.5rem', opacity: 0.85, lineHeight: 1.85 }}>
        Framework explainers, weekly governance briefings, and long-form documentaries.
        Visual intelligence for enterprise operators and governance practitioners.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '4rem' }}>
        {SERIES.map((series) => (
          <div key={series.name}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: 0 }}>{series.name}</h2>
              <span className="card__tag card__tag--gold">{series.tag}</span>
            </div>
            <p style={{ fontSize: '0.95rem', opacity: 0.8, lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '650px' }}>{series.description}</p>

            <div className="grid-3">
              {series.episodes.map((ep) => (
                <div key={ep.title} className="card">
                  {/* Video placeholder */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(74,158,255,0.08), rgba(245,166,35,0.08))',
                    borderRadius: '8px',
                    height: '140px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.5rem',
                  }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(245,166,35,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginLeft: '3px' }}>&#9654;</span>
                    </div>
                  </div>
                  <h3 style={{ fontSize: '0.95rem' }}>{ep.title}</h3>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                    <span className="card__tag">{ep.duration}</span>
                    <span className="card__tag">{ep.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="thesis-block" style={{ textAlign: 'center' }}>
        <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Subscribe to <span className="accent">Video Updates</span></h2>
        <p style={{ maxWidth: '520px', margin: '0 auto 1.5rem', opacity: 0.85 }}>
          Get notified when new videos drop. Framework explainers for practitioners,
          weekly briefings for operators.
        </p>
        <Link href="/newsletter" className="btn btn-primary">Subscribe to Newsletter</Link>
      </div>
    </div>
  );
}
