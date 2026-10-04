import { ImageResponse } from "next/og";
import { brandColors as c } from "@/lib/brand-colors";

// Placeholder mark until the real logo is exported (replace with app/icon.png).
export const size = { width: 32, height: 32 };
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
        fontSize: 22,
        fontWeight: 700,
        borderRadius: 6,
      }}
    >
      N
    </div>,
    size,
  );
}
