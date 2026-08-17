PAG.32_Cuaca = {

  create(data = {}) {

    return {

      id:
        data.id ||
        "CUACA-" + Date.now(),

      tanggal:
        data.tanggal ||
        new Date().toISOString(),

      packageId:
        data.packageId || "",

      personilId:
        data.personilId ||
        PAG.Auth.get()?.userId ||
        "",

      kondisi:
        data.kondisi || "",

      suhu:
        data.suhu || "",

      kelembapan:
        data.kelembapan || "",

      curahHujan:
        data.curahHujan || "",

      angin:
        data.angin || "",

      catatan:
        data.catatan || ""

    };

  },


  async save(data = {}) {

    const cuaca =
      this.create(data);

    await PAG.Storage.put(
      "reports",
      {
        id:
          cuaca.id,

        type:
          "cuaca",

        data:
          cuaca,

        createdAt:
          new Date().toISOString()
      }
    );

    await PAG.OfflineSync.add(
      "cuaca",
      cuaca
    );

    return cuaca;

  },


  async list() {

    const records =
      await PAG.Storage.all(
        "reports"
      );

    return records.filter(
      item =>
        item.type === "cuaca"
    );

  }

};
