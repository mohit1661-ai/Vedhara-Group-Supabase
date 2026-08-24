import { watchVideos, videoSlug, VIDEOS_BASE_URL, VIDEOS_UPLOAD_DATE } from "@/lib/data/videos";

/**
 * Google video sitemap for the /videos watch page. All content and thumbnail
 * URLs point at /watch/, the crawlable mirror, because /videos/ media is
 * disallowed in robots.txt (decorative hero copies live there).
 * Reference: https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps
 */
export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const entries = watchVideos
    .map((v) => {
      const thumb = `${VIDEOS_BASE_URL}/watch/${encodeURIComponent(`thumb-${v.file.replace(/\.mp4$/, "")}.jpg`)}`;
      const content = `${VIDEOS_BASE_URL}/watch/${encodeURIComponent(v.file)}`;
      return `  <url>
    <loc>${VIDEOS_BASE_URL}/watch/${videoSlug(v.file)}</loc>
    <video:video>
      <video:thumbnail_loc>${thumb}</video:thumbnail_loc>
      <video:title>${esc(v.title)}</video:title>
      <video:description>${esc(v.desc)}</video:description>
      <video:content_loc>${content}</video:content_loc>
      <video:publication_date>${VIDEOS_UPLOAD_DATE}</video:publication_date>
    </video:video>
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entries}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
