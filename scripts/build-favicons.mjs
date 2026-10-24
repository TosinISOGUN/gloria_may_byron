// Builds the favicon set from her own favicon (assets-source/real-site/cropped-favicon.png).
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const src = path.join(root, "assets-source/real-site/cropped-favicon.png");
const out = (f) => path.join(root, "public", f);

for (const size of [32, 192, 512]) {
  await sharp(src)
    .resize(size, size)
    .png()
    .toFile(out(size === 512 ? "favicon-512.png" : `favicon-${size}.png`));
}
// iOS needs an opaque square: place her transparent mark on white.
await sharp(src)
  .resize(144, 144)
  .extend({ top: 18, bottom: 18, left: 18, right: 18, background: "#ffffff" })
  .flatten({ background: "#ffffff" })
  .png()
  .toFile(out("apple-touch-icon.png"));
console.log("favicons built from her original");
