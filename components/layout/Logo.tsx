import { IntentLink as Link } from "@/components/ui/IntentLink";
import { AssetImage } from "@/components/ui/AssetImage";
import { brandAssets } from "@/lib/assets";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

// Figma 317:344 — 283.8 x 61 frame, image fills 72.89% of its height.
export function Logo({
  className,
  width = 284,
  variant = "store",
}: {
  className?: string;
  width?: number;
  variant?: "store" | "landing";
}) {
  const {
    src,
    width: w,
    height: h,
  } = variant === "landing" ? brandAssets.logoLanding : brandAssets.logo;
  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 rounded-xs focus-ring", className)}
      aria-label={`${site.name} home`}
    >
      <AssetImage
        src={src}
        alt={site.name}
        width={width}
        height={Math.round((width * h) / w)}
        loading="eager"
        className={variant === "landing" ? "object-cover" : undefined}
      />
    </Link>
  );
}
