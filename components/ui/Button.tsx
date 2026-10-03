import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Spinner } from "./Spinner";

export type ButtonVariant = "solid" | "tint" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

type StyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

// Figma: dark "Get Started" (2:199), light tint variant, "View All" outline (317:517), tertiary.
const variants: Record<ButtonVariant, string> = {
  solid: "bg-accent text-on-accent font-label hover:bg-primary-hover",
  tint: "bg-primary-light text-black font-label hover:bg-primary-hover hover:text-on-accent",
  outline:
    "border border-accent bg-surface text-black font-body hover:border-primary-hover hover:text-primary-hover",
  ghost: "bg-transparent text-accent font-label hover:text-primary-hover",
};

// sm = View All (40), md = Submit/Search (48), lg = Get Started (56)
const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-6 text-body-md font-semibold leading-none",
  md: "h-12 px-8 text-label-lg font-semibold leading-none",
  lg: "h-14 px-6 text-label-lg font-semibold leading-none",
};

export function buttonClasses({ variant = "solid", size = "md", fullWidth }: StyleProps = {}) {
  return cn(
    "focus-ring inline-flex min-w-touch items-center justify-center gap-2 whitespace-nowrap rounded-sm",
    "transition-colors duration-(--duration-fast) ease-(--ease-standard)",
    "disabled:pointer-events-none disabled:opacity-(--opacity-disabled) aria-disabled:pointer-events-none aria-disabled:opacity-(--opacity-disabled)",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
  );
}

type ButtonProps = ComponentProps<"button"> &
  StyleProps & {
    loading?: boolean;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
  };

export function Button({
  variant,
  size,
  fullWidth,
  loading = false,
  iconLeft,
  iconRight,
  className,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(buttonClasses({ variant, size, fullWidth }), className)}
      {...props}
    >
      {loading ? <Spinner /> : iconLeft}
      {children}
      {!loading && iconRight}
    </button>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> &
  StyleProps & { iconLeft?: ReactNode; iconRight?: ReactNode };

export function ButtonLink({
  variant,
  size,
  fullWidth,
  iconLeft,
  iconRight,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(buttonClasses({ variant, size, fullWidth }), className)} {...props}>
      {iconLeft}
      {children}
      {iconRight}
    </Link>
  );
}
