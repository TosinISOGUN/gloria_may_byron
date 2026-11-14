import {
  Check,
  Copy,
  DownloadSimple,
  FacebookLogo,
  InstagramLogo,
  ShareNetwork,
  ThreadsLogo,
  TiktokLogo,
  WhatsappLogo,
  XLogo,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

import { shareCards, type ShareCardLocale } from "@/data/share-cards.generated";
import { SITE_URL, site } from "@/data/site";
import { fmt } from "@/i18n";
import { useLocale } from "@/i18n/use-locale";
import { useT } from "@/i18n/messages-context";

type Design = "motto" | "lead";
type Size = "feed" | "story";

const order = Object.keys(shareCards) as ShareCardLocale[];
const dims: Record<Size, { w: number; h: number }> = { feed: { w: 720, h: 900 }, story: { w: 540, h: 960 } };

const seg = "inline-flex rounded-full border border-line p-1";
const iconBtn =
  "grid size-10 shrink-0 place-items-center rounded-full border border-line transition-colors hover:border-ink min-[380px]:size-11 sm:size-12";
const segBtn =
  "min-h-10 rounded-full px-4 text-sm font-bold transition-colors aria-pressed:bg-accent aria-pressed:text-on-accent";

type Note = { kind: "paste" } | { kind: "app"; app: string } | null;

/** The card as a PNG (the clipboard only takes PNG for pictures). */
async function toPng(jpeg: Blob): Promise<Blob> {
  const bmp = await createImageBitmap(jpeg);
  const canvas = document.createElement("canvas");
  canvas.width = bmp.width;
  canvas.height = bmp.height;
  canvas.getContext("2d")!.drawImage(bmp, 0, 0);
  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("png"))), "image/png"));
}

/**
 * The shareable cards (one per language, two designs, two shapes) with ways to pass them on.
 * The picture goes along wherever the browser allows it:
 *  - phones and tablets: every share button opens the device's share sheet with the card attached;
 *  - computers: WhatsApp, X and Threads open their post box while the card is copied, ready to paste;
 *  - Instagram and TikTok take no post from a website, so they copy the caption and say to post the saved picture.
 * Save picture always works.
 */
