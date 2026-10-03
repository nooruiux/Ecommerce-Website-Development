"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import type { NavLink } from "@/data/navigation";

// Derived menu panel for the Figma chevron triggers (no open state is designed).
export function Dropdown({
  label,
  links,
  trigger,
  align = "left",
  triggerClassName,
}: {
  label: string;
  links: NavLink[];
  trigger?: ReactNode;
  align?: "left" | "right";
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={root}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => !root.current?.contains(e.relatedTarget as Node) && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex min-h-touch items-center gap-2 rounded-xs focus-ring hover:text-primary-hover",
          triggerClassName,
        )}
      >
        {trigger ?? label}
        <Icon
          name="chevron-down"
          size={16}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>
      <ul
        id={id}
        hidden={!open}
        className={cn(
          "absolute top-full z-40 min-w-56 rounded-sm border border-border bg-surface py-2 shadow-modal",
          align === "right" ? "right-0" : "left-0",
        )}
      >
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex min-h-touch items-center px-4 text-body-md text-text focus-ring hover:bg-primary-light"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
