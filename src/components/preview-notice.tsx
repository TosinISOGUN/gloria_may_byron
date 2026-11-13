import { X } from "@phosphor-icons/react";
import { useState } from "react";

/**
 * Shown only on a private preview build (never on the live site): a small note so nobody mistakes the
 * preview for the finished site. It can be dismissed, and it sits in a corner clear of the page's own controls.
 */
export function PreviewNotice() {
  const [shown, setShown] = useState(true);
  if (!shown) return null;
  return (
    <div
      role="note"
      lang="en"
      dir="ltr"
      className="fixed bottom-3 left-3 z-40 flex max-w-[calc(100vw-1.5rem)] items-center gap-2 rounded-full border border-line bg-[#0a191e]/90 py-1.5 pl-4 pr-1.5 text-xs font-medium text-[#e9f1ef] shadow-lg backdrop-blur-md"
    >
      <span>Private preview. Not the live site.</span>
      <button
        type="button"
        onClick={() => setShown(false)}
        aria-label="Dismiss the preview notice"
        className="grid size-7 place-items-center rounded-full hover:bg-white/10"
      >
        <X size={14} aria-hidden />
      </button>
    </div>
  );
}
