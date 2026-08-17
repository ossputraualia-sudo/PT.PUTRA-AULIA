PAG.WebUtamaSync = {

  // =====================================================
  // PULL MASTER DARI WEB UTAMA
  // =====================================================

  async pull() {

    const url =
      PAG.CONFIG.MAIN_WEBAPP_URL;


    if (
      !url ||
      url === "PASTE_MAIN_WEBAPP_URL_HERE"
    ) {

      console.warn(
        "MAIN_WEBAPP_URL belum dikonfigurasi."
      );

      return await this.getMaster();

    }


    try {

      const result =
        await PAG.API.get(
          url,
          "fieldMaster"
        );


      const data =
        result?.data || {};


      await PAG.Storage.put(
        "master",
        {
          id: "current",
          data,
          updatedAt:
            new Date().toISOString()
        }
      );


      await PAG.Storage.put(
        "syncstate",
        {
          id: "webutama",
          time:
            new Date().toISOString(),
          status:
            "success"
        }
      );


      console.log(
        "PAG WebUtamaSync: master berhasil diperbarui."
      );


      return data;


    } catch (error) {

      console.warn(
        "PAG WebUtamaSync gagal:",
        error
      );


      await PAG.Storage.put(
        "syncstate",
        {
          id: "webutama",
          time:
            new Date().toISOString(),
          status:
            "offline",
          error:
            error.message || String(error)
        }
      );


      return await this.getMaster();

    }

  },


  // =====================================================
  // GET MASTER DARI LOCAL STORAGE
  // =====================================================

  async getMaster() {

    try {

      const record =
        await PAG.Storage.get(
          "master",
          "current"
        );


      return record?.data || {};

    } catch (error) {

      console.error(
        "PAG WebUtamaSync.getMaster:",
        error
      );

      return {};

    }

  }

};
