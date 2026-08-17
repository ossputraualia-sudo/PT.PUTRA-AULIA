PAG.61_Memo = {

  create(data = {}) {

    return {

      id:
        data.id ||
        "MEMO-" + Date.now(),

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

      cc:
        Array.isArray(data.cc)
          ? data.cc
          : [],

      perihal:
        data.perihal || "",

      lokasi:
        data.lokasi || "",

      isi:
        data.isi || "",

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

    const memo =
      this.create(data);

    await PAG.Storage.put(
      "reports",
      {
        id:
          memo.id,

        type:
          "memo",

        data:
          memo,

        createdAt:
          new Date().toISOString()
      }
    );

    await PAG.OfflineSync.add(
      "memo",
      memo
    );

    return memo;

  },


  async list() {

    const records =
      await PAG.Storage.all(
        "reports"
      );

    return records.filter(
      item =>
        item.type === "memo"
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
      record.type !== "memo"
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
        "Memo tidak ditemukan."
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
          "memo",

        data:
          updated,

        updatedAt:
          updated.updatedAt
      }
    );


    await PAG.OfflineSync.add(
      "memo_update",
      updated
    );


    return updated;

  }

};
