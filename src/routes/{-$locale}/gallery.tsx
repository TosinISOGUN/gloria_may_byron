import { MagnifyingGlassPlus } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/components/link";
import { useState } from "react";

import { Img } from "@/components/img";
import { Lightbox, type LightboxItem } from "@/components/lightbox";
import { PageHero } from "@/components/page-hero";
import { SectionHead } from "@/components/section-head";
import { releases } from "@/data/music";
import { galleryPhotoIds } from "@/data/profile";
import { preloadImage } from "@/lib/preload";
import { fmt, messagesForParam } from "@/i18n";
import { useT } from "@/i18n/messages-context";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/{-$locale}/gallery")({
  loader: async ({ params }) => {
    preloadImage("heroTrio", "100vw");
    return { meta: (await messagesForParam(params.locale)).gallery.meta };
  },
  head: ({ params, loaderData }) =>
    seo({
      locale: params.locale,
      title: loaderData?.meta.title ?? "",
      description: loaderData?.meta.description ?? "",
      path: "/gallery",
      image: "gallery",
    }),
  component: Gallery,
});

function Gallery() {
  const t = useT();
  const g = t.gallery;
  const photoItems: LightboxItem[] = galleryPhotoIds.map((id, i) => ({ id, alt: g.photos.alts[i] ?? "" }));
  const releaseItems: LightboxItem[] = releases.map((r) => ({
    id: r.art,
    alt: fmt(g.releases.artworkAlt, { title: r.title }),
    caption: r.title,
  }));
  const [photo, setPhoto] = useState<number | null>(null);
  const [release, setRelease] = useState<number | null>(null);
  return (
    <>
      <PageHero
        image="heroTrio"
        alt={g.hero.alt}
        focus="50% 55%"
        title={g.hero.title}
        titleWidth={9}
        text={g.hero.text}
      />

      <section className="section">
        <div className="wrap">
          <SectionHead
            title={g.photos.title}
            sub={g.photos.sub}
            className="reveal"
          />
          <ul className="mosaic mt-12 columns-2 gap-[3px] md:columns-3 lg:columns-4">
            {galleryPhotoIds.map((id, i) => (
              <li key={id} className="tile mb-[3px] break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setPhoto(i)}
                  aria-label={fmt(g.photos.openPhoto, { alt: g.photos.alts[i] ?? "" })}
                  className="group relative block w-full overflow-hidden bg-bg-2"
                >
                  <Img
                    id={id}
                    alt={g.photos.alts[i] ?? ""}
                    sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw"
                    className="tile-img h-auto w-full"
                  />
                  <span
                    className="pointer-events-none absolute bottom-3 end-3 grid size-10 translate-y-2 place-items-center rounded-full bg-bg/80 text-ink opacity-0 backdrop-blur-sm transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
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
          <SectionHead title={g.releases.title} sub={g.releases.sub} className="reveal" />
          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {releases.map((r, i) => (
              <li key={r.art} className="reveal">
                <button
                  type="button"
                  onClick={() => setRelease(i)}
                  aria-label={fmt(g.releases.openRelease, { title: r.title })}
                  className="group block w-full text-start"
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
          <h2 className="display-lg max-w-[14ch]">{g.cta.title}</h2>
          <p className="lead mt-5">
            {g.cta.text}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-primary">
              {t.common.getInTouch}
            </Link>
            <Link to="/music" className="btn btn-ghost">
              {t.chrome.nav.music}
            </Link>
          </div>
        </div>
      </section>

      <Lightbox items={photoItems} index={photo} onChange={setPhoto} />
      <Lightbox items={releaseItems} index={release} onChange={setRelease} />
    </>
  );
}
