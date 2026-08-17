PAG.80_Drive = {

  async upload(file, data = {}) {

    if (!file) {
      throw new Error("File tidak ditemukan.");
    }

    const user = PAG.Auth.get();

    const payload = {
      id:
        data.id ||
        "FILE-" + Date.now(),

      name:
        data.name ||
        file.name ||
        "file",

      mimeType:
        data.mimeType ||
        file.type ||
        "application/octet-stream",

      size:
        file.size || 0,

      documentId:
        data.documentId || "",

      documentType:
        data.documentType || "",

      packageId:
        data.packageId || "",

      personilId:
        data.personilId ||
        user?.userId ||
        "",

      createdAt:
        new Date().toISOString()
    };

    /*
     * Simpan file sementara di IndexedDB.
     * File akan dikirim ke Apps Script
     * ketika koneksi tersedia.
     */

    await PAG.Storage.put(
      "photos",
      {
        id: payload.id,
        file: file,
        data: payload
      }
    );

    await PAG.OfflineSync.add(
      "drive_upload",
      {
        ...payload,
        fileId: payload.id
      }
    );

    return payload;
  },


  async queueUpload(file, data = {}) {

    return this.upload(
      file,
      data
    );

  },


  async list() {

    const records =
      await PAG.Storage.all(
        "photos"
      );

    return records.filter(
      item =>
        item.data
    );

  },


  async get(id) {

    const record =
      await PAG.Storage.get(
        "photos",
        id
      );

    return record || null;

  },


  async removeLocal(id) {

    const db =
      PAG.Storage.db;

    if (!db) {
      throw new Error(
        "Storage belum diinisialisasi."
      );
    }

    return new Promise(
      (resolve, reject) => {

        const tx =
          db.transaction(
            "photos",
            "readwrite"
          );

        tx.objectStore(
          "photos"
        ).delete(id);

        tx.oncomplete =
          resolve;

        tx.onerror =
          () =>
            reject(tx.error);

      }
    );

  }

};
