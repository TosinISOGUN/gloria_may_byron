import { Pause, Play } from "@phosphor-icons/react";
import { useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  /** What the clip is, for people using a screen reader. */
  label: string;
  className?: string;
};

/**
 * A short clip of our own (not a YouTube embed) with no browser controls. A play button sits on the
 * thumbnail; tapping the picture while it plays pauses it, and the button comes back.
 */
export function ClipPlayer({ src, poster, label, className }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const el = video.current;
    if (!el) return;
    if (el.paused || el.ended) void el.play();
    else el.pause();
  };

  return (
    <div className={`media relative bg-black ${className ?? ""}`}>
      <video
        ref={video}
        playsInline
        preload="none"
        poster={poster}
        className="size-full object-cover"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause: ${label}` : `Play: ${label}`}
        className="group absolute inset-0 size-full"
      >
        <span
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent transition-opacity duration-300 ${
            playing ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden
        />
        <span
          className={`absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-on-accent shadow-[0_10px_30px_-8px_rgb(0_0_0/0.6)] transition-[transform,opacity] duration-300 group-hover:scale-110 group-active:scale-95 ${
            playing ? "scale-90 opacity-0 group-focus-visible:opacity-100" : "opacity-100"
          }`}
          aria-hidden
        >
          {playing ? <Pause size={32} weight="fill" /> : <Play size={32} weight="fill" />}
        </span>
      </button>
    </div>
  );
}
