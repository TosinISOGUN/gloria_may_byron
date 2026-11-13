/**
 * The languages the site is published in. English lives at the root (/about); every other language is a
 * folder prefix (/sv/about), so each page is its own static file that can be linked, shared and indexed.
 */
export type Locale = {
  /** URL prefix, and the key of the message file. English has no prefix in its URLs. */
  code: string;
  /** The language in its own name, shown in the switcher. */
  native: string;
  /** The language in English, shown small beside it. */
  english: string;
  /** Value of <html lang>. */
  htmlLang: string;
  /** Value of hreflang alternates (what search engines understand). */
  hreflang: string;
  /** Open Graph locale. */
  ogLocale: string;
  /** Which self-hosted fallback font stack the script needs (see styles.css). */
  script: "latin" | "cyrillic" | "ja" | "hant" | "bn" | "arabic";
  /** Reading direction. Arabic runs right to left, and the whole page layout mirrors. */
  dir: "ltr" | "rtl";
};

export const locales = [
  { code: "en", native: "English", english: "English", htmlLang: "en-US", hreflang: "en", ogLocale: "en_US", script: "latin", dir: "ltr" },
  { code: "sv", native: "Svenska", english: "Swedish", htmlLang: "sv", hreflang: "sv", ogLocale: "sv_SE", script: "latin", dir: "ltr" },
  { code: "zh-tw", native: "繁體中文", english: "Taiwanese", htmlLang: "zh-Hant-TW", hreflang: "zh-TW", ogLocale: "zh_TW", script: "hant", dir: "ltr" },
  { code: "ja", native: "日本語", english: "Japanese", htmlLang: "ja", hreflang: "ja", ogLocale: "ja_JP", script: "ja", dir: "ltr" },
  { code: "ru", native: "Русский", english: "Russian", htmlLang: "ru", hreflang: "ru", ogLocale: "ru_RU", script: "cyrillic", dir: "ltr" },
  { code: "vi", native: "Tiếng Việt", english: "Vietnamese", htmlLang: "vi", hreflang: "vi", ogLocale: "vi_VN", script: "latin", dir: "ltr" },
  { code: "es", native: "Español", english: "Spanish", htmlLang: "es", hreflang: "es", ogLocale: "es_ES", script: "latin", dir: "ltr" },
  { code: "it", native: "Italiano", english: "Italian", htmlLang: "it", hreflang: "it", ogLocale: "it_IT", script: "latin", dir: "ltr" },
  { code: "no", native: "Norsk", english: "Norwegian", htmlLang: "nb", hreflang: "nb", ogLocale: "nb_NO", script: "latin", dir: "ltr" },
  { code: "zh-hk", native: "廣東話", english: "Cantonese", htmlLang: "yue-Hant-HK", hreflang: "zh-HK", ogLocale: "zh_HK", script: "hant", dir: "ltr" },
  { code: "bn", native: "বাংলা", english: "Bangla", htmlLang: "bn", hreflang: "bn", ogLocale: "bn_BD", script: "bn", dir: "ltr" },
  { code: "ar", native: "العربية", english: "Arabic", htmlLang: "ar", hreflang: "ar", ogLocale: "ar_AR", script: "arabic", dir: "rtl" },
] as const satisfies readonly Locale[];

export type LocaleCode = (typeof locales)[number]["code"];

export const DEFAULT_LOCALE: LocaleCode = "en";

/** Locales that appear in the URL (everything except English). */
export const prefixedLocales: LocaleCode[] = locales.filter((l) => l.code !== DEFAULT_LOCALE).map((l) => l.code);

export function isPrefixedLocale(value: unknown): value is LocaleCode {
  return typeof value === "string" && (prefixedLocales as string[]).includes(value);
}

export function getLocale(code: string | undefined): Locale {
  return locales.find((l) => l.code === code) ?? locales[0];
}

/** The language a URL path is in: /sv/about is "sv", /about is "en". */
export function localeFromPath(pathname: string): LocaleCode {
  const first = pathname.split("/")[1];
  return isPrefixedLocale(first) ? first : DEFAULT_LOCALE;
}

/** The path without its language folder: /sv/about becomes /about, /sv becomes /. */
export function stripLocale(pathname: string): string {
  const parts = pathname.split("/");
  if (isPrefixedLocale(parts[1])) {
    const rest = "/" + parts.slice(2).join("/");
    return rest === "/" ? "/" : rest;
  }
  return pathname || "/";
}

/** The same page in another language: ("sv", "/about") gives "/sv/about"; ("en", "/about") gives "/about". */
export function localePath(code: LocaleCode, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (code === DEFAULT_LOCALE) return clean;
  return clean === "/" ? `/${code}` : `/${code}${clean}`;
}
