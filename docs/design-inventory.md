# Nattoral — Design Inventory

Source: Figma file `IZu9OqsPkarImQz9n31q42`, start node `317:338` (Home Page).
Reference screenshots live in `/design-reference/` (git-ignored).

---

## 1. Pages / frames found in Figma

### Page "Final design" (`0:1`)

| Frame | Node | Size | Status |
|---|---|---|---|
| **Home Page** (e-commerce storefront) | `317:338` | 1440 × 6541 | Final, primary target |
| **Landing** (skincare consultation landing) | `143:64` | 1440 × 6049 | Final, different header/footer variant |
| **Question** ("Ask Us A Question" form, standalone page) | `172:4148` | 1440 × 958 | Final |
| **Questions 1** (same form as a modal over Landing, blurred backdrop) | `172:5135` | 1440 × 958 | Final (modal state) |
| **Style Guide** (Typography / Colors / Components) | `88:485` | 5276 × 3819 | Reference |

### Page "Demo Design" (`172:5747`)

| Frame | Node | Notes |
|---|---|---|
| ff | `172:5748` | Earlier draft of the consultation Landing |
| Home | `172:7814` | Earlier draft of the consultation Landing |

Treated as superseded drafts, not implemented.

### Pages requested in the brief that do **not** exist in Figma

Shop/Category, Product Detail, Cart (page + drawer), Checkout, Login/Register, About, Contact, 404, Mega menu, any mobile or tablet frames.

---

## 2. Home Page (`317:338`) section map

| # | Section | Node | y | Size |
|---|---|---|---|---|
| 1 | Header: Navbar (logo, category search, En/flag, compare, wishlist, cart with count badges, Account) | `317:340` | 0 | 1440 × 96 |
| 1b | Header: category nav bar (Skin Care, Hair Care, Personal Care, Mom & Baby Care, Brands, By Ingredient + chevrons; "Get Consultation" button) | in `317:339` | 96 | 1440 × ~48 |
| 1c | Hero slider ("New Skin Care Products / Shop Your Best Skin Care Products", Explore Products, 3 pagination dots, 20% discount badge) | in `317:339` | ~144 | 1440 × ~532 |
| 2 | Top Categories (6 circular images + "View all") | `317:490` | 772 | 1281 × 356 |
| 3 | Consultation banner ("Get Your Best Skincare Consultant", Book Appointment) | `317:483` | 1224 | 1280 × 488 |
| 4 | Featured Products (6 cards + View all) | `317:514` | 1808 | 1280 × 475 |
| 5 | Shop By Popular Brands (14 logos, 2 rows) | `317:645` | 2379 | 1441 × 306 |
| 6 | New Arrivals (12 cards, 2 rows + View all) | `317:648` | 2749 | 1280 × 899 |
| 7 | CTA: 2 promo banners (Shop Now) | `317:1291` | 3744 | 1278 × 488 |
| 8 | Best Selling (18 cards, 3 rows + View all) | `317:906` | 4328 | 1280 × 1323 |
| 9 | Bottom CTA: newsletter ("Subscribe our Newsletter", $25 coupon) | `317:1456` | 5763 | 1440 × 248 |
| 10 | Footer (logo, blurb, socials; Company; Customer service; Download Our App badges; copyright) | `317:1507` | 6091 | 1440 × 450 |

## 3. Landing (`143:64`) section map

Announcement bar, Header variant (Shop, Consultation, Services▾, Surveys, FAQ, Blog, Login, Get Started), Hero ("Your skincare routine is a bank account…", Book Appointment / How it Works), Why consultation (`172:3154`), Consultations cards Skin/Hair/Feeding (`143:484`), How It Works (`146:1055`), Our Story (`153:1425`), Privacy Protection (`153:1437`), Our Consultants (`143:621`), Testimonials carousel (`143:706`), Footer variant with newsletter (`143:766`).

---

## 4. Components

### Present in Figma

| Component | Where | States designed |
|---|---|---|
| Header / Navbar (storefront) | Home | default only |
| Header (consultation variant) + announcement bar | Landing | default |
| Category nav bar with dropdown chevrons | Home | closed only (no open dropdown/mega menu) |
| Search with category select | Home | default |
| Icon button with count badge (compare, wishlist, cart) | Home | count "0" |
| Hero slider + dot pagination | Home | slide 1 only |
| Category circle tile | Home | default |
| ProductCard (image, title, description, "500+ Sold", rating, price, Buy Now pill + plus icon) | Home | default only |
| Section header (H + "View all" outline button) | Home | default |
| Brand logo tile | Home | default |
| Promo banner card | Home | default |
| Newsletter input + Subscribe | Home, Landing | default |
| Footer (2 variants) | Home, Landing | default |
| Buttons: Primary / Secondary / Tertiary / Disabled / State (3 sizes) | Style Guide | default, disabled |
| Dark buttons: Get Started, Get Started→, Get Consultation, Book Appointment, How it Works, Learn More | Style Guide | dark + light-tint pairs |
| Chip / status tags (Success, Failed, Pending, Refund, Unpaid) | Style Guide | — |
| Toggle, Checkbox, Radio | Style Guide | on state |
| Input / Textarea / Label | Question, Style Guide | default with placeholder |
| Modal (Ask Us A Question over blurred page) | Questions 1 | open |
| Pricing card (Standard / Pro Business / Enterprise) | Style Guide | default + highlighted |
| Consultation card, step card, consultant card, testimonial card | Landing | default |
| Rating (star + score) | Home, Landing | default |

### Requested in the brief but **not designed** in Figma

