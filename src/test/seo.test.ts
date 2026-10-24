import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { nav, SITE_URL } from "@/data/site";
import { seo } from "@/lib/seo";

describe("share previews", () => {
  it("builds absolute Open Graph and Twitter image URLs on the deployment origin", () => {
    const meta = seo({ title: "T", description: "D", path: "/music", image: "music" }).meta;
    const value = (key: string) =>
      meta.find((m) => ("property" in m && m.property === key) || ("name" in m && m.name === key));
    expect(SITE_URL).toMatch(/^https?:\/\/[^/]+$/);
    expect(value("og:image")).toMatchObject({ content: `${SITE_URL}/og/music.jpg` });
    expect(value("twitter:image")).toMatchObject({ content: `${SITE_URL}/og/music.jpg` });
    expect(value("twitter:card")).toMatchObject({ content: "summary_large_image" });
  });

  it("ships an image file for every page", () => {
    const names = nav.map((n) => (n.to === "/" ? "home" : n.to.slice(1)));
    for (const name of names) {
      expect(existsSync(join(process.cwd(), "public/og", `${name}.jpg`)), name).toBe(true);
    }
  });
});
