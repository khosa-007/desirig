import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Fuel, Scale, Clock, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Trucking Tools & Calculators",
  description:
    "Free trucking tools for Canadian drivers — fuel cost calculator, weight limit reference, HOS calculator, and more. Built for Desi truckers.",
  alternates: {
    canonical: "https://desirig.com/tools",
  },
};

const tools = [
  {
    slug: "fuel-cost-calculator",
    name: "Fuel Cost Calculator",
    description: "Calculate trip fuel costs based on distance, fuel price, and MPG. Plan your fuel budget.",
    icon: Fuel,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    slug: "weight-limits",
    name: "Axle Weight Limits — Canada",
    description: "Quick reference for Canadian truck weight limits by province. Steer, drive, and tandem axle limits.",
    icon: Scale,
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    slug: "hos-calculator",
    name: "Hours of Service Quick Reference",
    description: "Canadian HOS rules at a glance — driving limits, rest requirements, cycle resets.",
    icon: Clock,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
];

export default function ToolsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">Tools</span>
      </nav>

      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
          <Calculator className="h-8 w-8 text-orange-600" />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Free Trucking Tools
        </h1>
        <p className="mt-2 text-muted-foreground">
          Calculators and reference guides built for Canadian truckers. Always free.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group rounded-xl border bg-card p-6 transition-all hover:border-orange-200 hover:shadow-md"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${tool.bg}`}>
              <tool.icon className={`h-6 w-6 ${tool.color}`} />
            </div>
            <h2 className="mt-4 font-semibold group-hover:text-orange-600">
              {tool.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
