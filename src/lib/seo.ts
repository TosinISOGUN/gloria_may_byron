import { SITE_URL, site } from "@/data/site";
import { DEFAULT_LOCALE, getLocale, isPrefixedLocale, locales, localePath, type LocaleCode } from "@/i18n/locales";

type SeoInput = {
  title: string;
  description: string;
  /** The page's path in English, such as "/about"; the language folder is added from `locale`. */
  path: string;
  /** The language folder from the route (undefined for English). */
  locale?: string | undefined;
  /** File name under /og/. */
  image?: string;
};

/** Head tags shared by every page: title, description, canonical, Open Graph, Twitter card and language alternates. */
export function seo({ title, description, path, locale, image = "home" }: SeoInput) {
  const code: LocaleCode = isPrefixedLocale(locale) ? locale : DEFAULT_LOCALE;
  const lang = getLocale(code);
  // The static build on Hostinger serves every page as a folder, so its address ends in a slash. Use that
  // one in the canonical, so the canonical is the address that answers and not one that redirects.
  const slash = import.meta.env.VITE_TRAILING_SLASH === "1";
  const addr = (c: LocaleCode) => {
    const p = localePath(c, path);
    return `${SITE_URL}${p}${slash && p !== "/" ? "/" : ""}`;
  };
  const url = addr(code);
  const og = `${SITE_URL}/og/${image}.jpg`;
  return {
    meta: [
      { title },
      ...(import.meta.env.VITE_PREVIEW ? [{ name: "robots", content: "noindex, nofollow" }] : []),
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: site.name },
      { property: "og:locale", content: lang.ogLocale },
      ...locales.filter((l) => l.code !== code).map((l) => ({ property: "og:locale:alternate", content: l.ogLocale })),
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: og },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:alt", content: title },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: og },
      { name: "twitter:image:alt", content: title },
    ],
    links: [
      { rel: "canonical", href: url },
      ...locales.map((l) => ({ rel: "alternate", hrefLang: l.hreflang, href: addr(l.code) })),
      { rel: "alternate", hrefLang: "x-default", href: addr(DEFAULT_LOCALE) },
    ],
  };
}
