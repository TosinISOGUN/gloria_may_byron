import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Link } from "@/components/link";
import { SiteChrome } from "@/components/site-chrome";
import { themeInitScript } from "@/components/theme-toggle";
import { en } from "@/i18n";
import { getLocale } from "@/i18n/locales";
import { useLocale } from "@/i18n/use-locale";

import appCss from "../styles.css?url";

function Message({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <section className="wrap grid min-h-[70dvh] content-center py-24">
      <h1 className="display-lg max-w-[14ch]">{title}</h1>
      <p className="lead mt-5">{text}</p>
      <div className="mt-8 flex flex-wrap gap-3">{children}</div>
    </section>
  );
}

function NotFound() {
  const t = en.errors.notFound;
  return (
    <SiteChrome locale="en" chrome={en.chrome}>
      <Message title={t.title} text={t.text}>
        <Link to="/" className="btn btn-primary">
          {t.home}
        </Link>
        <Link to="/music" className="btn btn-ghost">
          {t.music}
        </Link>
      </Message>
    </SiteChrome>
  );
}

function RouteError({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  const t = en.errors.routeError;
  return (
    <SiteChrome locale="en" chrome={en.chrome}>
      <Message title={t.title} text={t.text}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            void router.invalidate();
            reset();
          }}
        >
          {t.retry}
        </button>
        <a href="/" className="btn btn-ghost">
          {t.home}
        </a>
      </Message>
    </SiteChrome>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0a191e" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: "/fonts/cabinet-grotesk-800.woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: "/fonts/cabinet-grotesk-700.woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: "/fonts/satoshi-400.woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: "/fonts/satoshi-500.woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: "/fonts/satoshi-700.woff2",
        crossOrigin: "anonymous",
      },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon-192.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
    scripts: [{ children: themeInitScript }],
  }),
  shellComponent: RootShell,
  component: RootLayout,
  notFoundComponent: NotFound,
  errorComponent: RouteError,
});

function RootShell({ children }: { children: ReactNode }) {
  const locale = getLocale(useLocale());
  return (
    <html lang={locale.htmlLang} dir={locale.dir} data-script={locale.script} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/** The header and footer belong to the language layout (routes/{-}/route.tsx); the not-found and error pages bring their own. */
function RootLayout() {
  return <Outlet />;
}
