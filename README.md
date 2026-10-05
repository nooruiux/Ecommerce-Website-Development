# Nattoral

E-commerce storefront for skin care, hair care, personal care and mom & baby products, with a skincare consultation booking flow. Built from the Nattoral Figma design.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, React Server Components) + TypeScript (strict)
- Tailwind CSS v4 with design tokens mapped from the Figma variables (`app/globals.css`)
- Zustand for cart, wishlist and compare state (persisted to `localStorage`)
- Framer Motion for drawers and sheets
- `next/font` (Poppins, Source Serif 4, Open Sans, Plus Jakarta Sans) and `next/image`
- ESLint (flat config) + Prettier

## Getting started

Requirements: Node.js 20.9+ (22 recommended) and npm.

```bash
npm install
npm run dev        # http://localhost:3000
```

Optional environment variable:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Absolute site URL used for canonical links, Open Graph and JSON-LD (defaults to `https://nattoral-zeta.vercel.app`). |

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build (regenerates the asset manifest first) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generate route types and run `tsc --noEmit` |
| `npm run format` | Prettier |
| `npm run assets` | Rebuild `lib/asset-manifest.json` from `/public` |

## Folder structure

```
app/
  (shop)/             storefront routes: home, shop, category, product, cart, checkout, …
  globals.css         design tokens (@theme) and base styles
components/
  ui/                 primitives: Button, Field, Choice, ProductCard, Drawer, …
  layout/             Header, Footer, navigation
  sections/           Home page sections
  catalog/            filters, sort, pagination
  product/            gallery, purchase panel, tabs
  cart/               cart drawer, line items, summary
data/                 mock catalog, brands, navigation
lib/                  utilities (assets, catalog query, cart totals, SEO, fonts)
store/                Zustand stores
types/                shared TypeScript types
docs/                 design inventory and QA report
public/               images and icons exported from Figma
```

## Assets

Images and icons are registered in `lib/assets.ts` and rendered through `AssetImage` / `Icon`. A file that is not in `/public` yet renders as a neutral placeholder of the same size, so layouts never shift. Run `npm run assets` (or any build) after adding files.

## Documentation

- `docs/design-inventory.md`: pages, components, tokens and breakpoints extracted from Figma
- `docs/qa-report.md`: pixel QA results and intentional deviations
