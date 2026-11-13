import { ArrowUpRight, Play } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/components/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Img } from "@/components/img";
import { PageHero } from "@/components/page-hero";
import { SectionHead } from "@/components/section-head";
import { VideoCard, VideoPlayer } from "@/components/video-player";
import { lyricalVideos, singles, spotifyEmbed, type Single } from "@/data/music";
import { platforms } from "@/data/site";
import { preloadImage } from "@/lib/preload";
import { fmt, messagesForParam } from "@/i18n";
import { useT } from "@/i18n/messages-context";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/{-$locale}/music")({
  loader: async ({ params }) => {
    preloadImage("heroCandle", "100vw");
    return { meta: (await messagesForParam(params.locale)).music.meta };
  },
  head: ({ params, loaderData }) =>
    seo({
      locale: params.locale,
      title: loaderData?.meta.title ?? "",
      description: loaderData?.meta.description ?? "",
      path: "/music",
      image: "music",
    }),
  component: Music,
});

const featured = singles.slice(0, 2) as [Single, Single];
const trackList = singles.slice(2);
const youtube = (id: string) => `https://www.youtube.com/watch?v=${id}`;
const tidal = platforms.find((p) => p.name === "Tidal")!;
const deezer = platforms.find((p) => p.name === "Deezer")!;
const soundclick = platforms.find((p) => p.name === "SoundClick")!;
const vevo = platforms.find((p) => p.name === "VEVO")!;

function TrackLinks({ single }: { single: Single }) {
  const c = useT().common;
  return (
    <div className="mt-4 flex flex-wrap gap-x-6">
      {single.tidal && (
        <a className="btn-text" href={single.tidal} target="_blank" rel="noreferrer noopener">
          {c.listenTidal} <ArrowUpRight size={18} aria-hidden />
        </a>
      )}
      <a
        className="btn-text"
        href={youtube(single.video.id)}
        target="_blank"
        rel="noreferrer noopener"
      >
        {c.watchYoutube} <ArrowUpRight size={18} aria-hidden />
      </a>
    </div>
  );
}

function Singles() {
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const current = trackList[active]!;
  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
      <div className="lg:order-2 lg:sticky lg:top-28 lg:self-start">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.video.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <VideoPlayer
              video={current.video}
              autoLoad={engaged}
              sizes="(min-width: 1024px) 40vw, 92vw"
            />
            <h3 className="mt-5 font-display text-2xl font-extrabold tracking-[-0.02em]">
              {current.title}
            </h3>
            {current.note && <p className="text-muted">{current.note}</p>}
            <TrackLinks single={current} />
          </motion.div>
        </AnimatePresence>
      </div>
      <ol className="border-t border-line lg:order-1">
        {trackList.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.title} className="border-b border-line">
              <button
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setActive(i);
                  setEngaged(true);
                }}
                className={`grid min-h-[72px] w-full grid-cols-[2.5rem_1fr_auto] items-center gap-3 px-2 py-4 text-start transition-colors hover:bg-surface ${on ? "bg-surface" : ""}`}
              >
                <span className="font-display text-sm font-bold text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span
                    className={`block font-display text-xl font-bold leading-tight tracking-[-0.01em] ${on ? "text-accent" : ""}`}
                  >
                    {s.title}
                  </span>
                  {s.note && <span className="block text-sm text-muted">{s.note}</span>}
                </span>
                <Play
                  size={20}
                  weight={on ? "fill" : "regular"}
                  className={on ? "text-accent" : "text-muted"}
                  aria-hidden
                />
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function SpotifyPlayer() {
  const m = useT().music.streaming;
  const [on, setOn] = useState(false);
  return (
    <div className="media min-h-[352px]">
      {on ? (
        <iframe
          title={m.spotifyTitle}
          src={spotifyEmbed}
          className="h-[352px] w-full border-0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      ) : (
        <div className="grid h-[352px] place-content-center justify-items-center gap-5 bg-surface px-6 text-center">
          <Img id="platformSpotify" alt="Spotify" sizes="160px" className="h-9 w-auto" />
          <p className="font-display text-2xl font-extrabold tracking-[-0.02em]">
            {m.spotifyHeading}
          </p>
          <button type="button" className="btn btn-primary" onClick={() => setOn(true)}>
            {m.loadSpotify}
          </button>
        </div>
      )}
    </div>
  );
}

