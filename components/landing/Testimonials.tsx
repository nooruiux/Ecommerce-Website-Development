"use client";

import { useState } from "react";
import { AssetImage } from "@/components/ui/AssetImage";
import { Icon } from "@/components/ui/Icon";
import { testimonials } from "@/data/consultation";
import { cn } from "@/lib/cn";
import { Stars } from "./Stars";

/*
 * Figma Testimonial 143:706 — tinted band (primary 12%), centred heading, three cards
 * (407x355 / 409x475 featured / 407x355) and round arrows at both ends.
 * The arrows rotate which testimonial is featured in the middle.
 */
export function Testimonials() {
  const [start, setStart] = useState(0);
  const n = testimonials.length;
  const ordered = Array.from({ length: n }, (_, i) => testimonials[(start + i) % n]);
  const featured = ordered[1];
  const move = (d: number) => setStart((s) => (s + d + n) % n);

  return (
    <section aria-labelledby="testimonials-title" className="bg-tint-primary py-12">
      <div className="container-page flex flex-col items-center gap-16">
        <div className="flex max-w-186.5 flex-col items-center gap-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <p className="text-body-xl font-semibold text-navy">Customers Story</p>
            <h2
              id="testimonials-title"
              className="font-heading text-h5 font-semibold text-text md:text-h4 xl:text-h3"
            >
              2000+ happy customers with their best Consulting experience
            </h2>
          </div>
          <p className="max-w-149 text-body-lg text-graphite">
            Lorem ipsum dolor sit amet consectetur. Maecenas aliquam id ac suspendisse praesent
            tristique cras faucibus aenean. At erat.
          </p>
        </div>

        <div className="relative w-full xl:w-[81.25rem]">
          <p className="sr-only" aria-live="polite">
            Featured: {featured.name}
          </p>
          <ul
            tabIndex={0}
            aria-label="Customer testimonials"
            className="flex snap-x snap-mandatory [scrollbar-width:none] items-center gap-6 overflow-x-auto px-px pb-4 focus-ring md:justify-center xl:overflow-visible xl:px-3.75 xl:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {ordered.map((t, i) => {
              const isFeatured = i === 1;
              return (
                <li
                  key={t.name}
                  className={cn(
                    "flex w-[85%] shrink-0 snap-center flex-col items-center gap-6 rounded-md border border-border-faint bg-surface p-6 shadow-soft sm:w-102",
                    isFeatured ? "xl:min-h-118.75" : "xl:min-h-88.75",
                  )}
                >
                  <AssetImage
                    src={t.avatar}
                    alt=""
                    width={112}
                    height={112}
                    className="rounded-full"
                    fallbackClassName="rounded-full"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-col items-center gap-4">
                      <h3 className="font-heading text-h5 font-semibold text-text">{t.name}</h3>
                      <Stars size={18} label="Rated 5 out of 5" />
                    </div>
                    <blockquote className="max-w-89.75 text-body-xl text-text-footer">
                      {t.quote}
                    </blockquote>
                  </div>
                </li>
              );
            })}
          </ul>
          {(["left", "right"] as const).map((side) => (
            <button
              key={side}
              type="button"
              onClick={() => move(side === "left" ? -1 : 1)}
              aria-label={side === "left" ? "Previous testimonial" : "Next testimonial"}
              className={cn(
                "absolute top-51 hidden size-touch items-center justify-center rounded-full bg-surface shadow-soft focus-ring hover:text-primary-hover xl:inline-flex",
                side === "left" ? "-left-1.5" : "-right-1.5",
              )}
            >
              <Icon name={side === "left" ? "arrow-left-circle" : "arrow-right-circle"} size={32} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
