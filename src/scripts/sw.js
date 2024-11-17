import 'regenerator-runtime';
import CacheHelper from './utils/cache-helper.js';

const assetsToCache = [
  './',
  './icons/icon_96x96.png',
  './icons/icon_128x128.png',
  './icons/icon_192x192.png',
  './icons/icon_256x256.png',
  './icons/icon_384x384.png',
  './icons/icon_512x512.png',
  './index.html',
  './favicon.png',
  './app.bundle.js',
  './app.webmanifest',
  './sw-workbox.bundle.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  if (!(event.request.url.indexOf('http') === 0)) return;
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
