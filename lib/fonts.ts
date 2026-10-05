import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import localFont from "next/font/local";

/*
 * One family for the whole storefront: Plus Jakarta Sans (variable, 200–800).
 * A geometric sans built for UI: compact figures for prices, clear at small sizes on product
 * cards, and one preloaded file instead of four families.
 */
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  variable: "--font-plus-jakarta",
});

// Home hero only (Figma 317:419): H1, "Skin Care" watermark and badge are Poppins 500/700.
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  variable: "--font-poppins",
});

// Home hero only: eyebrow and badge "Discounts" are Source Serif (opsz 40 instance, app/fonts/README.md).
export const sourceSerif = localFont({
  src: "../app/fonts/source-serif-4-opsz40-latin.woff2",
  weight: "400 700",
  style: "normal",
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
  variable: "--font-source-serif",
});

export const fontVariables = [plusJakarta, poppins, sourceSerif].map((f) => f.variable).join(" ");
