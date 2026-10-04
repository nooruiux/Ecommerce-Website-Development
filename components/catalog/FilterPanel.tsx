"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useOptimistic, useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Checkbox, Radio } from "@/components/ui/Choice";
import { Drawer } from "@/components/ui/LazyOverlays";
import { brands } from "@/data/brands";
import { categories, concerns } from "@/data/catalog";
import { activeFilterCount, applyFilters, hrefFor, ratingOptions } from "@/lib/catalog/query";
import type { CatalogFilters } from "@/types";

type Props = { filters: CatalogFilters; basePath: string; fixedCategory?: boolean };

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-1 border-b border-line pb-5">
      <legend className="mb-2 font-heading text-h6 font-semibold text-text">{title}</legend>
      {children}
    </fieldset>
  );
}

function Fields({
  value,
  onChange,
  fixedCategory,
  idPrefix,
}: {
  value: CatalogFilters;
  onChange: (next: CatalogFilters) => void;
  fixedCategory?: boolean;
  idPrefix: string;
}) {
  const set = (patch: Partial<CatalogFilters>) => onChange({ ...value, ...patch, page: 1 });
  const concernList = concerns.filter((c) => !value.category || c.category === value.category);
  return (
    <div className="flex flex-col gap-5">
      {!fixedCategory && (
        <Group title="Category">
          <Radio
            name={`${idPrefix}-category`}
            label="All categories"
            checked={!value.category}
            onChange={() => set({ category: undefined, concern: undefined })}
          />
          {categories.map((c) => (
            <Radio
              key={c.slug}
              name={`${idPrefix}-category`}
              label={c.name}
              checked={value.category === c.slug}
              onChange={() => set({ category: c.slug, concern: undefined })}
            />
          ))}
        </Group>
      )}
      {concernList.length > 0 && (
        <Group title="Concern">
          {concernList.map((c) => (
            <Checkbox
              key={c.slug}
              label={c.name}
              checked={value.concern === c.slug}
              onChange={(e) => set({ concern: e.target.checked ? c.slug : undefined })}
            />
          ))}
        </Group>
      )}
      <Group title="Price">
        <PriceInputs
          key={`${value.min}-${value.max}`}
          min={value.min}
          max={value.max}
          onCommit={(min, max) => set({ min, max })}
        />
      </Group>
      <Group title="Rating">
        <Radio
          name={`${idPrefix}-rating`}
          label="Any rating"
          checked={value.rating === undefined}
          onChange={() => set({ rating: undefined })}
        />
        {ratingOptions.map((r) => (
          <Radio
            key={r}
            name={`${idPrefix}-rating`}
            label={`${r} ★ & up`}
            checked={value.rating === r}
            onChange={() => set({ rating: r })}
          />
        ))}
      </Group>
      <Group title="Brand">
        <div className="grid grid-cols-2 gap-x-2">
          {brands.map((b) => (
            <Checkbox
              key={b.slug}
              label={b.name}
              checked={value.brand === b.slug}
              onChange={(e) => set({ brand: e.target.checked ? b.slug : undefined })}
            />
          ))}
        </div>
      </Group>
      <Group title="Availability">
        <Checkbox
          label="In stock only"
          checked={!!value.inStock}
          onChange={(e) => set({ inStock: e.target.checked || undefined })}
        />
      </Group>
    </div>
  );
}

// Commits on blur / Enter so typing does not trigger a navigation per keystroke.
function PriceInputs({
  min,
  max,
  onCommit,
}: {
  min?: number;
  max?: number;
  onCommit: (min?: number, max?: number) => void;
}) {
  const [lo, setLo] = useState(min?.toString() ?? "");
  const [hi, setHi] = useState(max?.toString() ?? "");
  const parse = (v: string) => (v === "" || Number.isNaN(Number(v)) ? undefined : Number(v));
  const commit = () => {
    if (parse(lo) !== min || parse(hi) !== max) onCommit(parse(lo), parse(hi));
  };
  const field =
    "h-touch w-full rounded-sm border border-border-field px-3 text-body-md text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-strong";
  return (
    <div className="flex items-center gap-2">
      {[
        { label: "Min ($)", v: lo, set: setLo },
        { label: "Max ($)", v: hi, set: setHi },
      ].map((f) => (
        <label key={f.label} className="flex flex-1 flex-col gap-1 text-body-sm text-text-muted">
          {f.label}
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step="0.5"
            value={f.v}
            onChange={(e) => f.set(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => e.key === "Enter" && commit()}
            className={field}
          />
        </label>
      ))}
    </div>
  );
}

// Desktop: changes apply immediately (URL updates). Mobile: bottom sheet with pending state + "Apply (N results)".
export function FilterPanel({ filters, basePath, fixedCategory }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  // Controls reflect a change immediately; the URL (source of truth) catches up.
  const [current, setCurrent] = useOptimistic(filters);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(filters);
  const draftCount = useMemo(() => applyFilters(draft).length, [draft]);
  const active = activeFilterCount(filters, fixedCategory);
  const go = useCallback(
    (next: CatalogFilters) =>
      start(() => {
        setCurrent(next);
        router.push(hrefFor(basePath, next, fixedCategory), { scroll: false });
      }),
    [basePath, fixedCategory, router, setCurrent],
  );
  const cleared: CatalogFilters = {
    sort: filters.sort,
    page: 1,
    category: fixedCategory ? filters.category : undefined,
    q: filters.q,
  };

  return (
    <>
      <aside aria-label="Filters" className="hidden lg:block" aria-busy={pending || undefined}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-h5 font-semibold">Filters</h2>
          {active > 0 && (
            <button
              type="button"
              onClick={() => go(cleared)}
              className="min-h-touch rounded-xs text-body-md text-text-muted underline focus-ring hover:text-primary-hover"
            >
              Clear all
            </button>
          )}
        </div>
        <Fields value={current} onChange={go} fixedCategory={fixedCategory} idPrefix="desktop" />
      </aside>

      <div className="lg:hidden">
        <Button
          variant="outline"
          size="md"
          onClick={() => {
            setDraft(filters);
            setOpen(true);
          }}
          aria-haspopup="dialog"
        >
          Filters{active > 0 && ` (${active})`}
        </Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          side="bottom"
          title="Filters"
          footer={
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={() => setDraft(cleared)}>
                Clear
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  go(draft);
                }}
              >
                Apply ({draftCount} {draftCount === 1 ? "result" : "results"})
              </Button>
            </div>
          }
        >
          <div className="px-4 py-4">
            <Fields
              value={draft}
              onChange={setDraft}
              fixedCategory={fixedCategory}
              idPrefix="mobile"
            />
          </div>
        </Drawer>
      </div>
    </>
  );
}
