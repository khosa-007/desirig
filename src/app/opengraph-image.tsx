import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DesiRig | Your Trusted Desi Toolkit";
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
          background: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              backgroundColor: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
            }}
          >
            🚛
          </div>
          <div style={{ fontSize: "64px", fontWeight: 800 }}>
            DesiRig
          </div>
        </div>
        <div
          style={{
            fontSize: "28px",
            fontWeight: 400,
            opacity: 0.9,
            maxWidth: "700px",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Your Trusted Desi Trucking & Business Toolkit
        </div>
        <div
          style={{
            marginTop: "32px",
            fontSize: "20px",
            opacity: 0.7,
            display: "flex",
            gap: "24px",
          }}
        >
          <span>38,000+ Businesses</span>
          <span>•</span>
          <span>244 Cities</span>
          <span>•</span>
          <span>15,600+ Carriers</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