function Music() {
  const t = useT();
  const m = t.music;
  const c = t.common;
  return (
    <>
      <PageHero
        image="heroCandle"
        alt={m.hero.alt}
        focus="62% 55%"
        title={m.hero.title}
        titleWidth={11}
        text={m.hero.text}
      />

      {/* Featured singles */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            title={m.featured.title}
            sub={m.featured.sub}
            className="reveal"
          />
          <div className="mt-12 grid gap-x-12 gap-y-14 lg:grid-cols-[1.35fr_1fr] lg:items-end">
            {featured.map((s, i) => (
              <article key={s.title} className={`reveal ${i === 1 ? "lg:translate-y-10" : ""}`}>
                <VideoPlayer
                  video={s.video}
                  sizes={
                    i === 0 ? "(min-width: 1024px) 56vw, 92vw" : "(min-width: 1024px) 40vw, 92vw"
                  }
                />
                <h3 className="mt-5 font-display text-[clamp(1.5rem,2.6vw,2.2rem)] font-extrabold tracking-[-0.02em]">
                  {s.title}
                </h3>
                {s.note && <p className="text-muted">{s.note}</p>}
                <TrackLinks single={s} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Singles */}
      <section className="section bg-bg-2">
        <div className="wrap">
          <SectionHead
            title={m.singles.title}
            sub={m.singles.sub}
            className="reveal"
          />
          <Singles />
        </div>
      </section>

      {/* Streaming */}
      <section className="section">
        <div className="wrap grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="reveal">
            <SectionHead
              title={m.streaming.title}
              sub={m.streaming.sub}
            />
            <p className="mt-10 font-display text-xl font-bold">{m.streaming.more}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                className="btn btn-primary"
                href={deezer.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                {c.listenDeezer}
              </a>
              <a
                className="btn btn-ghost"
                href={tidal.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                {c.listenTidal}
              </a>
              <a
                className="btn btn-ghost"
                href={soundclick.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                {c.listenSoundclick}
              </a>
            </div>
          </div>
          <div className="reveal">
            <SpotifyPlayer />
          </div>
        </div>
      </section>

      {/* Lyrical videos */}
      <section className="section border-t border-line">
        <div className="wrap">
          <SectionHead
            title={m.lyrical.title}
            sub={m.lyrical.sub}
            className="reveal"
          />
          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {lyricalVideos.map((v) => (
              <VideoCard
                key={v.id}
                video={v}
                className="reveal"
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
              />
            ))}
          </div>
          <div className="reveal mt-14">
            <a className="btn btn-ghost" href={vevo.url} target="_blank" rel="noreferrer noopener">
              {m.lyrical.more}
            </a>
          </div>
        </div>
      </section>

      {/* Available on */}
      <section className="section bg-bg-2">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHead
            title={m.available.title}
            sub={m.available.sub}
            className="reveal"
          />
          <ul className="reveal grid grid-cols-2 border-s border-t border-line sm:grid-cols-4">
            {platforms.map((p) => (
              <li key={p.name} className="border-b border-e border-line">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="logo-tile grid h-36 place-items-center content-center gap-3 px-4"
                >
                  <Img
                    id={p.logo}
                    alt=""
                    sizes="160px"
                    className="h-7 w-auto max-w-[7.5rem] object-contain"
                  />
                  <span className="text-sm text-[#4a636b]">{p.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* More */}
      <section className="section">
        <div className="wrap reveal">
          <h2 className="display-lg max-w-[14ch]">{m.more.title}</h2>
          <p className="lead mt-4">{m.more.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/gallery" className="btn btn-primary">
              {t.chrome.nav.gallery}
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              {c.getInTouch}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
