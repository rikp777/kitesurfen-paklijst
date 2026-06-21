// Minimal offline-first service worker (no build step / no deps).
// Strategy: serve from cache when possible, update the cache in the
// background. Hashed Vite assets are cached on first request, so a second
// visit works fully offline.

const CACHE = "kite-paklijst-v1";
const PRECACHE = [self.registration.scope]; // app shell entry (index.html)

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || !request.url.startsWith("http")) return;

  // Don't cache cross-origin API calls (e.g. the live wind forecast).
  const sameOrigin = new URL(request.url).origin === self.location.origin;
  if (!sameOrigin) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
