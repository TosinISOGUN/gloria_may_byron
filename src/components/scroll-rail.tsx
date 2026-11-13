import { CaretLeft, CaretRight } from "@phosphor-icons/react";

import { fmt } from "@/i18n";
import { useT } from "@/i18n/messages-context";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  label: string;
  children: ReactNode;
  className?: string;
};

// Centred on the thumbnails (16:9, 82% of the row up to 520px wide), not on the captions below them.
// `!absolute` because .glass-pill sets position: relative outside the utility layer. The tint is the
// nav pill's smoked glass, denser so the arrow reads over a light page.
const arrow =
  "glass-pill !absolute top-[calc(min(82cqw,520px)_*_0.28125)] z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full !bg-[color-mix(in_oklab,#0a191e_76%,transparent)] text-[#e9f1ef] transition-[opacity,transform] duration-200 active:scale-95";

/**
 * A horizontally scrolling row with an arrow at each edge, so visitors can see it moves sideways.
 * An arrow only appears when there is more to scroll to in that direction, and never at all when
 * everything already fits. Swiping, the keyboard and the scrollbar keep working as before.
 */
export function ScrollRail({ label, children, className }: Props) {
  const t = useT().common;
  const rail = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  // Right-to-left rows start at the right edge: "next" is leftwards, and scrollLeft runs 0 to negative.
  const [rtl, setRtl] = useState(false);

  const update = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const pos = Math.abs(el.scrollLeft);
    setRtl(getComputedStyle(el).direction === "rtl");
    setCanPrev(pos > 4);
    setCanNext(pos < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: (rtl ? -dir : dir) * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const state = (on: boolean) => (on ? "opacity-100" : "pointer-events-none opacity-0");

  return (
    <div className="relative [container-type:inline-size]">
      <div
        ref={rail}
        className={`rail ${className ?? ""}`}
        tabIndex={0}
        role="group"
        aria-label={label}
      >
        {children}
      </div>
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label={fmt(t.scrollPrevious, { label })}
        tabIndex={canPrev ? 0 : -1}
        aria-hidden={!canPrev}
        className={`${arrow} ${rtl ? "right-2 sm:right-3" : "left-2 sm:left-3"} ${state(canPrev)}`}
      >
        {rtl ? <CaretRight size={22} weight="bold" aria-hidden /> : <CaretLeft size={22} weight="bold" aria-hidden />}
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label={fmt(t.scrollNext, { label })}
        tabIndex={canNext ? 0 : -1}
        aria-hidden={!canNext}
        className={`${arrow} ${rtl ? "left-2 sm:left-3" : "right-2 sm:right-3"} ${state(canNext)}`}
      >
        {rtl ? <CaretLeft size={22} weight="bold" aria-hidden /> : <CaretRight size={22} weight="bold" aria-hidden />}
      </button>
    </div>
  );
}
