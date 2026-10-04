import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

// /cart and /checkout are NOT disallowed: crawlers must fetch them to see their noindex tag.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/primitives"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
