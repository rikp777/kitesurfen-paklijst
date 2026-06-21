// Thin wrappers around mobile browser APIs, with capability checks so callers
// don't have to sprinkle `if ('vibrate' in navigator)` everywhere.

/** Short haptic tap on supported mobile devices. No-op elsewhere. */
export function haptic(ms = 10) {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* ignore */
  }
}

/** True when the Web Share API (native share sheet) is available. */
export function canShare() {
  return typeof navigator !== "undefined" && typeof navigator.share === "function";
}

/**
 * Open the native share sheet, falling back to clipboard copy.
 * @returns {Promise<"shared"|"copied"|"unsupported">}
 */
export async function shareText({ title, text, url }) {
  try {
    if (canShare()) {
      await navigator.share({ title, text, url });
      return "shared";
    }
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(`${text} ${url || ""}`.trim());
      return "copied";
    }
  } catch {
    /* user cancelled or denied */
  }
  return "unsupported";
}
