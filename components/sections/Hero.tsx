import { AssetImage } from "@/components/ui/AssetImage";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { homeAssets } from "@/lib/assets";
import { HeroBadge } from "./HeroBadge";

/*
 * Figma hero 317:419 — 1440x532 sage panel; product photo 589x532 on the left,
 * vertical "Skin Care" watermark, discount badge, copy block at x=796.
 * Only one slide is designed: the three dots are rendered as a static indicator.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-sage">
      <div className="grid xl:h-133 xl:grid-cols-[36.8125rem_1fr]">
        <div className="relative aspect-[589/532] xl:aspect-auto xl:h-full">
          <AssetImage
            src={homeAssets.hero.src}
            alt="Skin care bottles and jars arranged on a stone tray"
            fill
            priority
            sizes="(min-width: 90rem) 589px, 100vw"
            className="object-cover"
            fallbackClassName="bg-gray-30"
          />
          <HeroBadge className="absolute right-2 bottom-4 size-28 md:size-40 xl:top-41 xl:-right-24 xl:bottom-auto xl:z-10 xl:size-49" />
        </div>

        <div className="relative flex flex-col justify-center gap-8 px-4 py-10 md:px-8 xl:py-0 xl:pr-0 xl:pl-[12.9375rem]">
          <p
            aria-hidden="true"
            className="pointer-events-none absolute top-0 -left-[2.625rem] hidden h-full w-32.5 items-center justify-center xl:flex"
          >
            <span className="-rotate-90 font-heading text-display font-bold whitespace-nowrap text-watermark">
              Skin Care
            </span>
          </p>
          <div className="relative flex flex-col gap-4">
            <p className="flex items-center gap-4 text-body-xl text-text-subtle">
              <span aria-hidden="true" className="h-px w-12 bg-text-subtle" />
              New Skin Care Products
            </p>
            <h1
              id="hero-title"
              className="max-w-140.5 font-heading text-h3 font-bold text-text md:text-h2 xl:text-h1"
            >
              Shop Your Best Skin Care Products
            </h1>
          </div>
          <ButtonLink
            href="/shop"
            size="lg"
            className="relative gap-4 self-start"
            iconRight={<Icon name="arrow-right" />}
          >
            Explore Products
          </ButtonLink>
          <div
            aria-hidden="true"
            className="flex items-center gap-2 xl:absolute xl:bottom-8 xl:left-[7.5625rem]"
          >
            <span className="size-4 rounded-full border border-accent p-0.5">
              <span className="block size-full rounded-full bg-accent" />
            </span>
            <span className="size-2 rounded-full bg-accent/60" />
            <span className="size-2 rounded-full bg-accent/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
