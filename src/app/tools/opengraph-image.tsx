import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DesiRig | Free Trucking Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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

        {/* Main title */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: "900px",
          }}
        >
          Free Trucking Tools
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 400,
            opacity: 0.7,
            marginTop: "16px",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          Fuel Calculator, Trip Planner, License Quiz &amp; More
        </div>

        {/* CTA pill */}
        <div
          style={{
            marginTop: "40px",
            fontSize: "18px",
            color: "#FACC15",
            border: "2px solid #FACC15",
            borderRadius: "12px",
            padding: "12px 32px",
            display: "flex",
          }}
        >
          Try Free Tools on DesiRig
        </div>
      </div>
    ),
    { ...size }
  );
}
