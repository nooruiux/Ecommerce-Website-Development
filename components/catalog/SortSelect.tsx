"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Select } from "@/components/ui/Field";
import { hrefFor, sortOptions } from "@/lib/catalog/query";
import type { CatalogFilters } from "@/types";

export function SortSelect({
  filters,
  basePath,
  omitCategory,
}: {
  filters: CatalogFilters;
  basePath: string;
  omitCategory?: boolean;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <Select
      label="Sort by"
      hideLabel
      value={filters.sort}
      aria-busy={pending || undefined}
      wrapperClassName="max-w-56"
      onChange={(e) =>
        start(() =>
          router.push(
            hrefFor(
              basePath,
              { ...filters, sort: e.target.value as CatalogFilters["sort"], page: 1 },
              omitCategory,
            ),
            {
              scroll: false,
            },
          ),
        )
      }
    >
      {sortOptions.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </Select>
  );
}
