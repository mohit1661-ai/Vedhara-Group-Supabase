import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules:[
      // Video files must remain crawlable so Google can fetch the media
      // referenced by the video sitemap and the dedicated /watch/ pages.
      { userAgent:"*", allow:["/", "/videos/", "/watch/"], disallow:["/api/"] },
      { userAgent:"GPTBot", allow:"/" },
      { userAgent:"Google-Extended", allow:"/" },
      { userAgent:"ClaudeBot", allow:"/" },
      { userAgent:"PerplexityBot", allow:"/" },
    ],
    sitemap:[
      "https://www.vedharagroup.com/sitemap.xml",
      "https://www.vedharagroup.com/sitemap-videos.xml",
    ],
  };
}
