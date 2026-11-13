import { Pause, Play } from "@phosphor-icons/react";
import { useRef, useState } from "react";

type Props = {
  src: string;
  /** The full-size thumbnail (480 px wide). */
  poster: string;
  /** The same picture at 320 px wide, for screens that show it at 300 px or less. Leave out when there is only one size. */
  posterSmall?: string;
  /** Pixel size of the thumbnail, so the page does not jump while it loads. Defaults to the tall announcement clip. */
  posterWidth?: number;
  posterHeight?: number;
  /** Show a thin progress bar along the bottom once the clip has started. */
  progress?: boolean;
  /** What the clip is, for people using a screen reader. */
  label: string;
  className?: string;
};

// The clip that is playing now. Starting another one pauses it, so two never play over each other.
let current: HTMLVideoElement | null = null;

/**
 * A short clip of our own (not a YouTube embed) with no browser controls. A play button sits on the
 * thumbnail; tapping the picture while it plays pauses it, and the button comes back.
 */
export function ClipPlayer({ src, poster, posterSmall, posterWidth = 480, posterHeight = 850, progress = false, label, className }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // The thumbnail is a picture laid over the video until the first play, then it is gone for good.
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);

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
        className="size-full object-cover"
        onPlay={(e) => {
          if (current && current !== e.currentTarget) current.pause();
          current = e.currentTarget;
          setStarted(true);
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={progress ? (e) => setElapsed(e.currentTarget.duration ? e.currentTarget.currentTime / e.currentTarget.duration : 0) : undefined}
      >
        <source src={src} type="video/mp4" />
      </video>
      {!started && (
        <img
          src={poster}
          srcSet={posterSmall ? `${posterSmall} 320w, ${poster} 480w` : undefined}
          sizes={posterSmall ? "300px" : undefined}
          width={posterWidth}
          height={posterHeight}
          alt=""
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-0 size-full object-cover"
        />
      )}
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
      {progress && started && (
        <div
          role="progressbar"
          aria-label={`Progress: ${label}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(elapsed * 100)}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-white/25"
        >
          <div
            className="h-full origin-left bg-accent transition-transform duration-200 ease-linear rtl:origin-right"
            style={{ transform: `scaleX(${elapsed})` }}
          />
        </div>
      )}
    </div>
  );
}
