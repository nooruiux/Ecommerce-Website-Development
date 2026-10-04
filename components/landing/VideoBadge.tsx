import { Icon } from "@/components/ui/Icon";

// Figma 148:1416 — 130px badge: white disc (109) with soft shadow, circular "Best Skincare Consultation", play glyph.
export function VideoBadge({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="relative block size-full">
        <span className="absolute inset-[8%] rounded-full bg-surface shadow-badge" />
        <svg viewBox="0 0 130 130" className="absolute inset-0 size-full" aria-hidden="true">
          <defs>
            <path id="video-badge-ring" d="M65 65m-44 0a44 44 0 1 1 88 0a44 44 0 1 1 -88 0" />
          </defs>
          <text className="fill-black font-body font-semibold" fontSize="9.5">
            <textPath href="#video-badge-ring" textLength="270" lengthAdjust="spacing">
              Best Skincare Consultation
            </textPath>
          </text>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center">
          <Icon name="play" size={20} />
        </span>
      </span>
    </span>
  );
}
