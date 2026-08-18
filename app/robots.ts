import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules:[
      // Block decorative background videos so Google doesn't flag
      // "Video isn't on a watch page" for pages where video is not
      // the primary content. Videos remain fully visible to visitors.
      { userAgent:"*", allow:"/", disallow:["/videos/","/api/","/_next/"] },
      { userAgent:"GPTBot", allow:"/", disallow:["/videos/"] },
      { userAgent:"Google-Extended", allow:"/", disallow:["/videos/"] },
      { userAgent:"ClaudeBot", allow:"/", disallow:["/videos/"] },
      { userAgent:"PerplexityBot", allow:"/", disallow:["/videos/"] },
    ],
    sitemap:[
      "https://www.vedharagroup.com/sitemap.xml",
      "https://www.vedharagroup.com/sitemap-videos.xml",
    ],
  };
}
