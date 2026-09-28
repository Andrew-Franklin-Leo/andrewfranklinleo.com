import Link from "next/link";
import type { Entity } from "@/lib/entities";
import { stpDocs } from "@/lib/stp";

function StateLedger({ entities }: { entities: Entity[] }) {
  const records = entities.flatMap((entity) => entity.transitions.map((transition) => ({ entity, transition })));
  return (
    <section className="stp-ledger shell">
      <div className="section-head"><div><p className="eyebrow">03 / Transition ledger</p><h2 className="section-title">Change stays<br /><em>traceable.</em></h2></div><p>{records.length} recorded transitions across {entities.length} protocol objects.</p></div>
      <div className="ledger-list">
        {records.map(({ entity, transition }) => <article className="ledger-row" key={transition.transitionId}>
          <div><span className="ledger-id">{transition.transitionId}</span><h3>{transition.event.replaceAll("_", " ")}</h3></div>
          <div className="ledger-path"><span>{transition.from}</span><b>→</b><span>{transition.to}</span></div>
          <div className="ledger-meta"><span>{entity.entityName}</span><span>{transition.epistemicStatus}</span><span>{transition.occurredAt ?? "undated"}</span></div>
        </article>)}
      </div>
    </section>
  );
}

export function StpOverview({ entities }: { entities: Entity[] }) {
  return (
    <>
      <section className="stp-hero shell">
        <div><p className="eyebrow">Public interoperability layer / SITE-STP</p><h1>Make change<br /><em>composable.</em></h1><p className="stp-lede">The State Transition Protocol gives independently operated realities a common language for expressing state, change, evidence, authority, and uncertainty.</p><div className="stp-actions"><Link className="button" href="/projects/state-transition-protocol/docs/architecture">Read the architecture</Link><Link className="text-link" href="/projects/state-transition-protocol/docs/developer">Build the reference path</Link></div></div>
        <div className="stp-flow" aria-label="State Transition Protocol flow"><span>Private realities</span><b>↓</b><span>STP compilers</span><b>↓</b><span>Canonical transitions</span><b>↓</b><span>World resolution</span></div>
      </section>
      <section className="stp-principles shell"><div><p className="eyebrow">01 / Central principle</p><h2 className="section-title">One language.<br /><em>Many realities.</em></h2></div><div className="stp-principle-grid"><p>Private systems retain their internal schemas, evidence, policies, and authority. STP standardizes only what must cross the boundary.</p><p>A transition is never just a fact. It carries its source, time, authority, provenance, epistemic status, uncertainty, and integrity.</p><p>A world model is a derived projection. Different subscribers can receive different resolutions of the same federated transition graph.</p></div></section>
      <section className="stp-docs shell"><div className="section-head"><div><p className="eyebrow">02 / Protocol map</p><h2 className="section-title">Navigate the<br /><em>machinery.</em></h2></div><p>Concepts, compilers, federation, resolution, extensions, and the reference implementation path.</p></div><div className="stp-doc-grid">{stpDocs.map((doc, index) => <Link className="stp-doc-card" href={`/projects/state-transition-protocol/docs/${doc.slug}`} key={doc.slug}><span>0{index + 1}</span><h3>{doc.label}</h3><p>{doc.intro}</p><strong>Open document →</strong></Link>)}</div></section>
      <StateLedger entities={entities} />
      <section className="stp-loop shell"><p className="eyebrow">05 / Continuous loop</p><p className="stp-loop-line">Reality → observation → state → transition → evidence → world model → resolution → decision → action → new reality</p></section>
    </>
  );
}
