/* =====================================================
   PAG DOCS FIELD
   SERVICE WORKER
   ===================================================== */

const CACHE_NAME = "pag-field-v17";


/* =====================================================
   APP SHELL
   ===================================================== */

const APP_SHELL = [

  "./",
  "./index.html",
  "./manifest.json",
  "./css/app.css"

];


/* =====================================================
   INSTALL
   ===================================================== */

self.addEventListener(
  "install",
  event => {

    console.log(
      "PAG Docs Service Worker: INSTALL",
      CACHE_NAME
    );


    event.waitUntil(

      caches.open(CACHE_NAME)
        .then(cache => {

          return cache.addAll(
            APP_SHELL
          );

        })

    );


    /*
     * Langsung aktifkan versi baru
     */

    self.skipWaiting();

  }
);


/* =====================================================
   ACTIVATE
   ===================================================== */

self.addEventListener(
  "activate",
  event => {

    console.log(
      "PAG Docs Service Worker: ACTIVATE",
      CACHE_NAME
    );


    event.waitUntil(

      caches.keys()
        .then(keys => {

          return Promise.all(

            keys
              .filter(
                key =>
                  key !== CACHE_NAME
              )

              .map(
                key =>
                  caches.delete(key)
              )

          );

        })

        .then(() => {

          /*
           * Ambil kontrol semua halaman
           */

          return self.clients.claim();

        })

    );

  }
);


/* =====================================================
   FETCH
   ===================================================== */

self.addEventListener(
  "fetch",
  event => {

    /*
     * Hanya GET
     */

    if (
      event.request.method !== "GET"
    ) {

      return;

    }


    const url =
      new URL(
        event.request.url
      );


    /* =================================================
       JAVASCRIPT
       =================================================

       JS SELALU CEK SERVER TERLEBIH DAHULU.

       Ini penting agar perubahan:
       08_Router.js
       09_UI.js
       90_Dashboard.js
       dll

       tidak tertahan cache lama.
       ================================================= */

    if (
      url.pathname.endsWith(".js")
    ) {

      event.respondWith(

        fetch(
          event.request,
          {
            cache: "no-store"
          }
        )

          .then(
            response => {

              /*
               * Simpan JS terbaru
               */

              if (
                response &&
                response.status === 200
              ) {

                const copy =
                  response.clone();


                caches.open(
                  CACHE_NAME
                )
                .then(
                  cache => {

                    cache.put(
                      event.request,
                      copy
                    );

                  }
                );

              }


              return response;

            }
          )

          .catch(
            () => {

              /*
               * Jika offline,
               * gunakan JS yang terakhir
               * tersimpan di cache.
               */

              return caches.match(
                event.request
              );

            }
          )

      );


      return;

    }


    /* =================================================
       CSS
       =================================================

       CSS juga dicek ke server terlebih dahulu
       agar perubahan tampilan langsung terlihat.
       ================================================= */

    if (
      url.pathname.endsWith(".css")
    ) {

      event.respondWith(

        fetch(
          event.request,
          {
            cache: "no-store"
          }
        )

          .then(
            response => {

              if (
                response &&
                response.status === 200
              ) {

                const copy =
                  response.clone();


                caches.open(
                  CACHE_NAME
                )
                .then(
                  cache => {

                    cache.put(
                      event.request,
                      copy
                    );

                  }
                );

              }


              return response;

            }
          )

          .catch(
            () =>
              caches.match(
                event.request
              )
          )

      );


      return;

    }


    /* =================================================
       INDEX HTML
       =================================================

       HTML juga network-first.
       ================================================= */

    if (
      url.pathname.endsWith(
        "/"
      ) ||
      url.pathname.endsWith(
        "/index.html"
      )
    ) {

      event.respondWith(

        fetch(
          event.request,
          {
            cache: "no-store"
          }
        )

          .then(
            response => {

              if (
                response &&
                response.status === 200
              ) {

                const copy =
                  response.clone();


                caches.open(
                  CACHE_NAME
                )
                .then(
                  cache => {

                    cache.put(
                      event.request,
                      copy
                    );

                  }
                );

              }


              return response;

            }
          )

          .catch(
            () =>
              caches.match(
                "./index.html"
              )
          )

      );


      return;

    }


    /* =================================================
       ASSET LAIN
       =================================================

       Untuk manifest, icon, gambar, dll:
       CACHE FIRST.
       ================================================= */

    event.respondWith(

      caches.match(
        event.request
      )

        .then(
          cached => {

            if (cached) {

              return cached;

            }


            return fetch(
              event.request
            )

              .then(
                response => {

                  if (
                    response &&
                    response.status === 200 &&
                    response.type === "basic"
                  ) {

                    const copy =
                      response.clone();


                    caches.open(
                      CACHE_NAME
                    )
                    .then(
                      cache => {

                        cache.put(
                          event.request,
                          copy
                        );

                      }
                    );

                  }


                  return response;

                }
              );

          }
        )

        .catch(
          () => {

            /*
             * Fallback halaman utama
             */

            return caches.match(
              "./index.html"
            );

          }
        )

    );

  }
);


/* =====================================================
   MESSAGE
   ===================================================== */

self.addEventListener(
  "message",
  event => {

    if (
      event.data &&
      event.data.type ===
        "SKIP_WAITING"
    ) {

      self.skipWaiting();

    }

  }
);


/* =====================================================
   DEBUG
   ===================================================== */

console.log(
  "PAG Docs Field SW loaded:",
  CACHE_NAME
);
