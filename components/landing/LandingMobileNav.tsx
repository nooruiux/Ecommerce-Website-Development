"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/LazyOverlays";
import { MenuIcon } from "@/components/ui/glyphs";
import { landingNav, services } from "@/data/consultation";

export function LandingMobileNav() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const links = [
    ...landingNav.slice(0, 2),
    ...services.map((s) => ({ label: `${s.title} consultation`, href: `/consultation#${s.slug}` })),
    ...landingNav.slice(2),
    { label: "Login", href: "/login" },
  ];
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="inline-flex size-touch items-center justify-center rounded-sm focus-ring hover:text-primary-hover"
      >
        <MenuIcon />
      </button>
      <Drawer
        open={open}
        onClose={close}
        side="right"
        title="Menu"
        footer={
          <ButtonLink href="/register" fullWidth onClick={close}>
            Get Started
          </ButtonLink>
        }
      >
        <nav aria-label="Consultation mobile">
          <ul className="flex flex-col py-2">
            {links.map((l) => (
              <li key={l.href + l.label} className="border-b border-line">
                <Link
                  href={l.href}
                  onClick={close}
                  className="flex min-h-touch items-center px-4 font-heading text-body-lg text-text focus-ring hover:text-primary-hover"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Drawer>
    </>
  );
}
