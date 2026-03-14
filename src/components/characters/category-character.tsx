import { SikhTruckerAvatar } from "./sikh-trucker";
import { YoungMechanicAvatar } from "./young-mechanic";
import { CompanyOwnerAvatar } from "./company-owner";

/**
 * Returns the right character avatar for a category.
 * Trucking categories → Trucker
 * Mechanic/repair → Mechanic
 * Business/owner categories → Company Owner
 * Default → Trucker (it's a trucking site)
 */
export function CategoryCharacter({
  categorySlug,
  isTrucking,
  size = 40,
  className = "",
}: {
  categorySlug: string;
  isTrucking?: boolean;
  size?: number;
  className?: string;
}) {
  const slug = categorySlug.toLowerCase();

  // Mechanic categories
  if (
    slug.includes("mechanic") ||
    slug.includes("repair") ||
    slug.includes("tire") ||
    slug.includes("wash") ||
    slug.includes("parts") ||
    slug.includes("diesel") ||
    slug.includes("towing")
  ) {
    return <YoungMechanicAvatar size={size} className={className} />;
  }

  // Owner/business categories
  if (
    slug.includes("insurance") ||
    slug.includes("accountant") ||
    slug.includes("tax") ||
    slug.includes("finance") ||
    slug.includes("lawyer") ||
    slug.includes("real-estate") ||
    slug.includes("mortgage") ||
    slug.includes("consultant") ||
    slug.includes("company-owner")
  ) {
    return <CompanyOwnerAvatar size={size} className={className} />;
  }

  // Trucker for everything else (trucking company, driving school, truck stop, etc.)
  return <SikhTruckerAvatar size={size} className={className} />;
}
