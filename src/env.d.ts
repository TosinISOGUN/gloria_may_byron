/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL: string;
  readonly VITE_TRAILING_SLASH?: string;
  /** "1" in a private preview build (Vercel), empty on the live site. */
  readonly VITE_PREVIEW?: string;
}
