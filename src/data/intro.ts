// Envelope intro assets (generated in Higgsfield). Each orientation has its own
// encode — the portrait file is never served to desktop and vice versa.
export type IntroVariantName = 'portrait' | 'landscape';

export interface IntroVariant {
  name: IntroVariantName;
  poster: string;
  endFrame: string;
  sources: IntroVideoSource[];
  zoom?: IntroZoom;
}

export interface IntroVideoSource {
  src: string;
  type: string;
}

// Niektore videa odzoomuju z prveho zaberu na koncovy. Namerali sme, ze je to
// cisty zoom okolo pevneho bodu, takze venovanie a lesk staci scalovat rovnakou
// transformaciou - drzia sa obalky bez toho, aby sa cokolvek prelayoutovalo.
export interface IntroZoom {
  /** Dlzka odzoomovania v sekundach; zvysok videa uz stoji. */
  duration: number;
  /** Exponent spomalovania: progress = 1 - (1 - x)^ease. */
  ease: number;
  /** Pevny bod zoomu v % ramca. */
  originX: number;
  originY: number;
  /** Mierka, na ktorej zoom skonci. */
  scaleX: number;
  scaleY: number;
}

// Assety v public/ sa servíruju bez hashu, takze prehliadac aj Cloudflare si ich
// drzia v cache pod rovnakym nazvom. Po kazdej vymene videa alebo snimkov zvys
// toto cislo - inak sa hostom moze zobrazit stara verzia (napr. iny monogram).
const ASSET_VERSION = '6';
const v = (path: string): string => `${path}?v=${ASSET_VERSION}`;

export const introVariants: Record<IntroVariantName, IntroVariant> = {
  portrait: {
    name: 'portrait',
    poster: v('/intro/envelope-portrait-poster.webp'),
    endFrame: v('/intro/envelope-portrait-end.webp'),
    sources: [{ src: v('/intro/envelope-portrait.mp4'), type: 'video/mp4' }],
    zoom: { duration: 4.21, ease: 1.54, originX: 49.34, originY: 51.46, scaleX: 0.7884, scaleY: 0.7799 },
  },
  landscape: {
    name: 'landscape',
    poster: v('/intro/envelope-landscape-poster.webp'),
    endFrame: v('/intro/envelope-landscape-end.webp'),
    sources: [{ src: v('/intro/envelope-landscape.mp4'), type: 'video/mp4' }],
  },
};

export const LANDSCAPE_QUERY = '(orientation: landscape)';
