import { ImageResponse } from "next/og";
import { getBusinessBySlug } from "@/lib/queries";

export const runtime = "edge";
export const alt = "DesiRig | Business Details";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ citySlug: string; categorySlug: string; businessSlug: string }>;
}) {
  const { citySlug, businessSlug } = await params;
  const business = await getBusinessBySlug(businessSlug, citySlug);

  const name = business?.name ?? businessSlug;
  const rating = business?.google_rating ?? 0;
  const reviewCount = business?.google_review_count ?? 0;
  const city = (business?.cities as { name: string; province: string } | null);
  const category = (business?.categories as { name: string } | null);
  const cityLabel = city ? `${city.name}, ${city.province}` : citySlug;
  const categoryName = category?.name ?? "";

  // Build star string
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  const stars = "★".repeat(fullStars) + (hasHalf ? "½" : "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #111 0%, #1a1a1a 50%, #111 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        {/* Yellow top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "#FACC15",
            display: "flex",
          }}
        />

        {/* Brand */}
        <div
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#FACC15",
            marginBottom: "24px",
          }}
        >
          DesiRig.com
        </div>

        {/* Business name */}
        <div
          style={{
            fontSize: "48px",
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: "950px",
          }}
        >
          {name}
        </div>

        {/* Category + City */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 400,
            opacity: 0.7,
            marginTop: "12px",
            display: "flex",
            gap: "12px",
          }}
        >
          {categoryName ? <span>{categoryName}</span> : null}
          {categoryName ? <span>·</span> : null}
          <span>{cityLabel}</span>
        </div>

        {/* Rating */}
        {rating > 0 && (
          <div
            style={{
              marginTop: "20px",
              fontSize: "28px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ color: "#FACC15" }}>{stars}</span>
            <span style={{ opacity: 0.8 }}>
              {rating.toFixed(1)} ({reviewCount.toLocaleString()} reviews)
            </span>
          </div>
        )}

        {/* CTA pill */}
        <div
          style={{
            marginTop: "36px",
            fontSize: "18px",
            color: "#FACC15",
            border: "2px solid #FACC15",
            borderRadius: "12px",
            padding: "12px 32px",
            display: "flex",
          }}
        >
          View on DesiRig
        </div>
      </div>
    ),
    { ...size }
  );
}
