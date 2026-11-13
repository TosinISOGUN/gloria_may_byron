import { ArrowRight, ArrowUpRight, SpotifyLogo } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/components/link";

import { BadgeStrip } from "@/components/badge-strip";
import { ClipPlayer } from "@/components/clip-player";
import { Img } from "@/components/img";
import { Marquee } from "@/components/marquee";
import { ScrollRail } from "@/components/scroll-rail";
import { SectionHead } from "@/components/section-head";
import { VideoCard } from "@/components/video-player";
import { certificationBadges, galleryPhotoIds } from "@/data/profile";
import { homeFeatured, homeVideos } from "@/data/music";
import { SITE_URL, platforms, press, site, socials, spotifyUrl } from "@/data/site";
import { fmt, messagesForParam } from "@/i18n";
import { useT } from "@/i18n/messages-context";
import { seo } from "@/lib/seo";
import { delay } from "@/lib/style";

export const Route = createFileRoute("/{-$locale}/")({
  loader: async ({ params }) => {
    const m = await messagesForParam(params.locale);
    return { title: m.home.meta.title, description: m.brand.description };
  },
  head: ({ params, loaderData }) => {
    const base = seo({
      locale: params.locale,
      title: loaderData?.title ?? "",
      description: loaderData?.description ?? "",
      path: "/",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MusicGroup",
            name: site.name,
            url: SITE_URL,
            description: site.description,
            genre: ["Pop", "Soft pop", "Christian pop"],
            sameAs: [...platforms.map((p) => p.url), ...socials.map((s) => s.url)],
          }),
        },
      ],
    };
  },
  component: Home,
});

/** The first photographs of the gallery, shown in the same mosaic as the Gallery page. */
const galleryPicks = galleryPhotoIds.slice(0, 8);

