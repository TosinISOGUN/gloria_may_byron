// Builds the shareable social-media cards in social-cards/ (not part of the website build).
//
//   node scripts/build-share-cards.mjs            every language, every card
//   node scripts/build-share-cards.mjs ja ar      only these languages
//
// Per language: two designs (her motto, and the "award-winning, 200 countries" line), each in two sizes:
// feed (1080x1350, the 4:5 portrait that Instagram, Facebook and LinkedIn show in full) and story
// (1080x1920, with the top and bottom kept clear of the app's own buttons). Every card carries a QR code
// and the address of the site in that language, so a foreign audience lands on their own language.
// The words come from the site's own message files, so the cards and the pages never disagree.
// It needs Google Chrome (set CHROME_PATH if it is not in the usual place).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import QRCode from "qrcode";
import puppeteer from "puppeteer-core";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "social-cards");
const ORIGIN = (process.env.SITE_URL || "https://gloriamaybyron.com").replace(/\/+$/, "");
const CHROME =
  process.env.CHROME_PATH ||
  ["C:/Program Files/Google/Chrome/Application/chrome.exe", "/usr/bin/google-chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].find((p) => fs.existsSync(p));
if (!CHROME) throw new Error("Chrome not found: set CHROME_PATH");

const { locales } = await import("../src/i18n/locales.ts");
const en = (await import("../src/i18n/messages/en.ts")).en;
const only = process.argv.slice(2);
const list = locales.filter((l) => !only.length || only.includes(l.code));

const fontUrl = (f) => pathToFileURL(path.join(root, "public/fonts", f)).href;

const stacks = {
  latin: `"Cabinet Grotesk", "Segoe UI", Arial, sans-serif`,
  cyrillic: `"Segoe UI", Roboto, Arial, sans-serif`,
  ja: `"Hiragino Sans", "Yu Gothic UI", "Yu Gothic", Meiryo, "Noto Sans JP", sans-serif`,
  hant: `"PingFang TC", "Microsoft JhengHei", "Noto Sans TC", sans-serif`,
  bn: `"Nirmala UI", "Kohinoor Bangla", "Noto Sans Bengali", sans-serif`,
  arabic: `"Segoe UI", "Noto Sans Arabic", Tahoma, sans-serif`,
};

const designs = {
  motto: { image: "portraitDress", file: "portraitDress-1080.webp", position: "50% 8%", pick: (m) => m.brand.motto, serif: true },
  lead: { image: "portraitWhite", file: "portraitWhite-1078.webp", position: "50% 6%", pick: (m) => m.home.hero.lead, serif: false },
};
const sizes = { feed: [1080, 1350], story: [1080, 1920] };

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function card({ loc, m, design, size, qr }) {
  const [w, h] = sizes[size];
  const d = designs[design];
  const story = size === "story";
  const stack = stacks[loc.script];
  const text = d.pick(m);
  const values = (m.brand?.values ?? en.brand.values).join("  \u00b7  ");
  const url = `${ORIGIN.replace(/^https?:\/\//, "")}${loc.code === "en" ? "" : "/" + loc.code}`;
  const latin = loc.script === "latin";
  return `<!doctype html><html lang="${loc.htmlLang}" dir="${loc.dir}"><meta charset="utf-8"><style>
@font-face{font-family:"Cabinet Grotesk";font-weight:800;src:url(${fontUrl("cabinet-grotesk-800.woff2")})}
@font-face{font-family:"Cabinet Grotesk";font-weight:500;src:url(${fontUrl("cabinet-grotesk-500.woff2")})}
@font-face{font-family:"Boska";font-style:italic;font-weight:100 900;src:url(${fontUrl("boska-italic-var.woff2")})}
*{box-sizing:border-box;margin:0}
body{width:${w}px;height:${h}px;overflow:hidden;position:relative;background:#0a191e;color:#e9f1ef;font-family:${stack}}
.ph{position:absolute;inset:0;background:url(${pathToFileURL(path.join(root, "public/images", d.file)).href}) ${d.position}/cover}
.fade{position:absolute;inset:0;background:
  linear-gradient(0deg,#0a191e 0%,rgba(10,25,30,.94) ${story ? 34 : 38}%,rgba(10,25,30,.55) ${story ? 52 : 56}%,transparent ${story ? 70 : 72}%),
  linear-gradient(180deg,rgba(10,25,30,.45),transparent 18%)}
.top{position:absolute;inset-inline:72px;top:${story ? 150 : 64}px;display:flex;align-items:center;gap:16px;font-weight:500;font-size:26px;letter-spacing:${loc.script === "latin" ? ".04em" : 0};text-shadow:0 1px 12px rgba(0,0,0,.5)}
.top i{width:44px;height:2px;background:#f08d75}
.box{position:absolute;inset-inline:72px;bottom:${story ? 300 : 72}px}
.vals{font-size:${latin ? 25 : 30}px;font-weight:500;color:#f08d75;letter-spacing:${latin ? ".14em" : 0};text-transform:${latin ? "uppercase" : "none"};line-height:1.5}
h1{margin-top:22px;font-family:"Cabinet Grotesk","Segoe UI",Arial,sans-serif;font-weight:800;font-size:${story ? 128 : 118}px;line-height:.98;letter-spacing:-.025em;direction:ltr;text-align:${loc.dir === "rtl" ? "right" : "left"}}
.txt{margin-top:30px;max-width:900px;text-wrap:balance;font-size:${d.serif ? 66 : 46}px;line-height:${latin ? 1.18 : 1.45};${d.serif && latin && loc.code !== "vi" ? 'font-family:"Boska",Georgia,serif;font-style:italic;font-weight:600;' : "font-weight:500;"}${loc.script === "latin" ? "" : "letter-spacing:0;"}color:#e9f1ef;${loc.script === "ja" || loc.script === "hant" ? "line-break:strict;word-break:auto-phrase;" : ""}}
.foot{margin-top:46px;display:flex;align-items:center;justify-content:space-between;gap:24px}
.addr{font-weight:800;font-size:38px;letter-spacing:0;direction:ltr;font-family:"Cabinet Grotesk","Segoe UI",Arial,sans-serif}
.addr small{display:block;margin-top:10px;font-weight:500;font-size:25px;color:#b8c9c6;font-family:${stack}}
.qr{width:200px;height:200px;border-radius:26px;background:#fff;padding:14px;flex:none}
.qr img{width:100%;height:100%;display:block}
</style><body>
<div class="ph"></div><div class="fade"></div>
<div class="top"><i></i><span>${esc(en.brand.name ?? "Gloria May Byron")}</span></div>
<div class="box">
<div class="vals">${esc(values)}</div>
<h1>Gloria May<br>Byron</h1>
<p class="txt" id="t">${loc.script === "hant" ? esc(text).replace(/([，,、])s*/g, "$1<br>") : esc(text)}</p>
<div class="foot"><div class="addr">${url}<small>${esc(loc.native)}</small></div><div class="qr"><img src="${qr}"></div></div>
</div>
<script>
// Shrink the sentence if a long translation would otherwise crowd the card.
const t=document.getElementById("t");let s=parseFloat(getComputedStyle(t).fontSize);
const max=${d.serif ? (story ? 360 : 300) : story ? 300 : 230};
while(t.getBoundingClientRect().height>max&&s>26){s-=2;t.style.fontSize=s+"px"}
</script></body></html>`;
}

fs.mkdirSync(out, { recursive: true });
const tmp = path.join(out, "_tmp");
fs.mkdirSync(tmp, { recursive: true });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
const captions = [];
let count = 0;
for (const loc of list) {
  const m = loc.code === "en" ? en : (await import(`../src/i18n/messages/${loc.code}.ts`)).default;
  const pick = (fn, fallback) => {
    try {
      return fn(m) ?? fallback;
    } catch {
      return fallback;
    }
  };
  const merged = {
    brand: { motto: pick((x) => x.brand.motto, en.brand.motto), values: pick((x) => x.brand.values, en.brand.values), name: en.brand.name },
    home: { hero: { lead: pick((x) => x.home.hero.lead, en.home.hero.lead) } },
  };
  const link = `${ORIGIN}${loc.code === "en" ? "/" : "/" + loc.code + "/"}`;
  const qr = await QRCode.toDataURL(link, { margin: 0, width: 400, errorCorrectionLevel: "M", color: { dark: "#0a191e", light: "#ffffff" } });
  const dir = path.join(out, loc.code);
  fs.mkdirSync(dir, { recursive: true });
  for (const design of Object.keys(designs)) {
    for (const size of Object.keys(sizes)) {
      const file = path.join(tmp, `${loc.code}-${design}-${size}.html`);
      fs.writeFileSync(file, card({ loc, m: merged, design, size, qr }));
      const page = await browser.newPage();
      await page.setViewport({ width: sizes[size][0], height: sizes[size][1] });
      await page.goto(pathToFileURL(file).href, { waitUntil: "networkidle0" });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: path.join(dir, `gloria-${design}-${size}.png`) });
      await page.close();
      count++;
    }
  }
  captions.push(`== ${loc.native} (${loc.english}) ==\n${merged.brand.motto}\n${merged.home.hero.lead}\n${link}\n`);
}

