import { Plus_Jakarta_Sans } from "next/font/google";

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

export const fontVariables = plusJakarta.variable;
