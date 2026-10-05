# Nattoral — QA Report

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

## Owner-requested changes (deviate from Figma)

- **Typography**: the whole storefront uses **Plus Jakarta Sans** (Google Fonts, variable 200–800, one preloaded 27.6 KB file) instead of Poppins / Source Serif / Open Sans. Sizes, weights and line-heights keep the Figma tokens. Lighthouse `/` LCP median 2.35 s → 2.25 s.
- **Section titles** (Top Categories, Featured Products, Shop By Popular Brands, New Arrivals, Best Selling): 28 / 36 (`--text-section`) instead of 48 / 40.
- **Product card (retail style, owner reference)**: white card, 12 px radius, 1 px `--color-line` border, 12 px padding, hover shadow; padded square image (8 px radius) with a pill discount badge (orange `--color-highlight`, dark text); two-line title 15 / 22 semibold; price row = struck original (muted) + current price bold in `--color-primary-strong`; full-width 40 px "Add To Cart" button (8 px radius, brand teal `--color-primary-hover-strong`, hover `--color-primary-strong`; disabled "Out of Stock" when no variant is in stock). Description, rating and "500+ Sold" are not shown on cards. Cards are 346 px tall at 1440 (Figma 400), so the Home page is 6201 px (Figma 6541).

- **Brand colors from the logo**: primary palette re-derived from the logo check mark (mint #C0E8E8, peach #FCE1D8) and wordmark (charcoal #393939). Primary teal #3E9898 (mint hue), text/focus #2A6F6F (5.8:1), hover #2B7F7F (4.7:1), hover fill behind dark text #79C3C3 (8.1:1), light #C0E8E8 (nav bar, tints). Replaces the Figma cyan #3CB9D1 / blue #1AA9E5. Hover audit: 380 elements, 0 failing; axe 0 violations.

## Intentional deviations

| Deviation | Reason |
|---|---|
| Body font is **Source Serif 4** | Figma names "Source Serif Pro", which Google Fonts now publishes as Source Serif 4 (one Figma style already references it). |
| Product prices, ratings and sale prices vary | Figma shows $5.75 / 4.7 (715) on every card; filter and sort need varied data. |
| Checkbox and radio drawn in CSS | Matches the Style Guide geometry (24px circle, gray-30 off ring, primary-hover fill); SVG exports were blocked. |
| Brand name in one constant (`lib/site.ts`) | "Nattoral", confirmed by the owner; matches the Figma logo and copyright. |
| "Shop By Popular Brands" shows placeholder wordmarks | Figma tiles are real 3D-printer brand logos; replaced by neutral grayscale tiles (`data/brands.ts`) until real brands are supplied. Tile size, gap and border match 317:645. |
| Product card on sale: current price + "−N%" chip on the image (badge-only) | Tested an inline struck compare-at price (text-body-xs, muted): the price row wraps and the card grows to 438px at 1440 (428 / 424 / 422 at 1024 / 768 / 375), stretching the whole grid row. Reverted to badge-only to keep the Figma 400px card. Struck price shows on PDP and cart. |
| Body font uses `opsz` 40 | Source Serif 4 at opsz 40 is the only optical size that reproduces the Source Serif Pro line breaks in all measured Figma copy (Home card description, Landing "Why" points and intro). opsz 14 / 20 wrap one extra line. |
| Hero dots are decoration only | Only one slide is designed; dots are aria-hidden, pointer-events-none spans (no buttons, no cursor). |
| Hero discount badge is SVG text | Circular text from 317:436 rebuilt as SVG `textPath` (crisp, accessible). |
| Product grid 2 / 3 / 4 / 6 columns | 4 columns at 1024–1439 (6 would make cards ~150px wide); 6 at 1440 as in Figma. |
| Mobile Home (< 768px) shows 8 products per section + full-width outline "View All" → /shop | UX deviation (approved): 36 cards in 2 columns made the mobile page ~13,000px long. Tablet and desktop unchanged. |
| /shop, /category/[slug] | Derived. Filters (category, concern, price, rating, brand, in-stock) and sort live in URL search params; pagination is real links (12 per page); mobile filters in a bottom sheet with "Apply (N results)"; empty state with "Clear filters". |
| /product/[slug] | Derived. Scroll-snap gallery (native swipe) + thumbnails, size variant in `?variant=`, quantity stepper, sticky mobile add-to-cart bar, trust row (cart / compare / check icons), Description / Reviews / Shipping tabs, related products, Product + BreadcrumbList JSON-LD. Gallery uses the other Figma photos of the same product name. |
| Cart page | Derived. Quantity stepper, remove with Undo toast (restores position and quantity), coupon field (UI only: explains no codes are active), order summary, empty state → /shop. |
| Checkout | Derived. One page, guest by default: Contact → Shipping → Delivery → Payment (UI only, nothing sent or stored). `autocomplete` / `inputmode` on every field, validation on blur, focus moves to the first invalid field, summary sticky on desktop and collapsible on mobile. "Place order" clears the cart → /order-confirmation. |
| Login / Register | Derived from the "Ask Us A Question" card. Show/hide password toggle (`aria-pressed`), inline errors, `username` / `current-password` / `new-password` autocomplete. UI only. |
| Toast | Derived: accent surface, polite live region. |
| 404 | Derived: header search form + link to /shop. |
| /consultation uses the Landing header and footer | As in Figma 143:64 (announcement bar, consultation nav, newsletter footer) via its own route-group layout. |
| Figma copy typos corrected | "Serveys" → Surveys, "Consultans" → Consultants, "Appoinment" → Appointment, "Consultalting" → Consulting. |
| Testimonial arrows rotate the featured (middle) card | Figma shows three cards with arrows; with three testimonials the arrows cycle which one is featured instead of scrolling. |
| Landing hero illustration ships as one SVG | 143:88 is ~100 vector layers; exported as a single asset. |
| "Have a Question" and consultant "Book Appointment" open the Ask modal | Matches "Questions 1" (172:5135); consultant buttons prefill the message. |
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

### /consultation (1440) vs Figma Landing 143:64

| Section | Figma y / h | Build y / h |
|---|---|---|
| Header | 0 / 160 | 0 / 160 |
| Hero | 232 / 424 | 232 / 424 |
| Why consultation | 776 / 652 | 776 / 652 |
| Consultations | 1540 / 700 | 1540 / 700 |
| How it works | 2352 / 508 | 2352 / 508 |
| Our Story | 2972 / 415 | 2972 / 415 |
| Privacy (+ divider) | 3499 / 444 | 3499 / 444 |
| Our Consultants | 3999 / 594 | 3999 / 596 |
| Testimonials band | 4693 / 841 | 4691 / 841 |
| Footer | 5598 / 450 | 5596 / 450 |
| Page height | 6049 | 6046 |

### /ask (1440) vs Figma Question 172:4148

Logo 300×47 at (570, 58) and card 552×677 at (444, 169): identical to Figma.

No horizontal overflow at 360 / 375 / 768 / 1024 / 1440 on any route (production build).

Pending: image-level comparison once Figma assets are available.

## Phase 5: production quality

### SEO

- `metadata.title.template` = `%s | Nattoral`; every route has its own title and description.
- `noindex, follow`: /cart, /checkout, /order-confirmation, /login, /register, /wishlist, /compare, 404, and /shop?q= search results.
- `/primitives` returns 404 in production (`notFound()` when `NODE_ENV === "production"`); excluded from the sitemap.
- `sitemap.xml`: 44 URLs (home, shop, 4 categories, 36 products, consultation, ask). No noindex or filtered URLs.
- `robots.txt`: allow `/`, disallow only `/primitives`; points to the sitemap. /cart and /checkout are deliberately crawlable so crawlers can read their `noindex` (a robots-blocked URL can still be indexed from external links).
- JSON-LD: Organization + WebSite (SearchAction → `/shop?q=`) on home; Product + BreadcrumbList on product pages; BreadcrumbList on shop/category.
- Open Graph image: `app/opengraph-image.tsx` (brand colours + wordmark), shared via `ogBase` on every page; product pages use the product photo.
- Favicon and apple-touch-icon: "N" monogram (Josefin Sans, the closest Google Font to the logo lettering), white on `--color-primary-strong` (#2A6F6F, brand teal from the logo), rounded square (rx 112/512). `app/icon.svg` (weight 400), `app/icon.png` 32×32 (weight 600 so the strokes survive at 32 px), `app/apple-icon.png` 180×180 (weight 400). Glyph outline embedded as a path, no font dependency. *Not in Figma – derived.*

### Accessibility (axe-core 4, WCAG 2.2 AA + best practices)

15 routes × 1440 / 375 (cart seeded): **0 violations**.

Fixed in this pass: rating labels on plain spans (role="img"), `<p>` inside `<dl>`, keyboard access to the mobile testimonial scroller, product-tab heading order, duplicate search landmark on 404, and colour contrast (below).

Every route has exactly one `h1`, it is the first heading, and no heading levels are skipped.

#### Colour contrast vs tokens

| Token | Value | Contrast | Use |
|---|---|---|---|
| text | #202020 | 16.3:1 on white | body, sale prices |
| text-muted (black 64%) | | 6.7:1 on white | descriptions, struck original price |
| text-placeholder (black 48%) | | 3.7:1 on white | placeholders only |
| primary (Figma) | #3CB9D1 | 2.3:1 on white ✗ | fills / swatches only |
| **primary-strong** (derived) | #267D8E | 4.8:1 on white | "500+ Sold", focus ring |
| primary-hover (Figma) | #1AA9E5 | 6.1:1 behind #202020 | background-only hovers behind dark text |
| **primary-hover-strong** (derived) | #107AA7 | 4.8:1 (white text on it / as text on white) | all text hovers, fills behind white text, outline-button hover border, checked checkbox / radio / toggle |
| highlight (Figma orange) | #FF784B | **6.2:1 behind #202020** | sale badge fill (dark text) |
| success (Figma) | #00C566 | 2.3:1 on white ✗ | fills only |
| **success-strong** (derived) | #008543 | 4.7:1 on white | "In stock", confirmations |
| error (Figma) | #E53935 | 4.2:1 on white ✗ (small text) | fills only |
| **error-strong** (derived) | #D63531 | 4.8:1 on white | error messages |
| gray-80 | #66707A | 5.0:1 on white | brand placeholder wordmarks |

The `*-strong` tokens are `color-mix(in oklab, <figma token>, black)`, the lightest mix that clears 4.5:1. Sale styling keeps the brand orange: badge = #FF784B fill + #202020 text; sale price = text colour + struck original (no orange or brown text).

#### Hover states (manual check; axe does not cover hover)

Scripted: every visible link / button / tab on 9 routes hovered at 1440 (394 elements, 35 distinct hover styles) and text vs effective background measured. **0 below threshold**; lowest pair #D63531 on white 4.76:1. On the primary-light category bar and the Landing announcement bar the hover is an underline (no colour change), because #107AA7 on #C9E8EA is only 3.7:1.

Border-only hovers around dark text (variant chips, gallery thumbnails, checkbox outline) keep #1AA9E5.

### Lighthouse 13 (mobile, simulated Slow 4G + 4× CPU, production build, images missing)

Median of 5 runs (individual LCP runs in brackets).

| Route | Perf | A11y | BP | SEO | LCP before (Phase 5) | LCP after | TBT | CLS | LCP element |
|---|---|---|---|---|---|---|---|---|---|
| / | 93 | 100 | 100 | 100 | 3.3 s | 3.0 s [3.0 3.0 3.0 3.0 2.3] | 119 ms | 0 | h1 "Shop Your Best Skin Care Products" (Poppins) |
| /shop | 94 | 100 | 100 | 100 | 3.5 s | 2.9 s [2.7 2.9 3.0 3.1 2.7] | 120 ms | 0 | product description (Source Serif) |
| /product/sebiaclear-gel-p01 | 94 | 100 | 100 | 100 | 3.3 s | 3.0 s [3.0 3.0 2.4 3.0 2.3] | 103 ms | 0 | product description (Source Serif) |
| /checkout | 94 | 100 | 100 | 63* | 3.5 s | 3.0 s [3.0 2.4 3.0 2.4 3.0] | 95 ms | 0.001 | h1 "Checkout" |
| /consultation | 96 | 100 | 100 | 100 | 3.5 s | **2.4 s** [2.4 2.4 2.6 2.4 2.4] | 139 ms | 0 | h1 (Poppins) |

\* `is-crawlable` only: /checkout is intentionally `noindex`.

Changes in this pass:
- Source Serif 4 instanced at opsz 40 (weight axis kept), latin subset: 122 KB → 35 KB, self-hosted via `next/font/local`, `display: swap`, Times New Roman size-adjusted fallback. Visual output unchanged (Home 6541 px, Landing 6046 px, card 400 px).
- Preload only the heading (Poppins) and body (Source Serif) fonts; Open Sans and Plus Jakarta Sans not preloaded. Preloaded font bytes ≈ 200 KB → 66 KB.
- Viewport link prefetching removed (IntentLink: prefetch on hover / focus / touch); 38–56 KB of RSC prefetches no longer compete with fonts during load.
- Checkout form is server-rendered (LCP no longer waits for hydration); empty cart swaps a one-line notice, no layout shift.
- Images ready for assets: AVIF + WebP (`images.formats`), hero / Landing illustration / first gallery image use `fetchPriority="high"` + `loading="eager"` (Next 16 replaces `priority`).

**LCP status: not yet < 2.5 s on 4 of 5 routes in the lab.** Every LCP element is text whose paint is gated by the web-font swap; the simulation is bimodal (≈2.3 s vs ≈3.0 s) depending on whether the swap lands before or after main-script evaluation. Once the Figma images are in, Home (hero photo), /shop and the product page (product photos) get image LCP elements, so they must be re-measured then. If text LCP remains above 2.5 s after that, next step: inline the Poppins 700 latin subset (8 KB) for the h1 as a data URI.

### Lighthouse 13 — with Figma assets (mobile, simulated Slow 4G + 4× CPU, production build)

Median of 5 runs (individual LCP runs in brackets). /shop also measured over 9 runs: median 2.65 s.

| Route | Perf | A11y | BP | SEO | LCP | TBT | CLS | LCP element |
|---|---|---|---|---|---|---|---|---|
| / | 97 | 100 | 100 | 100 | **2.20 s** [2.65 2.27 2.20 2.20 2.20] | 136 ms | 0 | hero photo |
| /shop | 96 | 100 | 100 | 100 | 2.64 s [2.64 2.59 2.64 2.65 2.57] | 72 ms | 0 | first product photo |
| /product/bioderma-p03 | 99 | 100 | 100 | 100 | **2.21 s** [2.34 2.26 2.20 2.21 2.12] | 82 ms | 0.001 | gallery photo |
| /checkout | 98 | 100 | 100 | 66* | **2.28 s** [2.32 2.26 2.93 2.20 2.28] | 49 ms | 0.002 | h1 "Checkout" |
| /consultation | 97 | 100 | 100 | 100 | **2.49 s** [2.34 3.11 2.49 2.42 2.57] | 54 ms | 0 | h1 (Poppins) |
| /ask | 97 | 100 | 100 | 100 | **2.28 s** [2.87 2.28 2.28 2.88 2.27] | 100 ms | 0 | logo |

\* `is-crawlable` only: /checkout is intentionally `noindex`.

Changes in this pass:
- Product cards passed the whole product object (description, ingredients, gallery, variants) to the client add-to-cart button; it now receives only id, name and variant id (Home RSC payload −33 KB).
- `experimental.inlineCss` removed: it inlined the 55 KB stylesheet once in `<style>` and twice more in the RSC payload (Home HTML 637 KB → 396 KB, /ask 256 KB → 55 KB). Measured both ways after the other fixes; the external stylesheet is faster on 5 of 6 routes.
- `images.deviceSizes` / `imageSizes` trimmed to what the sources can serve (max export width 1440 px), shortening every srcset.
- Source Serif 4 (body) no longer preloaded; headings/images are the LCP elements and the size-adjusted fallback keeps CLS at 0.
- LCP images: hero `fetchPriority="high"` + preload; first two /shop cards `preload` + `fetchPriority="high"`; /ask logo `fetchPriority="high"`; Landing illustration gets `sizes` (47 KB → 27 KB on mobile) and normal priority (the h1 is the mobile LCP).
- Logo: aspect ratio pinned to the Figma frame (the 2× raster's ratio had grown the Landing footer by 17 px).

**LCP status: 5 of 6 routes under 2.5 s. /shop is at 2.64 s** (same CSS, fonts and scripts as the passing routes; the difference is simulated main-thread time before first paint, FCP 1.37 s vs 1.0 s on Home). Candidate next steps: render the desktop filter sidebar after the product grid in source order, or move /shop filtering to the client so the route can be prerendered.

## Figma asset export status

Exported from Figma `IZu9OqsPkarImQz9n31q42` by rendering each node (www.figma.com is not reachable from the build container, so the REST image URLs could not be downloaded).

- **Icons (27 SVG, svgo multipass)** in `/public/icons`: header, product card, social (Home footer 317:1443), Landing consultation/step icons, testimonial arrows, check (2:184). `arrow-*-circle` keep only the chevron (the button draws the circle and shadow); `consult-hair` viewBox trimmed to its 40px artwork.
- **Photos (WebP q88)**: 36 product images (2x, 1px card stroke trimmed → 396x396), 6 category circles (2x), CTA left (2x), Landing story photo, avatars, consultants, testimonials (2x), newsletter cart/hand (2x PNG, alpha).
- **Lower than 2x (render size cap)**: hero 1.25x, consultation banner 0.9x, CTA right 1x (drop shadow cropped off, CSS shadow kept), newsletter 1x, why-photo 1.25x, privacy 1.25x. To be replaced with 2x exports.
- **Landing hero illustration**: 2x WebP render (the SVG export is 111 KB of paths).
- **Logo** (317:344 / 143:70) is a raster image fill in Figma (300x47 source), so no true SVG exists; stored as a 2x PNG.
- **Unsplash+ watermarks — TEMPORARY SWAP**: Figma nodes 317:1229 and 317:1250 (Best Selling row 3, items 4 and 5) carry "Unsplash+" watermarks in the Figma file itself. Until licensed replacements are supplied, `public/images/products/best-3-4.webp` reuses the clean photo of best-1-4 (317:975) and `best-3-5.webp` reuses best-2-5 (317:1123); both are the same product name, so PDP galleries stay consistent. Replace the two files to restore the design images.
- **Why-section dashed frame (148:1205)**: drawn in CSS (`why-frame` utility in `app/globals.css`), no image file. Geometry from the node: Rectangle 148:1196 + OUTSIDE stroke (box 518.64×543.33 at y 9.76 in the 557×554 photo frame), stroke #000000 at 1.2937 px, top radii 396.67 (clamps to a semicircle, same as `rounded-t-full`), top gap = cut rectangle 148:1199 (x 222.81–295.83, height 17.38 px) via a CSS mask. Pixel check at 1440: frame top 825.73 vs 825.74 expected, width 517.7 vs 518.6 (the photo container is 556 vs 557 — pre-existing 1 px). **Deviation**: CSS `dashed` cannot set the dash pattern; Chrome draws ≈3 px dashes where Figma uses 2.59/2.59, and snaps the 1.29 px stroke to 1 device pixel. An exact pattern would need an inline SVG `stroke-dasharray`.
- **App Store / Google Play badges (317:1322, 317:1395)**: not shipped. The whole "Download Our App" footer block is behind `site.hasApp` (`lib/site.ts`, currently `false`) — no placeholder badges. With the flag off the footer keeps 3 columns spread across the row at ≥1440 (`justify-between`), a brand + 2 content-sized link columns at 768–1439 (all text inside the content box, checked at 768/1024/1280/1440), 1 column on mobile. Set `hasApp: true` and add the official badge files to `/public/images/brand/app-store.png` / `google-play.png` (or update `brandAssets`) to restore Figma's 4-column footer.
- **/shop LCP 2.64 s**: accepted for launch by the product owner. The filter sidebar is NOT moved after the grid in source order, to keep the visual and keyboard focus order aligned (WCAG 2.4.3). Real-user LCP is tracked after launch with `@vercel/speed-insights`: `<DeferredSpeedInsights />` in `app/layout.tsx` mounts it after the window load event, so its script never competes with LCP resources (vitals are read from buffered performance entries). Off Vercel the script route `/_vercel/speed-insights/script.js` 404s, which costs Best Practices 4 points in local Lighthouse only.
- **Brands (317:645)**: the 14 logos are cropped from the Figma raster 317:647 (portfolio/demo build, approved by the product owner) and shown in real HTML tiles driven by `data/brands.ts`. Crops are 1.08× of the rendered tile (the raster's own resolution in Figma). Spec: `docs/specs/brands.md`.
- **Hero (317:419)**: rebuilt from the node spec (`docs/specs/hero.md`). Remaining deviations at 1440: the button is 227.3 px wide vs 222 (Google's Plus Jakarta Sans 600 sets "Explore Products" ~4 px wider than the font in Figma), and the "Skin Care" watermark runs 1.9 px past its Figma end point, in the region clipped above the panel. Hero photo is a 1.25× render; a true 2× (1178 × 1064) export of 317:435 is still pending (the plugin renderer rejects that size).
