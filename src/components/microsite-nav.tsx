import Link from "next/link";
import type { Site } from "@/lib/sites";

export function MicrositeNav({ site }: { site: Site }) {
  return (
    <div className={`microsite-bar theme-${site.theme}`}>
      <div className="shell microsite-nav">
        <Link className="microsite-brand" href={`/projects/${site.slug}`}><span className="microsite-dot" />{site.name}</Link>
        <nav aria-label={`${site.name} navigation`} className="microsite-links">
          <Link href={`/projects/${site.slug}`}>Overview</Link>
          <Link href={`/projects/${site.slug}/research`}>Research</Link>
          <Link href="/">Root namespace -&gt;</Link>
        </nav>
      </div>
    </div>
  );
}
