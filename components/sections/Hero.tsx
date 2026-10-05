import { AssetImage } from "@/components/ui/AssetImage";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { homeAssets } from "@/lib/assets";
import { HeroBadge } from "./HeroBadge";

/*
 * Figma hero 317:419 (spec: docs/specs/hero.md). 1440 x 532 sage panel laid out in Figma px
 * (the hero-* rules in globals.css): photo 589 x 532 at 0,0 above the vertical "Skin Care"
 * watermark, discount badge on top, copy block at 796,135, slider dots at 710,484.
 * 768–1439 scales the same frame proportionally (the photo is 40.9% of the width); from 1440 up
 * it stays at the exact Figma size, centred on the full-bleed sage panel (same axis as the
 * page container). Mobile shows the
 * left 686 px of the frame (photo, watermark strip, badge) with the copy stacked below.
 * Only one slide is designed: the three dots are a static indicator.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-sage">
      <div className="hero-frame">
        <div className="hero-stage">
          <p aria-hidden="true" className="hero-watermark">
            Skin Care
          </p>
          <div className="hero-photo">
            <AssetImage
              src={homeAssets.hero.src}
              alt="Skin care bottles and jars arranged on a stone tray"
              fill
              preload
              fetchPriority="high"
              loading="eager"
              sizes="(min-width: 90rem) 589px, (min-width: 48rem) 41vw, 86vw"
              className="object-cover"
              fallbackClassName="bg-gray-30"
            />
          </div>
          <HeroBadge className="hero-badge" />
        </div>

        <div className="hero-copy max-md:flex max-md:flex-col max-md:gap-6 max-md:px-4 max-md:pt-8 max-md:pb-6">
          <p className="hero-eyebrow flex items-center tracking-figma text-text-subtle max-md:gap-4 max-md:text-body-lg">
            <span aria-hidden="true" className="hero-rule h-px bg-hero-rule max-md:w-12" />
            <span>New Skin Care Products</span>
          </p>
          <h1
            id="hero-title"
            className="hero-title font-heading font-bold tracking-figma text-text max-md:text-h4"
          >
            Shop Your Best
            <br />
            Skin Care Products
          </h1>
          <ButtonLink
            href="/shop"
            size="lg"
            className="hero-cta self-start max-md:w-full"
            iconRight={<Icon name="arrow-right" />}
          >
            Explore Products
          </ButtonLink>
        </div>
        <div
          aria-hidden="true"
          className="hero-dots flex items-center max-md:gap-2 max-md:px-4 max-md:pb-10"
        >
          <span className="hero-dot-active">
            <span className="hero-dot" />
          </span>
          <span className="hero-dot" />
          <span className="hero-dot" />
        </div>
      </div>
    </section>
  );
}
