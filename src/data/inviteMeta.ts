import { WEDDING_DATE_NUMERIC } from './content';
import type { Guest } from './guests';

// Pozvanka pre jedneho hosta vs. pre par - slug parov obsahuje "-a-". Drzime to
// na jednom mieste, aby oslovenie na stranke a v nahlade odkazu nikdy nesedelo
// inak.
export const isSingularInvite = (guest: Guest): boolean => !guest.slug.includes('-a-');

// Popis pre Open Graph. Crawleri (WhatsApp, Messenger, FB) nespustia React,
// takze tento text sa do HTML vklada pri builde - viz plugin v vite.config.ts.
export function inviteOgDescription(guest: Guest): string {
  const pronoun = isSingularInvite(guest) ? 'Ťa' : 'Vás';
  return `Pozývame ${pronoun}, ${guest.names}, na našu svadbu ${WEDDING_DATE_NUMERIC}.`;
}
