"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Entity } from "@/lib/entities";
import { sectionForType } from "@/lib/entities";

export function SearchBrowser({ entities }: { entities: Entity[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return entities.filter((entity) => [entity.entityName, entity.entityType, entity.content, entity.problem, entity.hypothesis].filter(Boolean).join(" ").toLowerCase().includes(normalized));
  }, [entities, query]);

  return <>
    <div className="search-form"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search ideas, systems, research..." aria-label="Search entities" /><span>Search</span></div>
    {query && <p className="result-count">{results.length} result{results.length === 1 ? "" : "s"} for “{query}”</p>}
    <div className="search-results">{results.map((entity) => <Link href={`/${sectionForType(entity.entityType)}/${entity.slug}`} key={entity.entityId}><span>{entity.entityType} / {entity.entityId}</span><strong>{entity.entityName}</strong></Link>)}</div>
  </>;
}