export function ShareCards() {
  const t = useT().contact.share;
  const current = useLocale() as ShareCardLocale;
  const [lang, setLang] = useState<ShareCardLocale>(current);
  const [design, setDesign] = useState<Design>("motto");
  const [size, setSize] = useState<Size>("feed");
  const [copied, setCopied] = useState(false);
  const [canFiles, setCanFiles] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [note, setNote] = useState<Note>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const noteTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => setLang(current), [current]);
  useEffect(() => {
    try {
      const probe = new File([""], "card.jpg", { type: "image/jpeg" });
      setCanFiles(typeof navigator.share === "function" && !!navigator.canShare?.({ files: [probe] }));
    } catch {
      setCanFiles(false);
    }
  }, []);
  useEffect(
    () => () => {
      clearTimeout(timer.current);
      clearTimeout(noteTimer.current);
    },
    [],
  );

  const c = shareCards[lang];
  const text = design === "motto" ? c.motto : c.intro;
  const link = `${SITE_URL.replace(/\/+$/, "")}${c.path}`;
  const caption = `${text}\n${link}`;
  const base = `/share/${lang}/${design}-${size}`;
  const filename = `gloria-may-byron-${lang}-${design}-${size}.jpg`;
  const { w, h } = dims[size];
  const enc = encodeURIComponent;

  // Where the device can share files, the picture is fetched ahead of time: the share sheet must be opened
  // straight from the tap, and some browsers (iPhone Safari) refuse it after a wait.
  useEffect(() => {
    if (!canFiles) return;
    let stale = false;
    setFile(null);
    fetch(`${base}.jpg`)
      .then((r) => r.blob())
      .then((b) => !stale && setFile(new File([b], filename, { type: "image/jpeg" })))
      .catch(() => {});
    return () => {
      stale = true;
    };
  }, [canFiles, base, filename]);

  const say = (n: Note) => {
    setNote(n);
    clearTimeout(noteTimer.current);
    noteTimer.current = setTimeout(() => setNote(null), 9000);
  };

  const share = async () => {
    if (!file) return;
    try {
      await navigator.share({ files: [file], text: caption, title: site.name });
    } catch {
      /* the visitor closed the share sheet */
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
      return false; /* clipboard can be blocked */
    }
  };

  /** Puts the card itself on the clipboard. Called straight from a tap, so the browser allows it. */
  const copyPicture = () => {
    if (typeof ClipboardItem === "undefined" || !navigator.clipboard?.write) return Promise.resolve(false);
    const png = fetch(`${base}.jpg`).then((r) => r.blob()).then(toPng);
    return navigator.clipboard.write([new ClipboardItem({ "image/png": png })]).then(
      () => true,
      () => false,
    );
  };

  // `post` is the network's own post-box address; Facebook and the two apps below have none that takes a picture.
  const networks = [
    { name: "WhatsApp", color: "#25D366", Icon: WhatsappLogo, post: `https://wa.me/?text=${enc(`${text} ${link}`)}`, pastes: true },
    { name: "Facebook", color: "#1877F2", Icon: FacebookLogo, post: `https://www.facebook.com/sharer/sharer.php?u=${enc(link)}`, pastes: false },
    { name: "X", color: "var(--text)", Icon: XLogo, post: `https://twitter.com/intent/tweet?url=${enc(link)}&text=${enc(text)}`, pastes: true },
    { name: "Threads", color: "var(--text)", Icon: ThreadsLogo, post: `https://www.threads.com/intent/post?text=${enc(`${text} ${link}`)}`, pastes: true },
    { name: "Instagram", color: "#E4405F", Icon: InstagramLogo, post: null, pastes: false },
    { name: "TikTok", color: "#FE2C55", Icon: TiktokLogo, post: null, pastes: false },
  ];

  const pass = (n: (typeof networks)[number]) => {
    if (canFiles) {
      void share();
      return;
    }
    if (n.post) {
      window.open(n.post, "_blank", "noopener,noreferrer");
      if (n.pastes) void copyPicture().then((ok) => say(ok ? { kind: "paste" } : null));
      return;
    }
    void copy().then((ok) => ok && say({ kind: "app", app: n.name }));
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
                  <button type="button" onClick={() => setLang(code)} aria-pressed={on} className="group block w-full text-start">
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
            {canFiles && (
              <button type="button" onClick={share} disabled={!file} className="btn btn-primary disabled:opacity-60">
                <ShareNetwork size={20} aria-hidden />
                {t.share}
              </button>
            )}
            <a href={`${base}.jpg`} download={filename} className={`btn ${canFiles ? "btn-ghost" : "btn-primary"}`}>
              <DownloadSimple size={20} aria-hidden />
              {t.download}
            </a>
            {/* Hidden on phones: the Share button already sends the picture with the caption. */}
            <button type="button" onClick={copy} className="btn btn-ghost hidden sm:inline-flex">
              {copied ? <Check size={20} aria-hidden /> : <Copy size={20} aria-hidden />}
              {copied ? t.copied : t.copy}
            </button>
            <span className="sr-only" role="status">
              {copied ? t.copiedStatus : ""}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-6">
            <span className="w-full text-sm font-bold text-muted sm:w-auto">{t.link}</span>
            <div className="flex flex-nowrap gap-2 min-[380px]:gap-2.5 sm:gap-4">
              {networks.map((n) => (
                <button
                  key={n.name}
                  type="button"
                  className={iconBtn}
                  onClick={() => pass(n)}
                  disabled={canFiles && !file}
                  aria-label={n.name}
                  title={n.name}
                >
                  <n.Icon size={24} weight="fill" color={n.color} aria-hidden />
                </button>
              ))}
            </div>
          </div>
          <p className="mt-3 min-h-6 max-w-[52ch] text-sm font-bold text-accent" role="status">
            {note?.kind === "paste" ? t.pasteNote : note?.kind === "app" ? fmt(t.appNote, { app: note.app }) : ""}
          </p>
          {!canFiles && <p className="mt-4 max-w-[52ch] text-sm text-muted">{t.hint}</p>}
        </div>
      </div>
    </section>
  );
}
