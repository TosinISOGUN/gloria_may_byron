import { CaretDown, List, X } from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { Link } from "@/components/link";
import { navTree, site, socials, type NavNode } from "@/data/site";
import { fmt } from "@/i18n";
import type { LocaleCode } from "@/i18n/locales";
import type { Messages } from "@/i18n/messages/en";
import { useBasePath } from "@/i18n/use-locale";

import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

type Chrome = Messages["chrome"];

const linkBase =
  "inline-flex min-h-12 items-center rounded-full px-3 text-[0.95rem] font-medium text-ink/90 transition-colors hover:text-ink";
const activeLink = "!text-ink underline decoration-accent decoration-2 underline-offset-[10px]";

/** A parent link with related pages in a dropdown: opens on hover, on keyboard focus, or with the arrow button (touch). */
function NavGroup({ node, chrome }: { node: NavNode; chrome: Chrome }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const base = useBasePath();
  const label = chrome.nav[node.key];
  const active = node.children?.some((c) => c.to === base) ?? false;

  const show = () => {
    window.clearTimeout(timer.current);
    setOpen(true);
  };
  const hideSoon = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(false), 180);
  };

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <div
      className="group/nav relative"
      onPointerEnter={(e) => e.pointerType !== "touch" && show()}
      onPointerLeave={(e) => e.pointerType !== "touch" && hideSoon()}
      onFocus={show}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <div className="flex items-center">
        <Link
          to={node.to}
          className={`${linkBase} !pe-0.5 group-hover/nav:text-ink ${active ? activeLink : ""}`}
          aria-current={active ? "page" : undefined}
        >
          {label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`nav-panel-${node.key}`}
          aria-label={fmt(chrome.menu.expand, { group: label })}
          onClick={() => setOpen((v) => !v)}
          className="inline-grid h-9 w-6 -ms-0.5 place-items-center rounded-full text-ink/80 transition-colors hover:text-ink group-hover/nav:text-ink"
        >
          <CaretDown
            size={14}
            weight="bold"
            aria-hidden
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      <div
        id={`nav-panel-${node.key}`}
        data-open={open}
        inert={!open}
        className="nav-panel absolute -start-3 top-[calc(100%+0.9rem)] z-50 w-[22.5rem]"
      >
        <ul className="menu-panel grid gap-1 p-2.5">
          {node.children?.map((child) => {
            const here = child.to === base;
            return (
              <li key={child.key}>
                <Link
                  to={child.to}
                  onClick={() => setOpen(false)}
                  aria-current={here ? "page" : undefined}
                  className={`block rounded-2xl px-4 py-3 transition-colors hover:bg-white/10 ${here ? "bg-white/10" : ""}`}
                >
                  <span className={`block font-semibold ${here ? "text-accent" : ""}`}>
                    {chrome.nav[child.key]}
                  </span>
                  {child.hint && (
                    <span className="mt-0.5 block text-sm leading-snug text-muted">
                      {chrome.navHint[child.hint]}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function SiteNav({ locale, chrome }: { locale: LocaleCode; chrome: Chrome }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const solid = scrolled || open;
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    button.current?.focus();
  }, []);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry?.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const focusables = () =>
      Array.from(panel.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab") return;
      const items = [button.current, ...focusables()].filter((el): el is HTMLElement => !!el);
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = previous;
    };
  }, [open, close]);

  return (
    <>
      {/* Sits at the very top of the page; once it scrolls out of view the header takes shape. */}
      <div
        ref={sentinel}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-6 w-px"
      />
      <header
        data-site-header
        data-solid={solid}
        className="pointer-events-none sticky top-0 z-40"
        style={{ height: "var(--nav-h)" }}
      >
        {/* The header is a transparent strip; the pill floats in it, with frosted glass behind. */}
        <div className="wrap h-full pt-2">
          <div className="glass-pill pointer-events-auto flex h-14 items-center justify-between gap-3 rounded-full ps-5 pe-2.5 max-[359px]:gap-1.5 max-[359px]:ps-3.5 max-[359px]:pe-2.5 sm:gap-4 sm:ps-7 sm:pe-2">
            <Link
              to="/"
              className="inline-flex min-h-12 shrink-0 items-center whitespace-nowrap font-display text-[1.05rem] font-extrabold tracking-[-0.02em] text-ink max-[359px]:text-[0.9rem] min-[400px]:text-[1.2rem] sm:text-[1.35rem]"
              aria-label={fmt(chrome.home, { name: site.name })}
            >
              <span
                aria-hidden
                className="ink me-2 h-[1.05rem] w-[1.95rem] shrink-0 max-[379px]:hidden min-[400px]:me-2.5 min-[400px]:h-[1.15rem] min-[400px]:w-[2.15rem] sm:h-5 sm:w-[2.35rem]"
                style={{ "--mask": "url(/brand/logo-mark.png)" } as CSSProperties}
              />
              {site.name}
            </Link>
            <nav aria-label={chrome.menu.main} className="hidden items-center lg:flex">
              {navTree.map((item) =>
                item.children ? (
                  <NavGroup key={item.key} node={item} chrome={chrome} />
                ) : (
                  <Link
                    key={item.key}
                    to={item.to}
                    className={linkBase}
                    activeOptions={{ exact: true }}
                    activeProps={{ className: activeLink, "aria-current": "page" }}
                  >
                    {chrome.nav[item.key]}
                  </Link>
                ),
              )}
            </nav>
            <div className="flex items-center gap-0.5 min-[360px]:gap-1 sm:gap-2">
              <LanguageSwitcher locale={locale} chrome={chrome} />
              <ThemeToggle label={chrome.theme} />
              <button
                ref={button}
                type="button"
                className="inline-grid size-11 place-items-center rounded-full border border-line text-ink sm:size-12 lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? chrome.menu.close : chrome.menu.open}
                onClick={() => (open ? close() : setOpen(true))}
              >
                {open ? <X size={22} aria-hidden /> : <List size={22} aria-hidden />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sibling of the header, not a child: the header's blur would otherwise trap this fixed panel. */}
      <div
        id="mobile-menu"
        ref={panel}
        inert={!open}
        aria-hidden={!open}
        className={`fixed inset-0 z-30 overflow-y-auto bg-bg transition-[opacity,transform] duration-300 lg:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        {/* The panel covers the whole screen; the padding keeps the links clear of the nav pill above it. */}
        <nav
          aria-label={chrome.menu.mobile}
          className="wrap flex min-h-full flex-col justify-between gap-10 pb-8 pt-[calc(var(--nav-h)+1.5rem)]"
        >
          <ul className="flex flex-col">
            {navTree.map((item) => (
              <li key={item.key} className="border-b border-line">
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: true }}
                  activeProps={{
                    className:
                      "!text-accent underline decoration-accent decoration-[3px] underline-offset-[10px]",
                    "aria-current": "page",
                  }}
                  className="flex min-h-16 items-center font-display text-[2rem] font-extrabold tracking-[-0.03em] text-ink"
                >
                  {chrome.nav[item.key]}
                </Link>
                {item.children && (
                  <ul className="mb-4 ms-1 grid gap-0.5 border-s border-line ps-4">
                    {item.children.map((child) => (
                      <li key={child.key}>
                        <Link
                          to={child.to}
                          onClick={() => setOpen(false)}
                          activeOptions={{ exact: true }}
                          activeProps={{ className: "!text-accent", "aria-current": "page" }}
                          className="flex min-h-12 items-center text-[1.15rem] font-medium text-muted hover:text-ink"
                        >
                          {chrome.nav[child.key]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 text-muted">
            <a className="link-inline w-fit" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <ul className="flex flex-wrap gap-x-5">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    className="inline-flex min-h-12 items-center"
                    href={s.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
