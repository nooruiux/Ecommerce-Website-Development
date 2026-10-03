# Nattarol — QA Report

Reference: Figma `IZu9OqsPkarImQz9n31q42`. Screenshots in `/design-reference/` (git-ignored).

## Not in Figma – derived

These pages and components have no Figma frame. They are built only from the existing tokens, ProductCard, buttons, inputs and the header/footer patterns.

| Item | Built from |
|---|---|
| /shop, /category/[slug] (filter sidebar, sort, pagination) | ProductCard grid, Checkbox/Radio, Select, outline buttons |
| /product/[slug] (gallery, variants, qty stepper, tabs, related) | PriceTag, Rating, QuantityStepper, solid button, ProductCard row |
| Cart drawer and /cart | modal shadow token, ProductCard typography, solid button |
| /checkout | Input/Select from the "Ask Us A Question" form, order summary |
| /login, /register | "Ask Us A Question" card (radius-2xl, shadow-modal) |
| /about, /contact, 404 | section headings, Landing patterns |
| Mobile and tablet layouts (375 / 768 / 1024) | same tokens; only 1440 exists in Figma |
| QuantityStepper, Select, Skeleton, sale PriceTag | field border/radius tokens |
| Hover / focus / disabled / loading states | hover = primary-hover, focus = 2px primary ring + 2px offset, disabled = 40% opacity |
| Header dropdown panels (category bar, language, account) | Figma shows chevrons only; panels use surface + modal shadow + 44px rows |
| Mobile header + left drawer (focus trap, Esc, focus return) | logo, search toggle, cart badge, hamburger |
| Cart drawer | Drawer + CartLineItem + CartSummary |
| /wishlist, /compare | header shows wishlist and compare counters; pages derived |
| Menu, search and close glyphs | no Figma counterpart; 24px / 1.5px stroke |

## Intentional deviations

| Deviation | Reason |
|---|---|
| Body font is **Source Serif 4** | Figma names "Source Serif Pro", which Google Fonts now publishes as Source Serif 4 (one Figma style already references it). |
| Product prices, ratings and sale prices vary | Figma shows $5.75 / 4.7 (715) on every card; filter and sort need varied data. |
| Checkbox and radio drawn in CSS | Matches the Style Guide geometry (24px circle, gray-30 off ring, primary-hover fill); SVG exports were blocked. |
| Brand name in one constant (`lib/site.ts`) | Currently "Nattoral" (Figma logo/copyright). Final spelling pending owner confirmation. |
| "Shop By Popular Brands" shows placeholder wordmarks | Figma tiles are real 3D-printer brand logos; replaced by neutral grayscale tiles (`data/brands.ts`) until real brands are supplied. Tile size, gap and border match 317:645. |
| Product card on sale: current price + "−N%" chip on the image | Struck price + sale price + Buy Now pill does not fit the 172px row; keeps the 400px card height. Struck price shows on PDP and cart. |
| Body font uses `opsz` 20 | Source Serif 4 at opsz 20 reproduces the Source Serif Pro line breaks (default opsz 14 is ~7% wider and wraps card copy to 4 lines). |
| Hero dots are a static indicator | Only one slide is designed; no extra slides invented. |
| Hero discount badge is SVG text | Circular text from 317:436 rebuilt as SVG `textPath` (crisp, accessible). |
| Product grid 2 / 3 / 4 / 6 columns | 4 columns at 1024–1439 (6 would make cards ~150px wide); 6 at 1440 as in Figma. |
| Assets | Figma image/icon exports blocked by the network policy. Slots render as neutral boxes of the exact size (`AssetImage`, `Icon`) until files land in /public. |

## Pixel QA per page

### Home (1440) — section positions vs Figma 317:338

| Section | Figma y / h | Build y / h |
|---|---|---|
| Header | 0 / 144 | 0 / 144 |
| Hero | 144 / 532 | 144 / 532 |
| Top Categories | 772 / 356 | 772 / 356 |
| Consultation | 1224 / 488 | 1224 / 488 |
| Featured Products | 1808 / 475 | 1808 / 475 |
| Product card | 200 × 400 | 200 × 400 |
| Brands | 2379 | 2379 |
| New Arrivals | 2749 / 899 | 2749 / 899 |
| CTA | 3744 / 488 | 3744 / 488 |
| Best Selling | 4328 / 1323 | 4328 / 1323 |
| Newsletter | 5763 / 248 | 5763 / 248 |
| Footer | 6091 / 450 | 6091 / 450 |
| Page height | 6541 | 6541 |

No horizontal overflow at 360 / 375 / 768 / 1024 / 1440 (production build). Root cause of the earlier 360px overflow: the product card price row (price + 109px Buy Now pill) could not shrink inside a 156px grid cell; fixed with a wrapping row and `min-w-0` grid cells.

Pending: image-level comparison once Figma assets are available.
