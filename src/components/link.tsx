import { Link as RouterLink } from "@tanstack/react-router";
import type { ComponentProps } from "react";

import type { PagePath } from "@/data/site";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { useLocale } from "@/i18n/use-locale";

type Props = Omit<ComponentProps<typeof RouterLink>, "to" | "params" | "search" | "hash"> & {
  to: PagePath;
};

/**
 * An internal link that keeps the visitor in their language: to="/about" goes to /about in English
 * and to /sv/about in Swedish. Every internal link on the site goes through this.
 */
export function Link({ to, ...rest }: Props) {
  const locale = useLocale();
  const route = to === "/" ? "/{-$locale}/" : `/{-$locale}${to}`;
  return (
    <RouterLink
      {...(rest as object)}
      to={route as never}
      params={{ locale: locale === DEFAULT_LOCALE ? undefined : locale } as never}
    />
  );
}
