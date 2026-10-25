import { ArrowRight, ArrowUpRight, SpotifyLogo } from "@phosphor-icons/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import type { CSSProperties } from "react";

import { BadgeStrip } from "@/components/badge-strip";
import { Img } from "@/components/img";
import { Marquee } from "@/components/marquee";
import { MottoStage } from "@/components/motto-stage";
import { SectionHead } from "@/components/section-head";
import { VideoCard } from "@/components/video-player";
import { homeAbout, certifications, galleryPhotos } from "@/data/profile";
import { homeFeatured, homeVideos } from "@/data/music";
import { SITE_URL, highlights, platforms, press, site, socials, spotifyUrl } from "@/data/site";
import { seo } from "@/lib/seo";
import { delay } from "@/lib/style";

export const Route = createFileRoute("/")({
  head: () => {
    const base = seo({
      title: "Gloria May Byron | Award-Winning Singer & Songwriter",
      description: site.description,
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

/** Taken from her biography: "substance over trends and connection over spectacle". */
const mottoWords = ["Substance", "over", "trends.", "Connection", "over", "spectacle."];

/** The first photographs of the gallery, shown in the same mosaic as the Gallery page. */
const galleryPicks = galleryPhotos.slice(0, 8);

function Home() {
  return (
    <>
      {/* Hero */}
      <section
        data-hero
        data-tone="dark"
        className="relative isolate -mt-[var(--nav-h)] flex min-h-[100dvh] items-end overflow-hidden"
      >
        <div className="hero-media hero-drift absolute inset-x-0 -top-[7%] -z-20 h-[107%]">
          <Img
            id="heroStudio"
            alt="Gloria May Byron singing into a studio microphone in warm light"
            sizes="100vw"
            priority
            className="ken size-full object-cover object-[63%_18%] md:object-[74%_28%] md:portrait:object-[58%_28%]"
          />
        </div>
        <div className="hero-scrim absolute inset-0 -z-10" aria-hidden />
        <div className="hero-copy hero-out wrap pb-14 pt-40 md:pb-24">
          <h1 className="display-xl rise max-w-[11ch]" style={delay(0)}>
            {site.name}
          </h1>
          <p className="lead rise mt-6 max-w-[34ch] !text-ink/90" style={delay(1)}>
            {site.motto} Award-winning singer and songwriter, heard in over 200 countries.
          </p>
          <div className="rise mt-9 flex flex-wrap items-center gap-x-6 gap-y-3" style={delay(2)}>
            <a
              className="btn btn-spotify"
              href={spotifyUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              <SpotifyLogo size={22} aria-hidden />
              Listen on Spotify
            </a>
            <Link to="/about" className="btn-text">
              Read her story <ArrowRight size={20} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Her values, as a looping ribbon */}
      <Marquee words={site.tagline.split(" ~ ")} label="Her values" />

      {/* About */}
      <section className="section max-lg:pt-0">
        <div className="wrap grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal -mx-[clamp(16px,4vw,48px)] lg:col-span-5 lg:mx-0">
            <div className="media max-lg:!rounded-none lg:sticky lg:top-28">
              <Img
                id="headphones"
                alt="Gloria May Byron singing in headphones"
                sizes="(min-width: 1024px) 38vw, 92vw"
                className="aspect-[4/5] w-full object-cover"
                style={{ objectPosition: "50% 40%" }}
              />
            </div>
          </div>
          <div className="reveal lg:col-span-7">
            <h2 className="display-lg max-w-[16ch]">{homeAbout.heading}</h2>
            <div className="prose-flow mt-8">
              {homeAbout.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Link to="/about" className="btn btn-ghost mt-9">
              Read the full bio <ArrowRight size={20} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured music */}
      <section className="section bg-bg-2">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="reveal lg:sticky lg:top-28 lg:self-start">
            <SectionHead title="Featured music" sub="Discover melodies that move you." />
            <Link to="/music" className="btn btn-primary mt-8">
              View all music
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
                      <span className="sr-only">{`Open ${s.title} on ${s.tidal ? "Tidal" : "YouTube"}`}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* A pinned statement: its words light up as the page scrolls, over a moving stage. */}
      <section className="motto" aria-label="In her words">
        <div className="motto-pin px-[clamp(16px,4vw,48px)]">
          <MottoStage />
          <p
            className="mx-auto max-w-[26ch] text-center font-display font-extrabold leading-[1] tracking-[-0.04em]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.4rem)" }}
          >
            {mottoWords.map((w, i) => (
              <span key={w + i}>
                <span
                  className={`motto-word inline-block pr-[0.22em] ${i % 3 === 0 ? "text-accent" : ""} ${i % 3 === 2 ? "motto-strike" : ""}`}
                  style={{ "--w": i } as CSSProperties}
                >
                  {w}
                </span>
                {i === 2 && <br className="max-md:hidden" />}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* Featured videos */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            title="Featured videos"
            sub="Watch the music come alive."
            className="reveal"
            action={
              <Link to="/music" className="btn btn-ghost">
                View all videos
              </Link>
            }
          />
        </div>
        <div className="wrap reveal mt-12">
          <div className="rail" tabIndex={0} role="group" aria-label="Featured videos">
            {homeVideos.map((v) => (
              <VideoCard key={v.id} video={v} sizes="(min-width: 640px) 520px, 82vw" />
            ))}
          </div>
        </div>
      </section>

      {/* Platforms: a tight strip, so the page's pace changes after the videos. */}
      <section className="border-y border-line py-[clamp(48px,7vw,88px)]">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHead title="Platforms I am available on" className="reveal" />
          <ul className="reveal grid grid-cols-2 border-l border-t border-line sm:grid-cols-4">
            {platforms.map((p) => (
              <li key={p.name} className="border-b border-r border-line">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${p.name}: Gloria May Byron`}
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
            <h2 className="display-md max-w-[16ch]">Behind the music, behind the magic.</h2>
            <p
              className="mt-10 font-display font-extrabold leading-[0.85] tracking-[-0.06em] text-accent"
              style={{ fontSize: "clamp(6rem, 17vw, 14rem)" }}
              aria-label="Over 200 countries"
            >
              200+
            </p>
            <p className="lead mt-3">countries where her music is enjoyed.</p>
          </div>
          <div className="reveal">
            <dl className="border-t border-line">
              {highlights.map((h) => (
                <div key={h.title} className="border-b border-line py-7">
                  <dt className="font-display text-2xl font-extrabold tracking-[-0.02em]">
                    {h.title}
                  </dt>
                  <dd className="mt-2 text-muted">{h.text}</dd>
                </div>
              ))}
            </dl>
            <Link to="/awards" className="btn btn-ghost mt-9">
              View more achievements
            </Link>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            title="Awards and global recognition"
            sub="Recognized internationally for artistic excellence, songwriting, and global listener impact."
            className="reveal"
          />
          <BadgeStrip items={certifications} className="reveal mt-14" />
          <div className="mt-14 grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="reveal grid grid-cols-2 gap-4 lg:col-span-7">
              <div className="media translate-y-8">
                <Img
                  id="awardTrophy"
                  alt="The InterContinental Music Awards trophy"
                  sizes="(min-width: 1024px) 28vw, 44vw"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
              <div className="media">
                <Img
                  id="awardCrystal"
                  alt="The Global Recognition Awards crystal trophy"
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
                Multiple
              </p>
              <p className="lead mt-3">
                <span className="sr-only">Multiple </span>awards, from international organizations.
              </p>
              <Link to="/awards" className="btn btn-ghost mt-8">
                View more awards
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section bg-bg-2">
        <div className="wrap">
          <SectionHead
            title="Gallery"
            sub="Frames of melody and moments."
            className="reveal"
            action={
              <Link to="/gallery" className="btn btn-ghost">
                View the full gallery
              </Link>
            }
          />
          <ul className="mosaic mt-12 columns-2 gap-[3px] md:columns-3 lg:columns-4">
            {galleryPicks.map((p) => (
              <li key={p.id} className="tile mb-[3px] break-inside-avoid">
                <Link to="/gallery" className="group relative block w-full overflow-hidden bg-bg-2">
                  <Img
                    id={p.id}
                    alt={p.alt}
                    sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw"
                    className="tile-img h-auto w-full"
                  />
                  <span
                    className="pointer-events-none absolute bottom-3 right-3 grid size-10 translate-y-2 place-items-center rounded-full bg-bg/80 text-ink opacity-0 backdrop-blur-sm transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
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
          <SectionHead title="As seen on" sub="Official media recognition and industry features." />
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
          <p className="mt-10 text-muted">And many more media outlets.</p>
        </div>
      </section>

      {/* Call to work together */}
      <section className="pb-[clamp(72px,11vw,150px)]">
        <div className="wrap">
          <div className="card reveal grid overflow-hidden lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 sm:p-14 lg:p-16">
              <h2 className="display-lg max-w-[12ch]">Let's work together</h2>
              <p className="lead mt-5">
                Whether it's a performance, collaboration, or creative project, let's create
                something meaningful.
              </p>
              <Link to="/contact" className="btn btn-primary mt-9">
                Get in touch
              </Link>
            </div>
            <Img
              id="portraitOcean"
              alt="Gloria May Byron in a brown coat on a headland above the ocean at dusk"
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
