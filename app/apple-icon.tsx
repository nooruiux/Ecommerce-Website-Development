import { ImageResponse } from "next/og";
import { brandColors as c } from "@/lib/brand-colors";

// Placeholder mark until the real logo is exported (replace with app/apple-icon.png).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: c.primaryLight,
        color: c.accent,
        fontSize: 112,
        fontWeight: 700,
        borderRadius: 0,
      }}
    >
      N
    </div>,
    size,
  );
}
