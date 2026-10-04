"use client";

import { useState } from "react";
import { SearchIcon, CloseIcon } from "@/components/ui/glyphs";
import { SearchForm } from "./SearchForm";

export function MobileSearch() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close search" : "Open search"}
        aria-expanded={open}
        aria-controls="mobile-search"
        className="inline-flex size-touch items-center justify-center rounded-sm focus-ring hover:text-primary-hover-strong"
      >
        {open ? <CloseIcon /> : <SearchIcon />}
      </button>
      <div
        id="mobile-search"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-surface px-4 py-3 shadow-card"
      >
        <SearchForm id="mobile-search-form" />
      </div>
    </>
  );
}
