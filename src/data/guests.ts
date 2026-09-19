// ───────── GUEST DATA ─────────
// Pridajte každý pozvaný pár / rodinu sem.
//   slug  : časť URL — malé písmená, bez medzier (pomlčky). Hosťovi pošlite: vasadresa.sk/<slug>
//   names : personalizovaný pozdrav na pozvánke
//   form  : individuálny Google Forms odkaz (vynechajte → použije sa DEFAULT_FORM_URL)

export type Gender = 'm' | 'f';

export interface Guest {
  slug: string;
  names: string;
  form?: string;
  /** Gender of a single-person invite — used for correct Slovak greeting (Milý vs Milá). */
  gender?: Gender;
}

export const DEFAULT_FORM_URL = 'https://forms.gle/zhZPPSxMZCJvsz4e8' as const;

export const guests: Guest[] = [
  { slug: 'tvoja-pozvanka', names: 'Tvoja pozvánka' },

  // Rodina Peto
  { slug: 'monca-a-dodo', names: 'Monča & Dodo' },
  { slug: 'vlada-a-vladko', names: 'Dadina & Vladko' },
  { slug: 'lenka-a-martin', names: 'Lenka & Martin' },
  { slug: 'marcelka-a-vladko', names: 'Marcelka & Vladko' },
  { slug: 'terka', names: 'Terka', gender: 'f' },

  // Rodina Kika
  { slug: 'nika-a-mato', names: 'Nika & Maťo s rodinou' },
  { slug: 'simka-a-jojo', names: 'Simka & Jojo s rodinou' },
  { slug: 'marci-a-jozi', names: 'Marci & Joži' },
  { slug: 'renca-a-miri', names: 'Renča & Miri' },
  { slug: 'lenka', names: 'Lenka', gender: 'f' },
  { slug: 'mirko-a-miska', names: 'Mirko & Miška' },
  { slug: 'slavko-a-kika', names: 'Slavko & Kika' },
  { slug: 'matka-a-peto', names: 'Maťka & Peťo' },
  { slug: 'petko', names: 'Peťko', gender: 'm' },
  { slug: 'danka-a-peto', names: 'Danka & Peťo' },
  { slug: 'janka-a-lubko', names: 'Janka & Ľubko' },
  { slug: 'olinka', names: 'Olinka', gender: 'f' },

  // Kamarati Peto
  { slug: 'helenka-a-marek', names: 'Helenka & Marek' },
  { slug: 'radka-a-mirko', names: 'Radka & Mirko' },
  { slug: 'anetka-a-viktor', names: 'Anetka & Viktor' },
  { slug: 'mikky', names: 'Mikky', gender: 'm' },
  { slug: 'ivo-tien', names: 'Ivo Tieň', gender: 'm' },
  { slug: 'radka-a-filip', names: 'Radka & Filip' },
  { slug: 'misa-a-brotas', names: 'Míša & Broťas' },
  { slug: 'niku', names: 'Nikolka', gender: 'f' },
  { slug: 'petka-marko', names: 'Peťka & Marko' },
  { slug: 'mato', names: 'Matej', gender: 'm' },
  { slug: 'kubo', names: 'Kubo', gender: 'm' },
  { slug: 'milan', names: 'Milan', gender: 'm' },
  { slug: 'adrian', names: 'Adrian', gender: 'm' },

  // Kamarati Kika
  { slug: 'vejka-a-matus', names: 'Vejka & Matúš' },
  { slug: 'simka-a-oliver', names: 'Simka & Oliver' },
  { slug: 'kika-a-maros', names: 'Kika & Maroš' },
  { slug: 'saska-a-erik', names: 'Saška & Erik' },
  { slug: 'bajka-a-matko', names: 'Bajka & Maťko' },
  { slug: 'kika-a-brano', names: 'Kika & Braňo' },
  { slug: 'ivka-a-palino', names: 'Ivka & Palino' },
  { slug: 'viv', names: 'Viv', gender: 'f' },
  { slug: 'danka', names: 'Danka', gender: 'f' },
];

export const findGuest = (slug: string): Guest | undefined =>
  guests.find((guest) => guest.slug.toLowerCase() === slug.toLowerCase());

export const resolveFormUrl = (guest: Guest): string => guest.form ?? DEFAULT_FORM_URL;
