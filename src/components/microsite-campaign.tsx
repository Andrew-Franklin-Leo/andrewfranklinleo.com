import Link from "next/link";
import type { Entity } from "@/lib/entities";
import type { Site } from "@/lib/sites";
import { EntityCard } from "@/components/entity-card";

type Campaign = { eyebrow: string; headline: string; emphasis: string; lede: string; audience: string; promise: string; points: [string, string][]; action: string; actionHref?: string; roles?: [string, string, string][] };

const campaigns: Record<string, Campaign> = {
  aureya: {
    eyebrow: "Aureya / Accountable coordination",
    headline: "Technology should make people more",
    emphasis: "capable together.",
    lede: "Aureya is a coordination protocol for citizens, institutions, and intelligent agents that need to act with more trust, memory, and accountability.",
    audience: "For people and institutions building a more legitimate relationship with intelligent systems.",
    promise: "Coordinate without surrendering agency.",
    points: [["Remember what matters", "Give people and institutions durable memory across decisions, commitments, and outcomes."], ["Delegate with accountability", "Let agents participate while authority, permission, and responsibility remain visible."], ["Turn intent into action", "Connect shared purpose to actions that can be observed, reviewed, and improved."]],
    action: "Explore the coordination system",
  },
  "civilization-coordination-crisis": {
    eyebrow: "Civilization Coordination Crisis / Research",
    headline: "The hardest problems are not always",
    emphasis: "intelligence problems.",
    lede: "This research investigates the coordination failures beneath visible crises: fragmented information, delayed feedback, conflicting incentives, and institutions that cannot act together.",
    audience: "For leaders, researchers, and builders who need to understand why capability fails to become collective progress.",
    promise: "See the constraint underneath the crisis.",
    points: [["Find the missing layer", "Trace how information, incentives, authority, and action break apart between institutions."], ["Replace slogans with systems", "Study the structures that produce coordination debt and delayed consequences."], ["Design what comes next", "Use the research as a foundation for new institutional and technical infrastructure."]],
    action: "Read the research",
  },
  "institutional-accountability-infrastructure": {
    eyebrow: "Programmable Institutional Accountability / Machine action infrastructure",
    headline: "When machines act, institutions need to know",
    emphasis: "what follows.",
    lede: "Create a persistent, verifiable record of AI-mediated action, then connect authority, evidence, outcomes, risk, insurance, and settlement around the transition that actually happened.",
    audience: "For every institution that creates, authorizes, executes, verifies, finances, insures, or settles machine-mediated action.",
    promise: "Make machine action economically accountable.",
    points: [["Prove what happened", "Bind identity, authority, provenance, evidence, policy, and intended outcome to a persistent transition object."], ["Turn evidence into consequence", "Propagate verified outcomes into attribution, containment, risk pricing, insurance, settlement, recovery, and learning."], ["Connect the institutional stack", "Give principals, agents, authorizers, observers, verifiers, accountable parties, and settlement parties a shared object to work from."]],
    action: "Explore the accountability infrastructure",
    actionHref: "/projects/institutional-accountability-infrastructure/systems/institutional-accountability-infrastructure",
    roles: [["Principals", "Banks, enterprises, governments, consumers, citizens, and owners of authority.", "Own the consequence"], ["Agents", "AI companies, autonomous systems, robotics, vehicles, and machine-to-machine platforms.", "Execute the action"], ["Authorizers", "Identity, IAM, credentials, licensing, delegation, and institutional authority systems.", "Permit the action"], ["Observers", "Sensors, telemetry, digital twins, auditors, investigators, and evidence systems.", "Establish reality"], ["Verifiers", "Assurance firms, regulators, certification bodies, model validators, and courts.", "Test the claim"], ["Accountable parties", "Operators, employers, vendors, institutions, insurers, and legal entities.", "Bear responsibility"], ["Settlement parties", "Banks, payment rails, exchanges, claims systems, escrow, and marketplaces.", "Move value" ]],
  },
};

export function MicrositeCampaign({ site, entities }: { site: Site; entities: Entity[] }) {
  const campaign = campaigns[site.slug];
  if (!campaign) return null;
  const actionHref = campaign.actionHref ?? `/projects/${site.slug}/research`;
  return <>
    <section className="campaign-microsite-hero shell"><div><p className="eyebrow">{campaign.eyebrow}</p><h1>{campaign.headline}<br /><em>{campaign.emphasis}</em></h1><p className="campaign-microsite-lede">{campaign.lede}</p><div className="microsite-actions"><Link className="button" href={actionHref}>{campaign.action}</Link><Link className="text-link" href="/">See the wider work -&gt;</Link></div></div><div className="campaign-microsite-mark"><span>{site.name}</span><strong>{campaign.promise}</strong><small>{campaign.audience}</small></div></section>
    <section className="campaign-microsite-intro shell"><p className="eyebrow">Why this matters</p><h2>{campaign.promise}</h2></section>
    <section className="campaign-microsite-points shell"><div className="section-head"><div><p className="eyebrow">The work in practice</p><h2 className="section-title">A system for<br /><em>better next moves.</em></h2></div><p>{campaign.audience}</p></div><div className="campaign-point-grid">{campaign.points.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    {campaign.roles && <section className="audience-stack shell" id="audience-stack"><div className="section-head"><div><p className="eyebrow">The audience map / 225 markets</p><h2 className="section-title">One transition.<br /><em>Seven roles.</em></h2></div><p>The 225 target audiences converge around the institutional roles that create, permit, observe, verify, bear, and settle consequential machine action.</p></div><div className="role-grid">{campaign.roles.map(([role, examples, functionName], index) => <article key={role}><span>0{index + 1}</span><p className="eyebrow">{role}</p><h3>{functionName}</h3><p>{examples}</p></article>)}</div></section>}
    <section className="campaign-microsite-entities shell"><div className="section-head"><div><p className="eyebrow">Connected work</p><h2 className="section-title">What is taking<br /><em>shape.</em></h2></div><p>{entities.length} connected object{entities.length === 1 ? "" : "s"} in this project.</p></div>{entities.length > 0 ? <div className="object-grid">{entities.map((entity) => <EntityCard entity={entity} hrefPrefix={`/projects/${site.slug}`} key={entity.entityId} />)}</div> : <p className="empty-state">The first published objects for this project are being prepared.</p>}</section>
    <section className="campaign-microsite-close shell"><p className="eyebrow">Continue</p><h2>Move from understanding<br />to <em>participation.</em></h2><Link className="button" href={actionHref}>Enter the project</Link></section>
  </>;
}
