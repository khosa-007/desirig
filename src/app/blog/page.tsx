import type { Metadata } from "next";
import { getRecentPosts } from "@/lib/blog";
import { BlogContent } from "./blog-content";

export const metadata: Metadata = {
  title: "Blog — Trucking Tips, Guides & Community News",
  description:
    "Tips for Desi truckers, safety guides, business directories, and community news across Canada.",
  alternates: { canonical: "https://desirig.com/blog" },
};

export default function BlogPage() {
  const posts = getRecentPosts();
  return <BlogContent posts={posts} />;
}
