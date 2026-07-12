/* Service Worker — A&Z (Calculadora + Vendas de Bebidas).
   HTML = network-first (sempre pega a versao mais nova quando online).
   Arquivos estaticos = cache-first (carrega rapido e funciona offline).
   v4: cada pagina e guardada no cache pelo proprio endereco (corrige conflito
   entre /calculadora e /vendas no modo offline). */
const CACHE = 'azcalc-v4';
const ASSETS = [
  '/calculadora',
  '/emolumentos.js',
  '/logo.png',
  '/logo-pa.png',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
  '/manifest.json',
  '/vendas',
  '/vendas-manifest.json'
];
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.all(ASSETS.map(function (a) { return c.add(a).catch(function () {}); }));
    }).then(function () { return self.skipWaiting(); })
  );
});
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.clients.claim(); })
  );
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var isDoc = e.request.mode === 'navigate' || e.request.destination === 'document';
  if (isDoc) {
    e.respondWith(
      fetch(e.request).then(function (resp) {
        var copy = resp.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        return resp;
      }).catch(function () {
        return caches.match(e.request, { ignoreSearch: true }).then(function (m) {
          return m || caches.match('/calculadora');
        });
      })
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(function (cached) {
      return cached || fetch(e.request).then(function (resp) {
        var copy = resp.clone();
        if (resp.ok && e.request.url.indexOf(self.location.origin) === 0) {
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        }
        return resp;
      });
    })
  );
});
