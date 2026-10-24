# Gloria May Byron

Website for Gloria May Byron, an independent singer and songwriter (gloriamaybyron.com). Seven pages: Home, About, Music, Announcements, Gallery, Awards, Contact.

## Stack

- TanStack Start (React 19, file-based routing, server-rendered), TypeScript strict
- Tailwind CSS v4, Motion for interaction, Phosphor icons
- Cabinet Grotesk and Satoshi, self-hosted from `public/fonts/` (Fontshare, free for commercial use)
- Nitro with the `cloudflare-module` preset for the production build

## Run it

```bash
bun install
bun run dev        # http://localhost:5173
bun run build      # production build into .output/
bun run lint
bun run test
```

## Images

Original files from her website live in `assets-source/` and are never served. Run `bun run images` to rebuild the responsive AVIF and WebP copies in `public/images/` and the typed manifest `src/data/images.generated.ts`. `scripts/build-og.mjs` rebuilds the social share images in `public/og/`, and `scripts/build-favicons.mjs` rebuilds the favicon set from her own favicon.

## Content

All copy, credits, awards, videos and links come from her live website and are kept in `src/data/`:

- `site.ts`: name, navigation, platforms, social links, press logos
- `music.ts`: videos, singles, release covers
- `profile.ts`: biography, journey, awards, announcements, gallery photos

Where one of her Tidal track links no longer resolves, the single is reached through its YouTube video instead. `music.ts` records which singles keep a Tidal link.

## Design

Warm, photography-led, one accent (dusk coral) on a deep sea-ink base in dark mode and a pale sea-mist base in light mode. The theme follows the visitor's system setting, and the toggle in the header overrides it. Motion respects `prefers-reduced-motion`.
