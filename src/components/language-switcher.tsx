import { CaretDown, Check, Translate, X } from "@phosphor-icons/react";
import { Link as RouterLink } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import { fmt } from "@/i18n";
import type { Messages } from "@/i18n/messages/en";
import { getLocale, localePath, locales, type LocaleCode } from "@/i18n/locales";
import { useBasePath } from "@/i18n/use-locale";

type Props = { locale: LocaleCode; chrome: Messages["chrome"] };

/**
 * Header button that shows a translate icon and the current language's name, and opens a panel just below the
 * nav with every language. Each entry is a real link to the same page in that language, so it works
 * without scripts and search engines can follow it. The panel is always in the page; it is only hidden.
 */
export function LanguageSwitcher({ locale, chrome }: Props) {
  const [open, setOpen] = useState(false);
  const base = useBasePath();
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const current = getLocale(locale);

  const close = useCallback((refocus: boolean) => {
    setOpen(false);
    if (refocus) button.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) close(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  return (
    <div ref={root} className="relative">
      <button
        ref={button}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="language-panel"
        aria-label={`${chrome.language.label}: ${fmt(chrome.language.current, { name: current.native })}`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 items-center gap-2 rounded-full border border-line ps-2.5 pe-2.5 sm:h-12 sm:ps-3 sm:pe-3 text-ink transition-colors hover:border-ink sm:pe-3.5"
      >
        <Translate size={24} weight="regular" aria-hidden className="shrink-0" />
        <span className="hidden text-[0.95rem] font-medium sm:inline" lang={current.htmlLang}>
          {current.native}
        </span>
        <CaretDown
          size={14}
          weight="bold"
          aria-hidden
          className={`hidden transition-transform duration-200 sm:block ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* On phones the panel spans the screen under the header; from sm up it hangs from the button. */}
      <div
        id="language-panel"
        role="dialog"
        aria-label={chrome.language.title}
        inert={!open}
        data-open={open}
        className="lang-panel fixed inset-x-3 top-[calc(var(--nav-h)+0.25rem)] z-50 sm:absolute sm:inset-x-auto sm:end-0 sm:top-[calc(100%+0.9rem)] sm:w-[27rem]"
      >
        <div className="menu-panel p-3 sm:p-4">
          <div className="mb-2 flex items-center justify-between gap-3 px-2 pt-1">
            <p className="font-display text-lg font-extrabold tracking-[-0.02em]">
              {chrome.language.title}
            </p>
            <button
              type="button"
              onClick={() => close(true)}
              aria-label={chrome.language.close}
              className="inline-grid size-11 place-items-center rounded-full text-ink/80 hover:text-ink"
            >
              <X size={20} aria-hidden />
            </button>
          </div>
          <ul className="grid grid-cols-2 gap-1">
            {locales.map((l) => {
              const active = l.code === locale;
              return (
                <li key={l.code}>
                  <RouterLink
                    to={localePath(l.code, base) as never}
                    hrefLang={l.hreflang}
                    lang={l.htmlLang}
                    aria-current={active ? "true" : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-14 items-center gap-2.5 rounded-2xl px-3 py-2 transition-colors hover:bg-white/10 sm:gap-3 sm:px-4 ${
                      active ? "bg-white/10" : ""
                    }`}
                  >
                    <span className="grid min-w-0 flex-1 leading-tight">
                      <span className="truncate text-[0.95rem] font-semibold sm:text-base">{l.native}</span>
                      {(l.native !== l.english || l.code === "en") && (
                        <span className="truncate text-xs text-muted" lang="en">
                          {l.code === "en" ? "English (US)" : l.english}
                        </span>
                      )}
                    </span>
                    {active && <Check size={18} weight="bold" className="shrink-0 text-accent" aria-hidden />}
                  </RouterLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
