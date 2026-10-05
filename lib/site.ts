// Single source for the brand name: logo alt, copy, metadata, JSON-LD.
// Brand name confirmed: "Nattoral" (matches the Figma logo and copyright).
export const site = {
  name: "Nattoral",
  tagline: "Skin Care, Hair Care & Personal Care",
  description:
    "Shop skin care, hair care, personal care and mom & baby products, and book a skincare consultation.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nattoral-zeta.vercel.app",
  copyrightYear: 2023,
  email: "support@nattoral.com",
  // No published mobile app yet: hides the footer "Download Our App" block (no placeholder badges).
  hasApp: false,
} as const;
