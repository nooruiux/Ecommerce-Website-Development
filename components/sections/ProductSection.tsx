import { ProductCard } from "@/components/ui/ProductCard";
import type { Product } from "@/types";
import { SectionHeader } from "./SectionHeader";

// Featured 317:514 / New Arrivals 317:648 / Best Selling 317:906 — H3 header, 24px gap, 6x200 grid (gap 16 / row gap 24).
export function ProductSection({
  id,
  title,
  href,
  products,
}: {
  id: string;
  title: string;
  href: string;
  products: Product[];
}) {
  return (
    <section aria-labelledby={id} className="container-page flex flex-col gap-6">
      <SectionHeader id={id} title={title} href={href} />
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {products.map((p) => (
          <li key={p.id} className="flex min-w-0">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
