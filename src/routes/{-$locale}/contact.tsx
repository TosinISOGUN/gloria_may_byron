import { Check, Copy } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/components/link";
import { useEffect, useRef, useState } from "react";

import { Img } from "@/components/img";
import { platforms, site, socials } from "@/data/site";
import { preloadImage } from "@/lib/preload";
import { fmt, messagesForParam } from "@/i18n";
import { useT } from "@/i18n/messages-context";
import { seo } from "@/lib/seo";
import { delay } from "@/lib/style";

export const Route = createFileRoute("/{-$locale}/contact")({
  loader: async ({ params }) => {
    preloadImage("portraitMic", "50vw");
    return { meta: (await messagesForParam(params.locale)).contact.meta };
  },
  head: ({ params, loaderData }) =>
    seo({
      locale: params.locale,
      title: loaderData?.meta.title ?? "",
      description: loaderData?.meta.description ?? "",
      path: "/contact",
      image: "contact",
    }),
  component: Contact,
});

function CopyEmail() {
  const m = useT().contact.touch;
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      /* clipboard can be blocked; the mailto link above still works */
    }
  };
  return (
    <>
      <button type="button" onClick={copy} className="btn btn-ghost">
        {copied ? <Check size={20} aria-hidden /> : <Copy size={20} aria-hidden />}
        {copied ? m.copied : m.copy}
      </button>
      <span className="sr-only" role="status">
        {copied ? m.copiedStatus : ""}
      </span>
    </>
  );
}

function Contact() {
  const t = useT();
  const k = t.contact;
  return (
    <>
      <section className="overflow-x-clip pt-[calc(var(--nav-h)+1.5rem)] lg:pt-[calc(var(--nav-h)+2.5rem)]">
        <div className="wrap grid items-center gap-12 pb-14 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:pb-24">
          <div className="hero-copy hero-out">
            <h1 className="display-xl rise" style={{ fontSize: "clamp(2.7rem, 8vw, 7.4rem)" }}>
              {k.hero.title}
            </h1>
            <p className="lead rise mt-6" style={delay(1)}>
              {k.hero.text}
            </p>
          </div>
          {/* A framed print: an offset outline behind, a pale mat, then the photograph. */}
          <div className="hero-media frame isolate relative mx-auto w-full max-w-[30rem] lg:ms-auto lg:me-0">
            <div className="frame-offset" aria-hidden />
            <div className="frame-mat">
              <div className="relative aspect-[5/6] overflow-hidden">
                <Img
                  id="portraitMic"
                  alt={k.hero.alt}
                  sizes="(min-width: 1024px) 30rem, 92vw"
                  priority
                  className="ken absolute inset-0 size-full object-cover"
                  style={{ objectPosition: "42% 22%" }}
                />
                <div
                  className="hero-veil absolute inset-0 bg-gradient-to-t from-[#0a191e]/65 via-transparent to-[#0a191e]/20"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="reveal max-w-[60rem]">
            <h2 className="display-md">{k.touch.title}</h2>
            <p className="lead mt-4">
              {k.touch.text}
            </p>
            <p className="mt-10 text-sm font-bold text-muted">{k.touch.emailLabel}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-1 inline-block break-all py-2 font-display text-[clamp(1.5rem,4.4vw,3rem)] font-extrabold leading-tight tracking-[-0.03em] hover:text-accent"
            >
              {site.email}
            </a>
            <div className="mt-6">
              <CopyEmail />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-bg-2">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="reveal">
            <h2 className="display-md max-w-[14ch]">{k.reasons.title}</h2>
            <p className="lead mt-4">{k.reasons.text}</p>
          </div>
          <ol className="reveal border-t border-line">
            {k.reasons.items.map((r, i) => (
              <li key={r} className="grid grid-cols-[3rem_1fr] border-b border-line py-6">
                <span className="font-display text-sm font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl font-bold tracking-[-0.01em]">{r}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="display-lg reveal max-w-[14ch]">{k.follow.title}</h2>
          <p className="lead reveal mt-4">{k.follow.text}</p>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-20">
            <div className="reveal">
              <h3 className="font-display text-xl font-extrabold">{k.follow.platforms}</h3>
              <ul className="mt-5 grid grid-cols-2 border-s border-t border-line sm:grid-cols-4">
                {platforms.map((p) => (
                  <li key={p.name} className="border-b border-e border-line">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="logo-tile grid h-28 place-items-center content-center gap-2 px-3"
                    >
                      <Img
                        id={p.logo}
                        alt=""
                        sizes="140px"
                        className="h-7 w-auto max-w-[7.5rem] object-contain"
                      />
                      <span className="text-sm text-[#4a636b]">{p.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal">
              <h3 className="font-display text-xl font-extrabold">{k.follow.social}</h3>
              <ul className="mt-5 border-t border-line">
                {socials.map((s) => (
                  <li key={s.name} className="border-b border-line">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex min-h-16 items-center font-display text-xl font-bold tracking-[-0.01em] transition-colors hover:text-accent"
                    >
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-[clamp(72px,11vw,150px)]">
        <div className="wrap reveal">
          <div className="card p-8 sm:p-14">
            <h2 className="display-md max-w-[20ch]">
              {k.cta.title}
            </h2>
            <p className="lead mt-4">
              {k.cta.text}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/music" className="btn btn-primary">
                {t.chrome.nav.music}
              </Link>
              <Link to="/gallery" className="btn btn-ghost">
                {t.chrome.nav.gallery}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
