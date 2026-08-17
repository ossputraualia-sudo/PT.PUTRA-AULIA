PAG.36_Kendala = {

  create(data = {}) {

    return {

      id:
        data.id ||
        "KDL-" + Date.now(),

      tanggal:
        data.tanggal ||
        new Date().toISOString(),

      packageId:
        data.packageId || "",

      personilId:
        data.personilId ||
        PAG.Auth.get()?.userId ||
        "",

      kategori:
        data.kategori || "",

      uraian:
        data.uraian || "",

      lokasi:
        data.lokasi || "",

      dampak:
        data.dampak || "",

      tingkat:
        data.tingkat || "",

      tindakan:
        data.tindakan || "",

      status:
        data.status || "open",

      catatan:
        data.catatan || ""

    };

  },


  async save(data = {}) {

    const kendala =
      this.create(data);

    await PAG.Storage.put(
      "reports",
      {
        id:
          kendala.id,

        type:
          "kendala",

        data:
          kendala,

        createdAt:
          new Date().toISOString()
      }
    );

    await PAG.OfflineSync.add(
      "kendala",
      kendala
    );

    return kendala;

  },


  async list() {

    const records =
      await PAG.Storage.all(
        "reports"
      );

    return records.filter(
      item =>
        item.type === "kendala"
    );

  }

};
