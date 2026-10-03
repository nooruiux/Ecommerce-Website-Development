import { Open_Sans, Plus_Jakarta_Sans, Poppins, Source_Serif_4 } from "next/font/google";

// Headlines
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

// Body. Figma uses "Source Serif Pro", published on Google Fonts as "Source Serif 4".
export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-source-serif",
});

// Search placeholder (Paragraph 1-16 reg)
export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-open-sans",
});

// Button labels
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

export const fontVariables = [poppins, sourceSerif, openSans, plusJakarta]
  .map((font) => font.variable)
  .join(" ");
