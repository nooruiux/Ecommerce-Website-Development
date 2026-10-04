import { Open_Sans, Plus_Jakarta_Sans, Poppins } from "next/font/google";
import localFont from "next/font/local";

// Headlines (LCP text on most routes): preloaded.
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  variable: "--font-poppins",
});

// Body: Source Serif 4 instanced at opsz 40, latin subset, 400–700 (app/fonts/README.md). Preloaded.
export const sourceSerif = localFont({
  src: "../app/fonts/source-serif-4-opsz40-latin.woff2",
  weight: "400 700",
  style: "normal",
  display: "swap",
  preload: true,
  adjustFontFallback: "Times New Roman",
  variable: "--font-source-serif",
});

// Search placeholder only: not preloaded.
export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
  variable: "--font-open-sans",
});

// Button labels: not preloaded.
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
  variable: "--font-plus-jakarta",
});

export const fontVariables = [poppins, sourceSerif, openSans, plusJakarta]
  .map((font) => font.variable)
  .join(" ");
