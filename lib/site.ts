// Single source for the brand name: logo alt, copy, metadata, JSON-LD.
// Figma logo and copyright read "Nattoral". Final spelling pending confirmation.
export const site = {
  name: "Nattoral",
  tagline: "Skin Care, Hair Care & Personal Care",
  description:
    "Shop skin care, hair care, personal care and mom & baby products, and book a skincare consultation.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  copyrightYear: 2023,
  email: "support@nattoral.com",
} as const;
