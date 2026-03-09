import { ImageResponse } from "next/og";
import { getCityBySlug, getCategoryBySlug } from "@/lib/queries";

export const runtime = "edge";
export const alt = "DesiRig — Business Listings";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ citySlug: string; categorySlug: string }>;
}) {
  const { citySlug, categorySlug } = await params;
  const [city, category] = await Promise.all([
    getCityBySlug(citySlug),
    getCategoryBySlug(categorySlug),
  ]);

  const cityName = city ? `${city.name}, ${city.province}` : citySlug;
  const categoryName = category?.name ?? categorySlug;

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
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#f97316",
            marginBottom: "16px",
          }}
        >
          DesiRig.com
        </div>
        <div
          style={{
            fontSize: "52px",
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: "900px",
          }}
        >
          {categoryName}
        </div>
        <div
          style={{
            fontSize: "32px",
            fontWeight: 400,
            opacity: 0.7,
            marginTop: "16px",
          }}
        >
          in {cityName}
        </div>
        <div
          style={{
            marginTop: "40px",
            fontSize: "18px",
            color: "#f97316",
            border: "2px solid #f97316",
            borderRadius: "12px",
            padding: "12px 32px",
          }}
        >
          Browse Listings on DesiRig
        </div>
      </div>
    ),
    { ...size }
  );
}
