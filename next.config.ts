import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Inline the (small, tokenised) stylesheet to remove the render-blocking CSS request.
    inlineCss: true,
  },
};

export default nextConfig;
