/* KILL-SWITCH service worker.
 *
 * History: an earlier build shipped a network-first SW that intercepted
 * fetches and cached the app shell. On flaky mobile networks it ended up
 * serving a half-broken cached shell ("page not loading" on phones).
 *
 * This file's job is to: (1) wipe every cache it ever created, and
 * (2) UNREGISTER itself permanently. Once a phone fetches this file
 * (browsers re-fetch sw.js automatically every ~24h or on every navigation),
 * the SW clears its caches, disappears, and the browser stops sending any
 * SW-related logic for this origin. No SW = no cache layer = the stale-
 * shell bug literally cannot happen again.
 *
 * Index.html no longer registers a service worker, so future visitors
 * never get one installed. Do NOT re-add SW registration without testing
 * on real mobile (Safari iOS + Chrome Android) on flaky 3G first.
 */

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      } catch (_) {}
      try {
        await self.registration.unregister();
        const clients = await self.clients.matchAll({ type: 'window' });
        for (const c of clients) c.navigate(c.url);
      } catch (_) {}
    })()
  );
});

/* No fetch handler — never intercept anything. */
