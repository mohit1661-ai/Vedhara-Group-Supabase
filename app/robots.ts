import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules:[
      // Video files must remain crawlable so Google can fetch the media
      // referenced by the video sitemap and the dedicated /watch/ pages.
      // Raw decorative /videos/*.mp4 copies are blocked so Google does not
      // treat them as standalone videos: it associates videos with /watch/
      // pages instead (the byte-identical, sitemapped mirror underneath).
      { userAgent:"*", allow:["/", "/watch/"], disallow:["/api/", "/admin/", "/videos/*.mp4"] },
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
