import { ArrowUpRight } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";

import { Img } from "@/components/img";
import { PageHero } from "@/components/page-hero";
import { LinkedText } from "@/components/linked-text";
import { GRA_URL } from "@/data/profile";
import { platforms, site } from "@/data/site";
import { preloadImage } from "@/lib/preload";
import { fmt, messagesForParam } from "@/i18n";
import { useT } from "@/i18n/messages-context";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  loader: async ({ params }) => {
    preloadImage("heroRoom", "100vw");
    return { meta: (await messagesForParam(params.locale)).about.meta };
  },
  head: ({ params, loaderData }) =>
    seo({
      locale: params.locale,
      title: loaderData?.meta.title ?? "",
      description: loaderData?.meta.description ?? "",
      path: "/about",
      image: "about",
    }),
  component: About,
});

const tidal = platforms.find((p) => p.name === "Tidal")!;
const soundclick = platforms.find((p) => p.name === "SoundClick")!;
const amazon = platforms.find((p) => p.name === "Amazon Music")!;

function About() {
  const t = useT();
  const a = t.about;
  const c = t.common;
  const [first, ...rest] = a.me.paragraphs;
  return (
    <>
      <PageHero
        image="heroRoom"
        alt={a.hero.alt}
        focus="70% 30%"
        title={fmt(a.hero.title, { name: site.name })}
        titleWidth={12}
        text={a.hero.text}
      >
        <a className="btn btn-primary" href={tidal.url} target="_blank" rel="noreferrer noopener">
          {c.listenTidal} <ArrowUpRight size={20} aria-hidden />
        </a>
      </PageHero>

      {/* About me */}
      <section className="section border-t border-line">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 className="display-md reveal max-w-[15ch] lg:sticky lg:top-28 lg:self-start">
            {a.me.heading}
          </h2>
          <div className="reveal">
            <p className="font-display text-[clamp(1.35rem,2.4vw,2rem)] font-bold leading-[1.25] tracking-[-0.02em]">
              {first}
            </p>
            <div className="prose-flow mt-8">
              {rest.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Two portraits */}
      <section aria-label={a.portraitsLabel}>
        <div className="wrap grid grid-cols-5 items-start gap-3 md:gap-5">
          <div className="media reveal col-span-3">
            <Img
              id="portraitDune"
              alt={a.portraitDuneAlt}
              sizes="(min-width: 768px) 56vw, 60vw"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="media reveal col-span-2 mt-12 md:mt-24">
            <Img
              id="portraitTruck"
              alt={a.portraitTruckAlt}
              sizes="(min-width: 768px) 36vw, 40vw"
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="section">
        <div className="wrap">
          <h2 className="display-lg reveal max-w-[20ch]">{a.biography.heading}</h2>
          <p className="lead reveal mt-4">{a.biography.sub}</p>
          <div className="reveal mt-10 grid gap-x-16 gap-y-6 text-muted md:grid-cols-2 [&>p]:max-w-[60ch]">
            {a.biography.paragraphs.map((p) => (
              <p key={p}>
                <LinkedText text={p} phrase={a.biography.awardsPhrase} href={GRA_URL} />
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="section bg-bg-2">
        <div className="wrap">
          <h2 className="display-lg reveal">{a.journey.heading}</h2>
          <p className="lead reveal mt-4">{a.journey.sub}</p>
          <ol className="reveal mt-14 border-t border-line">
            {a.journey.steps.map((s, i) => (
              <li
                key={s.stage}
                className="grid gap-3 border-b border-line py-8 md:grid-cols-[0.5fr_1fr_1.2fr] md:gap-10"
              >
                <p className="font-display text-sm font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="font-display text-[clamp(1.4rem,2.4vw,2rem)] font-extrabold leading-tight tracking-[-0.02em]">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-muted">{s.stage}</p>
                </div>
                <p className="text-muted">
                  {"linkPhrase" in s ? (
                    <LinkedText text={s.text} phrase={s.linkPhrase} href={GRA_URL} />
                  ) : (
                    s.text
                  )}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Style */}
      <section className="section">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="media reveal">
            <Img
              id="portraitEyes"
              alt={a.style.alt}
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="aspect-[16/11] w-full object-cover"
              style={{ objectPosition: "50% 38%" }}
            />
          </div>
          <div className="reveal">
            <h2 className="display-lg max-w-[12ch]">{a.style.heading}</h2>
            <p className="lead mt-4">{a.style.sub}</p>
            <div className="prose-flow mt-8">
              {a.style.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Where the songs come from */}
      <section className="section border-t border-line bg-bg-2">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 className="display-md reveal max-w-[14ch] lg:sticky lg:top-28 lg:self-start">
            {a.inspiration.heading}
          </h2>
          <div className="reveal prose-flow min-w-0">
            {a.inspiration.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Motto and links */}
      <section className="border-t border-line py-[clamp(72px,12vw,160px)]">
        <div className="wrap">
          <p className="display-xl reveal max-w-[12ch]">{t.brand.motto}</p>
          <h2 className="display-md reveal mt-16">{a.explore.title}</h2>
          <p className="lead reveal mt-3">
            {a.explore.text}
          </p>
          <div className="reveal mt-8 flex flex-wrap gap-3">
            <a
              className="btn btn-primary"
              href={soundclick.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              {c.listenSoundclick}
            </a>
            <a
              className="btn btn-ghost"
              href={amazon.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              {c.listenAmazon}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
