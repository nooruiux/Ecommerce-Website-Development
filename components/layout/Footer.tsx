import Link from "next/link";
import { AssetImage } from "@/components/ui/AssetImage";
import { Icon } from "@/components/ui/Icon";
import { footerCompany, footerService, socialLinks } from "@/data/navigation";
import { brandAssets } from "@/lib/assets";
import { site } from "@/lib/site";

/*
 * Figma Footer 317:1507 — white-soft, 4 columns (gap 162 at 1440):
 * brand (logo 174x37, blurb 267px, socials), Company, Customer service, Download Our App.
 * Divider + copyright at the bottom.
 */
const heading = "text-body-xl font-semibold whitespace-nowrap text-text";
const link =
  "focus-ring rounded-xs text-body-lg whitespace-nowrap text-text-muted hover:text-primary-hover";

export function Footer() {
  return (
    <footer className="bg-white-soft pt-12">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:flex xl:gap-40.5">
          <div className="flex shrink-0 flex-col gap-7">
            <div className="flex flex-col gap-4.5">
              <Link
                href="/"
                className="self-start rounded-xs focus-ring"
                aria-label={`${site.name} home`}
              >
                <AssetImage src={brandAssets.logo.src} alt={site.name} width={174} height={37} />
              </Link>
              <p className="max-w-67 text-body-lg text-text-footer xl:w-67">
                Lorem ipsum dolor sit amet Volutpat placerat mauris mauris nunc sed. Tortor arcu
                vestibulum vel in etiam
              </p>
            </div>
            <ul className="flex items-center gap-2" aria-label="Social media">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex size-touch items-center justify-center rounded-full text-text focus-ring hover:text-primary-hover"
                  >
                    <Icon name={s.icon} size={28} className="rounded-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-company" className="flex shrink-0 flex-col gap-6">
            <h2 id="footer-company" className={heading}>
              Company
            </h2>
            <ul className="flex flex-col gap-4">
              {footerCompany.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-service" className="flex shrink-0 flex-col gap-6">
            <h2 id="footer-service" className={heading}>
              Customer service
            </h2>
            <ul className="flex flex-col gap-4">
              {footerService.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 flex-col gap-5">
            <h2 className={heading}>Download Our App</h2>
            <div className="flex flex-col gap-4">
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start rounded-sm focus-ring"
              >
                <AssetImage
                  {...brandAssets.appStore}
                  alt="Download on the App Store"
                  className="rounded-sm"
                />
              </a>
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start rounded-sm focus-ring"
              >
                <AssetImage
                  {...brandAssets.googlePlay}
                  alt="Get it on Google Play"
                  className="rounded-sm"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center border-t border-line pt-4 pb-3.75">
          <p className="text-center text-body-lg text-text-strong">
            Copyright ©{site.copyrightYear} {site.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
