import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { locales } from "@/i18n/locales";
import { routeTree } from "@/routeTree.gen";
import { Route as LocaleRoute } from "@/routes/{-$locale}/route";

const pages = ["/", "/about", "/authenticity", "/music", "/announcements", "/gallery", "/awards", "/contact"];
const inLanguage = (code: string, page: string) =>
  code === "en" ? page : page === "/" ? `/${code}` : `/${code}${page}`;

// Match routes without running loaders or rendering: jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  const router = createRouter({ routeTree });

  it.each(pages)("matches a page for %s instead of falling back to not found", (path) => {
    expect(router.matchRoutes(path).at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("has every page in every language", () => {
    for (const l of locales) {
      for (const page of pages) {
        const path = inLanguage(l.code, page);
        expect(router.matchRoutes(path).at(-1)?.routeId, path).not.toBe(rootRouteId);
      }
    }
  });

  it("falls back to not found for an unknown path", () => {
    // Nothing past the language layout matches, so no page is shown; the root not-found page takes over.
    expect([rootRouteId, "/{-$locale}"]).toContain(router.matchRoutes("/lyrics/extra").at(-1)?.routeId);
    expect([rootRouteId, "/{-$locale}"]).toContain(router.matchRoutes("/sv/nothing").at(-1)?.routeId);
  });

  it("rejects a first folder that is not a language", () => {
    // /lyrics reads as a language folder, so the language layout has to refuse it.
    const beforeLoad = LocaleRoute.options.beforeLoad as (ctx: { params: { locale?: string } }) => void;
    expect(() => beforeLoad({ params: { locale: "lyrics" } })).toThrow();
    expect(() => beforeLoad({ params: { locale: "sv" } })).not.toThrow();
    expect(() => beforeLoad({ params: {} })).not.toThrow();
    // English has no folder: /en/about must not exist next to /about.
    expect(() => beforeLoad({ params: { locale: "en" } })).toThrow();
  });
});
