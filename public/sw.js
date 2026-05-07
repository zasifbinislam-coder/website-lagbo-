/* Self-clearing service worker. Mobile users were getting stuck on a
   stale shell from the old caching version, so this build:
   - skips waiting + claims clients immediately
   - nukes EVERY cache on activate (wl-shell-v1 and anything else)
   - does NOT install a fetch handler, so the browser's normal HTTP cache
     handles all requests with standard freshness rules
   We can layer caching back on once the deploy is fully stable. */

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

/* No fetch handler — let the browser handle requests normally. */
