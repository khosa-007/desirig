export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: "trucking" | "community" | "safety" | "guides";
  readTime: string;
}

// Blog post registry — add new posts here
export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-check-trucking-company-safety-before-signing",
    title: "How to Check a Trucking Company's Safety Record Before Signing On",
    description:
      "Don't sign with a carrier blindly. Here's exactly how to look up any company's safety rating, crash history, and driver count using free government data.",
    date: "2026-03-09",
    category: "safety",
    readTime: "5 min read",
  },
  {
    slug: "top-trucking-companies-brampton",
    title: "Top Rated Trucking Companies in Brampton, ON (2026)",
    description:
      "A curated list of the highest-rated Desi trucking companies in Brampton based on Google reviews and safety records.",
    date: "2026-03-09",
    category: "trucking",
    readTime: "4 min read",
  },
  {
    slug: "new-driver-checklist-canada",
    title: "New Truck Driver Checklist — Everything You Need Before Your First Run",
    description:
      "From getting your AZ license to choosing the right company, here's everything a new Desi trucker in Canada needs to know.",
    date: "2026-03-09",
    category: "guides",
    readTime: "7 min read",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRecentPosts(limit = 10): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}
