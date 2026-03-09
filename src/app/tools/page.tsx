import type { Metadata } from "next";
import { ToolsContent } from "./tools-content";

export const metadata: Metadata = {
  title: "Free Trucking Tools & Calculators",
  description:
    "Free trucking tools for Canadian drivers — fuel cost calculator, weight limit reference, HOS calculator, license quiz, and more. Built for Desi truckers.",
  alternates: {
    canonical: "https://desirig.com/tools",
  },
};

export default function ToolsPage() {
  return <ToolsContent />;
}
