PAG.73_QRVerify = {

  create(data = {}) {

    return {

      id:
        data.id ||
        "QRV-" + Date.now(),

      documentId:
        data.documentId || "",

      documentType:
        data.documentType || "",

      nomor:
        data.nomor || "",

      packageId:
        data.packageId || "",

      verificationCode:
        data.verificationCode ||
        this.generateCode(),

      verificationUrl:
        data.verificationUrl || "",

      generatedAt:
        data.generatedAt ||
        new Date().toISOString(),

      expiresAt:
        data.expiresAt || "",

      status:
        data.status || "active",

      verifiedAt:
        data.verifiedAt || "",

      verifiedBy:
        data.verifiedBy || "",

      catatan:
        data.catatan || ""

    };

  },


  generateCode() {

    const chars =
      "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "";

    for (
      let i = 0;
      i < 12;
      i++
    ) {

      code +=
        chars.charAt(
          Math.floor(
            Math.random() *
            chars.length
          )
        );

    }

    return code;

  },


  async save(data = {}) {

    const qr =
      this.create(data);

    await PAG.Storage.put(
      "reports",
      {
        id:
          qr.id,

        type:
          "qr_verify",

        data:
          qr,

        createdAt:
          new Date().toISOString()
      }
    );

    await PAG.OfflineSync.add(
      "qr_verify",
      qr
    );

    return qr;

  },


  async list() {

    const records =
      await PAG.Storage.all(
        "reports"
      );

    return records.filter(
      item =>
        item.type ===
        "qr_verify"
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
        "qr_verify"
    ) {

      return null;

    }

    return record.data || null;

  },


  async getByCode(
    verificationCode
  ) {

    const records =
      await this.list();

    const found =
      records.find(
        item =>
          item.data
            ?.verificationCode ===
          verificationCode
      );

    return found?.data || null;

  },


  async verify(
    verificationCode
  ) {

    if (
      !verificationCode ||
      !String(
        verificationCode
      ).trim()
    ) {

      throw new Error(
        "Kode verifikasi tidak ditemukan."
      );

    }


    const qr =
      await this.getByCode(
        String(
          verificationCode
        ).trim()
      );


    if (!qr) {

      return {

        valid:
          false,

        status:
          "not_found",

        message:
          "Dokumen tidak ditemukan."

      };

    }


    if (
      qr.status !== "active"
    ) {

      return {

        valid:
          false,

        status:
          qr.status,

        document:
          qr

      };

    }


    if (
      qr.expiresAt &&
      new Date(qr.expiresAt)
        .getTime() <
        Date.now()
    ) {

      await this.update(
        qr.id,
        {
          status:
            "expired"
        }
      );

      return {

        valid:
          false,

        status:
          "expired",

        document:
          qr

      };

    }


    const user =
      PAG.Auth.get();


    await this.update(
      qr.id,
      {

        verifiedAt:
          new Date().toISOString(),

        verifiedBy:
          user?.userId || "PUBLIC"

      }
    );


    return {

      valid:
        true,

      status:
        "verified",

      document:
        qr

    };

  },


  async update(
    id,
    changes = {}
  ) {

    const current =
      await this.get(id);

    if (!current) {

      throw new Error(
        "QR verification tidak ditemukan."
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
          "qr_verify",

        data:
          updated,

        updatedAt:
          updated.updatedAt
      }
    );


    await PAG.OfflineSync.add(
      "qr_verify_update",
      updated
    );


    return updated;

  }

};
