import type { Metadata } from "next";
import { ToolsContent } from "./tools-content";

export const metadata: Metadata = {
  title: "Free Trucking Tools & Calculators",
  description:
    "Free trucking tools for Canadian drivers. Fuel cost calculator, weight limits, HOS reference, license quiz, and more. Built for Desi truckers.",
  alternates: {
    canonical: "https://desirig.com/tools",
  },
};

export default function ToolsPage() {
  return <ToolsContent />;
}
