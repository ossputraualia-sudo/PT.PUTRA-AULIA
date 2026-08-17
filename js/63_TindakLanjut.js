PAG.63_TindakLanjut = {

  create(data = {}) {

    return {

      id:
        data.id ||
        "TL-" + Date.now(),

      temuanId:
        data.temuanId || "",

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

      uraian:
        data.uraian || "",

      tindakan:
        data.tindakan || "",

      penanggungJawab:
        data.penanggungJawab || "",

      targetTanggal:
        data.targetTanggal || "",

      tanggalSelesai:
        data.tanggalSelesai || "",

      bukti:
        Array.isArray(data.bukti)
          ? data.bukti
          : [],

      hasil:
        data.hasil || "",

      status:
        data.status || "open",

      catatan:
        data.catatan || ""

    };

  },


  async save(data = {}) {

    const tindakLanjut =
      this.create(data);

    await PAG.Storage.put(
      "reports",
      {
        id:
          tindakLanjut.id,

        type:
          "tindak_lanjut",

        data:
          tindakLanjut,

        createdAt:
          new Date().toISOString()
      }
    );

    await PAG.OfflineSync.add(
      "tindak_lanjut",
      tindakLanjut
    );

    return tindakLanjut;

  },


  async list() {

    const records =
      await PAG.Storage.all(
        "reports"
      );

    return records.filter(
      item =>
        item.type === "tindak_lanjut"
    );

  },


  async listByTemuan(temuanId) {

    const records =
      await this.list();

    return records.filter(
      item =>
        item.data?.temuanId ===
        temuanId
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
        "tindak_lanjut"
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
        "Tindak lanjut tidak ditemukan."
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
          "tindak_lanjut",

        data:
          updated,

        updatedAt:
          updated.updatedAt
      }
    );


    await PAG.OfflineSync.add(
      "tindak_lanjut_update",
      updated
    );


    return updated;

  }

};
