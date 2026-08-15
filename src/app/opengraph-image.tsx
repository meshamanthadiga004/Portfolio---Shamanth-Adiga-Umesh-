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
          background: "#f7f7fa",
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
              fontSize: 88,
              lineHeight: 1.05,
              color: "#14151a",
              letterSpacing: "-0.03em",
            }}
          >
            {profile.nameLead}&nbsp;
            <span style={{ color: "#5b4be0", fontStyle: "italic" }}>
              {profile.nameAccent}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              lineHeight: 1.35,
              color: "#5a5d68",
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
              width: 120,
              height: 6,
              background: "linear-gradient(120deg,#6d5ef6,#3b82f6,#06b6d4)",
            }}
          />
          <div style={{ display: "flex", fontSize: 24, color: "#5b4be0" }}>
            MBA · Data Science &amp; Analytics
          </div>
        </div>
      </div>
    ),
    size
  );
}
