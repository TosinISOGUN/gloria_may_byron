import { Img } from "./img";

import type { ImageId } from "@/data/images.generated";

type Props = {
  items: readonly { name: string; badge: ImageId }[];
  className?: string;
};

/**
 * The award seals as a ruled strip: one cell per seal, each seal on a pale disc ringed in the
 * accent, with its name beneath. Uniform sizes and a shared baseline stand in for the old loose
 * row of circles.
 */
export function BadgeStrip({ items, className }: Props) {
  return (
    <ul
      className={`grid grid-cols-2 border-l border-t border-line sm:grid-cols-5 ${className ?? ""}`}
    >
      {items.map((c) => (
        <li
          key={c.name}
          className="grid content-start justify-items-center gap-4 border-b border-r border-line px-4 py-9 last:col-span-2 sm:last:col-span-1"
        >
          <span className="block rounded-full bg-[#eef4f2] p-3 ring-4 ring-accent/25">
            <Img
              id={c.badge}
              alt=""
              sizes="140px"
              className="size-24 object-contain sm:size-[7.5rem]"
            />
          </span>
          <span className="max-w-[16ch] text-balance text-center text-sm font-bold leading-snug text-muted">
            {c.name}
          </span>
        </li>
      ))}
    </ul>
  );
}
