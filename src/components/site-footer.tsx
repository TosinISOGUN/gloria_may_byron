import { Link } from "@tanstack/react-router";

import { nav, platforms, site, socials } from "@/data/site";

const col = "flex flex-col";
const item = "inline-flex min-h-11 items-center text-muted transition-colors hover:text-ink";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg-2">
      <div className="wrap grid gap-14 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">
            {site.motto}
          </p>
          <p className="mt-5 text-muted">{site.tagline}</p>
          <a
            className="link-inline mt-4 inline-flex min-h-11 items-center"
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>
        </div>
        <nav aria-label="Footer" className={col}>
          <h2 className="mb-2 text-base font-bold tracking-normal">Pages</h2>
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className={item}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className={col}>
          <h2 className="mb-2 text-base font-bold tracking-normal">Listen</h2>
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
          <h2 className="mb-2 text-base font-bold tracking-normal">Follow</h2>
          {socials.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noreferrer noopener" className={item}>
              {s.name}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <p className="wrap py-6 text-sm text-muted">Copyright © 2026 - {site.name}</p>
      </div>
    </footer>
  );
}
