import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP fallback; originals stay as the source files.
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Inline the (small, tokenised) stylesheet to remove the render-blocking CSS request.
    inlineCss: true,
  },
};

export default nextConfig;
