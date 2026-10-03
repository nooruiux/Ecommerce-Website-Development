/*
 * Figma 317:436 — rotating-text discount badge: 196px ring of text
 * "Offer Available for Limited Time Only", white disc (156) and dark disc (92) with "20% Discounts".
 * Rendered as SVG text so it stays crisp and accessible.
 */
export function HeroBadge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 196 196"
      className={className}
      role="img"
      aria-label="20% discounts, offer available for limited time only"
    >
      <circle cx="98" cy="98" r="78" className="fill-surface" />
      <defs>
        <path id="hero-badge-ring" d="M98 98m-86 0a86 86 0 1 1 172 0a86 86 0 1 1 -172 0" />
      </defs>
      <text className="fill-text font-heading font-medium" fontSize="13">
        <textPath href="#hero-badge-ring" startOffset="0" textLength="532" lengthAdjust="spacing">
          Offer Available for Limited Time Only
        </textPath>
      </text>
      <circle cx="98" cy="98" r="46" className="fill-accent" />
      <text
        x="98"
        y="98"
        textAnchor="middle"
        className="fill-white font-heading font-bold"
        fontSize="30"
      >
        20
        <tspan fontSize="13" fontWeight="500">
          %
        </tspan>
      </text>
      <text x="98" y="122" textAnchor="middle" className="fill-white font-body" fontSize="12.4">
        Discounts
      </text>
    </svg>
  );
}
