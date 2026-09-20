import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntityCard } from "@/components/entity-card";
import { getRootEntities, getEntitiesBySection } from "@/lib/content";

const sections = ["ideas", "systems", "intelligence", "economics", "civilization", "ventures", "research", "models"];

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
  return <main className="section-page shell"><p className="eyebrow">Registry / {section}</p><h1 className="page-title">{section}</h1><p className="page-intro">A view over the entities currently connected to {section}.</p>{entities.length ? <div className="object-grid">{entities.map((entity) => <EntityCard entity={entity} key={entity.entityId} />)}</div> : <p className="empty-state">No published entities in this section yet. The registry currently contains {allEntities.length} objects.</p>}</main>;
}
