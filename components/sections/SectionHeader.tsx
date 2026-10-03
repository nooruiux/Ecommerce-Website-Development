import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/*
 * "Top Categories" (317:491): H2 48/56 + divider line + View All.
 * Product sections (317:515): H3 40/48 + View All.
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
        className={cn(
          "shrink-0 font-heading font-semibold text-text-heading",
          size === "h2" ? "text-h4 md:text-h3 xl:text-h2" : "text-h5 md:text-h4 xl:text-h3",
        )}
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
