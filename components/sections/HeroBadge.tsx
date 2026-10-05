/*
 * Figma 317:436 — discount badge, 195.92 square (spec: docs/specs/hero.md).
 * White disc 156 (317:437) centred at 98,97; dark disc 92.08 #404040 (317:479) at 98.04,98.05;
 * ring text "Offer Available for Limited Time Only" (317:440): 37 Poppins Medium 12.97 glyphs,
 * each placed at its Figma centre and rotation (box centres on r = 63.17 around 97.96,97.95).
 * "20%" (317:482) and "Discounts" (317:481) baselines measured from the Figma render.
 */
// [glyph, centreX, centreY, rotationDeg] in the 195.92 badge box
const RING: [string, number, number, number][] = [
  ["O", 77.08, 38.33, -19.55],
  ["f", 88.09, 35.56, -9.17],
  ["f", 96.36, 34.8, -1.62],
  ["e", 106.8, 35.41, 7.81],
  ["r", 116.9, 37.7, 17.56],
  [" ", 124.79, 40.78, 25.1],
  ["A", 134.14, 46.18, 34.54],
  ["v", 143.35, 54.05, 45.85],
  ["a", 151.02, 63.7, 57.17],
  ["i", 155.96, 72.94, 66.61],
  ["l", 158.55, 80.12, 73.52],
  ["a", 160.65, 90.2, 82.96],
  ["b", 160.9, 103.35, 94.91],
  ["l", 159.14, 113.69, 104.34],
  ["e", 155.79, 123.41, 113.46],
  [" ", 151.16, 132.05, 122.57],
  ["f", 146.33, 138.62, 129.81],
  ["o", 138.98, 146.03, 139.24],
  ["r", 130.57, 152.1, 148.99],
  [" ", 123.05, 155.98, 156.53],
  ["L", 114.85, 158.87, 164.39],
  ["i", 106.4, 160.61, 172.25],
  ["m", 93.45, 161.02, -176.11],
  ["i", 80.96, 158.87, -164.48],
  ["t", 73.26, 156.17, -156.93],
  ["e", 63.44, 150.94, -147.18],
  ["d", 53.7, 143.13, -135.55],
  [" ", 46.85, 135.19, -126.12],
  ["T", 41.73, 126.89, -117.31],
  ["i", 37.98, 117.99, -108.51],
  ["m", 35.16, 105.36, -96.88],
  ["e", 35.24, 90.05, -83.04],
  [" ", 37.23, 80.43, -73.92],
  ["O", 41.34, 69.86, -63.86],
  ["n", 48.58, 58.5, -51.6],
  ["l", 55.29, 51.33, -42.48],
  ["y", 62.98, 45.33, -33.68],
];

// Poppins line box: its centre sits 0.35em above the baseline (ascent 1.05, descent 0.35).
const GLYPH_BASELINE = "0.35em";

export function HeroBadge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 195.92 195.92"
      className={className}
      role="img"
      aria-label="20% discounts, offer available for limited time only"
    >
      <circle cx="98" cy="97" r="78" className="fill-surface" />
      <g className="fill-text font-heading font-medium" fontSize="12.97" aria-hidden="true">
        {RING.map(([ch, x, y, a], i) =>
          ch === " " ? null : (
            <text
              key={i}
              transform={`translate(${x} ${y}) rotate(${a})`}
              y={GLYPH_BASELINE}
              textAnchor="middle"
            >
              {ch}
            </text>
          ),
        )}
      </g>
      <circle cx="98.04" cy="98.05" r="46.04" className="fill-badge-disc" />
      <text
        x="99"
        y="98"
        textAnchor="middle"
        className="fill-white font-heading font-bold"
        fontSize="29.73"
        letterSpacing="0.15"
      >
        20
        <tspan fontSize="12.97" fontWeight="500" letterSpacing="0">
          %
        </tspan>
      </text>
      <text
        x="98.5"
        y="117"
        textAnchor="middle"
        className="fill-white font-body"
        fontSize="12.39"
        letterSpacing="0.06"
      >
        Discounts
      </text>
    </svg>
  );
}
