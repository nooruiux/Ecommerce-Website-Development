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

## Intentional deviations

| Deviation | Reason |
|---|---|
| Body font is **Source Serif 4** | Figma names "Source Serif Pro", which Google Fonts now publishes as Source Serif 4 (one Figma style already references it). |
| Product prices, ratings and sale prices vary | Figma shows $5.75 / 4.7 (715) on every card; filter and sort need varied data. |
| Checkbox and radio drawn in CSS | Matches the Style Guide geometry (24px circle, gray-30 off ring, primary-hover fill); SVG exports were blocked. |
| Brand spelled "Nattoral" in UI copy | Matches the Figma logo and copyright text; project name stays "Nattarol". |

## Pixel QA per page

To be filled in during Phase 4.
