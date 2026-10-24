import { ArrowUpRight } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";

import { Img } from "@/components/img";
import { LinkedText } from "@/components/linked-text";
import { GRA_URL, aboutMe, biography, journey, style } from "@/data/profile";
import { platforms, site } from "@/data/site";
import { seo } from "@/lib/seo";
import { delay } from "@/lib/style";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About | Gloria May Byron",
      description:
        "The voice, the vision, and the story behind the music. Gloria May Byron is an award-recognized independent artist, Ojibwe Indigenous of Garden River First Nation, based on the Atlantic side of Canada.",
      path: "/about",
      image: "about",
    }),
  component: About,
});

const tidal = platforms.find((p) => p.name === "Tidal")!;
const soundclick = platforms.find((p) => p.name === "SoundClick")!;
const amazon = platforms.find((p) => p.name === "Amazon Music")!;

function About() {
  const [first, ...rest] = aboutMe.paragraphs;
  return (
    <>
      <section className="relative isolate pt-8 md:pt-14">
        <div className="wrap grid items-end gap-10 pb-16 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:pb-24">
          <div>
            <h1
              className="display-xl rise max-w-[12ch]"
              style={{ fontSize: "clamp(2.7rem, 7.4vw, 6.6rem)" }}
            >
              About {site.name}
            </h1>
            <p className="lead rise mt-6" style={delay(1)}>
              Singer, songwriter, performer.
            </p>
            <a
              className="btn btn-primary rise mt-8"
              style={delay(2)}
              href={tidal.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              Listen on Tidal <ArrowUpRight size={20} aria-hidden />
            </a>
          </div>
          <div className="media rise" style={delay(2)}>
            <Img
              id="heroRoom"
              alt="Gloria May Byron standing in a softly lit room, wearing black"
              sizes="(min-width: 1024px) 54vw, 92vw"
              priority
              className="aspect-[16/10] w-full object-cover"
              style={{ objectPosition: "50% 30%" }}
            />
          </div>
        </div>
      </section>

      {/* About me */}
      <section className="section border-t border-line">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 className="display-md reveal max-w-[15ch] lg:sticky lg:top-28 lg:self-start">
            {aboutMe.heading}
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
      <section aria-label="Portraits">
        <div className="wrap grid grid-cols-5 items-start gap-3 md:gap-5">
          <div className="media reveal col-span-3">
            <Img
              id="portraitDune"
              alt="Gloria May Byron in a cream sweater on a sandy dune at golden hour"
              sizes="(min-width: 768px) 56vw, 60vw"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="media reveal col-span-2 mt-12 md:mt-24">
            <Img
              id="portraitTruck"
              alt="Gloria May Byron leaning out of a teal vintage truck"
              sizes="(min-width: 768px) 36vw, 40vw"
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="section">
        <div className="wrap">
          <h2 className="display-lg reveal max-w-[20ch]">{biography.heading}</h2>
          <p className="lead reveal mt-4">{biography.sub}</p>
          <div className="reveal mt-10 grid gap-x-16 gap-y-6 text-muted md:grid-cols-2 [&>p]:max-w-[60ch]">
            {biography.paragraphs.map((p) => (
              <p key={p}>
                <LinkedText text={p} phrase="Global Recognition Awards" href={GRA_URL} />
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="section bg-bg-2">
        <div className="wrap">
          <h2 className="display-lg reveal">{journey.heading}</h2>
          <p className="lead reveal mt-4">{journey.sub}</p>
          <ol className="reveal mt-14 border-t border-line">
            {journey.steps.map((s, i) => (
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
                  {"link" in s ? (
                    <LinkedText text={s.text} phrase={s.link.label} href={s.link.href} />
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
              id="heroBw"
              alt="Black and white photograph of Gloria May Byron singing with her eyes closed at a microphone"
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="aspect-[16/11] w-full object-cover"
            />
          </div>
          <div className="reveal">
            <h2 className="display-lg max-w-[12ch]">{style.heading}</h2>
            <p className="lead mt-4">{style.sub}</p>
            <div className="prose-flow mt-8">
              {style.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Motto and links */}
      <section className="border-t border-line py-[clamp(72px,12vw,160px)]">
        <div className="wrap">
          <p className="display-xl reveal max-w-[12ch]">{site.motto}</p>
          <h2 className="display-md reveal mt-16">Explore my work</h2>
          <p className="lead reveal mt-3">
            A collection of songs shaped by emotion, honesty, and connection.
          </p>
          <div className="reveal mt-8 flex flex-wrap gap-3">
            <a
              className="btn btn-primary"
              href={soundclick.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              Listen on SoundClick
            </a>
            <a
              className="btn btn-ghost"
              href={amazon.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              Listen on Amazon Music
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
