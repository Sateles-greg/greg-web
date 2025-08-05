self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open('greg-cache-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/vite.svg',
        '/assets/index-B4wWxylT.css',
        '/assets/index-Db89FOgN.js'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
