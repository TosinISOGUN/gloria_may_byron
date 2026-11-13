import { Play, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { fmt } from "@/i18n";
import { useT } from "@/i18n/messages-context";

type Props = {
  id: string;
  src: string;
  poster: string;
  /** What the clip is, for people using a screen reader. */
  label: string;
};

const RADIUS = 16;

/**
 * A studio clip shown as a thumbnail with a play button. Pressing it lifts the thumbnail out of the page and
 * grows it into a larger player in the middle of the screen (the same element moves, so nothing jumps), and
 * pressing close, the backdrop or Escape sends it back to where it was. Only one player exists at a time.
 */
export function StudioClip({ id, src, poster, label }: Props) {
  const t = useT().common;
  const [open, setOpen] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const layoutId = `studio-clip-${id}`;

  const close = () => {
    video.current?.pause();
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    closeButton.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "Tab") {
        // Keep keyboard focus inside the player: the close button and the video's own controls.
        const nodes: HTMLElement[] = [];
        if (closeButton.current) nodes.push(closeButton.current);
        if (video.current) nodes.push(video.current);
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      opener.current?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      {/* The slot keeps its size while the thumbnail is out on the screen. */}
      <div className="aspect-video w-full">
        {!open && (
          <motion.button
            ref={opener}
            layoutId={layoutId}
            type="button"
            onClick={() => setOpen(true)}
            aria-label={fmt(t.playVideo, { title: label })}
            aria-haspopup="dialog"
            style={{ borderRadius: RADIUS }}
            className="group relative block size-full overflow-hidden border border-line bg-black"
          >
            <img
              src={poster}
              width={960}
              height={540}
              alt=""
              loading="lazy"
              decoding="async"
              className="pointer-events-none size-full object-cover"
            />
            <span
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
              aria-hidden
            />
            <span
              className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-on-accent shadow-[0_10px_30px_-8px_rgb(0_0_0/0.6)] transition-transform duration-300 group-hover:scale-110 group-active:scale-95"
              aria-hidden
            >
              <Play size={32} weight="fill" />
            </span>
          </motion.button>
        )}
      </div>

      {/* Out of the page flow, so a scroll-reveal on a parent cannot trap or clip it. */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={label}
                className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-10"
                onClick={close}
              >
                <motion.div
                  className="absolute inset-0 bg-[#050c0f]/90 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  aria-hidden
                />
                <motion.div
                  layoutId={layoutId}
                  transition={{ type: "spring", stiffness: 210, damping: 28, mass: 0.9 }}
                  style={{ borderRadius: RADIUS }}
                  className="relative aspect-video w-[min(100%,calc((100dvh-6rem)*16/9),1280px)] overflow-hidden bg-black shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <video
                    ref={video}
                    controls
                    autoPlay
                    playsInline
                    poster={poster}
                    className="size-full bg-black object-contain"
                  >
                    <source src={src} type="video/mp4" />
                  </video>
                </motion.div>
                <motion.button
                  ref={closeButton}
                  type="button"
                  aria-label={t.viewer.close}
                  className="absolute end-4 top-4 grid size-12 place-items-center rounded-full bg-white/12 text-white backdrop-blur transition-colors hover:bg-white/25"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    close();
                  }}
                >
                  <X size={22} aria-hidden />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
