PAG.44_PhotoUpload = {

  async upload(photo) {

    if (!photo) {

      throw new Error(
        "Data foto tidak ditemukan."
      );

    }


    const id =
      photo.id ||
      "PHOTO-" + Date.now();


    const user =
      PAG.Auth.get();


    const payload = {

      id,

      type:
        photo.type ||
        "dokumentasi",

      userId:
        user?.userId ||
        "",

      userName:
        user?.name ||
        "",

      packageId:
        photo.packageId ||
        "",

      gps:
        photo.gps ||
        null,

      createdAt:
        photo.createdAt ||
        new Date().toISOString()

    };


    // ==================================================
    // ONLINE
    // ==================================================

    if (
      navigator.onLine &&
      PAG.CONFIG.FIELD_BACKEND_URL &&
      PAG.CONFIG.FIELD_BACKEND_URL !==
        "PASTE_FIELD_BACKEND_URL_HERE"
    ) {

      try {

        const result =
          await PAG.API.post(

            PAG.CONFIG.FIELD_BACKEND_URL,

            "photo",

            payload

          );


        if (
          result &&
          result.ok === false
        ) {

          throw new Error(
            result.error ||
            "Upload foto gagal."
          );

        }


        return {

          ok: true,

          id,

          server:
            result

        };

      } catch (error) {

        console.warn(
          "Upload online gagal:",
          error
        );

      }

    }


    // ==================================================
    // OFFLINE / FALLBACK
    // ==================================================

    await PAG.OfflineSync.add(
      "photo",
      payload
    );


    return {

      ok: true,

      id,

      queued: true

    };

  },


  async uploadBlob(
    blob,
    metadata = {}
  ) {

    if (!blob) {

      throw new Error(
        "Blob foto tidak ditemukan."
      );

    }


    const id =
      metadata.id ||
      "PHOTO-" + Date.now();


    const photo = {

      ...metadata,

      id,

      blob,

      createdAt:
        metadata.createdAt ||
        new Date().toISOString()

    };


    // Simpan lokal terlebih dahulu

    await PAG.Storage.put(
      "photos",
      {

        id,

        type:
          metadata.type ||
          "dokumentasi",

        blob,

        gps:
          metadata.gps ||
          null,

        createdAt:
          photo.createdAt

      }
    );


    return await this.upload(
      photo
    );

  }

};
