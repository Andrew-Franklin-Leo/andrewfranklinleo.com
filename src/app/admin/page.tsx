import Link from "next/link";
import { getRootEntities } from "@/lib/content";

export default async function AdminPage() {
  const entities = await getRootEntities();
  const enabled = Boolean(process.env.CMS_ADMIN_TOKEN);
  return <main className="section-page shell"><p className="eyebrow">Registry / Admin</p><h1 className="page-title">Entity registry</h1><p className="page-intro">{enabled ? "Admin authentication is configured. Write operations are the next integration boundary." : "Write operations are disabled until CMS_ADMIN_TOKEN is configured. The public registry remains read-only."}</p><div className="admin-list">{entities.map((entity) => <Link href={`/${entity.entityType === "venture" ? "ventures" : entity.entityType === "research" ? "research" : entity.entityType === "model" ? "models" : entity.entityType === "system" ? "systems" : "ideas"}/${entity.slug}`} key={entity.entityId}><span>{entity.entityId}</span><strong>{entity.entityName}</strong><small>{entity.status} / updated {entity.updated}</small></Link>)}</div></main>;
}