function Home() {
  const t = useT();
  const h = t.home;
  const c = t.common;
  return (
    <>
      {/* Hero */}
      <section
        data-hero
        data-tone="dark"
        className="relative isolate -mt-[var(--nav-h)] flex min-h-[100svh] items-end overflow-hidden"
      >
        <div className="hero-media hero-drift absolute inset-x-0 -top-[7%] -z-20 h-[107%]">
          <Img
            id="heroStudio"
            alt={h.hero.alt}
            sizes="100vw"
            priority
            className="ken size-full object-cover object-[63%_18%] md:object-[74%_28%] md:portrait:object-[58%_28%]"
          />
        </div>
        <div className="hero-scrim absolute inset-0 -z-10" aria-hidden />
        <div className="hero-copy hero-out wrap pb-14 pt-40 md:pb-24">
          {/* Widths in em, not ch: ch follows whichever font is showing, so it would change when the web font arrives. */}
          <h1 lang="en" className="display-xl rise max-w-[7.425em]" style={delay(0)}>
            {site.name}
          </h1>
          <p className="lead rise mt-6 max-w-[23.22em] !text-ink/90" style={delay(1)}>
            {t.brand.motto} {h.hero.lead}
          </p>
          <div className="rise mt-9 flex flex-wrap items-center gap-x-6 gap-y-3" style={delay(2)}>
            <a
              className="btn btn-spotify"
              href={spotifyUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              <SpotifyLogo size={22} aria-hidden />
              {c.listenSpotify}
            </a>
            <Link to="/about" className="btn-text">
              {c.readStory} <ArrowRight size={20} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Her values, as a looping ribbon */}
      <Marquee words={t.brand.values} label={t.brand.valuesLabel} />

      {/* About */}
      <section className="section max-lg:pt-0">
        <div className="wrap grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal -mx-[clamp(16px,4vw,48px)] lg:col-span-5 lg:mx-0">
            <div className="media max-lg:!rounded-none lg:sticky lg:top-28">
              <Img
                id="headphones"
                alt={h.about.alt}
                sizes="(min-width: 1024px) 38vw, 92vw"
                className="aspect-[4/5] w-full object-cover"
                style={{ objectPosition: "50% 40%" }}
              />
            </div>
          </div>
          <div className="reveal lg:col-span-7">
            <h2 className="display-lg max-w-[16ch]">{h.about.heading}</h2>
            <div className="prose-flow mt-8">
              {h.about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Link to="/about" className="btn btn-ghost mt-9">
              {c.readBio} <ArrowRight size={20} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* The newest announcement: the same clip as the Announcements page */}
      <section className="section border-t border-line max-lg:pt-12">
        {/* Phone: message, clip, buttons. Desktop: clip on the left, message and buttons on the right. */}
        <div className="wrap grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-20 lg:gap-y-0">
          <div className="reveal lg:col-start-2 lg:row-start-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              {h.news.eyebrow}
            </p>
            <h2 className="display-lg mt-3 max-w-[16ch]">{h.news.title}</h2>
            <p className="lead mt-6 max-w-[48ch]">{h.news.teaser}</p>
          </div>
          <ClipPlayer
            src="/video/message-to-fans-2026-11.mp4"
            poster="/video/message-to-fans-2026-11-poster.webp"
            posterSmall="/video/message-to-fans-2026-11-poster-320.webp"
            label={h.news.videoLabel}
            className="reveal mx-auto aspect-[480/850] w-full max-w-[300px] lg:col-start-1 lg:row-span-4 lg:row-start-1 lg:mx-0"
          />
          <div className="reveal flex flex-wrap items-center gap-3 lg:col-start-2 lg:row-start-3 lg:mt-8">
            <Link to="/announcements" className="btn btn-primary">
              {c.allAnnouncements} <ArrowRight size={20} aria-hidden />
            </Link>
            <a
              className="btn btn-ghost"
              href={socials.find((s) => s.name === "Instagram")!.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              {c.followInstagram}
            </a>
          </div>
        </div>
      </section>

      {/* Featured music */}
      <section className="section bg-bg-2">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="reveal lg:sticky lg:top-28 lg:self-start">
            <SectionHead title={h.music.title} sub={h.music.sub} />
            <Link to="/music" className="btn btn-primary mt-8">
              {c.viewAllMusic}
            </Link>
          </div>
          <ol className="reveal border-t border-line">
            {homeFeatured.map((s) => {
              const href = s.tidal ?? `https://www.youtube.com/watch?v=${s.video.id}`;
              return (
                <li key={s.title} className="border-b border-line">
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4 sm:gap-6"
                  >
                    <span className="media w-28 sm:w-44">
                      <Img
                        id={s.video.thumb}
                        alt=""
                        sizes="(min-width: 640px) 176px, 112px"
                        className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </span>
                    <span>
                      <span className="block font-display text-[clamp(1.1rem,2vw,1.55rem)] font-bold leading-tight tracking-[-0.015em]">
                        {s.title}
                      </span>
                      {s.note && <span className="block text-sm text-muted">{s.note}</span>}
                    </span>
                    <span className="inline-flex items-center gap-2 font-bold text-muted transition-colors group-hover:text-accent">
                      <span className="hidden sm:inline">{s.tidal ? "Tidal" : "YouTube"}</span>
                      <ArrowUpRight size={22} aria-hidden />
                      <span className="sr-only">{fmt(c.openOn, { title: s.title, platform: s.tidal ? "Tidal" : "YouTube" })}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Featured videos */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            title={h.videos.title}
            sub={h.videos.sub}
            className="reveal"
            action={
              <Link to="/music" className="btn btn-ghost">
                {c.viewAllVideos}
              </Link>
            }
          />
        </div>
        <div className="wrap reveal mt-12">
          <ScrollRail label={h.videos.title}>
            {homeVideos.map((v) => (
              <VideoCard key={v.id} video={v} sizes="(min-width: 640px) 520px, 82vw" />
            ))}
          </ScrollRail>
        </div>
      </section>

      {/* Platforms: a tight strip, so the page's pace changes after the videos. */}
      <section className="border-y border-line py-[clamp(48px,7vw,88px)]">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHead title={h.platforms.title} className="reveal" />
          <ul className="reveal grid grid-cols-2 border-s border-t border-line sm:grid-cols-4">
            {platforms.map((p) => (
              <li key={p.name} className="border-b border-e border-line">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={fmt(c.platformLabel, { name: p.name })}
                  className="logo-tile grid h-24 place-items-center px-6"
                >
                  <Img
                    id={p.logo}
                    alt=""
                    sizes="160px"
                    className="h-7 w-auto max-w-[7.5rem] object-contain"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Highlights */}
      <section className="section bg-bg-2">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="reveal">
            <h2 className="display-md max-w-[16ch]">{h.behind.title}</h2>
            <p
              className="mt-10 font-display font-extrabold leading-[0.85] tracking-[-0.06em] text-accent"
              style={{ fontSize: "clamp(6rem, 17vw, 14rem)" }}
              aria-label={h.behind.countriesLabel}
            >
              200+
            </p>
            <p className="lead mt-3">{h.behind.countries}</p>
          </div>
          <div className="reveal">
            <dl className="border-t border-line">
              {h.behind.items.map((item) => (
                <div key={item.title} className="border-b border-line py-7">
                  <dt className="font-display text-2xl font-extrabold tracking-[-0.02em]">
                    {item.title}
                  </dt>
                  <dd className="mt-2 text-muted">{item.text}</dd>
                </div>
              ))}
            </dl>
            <Link to="/awards" className="btn btn-ghost mt-9">
              {c.viewMoreAchievements}
            </Link>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            title={h.awards.title}
            sub={h.awards.sub}
            className="reveal"
          />
          <BadgeStrip
            items={t.awards.certs.names.map((name, i) => ({ name, badge: certificationBadges[i]! }))}
            className="reveal mt-14"
          />
          <div className="mt-14 grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="reveal grid grid-cols-2 gap-4 lg:col-span-7">
              <div className="media translate-y-8">
                <Img
                  id="awardTrophy"
                  alt={h.awards.trophyAlt}
                  sizes="(min-width: 1024px) 28vw, 44vw"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
              <div className="media">
                <Img
                  id="awardCrystal"
                  alt={h.awards.crystalAlt}
                  sizes="(min-width: 1024px) 28vw, 44vw"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
            </div>
            <div className="reveal lg:col-span-5 lg:pb-4">
              <p
                className="font-display font-extrabold leading-[0.85] tracking-[-0.06em] text-accent"
                style={{ fontSize: "clamp(3.4rem, 7.4vw, 6.2rem)" }}
                aria-hidden
              >
                {h.awards.multiple}
              </p>
              <p className="lead mt-3">
                <span className="sr-only">{h.awards.multiple} </span>{h.awards.multipleText}
              </p>
              <Link to="/awards" className="btn btn-ghost mt-8">
                {c.viewMoreAwards}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section bg-bg-2">
        <div className="wrap">
          <SectionHead
            title={h.gallery.title}
            sub={h.gallery.sub}
            className="reveal"
            action={
              <Link to="/gallery" className="btn btn-ghost">
                {c.viewFullGallery}
              </Link>
            }
          />
          <ul className="mosaic mt-12 columns-2 gap-[3px] md:columns-3 lg:columns-4">
            {galleryPicks.map((id, i) => (
              <li key={id} className="tile mb-[3px] break-inside-avoid">
                <Link to="/gallery" className="group relative block w-full overflow-hidden bg-bg-2">
                  <Img
                    id={id}
                    alt={t.gallery.photos.alts[i] ?? ""}
                    sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw"
                    className="tile-img h-auto w-full"
                  />
                  <span
                    className="pointer-events-none absolute bottom-3 end-3 grid size-10 translate-y-2 place-items-center rounded-full bg-bg/80 text-ink opacity-0 backdrop-blur-sm transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                    aria-hidden
                  >
                    <ArrowUpRight size={20} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* As seen on */}
      <section className="section">
        <div className="wrap reveal">
          <SectionHead title={h.press.title} sub={h.press.sub} />
          <ul className="logo-tile mt-14 flex flex-wrap items-center justify-between gap-x-10 gap-y-8 rounded-[var(--radius-card)] px-8 py-9">
            {press.map((p) => (
              <li key={p.name}>
                <Img
                  id={p.logo}
                  alt={p.name}
                  sizes="200px"
                  className="h-7 w-auto max-w-[10rem] object-contain md:h-8"
                />
              </li>
            ))}
          </ul>
          <p className="mt-10 text-muted">{h.press.more}</p>
        </div>
      </section>

      {/* Call to work together */}
      <section className="pb-[clamp(72px,11vw,150px)]">
        <div className="wrap">
          <div className="card reveal grid overflow-hidden lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 sm:p-14 lg:p-16">
              <h2 className="display-lg max-w-[12ch]">{h.cta.title}</h2>
              <p className="lead mt-5">
                {h.cta.text}
              </p>
              <Link to="/contact" className="btn btn-primary mt-9">
                {c.getInTouch}
              </Link>
            </div>
            <Img
              id="portraitOcean"
              alt={h.cta.alt}
              sizes="(min-width: 1024px) 40vw, 92vw"
              className="aspect-[4/3] size-full object-cover lg:aspect-auto"
              style={{ objectPosition: "50% 20%" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
