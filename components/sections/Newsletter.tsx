import { AssetImage } from "@/components/ui/AssetImage";
import { homeAssets } from "@/lib/assets";
import { NewsletterForm } from "./NewsletterForm";

/*
 * Figma Bottom CTA 317:1456 — 1440x248 photo band, copy + pill form centred (gap 216),
 * decorative cart (110x70 @36,89) and hand (107x72 @1271,156) illustrations.
 */
export function Newsletter() {
  return (
    <section
      aria-labelledby="newsletter-title"
      className="relative isolate overflow-hidden bg-gray-90 xl:h-62"
    >
      <AssetImage
        src={homeAssets.newsletter.src}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-bottom"
        fallbackClassName="-z-10 bg-gray-90"
      />
      <AssetImage
        {...homeAssets.newsletterCart}
        alt=""
        className="absolute top-22 left-9 hidden xl:block"
        fallbackClassName="bg-transparent"
      />
      <AssetImage
        {...homeAssets.newsletterHand}
        alt=""
        className="absolute top-39 right-15.5 hidden xl:block"
        fallbackClassName="bg-transparent"
      />
      <div className="container-page flex h-full flex-col items-center justify-center gap-8 py-12 xl:flex-row xl:gap-54 xl:py-0">
        <div className="flex flex-col items-center gap-2 text-center">
          <h2
            id="newsletter-title"
            className="font-heading text-h5 font-semibold text-white md:text-h4 xl:text-h3"
          >
            Subscribe our Newsletter
          </h2>
          <p className="font-heading text-lead text-white-soft">
            And receive $25 coupon for first shopping
          </p>
        </div>
        <NewsletterForm />
      </div>
    </section>
  );
}
