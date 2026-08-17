PAG.31_Progress = {

  create(data = {}) {

    return {

      id:
        data.id ||
        "PROG-" + Date.now(),

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

      volume:
        Number(data.volume || 0),

      satuan:
        data.satuan || "",

      persentase:
        Number(data.persentase || 0),

      catatan:
        data.catatan || ""

    };

  },


  async save(data = {}) {

    const progress =
      this.create(data);

    await PAG.Storage.put(
      "reports",
      {
        id:
          progress.id,

        type:
          "progress",

        data:
          progress,

        createdAt:
          new Date().toISOString()
      }
    );

    await PAG.OfflineSync.add(
      "progress",
      progress
    );

    return progress;

  },


  async list() {

    const records =
      await PAG.Storage.all(
        "reports"
      );

    return records.filter(
      item =>
        item.type === "progress"
    );

  }

};
