import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RANKINGS } from '@/data/rankings';

export function generateStaticParams() {
  return RANKINGS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ranking = RANKINGS.find((r) => r.slug === slug);
  if (!ranking) return { title: 'Ranking Not Found' };
  return { title: `${ranking.name} — andrewfranklinleo.com`, description: ranking.description };
}

export default async function RankingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ranking = RANKINGS.find((r) => r.slug === slug);
  if (!ranking) notFound();

  const isFree = ranking.tier === 'free';
  const freeRows = isFree ? ranking.sampleData.length : 5;

  return (
    <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem', maxWidth: '900px' }}>
      <Link href="/rankings" style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontSize: '0.88rem', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: '2rem' }}>
        &larr; All Rankings
      </Link>

      <p className="hero__eyebrow">// {ranking.scale}</p>
      <h1 className="section-title" style={{ marginBottom: '1rem' }}>{ranking.name}</h1>
      <p style={{ fontSize: '1.05rem', maxWidth: '700px', marginBottom: '1rem', opacity: 0.85, lineHeight: 1.85 }}>{ranking.description}</p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', opacity: 0.5, marginBottom: '3rem' }}>Last updated: {ranking.lastUpdated}</p>

      {/* Data Table */}
      <h2 className="section-title" style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>
        {isFree ? 'Current Rankings' : 'Sample Data'}
      </h2>
      <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
        <table className="tracker-table">
          <thead>
            <tr>
              <th>Organization</th>
              <th>Score</th>
              <th>Change</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {ranking.sampleData.slice(0, freeRows).map((row, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500 }}>{row.organization}</td>
                <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)' }}>{row.score}</td>
                <td style={{ fontFamily: 'var(--font-mono)', color: row.change.startsWith('+') ? '#4ade80' : row.change.startsWith('-') ? '#f87171' : 'var(--subtle-gray)' }}>{row.change}</td>
                <td style={{ opacity: 0.6 }}>{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!isFree && (
        <div className="paywall-cta" style={{ marginBottom: '3rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', opacity: 0.7, marginBottom: '0.75rem' }}>// Subscriber-only data</p>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '1rem' }}>Full rankings data requires {ranking.tier} access</h3>
          <Link href="/subscribe" className="btn btn-primary">Subscribe for Full Access</Link>
        </div>
      )}

      {/* Methodology */}
      <div className="thesis-block">
        <h2 className="section-title" style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Methodology</h2>
        <p style={{ lineHeight: 1.85, opacity: 0.88 }}>{ranking.methodology}</p>
      </div>
    </div>
  );
}
