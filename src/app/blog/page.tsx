import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ChevronRight } from "lucide-react";
import { getRecentPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Trucking Tips, Guides & Community News",
  description:
    "Tips for Desi truckers, safety guides, business directories, and community news across Canada.",
  alternates: { canonical: "https://desirig.com/blog" },
};

const categoryColors: Record<string, string> = {
  trucking: "bg-orange-50 text-orange-700",
  community: "bg-green-50 text-green-700",
  safety: "bg-red-50 text-red-700",
  guides: "bg-blue-50 text-blue-700",
};

export default function BlogPage() {
  const posts = getRecentPosts();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      <p className="mt-2 text-muted-foreground">
        Tips, guides, and news for Desi truckers and the community
      </p>

      <div className="mt-8 space-y-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-xl border bg-card p-6 transition-all hover:border-orange-200 hover:shadow-md"
          >
            <div className="flex items-center gap-3 text-sm">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                  categoryColors[post.category] ?? "bg-muted text-muted-foreground"
                }`}
              >
                {post.category}
              </span>
              <span className="text-muted-foreground">{post.date}</span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>
            <h2 className="mt-3 text-xl font-semibold group-hover:text-orange-600">
              {post.title}
            </h2>
            <p className="mt-2 text-muted-foreground line-clamp-2">
              {post.description}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-orange-600">
              Read more <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
