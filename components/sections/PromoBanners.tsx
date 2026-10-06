import { AssetImage } from "@/components/ui/AssetImage";
import { buttonClasses } from "@/components/ui/Button";
import { homeAssets } from "@/lib/assets";
import { cn } from "@/lib/cn";
import { IntentLink as Link } from "@/components/ui/IntentLink";

/*
 * Figma CTA 317:1291 — two 622/624 x 488 cards, radius 24, faint border, promo shadow,
 * "Shop Now" tab flush bottom-right (radius 4/4/24/4).
 * The copy that Figma bakes into the artwork is live HTML here (the artwork files have it
 * removed), so it stays sharp, readable and indexable at every size. Layout follows the card's
 * own width (container query, `promo-*` rules in globals.css): from 34rem the copy sits on the
 * artwork at its Figma position and scales with the card; narrower cards stack it below.
 */
export function PromoBanners() {
  return (
    <section aria-label="Promotions" className="container-page grid gap-8 md:grid-cols-2">
      <PromoCard
        image={homeAssets.ctaLeft}
        alt="White serum dropper bottle with palm leaves"
        href="/category/skin-care"
        title="White & Firm Face"
        variant="firm"
      >
        <h3 className="promo-title">
          <span className="promo-title-a">White</span> <span className="promo-amp">&amp;</span>{" "}
          <span className="promo-title-b">Firm Face</span>
        </h3>
        <ul className="promo-list">
          {["Skin care", "Smooth skin", "Moist skin", "Concentrated extract"].map((item) => (
            <li key={item}>
              <svg aria-hidden="true" viewBox="0 0 16 16" className="promo-check">
                <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1" />
                <path
                  d="M4.5 8.2 7 10.6l4.8-5.2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </PromoCard>
      <PromoCard
        image={homeAssets.ctaRight}
        alt="Tender collection milk cream, lotion and cream jar with pearls"
        href="/shop"
        title="Tender & Soft"
        variant="tender"
      >
        <h3 className="promo-title">Tender &amp; Soft</h3>
        <p className="promo-subtitle">Original cosmetics</p>
        <p className="promo-body">
          Moisturizing, whitening, softening, wake up skin elasticity and vitality
        </p>
      </PromoCard>
    </section>
  );
}

function PromoCard({
  image,
  alt,
  href,
  title,
  variant,
  children,
}: {
  image: { src: string; width: number; height: number };
  alt: string;
  href: string;
  title: string;
  variant: "firm" | "tender";
  children: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "promo-card group relative flex flex-col overflow-hidden rounded-2xl border border-border-faint bg-surface shadow-promo",
        `promo-card--${variant}`,
      )}
    >
      <div className="promo-art relative aspect-[622/488] overflow-hidden">
        <AssetImage
          src={image.src}
          alt={alt}
          fill
          sizes="(min-width: 90rem) 624px, (min-width: 48rem) 50vw, 100vw"
          className="object-cover transition-transform duration-(--duration-base) group-hover:scale-[1.02]"
        />
      </div>
      <div className="promo-copy">{children}</div>
      {/* One link covers the card; the visible tab is its label. */}
      <Link
        href={href}
        className="absolute inset-0 z-10 rounded-2xl focus-ring"
        aria-label={`Shop Now: ${title}`}
      />
      <span
        aria-hidden="true"
        className={cn(
          buttonClasses({ size: "lg" }),
          "promo-cta group-hover:bg-primary-hover-strong",
        )}
      >
        Shop Now
      </span>
    </article>
  );
}
