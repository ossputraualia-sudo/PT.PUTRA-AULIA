PAG.50_RFI = {

  create(data = {}) {

    return {

      id:
        data.id ||
        "RFI-" + Date.now(),

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

      uraian:
        data.uraian || "",

      pertanyaan:
        data.pertanyaan || "",

      lampiran:
        Array.isArray(data.lampiran)
          ? data.lampiran
          : [],

      status:
        data.status || "draft",

      catatan:
        data.catatan || ""

    };

  },


  async save(data = {}) {

    const rfi =
      this.create(data);

    await PAG.Storage.put(
      "reports",
      {
        id:
          rfi.id,

        type:
          "rfi",

        data:
          rfi,

        createdAt:
          new Date().toISOString()
      }
    );

    await PAG.OfflineSync.add(
      "rfi",
      rfi
    );

    return rfi;

  },


  async list() {

    const records =
      await PAG.Storage.all(
        "reports"
      );

    return records.filter(
      item =>
        item.type === "rfi"
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
      record.type !== "rfi"
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
        "RFI tidak ditemukan."
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
          "rfi",

        data:
          updated,

        updatedAt:
          updated.updatedAt
      }
    );


    await PAG.OfflineSync.add(
      "rfi_update",
      updated
    );


    return updated;

  }

};
