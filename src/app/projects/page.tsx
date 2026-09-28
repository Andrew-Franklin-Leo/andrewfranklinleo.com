import type { Metadata } from "next";
import Link from "next/link";
import { getAllEntities } from "@/lib/content";
import { sites } from "@/lib/sites";

export const metadata: Metadata = {
  title: "Projects",
  description: "The project sites, protocols, and research programs connected to Andrew Franklin Leo's work.",
};

export default async function ProjectsPage() {
  const entities = await getAllEntities();
  return <main className="projects-index"><section className="projects-index-hero"><div className="shell"><p className="eyebrow">Andrew Franklin Leo / Project portfolio</p><h1>Different projects.<br /><em>One direction.</em></h1><p>Each site has a distinct audience and job. Together they explore how intelligence becomes accountable capability, coordinated action, and economic progress.</p></div></section><section className="projects-index-list shell"><div className="section-head"><div><p className="eyebrow">The portfolio</p><h2 className="section-title">Choose a<br /><em>world to enter.</em></h2></div><p>Projects are first-class destinations. Their shared entity types provide a common structure without flattening their individual purpose.</p></div><div className="project-directory">{sites.map((site, index) => { const count = entities.filter((entity) => entity.siteIds.includes(site.siteId)).length; return <article className={`project-directory-card theme-${site.theme}`} key={site.siteId}><div><span className="project-number">0{index + 1} / {site.siteId}</span><h2>{site.name}</h2><p>{site.description}</p></div><div className="project-directory-meta"><span>{count} connected object{count === 1 ? "" : "s"}</span><Link className="button" href={`/projects/${site.slug}`}>Enter project</Link><Link className="text-link" href={`/projects/${site.slug}/sections`}>Browse site structure -&gt;</Link></div></article>; })}</div></section></main>;
}
