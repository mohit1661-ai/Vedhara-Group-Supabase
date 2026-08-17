import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";

export interface Crumb { name:string; href?:string; }
const BASE = "https://www.vedharagroup.com";

// Visually hidden so it never disturbs the layout, while remaining in the
// accessibility tree and, via the BreadcrumbList JSON-LD, for search engines.
const srOnly = { position:"absolute" as const, width:1, height:1, padding:0, margin:-1, overflow:"hidden", clip:"rect(0,0,0,0)", whiteSpace:"nowrap" as const, border:0 };

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
      <nav aria-label="Breadcrumb" style={srOnly}>
        <ol style={{ listStyle:"none", display:"flex", gap:8, margin:0, padding:0 }}>
          {items.map((it, i) => (
            <li key={i} style={{ display:"flex", gap:8 }}>
              {i > 0 && <span aria-hidden="true">/</span>}
              {it.href && i < items.length - 1 ? (
                <Link href={it.href}>{it.name}</Link>
              ) : (
                <span aria-current="page">{it.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
