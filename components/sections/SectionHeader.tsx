import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/*
 * Section title (28/36, `text-section`) + optional divider line + View All.
 * `size` is kept for API compatibility; both variants now share the 28px section style.
 */
export function SectionHeader({
  title,
  id,
  href,
  size = "h3",
  divider = false,
  className,
}: {
  title: string;
  id: string;
  href?: string;
  size?: "h2" | "h3";
  divider?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", size === "h3" && "xl:min-h-12.75", className)}>
      <h2
        id={id}
        className={cn("shrink-0 font-heading text-section font-semibold text-text-heading")}
      >
        {title}
      </h2>
      {divider && <span aria-hidden="true" className="hidden h-px flex-1 bg-gray-40 md:block" />}
      {href && (
        <ButtonLink href={href} variant="outline" size="sm" className="ml-auto">
          View All<span className="sr-only"> {title}</span>
        </ButtonLink>
      )}
    </div>
  );
}