// One sheet with every language's feed card, to look over (and to send to Gloria in one picture).
if (!only.length) {
  const cells = list
    .map((l) => `<figure><img src="${pathToFileURL(path.join(out, l.code, "gloria-motto-feed.png")).href}"><figcaption>${esc(l.native)} / ${esc(l.english)}</figcaption></figure>`)
    .join("");
  const sheet = path.join(tmp, "overview.html");
  fs.writeFileSync(
    sheet,
    `<!doctype html><meta charset="utf-8"><style>body{margin:0;padding:40px;background:#0a191e;color:#e9f1ef;font:500 22px "Segoe UI",sans-serif;width:2100px}.g{display:grid;grid-template-columns:repeat(4,1fr);gap:28px}figure{margin:0}img{width:100%;border-radius:14px;display:block}figcaption{padding:10px 4px}</style><div class="g">${cells}</div>`,
  );
  const page = await browser.newPage();
  await page.setViewport({ width: 2180, height: 1000 });
  await page.goto(pathToFileURL(sheet).href, { waitUntil: "networkidle0" });
  await page.screenshot({ path: path.join(out, "overview.png"), fullPage: true });
  await page.close();
  fs.writeFileSync(path.join(out, "captions.txt"), captions.join("\n"));
}
await browser.close();
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`built ${count} cards for ${list.length} languages in social-cards/`);
