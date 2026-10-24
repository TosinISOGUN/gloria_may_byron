import { Check, Copy } from "@phosphor-icons/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { Img } from "@/components/img";
import { platforms, site, socials } from "@/data/site";
import { seo } from "@/lib/seo";
import { delay } from "@/lib/style";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact | Gloria May Byron",
      description:
        "Contact Gloria May Byron for bookings and live performances, collaborations and creative projects, and media, interviews and press inquiries.",
      path: "/contact",
      image: "contact",
    }),
  component: Contact,
});

const reasons = [
  "Bookings and live performances",
  "Collaborations and creative projects",
  "Media, interviews, and press inquiries",
];

function CopyEmail() {
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
        {copied ? "Email copied" : "Copy email"}
      </button>
      <span className="sr-only" role="status">
        {copied ? "Email address copied to the clipboard" : ""}
      </span>
    </>
  );
}

function Contact() {
  return (
    <>
      <section className="pt-8 md:pt-14">
        <div className="wrap">
          <h1 className="display-xl rise" style={{ fontSize: "clamp(2.7rem, 8vw, 7.4rem)" }}>
            Contact
          </h1>
          <p className="lead rise mt-6" style={delay(1)}>
            For bookings, collaborations, and media inquiries.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div className="reveal">
            <h2 className="display-md">Get in touch</h2>
            <p className="lead mt-4">
              Whether you're reaching out for bookings, collaborations, or media inquiries, I'd love
              to hear from you.
            </p>
            <p className="mt-10 text-sm font-bold text-muted">Email</p>
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
          <div className="media reveal">
            <Img
              id="portraitMic"
              alt="Gloria May Byron smiling at a studio microphone"
              sizes="(min-width: 1024px) 40vw, 92vw"
              priority
              className="aspect-[4/3] w-full object-cover lg:aspect-square"
            />
          </div>
        </div>
      </section>

      <section className="section bg-bg-2">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="reveal">
            <h2 className="display-md max-w-[14ch]">What you can reach out about</h2>
            <p className="lead mt-4">Collaborations, bookings, and creative conversations.</p>
          </div>
          <ol className="reveal border-t border-line">
            {reasons.map((r, i) => (
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
          <h2 className="display-lg reveal max-w-[14ch]">Follow and connect</h2>
          <p className="lead reveal mt-4">Stay close to the music and the moments.</p>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-20">
            <div className="reveal">
              <h3 className="font-display text-xl font-extrabold">Music platforms</h3>
              <ul className="mt-5 grid grid-cols-2 border-l border-t border-line sm:grid-cols-4">
                {platforms.map((p) => (
                  <li key={p.name} className="border-b border-r border-line">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="grid h-28 place-items-center content-center gap-2 px-3 transition-colors hover:bg-surface"
                    >
                      <Img
                        id={p.logo}
                        alt=""
                        sizes="140px"
                        className="logo-mono h-7 w-auto max-w-[7.5rem] object-contain"
                      />
                      <span className="text-sm text-muted">{p.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal">
              <h3 className="font-display text-xl font-extrabold">Social media</h3>
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
              I'm always open to meaningful collaborations and creative projects
            </h2>
            <p className="lead mt-4">
              Let's create something meaningful and share it with the world.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/music" className="btn btn-primary">
                Music
              </Link>
              <Link to="/gallery" className="btn btn-ghost">
                Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
