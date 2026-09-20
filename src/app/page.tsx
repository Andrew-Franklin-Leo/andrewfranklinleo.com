import Link from "next/link";
import { EntityCard } from "@/components/entity-card";
import { getRootEntities } from "@/lib/content";

const namespaces = [
  ["ideas", "Hypotheses that are still becoming precise."], ["systems", "Ontologies for coordination, production, and institutions."],
  ["intelligence", "Capability, agency, memory, learning, and action."], ["economics", "Value, attribution, settlement, risk, and capital."],
  ["civilization", "The highest-level synthesis of the work."], ["ventures", "Where a theory becomes an economic implementation."],
  ["research", "Evidence, cases, experiments, and field notes."], ["models", "Formal representations with assumptions and limits."],
];

export default async function Home() {
  const entities = await getRootEntities();
  return <main>
    <section className="hero shell"><div><p className="eyebrow">A public intellectual operating system</p><h1>A map of how <em>capability</em> becomes civilization.</h1><p className="lede">Andrew Franklin Leo studies the systems through which intelligence becomes productive capability, capability becomes economic transition, and verified transition becomes the basis for coordination and capital.</p><div className="hero-actions"><Link className="button" href="#namespaces">Enter the map</Link><Link className="text-link" href="#question">Read the current question</Link></div></div><div className="map" aria-label="A map connecting intelligence, capability, coordination, and capital"><span className="map-node node-a">intelligence</span><span className="map-node node-b">capability</span><span className="map-node node-c">verification</span><span className="map-node node-d">capital</span><div className="map-core">economic<br />civilization</div><span className="map-note">The root namespace / 2026</span></div></section>
    <section className="question shell" id="question"><div><p className="eyebrow">00 / Current question</p><h2 className="section-title">The inquiry<br />underneath.</h2></div><p className="question-copy">How does society convert capability into verified economic outcomes?<small>This site is an evolving registry of the ideas, systems, models, research, experiments, and ventures that emerge while working on that question.</small></p></section>
    <section className="loop shell"><div className="section-head"><div><p className="eyebrow">01 / The central loop</p><h2 className="section-title">From intelligence<br />to <em>reinvestment.</em></h2></div><p>A civilization is a system for producing, distributing, coordinating, and compounding capability.</p></div><div className="loop-track">{["Intelligence", "Capability", "Economic action", "Verification", "Value and capital", "More capability"].map((step, index) => <div className="loop-step" key={step}><span>0{index + 1}</span><h3>{step}</h3></div>)}</div></section>
    <section className="namespaces" id="namespaces"><div className="shell"><p className="eyebrow">02 / Explore the knowledge graph</p><h2 className="section-title">Eight doors into<br />one <em>system.</em></h2><p className="namespace-intro">Navigation stays small. The relationships underneath it do the deeper work: ideas support models, models shape systems, systems produce ventures, and research keeps the whole structure honest.</p><div className="namespace-grid">{namespaces.map(([name, description], index) => <Link className="namespace" href={`/${name}`} key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{description}</p><strong>Enter /{name}/ -&gt;</strong></Link>)}</div></div></section>
    <section className="objects shell"><div className="section-head"><div><p className="eyebrow">03 / Canonical objects</p><h2 className="section-title">Thinking with<br />an <em>identity.</em></h2></div><p>Nothing here is just a post. Major objects carry an origin, a status, relationships, evidence, and open questions.</p></div><div className="object-grid">{entities.slice(0, 3).map((entity) => <EntityCard entity={entity} key={entity.entityId} />)}</div></section>
    <section className="closing shell"><p className="eyebrow">04 / The root namespace</p><h2>The work is a continuously evolving map of a theory of <em>economic civilization.</em></h2><a className="button" href="mailto:hello@andrewfranklinleo.com">Start a dialogue -&gt;</a></section>
  </main>;
}
