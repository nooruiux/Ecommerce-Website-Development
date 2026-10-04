import { IntentLink as Link } from "@/components/ui/IntentLink";
import { AssetImage } from "@/components/ui/AssetImage";
import { concerns } from "@/data/catalog";
import { SectionHeader } from "./SectionHeader";

// Figma 317:490 — header (H2 + divider + View All), gap 64, six 192px circles (gap 24), H6 labels.
export function TopCategories() {
  return (
    <section
      aria-labelledby="top-categories"
      className="container-page flex flex-col gap-10 xl:gap-16"
    >
      <SectionHeader id="top-categories" title="Top Categories" size="h2" divider href="/shop" />
      <ul className="grid grid-cols-3 gap-x-4 gap-y-8 md:grid-cols-6 md:gap-6">
        {concerns.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/category/${c.category}?concern=${c.slug}`}
              className="group flex flex-col items-center gap-4 rounded-sm text-center focus-ring"
            >
              <span className="relative block aspect-square w-full max-w-48 overflow-hidden rounded-full">
                <AssetImage
                  src={c.image}
                  alt=""
                  fill
                  sizes="(min-width: 90rem) 192px, (min-width: 48rem) 15vw, 30vw"
                  className="object-cover transition-transform duration-(--duration-base) group-hover:scale-105"
                  fallbackClassName="rounded-full"
                />
              </span>
              <span className="font-heading text-body-lg font-medium text-text group-hover:text-primary-hover-strong md:text-h6">
                {c.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
