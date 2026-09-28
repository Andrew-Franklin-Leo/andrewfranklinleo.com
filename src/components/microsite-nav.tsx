import Link from "next/link";
import type { Site } from "@/lib/sites";

export function MicrositeNav({ site }: { site: Site }) {
  const links = site.slug === "state-transition-protocol"
    ? [{ label: "Overview", href: `/projects/${site.slug}` }, { label: "Sections", href: `/projects/${site.slug}/sections` }, { label: "Architecture", href: `/projects/${site.slug}/docs/architecture` }, { label: "Core", href: `/projects/${site.slug}/docs/protocol-core` }, { label: "Developer", href: `/projects/${site.slug}/docs/developer` }]
    : site.slug === "institutional-accountability-infrastructure"
      ? [{ label: "Overview", href: `/projects/${site.slug}` }, { label: "Sections", href: `/projects/${site.slug}/sections` }, { label: "Audience map", href: `/projects/${site.slug}/#audience-stack` }, { label: "Infrastructure object", href: `/projects/${site.slug}/systems/institutional-accountability-infrastructure` }]
    : [{ label: "Overview", href: `/projects/${site.slug}` }, { label: "Sections", href: `/projects/${site.slug}/sections` }, { label: "Research", href: `/projects/${site.slug}/research` }];
  return (
    <div className={`microsite-bar theme-${site.theme}`}>
      <div className="shell microsite-nav">
        <Link className="microsite-brand" href={`/projects/${site.slug}`}><span className="microsite-dot" />{site.name}</Link>
        <nav aria-label={`${site.name} navigation`} className="microsite-links">
          {links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
          <Link href="/">Root namespace -&gt;</Link>
        </nav>
      </div>
    </div>
  );
}
