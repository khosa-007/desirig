import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 100,
          fontWeight: 900,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        D
      </div>
    ),
    { ...size }
  );
}
