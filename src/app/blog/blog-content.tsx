"use client";

import Link from "next/link";
import { Clock, ChevronRight } from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/lib/language-context";

const categoryColors: Record<string, string> = {
  trucking: "bg-orange-50 text-orange-700",
  community: "bg-green-50 text-green-700",
  safety: "bg-red-50 text-red-700",
  guides: "bg-blue-50 text-blue-700",
};

interface PostData {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
}

export function BlogContent({ posts }: { posts: PostData[] }) {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t({ en: "Blog", pa: "ਬਲੌਗ" })}</h1>
          <p className="mt-2 text-muted-foreground">
            {t({ en: "Tips, guides, and news for Desi truckers and the community", pa: "ਦੇਸੀ ਟਰੱਕ ਡਰਾਈਵਰਾਂ ਤੇ ਕਮਿਊਨਿਟੀ ਲਈ ਟਿਪਸ, ਗਾਈਡ ਤੇ ਖ਼ਬਰਾਂ" })}
          </p>
        </div>
        <LanguageToggle />
      </div>

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
              {t({ en: "Read more", pa: "ਹੋਰ ਪੜ੍ਹੋ" })} <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
