import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";

import type { ImageId } from "@/data/images.generated";

import { Img } from "./img";

export type LightboxItem = { id: ImageId; alt: string; caption?: string };

type Props = {
  items: LightboxItem[];
  index: number | null;
  onChange: (index: number | null) => void;
};

const control =
  "absolute grid size-12 place-items-center rounded-full bg-white/12 text-white backdrop-blur transition-colors hover:bg-white/25";

export function Lightbox({ items, index, onChange }: Props) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const open = index !== null;
  const item = index === null ? undefined : items[index];

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    closeButton.current?.focus();
    return () => {
      root.style.overflow = previous;
      opener?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (index === null) return;
    const step = (d: number) => onChange((index + d + items.length) % items.length);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-lightbox] button"));
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
    return () => document.removeEventListener("keydown", onKey);
  }, [index, items.length, onChange]);

  return (
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          data-lightbox
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-50 grid place-items-center bg-[#050c0f]/95 p-4 sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={() => onChange(null)}
        >
          <motion.figure
            key={item.id}
            className="flex max-h-full max-w-full flex-col items-center gap-3"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Img
              id={item.id}
              alt={item.alt}
              sizes="100vw"
              priority
              className="max-h-[78dvh] w-auto max-w-full rounded-2xl object-contain"
            />
            <figcaption className="text-center text-sm text-white/80">
              {item.caption ?? item.alt}
              <span className="ml-3 text-white/50">
                {index + 1} / {items.length}
              </span>
            </figcaption>
          </motion.figure>
          <button
            ref={closeButton}
            type="button"
            aria-label="Close image viewer"
            className={`${control} right-4 top-4`}
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
            }}
          >
            <X size={22} aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Previous image"
            className={`${control} left-3 top-1/2 -translate-y-1/2`}
            onClick={(e) => {
              e.stopPropagation();
              onChange((index - 1 + items.length) % items.length);
            }}
          >
            <CaretLeft size={22} aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Next image"
            className={`${control} right-3 top-1/2 -translate-y-1/2`}
            onClick={(e) => {
              e.stopPropagation();
              onChange((index + 1) % items.length);
            }}
          >
            <CaretRight size={22} aria-hidden />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
