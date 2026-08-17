PAG.Storage = {

  db: null,


  // =====================================================
  // INIT DATABASE
  // =====================================================

  async init() {

    if (this.db) {
      return this.db;
    }


    const dbName =
      PAG.CONFIG.DB_NAME ||
      "PAG_DOCS_FIELD";

    const dbVersion =
      Number(
        PAG.CONFIG.DB_VERSION || 1
      );


    this.db = await new Promise(
      (resolve, reject) => {

        const request =
          indexedDB.open(
            dbName,
            dbVersion
          );


        // ===============================================
        // DATABASE UPGRADE
        // ===============================================

        request.onupgradeneeded =
          event => {

            const db =
              event.target.result;


            const stores = [

              "master",

              "queue",

              "reports",

              "photos",

              "syncstate"

            ];


            stores.forEach(
              storeName => {

                if (
                  !db.objectStoreNames
                    .contains(storeName)
                ) {

                  db.createObjectStore(
                    storeName,
                    {
                      keyPath: "id"
                    }
                  );

                }

              }
            );

          };


        // ===============================================
        // SUCCESS
        // ===============================================

        request.onsuccess =
          () => {

            const db =
              request.result;


            db.onversionchange =
              () => {

                db.close();

                this.db = null;

              };


            resolve(db);

          };


        // ===============================================
        // ERROR
        // ===============================================

        request.onerror =
          () => {

            reject(
              request.error ||
              new Error(
                "IndexedDB gagal dibuka."
              )
            );

          };


        request.onblocked =
          () => {

            console.warn(
              "IndexedDB sedang diblokir oleh koneksi lain."
            );

          };

      }
    );


    return this.db;

  },


  // =====================================================
  // PUT
  // =====================================================

  async put(
    storeName,
    object
  ) {

    await this.init();


    if (!object) {

      throw new Error(
        "Data Storage tidak ditemukan."
      );

    }


    return new Promise(
      (resolve, reject) => {

        try {

          const transaction =
            this.db.transaction(
              storeName,
              "readwrite"
            );


          const store =
            transaction.objectStore(
              storeName
            );


          const request =
            store.put(object);


          request.onsuccess =
            () => {

              resolve(
                request.result
              );

            };


          request.onerror =
            () => {

              reject(
                request.error
              );

            };

        } catch (error) {

          reject(error);

        }

      }
    );

  },


  // =====================================================
  // GET
  // =====================================================

  async get(
    storeName,
    id
  ) {

    await this.init();


    return new Promise(
      (resolve, reject) => {

        try {

          const transaction =
            this.db.transaction(
              storeName,
              "readonly"
            );


          const request =
            transaction
              .objectStore(storeName)
              .get(id);


          request.onsuccess =
            () => {

              resolve(
                request.result ||
                null
              );

            };


          request.onerror =
            () => {

              reject(
                request.error
              );

            };

        } catch (error) {

          reject(error);

        }

      }
    );

  },


  // =====================================================
  // GET ALL
  // =====================================================

  async all(
    storeName
  ) {

    await this.init();


    return new Promise(
      (resolve, reject) => {

        try {

          const transaction =
            this.db.transaction(
              storeName,
              "readonly"
            );


          const request =
            transaction
              .objectStore(storeName)
              .getAll();


          request.onsuccess =
            () => {

              resolve(
                request.result || []
              );

            };


          request.onerror =
            () => {

              reject(
                request.error
              );

            };

        } catch (error) {

          reject(error);

        }

      }
    );

  },


  // =====================================================
  // DELETE
  // =====================================================

  async remove(
    storeName,
    id
  ) {

    await this.init();


    return new Promise(
      (resolve, reject) => {

        try {

          const transaction =
            this.db.transaction(
              storeName,
              "readwrite"
            );


          const request =
            transaction
              .objectStore(storeName)
              .delete(id);


          request.onsuccess =
            () => {

              resolve(true);

            };


          request.onerror =
            () => {

              reject(
                request.error
              );

            };

        } catch (error) {

          reject(error);

        }

      }
    );

  },


  // =====================================================
  // CLEAR STORE
  // =====================================================

  async clear(
    storeName
  ) {

    await this.init();


    return new Promise(
      (resolve, reject) => {

        try {

          const transaction =
            this.db.transaction(
              storeName,
              "readwrite"
            );


          const request =
            transaction
              .objectStore(storeName)
              .clear();


          request.onsuccess =
            () => {

              resolve(true);

            };


          request.onerror =
            () => {

              reject(
                request.error
              );

            };

        } catch (error) {

          reject(error);

        }

      }
    );

  }

};
