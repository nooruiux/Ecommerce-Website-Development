import { ImageResponse } from "next/og";
import { brandColors as c } from "@/lib/brand-colors";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand OG card: primary-light panel, wordmark in accent, tagline in ink.
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 96,
        background: c.primaryLight,
        color: c.ink,
      }}
    >
      <div
        style={{ display: "flex", width: 120, height: 8, background: c.primary, marginBottom: 40 }}
      />
      <div style={{ fontSize: 128, fontWeight: 700, letterSpacing: 12, color: c.accent }}>
        {site.name.toUpperCase()}
      </div>
      <div style={{ fontSize: 44, marginTop: 24 }}>{site.tagline}</div>
      <div style={{ fontSize: 30, marginTop: 16, color: c.accent }}>
        Shop products · Book a skincare consultation
      </div>
    </div>,
    size,
  );
}
