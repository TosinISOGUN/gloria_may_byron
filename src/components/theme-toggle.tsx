import { MoonStars, SunDim } from "@phosphor-icons/react";

const STORAGE_KEY = "gmb-theme";

/** Runs in <head> before first paint: stored choice, else the system setting. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})()`;

export function ThemeToggle() {
  const flip = () => {
    const root = document.documentElement;
    const next = root.dataset["theme"] === "dark" ? "light" : "dark";
    root.dataset["theme"] = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage can be blocked; the choice still applies for this visit */
    }
  };
  return (
    <button
      type="button"
      onClick={flip}
      aria-label="Switch between light and dark theme"
      className="inline-grid size-12 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink"
    >
      <MoonStars size={22} weight="regular" className="theme-moon" aria-hidden />
      <SunDim size={22} weight="regular" className="theme-sun" aria-hidden />
    </button>
  );
}
