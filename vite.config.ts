import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { guests } from './src/data/guests';
import { inviteOgDescription } from './src/data/inviteMeta';

const escapeAttribute = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const OG_DESCRIPTION = /(<meta property="og:description" content=")[^"]*(")/;

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
      const shell = await readFile(join(outDir, 'index.html'), 'utf8');

      if (!OG_DESCRIPTION.test(shell)) {
        throw new Error('prerender-invite-meta: v index.html chyba <meta property="og:description">.');
      }

      for (const guest of guests) {
        const html = shell.replace(OG_DESCRIPTION, `$1${escapeAttribute(inviteOgDescription(guest))}$2`);
        await mkdir(join(outDir, guest.slug), { recursive: true });
        await writeFile(join(outDir, guest.slug, 'index.html'), html);
      }

      this.info(`vygenerovanych ${guests.length} pozvanok s vlastnym og:description`);
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
