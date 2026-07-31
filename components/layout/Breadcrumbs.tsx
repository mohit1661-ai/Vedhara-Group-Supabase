import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";

export interface Crumb { name:string; href?:string; }
const BASE = "https://www.vedharagroup.com";

export default function Breadcrumbs({ items }:{ items:Crumb[] }) {
  const schema = {
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type":"ListItem",
      position:i + 1,
      name:it.name,
      ...(it.href ? { item: BASE + (it.href === "/" ? "" : it.href) } : {}),
    })),
  };
  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label="Breadcrumb" style={{ background:"var(--navy)", padding:"14px 32px 0" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <ol style={{ listStyle:"none", display:"flex", flexWrap:"wrap", alignItems:"center", gap:6, margin:0, padding:0, fontFamily:"var(--t-body)", fontSize:12, letterSpacing:"0.03em" }}>
            {items.map((it, i) => (
              <li key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
                {i > 0 && <span style={{ color:"rgba(255,255,255,0.28)" }}>/</span>}
                {it.href && i < items.length - 1 ? (
                  <Link href={it.href} style={{ color:"rgba(255,255,255,0.55)", textDecoration:"none", transition:"color 0.2s" }}>{it.name}</Link>
                ) : (
                  <span style={{ color:"var(--gold-lt)" }} aria-current="page">{it.name}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
