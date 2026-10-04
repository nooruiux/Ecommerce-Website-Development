import { AssetImage } from "@/components/ui/AssetImage";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { homeAssets } from "@/lib/assets";

/*
 * Figma 317:483 — 1280x488 photo, radius 24. Copy at x=88 / y=110:
 * H2 white with "Skincare" gradient (error → warning, 105.5deg), caption 18/30, white "Book Appointment".
 */
export function ConsultationBanner() {
  return (
    <section aria-labelledby="consultation-title" className="container-page">
      <div className="relative isolate overflow-hidden rounded-2xl bg-gray-90 xl:h-122">
        <AssetImage
          src={homeAssets.consultation.src}
          alt=""
          fill
          sizes="(min-width: 90rem) 1280px, 100vw"
          className="-z-10 object-cover object-bottom"
          fallbackClassName="-z-10 bg-gray-90"
        />
        <div className="px-6 py-12 md:px-12 xl:px-22 xl:pt-27.5 xl:pb-0">
          <div className="flex max-w-126 flex-col gap-8">
            <div className="flex flex-col gap-4 text-white">
              <h2
                id="consultation-title"
                className="font-heading text-h4 font-semibold md:text-h3 xl:text-h2"
              >
                Get Your Best{" "}
                <span className="bg-[linear-gradient(105.54deg,var(--color-error)_21.9%,var(--color-warning)_70.6%)] bg-clip-text text-transparent">
                  Skincare
                </span>{" "}
                Consultant
              </h2>
              <p className="max-w-121 text-caption-lg">
                The purpose of skin is to protect the human body from things like bacteria,
                chemicals, and temperature extremes.
              </p>
            </div>
            <ButtonLink
              href="/consultation"
              className="gap-3 self-start bg-white-soft px-6 text-text hover:bg-primary-hover-strong hover:text-on-accent"
              iconLeft={<Icon name="calendar" size={20} />}
            >
              Book Appointment
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
