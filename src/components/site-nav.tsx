import { List, X } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { nav, site, socials } from "@/data/site";

import { ThemeToggle } from "./theme-toggle";

const linkBase =
  "inline-flex min-h-12 items-center rounded-full px-3 text-[0.95rem] font-medium text-ink/90 transition-colors hover:text-ink";

export function SiteNav() {
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
          <div className="glass-pill pointer-events-auto flex h-14 items-center justify-between gap-4 rounded-full pl-5 pr-1.5 sm:pl-7 sm:pr-2">
            <Link
              to="/"
              className="inline-flex min-h-12 shrink-0 items-center whitespace-nowrap font-display text-[1.05rem] font-extrabold tracking-[-0.02em] text-ink min-[400px]:text-[1.2rem] sm:text-[1.35rem]"
              aria-label={`${site.name}, home`}
            >
              <span
                aria-hidden
                className="ink mr-2 h-[1.05rem] w-[1.95rem] shrink-0 max-[339px]:hidden min-[400px]:mr-2.5 min-[400px]:h-[1.15rem] min-[400px]:w-[2.15rem] sm:h-5 sm:w-[2.35rem]"
                style={{ "--mask": "url(/brand/logo-mark.png)" } as CSSProperties}
              />
              {site.name}
            </Link>
            <nav aria-label="Main" className="hidden items-center lg:flex">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={linkBase}
                  activeOptions={{ exact: true }}
                  activeProps={{
                    className:
                      "!text-ink underline decoration-accent decoration-2 underline-offset-[10px]",
                    "aria-current": "page",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                ref={button}
                type="button"
                className="inline-grid size-12 place-items-center rounded-full border border-line text-ink lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
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
          aria-label="Mobile"
          className="wrap flex min-h-full flex-col justify-between gap-10 pb-8 pt-[calc(var(--nav-h)+1.5rem)]"
        >
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.to} className="border-b border-line">
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
                  {item.label}
                </Link>
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
