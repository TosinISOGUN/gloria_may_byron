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

const env = { ...process.env, STATIC_EXPORT: "1", SITE_URL: process.env.SITE_URL || "https://gloriamaybyron.com" };
const run = (cmd, args) => {
  const r = spawnSync(cmd, args, { stdio: "inherit", env, shell: process.platform === "win32" });
  if (r.status !== 0) process.exit(r.status ?? 1);
};

run("node", ["scripts/build-seo.mjs"]);
run("npx", ["vite", "build"]);

const out = "dist/client";

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

# One address for the site: www.gloriamaybyron.com goes to gloriamaybyron.com, same page.
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTP_HOST} ^www\\.gloriamaybyron\\.com$ [NC]
  RewriteRule ^(.*)$ https://gloriamaybyron.com/$1 [R=301,L]
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml text/plain application/xml
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
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType image/webp "access plus 1 month"
  ExpiresByType image/avif "access plus 1 month"
</IfModule>

<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
`,
);

console.log("\nStatic site ready in", out);
