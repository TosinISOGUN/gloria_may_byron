import { Link, createFileRoute } from "@tanstack/react-router";

import { Img } from "@/components/img";
import { VideoPlayer } from "@/components/video-player";
import { announcements } from "@/data/profile";
import { video } from "@/data/music";
import { seo } from "@/lib/seo";
import { delay } from "@/lib/style";

export const Route = createFileRoute("/announcements")({
  head: () =>
    seo({
      title: "Announcements | Gloria May Byron",
      description:
        "News from Gloria May Byron: her Formula Indie New Entry debut on 19 February 2026 and a personal message to fans about 2026.",
      path: "/announcements",
      image: "announcements",
    }),
  component: Announcements,
});

function Announcements() {
  const { formulaIndie, message } = announcements;
  return (
    <>
      <section className="pt-8 md:pt-14">
        <div className="wrap">
          <h1
            className="display-xl rise max-w-[10ch]"
            style={{ fontSize: "clamp(2.7rem, 8vw, 7.4rem)" }}
          >
            {announcements.heading}
          </h1>
          <p className="lead rise mt-6" style={delay(1)}>
            {announcements.sub}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="media reveal mx-auto w-full max-w-[460px] lg:mx-0">
            <Img
              id="flyer"
              alt={formulaIndie.flyerAlt}
              sizes="(min-width: 1024px) 32vw, 92vw"
              priority
              className="w-full"
            />
          </div>
          <div className="reveal lg:pt-10">
            <h2 className="display-lg max-w-[14ch]">{formulaIndie.title}</h2>
            <p className="lead mt-6">{formulaIndie.text}</p>
          </div>
        </div>
      </section>

      <section className="section bg-bg-2">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <div className="reveal">
            <VideoPlayer video={video.message2026} sizes="(min-width: 1024px) 60vw, 92vw" />
          </div>
          <div className="reveal">
            <h2 className="display-md max-w-[14ch]">{message.title}</h2>
            <p className="lead mt-5">{message.text}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap reveal">
          <p className="display-md font-display font-extrabold max-w-[20ch]">
            {announcements.footer}
          </p>
          <h2 className="mt-14 font-display text-2xl font-extrabold tracking-[-0.02em]">
            Explore my work
          </h2>
          <p className="lead mt-2">Discover more music & visuals.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/gallery" className="btn btn-primary">
              Gallery
            </Link>
            <Link to="/music" className="btn btn-ghost">
              Music
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
