import type { Metadata, Viewport } from "next";
import { DeferredSpeedInsights } from "@/components/analytics/DeferredSpeedInsights";
import { fontVariables } from "@/lib/fonts";
import { ogBase } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { ...ogBase, url: "/" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        {children}
        {/* Real-user Core Web Vitals (LCP etc.) on Vercel; mounted after window load. */}
        <DeferredSpeedInsights />
      </body>
    </html>
  );
}
