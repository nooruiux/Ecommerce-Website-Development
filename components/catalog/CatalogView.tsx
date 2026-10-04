import { ProductCard } from "@/components/ui/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumb, type Crumb } from "@/components/ui/Breadcrumb";
import { JsonLd, breadcrumbLd } from "@/lib/seo";
import { applyFilters, hrefFor, paginate } from "@/lib/catalog/query";
import type { CatalogFilters } from "@/types";
import { FilterPanel } from "./FilterPanel";
import { Pagination } from "./Pagination";
import { SortSelect } from "./SortSelect";

export function CatalogView({
  title,
  description,
  filters,
  basePath,
  crumbs,
  fixedCategory = false,
}: {
  title: string;
  description?: string;
  filters: CatalogFilters;
  basePath: string;
  crumbs: Crumb[];
  fixedCategory?: boolean;
}) {
  const results = applyFilters(filters);
  const { items, page, pageCount } = paginate(results, filters.page);
  const clearHref = hrefFor(basePath, { sort: filters.sort, q: filters.q }, fixedCategory);

  return (
    <div className="container-page flex flex-col gap-8 py-8 xl:py-12">
      <JsonLd data={breadcrumbLd(crumbs)} />
      <Breadcrumb items={crumbs} />
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-h4 font-semibold text-text-heading xl:text-h2">
          {filters.q ? `Search results for “${filters.q}”` : title}
        </h1>
        {description && <p className="max-w-160 text-body-lg text-text-muted">{description}</p>}
      </header>

      <div className="grid gap-8 lg:grid-cols-[16rem_1fr] xl:grid-cols-[18rem_1fr]">
        <FilterPanel filters={filters} basePath={basePath} fixedCategory={fixedCategory} />

        <section aria-labelledby="results-heading" className="flex min-w-0 flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="results-heading" className="text-body-lg text-text-muted" aria-live="polite">
              {results.length} {results.length === 1 ? "product" : "products"}
            </h2>
            <SortSelect filters={filters} basePath={basePath} omitCategory={fixedCategory} />
          </div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-sm border border-border px-6 py-16 text-center">
              <p className="font-heading text-h5 font-semibold">No products match these filters</p>
              <p className="text-body-lg text-text-muted">
                Try removing a filter or widening the price range.
              </p>
              <ButtonLink href={clearHref} variant="solid">
                Clear filters
              </ButtonLink>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 xl:grid-cols-4">
              {items.map((p, i) => (
                <li key={p.id} className="flex min-w-0">
                  {/* First row on mobile holds the LCP image. */}
                  <ProductCard product={p} priority={i < 2} />
                </li>
              ))}
            </ul>
          )}

          <Pagination
            page={page}
            pageCount={pageCount}
            hrefForPage={(n) => hrefFor(basePath, { ...filters, page: n }, fixedCategory)}
          />
        </section>
      </div>
    </div>
  );
}
