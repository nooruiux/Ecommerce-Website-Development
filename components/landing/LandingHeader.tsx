import { IntentLink as Link } from "@/components/ui/IntentLink";
import { Dropdown } from "@/components/layout/Dropdown";
import { Logo } from "@/components/layout/Logo";
import { AssetImage } from "@/components/ui/AssetImage";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { landingNav, services } from "@/data/consultation";
import { brandAssets } from "@/lib/assets";
import { LandingMobileNav } from "./LandingMobileNav";

const navLink =
  "focus-ring rounded-xs font-heading text-body-lg leading-none text-text hover:text-primary-hover-strong";

/*
 * Figma Landing header 182:8588
 *   Announcement bar 143:947 — 64px primary-light, megaphone + 18/30 copy + Learn More, language switch
 *   Navbar 146:1064 — 96px white, logo 300x47, links (gap 32), Login + Get Started; centred row gap 132
 */
export function LandingHeader() {
  return (
    <header className="relative z-30 bg-surface">
      <div className="bg-primary-light">
        <div className="container-page flex min-h-16 items-center justify-between gap-4 py-2">
          <p className="flex flex-wrap items-center gap-x-2 text-body-md text-line-dark md:text-body-xl">
            <Icon name="megaphone" size={24} />
            Announcing Our Consultants to help our Clients 10% Discount
            <Link
              href="#consultants"
              className="rounded-xs font-semibold underline underline-offset-4 focus-ring hover:decoration-2"
            >
              Learn More
            </Link>
          </p>
          <div className="hidden items-center gap-6 font-label text-body-lg md:flex">
            <span className="inline-flex items-center gap-2">
              <AssetImage {...brandAssets.flagUs} alt="" />
              English
            </span>
            <span lang="ar" dir="rtl">
              العربية
            </span>
          </div>
        </div>
      </div>

      <div className="relative after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-line">
        <div className="container-page flex h-16 items-center justify-between gap-4 xl:h-24 xl:justify-center xl:gap-33">
          <Logo variant="landing" width={300} className="w-40 md:w-56 xl:w-auto" />
          <nav aria-label="Consultation" className="hidden xl:block">
            <ul className="flex items-center gap-8">
              {landingNav.slice(0, 2).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={navLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Dropdown
                  label="Services"
                  triggerClassName="font-label text-body-lg text-text"
                  links={services.map((s) => ({
                    label: `${s.title} consultation`,
                    href: `/consultation#${s.slug}`,
                  }))}
                />
              </li>
              {landingNav.slice(2).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={navLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden items-center gap-6 xl:flex">
            <Link href="/login" className={navLink}>
              Login
            </Link>
            <ButtonLink href="/register" className="px-5">
              Get Started
            </ButtonLink>
          </div>
          <div className="xl:hidden">
            <LandingMobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
