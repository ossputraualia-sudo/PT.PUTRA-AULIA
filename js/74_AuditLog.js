PAG.74_AuditLog = {

  create(data = {}) {

    const user =
      PAG.Auth.get();

    return {

      id:
        data.id ||
        "AUD-" + Date.now(),

      timestamp:
        data.timestamp ||
        new Date().toISOString(),

      userId:
        data.userId ||
        user?.userId ||
        "",

      userName:
        data.userName ||
        user?.name ||
        "",

      role:
        data.role ||
        user?.role ||
        "",

      action:
        data.action || "",

      module:
        data.module || "",

      documentId:
        data.documentId || "",

      documentType:
        data.documentType || "",

      description:
        data.description || "",

      oldData:
        data.oldData || null,

      newData:
        data.newData || null,

      device:
        data.device || "",

      status:
        data.status || "success"

    };

  },


  async log(data = {}) {

    const entry =
      this.create(data);

    await PAG.Storage.put(
      "reports",
      {
        id:
          entry.id,

        type:
          "audit_log",

        data:
          entry,

        createdAt:
          entry.timestamp
      }
    );

    await PAG.OfflineSync.add(
      "audit_log",
      entry
    );

    return entry;

  },


  async list() {

    const records =
      await PAG.Storage.all(
        "reports"
      );

    return records
      .filter(
        item =>
          item.type ===
          "audit_log"
      )
      .sort(
        (a, b) =>
          new Date(
            b.data?.timestamp || 0
          ) -
          new Date(
            a.data?.timestamp || 0
          )
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
        "audit_log"
    ) {

      return null;

    }

    return record.data || null;

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


  async listByUser(
    userId
  ) {

    const records =
      await this.list();

    return records.filter(
      item =>
        item.data?.userId ===
        userId
    );

  },


  async listByModule(
    module
  ) {

    const records =
      await this.list();

    return records.filter(
      item =>
        item.data?.module ===
        module
    );

  }

};
