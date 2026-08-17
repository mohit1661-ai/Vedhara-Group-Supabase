import { ImageResponse } from "next/og";
import { blogPosts } from "@/lib/data/blogPosts";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  const title = post?.title ?? "Vedhara Group";
  // Truncate long titles
  const displayTitle = title.length > 80 ? title.substring(0, 77) + "…" : title;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "linear-gradient(135deg, #0F1E38 0%, #1a2f4f 50%, #0F1E38 100%)",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Gold accent line */}
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: "60px",
            width: "80px",
            height: "4px",
            background: "linear-gradient(90deg, #D4A843, #E8C970)",
            borderRadius: "2px",
          }}
        />
        {/* Title */}
        <div
          style={{
            fontSize: "48px",
            fontFamily: "sans-serif",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.2,
            marginBottom: "24px",
            maxWidth: "900px",
          }}
        >
          {displayTitle}
        </div>
        {/* Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#E8C970",
            }}
          />
          <div
            style={{
              fontSize: "18px",
              fontFamily: "sans-serif",
              fontWeight: 600,
              color: "#E8C970",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Vedhara Group
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
