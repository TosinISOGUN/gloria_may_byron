import { describe, expect, it } from "vitest";

import { images } from "@/data/images.generated";
import { lyricalVideos, releases, singles, video } from "@/data/music";
import { awardBadges, certificationBadges, galleryPhotoIds } from "@/data/profile";
import { nav, platforms, press, socials } from "@/data/site";
import { en } from "@/i18n";

const strings = (value: unknown): string[] =>
  typeof value === "string"
    ? [value]
    : Array.isArray(value)
      ? value.flatMap(strings)
      : value && typeof value === "object"
        ? Object.values(value).flatMap(strings)
        : [];

describe("content data", () => {
  it("references only images the pipeline produced", () => {
    const ids = [
      ...Object.values(video).map((v) => v.thumb),
      ...releases.map((r) => r.art),
      ...galleryPhotoIds,
      ...awardBadges,
      ...certificationBadges,
      ...platforms.map((p) => p.logo),
      ...press.map((p) => p.logo),
    ];
    for (const id of ids) expect(images, id).toHaveProperty(id);
  });

  it("keeps every item her site lists", () => {
    expect(releases).toHaveLength(23);
    expect(lyricalVideos).toHaveLength(12);
    expect(en.awards.list.items).toHaveLength(awardBadges.length);
    expect(en.awards.certs.names).toHaveLength(certificationBadges.length);
    expect(en.gallery.photos.alts).toHaveLength(galleryPhotoIds.length);
    expect(press).toHaveLength(7);
    expect(platforms).toHaveLength(8);
    expect(nav.map((n) => en.chrome.nav[n.key])).toEqual([
      "Home",
      "About",
      "How the songs are made",
      "Music",
      "Announcements",
      "Gallery",
      "Awards",
      "Contact",
    ]);
    expect(socials.map((s) => s.name)).toEqual(["Instagram", "X (Twitter)", "TikTok"]);
    expect(en.about.journey.steps).toHaveLength(5);
    expect(en.announcements.formulaIndie.title).toContain("19 February 2026");
  });

  it("only links to Tidal tracks that resolved when checked", () => {
    const live = singles.filter((s) => s.tidal).map((s) => s.title);
    expect(live).toEqual([
      "Creatures Of Wild Wonders",
      "Invitation",
      "Chasing The Sun",
      "Shadows Over Eden",
      "दिव्य खजाना",
      "Turn It Up",
    ]);
  });

  it("uses no em or en dashes in visible copy", () => {
    const all = [
      singles,
      lyricalVideos,
      releases,
      en.awards,
      en.announcements,
      en.about,
      en.home,
      en.contact,
      en.gallery,
      en.music,
    ].flatMap(strings);
    expect(all.filter((s) => /[\u2013\u2014]/.test(s))).toEqual([]);
  });
});
