/*
 * "Shop By Popular Brands" (317:645), in Figma order. Swap brands here: the tiles,
 * filters, mega menu and product brand fields all read from this list.
 *
 * `logo` points at a tile-interior crop of the Figma raster 317:647 (1.08x of the
 * rendered tile, the source resolution in Figma). Any logo image works: it is
 * scaled to fit the tile interior (object-contain).
 */
export type Brand = {
  slug: string;
  name: string;
  logo: { src: string; width: number; height: number };
  href: string;
};

const figma = (n: number, slug: string, name: string, width = 183): Brand => ({
  slug,
  name,
  logo: { src: `/images/brands/${String(n).padStart(2, "0")}-${slug}.png`, width, height: 89 },
  href: `/shop?brand=${slug}`,
});

export const brands: Brand[] = [
  figma(1, "anycubic", "Anycubic"),
  figma(2, "biqu", "BIQU"),
  figma(3, "bcn3d", "BCN3D", 184),
  figma(4, "creality", "Creality", 184),
  figma(5, "wasp", "WASP"),
  figma(6, "elegoo", "Elegoo"),
  figma(7, "flashforge", "Flashforge"),
  figma(8, "formbot", "Formbot"),
  figma(9, "formlabs", "Formlabs"),
  figma(10, "makerbot", "MakerBot", 184),
  figma(11, "modix", "Modix", 184),
  figma(12, "phrozen", "Phrozen"),
  figma(13, "tiertime", "Tiertime"),
  figma(14, "ultimaker", "Ultimaker"),
];
