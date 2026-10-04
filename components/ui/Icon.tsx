import Image from "next/image";
import { hasAsset } from "@/lib/assets";
import { cn } from "@/lib/cn";

// Figma icon exports live in /public/icons/<name>.svg.
export type IconName =
  | "chevron-down"
  | "compare"
  | "heart"
  | "cart"
  | "account"
  | "arrow-right"
  | "plus-circle"
  | "star"
  | "calendar"
  | "check"
  | "megaphone"
  | "play-circle"
  | "play"
  | "check-square"
  | "sparkle"
  | "consult-skin"
  | "consult-hair"
  | "consult-feeding"
  | "step-survey"
  | "step-signup"
  | "step-appointment"
  | "arrow-left-circle"
  | "arrow-right-circle"
  | "instagram"
  | "facebook"
  | "twitter"
  | "linkedin";

export function Icon({
  name,
  size = 24,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const src = `/icons/${name}.svg`;
  if (hasAsset(src)) {
    return (
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        aria-hidden="true"
        className={cn("shrink-0", className)}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      data-missing-asset={src}
      className={cn("inline-block shrink-0 rounded-xs bg-current opacity-20", className)}
      style={{ width: size, height: size }}
    />
  );
}