MegaMenu, Badge (sale), PriceTag with sale price, QuantityStepper, Breadcrumb, Tabs, Accordion, Select (beyond "All Category"), Drawer (cart / mobile menu), Toast, Pagination (numbered), FilterSidebar, product gallery, variant picker. Hover, focus, active and loading states are not designed for any component.

---

## 5. Design tokens (from Figma variables)

Note: Figma `letterSpacing: 0.5` is **percent** (0.5% → 0.08px at 16px, matching the generated code).

### Colors

| Figma variable | Value | Semantic token |
|---|---|---|
| Main Colors/Primary | `#C9E8EA` | `--color-primary-tint` (nav bar, light buttons) |
| Primary (Home page) | `#3CB9D1` | `--color-primary` ("500+ Sold", links) |
| Main Color/Primary (Style Guide buttons) | `#1AA9E5` | `--color-brand-blue` |
| Main Colors/Secondary | `#FAE1D8` | `--color-secondary` |
| Main Colors/Accent | `#414042` | `--color-accent` (dark buttons, search border) |
| Main Colors/Neautral, Secondary/white | `#FFFFFF` | `--color-surface` |
| Additional Colors/White | `#FEFEFE` | `--color-on-accent` |
| Additional Colors/Black, Text | `#202020` | `--color-text` |
| Additional Colors/Orange | `#FF784B` | `--color-highlight` ("skincare" headline word) |
| Additional Colors/Purple | `#936DFF` | `--color-purple` |
| Additional Colors/Line | `#E3E7EC` | `--color-line` |
| Additional Colors/Line dark | `#282837` | `--color-line-dark` |
| Alerts/Success | `#00C566` | `--color-success` |
| Alerts/Error | `#E53935` | `--color-error` |
| Alerts/Warning | `#FACC15` | `--color-warning` |
| Grayscale 10 / 20 / 30 / 40 / 50 | `#FDFDFD` `#ECF1F6` `#E3E9ED` `#D1D8DD` `#BFC6CC` | `--color-gray-10…50` |
| Grayscale 60 / 70 / 80 / 90 / 100 | `#9CA4AB` `#78828A` `#66707A` `#434E58` `#171725` | `--color-gray-60…100` |
| (raw, not variables) | `#F8F8F8`, black at 8 / 48 / 64 / 72 / 80% | `--color-surface-muted`, `--color-border`, `--color-text-placeholder`, `--color-text-muted`… |

### Typography

Families: **Poppins** (headlines), **Source Serif Pro** (body; one style references "Source Serif 4"), **Open Sans** (search placeholder), **Plus Jakarta Sans** (Style Guide labels).

| Token | Family / weight | Size / line-height |
|---|---|---|
| H1 bold / semibold / medium | Poppins 700 / 600 / 500 | 56 / 64 (medium 56/56) |
| H2 semibold / medium | Poppins 600 / 500 | 48 / 56 |
| H3 bold / semibold / medium | Poppins 700 / 600 / 500 | 40 / 48 |
| H4 bold / semibold / medium | Poppins 700 / 600 / 500 | 32 / 40 |
| H5 bold / semibold / medium | Poppins 700 / 600 / 500 | 24 / 32 |
| H6 bold / semibold / medium | Poppins 700 / 600 / 500 | 20 / 28 |
| Body XL bold / semibold / regular | Source Serif Pro 700 / 600 / 400 | 18 / 30 |
| Body L bold / semibold / regular | Source Serif Pro 700 / 600 / 400 | 16 / 28 (semibold 16/100%) |
| Body M bold / semibold / regular | Source Serif Pro 700 / 600 / 400 | 14 / 26 (semibold 14/100%) |
| Body S bold / semibold / regular | Source Serif Pro 700 / 600 / 400 | 12 / 24 (regular 12/20) |
| Body XS bold / semibold / regular | Source Serif Pro 700 / 600 / 400 | 10 / 24 (others 10/22) |
| Paragraph 16 | Open Sans 400 | 16 / 1.5 |
| Label L / M / S | Plus Jakarta Sans 600 | 16/24, 14/22, 12/20 |

All letter-spacing 0.5% unless noted (Paragraph 16 and Caption 18/30 are 0).

Note: the Style Guide labels say "H1 Bold/48px", "H2 40px"… but the variables (and the pages) use H1 = 56, H2 = 48. Variables win.

### Radius, shadow, spacing (from node styles, not variables)

| Token | Value | Seen on |
|---|---|---|
| `--radius-sm` | 2px | search category segment |
| `--radius-md` | 4px | search field, product card, buttons |
| `--radius-pill` | 60px | Buy Now pill |
| `--radius-full` | 9999px | category circles, badges |
| `--shadow-card` | `drop-shadow(8px 8px 16px rgba(0,0,0,.04))` | product card |
| `--border-width-field` | 1.2px | search field |
| Spacing scale (observed) | 4, 8, 10, 14, 16, 20, 24, 32, 48, 64, 96 | gaps / paddings |

More radius/shadow values (modal, promo banners) will be read per section in Phase 3.

---

## 6. Layout and breakpoints

- Only **one breakpoint is designed: desktop 1440px**. No mobile or tablet frames.
- Container: 1280px content width, 80px side gutters (Navbar inner row uses 78px / 1284px).
- Product grid: 6 columns × 200px, 16px gap.
- Header: 96px navbar + category bar.

---

## 7. Assets to export

Logo (PNG), US flag, header icons (compare, heart, cart, account, chevrons — SVG), hero product photo, 6 category photos, consultation banner photo, ~36 product photos, 14 brand logos, 2 promo banners, newsletter background, social icons, App Store / Google Play badges, Landing illustrations and photos, star SVG, plus-circle SVG.
