import { DEFAULT_LOCALE, type LocaleCode } from "./locales";
import { en, type Messages } from "./messages/en";

export { en };
export type { Messages };

type Partialize<T> = T extends string ? string : T extends readonly (infer U)[] ? readonly Partialize<U>[] : { [K in keyof T]?: Partialize<T[K]> };
export type PartialMessages = Partialize<Messages>;

/** Each language is its own file, loaded only when a page in that language is built or visited. */
const loaders: Record<string, () => Promise<{ default: PartialMessages }>> = {
  sv: () => import("./messages/sv"),
  "zh-tw": () => import("./messages/zh-tw"),
  ja: () => import("./messages/ja"),
  ru: () => import("./messages/ru"),
  vi: () => import("./messages/vi"),
  es: () => import("./messages/es"),
  it: () => import("./messages/it"),
  no: () => import("./messages/no"),
  "zh-hk": () => import("./messages/zh-hk"),
  bn: () => import("./messages/bn"),
  ar: () => import("./messages/ar"),
};

function merge<T>(base: T, over: unknown): T {
  if (over === undefined || over === null) return base;
  if (Array.isArray(base)) return (Array.isArray(over) && over.length ? over : base) as T;
  if (typeof base === "object" && base !== null) {
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(base)) {
      out[key] = merge((base as Record<string, unknown>)[key], (over as Record<string, unknown>)[key]);
    }
    return out as T;
  }
  return (typeof over === typeof base ? over : base) as T;
}

/** The messages for a language. Anything not translated yet falls back to English, so a page never breaks. */
export async function getMessages(code: LocaleCode | string | undefined): Promise<Messages> {
  if (!code || code === DEFAULT_LOCALE) return en;
  const load = loaders[code];
  if (!load) return en;
  const mod = await load().catch(() => null);
  return mod ? merge<Messages>(en, mod.default) : en;
}

/** The messages for the language in a route's `locale` param, for each page's loader. */
export function messagesForParam(locale: string | undefined): Promise<Messages> {
  return getMessages(locale);
}

/** Fills {name}-style placeholders. */
export function fmt(text: string, vars: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}
