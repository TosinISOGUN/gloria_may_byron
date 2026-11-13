import { ArrowRight } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/components/link";

import { ClipPlayer } from "@/components/clip-player";
import { Img } from "@/components/img";
import { PageHero } from "@/components/page-hero";
import { VideoPlayer } from "@/components/video-player";
import { video } from "@/data/music";
import { socials } from "@/data/site";
import { preloadImage } from "@/lib/preload";
import { fmt, messagesForParam } from "@/i18n";
import { useT } from "@/i18n/messages-context";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/{-$locale}/announcements")({
  loader: async ({ params }) => {
    preloadImage("heroSnow", "100vw");
    return { meta: (await messagesForParam(params.locale)).announcements.meta };
  },
  head: ({ params, loaderData }) =>
    seo({
      locale: params.locale,
      title: loaderData?.meta.title ?? "",
      description: loaderData?.meta.description ?? "",
      path: "/announcements",
      image: "announcements",
    }),
  component: Announcements,
});

function Announcements() {
  const t = useT();
  const { formulaIndie, message, fanMessage } = t.announcements;
  const instagram = socials.find((s) => s.name === "Instagram")!;
  return (
    <>
      <PageHero
        image="heroSnow"
        alt={t.announcements.hero.alt}
        focus="55% 55%"
        veil={42}
        title={t.announcements.hero.title}
        titleWidth={10}
        text={t.announcements.hero.text}
      />

      {/* The newest message: Gloria's own clip, filmed upright on a phone, so it sits in a portrait frame. */}
      <section className="section bg-bg-2">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <ClipPlayer
            src="/video/message-to-fans-2026-11.mp4"
            poster="/video/message-to-fans-2026-11-poster.webp"
            posterSmall="/video/message-to-fans-2026-11-poster-320.webp"
            label={t.home.news.videoLabel}
            className="reveal mx-auto aspect-[480/850] w-full max-w-[340px] lg:mx-0"
          />
          <div className="reveal">
            <h2 className="display-lg max-w-[16ch]">{fanMessage.title}</h2>
            <div className="prose-flow mt-6">
              {fanMessage.text.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <a
              className="btn btn-ghost mt-8"
              href={instagram.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              {t.common.followInstagram}
            </a>
          </div>
        </div>
      </section>

      {/* A pointer to the page about how the songs are made */}
      <section className="section">
        <div className="wrap reveal">
          <h2 className="display-lg max-w-[18ch]">{t.announcements.authenticityNews.title}</h2>
          <p className="lead mt-6 max-w-[56ch]">{t.announcements.authenticityNews.text}</p>
          <Link to="/authenticity" className="btn btn-primary mt-8">
            {t.chrome.nav.authenticity} <ArrowRight size={20} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="section border-t border-line">
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
            {t.announcements.footer}
          </p>
          <h2 className="mt-14 font-display text-2xl font-extrabold tracking-[-0.02em]">
            {t.announcements.explore.title}
          </h2>
          <p className="lead mt-2">{t.announcements.explore.text}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/gallery" className="btn btn-primary">
              {t.chrome.nav.gallery}
            </Link>
            <Link to="/music" className="btn btn-ghost">
              {t.chrome.nav.music}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
