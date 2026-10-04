import type { Crumb } from "@/components/ui/Breadcrumb";
import type { Product } from "@/types";
import { site } from "./site";

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();

// Next replaces (not merges) nested openGraph objects, so every page spreads this base.
export const ogBase = {
  type: "website" as const,
  siteName: site.name,
  locale: "en_US",
  images: [
    { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` },
  ],
};

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped for "<" so it cannot close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: absoluteUrl(c.href) } : {}),
    })),
  };
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/images/brand/logo.png"),
    email: site.email,
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl("/shop")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function productLd(product: Product, url: string) {
  const inStock = product.variants.some((v) => v.stock > 0);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.id,
    image: product.images.map(absoluteUrl),
    brand: { "@type": "Brand", name: site.name },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(url),
      priceCurrency: "USD",
      price: (product.salePrice ?? product.price).toFixed(2),
      availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };
}
