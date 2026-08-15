import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

/* Rendered once at build time into a static PNG. This is what LinkedIn,
   WhatsApp and Slack show when someone shares the link. */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — portfolio`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbfaf8",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#5c6470",
          }}
        >
          {profile.location}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 76,
              lineHeight: 1.1,
              color: "#14161a",
              letterSpacing: "-0.02em",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              lineHeight: 1.35,
              color: "#5c6470",
              maxWidth: 900,
            }}
          >
            {profile.headline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 6,
              background: "#1e4d47",
            }}
          />
          <div style={{ display: "flex", fontSize: 24, color: "#1e4d47" }}>
            MBA · Data Science &amp; Analytics
          </div>
        </div>
      </div>
    ),
    size
  );
}
