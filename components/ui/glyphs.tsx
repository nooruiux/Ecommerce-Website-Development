/*
 * Utility glyphs that have no Figma counterpart (mobile menu, search toggle, close).
 * Drawn on the same 24px grid and stroke weight as the exported header icons.
 */
type GlyphProps = { className?: string; size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  "aria-hidden": true,
});

export const MenuIcon = ({ className, size = 24 }: GlyphProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const SearchIcon = ({ className, size = 24 }: GlyphProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4 4" />
  </svg>
);

export const CloseIcon = ({ className, size = 24 }: GlyphProps) => (
  <svg {...base(size)} className={className}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const CartGlyph = ({ className, size = 24 }: GlyphProps) => (
  <svg {...base(size)} className={className}>
    <path d="M3 4h2l2.2 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.76L20 7.5H6.1" />
    <circle cx="9" cy="19" r="1.25" />
    <circle cx="17" cy="19" r="1.25" />
  </svg>
);
