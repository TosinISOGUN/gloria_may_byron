# Gloria May Byron

Website for Gloria May Byron, an independent singer and songwriter (gloriamaybyron.com). Eight pages: Home, About, How the songs are made (Authenticity), Music, Announcements, Gallery, Awards, Contact. Each is published in twelve languages: English at the root and the others in a folder (`/sv/`, `/zh-tw/`, `/ja/`, `/ru/`, `/vi/`, `/es/`, `/it/`, `/no/`, `/zh-hk/`, `/bn/`, `/ar/`).

## Stack

- TanStack Start (React 19, file-based routing, server-rendered), TypeScript strict
- Tailwind CSS v4, Motion for interaction, Phosphor icons
- Cabinet Grotesk and Satoshi, plus Boska Italic for the looping ribbon of values, self-hosted from `public/fonts/` (Fontshare, free for commercial use)
- Nitro for the production build (it picks the Vercel output on Vercel and a Node server elsewhere)

## Run it

```bash
bun install
bun run dev        # http://localhost:5173
bun run build      # production build into .output/
bun run lint
bun run test
```

## Deploying to Hostinger

The live site is plain static files on Hostinger shared hosting (no Node there). `bun run build:static` writes them to `dist/client/` (every page as its own folder, plus `404.html` and `.htaccess`). The Vercel build is separate and unchanged.

**Automatic.** `.github/workflows/deploy-hostinger.yml` runs on every push to `main`: tests, static build, a check that every page exists, then an rsync over SSH that sends only files whose content changed. (Hostinger's FTPS resets the data connection, so FTP is not used.) One-time setup, in the repository's Settings, Secrets and variables, Actions:

- Secret `SSH_PRIVATE_KEY`: a dedicated deploy key. Create it with `ssh-keygen -t ed25519 -N "" -f gloria_deploy`, add the public half in hPanel, Advanced, SSH Access, and paste the private half here.
- Variables `SSH_HOST`, `SSH_PORT`, `SSH_USER`: from hPanel, SSH Access (port 65002).
- Variable `SSH_KNOWN_HOSTS`: the server's host key line from `ssh-keyscan -p 65002 <host>`, so uploads only go to the real server.
- Variable `DEPLOY_PATH`: relative to the home folder, ending in `/`. Use `domains/gloriamaybyron.com/public_html/new/` for the test subdomain first, then `domains/gloriamaybyron.com/public_html/` for the live site. The workflow refuses any path outside that folder.

The run's Actions page shows what was uploaded. A failed test or a missing page stops the deploy before anything is uploaded. Files are only added or replaced, except inside `assets/`, `images/`, `fonts/` and `og/`, which are kept in step with the build. To roll back, revert the commit and push.

**By hand.** `bun run build:static`, zip the contents of `dist/client/` (forward-slash paths; `tar -a -c -f site.zip -C dist/client .` works on Windows), upload and extract in File Manager.

## Private preview (Vercel)

To show the site to Gloria before it goes live, deploy it to Vercel. Any build made by Vercel is a preview: every page carries `noindex, nofollow`, `robots.txt` blocks all crawlers, no sitemap is published, links and share images use the preview's own address. The live build (the GitHub Action for Hostinger) sets none of this. `vercel.json` makes Vercel run `node scripts/build-static.mjs` and serve `dist/client`. To try it locally, run `PREVIEW=1 node scripts/build-static.mjs` (it overwrites `public/robots.txt` and deletes `public/sitemap.xml`, so run `git checkout public/` afterwards).

One-time setup: in Vercel, Add New, Project, import this GitHub repository, leave the build settings as they are (they come from `vercel.json`), and deploy. Then, so the link is public (a preview on a non-production branch sits behind Vercel's login), set the project's Production Branch to `dev` (Settings, Environments, Production). The link is then `https://<project>.vercel.app` and updates whenever `dev` is pushed. Delete the project (or its domain) when she has signed off.

## Languages

The words of every page live in `src/i18n/messages/`: `en.ts` is the source of truth and each other language is a partial file that is merged over it, so a missing line falls back to English. `src/i18n/locales.ts` lists the languages (name, flag, script, direction). Arabic runs right to left, and the layout mirrors with logical Tailwind classes (`ps-`, `end-`, `border-s`). Use those, not `left`/`right`, in new code. Each language is its own static folder with its own canonical, hreflang and Open Graph tags, and `scripts/build-seo.mjs` lists all of them in the sitemap. The deploy workflow checks that every page exists in every language before uploading.

## Social cards

`bun run share-cards` (needs Chrome) writes shareable cards to `social-cards/` (not part of the website): per language, two designs in a feed size (1080x1350) and a story size (1080x1920), each with a QR code to the site in that language. `overview.png` shows them all, and `captions.txt` has the matching text and link per language. The words come from the message files, so the cards follow the site. The contact page also offers them to visitors (language, card, shape, share, save, copy caption): after `share-cards`, run `node scripts/build-share-assets.mjs` to turn them into `public/share/` and `src/data/share-cards.generated.ts`, then commit those.

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

Every top-level page opens with a full-bleed photograph (the Contact page frames the portrait beside the type). Every hero carries the dark theme’s fade, light type and a light header in both themes (`data-tone="dark"`), and the fade is its own transition layer so it arrives with the photograph. Pages crossfade through the View Transitions API (the header, hero photograph and hero type are their own layers), the hero photograph drifts and the type fades on scroll, and the home page has a pinned statement whose words light up as you scroll. All of it is CSS scroll-driven animation where the browser supports it, and is switched off, or shows the finished state, with `prefers-reduced-motion`. Platform and press logos keep their brand colours on light tiles in both themes.
