PAG.35_Material = {

  create(data = {}) {

    return {

      id:
        data.id ||
        "MAT-" + Date.now(),

      tanggal:
        data.tanggal ||
        new Date().toISOString(),

      packageId:
        data.packageId || "",

      personilId:
        data.personilId ||
        PAG.Auth.get()?.userId ||
        "",

      material: Array.isArray(data.material)
        ? data.material
        : [],

      nama:
        data.nama || "",

      jumlah:
        Number(data.jumlah || 0),

      satuan:
        data.satuan || "",

      kondisi:
        data.kondisi || "",

      sumber:
        data.sumber || "",

      catatan:
        data.catatan || ""

    };

  },


  async save(data = {}) {

    const material =
      this.create(data);

    await PAG.Storage.put(
      "reports",
      {
        id:
          material.id,

        type:
          "material",

        data:
          material,

        createdAt:
          new Date().toISOString()
      }
    );

    await PAG.OfflineSync.add(
      "material",
      material
    );

    return material;

  },


  async list() {

    const records =
      await PAG.Storage.all(
        "reports"
      );

    return records.filter(
      item =>
        item.type === "material"
    );

  }

};
