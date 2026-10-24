import { ArrowUpRight, Play } from "@phosphor-icons/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Img } from "@/components/img";
import { SectionHead } from "@/components/section-head";
import { VideoCard, VideoPlayer } from "@/components/video-player";
import { lyricalVideos, singles, spotifyEmbed, type Single } from "@/data/music";
import { platforms } from "@/data/site";
import { seo } from "@/lib/seo";
import { delay } from "@/lib/style";

export const Route = createFileRoute("/music")({
  head: () =>
    seo({
      title: "Music | Gloria May Byron",
      description:
        "Listen to the latest releases and collaborations from Gloria May Byron: featured singles, lyrical videos and every major streaming platform.",
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
  return (
    <div className="mt-4 flex flex-wrap gap-x-6">
      {single.tidal && (
        <a className="btn-text" href={single.tidal} target="_blank" rel="noreferrer noopener">
          Listen on Tidal <ArrowUpRight size={18} aria-hidden />
        </a>
      )}
      <a
        className="btn-text"
        href={youtube(single.video.id)}
        target="_blank"
        rel="noreferrer noopener"
      >
        Watch on YouTube <ArrowUpRight size={18} aria-hidden />
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
                className={`grid min-h-[72px] w-full grid-cols-[2.5rem_1fr_auto] items-center gap-3 px-2 py-4 text-left transition-colors hover:bg-surface ${on ? "bg-surface" : ""}`}
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
  const [on, setOn] = useState(false);
  return (
    <div className="media min-h-[352px]">
      {on ? (
        <iframe
          title="Spotify: This Is Gloria May Byron"
          src={spotifyEmbed}
          className="h-[352px] w-full border-0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      ) : (
        <div className="grid h-[352px] place-content-center justify-items-center gap-5 bg-surface px-6 text-center">
          <Img id="platformSpotify" alt="Spotify" sizes="160px" className="h-9 w-auto" />
          <p className="font-display text-2xl font-extrabold tracking-[-0.02em]">
            This Is Gloria May Byron
          </p>
          <button type="button" className="btn btn-primary" onClick={() => setOn(true)}>
            Load the Spotify player
          </button>
        </div>
      )}
    </div>
  );
}

function Music() {
  return (
    <>
      <section className="pb-4 pt-8 md:pt-14">
        <div className="wrap">
          <h1
            className="display-xl rise max-w-[11ch]"
            style={{ fontSize: "clamp(2.7rem, 8vw, 7.4rem)" }}
          >
            Music by Gloria May Byron
          </h1>
          <p className="lead rise mt-6" style={delay(1)}>
            Listen to my latest releases and collaborations.
          </p>
        </div>
      </section>

      {/* Featured singles */}
      <section className="section pt-12 md:pt-16">
        <div className="wrap">
          <SectionHead
            title="Featured singles"
            sub="Selected tracks that define the sound."
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
            title="Singles"
            sub="Original releases, one story at a time."
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
              title="Featured music"
              sub="Explore music by Gloria May Byron across major streaming platforms."
            />
            <p className="mt-10 font-display text-xl font-bold">Want to hear more music?</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                className="btn btn-primary"
                href={deezer.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                Listen on Deezer
              </a>
              <a
                className="btn btn-ghost"
                href={tidal.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                Listen on Tidal
              </a>
              <a
                className="btn btn-ghost"
                href={soundclick.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                Listen on SoundClick
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
            title="Lyrical videos"
            sub="Where words and melody come together."
            className="reveal"
            action={
              <a
                className="btn btn-ghost"
                href={vevo.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                Visit my VEVO / YouTube for more lyrical videos
              </a>
            }
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
        </div>
      </section>

      {/* Available on */}
      <section className="section bg-bg-2">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHead
            title="Available on"
            sub="Listen across all major streaming platforms."
            className="reveal"
          />
          <ul className="reveal grid grid-cols-2 border-l border-t border-line sm:grid-cols-4">
            {platforms.map((p) => (
              <li key={p.name} className="border-b border-r border-line">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="grid h-36 place-items-center content-center gap-3 px-4 logo-tile"
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
          <h2 className="display-lg max-w-[14ch]">Want more?</h2>
          <p className="lead mt-4">Discover more music & visuals.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/gallery" className="btn btn-primary">
              Gallery
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
