"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

// WAI-ARIA tabs: arrow keys / Home / End move focus, automatic activation.
export function Tabs({ tabs }: { tabs: { id: string; label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();

  const onKey = (e: KeyboardEvent) => {
    const last = tabs.length - 1;
    const next =
      e.key === "ArrowRight"
        ? active === last
          ? 0
          : active + 1
        : e.key === "ArrowLeft"
          ? active === 0
            ? last
            : active - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="flex flex-col gap-6">
      <div
        role="tablist"
        aria-label="Product information"
        className="flex gap-2 overflow-x-auto border-b border-line"
        onKeyDown={onKey}
      >
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={`${uid}-tab-${t.id}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`${uid}-panel-${t.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              "-mb-px min-h-touch shrink-0 border-b-2 px-4 font-heading text-h6 font-medium focus-ring transition-colors",
              i === active
                ? "border-accent text-text"
                : "border-transparent text-text-muted hover:text-primary-hover-strong",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.id}
          id={`${uid}-panel-${t.id}`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${t.id}`}
          hidden={i !== active}
          tabIndex={0}
          className="rounded-xs focus-ring"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
