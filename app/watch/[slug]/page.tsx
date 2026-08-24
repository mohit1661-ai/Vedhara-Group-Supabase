import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import { videoSlug, watchVideos, VIDEOS_BASE_URL as BASE, VIDEOS_UPLOAD_DATE as UPLOAD_DATE } from "@/lib/data/videos";

const enc = (value: string) => encodeURI(value);

export function generateStaticParams() {
  return watchVideos.map((video) => ({ slug: videoSlug(video.file) }));
}

function getVideo(slug: string) {
  return watchVideos.find((video) => videoSlug(video.file) === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const video = getVideo(slug);
  if (!video) return {};

  const url = `${BASE}/watch/${slug}`;
  return {
    title: video.title,
    description: video.desc,
    alternates: { canonical: url },
    openGraph: {
      type: "video.other",
      url,
      title: video.title,
      description: video.desc,
      images: [{ url: `${BASE}/watch/${enc(`thumb-${video.file.replace(/\.mp4$/i, "")}.jpg`)}`, alt: video.title }],
      videos: [{ url: `${BASE}/watch/${enc(video.file)}`, type: "video/mp4" }],
    },
  };
}

export default async function WatchVideoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const video = getVideo(slug);
  if (!video) notFound();

  const url = `${BASE}/watch/${slug}`;
  const mediaUrl = `${BASE}/watch/${enc(video.file)}`;
  const thumbnailUrl = `${BASE}/watch/${enc(`thumb-${video.file.replace(/\.mp4$/i, "")}.jpg`)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.desc,
    thumbnailUrl,
    uploadDate: UPLOAD_DATE,
    contentUrl: mediaUrl,
    embedUrl: url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    publisher: { "@type": "Organization", name: "Vedhara Group", url: BASE },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <main style={{ background: "var(--cream)", minHeight: "70vh", padding: "96px 32px" }}>
        <article style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: 14 }}>Vedhara Group Film</p>
          <h1 className="heading-xl" style={{ color: "var(--navy)", maxWidth: 800, marginBottom: 18 }}>{video.title}</h1>
          <p className="body-lg" style={{ color: "var(--navy)", opacity: 0.75, maxWidth: 760, marginBottom: 32 }}>{video.desc}</p>
          <video controls preload="metadata" poster={thumbnailUrl} title={video.title} style={{ display: "block", width: "100%", maxHeight: "70vh", background: "#000", borderRadius: 10 }}>
            <source src={mediaUrl} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
          <section style={{ maxWidth: 780, marginTop: 36 }}>
            <h2 className="heading-lg" style={{ color: "var(--navy)", marginBottom: 12 }}>About this film</h2>
            <p className="body-md" style={{ color: "var(--navy)", opacity: 0.78, lineHeight: 1.75 }}>
              This Vedhara Group film gives buyers, sellers, investors and NRI clients a clear view of how independent property advisory works in practice. The video is part of our resource library for Delhi NCR, Chandigarh Tricity and North India, where local market knowledge and document-led verification matter before a property decision is made.
            </p>
            <p className="body-md" style={{ color: "var(--navy)", opacity: 0.78, lineHeight: 1.75 }}>
              Watch the complete film above, then explore our <a href="/verification-center" style={{ color: "var(--gold)", textDecoration: "underline" }}>Verification Framework</a> or <a href="/contact" style={{ color: "var(--gold)", textDecoration: "underline" }}>book a free consultation</a> for advice matched to your goals, location and timeline.
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
