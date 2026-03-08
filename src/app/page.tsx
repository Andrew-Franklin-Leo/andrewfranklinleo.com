import Link from 'next/link';
import { VERTICALS } from '@/data/verticals';
import { REGIONS } from '@/data/regions';
import { ENTITIES } from '@/data/entities';
import { PRODUCTS } from '@/data/products';

export default function Home() {
  const featuredVerticals = VERTICALS.slice(0, 6);
  const featuredRegions = REGIONS.slice(0, 6);
  const proofUnits = PRODUCTS.filter((p) => p.category === 'proof-unit');

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ padding: '0' }}>
        <div className="container hero">
          <div className="hero__content">
            <p className="hero__eyebrow">// The Narrative Platform for AI Governance</p>
            <h1>
              andrew<span className="accent">franklin</span>leo
            </h1>
            <div className="hero__title">
              Obligation Intelligence Across Every Industry, Every Country, Every Language
            </div>
            <p className="hero__tagline">
              The Forbes of AI governance. Regulatory intelligence, enforcement tracking, and
              accountability architecture — covering 100,000+ industry codes across 50+ jurisdictions.
            </p>

            <div className="hero__stats">
              <div className="stat">
                <span className="stat__value">12</span>
                <span className="stat__label">Industry Verticals</span>
              </div>
              <div className="stat">
                <span className="stat__value">11</span>
                <span className="stat__label">Global Regions</span>
              </div>
              <div className="stat">
                <span className="stat__value">10</span>
                <span className="stat__label">Ecosystem Entities</span>
              </div>
              <div className="stat">
                <span className="stat__value">100K+</span>
                <span className="stat__label">Industry Codes Mapped</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <Link href="/verticals" className="btn btn-primary">Explore Verticals →</Link>
              <Link href="/subscribe" className="btn btn-secondary">Subscribe to Intelligence</Link>
            </div>
          </div>

          <div className="hero__visual">
            <div className="avatar">AFL</div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL FRONT: VERTICALS ── */}
      <section id="verticals">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              Industry <span className="accent">Verticals</span>
            </h2>
            <Link href="/verticals" className="btn btn-ghost" style={{ fontSize: '0.85rem' }}>All 12 Verticals →</Link>
          </div>
          <div className="grid-3">
            {featuredVerticals.map((v) => (
              <Link
                key={v.slug}
                href={`/verticals/${v.slug}`}
                className="card reveal"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    backgroundColor: v.color, display: 'inline-block',
                  }} />
                  <span style={{ fontSize: '0.75rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {v.topics.length} topics
                  </span>
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>{v.name}</h3>
                <p style={{ fontSize: '0.85rem', opacity: 0.65, lineHeight: 1.6 }}>{v.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE THESIS (condensed) ── */}
      <section id="thesis">
        <div className="container">
          <h2 className="section-title">
            The Problem <span className="accent">No One</span> Is Solving
          </h2>
          <div className="thesis-block">
            <p>
              Every AI system making decisions today operates without a bound human liability bearer.
              The <strong>ORF Protocol</strong> ensures that every irreversible action has a human bound to
              it, at execution time. Not after. Not in theory. At the moment of decision.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/essays/orf-thesis" className="btn btn-primary">Read the ORF Protocol →</Link>
              <Link href="/essays" className="btn btn-secondary">All Frameworks</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── GLOBAL REGIONS ── */}
      <section id="regions">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              Global <span className="accent">Coverage</span>
            </h2>
            <Link href="/regions" className="btn btn-ghost" style={{ fontSize: '0.85rem' }}>All 11 Regions →</Link>
          </div>
          <div className="grid-3">
            {featuredRegions.map((r) => (
              <Link
                key={r.slug}
                href={`/regions/${r.slug}`}
                className="card reveal"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>{r.flag}</span>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{r.name}</h3>
                </div>
                <p style={{ fontSize: '0.85rem', opacity: 0.65, lineHeight: 1.6 }}>{r.tagline}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.5rem' }}>
                  {r.regulatoryFrameworks.slice(0, 2).map((f) => (
                    <span key={f} className="card__tag" style={{ fontSize: '0.7rem' }}>{f}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM ENTITIES ── */}
      <section id="ecosystem">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              The <span className="accent">Ecosystem</span>
            </h2>
            <Link href="/entities" className="btn btn-ghost" style={{ fontSize: '0.85rem' }}>All 10 Entities →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {ENTITIES.slice(0, 5).map((e) => (
              <Link
                key={e.slug}
                href={`/entities/${e.slug}`}
                className="card reveal"
                style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center', borderTop: `2px solid ${e.color}` }}
              >
                <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: e.color, fontSize: '1.2rem' }}>
                  {e.name}
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '0.25rem' }}>{e.role}</div>
              </Link>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginTop: '0.75rem' }}>
            {ENTITIES.slice(5).map((e) => (
              <Link
                key={e.slug}
                href={`/entities/${e.slug}`}
                className="card"
                style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center', padding: '0.75rem', borderTop: `2px solid ${e.color}` }}
              >
                <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, color: e.color, fontSize: '0.95rem' }}>
                  {e.name}
                </div>
                <div style={{ fontSize: '0.7rem', opacity: 0.4 }}>{e.role}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF UNITS ── */}
      <section id="products">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              90-Day <span className="accent">Proof Units</span>
            </h2>
            <Link href="/products" className="btn btn-ghost" style={{ fontSize: '0.85rem' }}>All Products →</Link>
          </div>
          <div className="grid-3">
            {proofUnits.slice(0, 3).map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="card card--gold reveal"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <span className="card__tag">{p.vertical.replace('-', ' ')}</span>
                <h3 style={{ fontSize: '1.1rem' }}>{p.name}</h3>
                <p style={{ fontSize: '0.85rem', opacity: 0.65 }}>{p.tagline}</p>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', fontSize: '0.85rem' }}>
                  <div>
                    <span style={{ opacity: 0.5 }}>Price</span>
                    <div style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>{p.price}</div>
                  </div>
                  <div>
                    <span style={{ opacity: 0.5 }}>ROI</span>
                    <div style={{ fontWeight: 600 }}>{p.roi}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRAMEWORKS (Latest Writing) ── */}
      <section id="writing">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              Core <span className="accent">Frameworks</span>
            </h2>
            <Link href="/essays" className="btn btn-ghost" style={{ fontSize: '0.85rem' }}>All Frameworks →</Link>
          </div>
          <div className="grid-3">
            {[
              { title: 'The ORF Protocol', date: 'Feb 2026', slug: 'orf-thesis', cat: 'ORF Protocol' },
              { title: 'The Atomic Constraint', date: 'Feb 2026', slug: 'atomic-constraint', cat: 'Framework' },
              { title: 'The 15-Layer Reality Stack', date: 'Mar 2026', slug: 'reality-stack', cat: 'Framework' },
              { title: 'Pre-Incident Governance', date: 'Mar 2026', slug: 'pre-incident-governance', cat: 'Governance' },
              { title: 'The 5 First Principles', date: 'Mar 2026', slug: 'first-principles', cat: 'Philosophy' },
              { title: 'The Fragility Codex', date: 'Mar 2026', slug: 'fragility-codex', cat: 'Research' },
            ].map((essay) => (
              <Link key={essay.slug} href={`/essays/${essay.slug}`} className="essay-card reveal" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card__tag" style={{ marginBottom: '0.25rem' }}>{essay.cat}</div>
                <h4>{essay.title}</h4>
                <div className="essay-card__meta">
                  <span>{essay.date}</span>
                  <span className="card__tag">Read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBSCRIBE ── */}
      <section style={{ borderBottom: 'none' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="hero__eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>// Obligation Intelligence</p>
          <h2 className="section-title" style={{ maxWidth: '700px', margin: '0 auto 1.5rem' }}>
            The <span className="accent">Weekly Signal</span>
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1.05rem', opacity: 0.85, lineHeight: 1.8 }}>
            AI governance intelligence covering every industry, every jurisdiction. Regulatory
            signals, enforcement actions, and framework analysis — delivered weekly to enterprise
            leaders, regulators, and institutional investors.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/subscribe" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
              Choose Your Access Tier →
            </Link>
            <Link href="/intelligence" className="btn btn-secondary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
              Intelligence Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
