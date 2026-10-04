import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Icon } from "@/components/ui/Icon";
import { landingNav } from "@/data/consultation";
import { socialLinks } from "@/data/navigation";
import { site } from "@/lib/site";
import { LandingNewsletter } from "./LandingNewsletter";

/*
 * Figma Landing footer 143:766 — brand + newsletter (x 0), Company (x 554), Services (x 871),
 * Contact Us (x 1115); divider + centred copyright.
 */
const heading = "text-body-lg font-bold text-text";
const link =
  "focus-ring rounded-xs text-body-lg whitespace-nowrap text-text-subtle hover:text-primary-hover";

export function LandingFooter() {
  return (
    <footer className="bg-surface pt-14">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-[34.625rem_19.8125rem_15.25rem_1fr] xl:gap-0">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <Logo variant="landing" width={300} className="w-56 md:w-auto" />
              <p className="max-w-95.5 text-body-lg text-text-footer">
                Lorem ipsum dolor sit amet Volutpat placerat mauris mauris nunc sed. Tortor arcu
                vestibulum vel in etiam
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="font-heading text-h5 font-semibold text-text">
                Stay update to our Newsletter
              </h2>
              <LandingNewsletter />
            </div>
          </div>
          <nav aria-labelledby="lf-company" className="flex flex-col gap-6">
            <h2 id="lf-company" className={heading}>
              Company
            </h2>
            <ul className="flex flex-col gap-4">
              {landingNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-labelledby="lf-services" className="flex flex-col gap-6">
            <h2 id="lf-services" className={heading}>
              Services
            </h2>
            <ul className="flex flex-col gap-4">
              {["Services 1", "Services 2", "Services 3", "Services 4"].map((s, i) => (
                <li key={s}>
                  <Link
                    href={`/consultation#${["skin", "hair", "feeding", "how-it-works"][i]}`}
                    className={link}
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <h2 className={heading}>Contact Us</h2>
              <address className="flex flex-col gap-4 text-text-subtle not-italic">
                <a href={`mailto:${site.email}`} className={link}>
                  {site.email}
                </a>
                <a
                  href="tel:+1880262685467"
                  className="rounded-xs text-body-md focus-ring hover:text-primary-hover"
                >
                  +1880 26268 5467
                </a>
              </address>
            </div>
            <ul className="flex gap-4" aria-label="Social media">
              {socialLinks.slice(0, 3).map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex size-touch items-center justify-center rounded-full focus-ring hover:text-primary-hover"
                  >
                    <Icon name={s.icon} size={32} className="rounded-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 border-t border-line pt-6 pb-4.5 text-center">
          <p className="text-body-lg text-text-subtle">
            © {site.copyrightYear} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
