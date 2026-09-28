import Link from "next/link";
import { getRootEntities } from "@/lib/content";

export default async function AdminPage() {
  const entities = await getRootEntities();
  return <main className="section-page shell"><p className="eyebrow">Registry / Admin</p><h1 className="page-title">Entity registry</h1><p className="page-intro">This public deployment is static and read-only. Editing requires a separate authenticated CMS service; CMS_ADMIN_TOKEN alone does not enable writes here.</p><div className="admin-list">{entities.map((entity) => <Link href={`/${entity.entityType === "venture" ? "ventures" : entity.entityType === "research" ? "research" : entity.entityType === "model" ? "models" : entity.entityType === "system" ? "systems" : "ideas"}/${entity.slug}`} key={entity.entityId}><span>{entity.entityId}</span><strong>{entity.entityName}</strong><small>{entity.status} / updated {entity.updated}</small></Link>)}</div></main>;
}
