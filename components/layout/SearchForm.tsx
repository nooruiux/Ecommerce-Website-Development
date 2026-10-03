import { Icon } from "@/components/ui/Icon";
import { categories } from "@/data/catalog";
import { cn } from "@/lib/cn";

// Figma 317:345 — 548x48, 1.2px accent border, category segment, Search button.
// Plain GET form: works without JavaScript.
export function SearchForm({ className, id = "site-search" }: { className?: string; id?: string }) {
  return (
    <form
      action="/shop"
      role="search"
      className={cn(
        "flex h-12 w-full items-stretch overflow-hidden rounded-sm border-[1.2px] border-accent",
        className,
      )}
    >
      <label htmlFor={`${id}-category`} className="sr-only">
        Category
      </label>
      <div className="relative hidden shrink-0 sm:block">
        <select
          id={`${id}-category`}
          name="category"
          defaultValue=""
          className="h-full appearance-none rounded-l-xs border-r-[1.4px] border-border-search bg-surface-muted py-2 pr-10 pl-4 text-body-lg text-text-subtle focus-ring"
        >
          <option value="">All Category</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          size={16}
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
        />
      </div>
      <label htmlFor={`${id}-q`} className="sr-only">
        Search products
      </label>
      <input
        id={`${id}-q`}
        name="q"
        type="search"
        placeholder="Search your products....."
        className="min-w-0 flex-1 bg-surface px-4 font-sans text-paragraph text-text placeholder:text-text-placeholder focus-visible:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 bg-accent px-6 text-body-lg leading-none font-semibold text-on-accent focus-ring transition-colors hover:bg-primary-hover"
      >
        Search
      </button>
    </form>
  );
}
