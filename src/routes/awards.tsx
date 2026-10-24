import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";

import { Img } from "@/components/img";
import { Lightbox, type LightboxItem } from "@/components/lightbox";
import { SectionHead } from "@/components/section-head";
import { awards, certifications, notableHighlights } from "@/data/profile";
import { seo } from "@/lib/seo";
import { delay } from "@/lib/style";

export const Route = createFileRoute("/awards")({
  head: () =>
    seo({
      title: "Awards | Gloria May Byron",
      description:
        "Awards and achievements: Global Recognition Award, four Global Music Awards and an InterContinental Music Award for Gloria May Byron.",
      path: "/awards",
      image: "awards",
    }),
  component: Awards,
});

const pictures: LightboxItem[] = [
  {
    id: "awardGraBanner",
    alt: "Gloria May Byron with the Global Recognition Awards seal behind her",
  },
  { id: "awardCrystal", alt: "The Global Recognition Awards 2025 winner crystal trophy" },
  {
    id: "awardGraCert",
    alt: "Global Recognition Award 2025 certificate presented to Gloria May Byron",
  },
  { id: "awardTrophy", alt: "The InterContinental Music Awards trophy" },
  {
    id: "awardIcCert",
    alt: "InterContinental Music Awards certificate for the song Every Love Story, Best Song of North America in Pop, August 2025",
  },
];

function Awards() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <section className="pt-8 md:pt-14">
        <div className="wrap">
          <h1
            className="display-xl rise max-w-[11ch]"
            style={{ fontSize: "clamp(2.7rem, 8vw, 7.4rem)" }}
          >
            Awards and achievements
          </h1>
          <p className="lead rise mt-6" style={delay(1)}>
            Recognition, milestones, and notable moments.
          </p>
        </div>
      </section>

      {/* Certifications */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            title="Certifications and global recognitions"
            sub="Recognitions earned across platforms and borders."
            className="reveal"
          />
          <ul className="reveal mt-14 flex flex-wrap items-center gap-x-10 gap-y-10">
            {certifications.map((c) => (
              <li key={c.name}>
                <motion.div
                  whileHover={{ y: -6, rotate: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                  <span className="block rounded-full bg-[#eef4f2] p-3">
                    <Img
                      id={c.badge}
                      alt={c.name}
                      sizes="170px"
                      className="size-28 object-contain sm:size-36"
                    />
                  </span>
                </motion.div>
              </li>
            ))}
          </ul>
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

      {/* In pictures */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            title="The awards in pictures"
            sub="Trophies, certificates and award moments."
            className="reveal"
          />
          <ul className="mt-12 grid grid-cols-6 items-end gap-3 md:gap-4">
            {pictures.map((p, i) => (
              <li
                key={p.id}
                className={`reveal ${["col-span-6 md:col-span-3", "col-span-3 md:col-span-3", "col-span-3 md:col-span-2", "col-span-3 md:col-span-2", "col-span-6 md:col-span-2"][i]}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`Open: ${p.alt}`}
                  className="media group block w-full"
                >
                  <Img
                    id={p.id}
                    alt={p.alt}
                    sizes="(min-width: 768px) 40vw, 92vw"
                    className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </button>
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
