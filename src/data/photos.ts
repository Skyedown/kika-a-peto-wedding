export type CollageSlot = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i';

export interface CollagePhoto {
  src: string;
  slot: CollageSlot;
  /** Zvisle tazisko tvari v % - drzi hlavy v zabere pri object-fit: cover. */
  focus: number;
}

// Irregular photo collage framing the footer. Each photo comes from a different
// day so the nine frames never read as one repeated moment.
export const footerCollage: CollagePhoto[] = [
  { src: '/bw-photos/bw-02.webp', slot: 'a', focus: 61 },
  { src: '/photos/photo-07.webp', slot: 'b', focus: 78 },
  { src: '/bw-photos/bw-01.webp', slot: 'c', focus: 18 },
  { src: '/photos/photo-10.webp', slot: 'd', focus: 42 },
  { src: '/bw-photos/bw-03.webp', slot: 'e', focus: 50 },
  { src: '/bw-photos/bw-05.webp', slot: 'f', focus: 50 },
  { src: '/photos/photo-04.webp', slot: 'g', focus: 50 },
  { src: '/bw-photos/bw-04.webp', slot: 'h', focus: 9 },
  { src: '/photos/photo-09.webp', slot: 'i', focus: 24 },
];

export interface InstaxShot {
  src: string;
  caption?: string;
}

// Instant photos tucked into the corners of the content panels.
export const scheduleInstax: InstaxShot[] = [
  { src: '/photos/instax/instax-01.webp', caption: '#KikaAPeto2027' },
  { src: '/photos/instax/instax-02.webp' },
];

export const faqInstax: InstaxShot[] = [
  { src: '/photos/instax/instax-04.webp' },
  { src: '/photos/instax/instax-05.webp' },
  { src: '/photos/instax/instax-03.webp', caption: 'Kika & Peťo' },
];

export const detailsInstax: InstaxShot[] = [
  { src: '/photos/instax/instax-06.webp' },
  { src: '/photos/instax/instax-07.webp' },
];

export const stayInstax: InstaxShot[] = [
  { src: '/photos/instax/instax-08.webp' },
  { src: '/photos/instax/instax-09.webp' },
];

export const giftInstax: InstaxShot[] = [
  { src: '/photos/instax/instax-10.webp' },
  { src: '/photos/instax/instax-11.webp', caption: 'Ďakujeme' },
];
