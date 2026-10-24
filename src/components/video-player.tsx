import { Play } from "@phosphor-icons/react";
import { useState } from "react";

import type { Video } from "@/data/music";

import { Img } from "./img";

type Props = {
  video: Video;
  /** Load the embed straight away. Only used after a visitor action, never on first paint. */
  autoLoad?: boolean;
  sizes?: string;
  className?: string;
};

/** A YouTube video that costs nothing until clicked: the thumbnail is local, the embed loads on demand. */
export function VideoPlayer({
  video,
  autoLoad = false,
  sizes = "(min-width: 1024px) 40vw, 92vw",
  className,
}: Props) {
  const [loaded, setLoaded] = useState(autoLoad);
  return (
    <div className={`media relative aspect-video ${className ?? ""}`}>
      {loaded ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          aria-label={`Play ${video.title}`}
          className="group absolute inset-0 size-full"
        >
          <Img
            id={video.thumb}
            alt=""
            sizes={sizes}
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <span
            className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
            aria-hidden
          />
          <span className="absolute bottom-3 right-3 grid size-14 place-items-center rounded-full bg-accent text-on-accent shadow-[0_10px_30px_-8px_rgb(0_0_0/0.6)] transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
            <Play size={24} weight="fill" aria-hidden />
          </span>
        </button>
      )}
    </div>
  );
}

export function VideoCard({
  video,
  sizes,
  className,
}: {
  video: Video;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <VideoPlayer video={video} {...(sizes ? { sizes } : {})} />
      <figcaption className="mt-3">
        <p className="font-display text-lg font-bold leading-tight tracking-[-0.01em]">
          {video.title}
        </p>
        {video.credit && <p className="text-sm text-muted">{video.credit}</p>}
      </figcaption>
    </figure>
  );
}
