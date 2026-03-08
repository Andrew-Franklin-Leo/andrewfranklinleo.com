import Link from 'next/link';
import { ENTITIES } from '@/data/entities';

export const metadata = {
  title: 'The Ecosystem — 10 Entities Building Civilization-Scale AI Governance',
  description: 'Aureya, AINEFF, AINEF, AINEG, AINE, WGE, Frankmax, LPI, UniVenture, and LevelUpMax — the complete ecosystem for AI-native enterprise creation and governance.',
};

export default function EntitiesPage() {
  return (
    <>
      <section style={{ padding: '3rem 0 2rem' }}>
        <div className="container">
          <p className="hero__eyebrow">// The Ecosystem</p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
            10 <span className="accent">Entities</span>. One Architecture. Civilization Scale.
          </h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '750px', opacity: 0.85, lineHeight: 1.8 }}>
            Each entity in the AINEFF ecosystem serves a distinct function — from constitutional
            governance to enterprise manufacturing, from signal enforcement to operator training.
            Together, they form the complete infrastructure for AI-native civilization.
          </p>
        </div>
      </section>

      {/* Architecture Visualization */}
      <section>
        <div className="container">
          <h2 className="section-title">The <span className="accent">Architecture</span></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', margin: '0 auto' }}>
            {/* Layer 1: Planetary */}
            <div className="card" style={{ borderLeft: '3px solid #7C3AED', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Planetary Layer</div>
              <Link href="/entities/aureya" style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: '#7C3AED', textDecoration: 'none' }}>Aureya</Link>
              <div style={{ fontSize: '0.85rem', opacity: 0.6 }}>Planetary AIDevSecOps Architecture & Control</div>
            </div>

            {/* Layer 2: Constitutional */}
            <div className="card" style={{ borderLeft: '3px solid #F5A623', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Constitutional Layer</div>
              <Link href="/entities/aineff" style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: '#F5A623', textDecoration: 'none' }}>AINEFF</Link>
              <div style={{ fontSize: '0.85rem', opacity: 0.6 }}>Framework of Frameworks — Constitutional Charter</div>
            </div>

            {/* Layer 3: Factory + Governance */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="card" style={{ borderLeft: '3px solid #10B981', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Factory Layer</div>
                <Link href="/entities/ainef" style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: '#10B981', textDecoration: 'none' }}>AINEF</Link>
                <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Enterprise Factory</div>
              </div>
              <div className="card" style={{ borderLeft: '3px solid #3B82F6', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Governance Layer</div>
                <Link href="/entities/aineg" style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: '#3B82F6', textDecoration: 'none' }}>AINEG</Link>
                <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Signal Enforcement</div>
              </div>
            </div>

            {/* Layer 4: Enterprise */}
            <div className="card" style={{ borderLeft: '3px solid #EC4899', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Enterprise Layer</div>
              <Link href="/entities/aine" style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: '#EC4899', textDecoration: 'none' }}>AINE</Link>
              <div style={{ fontSize: '0.85rem', opacity: 0.6 }}>AI-Native Enterprises — Autonomous Operating Units</div>
            </div>

            {/* Layer 5: Supporting */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
              {[
                { slug: 'wge', name: 'WGE', color: '#14B8A6', label: 'Workflow' },
                { slug: 'frankmax', name: 'Frankmax', color: '#EF4444', label: 'Governance' },
                { slug: 'lpi', name: 'LPI', color: '#6366F1', label: 'Intelligence' },
                { slug: 'univenture', name: 'UniVenture', color: '#D97706', label: 'IP & Licensing' },
                { slug: 'levelupmax', name: 'LevelUpMax', color: '#F472B6', label: 'Training' },
              ].map((e) => (
                <Link key={e.slug} href={`/entities/${e.slug}`} className="card" style={{ textAlign: 'center', padding: '1rem', textDecoration: 'none', color: 'inherit', borderTop: `2px solid ${e.color}` }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: e.color }}>{e.name}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>{e.label}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Entities Grid */}
      <section>
        <div className="container">
          <h2 className="section-title">All <span className="accent">Entities</span></h2>
          <div className="grid-2">
            {ENTITIES.map((e) => (
              <Link
                key={e.slug}
                href={`/entities/${e.slug}`}
                className="card reveal"
                style={{ textDecoration: 'none', color: 'inherit', borderLeft: `3px solid ${e.color}` }}
              >
                <div className="card__tag" style={{ marginBottom: '0.5rem' }}>{e.role}</div>
                <h3 style={{ color: e.color }}>{e.name}</h3>
                <p style={{ fontSize: '0.85rem', opacity: 0.5, marginBottom: '0.5rem' }}>{e.fullName}</p>
                <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '0.75rem' }}>{e.tagline}</p>
                <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>
                  {e.products.length} products | {e.revenue}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderBottom: 'none' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem', opacity: 0.85, lineHeight: 1.8 }}>
            The architecture exists. The systems are specified. The question is which entity
            solves your problem.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/products" className="btn btn-primary">View Products →</Link>
            <Link href="/contact" className="btn btn-secondary">Enterprise Inquiry →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
