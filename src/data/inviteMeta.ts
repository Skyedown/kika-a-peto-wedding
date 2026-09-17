import { COUPLE_NAMES, WEDDING_DATE_LONG, WEDDING_DATE_NUMERIC } from './content';
import type { Guest } from './guests';

// Pozvanka pre jedneho hosta vs. pre par. Slug parov zvycajne obsahuje "-a-",
// ale nie vzdy (napr. "petka-marko"), tak sa pozerame aj na meno - "&" v nom
// znamena viac ludi. Drzime to na jednom mieste, aby oslovenie na stranke a v
// nahlade odkazu nikdy nesedelo inak.
export const isSingularInvite = (guest: Guest): boolean => !guest.slug.includes('-a-') && !guest.names.includes('&');

// Open Graph pre osobnu pozvanku. Crawleri (WhatsApp, Messenger, FB) nespustia
// React, takze tieto texty sa do HTML vkladaju pri builde - viz plugin v
// vite.config.ts. Oslovenie ide do titulku, pretoze to je v nahlade odkazu ten
// tucny riadok, ktory hosta zaujme; par a datum ostavaju pod nim.
export function inviteOgTitle(guest: Guest): string {
  const pronoun = isSingularInvite(guest) ? 'Ťa' : 'Vás';
  return `Pozývame ${pronoun}, ${guest.names}, na našu svadbu ${WEDDING_DATE_NUMERIC}.`;
}

export const INVITE_OG_DESCRIPTION = `${COUPLE_NAMES.join(' & ')} — Svadba ${WEDDING_DATE_LONG}`;
