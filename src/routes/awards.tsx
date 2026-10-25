import { Link, createFileRoute } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";

import { BadgeStrip } from "@/components/badge-strip";
import { Img } from "@/components/img";
import { Lightbox, type LightboxItem } from "@/components/lightbox";
import { PageHero } from "@/components/page-hero";
import { SectionHead } from "@/components/section-head";
import { awards, certifications, notableHighlights } from "@/data/profile";
import { preloadImage } from "@/lib/preload";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/awards")({
  head: () =>
    seo({
      title: "Awards | Gloria May Byron",
      description:
        "Awards and achievements: Global Recognition Award, four Global Music Awards and an InterContinental Music Award for Gloria May Byron.",
      path: "/awards",
      image: "awards",
    }),
  loader: () => {
    preloadImage("heroBw", "100vw");
  },
  component: Awards,
});

type Hung = {
  id: LightboxItem["id"];
  alt: string;
  title: string;
  note: string;
  /** Where it hangs on the wall (columns and drop, from lg up; two columns below). */
  place: string;
  /** The tilt it hangs in before it settles as it scrolls into view. */
  tilt: string;
};

const wall: Hung[] = [
  {
    id: "awardGraBanner",
    alt: "Gloria May Byron with the Global Recognition Awards seal behind her",
    title: "The Global Recognition Awards seal",
    note: "Gloria May Byron, 2025",
    place: "col-span-2 lg:col-span-7",
    tilt: "-1.4deg",
  },
  {
    id: "awardCrystal",
    alt: "The Global Recognition Awards 2025 winner crystal trophy",
    title: "The crystal trophy",
    note: "Global Recognition Awards, 2025 winner",
    place: "lg:col-span-5 lg:mt-28",
    tilt: "1.6deg",
  },
  {
    id: "awardGraCert",
    alt: "Global Recognition Award 2025 certificate presented to Gloria May Byron",
    title: "The certificate",
    note: "Global Recognition Award, 2025",
    place: "lg:col-span-4 lg:-mt-6",
    tilt: "1.2deg",
  },
  {
    id: "awardTrophy",
    alt: "The InterContinental Music Awards trophy",
    title: "The trophy",
    note: "InterContinental Music Awards",
    place: "lg:col-span-4 lg:mt-16",
    tilt: "-1.8deg",
  },
  {
    id: "awardIcCert",
    alt: "InterContinental Music Awards certificate for the song Every Love Story, Best Song of North America in Pop, August 2025",
    title: "Every Love Story",
    note: "Best Song of North America in Pop, August 2025",
    place: "lg:col-span-4",
    tilt: "1.4deg",
  },
];

const pictures: LightboxItem[] = wall.map(({ id, alt, title }) => ({ id, alt, caption: title }));

function Awards() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <PageHero
        image="heroBw"
        alt="Black and white photograph of Gloria May Byron singing with her eyes closed at a microphone"
        focus="50% 30%"
        title="Awards and achievements"
        titleWidth={11}
        text="Recognition, milestones, and notable moments."
      />

      {/* Certifications */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            title="Certifications and global recognitions"
            sub="Recognitions earned across platforms and borders."
            className="reveal"
          />
          <BadgeStrip items={certifications} className="reveal mt-14" />
        </div>
      </section>

      {/* Awards */}
      <section className="section bg-bg-2">
        <div className="wrap">
          <SectionHead
            title="Awards"
            sub="Gloria May Byron's work has received international recognition, reflecting both artistic excellence and listener impact on a global scale."
            className="reveal"
          />
          <ol className="mt-14 border-t border-line">
            {awards.map((a, i) => (
              <li
                key={a.title}
                className="reveal grid items-center gap-6 border-b border-line py-8 sm:grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_1.1fr] md:gap-10"
              >
                <span className="block w-fit rounded-full bg-[#eef4f2] p-2">
                  <Img
                    id={a.badge}
                    alt=""
                    sizes="96px"
                    className="size-16 object-contain md:size-20"
                  />
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}. {a.label}
                  </p>
                  <h3 className="mt-1 font-display text-[clamp(1.4rem,2.4vw,2rem)] font-extrabold leading-tight tracking-[-0.02em]">
                    {a.title}
                  </h3>
                </div>
                <p className="text-muted sm:col-span-2 md:col-span-1">{a.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* In pictures: a gallery wall. Square frames on a spotlit wall, each with its own museum label. */}
      <section className="section wall-bg overflow-hidden">
        <div className="wrap">
          <SectionHead
            title="The awards in pictures"
            sub="Trophies, certificates and award moments."
            className="reveal"
          />
          <ul className="wall mt-16 grid grid-cols-2 items-start gap-x-5 gap-y-14 md:gap-x-8 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-16">
            {wall.map((p, i) => (
              <li
                key={p.id}
                className={`hang ${p.place}`}
                style={{ "--tilt": p.tilt } as CSSProperties}
              >
                <figure>
                  <div className="swing">
                    {/* The nail and the wire: decoration only. */}
                    <svg
                      className="mx-auto block h-7 w-1/2 text-accent"
                      viewBox="0 0 100 28"
                      preserveAspectRatio="none"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      aria-hidden
                    >
                      <path d="M4 28 L50 4 L96 28" vectorEffect="non-scaling-stroke" />
                      <circle cx="50" cy="4" r="2.6" fill="currentColor" stroke="none" />
                    </svg>
                    <button
                      type="button"
                      onClick={() => setOpen(i)}
                      aria-label={`Open: ${p.alt}`}
                      className="frame-mat group block w-full"
                    >
                      <div className="overflow-hidden">
                        <Img
                          id={p.id}
                          alt={p.alt}
                          sizes="(min-width: 768px) 40vw, 92vw"
                          className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.05]"
                        />
                      </div>
                    </button>
                  </div>
                  <figcaption className="mt-5 grid grid-cols-[auto_1fr] gap-x-3 border-t border-line pt-3">
                    <span className="font-display text-sm font-bold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-display text-lg font-extrabold leading-tight tracking-[-0.01em]">
                        {p.title}
                      </span>
                      <span className="block text-sm text-muted">{p.note}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Highlights */}
      <section className="section bg-bg-2">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHead
            title="Notable highlights"
            sub="Key moments that shaped the journey."
            className="reveal"
          />
          <ul className="reveal border-t border-line">
            {notableHighlights.map((h, i) => (
              <li key={h} className="grid grid-cols-[3rem_1fr] gap-3 border-b border-line py-6">
                <span className="font-display text-sm font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl font-bold leading-snug tracking-[-0.01em]">
                  {h}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap reveal">
          <h2 className="display-lg max-w-[12ch]">Let's collaborate</h2>
          <p className="lead mt-4">Bookings, performances, and media.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-primary">
              Get in touch
            </Link>
            <Link to="/announcements" className="btn btn-ghost">
              Announcements
            </Link>
          </div>
        </div>
      </section>

      <Lightbox items={pictures} index={open} onChange={setOpen} />
    </>
  );
}
