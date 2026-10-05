import { IntentLink as Link } from "@/components/ui/IntentLink";
import { AssetImage } from "@/components/ui/AssetImage";
import { brands } from "@/data/brands";

/*
 * Figma 317:645 (1441 x 306) — H3 title at x=80, then the brand grid measured from the
 * raster 317:647: 7 x 2 tiles, 1280 wide starting at x=76 (4px left of the gutter, as in
 * Figma), tiles 170.86 x 85 with a 14px gap, 1px #E2E5E9 border, 2px radius, white fill.
 * Each logo image fills the tile interior (spec: docs/specs/brands.md).
 * No "View All" button (not in Figma).
 * Below 1440 the 7-column grid scales proportionally (tile aspect kept); mobile uses 2 columns.
 */
export function PopularBrands() {
  return (
    <section
      aria-labelledby="popular-brands"
      className="container-page flex flex-col gap-6 xl:h-76.5 xl:gap-6.75"
    >
      <h2
        id="popular-brands"
        className="font-heading text-h5 font-semibold text-text md:text-h4 xl:h-12.75 xl:w-124.75 xl:text-h3"
      >
        Shop By Popular Brands
      </h2>
      <ul className="grid grid-cols-2 gap-3.5 md:grid-cols-7 xl:-ml-1 xl:w-320">
        {brands.map((b) => (
          <li key={b.slug} className="min-w-0">
            <Link
              href={b.href}
              className="relative block aspect-brand-tile rounded-xs border border-brand-tile-border bg-surface focus-ring transition-colors hover:border-accent xl:aspect-auto xl:h-21.25"
            >
              <AssetImage
                src={b.logo.src}
                alt={b.name}
                fill
                sizes="(min-width: 90rem) 169px, (min-width: 48rem) 13vw, 45vw"
                className="object-contain"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
