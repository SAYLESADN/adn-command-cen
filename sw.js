const CACHE = 'adn-cc-v3';
const ASSETS = [
  './',
  './ADN-Command-Centre-v3.html',
  './manifest.webmanifest',
  './icon.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Never cache API calls
  if (url.hostname === 'api.anthropic.com') return;

  // Cache-first for Google Fonts (they're immutable by URL)
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.open(CACHE).then(c =>
        c.match(e.request).then(r => r || fetch(e.request).then(nr => {
          if (nr && nr.status === 200) c.put(e.request, nr.clone());
          return nr;
        }))
      )
    );
    return;
  }

  // Network-first for same-origin, fall back to cache (offline shell)
  if (url.origin === self.location.origin) {
    e.respondWith(
      fetch(e.request)
        .then(r => {
          if (r && r.status === 200) {
            const clone = r.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone)).catch(() => {});
          }
          return r;
        })
        .catch(() => caches.match(e.request).then(r => r || caches.match('./ADN-Command-Centre-v3.html')))
    );
  }
});
