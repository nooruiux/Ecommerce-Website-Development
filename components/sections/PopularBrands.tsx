import Link from "next/link";
import { AssetImage } from "@/components/ui/AssetImage";
import { brands } from "@/data/brands";

/*
 * Figma 317:645 — H3 title, two rows of 7 bordered white tiles (~170x85, gap 14).
 * Placeholder wordmarks in grayscale until real brand logos are supplied (docs/qa-report.md).
 */
export function PopularBrands() {
  return (
    <section
      aria-labelledby="popular-brands"
      className="container-page flex flex-col gap-6 xl:gap-7"
    >
      <h2
        id="popular-brands"
        className="font-heading text-h5 font-semibold text-text md:text-h4 xl:text-h3"
      >
        Shop By Popular Brands
      </h2>
      <ul className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7">
        {brands.map((b) => (
          <li key={b.slug}>
            <Link
              href={`/shop?brand=${b.slug}`}
              className="flex h-21 items-center justify-center rounded-xs border border-border bg-surface focus-ring grayscale transition-[filter,border-color] hover:border-accent hover:grayscale-0"
            >
              {b.logo ? (
                <AssetImage
                  src={b.logo}
                  alt={b.name}
                  width={120}
                  height={40}
                  className="object-contain"
                />
              ) : (
                <span className="font-heading text-h6 font-semibold tracking-figma text-gray-60 uppercase">
                  {b.name}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
