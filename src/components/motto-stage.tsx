import {
  CaretDoubleDown,
  Headphones,
  Heart,
  MicrophoneStage,
  MusicNotes,
  Sparkle,
  UsersThree,
} from "@phosphor-icons/react";
import type { CSSProperties } from "react";

/**
 * The scenery behind the pinned statement: two pulsing sound rings, a slowly spinning record, a
 * small equaliser, a waveform, and icons that drift at different depths as the page scrolls. It
 * is decoration only (hidden from assistive tech) and it keeps moving on its own, so the pinned
 * screen never looks frozen. It is kept light on purpose: only transform and opacity are animated,
 * so the work stays on the GPU. Positions and timings are fixed here, not random, so the server and
 * the browser render the same thing.
 */

type Icon = { Icon: typeof Heart; x: string; y: string; depth: number; size: number; hide?: true };
const icons: Icon[] = [
  { Icon: MusicNotes, x: "9%", y: "14%", depth: 1, size: 1 },
  { Icon: Heart, x: "86%", y: "13%", depth: -1, size: 1.1 },
  { Icon: MicrophoneStage, x: "17%", y: "72%", depth: -0.8, size: 1.1 },
  { Icon: Headphones, x: "72%", y: "69%", depth: 0.9, size: 1, hide: true },
  { Icon: UsersThree, x: "91%", y: "46%", depth: -0.5, size: 0.9, hide: true },
  { Icon: Sparkle, x: "4%", y: "46%", depth: 0.7, size: 0.8, hide: true },
];

const bars = Array.from({ length: 18 }, (_, i) => ({
  h: 0.32 + (((i * 37) % 11) / 11) * 0.68,
  t: 0.9 + (((i * 53) % 7) / 7) * 1.1,
}));

/** One long wave, taller in the middle, drawn as a polyline. */
const wave = (() => {
  const pts: string[] = [];
  for (let x = 0; x <= 1200; x += 8) {
    const envelope = 0.25 + 0.75 * Math.sin((x / 1200) * Math.PI);
    pts.push(`${x} ${(60 + Math.sin(x / 34) * 34 * envelope).toFixed(1)}`);
  }
  return `M${pts.join(" L")}`;
})();

export function MottoStage() {
  return (
    <div className="motto-fx" aria-hidden>
      <div className="motto-glow" />

      <div className="motto-ring" />
      <div className="motto-ring" style={{ "--late": 1 } as CSSProperties} />

      <div className="motto-vinyl">
        <svg viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="98" fill="var(--vinyl)" stroke="#fff" strokeOpacity=".14" />
          {[90, 82, 74, 66, 58, 50, 42].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#fff" opacity=".1" />
          ))}
          <path d="M100 100 L100 2 A98 98 0 0 1 169 31 Z" fill="#fff" opacity=".07" />
          <path d="M100 100 L100 198 A98 98 0 0 1 31 169 Z" fill="#fff" opacity=".07" />
          <circle cx="100" cy="100" r="30" fill="var(--accent)" />
          <circle cx="100" cy="100" r="30" fill="none" stroke="#000" opacity=".18" />
          <circle cx="100" cy="100" r="4" fill="var(--bg)" />
        </svg>
      </div>

      <ul className="motto-icons">
        {icons.map(({ Icon, x, y, depth, size, hide }, k) => (
          <li
            key={k}
            className={hide ? "max-md:hidden" : undefined}
            style={{ "--x": x, "--y": y, "--d": depth, "--k": k, "--s": size } as CSSProperties}
          >
            <span className="motto-icon-pop">
              <span className="motto-icon-bob">
                <span className="motto-icon-bubble">
                  <Icon size={26} weight="duotone" />
                </span>
              </span>
            </span>
          </li>
        ))}
      </ul>

      <svg className="motto-wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path className="motto-wave-line" d={wave} />
      </svg>

      <div className="motto-eq">
        {bars.map((b, i) => (
          <span
            key={i}
            className={i % 2 ? "max-sm:hidden" : undefined}
            style={
              { "--h": b.h.toFixed(2), "--t": `${b.t.toFixed(2)}s`, "--i": i } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="motto-cue">
        <span>Keep scrolling</span>
        <CaretDoubleDown size={20} weight="bold" />
      </div>
    </div>
  );
}
