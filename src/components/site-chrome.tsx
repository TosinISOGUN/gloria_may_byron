import type { ReactNode } from "react";

import type { LocaleCode } from "@/i18n/locales";
import type { Messages } from "@/i18n/messages/en";

import { SiteFooter } from "./site-footer";
import { SiteNav } from "./site-nav";

/** Skip link, header, the page, and footer, in the visitor's language. */
export function SiteChrome({
  locale,
  chrome,
  children,
}: {
  locale: LocaleCode;
  chrome: Messages["chrome"];
  children: ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-accent px-5 py-3 font-bold text-on-accent focus:translate-y-0"
      >
        {chrome.skip}
      </a>
      <SiteNav locale={locale} chrome={chrome} />
      <main id="main">{children}</main>
      <SiteFooter chrome={chrome} />
    </>
  );
}
