const cacheName = 'Number-list-app-v2';

const cacheAssets = [
  'index.html',
  'style.css',
  'index.js',
  'sw.js',
  'manifest.json',
  'icons/android-chrome-192x192.png',
  'icons/android-chrome-512x512.png',
  'icons/apple-touch-icon.png',
];


self.addEventListener('install', async (ev) => {
  ev.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    cache.addAll(cacheAssets);
    return self.skipWaiting();
  })());
});

self.addEventListener('activate', async (ev) => {
  ev.waitUntil((async () => {
    const keys = await caches.keys();
    console.log(keys);
    const targets = keys.filter(key =>  key !== cacheName);
    console.log(targets);
    return Promise.all(targets.map(target => caches.delete(target)));
  })());
});

self.addEventListener('fetch', async (ev) => {
  ev.respondWith((async () => {
    const hit = await caches.match(ev.request);
    //キャッシュがあれば出す
    if (hit) {
      return hit;
    }

    //なければ取りに行く、キャッシュに保存しておく
    try{
      const res = await fetch(ev.request);
      const resClone = res.clone();
      const cache = await caches.open(cacheName);
      cache.put(ev.request, resClone);
      return res;
    } catch(error) {
      return new Response(error);
    }
  })());
});