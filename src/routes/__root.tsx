import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { themeInitScript } from "@/components/theme-toggle";

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
  return (
    <Message
      title="That page isn't here."
      text="It may have moved. The music is still where you left it."
    >
      <Link to="/" className="btn btn-primary">
        Back home
      </Link>
      <Link to="/music" className="btn btn-ghost">
        Browse the music
      </Link>
    </Message>
  );
}

function RouteError({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  return (
    <Message
      title="This page didn't load."
      text="Something went wrong on our end. Try again, or head back home."
    >
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          void router.invalidate();
          reset();
        }}
      >
        Try again
      </button>
      <a href="/" className="btn btn-ghost">
        Back home
      </a>
    </Message>
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
        href: "/fonts/satoshi-400.woff2",
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
  return (
    <html lang="en" suppressHydrationWarning>
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

function RootLayout() {
  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-accent px-5 py-3 font-bold text-on-accent focus:translate-y-0"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
