import { Check, Copy, DownloadSimple, FacebookLogo, ShareNetwork, ThreadsLogo, TiktokLogo, WhatsappLogo, XLogo } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

import { shareCards, type ShareCardLocale } from "@/data/share-cards.generated";
import { SITE_URL, site } from "@/data/site";
import { useLocale } from "@/i18n/use-locale";
import { useT } from "@/i18n/messages-context";

type Design = "motto" | "lead";
type Size = "feed" | "story";

const order = Object.keys(shareCards) as ShareCardLocale[];
const dims: Record<Size, { w: number; h: number }> = { feed: { w: 720, h: 900 }, story: { w: 540, h: 960 } };

const seg = "inline-flex rounded-full border border-line p-1";
const iconBtn =
  "grid size-12 place-items-center rounded-full border border-line transition-colors hover:border-ink";
const segBtn =
  "min-h-10 rounded-full px-4 text-sm font-bold transition-colors aria-pressed:bg-accent aria-pressed:text-on-accent";

/**
 * The shareable cards (one per language, two designs, two shapes) with a way to pass them on:
 * the phone's own share sheet with the picture attached where the browser allows it, a plain
 * download, a copyable caption, and link shares for the common networks.
 */
export function ShareCards() {
  const t = useT().contact.share;
  const current = useLocale() as ShareCardLocale;
  const [lang, setLang] = useState<ShareCardLocale>(current);
  const [design, setDesign] = useState<Design>("motto");
  const [size, setSize] = useState<Size>("feed");
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [tiktok, setTiktok] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const tiktokTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => setLang(current), [current]);
  useEffect(() => setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function"), []);
  useEffect(() => () => { clearTimeout(timer.current); clearTimeout(tiktokTimer.current); }, []);

  const c = shareCards[lang];
  const text = design === "motto" ? c.motto : c.intro;
  const link = `${SITE_URL.replace(/\/+$/, "")}${c.path}`;
  const caption = `${text}\n${link}`;
  const base = `/share/${lang}/${design}-${size}`;
  const filename = `gloria-may-byron-${lang}-${design}-${size}.jpg`;
  const { w, h } = dims[size];
  const enc = encodeURIComponent;
  const networks = [
    { name: "WhatsApp", color: "#25D366", Icon: WhatsappLogo, href: `https://wa.me/?text=${enc(`${text} ${link}`)}` },
    { name: "Facebook", color: "#1877F2", Icon: FacebookLogo, href: `https://www.facebook.com/sharer/sharer.php?u=${enc(link)}` },
    { name: "X", color: "var(--text)", Icon: XLogo, href: `https://twitter.com/intent/tweet?url=${enc(link)}&text=${enc(text)}` },
    { name: "Threads", color: "var(--text)", Icon: ThreadsLogo, href: `https://www.threads.com/intent/post?text=${enc(`${text} ${link}`)}` },
  ];

  const share = async () => {
    try {
      const blob = await (await fetch(`${base}.jpg`)).blob();
      const file = new File([blob], filename, { type: "image/jpeg" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: caption, title: site.name });
      } else {
        await navigator.share({ text, url: link, title: site.name });
      }
    } catch {
      /* the visitor closed the share sheet, or the browser refused: Save picture and Copy caption still work */
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2400);
      return true;
    } catch {
      /* clipboard can be blocked */
      return false;
    }
  };

  // TikTok has no link-sharing address on the web, so the button copies the caption and says what to do next.
  const toTiktok = async () => {
    if (await copy()) {
      setTiktok(true);
      clearTimeout(tiktokTimer.current);
      tiktokTimer.current = setTimeout(() => setTiktok(false), 9000);
    }
  };

  return (
    <section className="section overflow-x-clip bg-bg-2" id="share">
      <div className="wrap grid gap-x-20 gap-y-10 lg:grid-cols-[minmax(0,27rem)_1fr]">
        <div className="reveal lg:col-start-2 lg:row-start-1">
          <h2 className="display-lg max-w-[14ch]">{t.title}</h2>
          <p className="lead mt-4 max-w-[52ch]">{t.text}</p>
        </div>

        {/* The card, framed like the portrait at the top of the page. */}
        <div className="lg:sticky lg:top-28 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-start">
          <div
            className="frame isolate relative mx-auto w-full transition-[max-width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:mx-0"
            style={{ maxWidth: size === "feed" ? "26rem" : "17.5rem" }}
          >
            <div className="frame-offset" aria-hidden />
            <div className="frame-mat">
              <img
                key={base}
                src={`${base}.webp`}
                width={w}
                height={h}
                alt={`${site.name}. ${text} ${link}`}
                lang={c.lang}
                dir={c.dir}
                decoding="async"
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-start-2 lg:row-start-2">
          <h3 className="font-display text-xl font-extrabold">{t.language}</h3>
          <ul className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6">
            {order.map((code) => {
              const l = shareCards[code];
              const on = code === lang;
              return (
                <li key={code}>
                  <button
                    type="button"
                    onClick={() => setLang(code)}
                    aria-pressed={on}
                    className="group block w-full text-start"
                  >
                    <span
                      className={`block overflow-hidden rounded-lg ring-2 transition-shadow ${on ? "ring-accent" : "ring-transparent group-hover:ring-line"}`}
                    >
                      <img
                        src={`/share/${code}/thumb.webp`}
                        width={240}
                        height={300}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full"
                      />
                    </span>
                    <span
                      lang={l.lang}
                      dir={l.dir}
                      className={`mt-2 block truncate text-center text-xs font-bold ${on ? "text-accent" : "text-muted"}`}
                    >
                      {l.native}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-5">
            <div>
              <p className="mb-2 text-sm font-bold text-muted">{t.card}</p>
              <div className={seg} role="group" aria-label={t.card}>
                <button type="button" className={segBtn} aria-pressed={design === "motto"} onClick={() => setDesign("motto")}>
                  {t.mottoCard}
                </button>
                <button type="button" className={segBtn} aria-pressed={design === "lead"} onClick={() => setDesign("lead")}>
                  {t.introCard}
                </button>
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-bold text-muted">{t.size}</p>
              <div className={seg} role="group" aria-label={t.size}>
                <button type="button" className={segBtn} aria-pressed={size === "feed"} onClick={() => setSize("feed")}>
                  {t.feed}
                </button>
                <button type="button" className={segBtn} aria-pressed={size === "story"} onClick={() => setSize("story")}>
                  {t.story}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {canShare && (
              <button type="button" onClick={share} className="btn btn-primary">
                <ShareNetwork size={20} aria-hidden />
                {t.share}
              </button>
            )}
            <a href={`${base}.jpg`} download={filename} className={`btn ${canShare ? "btn-ghost" : "btn-primary"}`}>
              <DownloadSimple size={20} aria-hidden />
              {t.download}
            </a>
            <button type="button" onClick={copy} className="btn btn-ghost">
              {copied ? <Check size={20} aria-hidden /> : <Copy size={20} aria-hidden />}
              {copied ? t.copied : t.copy}
            </button>
            <span className="sr-only" role="status">
              {copied ? t.copiedStatus : ""}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-6">
            <span className="me-1 text-sm font-bold text-muted">{t.link}</span>
            {networks.map(({ name, color, Icon, href }) => (
              <a key={name} className={iconBtn} target="_blank" rel="noreferrer noopener" href={href} aria-label={name} title={name}>
                <Icon size={24} weight="fill" color={color} aria-hidden />
              </a>
            ))}
            <button type="button" className={iconBtn} onClick={toTiktok} aria-label="TikTok" title="TikTok">
              <TiktokLogo size={24} weight="fill" color="#FE2C55" aria-hidden />
            </button>
          </div>
          <p className="mt-3 min-h-6 max-w-[52ch] text-sm font-bold text-accent" role="status">
            {tiktok ? t.tiktokNote : ""}
          </p>
          <p className="mt-4 max-w-[52ch] text-sm text-muted">{t.hint}</p>
        </div>
      </div>
    </section>
  );
}
