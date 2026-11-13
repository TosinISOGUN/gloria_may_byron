import { Link } from "@/components/link";
import { nav, platforms, site, socials } from "@/data/site";
import { fmt } from "@/i18n";
import { useT } from "@/i18n/messages-context";
import type { Messages } from "@/i18n/messages/en";

const col = "flex flex-col";
const item = "inline-flex min-h-11 items-center text-muted transition-colors hover:text-ink";

/** Read once when the page loads, so the copyright year is always the current one. */
const YEAR = new Date().getFullYear();

export function SiteFooter({ chrome }: { chrome: Messages["chrome"] }) {
  return (
    <footer className="border-t border-line bg-bg-2">
      <div className="wrap grid gap-x-8 gap-y-12 py-16 md:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="md:col-span-3 lg:col-span-1">
          <img
            src="/brand/logo-badge.png"
            alt={fmt(chrome.footer.logoAlt, { name: site.name })}
            width={344}
            height={244}
            loading="lazy"
            decoding="async"
            className="ink-img mb-8 h-[7.5rem] w-auto opacity-60"
          />
          <p className="font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">
            {useT().brand.motto}
          </p>
          <a
            className="link-inline mt-5 inline-flex min-h-11 items-center"
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>
        </div>
        <nav aria-label="Footer" className={col}>
          <h2 className="mb-2 text-base font-bold tracking-normal">{chrome.footer.pages}</h2>
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className={item}>
              {chrome.nav[n.key]}
            </Link>
          ))}
        </nav>
        <div className={col}>
          <h2 className="mb-2 text-base font-bold tracking-normal">{chrome.footer.listen}</h2>
          {platforms
            .filter((p) => p.name !== "YouTube")
            .map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noreferrer noopener"
                className={item}
              >
                {p.name}
              </a>
            ))}
        </div>
        <div className={col}>
          <h2 className="mb-2 text-base font-bold tracking-normal">{chrome.footer.follow}</h2>
          {socials.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noreferrer noopener" className={item}>
              {s.name}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <p className="wrap py-6 text-sm text-muted" suppressHydrationWarning>
          {fmt(chrome.footer.copyright, { year: YEAR, name: site.name })}
        </p>
      </div>
    </footer>
  );
}
