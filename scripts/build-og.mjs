// Builds the 1200x630 Open Graph images in public/og/ from her own photographs.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const src = (f) => path.join(root, "assets-source/real-site", f);
const out = path.join(root, "public/og");
fs.mkdirSync(out, { recursive: true });

const pages = {
  home: ["Hero_IMG_2.jpg", { position: "right" }],
  about: ["Hero_IMG_5.jpg", { position: "centre" }],
  music: ["Hero-Image-1.jpg", { position: "centre" }],
  announcements: ["423ab54a-c03d-4b1b-9feb-41a468e2905d.jpeg", { position: "north" }],
  gallery: ["Hero_IMG_4.jpg", { position: "centre" }],
  awards: ["Hero_IMG_3.jpg", { position: "centre" }],
  contact: ["9ceb371d-e9cb-45c5-b4fa-5fc2913cdc90-1.jpg", { position: "north" }],
};

for (const [name, [file, opts]] of Object.entries(pages)) {
  await sharp(src(file))
    .resize(1200, 630, { fit: "cover", ...opts })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(out, `${name}.jpg`));
}
console.log("built", Object.keys(pages).length, "og images");
