PAG.OfflineSync = {

  // =====================================================
  // ADD TO OFFLINE QUEUE
  // =====================================================

  async add(type, payload) {

    if (!type) {

      throw new Error(
        "Tipe queue belum ditentukan."
      );

    }


    const item = {

      id:
        "Q-" +
        Date.now() +
        "-" +
        Math.random()
          .toString(36)
          .slice(2, 8),

      type,

      payload,

      createdAt:
        new Date().toISOString(),

      status:
        "pending"

    };


    await PAG.Storage.put(
      "queue",
      item
    );


    return item;

  },


  // =====================================================
  // RUN SYNC QUEUE
  // =====================================================

  async run() {

    if (!navigator.onLine) {

      console.log(
        "PAG OfflineSync: perangkat offline."
      );

      return {
        synced: 0,
        failed: 0,
        skipped: true
      };

    }


    const backend =
      PAG.CONFIG.FIELD_BACKEND_URL;


    if (
      !backend ||
      backend ===
        "PASTE_FIELD_BACKEND_URL_HERE"
    ) {

      console.warn(
        "PAG OfflineSync: FIELD_BACKEND_URL belum dikonfigurasi."
      );

      return {
        synced: 0,
        failed: 0,
        skipped: true
      };

    }


    const queue =
      await PAG.Storage.all(
        "queue"
      );


    let synced = 0;

    let failed = 0;


    for (
      const item of queue
    ) {

      try {

        const result =
          await PAG.API.post(
            backend,
            "queue",
            item
          );


        if (
          result &&
          result.ok === false
        ) {

          throw new Error(
            result.error ||
            "Backend menolak queue."
          );

        }


        // =============================================
        // HAPUS QUEUE SETELAH BERHASIL
        // =============================================

        await PAG.Storage.remove(
          "queue",
          item.id
        );


        synced++;


      } catch (error) {

        failed++;


        console.warn(
          "Queue gagal disinkronkan:",
          item,
          error
        );

      }

    }


    console.log(
      "PAG OfflineSync:",
      {
        synced,
        failed
      }
    );


    return {
      synced,
      failed,
      skipped: false
    };

  }

};
