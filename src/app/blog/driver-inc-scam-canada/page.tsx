import type { Metadata } from "next";
import { getBlogPost } from "@/lib/blog";
import { DriverIncScamContent } from "./blog-content";

const post = getBlogPost("driver-inc-scam-canada")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: {
    canonical: `https://desirig.com/blog/${post.slug}`,
  },
  openGraph: {
    title: post.title,
    description: post.description,
    type: "article",
    publishedTime: post.date,
  },
};

export default function BlogPost() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    publisher: {
      "@type": "Organization",
      name: "DesiRig",
      url: "https://desirig.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DriverIncScamContent
        title={post.title}
        description={post.description}
        date={post.date}
        readTime={post.readTime}
      />
    </>
  );
}
