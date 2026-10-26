/* Service worker aplikasi Budi Computer (B). Khusus folder ini saja.
   Tanpa cache -> tidak ada tampilan lama (stale). Syarat instal PWA: ada handler fetch. */
var APP = 'pusaha';   // unik; ganti kalau perlu agar tidak sama dengan aplikasi lain

self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(
    // hapus hanya cache milik aplikasi ini (berawalan APP), cache aplikasi lain tidak disentuh
    caches.keys().then(function (ks) {
      return Promise.all(ks.filter(function (k) { return k.indexOf(APP + '-') === 0; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});
self.addEventListener('fetch', function (e) {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(fetch(e.request).catch(function () {
    return new Response('<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="font-family:sans-serif;text-align:center;padding:48px 16px"><h2>Tidak ada koneksi</h2><p>Periksa internet Anda lalu muat ulang.</p>', {status: 503, headers: {'Content-Type': 'text/html; charset=utf-8'}});
  }));
});
