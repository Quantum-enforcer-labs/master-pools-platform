const CACHE_VERSION = "v1.0.0";
const SHELL_CACHE = `masterpools-shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `masterpools-runtime-${CACHE_VERSION}`;
const SHELL_ASSETS = [
  "/",
  "/index.html",
  "/favicon.svg",
  "/manifest.webmanifest",
  "/images/logo.jpeg",
  "/images/avatar-placeholder.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter(
            (key) =>
              key.startsWith("masterpools-shell-") ||
              key.startsWith("masterpools-runtime-"),
          )
          .filter((key) => key !== SHELL_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key)),
      ),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const { request } = event;
  const url = new URL(request.url);

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches
            .open(SHELL_CACHE)
            .then((cache) => cache.put("/index.html", responseClone));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match("/index.html");
          return cached || caches.match("/");
        }),
    );
    return;
  }

  const isMediaRequest =
    request.destination === "image" ||
    request.destination === "video" ||
    /\.(?:avif|bmp|gif|ico|jpeg|jpg|png|svg|webp|mp4|mov|webm)$/i.test(
      url.pathname,
    );

  if (isMediaRequest) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then(async (cache) => {
        const cached = await cache.match(request, { ignoreSearch: true });
        if (cached) {
          event.waitUntil(
            fetch(request)
              .then((response) => {
                if (response && response.ok) {
                  cache.put(request, response.clone());
                }
              })
              .catch(() => {}),
          );
          return cached;
        }

        const response = await fetch(request);
        if (response && response.ok) {
          cache.put(request, response.clone());
        }
        return response;
      }),
    );
    return;
  }

  if (request.destination === "script" || request.destination === "style") {
    event.respondWith(
      caches.match(request).then((cached) => {
        const networkFetch = fetch(request).then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches
              .open(RUNTIME_CACHE)
              .then((cache) => cache.put(request, copy));
          }
          return response;
        });

        return cached || networkFetch;
      }),
    );
  }
});
