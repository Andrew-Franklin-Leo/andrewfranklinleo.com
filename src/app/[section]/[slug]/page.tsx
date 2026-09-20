import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/markdown-content";
import { getRootEntities, getEntityBySlug, getRelatedEntities } from "@/lib/content";
import { markdownToHtml } from "@/lib/markdown";
import { sectionForType } from "@/lib/entities";

export async function generateStaticParams() {
  const entities = await getRootEntities();
  return entities.map((entity) => ({ section: sectionForType(entity.entityType), slug: entity.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string; slug: string }> }): Promise<Metadata> {
  const { section, slug } = await params;
  const entity = await getEntityBySlug(section, slug);
  return entity ? { title: entity.entityName, description: entity.problem ?? entity.entityName } : {};
}

export default async function EntityPage({ params }: { params: Promise<{ section: string; slug: string }> }) {
  const { section, slug } = await params;
  const entity = await getEntityBySlug(section, slug);
  if (!entity) notFound();
  const [html, related] = await Promise.all([markdownToHtml(entity.content), getRelatedEntities(entity)]);
  return <main className="entity-page shell"><Link className="back-link" href={`/${section}`}>&lt;- Back to {section}</Link><div className="entity-header"><div><p className="eyebrow">{entity.entityType} / {entity.entityId}</p><h1 className="page-title">{entity.entityName}</h1></div><div className="entity-status"><span>{entity.status}</span><span>v{entity.version}</span></div></div><div className="entity-layout"><article><MarkdownContent html={html} /></article><aside className="entity-aside"><dl><div><dt>Created</dt><dd>{entity.created}</dd></div><div><dt>Updated</dt><dd>{entity.updated}</dd></div><div><dt>Origin</dt><dd>{entity.origin ?? "-"}</dd></div><div><dt>Parent</dt><dd>{entity.parent ?? "-"}</dd></div></dl>{related.length > 0 && <div className="related"><p className="eyebrow">Related entities</p>{related.map((item) => <Link href={`/${sectionForType(item.entityType)}/${item.slug}`} key={item.entityId}>{item.entityName} -&gt;</Link>)}</div>}</aside></div></main>;
}
