import { MusicNote } from "@phosphor-icons/react";

type Props = {
  words: readonly string[];
  /** Spoken to assistive tech once, in place of the looping copies. */
  label: string;
};

/**
 * A looping ribbon of words: capitals in an italic display face, alternately solid, outlined and in
 * the accent, divided by musical notes. The track holds two identical halves of two copies each and
 * slides by exactly one half, so the loop has no seam even on very wide screens. It pauses while it
 * is hovered, and with reduced motion it stops and becomes a centred, wrapping line. Only one copy
 * is announced to assistive tech.
 */
export function Marquee({ words, label }: Props) {
  return (
    <section className="marquee" aria-label={label}>
      <p className="sr-only">{words.join(", ")}</p>
      <div className="marquee-track" aria-hidden>
        {[0, 1, 2, 3].map((copy) => (
          <ul key={copy} className="marquee-copy">
            {words.map((word, i) => (
              <li key={word}>
                <span className="marquee-word" data-look={i % 3}>
                  {word}
                </span>
                <MusicNote className="marquee-mark" weight="fill" aria-hidden />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
