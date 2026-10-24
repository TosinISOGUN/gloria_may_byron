import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  const router = createRouter({ routeTree });

  it.each(["/", "/about", "/music", "/announcements", "/gallery", "/awards", "/contact"])(
    "matches a page for %s instead of falling back to not found",
    (path) => {
      expect(router.matchRoutes(path).at(-1)?.routeId).not.toBe(rootRouteId);
    },
  );

  it("falls back to not found for an unknown path", () => {
    expect(router.matchRoutes("/lyrics").at(-1)?.routeId).toBe(rootRouteId);
  });
});
