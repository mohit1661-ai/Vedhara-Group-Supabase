import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/data/blogPosts";
import ArticlePage from "@/components/blog/ArticlePage";

export function generateStaticParams() {
  return blogPosts.filter((p)=>p.path==="insights").map((p)=>({ slug:p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug:string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p)=>p.slug===slug);
  if(!post || post.path!=="insights") return { title:"Article Not Found" };
  return {
    title:post.metaTitle,
    description:post.metaDescription,
    keywords:post.keywords,
    alternates:{ canonical:`https://www.vedharagroup.com/insights/${post.slug}` },
    openGraph:{
      title:post.metaTitle || post.title,
      description:post.metaDescription,
      type:"article",
      publishedTime:post.datePublished,
      modifiedTime:post.dateModified,
      images:[{ url:"/og-default.jpg", width:1200, height:630, alt:post.title }],
    },
  };
}

export default async function InsightsArticlePage({ params }: { params: Promise<{ slug:string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p)=>p.slug===slug);
  if(!post || post.path!=="insights") notFound();
  return <ArticlePage post={post} basePath="insights" />;
}