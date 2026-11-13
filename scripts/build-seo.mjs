// Writes public/robots.txt and public/sitemap.xml for the origin the site is being built for.
import fs from "node:fs";

import { isPreview, siteOrigin } from "./site-origin.mjs";

const origin = siteOrigin("https://gloriamaybyron.com");
// The static build (Hostinger) serves each page as a folder, so its address ends in a slash.
const slash = process.env.STATIC_EXPORT === "1" ? "/" : "";
const paths = ["/", "/about", "/authenticity", "/music", "/announcements", "/gallery", "/awards", "/contact"];

// Every language: English at the root, the others in a folder. Each entry lists all its translations,
// which is how search engines are told which page is which language. [folder, hreflang]
const langs = [
  ["", "en"],
  ["/sv", "sv"],
  ["/zh-tw", "zh-TW"],
  ["/ja", "ja"],
  ["/ru", "ru"],
  ["/vi", "vi"],
  ["/es", "es"],
  ["/it", "it"],
  ["/no", "nb"],
  ["/zh-hk", "zh-HK"],
  ["/bn", "bn"],
  ["/ar", "ar"],
];

const loc = (folder, p) => {
  const path = p === "/" ? folder || "/" : folder + p;
  return origin + path + (path !== "/" ? slash : "");
};

const entry = (folder, p) => {
  const alternates = langs.map(
    ([f, hreflang]) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${loc(f, p)}"/>`,
  );
  alternates.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${loc("", p)}"/>`);
  return `  <url>\n    <loc>${loc(folder, p)}</loc>\n${alternates.join("\n")}\n  </url>`;
};

if (isPreview()) {
  // A private preview: keep every crawler out and publish no sitemap.
  fs.writeFileSync("public/robots.txt", "User-agent: *\nDisallow: /\n");
  fs.rmSync("public/sitemap.xml", { force: true });
  console.log(`preview build: robots.txt blocks all crawlers, no sitemap (${origin})`);
  process.exit(0);
}
fs.writeFileSync("public/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
fs.writeFileSync(
  "public/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${langs
    .flatMap(([folder]) => paths.map((p) => entry(folder, p)))
    .join("\n")}\n</urlset>\n`,
);
console.log(`robots.txt and sitemap.xml written for ${origin}`);
