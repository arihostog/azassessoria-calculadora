/* Service Worker — A&Z Calculadora. Cache do app shell para carregar rápido e funcionar offline. */
const CACHE = 'azcalc-v2';
const ASSETS = [
  '/calculadora',
  '/emolumentos.js',
  '/logo.png',
  '/logo-pa.png',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
  '/manifest.json'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(resp => {
      const copy = resp.clone();
      if (resp.ok && e.request.url.startsWith(self.location.origin)) {
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return resp;
    }).catch(() => caches.match('/calculadora')))
  );
});
