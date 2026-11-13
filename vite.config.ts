import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

import { locales } from "./src/i18n/locales";
import { siteOrigin } from "./scripts/site-origin.mjs";

// STATIC_EXPORT=1 builds plain HTML files for shared hosting (Hostinger, any web server) instead of
// the server output Vercel uses (Nitro is left out). Every page is prerendered into its own folder, so /about is
// served from about/index.html. The site has no server code, so nothing is lost.
const staticExport = process.env["STATIC_EXPORT"] === "1";

// Every page in every language is listed outright, so none depends on a link being found by the crawler:
// /about for English, /sv/about for Swedish, and so on.
const pagePaths = ["/", "/about", "/authenticity", "/music", "/announcements", "/gallery", "/awards", "/contact"];
const pages = locales.flatMap((l) =>
  pagePaths.map((p) => {
    const prefix = l.code === "en" ? "" : `/${l.code}`;
    return { path: p === "/" ? prefix || "/" : `${prefix}${p}` };
  }),
);

export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    tanstackStart(
      staticExport ? { pages, prerender: { enabled: true, crawlLinks: true, autoSubfolderIndex: true } } : {},
    ),
    ...(command === "build" && !staticExport ? [nitro()] : []),
    viteReact(),
  ],
  define: {
    "import.meta.env.VITE_SITE_URL": JSON.stringify(siteOrigin("https://gloriamaybyron.com")),
  },
  resolve: {
    tsconfigPaths: true,
    dedupe: ["react", "react-dom", "@tanstack/react-router"],
  },
}));
