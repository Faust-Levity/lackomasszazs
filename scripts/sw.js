const CACHE_NAME = 'lacko-masszazs-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './scripts.js',
  './resources/slide_1.webp',
  './resources/slide_2.webp',
  './resources/slide_3.webp',
  './resources/slide_4.webp',
  './resources/slide_5.webp',
  './resources/slide_6.webp',
  './resources/about_me.webp',
  './resources/presentation-video.mp4'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});