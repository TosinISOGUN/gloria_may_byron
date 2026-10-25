import type { CSSProperties, ReactNode } from "react";

import type { ImageId } from "@/data/images.generated";
import { delay } from "@/lib/style";

import { Img } from "./img";

type Props = {
  image: ImageId;
  alt: string;
  /** CSS object-position for the photograph, so the face stays clear of the type. */
  focus?: string;
  title: ReactNode;
  /** Width cap for the title, in ch, so long titles break into a deliberate shape. */
  titleWidth?: number;
  /** Supporting line under the title. */
  text?: string;
  /** Extra fade over a very bright photograph, 0 to 100. */
  veil?: number;
  children?: ReactNode;
};

/**
 * Page opener, built like the home hero: one photograph fills the band and the title sits bottom
 * left over a soft fade into the page background. It runs under the transparent header. The photograph
 * drifts as the page scrolls and the type fades as it leaves (scroll-driven, where supported).
 */
export function PageHero({
  image,
  alt,
  focus = "50% 35%",
  title,
  titleWidth = 11,
  text,
  veil = 0,
  children,
}: Props) {
  return (
    <section
      data-hero
      data-tone="dark"
      className="relative isolate -mt-[var(--nav-h)] flex min-h-[min(42rem,82svh)] items-end overflow-hidden"
    >
      <div className="hero-media hero-drift absolute inset-x-0 -top-[7%] -z-20 h-[107%]">
        <Img
          id={image}
          alt={alt}
          sizes="100vw"
          priority
          className="ken size-full object-cover"
          style={{ objectPosition: focus }}
        />
      </div>
      <div
        className="hero-scrim absolute inset-0 -z-10"
        style={{ "--veil": `${veil}%` } as CSSProperties}
        aria-hidden
      />
      <div className="hero-copy hero-out wrap pb-12 pt-44 md:pb-20">
        <h1
          className="display-xl rise"
          style={{
            fontSize: "clamp(2.7rem, 8vw, 7.4rem)",
            maxWidth: `${titleWidth}ch`,
          }}
        >
          {title}
        </h1>
        {text && (
          <p className="lead rise mt-6 !text-ink/90" style={delay(1)}>
            {text}
          </p>
        )}
        {children && (
          <div className="rise mt-8" style={delay(2)}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
