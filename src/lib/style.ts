import type { CSSProperties } from "react";

/** Stagger index for the `.rise` entrance animation. */
export const delay = (i: number) => ({ "--i": i }) as CSSProperties;
