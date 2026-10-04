import Link from "next/link";
import { cn } from "@/lib/cn";

// Real links (crawlable, back/forward safe). Outline buttons from the Style Guide.
export function Pagination({
  page,
  pageCount,
  hrefForPage,
}: {
  page: number;
  pageCount: number;
  hrefForPage: (page: number) => string;
}) {
  if (pageCount <= 1) return null;
  const item =
    "focus-ring inline-flex size-touch items-center justify-center rounded-sm border text-body-md font-semibold transition-colors";
  return (
    <nav aria-label="Pagination" className="flex justify-center">
      <ul className="flex flex-wrap items-center gap-2">
        <li>
          {page > 1 ? (
            <Link
              href={hrefForPage(page - 1)}
              rel="prev"
              className={cn(item, "w-auto border-accent px-4 hover:text-primary-hover")}
            >
              Previous
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className={cn(item, "w-auto border-border px-4 opacity-(--opacity-disabled)")}
            >
              Previous
            </span>
          )}
        </li>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            <Link
              href={hrefForPage(n)}
              aria-current={n === page ? "page" : undefined}
              aria-label={`Page ${n}`}
              className={cn(
                item,
                n === page
                  ? "border-accent bg-accent text-on-accent"
                  : "border-border text-text hover:border-accent",
              )}
            >
              {n}
            </Link>
          </li>
        ))}
        <li>
          {page < pageCount ? (
            <Link
              href={hrefForPage(page + 1)}
              rel="next"
              className={cn(item, "w-auto border-accent px-4 hover:text-primary-hover")}
            >
              Next
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className={cn(item, "w-auto border-border px-4 opacity-(--opacity-disabled)")}
            >
              Next
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
