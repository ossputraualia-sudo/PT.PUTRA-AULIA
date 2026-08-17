PAG.34_Peralatan = {

  create(data = {}) {

    return {

      id:
        data.id ||
        "ALT-" + Date.now(),

      tanggal:
        data.tanggal ||
        new Date().toISOString(),

      packageId:
        data.packageId || "",

      personilId:
        data.personilId ||
        PAG.Auth.get()?.userId ||
        "",

      peralatan: Array.isArray(data.peralatan)
        ? data.peralatan
        : [],

      jumlah:
        Number(data.jumlah || 0),

      kondisi:
        data.kondisi || "",

      jamOperasi:
        Number(data.jamOperasi || 0),

      operator:
        data.operator || "",

      catatan:
        data.catatan || ""

    };

  },


  async save(data = {}) {

    const peralatan =
      this.create(data);

    await PAG.Storage.put(
      "reports",
      {
        id:
          peralatan.id,

        type:
          "peralatan",

        data:
          peralatan,

        createdAt:
          new Date().toISOString()
      }
    );

    await PAG.OfflineSync.add(
      "peralatan",
      peralatan
    );

    return peralatan;

  },


  async list() {

    const records =
      await PAG.Storage.all(
        "reports"
      );

    return records.filter(
      item =>
        item.type === "peralatan"
    );

  }

};
