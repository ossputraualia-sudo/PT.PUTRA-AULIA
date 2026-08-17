PAG.33_TenagaKerja = {

  create(data = {}) {

    return {

      id:
        data.id ||
        "TK-" + Date.now(),

      tanggal:
        data.tanggal ||
        new Date().toISOString(),

      packageId:
        data.packageId || "",

      personilId:
        data.personilId ||
        PAG.Auth.get()?.userId ||
        "",

      tenagaKerja: Array.isArray(data.tenagaKerja)
        ? data.tenagaKerja
        : [],

      total:
        Number(data.total || 0),

      jamKerja:
        Number(data.jamKerja || 0),

      catatan:
        data.catatan || ""

    };

  },


  async save(data = {}) {

    const tenaga =
      this.create(data);

    await PAG.Storage.put(
      "reports",
      {
        id:
          tenaga.id,

        type:
          "tenaga_kerja",

        data:
          tenaga,

        createdAt:
          new Date().toISOString()
      }
    );

    await PAG.OfflineSync.add(
      "tenaga_kerja",
      tenaga
    );

    return tenaga;

  },


  async list() {

    const records =
      await PAG.Storage.all(
        "reports"
      );

    return records.filter(
      item =>
        item.type === "tenaga_kerja"
    );

  }

};
