# Home "Shop By Popular Brands" — Figma spec (317:645)

Source: Figma `IZu9OqsPkarImQz9n31q42`, frame **Brands 317:645** under Home 317:338 (1441 × 306 at page x −1, y 2379).
The section contains only two layers: the heading **317:646** and **one raster, 317:647 "image 8"**. That image is a screenshot that holds all 14 tiles, borders and logos. There are no per-logo nodes, so tile and logo geometry below is **measured from the raster's pixels**.
Raster: source 1705 × 659, fill CROP, transform [[0.922,0,0.018],[0,0.381,0.602]] → visible source region 1572 × 251 drawn at 1441 × 239 (scale 0.9167; 1.0909 source px per CSS px). Measured on a native-resolution render (scale 1572/1441). Coordinates are page px at 1440 (section top = 2379).
No "View All" button exists in this section in Figma.

| Node    | Layer                                | x               | y               | w      | h      | Font                                     | Color   | Radius | Border                                     | Shadow | Notes                                                                                                           |
| ------- | ------------------------------------ | --------------- | --------------- | ------ | ------ | ---------------------------------------- | ------- | ------ | ------------------------------------------ | ------ | --------------------------------------------------------------------------------------------------------------- |
| 317:645 | Brands (frame)                       | −1              | 2379            | 1441   | 306    | —                                        | no fill | 0      | —                                          | —      | section padding: none. Next section starts 64 px below (2749)                                                   |
| 317:646 | "Shop By Popular Brands" (fixed box) | 80              | 2379            | 499    | 51     | Poppins / 600 / 40 / 48 / 0.5 % (0.2 px) | #202020 | —      | —                                          | —      | text top-aligned in the 51 px box                                                                               |
| 317:647 | image 8 (raster)                     | −1              | 2430            | 1441   | 239    | —                                        | raster  | 0      | —                                          | —      | contains the grid below                                                                                         |
| —       | grid (measured)                      | 76              | 2456.6          | 1280   | 184.25 | —                                        | —       | —      | —                                          | —      | 7 columns × 2 rows; column gap 14, row gap 13.75; starts 4 px left of the 80 px gutter (raster offset in Figma) |
| —       | tile (each, measured)                | 76 + n × 184.86 | 2456.6 / 2555.6 | 170.86 | 85.25  | —                                        | #FFFFFF | 2      | 1 px #E2E5E9 (`--color-brand-tile-border`) | none   | logo centred in the tile; no grayscale or opacity treatment (logos in full colour)                              |

## Logos (Figma order, measured ink box in CSS px, centre relative to the tile's top-left)

| #   | Brand      | Logo ink w × h | Centre x, y in tile | File                                   |
| --- | ---------- | -------------- | ------------------- | -------------------------------------- |
| 1   | Anycubic   | 105.4 × 16.5   | 84.8, 43.1          | `public/images/brands/01-anycubic.png` |
| 2   | BIQU       | 62.3 × 54.1    | 85.3, 42.6          | `02-biqu.png`                          |
| 3   | BCN3D      | 107.3 × 29.3   | 84.8, 44.0          | `03-bcn3d.png`                         |
| 4   | Creality   | 112.8 × 16.5   | 84.8, 43.1          | `04-creality.png`                      |
| 5   | WASP       | 104.5 × 34.8   | 87.1, 41.3          | `05-wasp.png`                          |
| 6   | Elegoo     | 100.8 × 21.1   | 87.1, 41.7          | `06-elegoo.png`                        |
| 7   | Flashforge | 108.2 × 29.3   | 84.3, 43.1          | `07-flashforge.png`                    |
| 8   | Formbot    | 73.3 × 56.8    | 87.1, 35.8          | `08-formbot.png`                       |
| 9   | Formlabs   | 102.7 × 16.5   | 85.3, 42.2          | `09-formlabs.png`                      |
| 10  | MakerBot   | 112.8 × 23.8   | 84.8, 42.2          | `10-makerbot.png`                      |
| 11  | Modix      | 92.6 × 33.0    | 85.7, 43.1          | `11-modix.png`                         |
| 12  | Phrozen    | 115.5 × 28.4   | 85.3, 42.6          | `12-phrozen.png`                       |
| 13  | Tiertime   | 110.9 × 26.6   | 85.7, 42.6          | `13-tiertime.png`                      |
| 14  | Ultimaker  | 108.2 × 22.0   | 86.2, 43.1          | `14-ultimaker.png`                     |

Each file is the **full tile interior** (183–184 × 89 source px) cropped from the native render, so every logo keeps its exact Figma size and offset inside the tile. Resolution: **1.08× of the rendered tile** (the raster's own resolution in Figma); a true 2× does not exist in the file.

## Implementation notes

- `components/sections/PopularBrands.tsx` renders real HTML tiles from `data/brands.ts` (`{ slug, name, logo: { src, width, height }, href }`); logo `alt` = brand name; logos `object-contain` in the tile interior, so any replacement logo also fits.
- 768–1439: same 7 × 2 grid with the tile aspect kept (171:85); <768: 2 columns.
