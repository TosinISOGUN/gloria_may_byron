// Writes public/robots.txt and public/sitemap.xml for the origin the site is being built for.
import fs from "node:fs";

import { siteOrigin } from "./site-origin.mjs";

const origin = siteOrigin("https://gloriamaybyron.com");
const paths = ["/", "/about", "/music", "/announcements", "/gallery", "/awards", "/contact"];

fs.writeFileSync(
  "public/robots.txt",
  `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
);
fs.writeFileSync(
  "public/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
    .map((p) => `  <url><loc>${origin}${p}</loc></url>`)
    .join("\n")}\n</urlset>\n`,
);
console.log(`robots.txt and sitemap.xml written for ${origin}`);
