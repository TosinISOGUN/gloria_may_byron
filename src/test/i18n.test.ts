import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { en, fmt, getMessages } from "@/i18n";
import {
  DEFAULT_LOCALE,
  localeFromPath,
  localePath,
  locales,
  prefixedLocales,
  stripLocale,
} from "@/i18n/locales";

type Tree = { [key: string]: Tree | string | Tree[] | string[] };

/** Every message as "path.to.key" -> text. */
function flatten(value: unknown, prefix = ""): Record<string, string> {
  if (typeof value === "string") return { [prefix]: value };
  if (Array.isArray(value)) return Object.assign({}, ...value.map((v, i) => flatten(v, `${prefix}[${i}]`)));
  if (value && typeof value === "object") {
    return Object.assign({}, ...Object.entries(value as Tree).map(([k, v]) => flatten(v, prefix ? `${prefix}.${k}` : k)));
  }
  return {};
}

const placeholders = (text: string) => (text.match(/\{\w+\}/g) ?? []).sort().join(",");

describe("languages", () => {
  it("lists English first, with no folder, and every other language with one", () => {
    expect(locales[0].code).toBe(DEFAULT_LOCALE);
    expect(prefixedLocales).toHaveLength(locales.length - 1);
    expect(new Set(locales.map((l) => l.code)).size).toBe(locales.length);
  });

  it("covers the twelve languages Gloria asked for", () => {
    expect(locales.map((l) => l.english)).toEqual([
      "English",
      "Swedish",
      "Taiwanese",
      "Japanese",
      "Russian",
      "Vietnamese",
      "Spanish",
      "Italian",
      "Norwegian",
      "Cantonese",
      "Bangla",
      "Arabic",
    ]);
  });

  it("reads Arabic right to left and every other language left to right", () => {
    for (const l of locales) expect(l.dir, l.code).toBe(l.code === "ar" ? "rtl" : "ltr");
  });

  it("maps addresses to languages and back", () => {
    expect(localeFromPath("/")).toBe("en");
    expect(localeFromPath("/about")).toBe("en");
    expect(localeFromPath("/sv/about")).toBe("sv");
    expect(localeFromPath("/zh-hk")).toBe("zh-hk");
    expect(stripLocale("/sv/about")).toBe("/about");
    expect(stripLocale("/sv")).toBe("/");
    expect(stripLocale("/about")).toBe("/about");
    expect(localePath("sv", "/about")).toBe("/sv/about");
    expect(localePath("sv", "/")).toBe("/sv");
    expect(localePath("en", "/about")).toBe("/about");
    expect(localePath("en", "/")).toBe("/");
  });
});

describe("messages", () => {
  const source = flatten(en);

  it.each(prefixedLocales)("%s has exactly the keys English has, and the same placeholders", async (code) => {
    const mod = await import(`../i18n/messages/${code}.ts`);
    const own = flatten(mod.default);
    // A language may be missing keys while it is being translated (they fall back to English), but it can
    // never have a key English does not have, and every message it does have must keep its placeholders.
    expect(Object.keys(own).filter((k) => !(k in source))).toEqual([]);
    for (const [key, text] of Object.entries(own)) {
      expect(placeholders(text), `${code}: ${key}`).toBe(placeholders(source[key] ?? ""));
    }
  });

  it("falls back to English for anything not translated yet", async () => {
    const sv = await getMessages("sv");
    expect(flatten(sv)).toHaveProperty("chrome.nav.home");
    expect((await getMessages("nope")).chrome.nav.home).toBe(en.chrome.nav.home);
  });

  it("fills placeholders", () => {
    expect(fmt("{name}, home", { name: "Gloria" })).toBe("Gloria, home");
    expect(fmt("Hi {who}", {})).toBe("Hi {who}");
  });

  it("has no copy that was left in the source as a stray template", () => {
    for (const [key, text] of Object.entries(source)) {
      expect(text.trim(), key).not.toBe("");
      expect(readFileSync(join(process.cwd(), "src/i18n/messages/en.ts"), "utf8")).toContain(text.slice(0, 12));
    }
  });
});
