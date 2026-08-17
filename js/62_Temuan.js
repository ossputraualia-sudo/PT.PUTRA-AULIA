PAG.62_Temuan = {

  create(data = {}) {

    return {

      id:
        data.id ||
        "TMN-" + Date.now(),

      nomor:
        data.nomor || "",

      tanggal:
        data.tanggal ||
        new Date().toISOString(),

      packageId:
        data.packageId || "",

      personilId:
        data.personilId ||
        PAG.Auth.get()?.userId ||
        "",

      lokasi:
        data.lokasi || "",

      kategori:
        data.kategori || "",

      uraian:
        data.uraian || "",

      kondisi:
        data.kondisi || "",

      acuan:
        data.acuan || "",

      dampak:
        data.dampak || "",

      tingkat:
        data.tingkat || "minor",

      rekomendasi:
        data.rekomendasi || "",

      tindakan:
        data.tindakan || "",

      penanggungJawab:
        data.penanggungJawab || "",

      batasWaktu:
        data.batasWaktu || "",

      status:
        data.status || "open",

      catatan:
        data.catatan || "",

      lampiran:
        Array.isArray(data.lampiran)
          ? data.lampiran
          : []

    };

  },


  async save(data = {}) {

    const temuan =
      this.create(data);

    await PAG.Storage.put(
      "reports",
      {
        id:
          temuan.id,

        type:
          "temuan",

        data:
          temuan,

        createdAt:
          new Date().toISOString()
      }
    );

    await PAG.OfflineSync.add(
      "temuan",
      temuan
    );

    return temuan;

  },


  async list() {

    const records =
      await PAG.Storage.all(
        "reports"
      );

    return records.filter(
      item =>
        item.type === "temuan"
    );

  },


  async get(id) {

    const record =
      await PAG.Storage.get(
        "reports",
        id
      );

    if (
      !record ||
      record.type !== "temuan"
    ) {

      return null;

    }

    return record.data || null;

  },


  async update(id, changes = {}) {

    const current =
      await this.get(id);

    if (!current) {

      throw new Error(
        "Temuan tidak ditemukan."
      );

    }


    const updated = {

      ...current,

      ...changes,

      id,

      updatedAt:
        new Date().toISOString()

    };


    await PAG.Storage.put(
      "reports",
      {
        id,

        type:
          "temuan",

        data:
          updated,

        updatedAt:
          updated.updatedAt
      }
    );


    await PAG.OfflineSync.add(
      "temuan_update",
      updated
    );


    return updated;

  }

};
