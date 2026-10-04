"use client";

import { useRef, useState } from "react";
import { AssetImage } from "@/components/ui/AssetImage";
import { cn } from "@/lib/cn";

// Derived: scroll-snap track (native swipe on touch), thumbnail buttons, 1:1 like the Figma cards.
export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
    setIndex(i);
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={track}
        onScroll={(e) => {
          const el = e.currentTarget;
          const i = Math.round(el.scrollLeft / el.clientWidth);
          if (i !== index) setIndex(i);
        }}
        className="flex aspect-square snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto overscroll-x-contain rounded-sm border border-border [&::-webkit-scrollbar]:hidden"
        aria-roledescription="carousel"
        aria-label={`${name} images`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") goTo(Math.min(images.length - 1, index + 1));
          if (e.key === "ArrowLeft") goTo(Math.max(0, index - 1));
        }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="relative aspect-square w-full shrink-0 snap-center"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${images.length}`}
          >
            <AssetImage
              src={src}
              alt={i === 0 ? name : `${name}, view ${i + 1}`}
              fill
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              sizes="(min-width: 64rem) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <ul className="grid grid-cols-4 gap-3" aria-label="Choose image">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === index || undefined}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-sm border-2 focus-ring transition-colors",
                  i === index ? "border-accent" : "border-border hover:border-primary-hover",
                )}
              >
                <AssetImage src={src} alt="" fill sizes="120px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
