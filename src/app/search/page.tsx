import { SearchBrowser } from "@/components/search-browser";
import { getRootEntities } from "@/lib/content";

export default async function SearchPage() {
  const entities = await getRootEntities();
  return <main className="section-page shell"><p className="eyebrow">Registry / Search</p><h1 className="page-title">Find an entity</h1><SearchBrowser entities={entities} /></main>;
}
