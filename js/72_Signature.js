PAG.72_Signature = {

  create(data = {}) {

    return {

      id:
        data.id ||
        "SIG-" + Date.now(),

      documentId:
        data.documentId || "",

      documentType:
        data.documentType || "",

      nomor:
        data.nomor || "",

      packageId:
        data.packageId || "",

      signerId:
        data.signerId ||
        PAG.Auth.get()?.userId ||
        "",

      signerName:
        data.signerName ||
        PAG.Auth.get()?.name ||
        "",

      signerRole:
        data.signerRole || "",

      signatureType:
        data.signatureType ||
        "approval",

      signatureData:
        data.signatureData || "",

      signedAt:
        data.signedAt ||
        new Date().toISOString(),

      status:
        data.status || "unsigned",

      catatan:
        data.catatan || ""

    };

  },


  async save(data = {}) {

    const signature =
      this.create(data);

    await PAG.Storage.put(
      "reports",
      {
        id:
          signature.id,

        type:
          "signature",

        data:
          signature,

        createdAt:
          new Date().toISOString()
      }
    );

    await PAG.OfflineSync.add(
      "signature",
      signature
    );

    return signature;

  },


  async list() {

    const records =
      await PAG.Storage.all(
        "reports"
      );

    return records.filter(
      item =>
        item.type === "signature"
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
      record.type !== "signature"
    ) {

      return null;

    }

    return record.data || null;

  },


  async sign(
    id,
    signatureData
  ) {

    if (
      !signatureData ||
      !String(
        signatureData
      ).trim()
    ) {

      throw new Error(
        "Data tanda tangan tidak ditemukan."
      );

    }


    return await this.update(
      id,
      {

        signatureData,

        status:
          "signed",

        signedAt:
          new Date().toISOString()

      }
    );

  },


  async revoke(
    id,
    alasan = ""
  ) {

    return await this.update(
      id,
      {

        status:
          "revoked",

        catatan:
          alasan

      }
    );

  },


  async update(
    id,
    changes = {}
  ) {

    const current =
      await this.get(id);

    if (!current) {

      throw new Error(
        "Signature tidak ditemukan."
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
          "signature",

        data:
          updated,

        updatedAt:
          updated.updatedAt
      }
    );


    await PAG.OfflineSync.add(
      "signature_update",
      updated
    );


    return updated;

  }

};
