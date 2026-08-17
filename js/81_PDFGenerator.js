PAG.81_PDFGenerator = {

  create(data = {}) {

    return {

      id:
        data.id ||
        "PDF-" + Date.now(),

      documentId:
        data.documentId || "",

      documentType:
        data.documentType || "",

      nomor:
        data.nomor || "",

      title:
        data.title || "",

      packageId:
        data.packageId || "",

      personilId:
        data.personilId ||
        PAG.Auth.get()?.userId ||
        "",

      templateId:
        data.templateId || "",

      template:
        data.template || null,

      data:
        data.data || {},

      status:
        "pending",

      createdAt:
        new Date().toISOString()

    };

  },


  async generate(data = {}) {

    const job =
      this.create(data);

    /*
     * Simpan pekerjaan PDF secara lokal.
     */

    await PAG.Storage.put(
      "reports",
      {
        id:
          job.id,

        type:
          "pdf_job",

        data:
          job,

        createdAt:
          job.createdAt
      }
    );


    /*
     * Masukkan ke antrean.
     */

    await PAG.OfflineSync.add(
      "pdf_generate",
      job
    );


    /*
     * Jika backend tersedia,
     * coba kirim langsung.
     */

    if (
      navigator.onLine &&
      PAG.CONFIG.FIELD_BACKEND_URL &&
      PAG.CONFIG.FIELD_BACKEND_URL !==
        "PASTE_FIELD_BACKEND_URL_HERE"
    ) {

      try {

        const result =
          await PAG.API.post(
            PAG.CONFIG.FIELD_BACKEND_URL,
            "generatePDF",
            job
          );

        if (result?.ok !== false) {

          job.status =
            "submitted";

          job.submittedAt =
            new Date().toISOString();

          await PAG.Storage.put(
            "reports",
            {
              id:
                job.id,

              type:
                "pdf_job",

              data:
                job,

              updatedAt:
                new Date().toISOString()
            }
          );

        }

      } catch (error) {

        console.warn(
          "PDF belum dapat dikirim:",
          error
        );

      }

    }


    return job;

  },


  async generateFromDocument(
    document,
    options = {}
  ) {

    if (!document) {

      throw new Error(
        "Data dokumen tidak ditemukan."
      );

    }


    return this.generate({

      documentId:
        document.id || "",

      documentType:
        options.documentType ||
        document.type ||
        "",

      nomor:
        document.nomor || "",

      title:
        options.title ||
        document.perihal ||
        document.title ||
        "",

      packageId:
        document.packageId || "",

      templateId:
        options.templateId || "",

      template:
        options.template || null,

      data:
        document

    });

  },


  async generateLaporanHarian(
    data,
    options = {}
  ) {

    return this.generateFromDocument(
      data,
      {
        ...options,

        documentType:
          "laporan_harian",

        title:
          options.title ||
          "Laporan Harian"

      }
    );

  },


  async generateRFI(
    data,
    options = {}
  ) {

    return this.generateFromDocument(
      data,
      {
        ...options,

        documentType:
          "rfi",

        title:
          options.title ||
          "Request For Information"

      }
    );

  },


  async generateInspection(
    data,
    options = {}
  ) {

    return this.generateFromDocument(
      data,
      {
        ...options,

        documentType:
          "inspection",

        title:
          options.title ||
          "Inspection"

      }
    );

  },


  async generateMemo(
    data,
    options = {}
  ) {

    return this.generateFromDocument(
      data,
      {
        ...options,

        documentType:
          "memo",

        title:
          options.title ||
          "Memo"

      }
    );

  },


  async generateInstruksi(
    data,
    options = {}
  ) {

    return this.generateFromDocument(
      data,
      {
        ...options,

        documentType:
          "instruksi",

        title:
          options.title ||
          "Instruksi"

      }
    );

  },


  async generateTemuan(
    data,
    options = {}
  ) {

    return this.generateFromDocument(
      data,
      {
        ...options,

        documentType:
          "temuan",

        title:
          options.title ||
          "Temuan"

      }
    );

  },


  async generateTindakLanjut(
    data,
    options = {}
  ) {

    return this.generateFromDocument(
      data,
      {
        ...options,

        documentType:
          "tindak_lanjut",

        title:
          options.title ||
          "Tindak Lanjut"

      }
    );

  },


  async listJobs() {

    const records =
      await PAG.Storage.all(
        "reports"
      );

    return records.filter(
      item =>
        item.type ===
        "pdf_job"
    );

  },


  async getJob(id) {

    const record =
      await PAG.Storage.get(
        "reports",
        id
      );

    if (
      !record ||
      record.type !==
        "pdf_job"
    ) {

      return null;

    }

    return record.data || null;

  }

};
