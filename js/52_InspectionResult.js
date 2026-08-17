PAG.52_InspectionResult = {

  create(data = {}) {

    return {

      id:
        data.id ||
        "INR-" + Date.now(),

      inspectionId:
        data.inspectionId || "",

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

      item:
        data.item || "",

      hasil:
        data.hasil || "",

      kesesuaian:
        data.kesesuaian || "",

      nilai:
        Number(data.nilai || 0),

      temuan:
        data.temuan || "",

      rekomendasi:
        data.rekomendasi || "",

      tindakan:
        data.tindakan || "",

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

    const result =
      this.create(data);

    await PAG.Storage.put(
      "reports",
      {
        id:
          result.id,

        type:
          "inspection_result",

        data:
          result,

        createdAt:
          new Date().toISOString()
      }
    );

    await PAG.OfflineSync.add(
      "inspection_result",
      result
    );

    return result;

  },


  async list() {

    const records =
      await PAG.Storage.all(
        "reports"
      );

    return records.filter(
      item =>
        item.type ===
        "inspection_result"
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
      record.type !==
        "inspection_result"
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
        "Hasil inspection tidak ditemukan."
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
          "inspection_result",

        data:
          updated,

        updatedAt:
          updated.updatedAt
      }
    );


    await PAG.OfflineSync.add(
      "inspection_result_update",
      updated
    );


    return updated;

  }

};
