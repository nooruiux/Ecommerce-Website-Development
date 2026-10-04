"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

/*
 * Link without viewport prefetching (dozens of card / footer / menu links would compete with
 * fonts for bandwidth during load). Prefetches on intent instead: hover, focus or touch.
 */
export function IntentLink({
  href,
  onMouseEnter,
  onFocus,
  onTouchStart,
  ...props
}: ComponentProps<typeof Link>) {
  const router = useRouter();
  const prefetch = () => typeof href === "string" && href.startsWith("/") && router.prefetch(href);
  return (
    <Link
      href={href}
      prefetch={false}
      onMouseEnter={(e) => {
        prefetch();
        onMouseEnter?.(e);
      }}
      onFocus={(e) => {
        prefetch();
        onFocus?.(e);
      }}
      onTouchStart={(e) => {
        prefetch();
        onTouchStart?.(e);
      }}
      {...props}
    />
  );
}
