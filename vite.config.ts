import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { guests } from './src/data/guests';
import { INVITE_OG_DESCRIPTION, inviteOgTitle } from './src/data/inviteMeta';

const escapeAttribute = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const OG_TITLE = /(<meta property="og:title" content=")[^"]*(")/;
const OG_DESCRIPTION = /(<meta property="og:description" content=")[^"]*(")/;
const OG_IMAGE = /(<meta property="og:image" content=")([^"]*)(")/;

// og:image musi byt absolutna URL - relativnu WhatsApp nevyhodnoti a spadne na
// apple-touch-icon. Na Verceli domenu poznam z build prostredia, inak sa da dat
// cez VITE_SITE_URL.
function resolveSiteUrl(): string | undefined {
  const explicit = process.env.VITE_SITE_URL ?? process.env.SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, '');
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return vercel ? `https://${vercel}` : undefined;
}

// Nahlad odkazu vykresluju crawleri, ktori nespustia JavaScript - meniť og:*
// z Reactu je teda zbytocne. Kazdemu hostovi preto pri builde vyrobime vlastny
// index.html s jeho popisom. Staticky subor ma prednost pred SPA rewrite, takze
// /helenka-a-marek dostane svoju verziu a appka sa nabootuje uplne rovnako.
function prerenderInviteMeta(): Plugin {
  return {
    name: 'prerender-invite-meta',
    apply: 'build',
    async closeBundle() {
      const outDir = fileURLToPath(new URL('./dist', import.meta.url));
      const indexPath = join(outDir, 'index.html');
      let shell = await readFile(indexPath, 'utf8');

      for (const [name, pattern] of [
        ['og:title', OG_TITLE],
        ['og:description', OG_DESCRIPTION],
        ['og:image', OG_IMAGE],
      ] as const) {
        if (!pattern.test(shell)) {
          throw new Error(`prerender-invite-meta: v index.html chyba <meta property="${name}">.`);
        }
      }

      const siteUrl = resolveSiteUrl();
      if (siteUrl) {
        shell = shell.replace(OG_IMAGE, (_m, open: string, src: string, close: string) =>
          src.startsWith('http') ? `${open}${src}${close}` : `${open}${siteUrl}${src}${close}`,
        );
        await writeFile(indexPath, shell);
      } else {
        this.warn(
          'og:image ostava relativna - WhatsApp ju zahodi a ukaze favicon. Nastav VITE_SITE_URL (na Verceli sa domena doplni sama).',
        );
      }

      for (const guest of guests) {
        const html = shell
          .replace(OG_TITLE, `$1${escapeAttribute(inviteOgTitle(guest))}$2`)
          .replace(OG_DESCRIPTION, `$1${escapeAttribute(INVITE_OG_DESCRIPTION)}$2`);
        await mkdir(join(outDir, guest.slug), { recursive: true });
        await writeFile(join(outDir, guest.slug, 'index.html'), html);
      }

      this.info(`vygenerovanych ${guests.length} pozvanok${siteUrl ? ` (og:image -> ${siteUrl})` : ''}`);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), prerenderInviteMeta()],
  resolve: {
    alias: {
      '@atoms': fileURLToPath(new URL('./src/components/atoms', import.meta.url)),
      '@molecules': fileURLToPath(new URL('./src/components/molecules', import.meta.url)),
      '@organisms': fileURLToPath(new URL('./src/components/organisms', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
    },
  },
});
