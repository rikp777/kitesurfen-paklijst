// Registers the service worker so the packing list works offline — handy on
// a Danish beach with no signal. Skipped in dev to avoid caching headaches.

export function registerServiceWorker() {
  if (import.meta.env.DEV) return;
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    const base = import.meta.env.BASE_URL || "/";
    navigator.serviceWorker.register(`${base}sw.js`).catch(() => {
      // Registration failure is non-fatal; the app still runs online.
    });
  });
}
