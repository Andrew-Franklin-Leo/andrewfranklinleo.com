import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MicrositeNav } from "@/components/microsite-nav";
import { getSiteBySlug, sites } from "@/lib/sites";
import { getStpDoc, stpDocs } from "@/lib/stp";

export async function generateStaticParams() {
  return stpDocs.map((doc) => ({ siteSlug: "state-transition-protocol", doc: doc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ siteSlug: string; doc: string }> }): Promise<Metadata> {
  const { siteSlug, doc: docSlug } = await params;
  const site = getSiteBySlug(siteSlug);
  const doc = getStpDoc(docSlug);
  return site && doc ? { title: `${doc.title} - ${site.name}`, description: doc.intro } : {};
}

export default async function StpDocument({ params }: { params: Promise<{ siteSlug: string; doc: string }> }) {
  const { siteSlug, doc: docSlug } = await params;
  const site = getSiteBySlug(siteSlug);
  const doc = getStpDoc(docSlug);
  if (!site || site.slug !== "state-transition-protocol" || !doc) notFound();
  return <main className={`microsite theme-${site.theme}`}><MicrositeNav site={site} /><section className="stp-doc-page shell"><Link className="back-link" href={`/projects/${site.slug}`}>&lt;- Back to protocol overview</Link><p className="eyebrow">State Transition Protocol / {doc.label}</p><h1 className="page-title">{doc.title}</h1><p className="stp-doc-intro">{doc.intro}</p><div className="stp-doc-sections">{doc.sections.map(([heading, body]) => <article key={heading}><p className="eyebrow">{heading}</p><p>{body}</p></article>)}</div><nav className="stp-next" aria-label="Protocol documents">{sites.filter((candidate) => candidate.slug === site.slug).length > 0 && stpDocs.map((item) => <Link className={item.slug === doc.slug ? "active" : ""} href={`/projects/${site.slug}/docs/${item.slug}`} key={item.slug}>{item.label}</Link>)}</nav></section></main>;
}
