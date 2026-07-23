import type { MetadataRoute } from "next";
const BASE = "https://www.vedharagroup.com";
const D = new Date("2026-07-22");
const pages = ["/","/about","/services","/contact","/buy","/sell","/rent","/commercial","/luxury","/new-launches","/investment-advisory","/nri-services","/property-management","/verification-center","/calculators","/market-insights","/blog","/case-studies","/success-stories","/careers","/faq","/privacy","/terms"];
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(path => ({ url:`${BASE}${path}`, lastModified:D }));
}
