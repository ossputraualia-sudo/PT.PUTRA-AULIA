```javascript
/* =====================================================
   PAG DOCS FIELD
   SERVICE WORKER
   ===================================================== */

const CACHE_NAME = "pag-field-v19";


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
            .filter(key =>
              key !== CACHE_NAME
            )
            .map(key =>
              caches.delete(key)
            )

        );

      })

  );

  self.clients.claim();

});


/* =====================================================
   FETCH
   ===================================================== */

self.addEventListener("fetch", event => {

  const request =
    event.request;


  /* -----------------------------------------------
     HANYA GET
     ----------------------------------------------- */

  if (
    request.method !== "GET"
  ) {

    return;

  }


  const url =
    new URL(
      request.url
    );


  /* -----------------------------------------------
     JAVASCRIPT / CSS / HTML
     
     SELALU NETWORK FIRST
     
     Supaya perubahan kode GitHub
     langsung terbaca.
     ----------------------------------------------- */

  const isCodeFile =
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".html");


  if (isCodeFile) {

    event.respondWith(

      fetch(request)
        .then(response => {

          if (
            response &&
            response.status === 200
          ) {

            const copy =
              response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {

                cache.put(
                  request,
                  copy
                );

              });

          }

          return response;

        })

        .catch(() => {

          return caches.match(request);

        })

    );

    return;

  }


  /* -----------------------------------------------
     FILE LAIN
     
     CACHE FIRST
     ----------------------------------------------- */

  event.respondWith(

    caches.match(request)
      .then(cached => {

        if (cached) {

          return cached;

        }


        return fetch(request)
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
                    request,
                    copy
                  );

                });

            }

            return response;

          })
          .catch(() => {

            return caches.match(
              "./index.html"
            );

          });

      })

  );

});
```
