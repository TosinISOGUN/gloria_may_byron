import { ArrowRight, ArrowUpRight, SpotifyLogo } from "@phosphor-icons/react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { Img } from "@/components/img";
import { SectionHead } from "@/components/section-head";
import { VideoCard } from "@/components/video-player";
import { homeAbout, awards, certifications } from "@/data/profile";
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

const galleryPicks = [
  {
    id: "liveTrio",
    span: "col-span-6 row-span-2 md:col-span-4",
    alt: "Gloria May Byron singing with two other vocalists and a male singer",
    pos: "50% 30%",
  },
  {
    id: "liveDress",
    span: "col-span-6 row-span-2 md:col-span-4",
    alt: "Gloria May Byron in a pale dress holding a candle beside a piano",
    pos: "50% 40%",
  },
  {
    id: "headphones",
    span: "col-span-6 md:col-span-4",
    alt: "Gloria May Byron singing in headphones",
    pos: "50% 40%",
  },
  {
    id: "groupSelfie",
    span: "col-span-6 md:col-span-4",
    alt: "Gloria May Byron with her band in the studio",
    pos: "30% 68%",
  },
  {
    id: "liveBlack",
    span: "col-span-6 row-span-2 md:col-span-5",
    alt: "Gloria May Byron in a black dress",
    pos: "50% 25%",
  },
  {
    id: "portraitEyes",
    span: "col-span-6 row-span-2 md:col-span-7",
    alt: "Close portrait of Gloria May Byron with her eyes closed",
    pos: "50% 35%",
  },
] as const;

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate -mt-[var(--nav-h)] flex min-h-[100dvh] items-end overflow-hidden">
        <Img
          id="heroStudio"
          alt="Gloria May Byron singing into a studio microphone in warm light"
          sizes="100vw"
          priority
          className="ken absolute inset-0 -z-20 size-full object-cover object-[63%_18%] md:object-[74%_28%]"
        />
        <div className="hero-scrim absolute inset-0 -z-10" aria-hidden />
        <div className="wrap pb-14 pt-40 md:pb-24">
          <h1 className="display-xl rise max-w-[11ch]" style={delay(0)}>
            {site.name}
          </h1>
          <p className="lead rise mt-6 max-w-[34ch] !text-ink/90" style={delay(1)}>
            {site.motto} Award-winning singer and songwriter, heard in over 200 countries.
          </p>
          <div className="rise mt-9 flex flex-wrap items-center gap-x-6 gap-y-3" style={delay(2)}>
            <a
              className="btn btn-primary"
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

      {/* Tagline */}
      <div className="border-y border-line">
        <p className="wrap flex flex-wrap items-center gap-x-4 gap-y-1 py-6 font-display text-[clamp(1.05rem,2.1vw,1.55rem)] font-bold tracking-[-0.01em] text-muted">
          {site.tagline.split(" ~ ").map((word, i, all) => (
            <span key={word} className="inline-flex items-center gap-4">
              <span className="text-ink">{word}</span>
              {i < all.length - 1 && (
                <span className="text-accent" aria-hidden>
                  ~
                </span>
              )}
            </span>
          ))}
        </p>
      </div>

      {/* About */}
      <section className="section">
        <div className="wrap grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-5">
            <div className="media lg:sticky lg:top-28">
              <Img
                id="portraitWhite"
                alt="Gloria May Byron in a white off-shoulder top with long honey-colored hair"
                sizes="(min-width: 1024px) 38vw, 92vw"
                className="aspect-[4/5] w-full object-cover"
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

      {/* Platforms */}
      <section className="section border-t border-line">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHead title="Platforms I am available on" className="reveal" />
          <ul className="reveal grid grid-cols-2 border-l border-t border-line sm:grid-cols-4">
            {platforms.map((p) => (
              <li key={p.name} className="border-b border-r border-line">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${p.name}: Gloria May Byron`}
                  className="logo-tile grid h-28 place-items-center px-6"
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
          <div className="mt-14 grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <ul className="reveal flex flex-wrap items-center gap-x-8 gap-y-8">
              {certifications.map((c) => (
                <li key={c.name}>
                  <span className="block rounded-full bg-[#eef4f2] p-2.5">
                    <Img
                      id={c.badge}
                      alt={c.name}
                      sizes="150px"
                      className="size-24 object-contain sm:size-32"
                    />
                  </span>
                </li>
              ))}
            </ul>
            <div className="reveal grid grid-cols-2 gap-4">
              <div className="media translate-y-8">
                <Img
                  id="awardTrophy"
                  alt="The InterContinental Music Awards trophy"
                  sizes="(min-width: 1024px) 20vw, 44vw"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
              <div className="media">
                <Img
                  id="awardCrystal"
                  alt="The Global Recognition Awards crystal trophy"
                  sizes="(min-width: 1024px) 20vw, 44vw"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
            </div>
          </div>
          <p className="mt-16 text-muted">
            {awards.length} awards, from three international organizations.
          </p>
          <Link to="/awards" className="btn btn-ghost mt-4">
            View more awards
          </Link>
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
          <ul className="reveal mt-12 grid auto-rows-[120px] grid-cols-6 gap-3 sm:auto-rows-[170px] md:auto-rows-[200px] md:grid-cols-12 md:gap-4">
            {galleryPicks.map((p) => (
              <li key={p.id} className={`media ${p.span}`}>
                <Img
                  id={p.id}
                  alt={p.alt}
                  sizes="(min-width: 768px) 40vw, 92vw"
                  className="size-full object-cover"
                  style={{ objectPosition: p.pos }}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* As seen on */}
      <section className="section">
        <div className="wrap reveal">
          <SectionHead title="As seen on" sub="Official media recognition and industry features." />
          <ul className="logo-tile mt-14 flex flex-wrap items-center justify-between gap-x-12 gap-y-8 rounded-[var(--radius-card)] px-8 py-9 md:px-12">
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
