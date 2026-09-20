import Link from "next/link";
import { Entity, sectionForType } from "@/lib/entities";

export function EntityCard({ entity, hrefPrefix = "" }: { entity: Entity; hrefPrefix?: string }) {
  return (
    <Link className="entity-card" href={`${hrefPrefix}/${sectionForType(entity.entityType)}/${entity.slug}`}>
      <div className="entity-meta"><span>{entity.entityType}</span><span>{entity.status}</span></div>
      <h3>{entity.entityName}</h3>
      <p>{entity.problem ?? entity.content.split("\n").find(Boolean) ?? "An evolving intellectual object."}</p>
      <span className="entity-arrow">Open entity -&gt;</span>
    </Link>
  );
}
