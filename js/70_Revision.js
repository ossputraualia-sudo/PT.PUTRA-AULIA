PAG.70_Revision = {

  create(data = {}) {

    return {

      id:
        data.id ||
        "REV-" + Date.now(),

      documentId:
        data.documentId || "",

      documentType:
        data.documentType || "",

      nomor:
        data.nomor || "",

      revision:
        Number(data.revision || 0),

      tanggal:
        data.tanggal ||
        new Date().toISOString(),

      packageId:
        data.packageId || "",

      personilId:
        data.personilId ||
        PAG.Auth.get()?.userId ||
        "",

      perubahan:
        data.perubahan || "",

      alasan:
        data.alasan || "",

      versiSebelumnya:
        data.versiSebelumnya || "",

      versiSekarang:
        data.versiSekarang || "",

      status:
        data.status || "draft",

      catatan:
        data.catatan || ""

    };

  },


  async save(data = {}) {

    const revision =
      this.create(data);

    await PAG.Storage.put(
      "reports",
      {
        id:
          revision.id,

        type:
          "revision",

        data:
          revision,

        createdAt:
          new Date().toISOString()
      }
    );

    await PAG.OfflineSync.add(
      "revision",
      revision
    );

    return revision;

  },


  async list() {

    const records =
      await PAG.Storage.all(
        "reports"
      );

    return records.filter(
      item =>
        item.type === "revision"
    );

  },


  async listByDocument(
    documentId
  ) {

    const records =
      await this.list();

    return records.filter(
      item =>
        item.data?.documentId ===
        documentId
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
      record.type !== "revision"
    ) {

      return null;

    }

    return record.data || null;

  },


  async update(
    id,
    changes = {}
  ) {

    const current =
      await this.get(id);

    if (!current) {

      throw new Error(
        "Revision tidak ditemukan."
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
          "revision",

        data:
          updated,

        updatedAt:
          updated.updatedAt
      }
    );


    await PAG.OfflineSync.add(
      "revision_update",
      updated
    );


    return updated;

  }

};
