PAG.51_Inspection = {

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

      lokasi:
        data.lokasi || "",

      pekerjaan:
        data.pekerjaan || "",

      item:
        data.item || "",

      spesifikasi:
        data.spesifikasi || "",

      metode:
        data.metode || "",

      hasil:
        data.hasil || "",

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

    const inspection =
      this.create(data);

    await PAG.Storage.put(
      "reports",
      {
        id:
          inspection.id,

        type:
          "inspection",

        data:
          inspection,

        createdAt:
          new Date().toISOString()
      }
    );

    await PAG.OfflineSync.add(
      "inspection",
      inspection
    );

    return inspection;

  },


  async list() {

    const records =
      await PAG.Storage.all(
        "reports"
      );

    return records.filter(
      item =>
        item.type === "inspection"
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
      record.type !== "inspection"
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
        "Inspection tidak ditemukan."
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
          "inspection",

        data:
          updated,

        updatedAt:
          updated.updatedAt
      }
    );


    await PAG.OfflineSync.add(
      "inspection_update",
      updated
    );


    return updated;

  }

};
