const CACHE_NAME = 'projeto-app-biblia-v16'; // Mude para v4, v5 sempre que atualizar
const ASSETS = [
  './',
  './index.html',
  './assets/icone_leao_biblia_app.png',
  './acf.json',
  './nvi.json',
  './kja.json',
  './kjv.json',
  './manifest.json'
];

// Instalação e Cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // Força o novo SW a assumir o controle na hora
});

// LIMPEZA DE CACHE ANTIGO (O ponto que você pediu)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Limpando cache antigo:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Faz o app usar o novo cache imediatamente
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
