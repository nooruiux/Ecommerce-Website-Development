import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP fallback; originals stay as the source files.
    formats: ["image/avif", "image/webp"],
    // Largest source export is 1440 px wide: drop the 2048/3840 candidates to keep srcsets (and HTML) short.
    deviceSizes: [640, 750, 828, 1080, 1280, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
