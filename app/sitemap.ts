import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/data/blogPosts";
const BASE = "https://www.vedharagroup.com";
const D = new Date("2026-08-02");
const pages = ["/","/about","/services","/contact","/buy","/sell","/rent","/commercial","/luxury","/new-launches","/investment-advisory","/nri-services","/property-management","/verification-center","/calculators","/market-insights","/blog","/case-studies","/success-stories","/careers","/faq","/privacy","/terms","/team","/tricity","/videos"];
const blogUrls = blogPosts.map(p => `/blog/${p.slug}`);
export default function sitemap(): MetadataRoute.Sitemap {
  return [...pages, ...blogUrls].map(path => ({ url:`${BASE}${path}`, lastModified:D }));
}
