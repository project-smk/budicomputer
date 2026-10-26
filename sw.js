/* Service worker minimal: syarat instal PWA. Tanpa cache, jadi tidak ada masalah tampilan lama (stale). */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(fetch(e.request).catch(function () {
    return new Response('<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="font-family:sans-serif;text-align:center;padding:48px 16px"><h2>Tidak ada koneksi</h2><p>Periksa internet Anda lalu muat ulang.</p>', {status: 503, headers: {'Content-Type': 'text/html; charset=utf-8'}});
  }));
});
