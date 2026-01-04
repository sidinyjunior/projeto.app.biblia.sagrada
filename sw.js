const CACHE_NAME = 'projeto-app-biblia-v6';
const ASSETS = [
  '/',
  '/index.html',
  '/assets/icone_leao_biblia_app.png',
  '/acf.json',
  '/nvi.json',
  '/kja.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
