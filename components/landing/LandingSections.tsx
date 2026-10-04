import { AskButton } from "@/components/consultation/AskModal";
import { AssetImage } from "@/components/ui/AssetImage";
import { buttonClasses, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import {
  consultants,
  serviceCopy,
  services,
  stepCopy,
  steps,
  whyPoints,
} from "@/data/consultation";
import { landingAssets } from "@/lib/assets";
import { cn } from "@/lib/cn";
import { Stars } from "./Stars";
import { VideoBadge } from "./VideoBadge";

// Figma gradient text fills (error → warning). Literal class strings so Tailwind can see them.
const heroGradient =
  "bg-[linear-gradient(101.5deg,var(--color-error)_21.9%,var(--color-warning)_70.6%)] bg-clip-text text-transparent";
const whyGradient =
  "bg-[linear-gradient(96deg,var(--color-error)_1.5%,var(--color-warning)_71.1%)] bg-clip-text text-transparent";

const sectionTitle = "font-heading text-h5 font-semibold text-text md:text-h4 xl:text-h3";

/* Hero 143:80 — copy block (H1 632px, caption 484px, two 56px buttons) + illustration on the right half. */
export function LandingHero() {
  return (
    <section
      aria-labelledby="landing-hero"
      className="container-page grid grid-cols-1 items-center gap-10 py-12 xl:h-106 xl:grid-cols-[39.5rem_1fr] xl:gap-0 xl:py-0"
    >
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <h1
            id="landing-hero"
            className="max-w-158 font-heading text-h3 font-bold text-text md:text-h2 xl:text-h1"
          >
            Your <span className={heroGradient}>skincare</span> routine is a bank account. Invest
            wisely
          </h1>
          <p className="max-w-121 text-caption-lg text-text-soft">
            The purpose of skin is to protect the human body from things like bacteria, chemicals,
            and temperature extremes.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <ButtonLink
            href="#consultants"
            size="lg"
            className="gap-3"
            iconLeft={<Icon name="calendar" size={20} />}
          >
            Book Appointment
          </ButtonLink>
          <ButtonLink
            href="#how-it-works"
            variant="outline"
            size="lg"
            className="gap-2 px-4 font-heading"
            iconLeft={<Icon name="play-circle" size={24} />}
          >
            How it Works
          </ButtonLink>
        </div>
      </div>
      <AssetImage
        {...landingAssets.heroIllustration}
        alt="Illustration of a woman with a face mask surrounded by skin care products"
        priority
        className="mx-auto h-auto w-full max-w-161.5"
        fallbackClassName="mx-auto w-full max-w-161.5 rounded-2xl bg-transparent"
      />
    </section>
  );
}

/* Why section 172:3154 — arched photo (490x515) in a dashed frame + copy column at x=698. */
export function WhySection() {
  return (
    <section
      aria-labelledby="why-title"
      className="container-page grid grid-cols-1 items-start gap-12 xl:grid-cols-[43.625rem_1fr] xl:gap-0"
    >
      <div className="relative mx-auto aspect-[557/554] w-full max-w-139 xl:mx-0 xl:mt-10">
        <AssetImage
          {...landingAssets.whyFrame}
          alt=""
          className="absolute top-[2.2%] left-0 h-auto w-[93%]"
          fallbackClassName="bg-transparent"
        />
        <span className="absolute top-0 left-[45%] text-text">
          <Icon name="sparkle" size={20} />
        </span>
        <div className="absolute top-[4.7%] left-[2.5%] h-[92.9%] w-[88%] overflow-hidden rounded-t-full">
          <AssetImage
            src={landingAssets.whyPhoto.src}
            alt="Cosmetologist with a client during a facial treatment"
            fill
            sizes="(min-width: 90rem) 490px, 88vw"
            className="object-cover"
          />
        </div>
        <VideoBadge className="absolute top-[39.4%] left-[81.3%] size-[23.3%]" />
      </div>
      <div className="flex flex-col gap-6">
        <h2
          id="why-title"
          className="max-w-110.5 font-heading text-h4 font-semibold text-text md:text-h3 xl:text-h2"
        >
          Why is A Skincare <span className={whyGradient}>Consultation</span> is so Important
        </h2>
        <p className="max-w-140 text-body-lg text-graphite">
          Lorem ipsum dolor sit amet consectetur. Maecenas aliquam id ac suspendisse praesent
          tristique cras faucibus aenean. At erat nullam in in purus
        </p>
        <ul className="flex flex-col gap-4.75">
          {whyPoints.map((p, i) => (
            <li key={i} className="flex gap-4">
              <Icon name="check-square" size={24} className="mt-1 text-primary-hover" />
              <span className="flex max-w-102 flex-col">
                <span className="text-body-xl font-semibold text-text">{p.title}</span>
                <span className="text-body-md text-text-muted">{p.text}</span>
              </span>
            </li>
          ))}
        </ul>
        <AskButton className={cn(buttonClasses({ size: "lg" }), "mt-4 self-start")}>
          Have a Question
        </AskButton>
      </div>
    </section>
  );
}

/* Consultations 143:484 — centred H2, three 402px cards (radius 16, soft shadow, gap 32). */
export function ConsultationsSection() {
  return (
    <section
      aria-labelledby="consultations-title"
      className="container-page flex flex-col items-center gap-14"
    >
      <div className="flex max-w-146 flex-col items-center gap-4 text-center">
        <h2
          id="consultations-title"
          className="font-heading text-h4 font-semibold text-text md:text-h3 xl:text-h2"
        >
          Consultations
        </h2>
        <p className="text-body-md text-text-subtle">
          Lorem ipsum dolor sit amet consectetur. Ut in senectus aliquam odio nec semper purus leo
          sed. Eget pharetra ut elementum neque mattis lectus lacinia aliquet integer. Enim mollis
        </p>
      </div>
      <ul className="grid w-full gap-8 md:grid-cols-2 xl:grid-cols-3">
        {services.map((s) => (
          <li
            key={s.slug}
            id={s.slug}
            className="flex scroll-mt-6 flex-col items-center gap-4 rounded-card bg-surface px-5 py-8 shadow-soft"
          >
            <div className="flex flex-col items-center gap-8">
              <span className="inline-flex size-18 items-center justify-center rounded-full bg-primary-light">
                <Icon name={s.icon} size={40} />
              </span>
              <h3 className="font-heading text-h4 font-semibold text-text">{s.title}</h3>
            </div>
            <div className="flex flex-col items-center gap-8">
              <p className="max-w-86.5 text-body-lg text-text-subtle">{serviceCopy}</p>
              <ButtonLink href="#consultants" variant="outline" size="sm">
                Learn More<span className="sr-only"> about {s.title} consultations</span>
              </ButtonLink>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* How it works 146:1055 — three 279px steps at x 0/501/1002 with a dashed connector behind. */
export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-title"
      className="container-page flex scroll-mt-6 flex-col items-center gap-14"
    >
      <div className="flex max-w-168.5 flex-col items-center gap-6 text-center">
        <h2 id="how-title" className={sectionTitle}>
          How It Works
        </h2>
        <p className="text-body-lg text-graphite">
          Lorem ipsum dolor sit amet consectetur. Maecenas aliquam id ac suspendisse praesent
          tristique cras faucibus aenean. At erat nullam in in purus
        </p>
      </div>
      <div className="relative w-full">
        <AssetImage
          {...landingAssets.howConnector}
          alt=""
          className="absolute top-4.75 left-[13.8%] hidden h-auto w-[71.4%] xl:block"
          fallbackClassName="hidden bg-transparent"
        />
        <ol className="relative grid gap-12 md:grid-cols-3 md:gap-8 xl:gap-[13.875rem]">
          {steps.map((s) => (
            <li key={s.title} className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center gap-8">
                <span className="inline-flex size-24 items-center justify-center rounded-full bg-surface shadow-soft">
                  <Icon name={s.icon} size={48} />
                </span>
                <div className="flex max-w-69.75 flex-col items-center gap-4">
                  <h3 className="font-heading text-h5 font-medium text-text">{s.title}</h3>
                  <p className="text-body-lg text-text-footer">{stepCopy}</p>
                </div>
              </div>
              <ButtonLink href="/register" variant="outline" size="sm">
                Learn More<span className="sr-only"> about {s.title}</span>
              </ButtonLink>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Our Story 153:1425 — tinted band (secondary 12%), copy left, arched photo with two floating chips right. */
export function StorySection() {
  return (
    <section aria-labelledby="story-title" className="bg-tint-secondary">
      <div className="container-page grid grid-cols-1 items-end gap-10 pt-12 xl:h-103.75 xl:grid-cols-[45.5rem_1fr] xl:gap-0">
        <div className="flex flex-col gap-8 self-start pb-6 xl:pl-1.5">
          <div className="flex max-w-138.5 flex-col gap-4">
            <h2 id="story-title" className={sectionTitle}>
              Our Story
            </h2>
            <div className="flex flex-col text-body-lg text-text-subtle">
              <p>
                Lorem ipsum dolor sit amet consectetur. Non vulputate felis magna quam tincidunt vel
                ipsum velit. In purus quis purus et fusce tristique elementum ac turpis. Vulputate
                elementum sed suspendisse urna. Turpis eget adipiscing
              </p>
              <p>
                tincidunt vel ipsum velit. In purus quis purus et fusce tristique elementum ac
                turpis. Vulputate elementum sed suspendisse urna. Turpis eget adipiscing aenean
                dictum felis suspendisse. Nulla lobortis ridiculus tortor eget.
              </p>
            </div>
          </div>
          <ButtonLink href="/about" className="self-start px-5">
            Learn More<span className="sr-only"> about our story</span>
          </ButtonLink>
        </div>
        <div className="relative mx-auto aspect-[538/349] w-full max-w-134.5">
          <div className="absolute inset-y-0 left-[16.4%] w-[61.9%] overflow-hidden rounded-t-full">
            <AssetImage
              src={landingAssets.storyPhoto.src}
              alt="Client receiving a facial treatment"
              fill
              sizes="333px"
              className="object-cover"
            />
          </div>
          <div className="absolute top-[7.7%] left-0 flex h-14 items-center gap-3 rounded-pill border border-border-faint bg-surface p-2 pr-4 shadow-chip">
            <AssetImage
              {...landingAssets.storyAvatarB}
              alt=""
              className="rounded-full"
              fallbackClassName="rounded-full"
            />
            <Stars size={20} label="Rated 5 out of 5" />
          </div>
          <div className="absolute top-[79.3%] right-0 flex h-14 w-58.75 items-center gap-3 rounded-pill border border-border-faint bg-surface p-2 shadow-chip">
            <AssetImage
              {...landingAssets.storyAvatarA}
              alt=""
              className="shrink-0 rounded-full"
              fallbackClassName="rounded-full"
            />
            <p className="text-body-sm leading-4.5 text-text-muted">
              Lorem ipsum dolor sit amet. Nisl massa ac morbi leo eu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Privacy 153:1437 — 590x388 image (radius 16) + copy at x=726; divider 56px below. */
export function PrivacySection() {
  return (
    <section aria-labelledby="privacy-title" className="container-page">
      <div className="grid grid-cols-1 items-start gap-10 border-b border-line pb-13.75 xl:grid-cols-[40.375rem_1fr] xl:gap-0">
        <div className="relative aspect-[590/388] w-full max-w-147.5 overflow-hidden rounded-card">
          <AssetImage
            src={landingAssets.privacy.src}
            alt="Hands using a tablet with a security shield icon"
            fill
            sizes="(min-width: 90rem) 590px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex max-w-138.5 flex-col gap-4 xl:pt-19.5">
          <h2 id="privacy-title" className={sectionTitle}>
            Privacy Protection
          </h2>
          <p className="text-body-lg text-text-subtle">
            Lorem ipsum dolor sit amet consectetur. Integer netus morbi vel purus sed. Non arcu
            vestibulum iaculis tortor orci. Augue et eget mi accumsan maecenas in sed diam. Aliquam
            faucibus nunc orci enim nisi cras quisque erat. Maecenas gravida est in amet lectus.
            Nulla non nullam interdum sapien tempor interdum risus. Vestibulum tempus morbi
            ullamcorper commodo nibh nulla congue. Volutpat id pellentesque fermentum euismod
            senectus.
          </p>
        </div>
      </div>
    </section>
  );
}

/* Our Consultants 143:621 — four 296x416 cards (radius 8, soft shadow, gap 32). */
export function ConsultantsSection() {
  return (
    <section
      id="consultants"
      aria-labelledby="consultants-title"
      className="container-page flex scroll-mt-6 flex-col items-center gap-16"
    >
      <div className="flex max-w-146 flex-col items-center gap-4 text-center">
        <h2 id="consultants-title" className={sectionTitle}>
          Our Consultants
        </h2>
        <p className="text-body-md text-text-subtle">
          Lorem ipsum dolor sit amet consectetur. Ut in senectus aliquam odio nec semper purus leo
          sed. Eget pharetra ut elementum neque mattis lectus lacinia aliquet integer. Enim mollis
        </p>
      </div>
      <ul className="grid w-full gap-8 md:grid-cols-2 xl:grid-cols-4">
        {consultants.map((c) => (
          <li
            key={c.name}
            className="flex flex-col gap-8 rounded-md bg-surface px-5 pt-5.5 pb-5 shadow-soft xl:h-104"
          >
            <div className="flex flex-1 flex-col gap-4">
              <div className="flex items-center gap-3">
                <AssetImage
                  src={c.avatar}
                  alt=""
                  width={64}
                  height={64}
                  className="rounded-full"
                  fallbackClassName="shrink-0 rounded-full"
                />
                <div className="flex flex-col">
                  <h3 className="font-heading text-h5 font-medium text-text">{c.name}</h3>
                  <p className="text-body-lg text-text-muted">{c.role}</p>
                </div>
              </div>
              <p className="text-body-lg text-text-muted">{c.bio}</p>
              <p className="text-body-lg text-text-muted">
                <span className="text-text">Specialist:</span>- {c.specialist}
              </p>
              <div className="flex items-center gap-2">
                <Stars label={`Rated ${c.rating.toFixed(1)} out of 5`} />
                <span
                  className="text-body-lg leading-none font-semibold text-text"
                  aria-hidden="true"
                >
                  {c.rating.toFixed(1)} ({c.reviews})
                </span>
                <span className="sr-only">from {c.reviews} reviews</span>
              </div>
            </div>
            <AskButton
              message={`I would like to book an appointment with ${c.name}.`}
              className={cn(buttonClasses({ variant: "outline", size: "sm", fullWidth: true }))}
            >
              Book Appointment<span className="sr-only"> with {c.name}</span>
            </AskButton>
          </li>
        ))}
      </ul>
    </section>
  );
}
