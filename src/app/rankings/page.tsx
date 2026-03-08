import type { Metadata } from 'next';
import Link from 'next/link';
import { RANKINGS } from '@/data/rankings';

export const metadata: Metadata = {
  title: 'Governance Rankings and Indices — andrewfranklinleo.com',
  description: 'Proprietary measurement systems for AI accountability infrastructure. Power Concentration Index, Fragility Codex Score, and more.',
};

const TIER_LABELS: Record<string, { label: string; class: string }> = {
  free: { label: 'Free', class: 'tier-badge--free' },
  practitioner: { label: 'Practitioner', class: 'tier-badge--practitioner' },
  operator: { label: 'Operator', class: 'tier-badge--operator' },
  institutional: { label: 'Institutional', class: 'tier-badge--institutional' },
};

export default function RankingsPage() {
  return (
    <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      <p className="hero__eyebrow">// Measurement Systems</p>
      <h1 className="section-title">Governance Rankings and <span className="accent">Indices</span></h1>
      <p style={{ fontSize: '1.1rem', maxWidth: '650px', marginBottom: '3.5rem', opacity: 0.85, lineHeight: 1.85 }}>
        Proprietary measurement systems for AI accountability infrastructure. Each index is built on
        the ORF Protocol, the Fragility Codex, and the 15-Layer Reality Stack.
      </p>

      <div className="grid-2" style={{ marginBottom: '3rem' }}>
        {RANKINGS.map((r) => {
          const tier = TIER_LABELS[r.tier];
          return (
            <Link key={r.slug} href={`/rankings/${r.slug}`} className="card card--gold">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="card__tag card__tag--gold">{r.scale}</span>
                <span className={`tier-badge ${tier.class}`}>{tier.label}</span>
              </div>
              <h3>{r.name}</h3>
              <p>{r.description.slice(0, 150)}...</p>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.5 }}>Last updated: {r.lastUpdated}</span>
            </Link>
          );
        })}
      </div>

      <div className="thesis-block">
        <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Access All <span className="accent">Rankings</span></h2>
        <p style={{ marginBottom: '1.5rem', opacity: 0.85 }}>
          Free rankings include sample data. Practitioner, Operator, and Institutional tiers unlock
          full datasets, historical trends, and custom benchmarking.
        </p>
        <Link href="/subscribe" className="btn btn-primary">View Access Tiers</Link>
      </div>
    </div>
  );
}
