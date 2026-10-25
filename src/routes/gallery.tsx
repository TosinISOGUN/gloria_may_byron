import { MagnifyingGlassPlus } from "@phosphor-icons/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Img } from "@/components/img";
import { Lightbox, type LightboxItem } from "@/components/lightbox";
import { PageHero } from "@/components/page-hero";
import { SectionHead } from "@/components/section-head";
import { releases } from "@/data/music";
import { galleryPhotos } from "@/data/profile";
import { preloadImage } from "@/lib/preload";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () =>
    seo({
      title: "Gallery | Gloria May Byron",
      description:
        "Moments from performances, studio sessions and events: photographs of Gloria May Byron and the artwork for every release.",
      path: "/gallery",
      image: "gallery",
    }),
  loader: () => {
    preloadImage("heroTrio", "100vw");
  },
  component: Gallery,
});

const photoItems: LightboxItem[] = galleryPhotos.map((p) => ({ id: p.id, alt: p.alt }));
const releaseItems: LightboxItem[] = releases.map((r) => ({
  id: r.art,
  alt: `Release artwork for ${r.title}`,
  caption: r.title,
}));

function Gallery() {
  const [photo, setPhoto] = useState<number | null>(null);
  const [release, setRelease] = useState<number | null>(null);
  return (
    <>
      <PageHero
        image="heroTrio"
        alt="Gloria May Byron singing with three other vocalists on a lawn under string lights"
        focus="50% 55%"
        title="Photo gallery"
        titleWidth={9}
        text="Moments from performances, studio sessions, and events."
      />

      <section className="section">
        <div className="wrap">
          <SectionHead
            title="Photos"
            sub="A photo gallery featuring Gloria May Byron across live performances and award moments."
            className="reveal"
          />
          <ul className="mosaic mt-12 columns-2 gap-[3px] md:columns-3 lg:columns-4">
            {galleryPhotos.map((p, i) => (
              <li key={p.id} className="tile mb-[3px] break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setPhoto(i)}
                  aria-label={`Open photo: ${p.alt}`}
                  className="group relative block w-full overflow-hidden bg-bg-2"
                >
                  <Img
                    id={p.id}
                    alt={p.alt}
                    sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw"
                    className="tile-img h-auto w-full"
                  />
                  <span
                    className="pointer-events-none absolute bottom-3 right-3 grid size-10 translate-y-2 place-items-center rounded-full bg-bg/80 text-ink opacity-0 backdrop-blur-sm transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                    aria-hidden
                  >
                    <MagnifyingGlassPlus size={20} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-bg-2">
        <div className="wrap">
          <SectionHead title="Releases" sub="Latest music releases" className="reveal" />
          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {releases.map((r, i) => (
              <li key={r.art} className="reveal">
                <button
                  type="button"
                  onClick={() => setRelease(i)}
                  aria-label={`Open release artwork: ${r.title}`}
                  className="group block w-full text-left"
                >
                  <span className="media block bg-surface">
                    <Img
                      id={r.art}
                      alt=""
                      sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw"
                      className="aspect-[3/2] w-full object-contain transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </span>
                  <span className="mt-3 block font-display text-lg font-bold leading-tight tracking-[-0.01em]">
                    {r.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap reveal">
          <h2 className="display-lg max-w-[14ch]">Interested in working together?</h2>
          <p className="lead mt-5">
            I'd love to hear about your vision and explore how we can bring it to life through
            music.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-primary">
              Get in touch
            </Link>
            <Link to="/music" className="btn btn-ghost">
              Music
            </Link>
          </div>
        </div>
      </section>

      <Lightbox items={photoItems} index={photo} onChange={setPhoto} />
      <Lightbox items={releaseItems} index={release} onChange={setRelease} />
    </>
  );
}
