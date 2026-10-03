import { AssetImage } from "@/components/ui/AssetImage";
import { buttonClasses } from "@/components/ui/Button";
import { homeAssets } from "@/lib/assets";
import { cn } from "@/lib/cn";
import Link from "next/link";

/*
 * Figma CTA 317:1291 — two 622/624 x 488 cards, radius 24, faint border, promo shadow,
 * "Shop Now" tab flush bottom-right (radius 4/4/24/4). Artwork carries its own copy.
 */
const banners = [
  {
    ...homeAssets.ctaLeft,
    alt: "White Firm Face serum — brand promotion",
    href: "/category/skin-care",
  },
  { ...homeAssets.ctaRight, alt: "Bright and Soft skin care set — brand promotion", href: "/shop" },
];

export function PromoBanners() {
  return (
    <section aria-label="Promotions" className="container-page grid gap-8 md:grid-cols-2">
      {banners.map((b) => (
        <Link
          key={b.src}
          href={b.href}
          className="group relative block aspect-[622/488] overflow-hidden rounded-2xl border border-border-faint shadow-promo focus-ring xl:aspect-auto xl:h-122"
        >
          <AssetImage
            src={b.src}
            alt={b.alt}
            fill
            sizes="(min-width: 90rem) 624px, (min-width: 48rem) 50vw, 100vw"
            className="object-cover transition-transform duration-(--duration-base) group-hover:scale-[1.02]"
          />
          <span
            className={cn(
              buttonClasses({ size: "lg" }),
              "absolute right-0 bottom-0 rounded-tl-sm rounded-tr-sm rounded-br-2xl rounded-bl-sm group-hover:bg-primary-hover",
            )}
          >
            Shop Now
          </span>
        </Link>
      ))}
    </section>
  );
}
