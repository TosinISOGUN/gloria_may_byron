/*
 * Builds the logo files used as CSS masks (public/brand/), from her own logo in assets-source.
 *   node scripts/build-logo.mjs
 * Her logo is black ink on white, so the ink becomes the mask's opacity and the colour is set in CSS
 * (currentColor). That one file then works in the light and the dark theme.
 *   logo-badge.png  the whole badge
 *   logo-mark.png   only the crossed guitars (the big connected shapes), for the nav
 */
import fs from "node:fs";
import sharp from "sharp";

const SRC = "assets-source/real-site/gloria-may-byron-website-logo_1.png";
const OUT = "public/brand";
fs.mkdirSync(OUT, { recursive: true });

const { data, info } = await sharp(SRC).flatten({ background: "#ffffff" }).greyscale().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const ink = (i) => 255 - data[i]; // 0 on white paper, 255 on black ink

/** Writes the pixels of `keep` (or all ink) cropped to their bounding box, as black with alpha. */
async function write(name, keep, pad, scale = 1) {
  let x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      if (ink(i) > 40 && keep(i)) {
        x0 = Math.min(x0, x); x1 = Math.max(x1, x);
        y0 = Math.min(y0, y); y1 = Math.max(y1, y);
      }
    }
  x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad);
  x1 = Math.min(W - 1, x1 + pad); y1 = Math.min(H - 1, y1 + pad);
  const w = x1 - x0 + 1, h = y1 - y0 + 1;
  const rgba = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const i = (y + y0) * W + (x + x0);
      rgba[(y * w + x) * 4 + 3] = keep(i) ? ink(i) : 0;
    }
  let img = sharp(rgba, { raw: { width: w, height: h, channels: 4 } });
  if (scale !== 1) img = img.resize(Math.round(w * scale), Math.round(h * scale), { kernel: "lanczos3" });
  const file = `${OUT}/${name}.png`;
  await img.png({ compressionLevel: 9 }).toFile(file);
  console.log(name, `${Math.round(w * scale)}x${Math.round(h * scale)}`, fs.statSync(file).size, "bytes");
}

// Label connected shapes (8-neighbour) and find the biggest: the two guitars cross, so they are one.
const label = new Int32Array(W * H);
const sizes = [0];
const boxes = [null];
for (let s = 0; s < W * H; s++) {
  if (label[s] || ink(s) <= 128) continue;
  const id = sizes.length;
  let count = 0;
  let bx0 = W, by0 = H, bx1 = 0, by1 = 0;
  const stack = [s];
  label[s] = id;
  while (stack.length) {
    const p = stack.pop();
    count++;
    const px = p % W, py = (p - px) / W;
    bx0 = Math.min(bx0, px); bx1 = Math.max(bx1, px); by0 = Math.min(by0, py); by1 = Math.max(by1, py);
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) {
        const nx = px + dx, ny = py + dy;
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        const n = ny * W + nx;
        if (!label[n] && ink(n) > 128) {
          label[n] = id;
          stack.push(n);
        }
      }
  }
  sizes.push(count);
  boxes.push({ x0: bx0, y0: by0, x1: bx1, y1: by1 });
}
// The two guitar bodies are the big shapes. The necks and headstocks are smaller, so they are the
// small shapes that sit between the bodies, above them; the letters of the arc are higher or further out.
const top = Math.max(...sizes.slice(1));
const bodies = sizes.map((n, id) => (id > 0 && n >= top * 0.4 ? id : 0)).filter(Boolean);
const bodyX0 = Math.min(...bodies.map((id) => boxes[id].x0));
const bodyX1 = Math.max(...bodies.map((id) => boxes[id].x1));
const bodyTop = Math.min(...bodies.map((id) => boxes[id].y0));
const isGuitar = (id) => {
  if (id <= 0) return false;
  if (bodies.includes(id)) return true;
  const b = boxes[id];
  return b.x0 >= bodyX0 + 60 && b.x1 <= bodyX1 - 60 && b.y0 >= bodyTop - 60 && b.y1 <= bodyTop + 20;
};
// Soft edges next to a guitar belong to it too (the anti-aliased rim).
const near = (i) => {
  const px = i % W, py = (i - px) / W;
  for (let dy = -2; dy <= 2; dy++)
    for (let dx = -2; dx <= 2; dx++) {
      const nx = px + dx, ny = py + dy;
      if (nx >= 0 && ny >= 0 && nx < W && ny < H && isGuitar(label[ny * W + nx])) return true;
    }
  return false;
};

await write("logo-badge", () => true, 4);
await write("logo-mark", near, 3);
