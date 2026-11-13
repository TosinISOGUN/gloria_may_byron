/*
 * Builds the site as plain static files for shared hosting such as Hostinger.
 *   npm run build:static
 * Output: dist/client, ready to upload to public_html. Also writes gloria-may-byron-site.zip,
 * which Hostinger's File Manager can extract in place.
 *
 * The Vercel build (npm run build) is separate and unchanged.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { isPreview } from "./site-origin.mjs";

// A preview takes its own address (Vercel supplies it); only the live build is stamped with the real domain.
const env = { ...process.env, STATIC_EXPORT: "1", VITE_TRAILING_SLASH: "1" };
if (!isPreview()) env.SITE_URL = process.env.SITE_URL || "https://gloriamaybyron.com";
const run = (cmd, args) => {
  const r = spawnSync(cmd, args, { stdio: "inherit", env, shell: process.platform === "win32" });
  if (r.status !== 0) process.exit(r.status ?? 1);
};

run("node", ["scripts/build-seo.mjs"]);
run("npx", ["vite", "build"]);

const out = "dist/client";

// The stylesheet is small (about 11 KB compressed), so put it inside each page: the first paint no
// longer waits for a separate request. Fonts and images in it use absolute paths, so they still resolve.
const htmlFiles = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory() ? htmlFiles(path.join(dir, e.name)) : e.name.endsWith(".html") ? [path.join(dir, e.name)] : [],
    );
const sheetLink = /<link rel="stylesheet" href="(\/assets\/styles-[^"]+\.css)"[^>]*>/;
for (const file of htmlFiles(out)) {
  const html = fs.readFileSync(file, "utf8");
  const m = html.match(sheetLink);
  if (!m) continue;
  const css = fs.readFileSync(path.join(out, m[1]), "utf8");
  fs.writeFileSync(file, html.replace(sheetLink, () => "<style>" + css + "</style>"));
}

// A missing address shows the site's own not-found page. The browser gets a real 404 status.
const notFound = fs
  .readFileSync(path.join(out, "index.html"), "utf8")
  .replace(/<title>[^<]*<\/title>/, "<title>Page not found | Gloria May Byron</title>")
  .replace("</head>", '<meta name="robots" content="noindex"></head>');
fs.writeFileSync(path.join(out, "404.html"), notFound);

// Server settings for Apache and LiteSpeed (Hostinger runs LiteSpeed and reads .htaccess).
// Force HTTPS in hPanel (Security, SSL) rather than here, so there is no redirect loop behind a proxy.
fs.writeFileSync(
  path.join(out, ".htaccess"),
  `Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html

# Hostinger names some file types wrongly (scripts as x-javascript, AVIF as plain text), so say what they are.
AddType image/avif .avif
AddType image/webp .webp
AddType font/woff2 .woff2
AddType text/javascript .js .mjs

# One address for the site: www.gloriamaybyron.com goes to gloriamaybyron.com, same page.
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTP_HOST} ^www\\.gloriamaybyron\\.com$ [NC]
  RewriteRule ^(.*)$ https://gloriamaybyron.com/$1 [R=301,L]
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/x-javascript application/json image/svg+xml text/plain application/xml
</IfModule>

# Built scripts and styles have a fingerprint in their name, so they never change under one name.
# Pages are kept short so an edit shows up soon.
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 week"
  ExpiresByType text/html "access plus 10 minutes"
  ExpiresByType application/xml "access plus 1 day"
  ExpiresByType text/plain "access plus 1 day"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType text/javascript "access plus 1 year"
  ExpiresByType application/x-javascript "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType image/webp "access plus 1 month"
  ExpiresByType image/avif "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/svg+xml "access plus 1 month"
  ExpiresByType image/x-icon "access plus 1 month"
  ExpiresByType video/mp4 "access plus 1 month"
</IfModule>

<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
`,
);

console.log("\nStatic site ready in", out);
