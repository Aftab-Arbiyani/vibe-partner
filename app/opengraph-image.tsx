import { ImageResponse } from "next/og";

export const alt = "VibePartner — Human support for AI builders";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0D0D0D",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(99, 102, 241, 0.15)",
            border: "1px solid rgba(99, 102, 241, 0.4)",
            borderRadius: "9999px",
            padding: "6px 18px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "9999px",
              background: "#818cf8",
              display: "flex",
            }}
          />
          <span style={{ color: "#818cf8", fontSize: "18px", fontWeight: 600 }}>
            Human support for AI builders
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "white",
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            When your vibe-coded app breaks —
          </span>
          <span
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#818cf8",
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            we fix it.
          </span>
        </div>

        {/* Subheadline */}
        <div
          style={{
            display: "flex",
            fontSize: "24px",
            color: "#9ca3af",
            textAlign: "center",
          }}
        >
          Async bug fixes &amp; live pair programming for non-technical founders.
        </div>

        {/* Brand */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
          }}
        >
          <span style={{ color: "#818cf8", fontSize: "22px", fontWeight: 700 }}>
            vibepartner.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
