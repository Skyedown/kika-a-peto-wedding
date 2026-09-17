import type { Gender } from '@data/guests';

export interface InviteCopy {
  eyebrow: string;
  salutation: string;
  text: string;
}

const PLURAL_TEXT =
  'S radosťou Vás pozývame na náš svadobný deň s hostinou, ktoré sa budú konať 4.6.2027 vo svadobnom stane v Oščadnici. Vaša prítomnosť by nám urobila obrovskú radosť. Zároveň Vás prosíme o potvrdenie účasti pomocou tlačidla nižšie, aby sme mohli všetko dokonale naplánovat. Ďalšie informace o svadbe nájdete na tejto webovej stránke nižšie.';

const SINGULAR_TEXT =
  'S radosťou Ťa pozývame na náš svadobný deň s hostinou, ktoré sa budú konať 4.6.2027 vo svadobnom stane v Oščadnici. Tvoja prítomnosť by nám urobila obrovskú radosť. Zároveň ťa prosíme o potvrdenie účasti pomocou tlačidla nižšie, aby sme mohli všetko dokonale naplánovat. Ďalšie informace o svadbe nájdeš na tejto webovej stránke nižšie.';

const SINGULAR_FORMS: Record<Gender | 'unknown', Pick<InviteCopy, 'eyebrow' | 'salutation'>> = {
  m: { eyebrow: 'Si srdečne pozvaný', salutation: 'Milý' },
  f: { eyebrow: 'Si srdečne pozvaná', salutation: 'Milá' },
  unknown: { eyebrow: 'Si srdečne pozvaný/á', salutation: 'Milý/á' },
};

export function getInviteCopy(singular: boolean, gender: Gender | undefined): InviteCopy {
  if (!singular) {
    return { eyebrow: 'Ste srdečne pozvaní', salutation: 'Milí', text: PLURAL_TEXT };
  }
  return { ...SINGULAR_FORMS[gender ?? 'unknown'], text: SINGULAR_TEXT };
}
