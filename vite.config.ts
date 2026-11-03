import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

import { siteOrigin } from "./scripts/site-origin.mjs";

// STATIC_EXPORT=1 builds plain HTML files for shared hosting (Hostinger, any web server) instead of
// the server output Vercel uses (Nitro is left out). Every page is prerendered into its own folder, so /about is
// served from about/index.html. The site has no server code, so nothing is lost.
const staticExport = process.env.STATIC_EXPORT === "1";

export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    tanstackStart(staticExport ? { prerender: { enabled: true, crawlLinks: true, autoSubfolderIndex: true } } : {}),
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
