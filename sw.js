const CACHE_NAME = "pag-field-v20";

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/app.css"
];


/* =====================================================
   INSTALL
   ===================================================== */

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => {

        return cache.addAll(APP_SHELL);

      })

  );

  self.skipWaiting();

});


/* =====================================================
   ACTIVATE
   ===================================================== */

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

  );

  self.clients.claim();

});


/* =====================================================
   FETCH
   ===================================================== */

self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") {
    return;
  }


  event.respondWith(

    caches.match(event.request)
      .then(cached => {

        /*
         * Jika sudah ada cache,
         * gunakan cache.
         */

        if (cached) {

          return cached;

        }


        /*
         * Jika belum ada cache,
         * ambil dari jaringan.
         */

        return fetch(event.request)

          .then(response => {

            if (
              response &&
              response.status === 200 &&
              response.type === "basic"
            ) {

              const copy =
                response.clone();


              caches.open(CACHE_NAME)
                .then(cache => {

                  cache.put(
                    event.request,
                    copy
                  );

                });

            }


            return response;

          })

          .catch(() => {

            /*
             * Jika offline,
             * kembali ke index.
             */

            return caches.match(
              "./index.html"
            );

          });

      })

  );

});
