import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntityCard } from "@/components/entity-card";
import { getRootEntities, getEntitiesBySection } from "@/lib/content";

const sections = ["ideas", "systems", "intelligence", "economics", "civilization", "ventures", "research", "models"];

const sectionGuidance: Record<string, { role: string; contents: string }> = {
  ideas: { role: "Hypotheses becoming precise.", contents: "Questions, concepts, and propositions that may later become systems, models, or ventures." },
  systems: { role: "Structures that make coordination possible.", contents: "Operating architectures, institutions, protocols, and mechanisms that connect ideas to action." },
  intelligence: { role: "Capability, agency, memory, and learning.", contents: "The cognitive and agentic layer through which entities perceive conditions and decide what to do next." },
  economics: { role: "Value, attribution, settlement, risk, and capital.", contents: "The economic states and exchanges that make transitions measurable, fundable, and accountable." },
  civilization: { role: "The highest-level synthesis.", contents: "Civilization-scale systems, coordination problems, and the conditions under which capability compounds." },
  ventures: { role: "Theory becoming implementation.", contents: "Commercial or institutional applications that test whether an idea can operate in the world." },
  research: { role: "Evidence, cases, experiments, and field notes.", contents: "Investigations that challenge assumptions, establish provenance, and keep the registry honest." },
  models: { role: "Formal representations with limits.", contents: "Models that make variables, assumptions, relationships, and uncertainty explicit." },
};

export async function generateStaticParams() {
  return sections.map((section) => ({ section }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  return { title: section.charAt(0).toUpperCase() + section.slice(1) };
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!sections.includes(section)) notFound();
  const entities = await getEntitiesBySection(section);
  const allEntities = await getRootEntities();
  const guidance = sectionGuidance[section];
  return <main className="section-page shell"><p className="eyebrow">Registry / {section}</p><h1 className="page-title">{section}</h1><p className="page-intro">{guidance.role} {guidance.contents}</p>{entities.length ? <div className="object-grid">{entities.map((entity) => <EntityCard entity={entity} key={entity.entityId} />)}</div> : <section className="section-guide"><p className="eyebrow">Namespace guide</p><h2>{guidance.role}</h2><p>{guidance.contents}</p><p className="empty-state">No published entities in this section yet. The registry currently contains {allEntities.length} objects across the other namespaces.</p></section>}</main>;
}
