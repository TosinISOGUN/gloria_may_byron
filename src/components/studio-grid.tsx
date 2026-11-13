import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";

import { StudioClip } from "./studio-clip";

type Clip = { readonly id: string; readonly title: string };

type Props = {
  clips: readonly Clip[];
  /** How many clips show before the button is pressed. */
  visible: number;
  videoLabel: (title: string) => string;
  caption: string;
  showAll: string;
  showFewer: string;
};

const grid = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3";

/**
 * The studio clips: the first few in view, and a button that opens the rest below them. The extra rows
 * open and close with the same easing as the player, so the page eases down instead of jumping.
 */
export function StudioGrid({ clips, visible, videoLabel, caption, showAll, showFewer }: Props) {
  const [expanded, setExpanded] = useState(false);
  const panel = useId();
  const first = clips.slice(0, visible);
  const rest = clips.slice(visible);

  const item = (v: Clip) => (
    <li key={v.id} className="reveal">
      <StudioClip
        id={v.id}
        src={`/videos/${v.id}.mp4`}
        poster={`/videos/posters/${v.id}.jpg`}
        label={videoLabel(v.title)}
      />
      <p className="mt-3 font-display font-bold" lang="en" dir="ltr">
        {v.title}
      </p>
      <p className="text-sm text-muted">{caption}</p>
    </li>
  );

  return (
    <div className="mt-12">
      <ul className={grid}>{first.map(item)}</ul>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={panel}
            key="rest"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className={`${grid} pt-6`}>{rest.map(item)}</ul>
          </motion.div>
        )}
      </AnimatePresence>
      {rest.length > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            className="btn btn-ghost"
            aria-expanded={expanded}
            aria-controls={panel}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? showFewer : showAll}
          </button>
        </div>
      )}
    </div>
  );
}
