PAG.60_Instruksi = {

  create(data = {}) {

    return {

      id:
        data.id ||
        "INS-" + Date.now(),

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

      kepada:
        data.kepada || "",

      dari:
        data.dari ||
        PAG.Auth.get()?.name ||
        "",

      perihal:
        data.perihal || "",

      lokasi:
        data.lokasi || "",

      isi:
        data.isi || "",

      prioritas:
        data.prioritas || "normal",

      batasWaktu:
        data.batasWaktu || "",

      status:
        data.status || "draft",

      catatan:
        data.catatan || "",

      lampiran:
        Array.isArray(data.lampiran)
          ? data.lampiran
          : []

    };

  },


  async save(data = {}) {

    const instruksi =
      this.create(data);

    await PAG.Storage.put(
      "reports",
      {
        id:
          instruksi.id,

        type:
          "instruksi",

        data:
          instruksi,

        createdAt:
          new Date().toISOString()
      }
    );

    await PAG.OfflineSync.add(
      "instruksi",
      instruksi
    );

    return instruksi;

  },


  async list() {

    const records =
      await PAG.Storage.all(
        "reports"
      );

    return records.filter(
      item =>
        item.type === "instruksi"
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
      record.type !== "instruksi"
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
        "Instruksi tidak ditemukan."
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
          "instruksi",

        data:
          updated,

        updatedAt:
          updated.updatedAt
      }
    );


    await PAG.OfflineSync.add(
      "instruksi_update",
      updated
    );


    return updated;

  }

};
