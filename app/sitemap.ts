import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/data/blogPosts";
import { videoSlug, watchVideos } from "@/lib/data/videos";
const BASE = "https://www.vedharagroup.com";
const D = new Date("2026-08-06");
const pages = ["/","/about","/services","/contact","/buy","/sell","/sell/valuation","/rent","/commercial","/luxury","/new-launches","/investment-advisory","/nri-services","/property-management","/how-we-charge","/verification-center","/calculators","/market-insights","/blog","/insights","/case-studies","/success-stories","/careers","/faq","/privacy","/terms","/team","/tricity","/search","/videos","/gurugram","/noida","/greater-noida","/south-delhi","/chandigarh","/mohali","/panchkula","/faridabad","/ghaziabad","/mathura-vrindavan"];
const blogUrls = blogPosts.map(p => `/${p.path ?? "blog"}/${p.slug}`);
const videoUrls = watchVideos.map(v => `/watch/${videoSlug(v.file)}`);
export default function sitemap(): MetadataRoute.Sitemap {
  return [...pages, ...blogUrls, ...videoUrls].map(path => ({ url:`${BASE}${path}`, lastModified:D }));
}
