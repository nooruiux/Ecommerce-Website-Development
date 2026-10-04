import { IntentLink as Link } from "@/components/ui/IntentLink";
import { cn } from "@/lib/cn";

export type Crumb = { label: string; href?: string };

// Derived (not in Figma): Body M, muted links, current page in text color.
export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-body-md", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="rounded-xs text-text-muted focus-ring hover:text-primary-hover-strong"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="text-text">
                  {item.label}
                </span>
              )}
              {!last && (
                <span aria-hidden="true" className="text-text-placeholder">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
