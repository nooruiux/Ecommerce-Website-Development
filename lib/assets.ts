import manifest from "./asset-manifest.json";

const available = new Set<string>(manifest);

export const hasAsset = (src: string) => available.has(src);

// Figma exports (see docs/design-inventory.md §7). Sizes are the Figma frame sizes.
export const brandAssets = {
  logo: { src: "/images/brand/logo.png", width: 284, height: 61 }, // 317:344
  logoLanding: { src: "/images/brand/logo.png", width: 300, height: 47 }, // 143:70, cropped (object-cover)
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

// Landing frame 143:64
export const landingAssets = {
  heroIllustration: { src: "/images/consultation/hero-illustration.webp", width: 646, height: 424 }, // 143:88 (2x render; 111KB as SVG)
  whyPhoto: { src: "/images/consultation/why-photo.webp", width: 490, height: 515 }, // 148:1195
  howConnector: { src: "/images/consultation/how-connector.svg", width: 917, height: 87 }, // 143:566
  storyPhoto: { src: "/images/consultation/story-photo.webp", width: 333, height: 349 }, // 143:543
  storyAvatarA: { src: "/images/consultation/story-avatar-a.webp", width: 40, height: 40 }, // 143:548
  storyAvatarB: { src: "/images/consultation/story-avatar-b.webp", width: 40, height: 40 }, // 143:553
  privacy: { src: "/images/consultation/privacy.webp", width: 590, height: 388 }, // 148:1135
} as const;
