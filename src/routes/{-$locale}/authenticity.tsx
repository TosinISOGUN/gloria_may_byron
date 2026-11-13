import { createFileRoute } from "@tanstack/react-router";

import { ClipPlayer } from "@/components/clip-player";
import { PageHero } from "@/components/page-hero";
import { signoffSender, studioVideos } from "@/data/authenticity";
import { evidenceImages, type EvidenceId } from "@/data/evidence.generated";
import { site } from "@/data/site";
import { en as enMessages, fmt, messagesForParam } from "@/i18n";
import { useLocale } from "@/i18n/use-locale";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/{-$locale}/authenticity")({
  loader: async ({ params }) => ({ t: (await messagesForParam(params.locale)).authenticity }),
  head: ({ params, loaderData }) =>
    seo({
      locale: params.locale,
      title: loaderData?.t.meta.title ?? "",
      description: loaderData?.t.meta.description ?? "",
      path: "/authenticity",
      image: "authenticity",
    }),
  component: Authenticity,
});

/** A cropped screenshot lying on the page like a printed sheet: square corners and a layered shadow. */
function Shot({ id, alt, caption }: { id: EvidenceId; alt: string; caption: string }) {
  const img = evidenceImages[id];
  return (
    <figure className="reveal">
      <div className="rounded-[3px] bg-white ring-1 ring-black/10 shadow-[0_1px_2px_rgba(8,20,24,0.28),0_10px_18px_-6px_rgba(8,20,24,0.32),0_28px_52px_-18px_rgba(8,20,24,0.5)]">
        <img
          src={img.src}
          width={img.width}
          height={img.height}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full rounded-[3px]"
        />
      </div>
      <figcaption className="mt-4 text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}

type QuoteLabels = { original: string; translation: string };

/**
 * A quotation. In English it is the words as sent. In another language the original English stays
 * (it is what was actually written) and the translation sits above it, labelled as a translation.
 */
function Quote({
  original,
  translated,
  labels,
  locale,
}: {
  original: readonly string[];
  translated: readonly string[];
  labels: QuoteLabels;
  locale: string;
}) {
  if (locale === "en") {
    return (
      <div className="prose-flow text-muted">
        {original.map((p) => (
          <p key={p}>&ldquo;{p}&rdquo;</p>
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-6 text-muted">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink">{labels.translation}</p>
        <div className="prose-flow">
          {translated.map((p) => (
            <p key={p}>&ldquo;{p}&rdquo;</p>
          ))}
        </div>
      </div>
      <div lang="en" dir="ltr" className="border-t border-line pt-5 text-left">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink">{labels.original}</p>
        <div className="prose-flow">
          {original.map((p) => (
            <p key={p}>&ldquo;{p}&rdquo;</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function Authenticity() {
  const { t } = Route.useLoaderData();
  const en = enMessages.authenticity.quotes;
  const locale = useLocale();
  const labels = t.platforms;
  const jumps: [string, string][] = [
    ["#studio", t.answer.jumps.studio],
    ["#certificate", t.answer.jumps.certificate],
    ["#platforms", t.answer.jumps.platforms],
    ["#cover-art", t.answer.jumps.coverArt],
    ["#tour", t.answer.jumps.tour],
  ];
  return (
    <>
      <PageHero
        image="studioWide"
        alt={t.hero.alt}
        focus="50% 40%"
        title={t.hero.title}
        titleWidth={14}
        text={t.hero.text}
      />

      {/* The direct answer */}
      <section className="section border-t border-line">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 className="display-md reveal max-w-[14ch] lg:sticky lg:top-28 lg:self-start">
            {t.answer.heading}
          </h2>
          <div className="reveal min-w-0">
            <p className="font-display text-[clamp(1.35rem,2.4vw,2rem)] font-bold leading-[1.25] tracking-[-0.02em]">
              {t.answer.lead}
            </p>
            <div className="prose-flow mt-8">
              <p>{t.answer.body}</p>
            </div>
            <ul className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
              {jumps.map(([href, label]) => (
                <li key={href}>
                  <a className="btn btn-ghost" href={href}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Studio recordings */}
      <section id="studio" className="section bg-bg-2 scroll-mt-24">
        <div className="wrap">
          <h2 className="display-lg reveal max-w-[18ch]">{t.studio.heading}</h2>
          <p className="lead reveal mt-4 max-w-[60ch]">{t.studio.intro}</p>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studioVideos.map((v) => (
              <li key={v.id} className="reveal">
                <ClipPlayer
                  src={`/videos/${v.id}.mp4`}
                  poster={`/videos/posters/${v.id}.jpg`}
                  posterWidth={960}
                  posterHeight={540}
                  progress
                  label={fmt(t.studio.videoLabel, { title: v.title })}
                  className="aspect-video w-full rounded-2xl border border-line"
                />
                <p className="mt-3 font-display font-bold" lang="en" dir="ltr">
                  {v.title}
                </p>
                <p className="text-sm text-muted">{t.studio.caption}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Certificate */}
      <section id="certificate" className="section scroll-mt-24">
        <div className="wrap grid items-start gap-x-20 gap-y-8 lg:grid-cols-[1fr_1fr] lg:grid-rows-[auto_1fr] lg:gap-y-4">
          <h2 className="display-lg reveal max-w-[14ch] lg:col-start-1 lg:row-start-1">{t.certificate.heading}</h2>
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <Shot id="certificate" alt={t.certificate.alt} caption={t.certificate.caption} />
          </div>
          <div className="reveal min-w-0 lg:col-start-1 lg:row-start-2">
            <p className="lead">{t.certificate.lead}</p>
            <div className="prose-flow mt-8">
              <p>{t.certificate.intro}</p>
            </div>
            <div className="mt-6 border-s-4 border-accent ps-5 [overflow-wrap:anywhere]">
              <Quote
                original={[en.certificate]}
                translated={[t.quotes.certificate]}
                labels={labels}
                locale={locale}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section id="platforms" className="section border-t border-line scroll-mt-24">
        <div className="wrap">
          <h2 className="display-lg reveal max-w-[18ch]">{t.platforms.heading}</h2>
          <p className="lead reveal mt-4 max-w-[62ch]">{t.platforms.lead}</p>

          <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Shot id="emailTidal" alt={t.platforms.tidalAlt} caption={t.platforms.tidalCaption} />
            <div className="reveal min-w-0">
              <h3 className="font-display text-2xl font-extrabold tracking-[-0.02em]">
                {t.platforms.written}
              </h3>
              <div className="mt-5">
                <Quote original={en.tidal} translated={t.quotes.tidal} labels={labels} locale={locale} />
              </div>
              <p className="mt-5 text-sm text-muted">{t.platforms.tidalSummary}</p>
            </div>
          </div>

          <div className="mt-20 grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div className="grid gap-4">
              <Shot id="emailPlatformsA" alt={t.platforms.engineerAlt} caption={t.platforms.engineerCaption} />
              <Shot id="emailPlatformsB" alt={t.platforms.signoffAlt} caption={t.platforms.signoffCaption} />
            </div>
            <div className="reveal min-w-0">
              <h3 className="font-display text-2xl font-extrabold tracking-[-0.02em]">
                {t.platforms.written}
              </h3>
              <div className="mt-5">
                <Quote
                  original={[...en.engineer, en.signoff]}
                  translated={[...t.quotes.engineer, t.quotes.signoff]}
                  labels={labels}
                  locale={locale}
                />
                <p className="mt-4 text-ink" lang="en" dir="ltr">
                  {signoffSender}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mixea and distributors */}
      <section className="section bg-bg-2">
        <div className="wrap grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="reveal min-w-0">
            <h2 className="display-lg max-w-[16ch]">{t.mixea.heading}</h2>
            <div className="prose-flow mt-8">
              <p>{t.mixea.body}</p>
            </div>
            <h3 className="mt-10 font-display text-2xl font-extrabold tracking-[-0.02em]">
              {t.platforms.written}
            </h3>
            <div className="mt-5">
              <Quote original={en.mixea} translated={t.quotes.mixea} labels={labels} locale={locale} />
            </div>
          </div>
          <Shot id="emailMixea" alt={t.mixea.alt} caption={t.mixea.caption} />
        </div>
      </section>

      {/* Cover art */}
      <section id="cover-art" className="section scroll-mt-24">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 className="display-md reveal max-w-[14ch] lg:sticky lg:top-28 lg:self-start">
            {t.coverArt.heading}
          </h2>
          <div className="reveal prose-flow">
            <p>{t.coverArt.p1}</p>
            <p>{t.coverArt.p2}</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="tour" className="section border-t border-line scroll-mt-24">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 className="display-md reveal max-w-[14ch] lg:sticky lg:top-28 lg:self-start">
            {t.tour.heading}
          </h2>
          <div className="reveal prose-flow">
            {t.tour.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section bg-bg-2">
        <div className="wrap">
          <h2 className="display-md reveal max-w-[18ch]">{t.contact.heading}</h2>
          <p className="lead reveal mt-4 max-w-[60ch]">{t.contact.lead}</p>
          <p className="reveal mt-6">
            <a className="link-inline text-xl font-semibold" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
