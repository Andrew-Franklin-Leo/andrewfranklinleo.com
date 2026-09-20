import Link from "next/link";

const sections = ["ideas", "systems", "intelligence", "economics", "civilization", "ventures", "research", "models"];

export function SiteNav() {
  return (
    <header className="site-header">
      <div className="shell nav-wrap">
        <Link className="brand" href="/">
          <span className="mark">A</span>
          <span>Andrew Franklin Leo</span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {sections.map((section) => <Link key={section} href={`/${section}`}>{section}</Link>)}
        </nav>
        <Link className="nav-admin" href="/admin">Registry</Link>
      </div>
    </header>
  );
}
