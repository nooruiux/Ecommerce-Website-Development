import manifest from "./asset-manifest.json";

const available = new Set<string>(manifest);

export const hasAsset = (src: string) => available.has(src);

// Figma exports (see docs/design-inventory.md §7). Sizes are the Figma frame sizes.
export const brandAssets = {
  logo: { src: "/images/brand/logo.png", width: 284, height: 61 }, // 317:344
  flagUs: { src: "/images/brand/flag-us.png", width: 18, height: 14 }, // 317:357
  appStore: { src: "/images/brand/app-store.png", width: 148, height: 44 }, // 317:1322
  googlePlay: { src: "/images/brand/google-play.png", width: 148, height: 44 }, // 317:1395
} as const;

export const homeAssets = {
  hero: { src: "/images/home/hero.webp", width: 589, height: 532 }, // 317:435
  consultation: { src: "/images/home/consultation.webp", width: 1280, height: 488 }, // 317:484
  ctaLeft: { src: "/images/home/cta-white-firm-face.webp", width: 622, height: 488 }, // 317:1294
  ctaRight: { src: "/images/home/cta-bright-soft.webp", width: 624, height: 488 }, // 317:1297
  newsletter: { src: "/images/home/newsletter.webp", width: 1440, height: 248 }, // 317:1458
  newsletterCart: { src: "/images/home/newsletter-cart.png", width: 110, height: 70 }, // 317:1467
  newsletterHand: { src: "/images/home/newsletter-hand.png", width: 107, height: 72 }, // 317:1468
} as const;
