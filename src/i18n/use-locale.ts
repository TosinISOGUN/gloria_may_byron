import { useParams, useRouterState } from "@tanstack/react-router";

import { DEFAULT_LOCALE, isPrefixedLocale, stripLocale, type LocaleCode } from "./locales";

/** The language of the page being shown, from the /sv/... folder in its address (English has none). */
export function useLocale(): LocaleCode {
  const params = useParams({ strict: false }) as { locale?: string };
  return isPrefixedLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
}

/** The current page without its language folder, so the switcher can link to the same page in another language. */
export function useBasePath(): string {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const path = stripLocale(pathname);
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}
