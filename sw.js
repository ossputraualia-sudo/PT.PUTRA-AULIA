const CACHE_NAME = "pag-field-v2";

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/app.css",

  "./js/app.js",

  "./js/core/01_Config.js",
  "./js/core/02_API.js",
  "./js/core/03_Auth.js",
  "./js/core/04_Storage.js",
  "./js/core/05_OfflineSync.js",
  "./js/core/06_WebUtamaSync.js",
  "./js/core/07_SyncState.js",
  "./js/core/08_Router.js",
  "./js/core/09_UI.js",
  "./js/core/10_Device.js",

  "./js/20_Absensi.js",
  "./js/21_Selfie.js",
  "./js/22_GPS.js",

  "./js/30_LaporanHarian.js",
  "./js/31_Progress.js",
  "./js/32_Cuaca.js",
  "./js/33_TenagaKerja.js",
  "./js/34_Peralatan.js",
  "./js/35_Material.js",
  "./js/36_Kendala.js",

  "./js/40_Dokumentasi.js",
  "./js/41_Camera.js",
  "./js/42_GPSPhoto.js",
  "./js/43_Watermark.js",
  "./js/44_PhotoUpload.js",

  "./js/50_RFI.js",
  "./js/51_Inspection.js",
  "./js/52_InspectionResult.js",

  "./js/60_Instruksi.js",
  "./js/61_Memo.js",
  "./js/62_Temuan.js",
  "./js/63_TindakLanjut.js",

  "./js/70_Revision.js",
  "./js/71_Approval.js",
  "./js/72_Signature.js",
  "./js/73_QRVerify.js",
  "./js/74_AuditLog.js",

  "./js/80_Drive.js",
  "./js/81_PDFGenerator.js",
  "./js/82_PDFTemplate.js",

  "./js/90_Dashboard.js",
  "./js/91_Activity.js",
  "./js/92_Profile.js"
];


// ==========================================================
// INSTALL
// ==========================================================

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)

      .then(cache => {

        return cache.addAll(APP_SHELL);

      })

      .then(() => self.skipWaiting())

  );

});


// ==========================================================
// ACTIVATE
// ==========================================================

self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys()

      .then(keys => {

        return Promise.all(

          keys

            .filter(key => key !== CACHE_NAME)

            .map(key => caches.delete(key))

        );

      })

      .then(() => self.clients.claim())

  );

});


// ==========================================================
// FETCH
// ==========================================================

self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(

    caches.match(event.request)

      .then(cachedResponse => {

        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)

          .then(networkResponse => {

            if (
              networkResponse &&
              networkResponse.status === 200 &&
              networkResponse.type === "basic"
            ) {

              const responseClone =
                networkResponse.clone();

              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(
                    event.request,
                    responseClone
                  );
                });

            }

            return networkResponse;

          })

          .catch(() => {

            return caches.match("./index.html");

          });

      })

  );

});
