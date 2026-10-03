import { AssetImage } from "@/components/ui/AssetImage";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { mainNav } from "@/data/navigation";
import { brandAssets } from "@/lib/assets";
import { Dropdown } from "./Dropdown";
import { HeaderCounters } from "./HeaderCounters";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { MobileSearch } from "./MobileSearch";
import { SearchForm } from "./SearchForm";

/*
 * Figma Header 317:339
 *   Navbar 317:340 — 96px white, logo 284x61, search 548x48, utilities (gap 20)
 *   Small Navbar 317:391 — 48px primary-light, category links (gap 32), Get Consultation
 * Below lg the header collapses to: menu, logo, search toggle, cart (derived).
 */
export function Header() {
  return (
    <header className="relative z-30 bg-surface">
      {/* Mobile / tablet bar */}
      <div className="relative flex h-16 items-center gap-1 border-b border-line px-2 lg:hidden">
        <MobileNav />
        <Logo width={150} className="mx-auto" />
        <MobileSearch />
        <HeaderCounters compact />
      </div>

      {/* Desktop navbar */}
      <div className="container-page hidden h-header items-center lg:flex">
        <div className="flex w-full items-center justify-between gap-6">
          <Logo className="w-56 xl:w-auto" />
          <SearchForm className="max-w-137" />
          <div className="flex items-center gap-2 xl:gap-5">
            <Dropdown
              label="Language"
              trigger={
                <span className="inline-flex items-center gap-1 text-body-lg text-text">
                  <AssetImage {...brandAssets.flagUs} alt="" />
                  <span aria-hidden="true">En</span>
                  <span className="sr-only">Language: English</span>
                </span>
              }
              links={[{ label: "English", href: "/" }]}
            />
            <HeaderCounters />
            <Dropdown
              label="Account"
              align="right"
              trigger={
                <span className="inline-flex items-center gap-1 text-body-md text-text-strong">
                  <Icon name="account" size={28} />
                  Account
                </span>
              }
              links={[
                { label: "Login", href: "/login" },
                { label: "Register", href: "/register" },
                { label: "Wishlist", href: "/wishlist" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Desktop category bar */}
      <div className="hidden bg-primary-light lg:block">
        <div className="container-page flex h-12 items-center justify-between">
          <nav aria-label="Categories">
            <ul className="flex items-center gap-4 xl:gap-8">
              {mainNav.map((group) => (
                <li key={group.label}>
                  <Dropdown
                    label={group.label}
                    links={group.links}
                    triggerClassName="text-body-lg text-text"
                  />
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink href="/consultation" size="md" className="px-5 font-body text-body-lg">
            Get Consultation
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
