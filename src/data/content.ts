// ───────── SITE CONTENT ─────────
// All copy for the data-driven sections lives here so the organisms stay
// presentational. Values mirror the approved design 1:1.

export interface WeddingEvent {
  icon: 'church' | 'toast' | 'dinner';
  title: string;
  time: string;
  venue: string;
  address?: string;
}

export interface ScheduleEntry {
  time: string;
  date?: string;
  title: string;
  location?: string;
  duration?: string;
  detail?: string;
}

export interface Hotel {
  name: string;
  meta: string;
  mapUrl: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export const events: WeddingEvent[] = [
  {
    icon: 'toast',
    title: 'Príchod do stanu',
    time: '14:30',
    venue: 'Svadobný stan - Oščadnica',
    address: 'Vstup / welcome zóna',
  },
  {
    icon: 'church',
    title: 'Obrad na záhrade',
    time: '15:30',
    venue: 'Svadobný stan - Oščadnica',
  },
  {
    icon: 'dinner',
    title: 'Hlavné jedlo',
    time: '17:00',
    venue: 'Svadobný stan - Oščadnica',
    address: 'Hlavná sála',
  },
];

export const schedule: ScheduleEntry[] = [
  {
    time: '14:30',
    date: '4. 6. 2027',
    title: 'Príchod do stanu',
    location: 'Vstup / welcome zóna',
    detail: 'Príchod hostí, uvítanie a prvé usadenie.',
  },
  { time: '15:30', title: 'Obrad na záhrade' },
  {
    time: '16:00',
    title: 'Uvítací ceremoniál',
    detail: 'Príhovor a otvorenie svadobného programu.',
  },
  {
    time: '16:30',
    title: 'Príchod do sály',
    location: 'Hlavná sála',
    detail: 'Presun hostí do sály a usadenie.',
  },
  {
    time: '17:00',
    title: 'Hlavné jedlo',
    location: 'Hlavná sála',
    detail: 'Servírovanie hlavného menu.',
  },
  {
    time: '18:00',
    title: 'Roznášanie dobrôt + Candybar',
    location: 'Sála / candybar zóna',
    detail: 'Sladké a drobné občerstvenie pre hostí.',
  },
  {
    time: '18:30',
    title: 'Prvý tanec',
    location: 'Tanečný parket',
    detail: 'Otvorenie tanečnej zábavy.',
  },
  {
    time: '21:00',
    title: 'Uvoľnená atmosféra, svadobná hra',
    location: 'Sála',
    detail: 'Interaktívna hra pre hostí.',
  },
  {
    time: '10:00',
    date: '5. 6. 2027',
    title: 'Spoločné raňajky v Centre poznávania (voliteľné)',
    detail:
      'Pre tých, ktorí zostávajú cez noc, ráno sa stretneme na spoločných raňajkách v Centre poznávania v Oščadnici. Bude to skvelá príležitosť sa ešte raz stretnúť, poďakovať a rozlúčiť sa.',
  },
];

export const hotels: Hotel[] = [
  {
    name: 'Centrum poznávania - Oščadnica',
    // Zlom je zamerny - renderuje sa cez white-space: pre-line.
    meta: `300m · priamo pri mieste
      konania · 15 €/noc`,
    mapUrl: 'https://maps.app.goo.gl/xxiQkYJMk2AaEC5g6',
  },
];

export const faqs: FaqEntry[] = [
  {
    question: 'Môžem prísť s partnerom/partnerkou?',
    answer:
      'Vaša pozvánka uvádza mená pozvaných hostí. Ak by ste chceli prísť v sprievode, napíšte nám prosím — radi to spolu doladíme.',
  },
  {
    question: 'Sú deti vítané?',
    answer: 'Milujeme deti, no náš večer plánujeme ako oddych pre dospelých.',
  },
  {
    question: 'Čo si obliecť?',
    answer: 'Elegantné spoločenské oblečenie. Odtiene bielej a krémovej prosím nechajme neveste {{heart}}',
  },
  {
    question: 'Kde sa dá parkovať?',
    answer: 'Priamo v areáli ubytovania alebo pri ceste popri svadobnom stane.',
  },
  {
    question: 'Do koľkej trvá oslava?',
    answer: 'Tancovať a oslavovať budeme do skorých ranných hodín.',
  },
  {
    question: 'Kedy mám potvrdiť účasť?',
    answer:
      'Prosíme o potvrdenie najneskôr do 30. apríla 2027 cez tlačidlo RSVP vo vašej pozvánke. Formulár vyplňte za pár/rodinu, nie samostatne za každú osobu.',
  },
];

// Couple / event constants reused across sections.
export const COUPLE_NAMES = ['Kika', 'Peťo'] as const;
export const WEDDING_DATE_SHORT = '04 · 06 · 2027';
export const WEDDING_DATE_LONG = '4. júna 2027';
export const WEDDING_DATE_NUMERIC = '4.6.2027';
export const WEDDING_DATE_ISO = '2027-06-04T15:30:00+02:00';
export const VENUE = 'Svadobný stan - Oščadnica';
export const VENUE_MAP_URL = 'https://maps.app.goo.gl/Hw8vkH1oWmBVKbNp9';
export const HASHTAG = '#KikaAPeto2027';
