import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllEssays } from '@/lib/essays';

const AUTHORS: Record<string, {
  name: string;
  title: string;
  bio: string[];
  expertise: string[];
  stats: { value: string; label: string }[];
}> = {
  'andrew-franklin-leo': {
    name: 'Andrew Franklin Leo',
    title: 'Obligation Infrastructure Architect',
    bio: [
      'Andrew Franklin Leo is the founder of FrankMax Digital and the architect of the ORF Protocol — a framework for binding human accountability to AI systems at execution time. His work spans AI governance, obligation infrastructure, Pre-Incident Governance, and the economics of enterprise AI deployment.',
      'He has authored over 535,000 lines of strategic architecture describing how AI systems can be made accountable, not through regulation alone, but through infrastructure that makes irresponsibility structurally impossible.',
      'His thinking has been shaped by 20+ years of operating at the intersection of technology, institutional governance, and risk management. He believes the next wave of defensibility in AI comes not from better models, but from better obligations.',
    ],
    expertise: ['ORF Protocol', 'Fragility Codex', '15-Layer Reality Stack', 'Pre-Incident Governance', 'Atomic Constraint', 'Obligation Intelligence', 'Power Concentration Index (PCI)', 'AINEFF Ecosystem Architecture'],
    stats: [
      { value: '7', label: 'Published Frameworks' },
      { value: '70+', label: 'Strategic Documents' },
      { value: '535K+', label: 'Lines of Architecture' },
      { value: '12', label: 'Verticals Covered' },
      { value: '11', label: 'Regions Covered' },
      { value: '50+', label: 'Jurisdictions Tracked' },
    ],
  },
};

export function generateStaticParams() {
  return [{ slug: 'andrew-franklin-leo' }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const author = AUTHORS[slug];
  if (!author) return { title: 'Author Not Found' };
  return { title: `${author.name} — ${author.title} | andrewfranklinleo.com`, description: author.bio[0] };
}

export default async function AuthorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = AUTHORS[slug];
  if (!author) notFound();

  const essays = getAllEssays();

  return (
    <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem', maxWidth: '900px' }}>
      <p className="hero__eyebrow">// Author</p>
      <h1 className="section-title">{author.name.split(' ').slice(0, -1).join(' ')} <span className="accent">{author.name.split(' ').slice(-1)}</span></h1>
      <p style={{ fontSize: '0.9rem', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', marginBottom: '2.5rem' }}>{author.title}</p>

      <div style={{ marginBottom: '3rem' }}>
        {author.bio.map((p, i) => (
          <p key={i} style={{ fontSize: '1.05rem', lineHeight: 1.9, marginBottom: '1.5rem', opacity: 0.88 }}>{p}</p>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
        {author.stats.map((s) => (
          <div key={s.label} className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)' }}>{s.value}</div>
            <div style={{ fontSize: '0.78rem', opacity: 0.7, marginTop: '0.25rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Areas of <span className="accent">Expertise</span></h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {author.expertise.map((a) => <span key={a} className="card__tag">{a}</span>)}
        </div>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Frameworks by <span className="accent">{author.name}</span></h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {essays.map((essay) => (
            <Link key={essay.slug} href={`/essays/${essay.slug}`} className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="card__tag card__tag--gold">{essay.category}</span>
                    {essay.gated && <span className="lock-icon">Gated</span>}
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontFamily: 'var(--font-serif)' }}>{essay.title}</h3>
                  <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.6 }}>{essay.subtitle}</p>
                </div>
                <span style={{ fontSize: '0.8rem', opacity: 0.5, fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>{essay.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="thesis-block">
        <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Work with <span className="accent">Andrew</span></h2>
        <p style={{ marginBottom: '1.5rem', opacity: 0.85 }}>From keynote speaking to institutional governance briefings.</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/about" className="btn btn-primary">Full Bio</Link>
          <Link href="/speaking" className="btn btn-secondary">Speaking</Link>
          <Link href="/contact" className="btn btn-ghost">Contact</Link>
        </div>
      </div>
    </div>
  );
}
