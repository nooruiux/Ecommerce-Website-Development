"use client";

import { IntentLink as Link } from "@/components/ui/IntentLink";
import { useCallback, useState } from "react";
import { Drawer } from "@/components/ui/LazyOverlays";
import { ButtonLink } from "@/components/ui/Button";
import { MenuIcon } from "@/components/ui/glyphs";
import { mainNav } from "@/data/navigation";

// Derived mobile menu: left drawer with focus trap, same nav groups as the Figma category bar.
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="inline-flex size-touch items-center justify-center rounded-sm focus-ring hover:text-primary-hover-strong"
      >
        <MenuIcon />
      </button>
      <Drawer
        open={open}
        onClose={close}
        side="left"
        title="Menu"
        footer={
          <ButtonLink href="/consultation" fullWidth onClick={close}>
            Get Consultation
          </ButtonLink>
        }
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col py-2">
            {mainNav.map((group) => (
              <li key={group.label} className="border-b border-line">
                <details className="group">
                  <summary className="flex min-h-touch cursor-pointer list-none items-center justify-between px-4 text-body-lg text-text focus-ring [&::-webkit-details-marker]:hidden">
                    {group.label}
                    <span aria-hidden="true" className="transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <ul className="pb-2">
                    {group.links.map((link) => (
                      <li key={link.href + link.label}>
                        <Link
                          href={link.href}
                          onClick={close}
                          className="flex min-h-touch items-center px-8 text-body-md text-text-muted focus-ring hover:text-primary-hover-strong"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
            {[
              { label: "Wishlist", href: "/wishlist" },
              { label: "Compare", href: "/compare" },
              { label: "Login", href: "/login" },
              { label: "Register", href: "/register" },
            ].map((link) => (
              <li key={link.href} className="border-b border-line">
                <Link
                  href={link.href}
                  onClick={close}
                  className="flex min-h-touch items-center px-4 text-body-lg text-text focus-ring hover:text-primary-hover-strong"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Drawer>
    </>
  );
}
