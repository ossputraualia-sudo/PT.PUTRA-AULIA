PAG.71_Approval = {

  create(data = {}) {

    return {

      id:
        data.id ||
        "APR-" + Date.now(),

      documentId:
        data.documentId || "",

      documentType:
        data.documentType || "",

      nomor:
        data.nomor || "",

      packageId:
        data.packageId || "",

      requesterId:
        data.requesterId ||
        PAG.Auth.get()?.userId ||
        "",

      requesterName:
        data.requesterName ||
        PAG.Auth.get()?.name ||
        "",

      approverId:
        data.approverId || "",

      approverName:
        data.approverName || "",

      requestedAt:
        data.requestedAt ||
        new Date().toISOString(),

      approvedAt:
        data.approvedAt || "",

      level:
        Number(data.level || 1),

      status:
        data.status || "pending",

      komentar:
        data.komentar || "",

      alasan:
        data.alasan || ""

    };

  },


  async save(data = {}) {

    const approval =
      this.create(data);

    await PAG.Storage.put(
      "reports",
      {
        id:
          approval.id,

        type:
          "approval",

        data:
          approval,

        createdAt:
          new Date().toISOString()
      }
    );

    await PAG.OfflineSync.add(
      "approval",
      approval
    );

    return approval;

  },


  async list() {

    const records =
      await PAG.Storage.all(
        "reports"
      );

    return records.filter(
      item =>
        item.type === "approval"
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
      record.type !== "approval"
    ) {

      return null;

    }

    return record.data || null;

  },


  async approve(
    id,
    komentar = ""
  ) {

    return await this.update(
      id,
      {

        status:
          "approved",

        approvedAt:
          new Date().toISOString(),

        komentar

      }
    );

  },


  async reject(
    id,
    alasan = ""
  ) {

    return await this.update(
      id,
      {

        status:
          "rejected",

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
        "Approval tidak ditemukan."
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
          "approval",

        data:
          updated,

        updatedAt:
          updated.updatedAt
      }
    );


    await PAG.OfflineSync.add(
      "approval_update",
      updated
    );


    return updated;

  }

};
