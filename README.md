# Kristína & Peter — svadobný web

Animovaný svadobný web (React + Vite + TypeScript + LESS) s 3D „railway" scénou
(Three.js), GSAP animáciami a Lenis smooth-scrollom. Dizajn aj animácie sú 1:1
prevzaté z pôvodného prototypu — táto verzia ho len prestavila do React/LESS
komponentovej architektúry a nahradila placeholder fotky reálnymi.

## Spustenie

```bash
npm install
npm run dev        # vývojový server (Vite)
npm run build      # produkčný build (tsc + vite)
npm run preview    # náhľad produkčného buildu
npm run typecheck  # iba typová kontrola
```

## Architektúra

```
src/
  components/
    atoms/        Button, SectionHeading, Grain
    molecules/    EventCard, TimelineItem, HotelCard, AccordionItem, InviteBlock
    organisms/    Scene (Three.js), Hero, OurStory, WeddingDetails, Schedule,
                  Accommodation, GiftRegistry, FAQ, Footer
  pages/          HomePage, InvitePage, NotFoundPage, WeddingLayout (zdieľaný layout)
  hooks/          useSmoothScroll (Lenis), useRevealAnimations (GSAP)
  data/           guests.ts, content.ts, photos.ts
  styles/         _variables, _mixins, _reset, _typography, global.less
```

- **Dizajnové tokeny** (farby, fonty, veľkosti, spacing, breakpointy, z-index)
  sú centralizované v `src/styles/_variables.less`. Komponenty nikdy nepoužívajú
  natvrdo zapísané hodnoty.
- Každý komponent má vlastný priečinok s `.tsx` a `.less` súborom a používa
  prísne BEM triedy.
- Cesty sa importujú cez aliasy `@atoms/`, `@molecules/`, `@organisms/`,
  `@pages/`, `@data/`, `@hooks/`, `@styles/`.

## Súkromné pozvánky

Pozvánka sa otvára cez vlastnú URL: `vasadresa.sk/<slug>` (napr.
`vasadresa.sk/jana-a-miro-2025`). Zobrazí sa personalizovaný pozdrav s RSVP
tlačidlom a pod ním celý web. Neznámy slug zobrazí stránku 404.

### Pridanie hosťa

Upravte `src/data/guests.ts`:

```ts
export const guests: Guest[] = [
  { slug: 'jana-a-miro-2025', names: 'Jana & Miró' },
  { slug: 'rodina-novakova', names: 'Rodina Nováková' },
  { slug: 'tomas-a-zuzka-2025', names: 'Tomáš & Zuzka', form: 'https://forms.gle/...' },
];
```

- `slug` — časť URL (malé písmená, bez medzier, pomlčky). Zámerne neuhádnuteľný.
- `names` — pozdrav na karte.
- `form` — individuálny Google Forms odkaz (vynechajte → použije sa `DEFAULT_FORM_URL`).

### Google Forms odkaz

V `src/data/guests.ts` nastavte `DEFAULT_FORM_URL` na váš RSVP formulár. Web má
nastavené `noindex`, takže pozvánky nie sú verejne indexované.

## Fotky

Reálne fotky lietajúce v 3D scéne sú v `public/photos/` (`photo-01.jpg` …).
Sú zoznamené v `src/data/photos.ts`. Pre výmenu stačí nahradiť súbory v
`public/photos/` (JPG/WebP) a upraviť zoznam, ak meníte počet.

> Pôvodné fotky boli vo formáte HEIC (prehliadače ho nezobrazia), preto boli
> skonvertované na JPG a zmenšené (max. 1000 px) pre rýchle načítanie textúr.

## Čo upraviť pred odoslaním

- `src/data/guests.ts` — `DEFAULT_FORM_URL` a zoznam hostí.
- `src/data/content.ts` — dátum, miesta, adresy, časy, FAQ.
- `public/photos/` — reálne fotky.

## Úvodná animácia pozvánky

Na `/<slug>` sa najprv zobrazí obálka (`EnvelopeIntro`): poster → po ťuknutí video
rozviazania stuhy → natívne rozloženie obálky zo 4 strán → zoom do hodvábneho
pozadia s textom pozvánky.

- Videá a snímky sú v `public/intro/` (samostatne `portrait` 9:16 a `landscape` 16:9),
  hodvábna textúra v `public/silk/`. Zdroje sú v `src/data/intro.ts`.
- Poster = prvý a `*-end.webp` = posledný snímok videa. Chlopne sa vyrezávajú
  z posledného snímku podľa geometrie obálky v `EnvelopeIntro.less`
  (`.intro-frame-geometry`) — pri výmene videa treba geometriu premerať.
