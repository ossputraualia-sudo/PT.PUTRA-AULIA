PAG.PDFTemplate = {

  create: function(data = {}) {

    return {

      id:
        data.id ||
        "TPL-" + Date.now(),

      name:
        data.name ||
        "Template Baru",

      documentType:
        data.documentType || "",

      paper:
        data.paper || "A4",

      orientation:
        data.orientation || "portrait",

      margin:
        data.margin || {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        },

      header:
        data.header || {
          enabled: true,
          height: 30,
          logo: "",
          title: "",
          subtitle: ""
        },

      footer:
        data.footer || {
          enabled: true,
          height: 20,
          text: "",
          pageNumber: true
        },

      logo:
        data.logo || "",

      title:
        data.title || "",

      subtitle:
        data.subtitle || "",

      kolom:
        Array.isArray(data.kolom)
          ? data.kolom
          : [],

      bagian:
        Array.isArray(data.bagian)
          ? data.bagian
          : [],

      elemen:
        Array.isArray(data.elemen)
          ? data.elemen
          : [],

      updatedAt:
        new Date().toISOString()

    };

  },


  getDefault: function(
    documentType = ""
  ) {

    const templates = {

      laporan_harian: {

        name:
          "Laporan Harian",

        documentType:
          "laporan_harian",

        title:
          "LAPORAN HARIAN",

        kolom: [
          {
            key: "tanggal",
            title: "Tanggal",
            width: 20
          },
          {
            key: "progress",
            title: "Progress",
            width: 40
          },
          {
            key: "cuaca",
            title: "Cuaca",
            width: 20
          },
          {
            key: "kendala",
            title: "Kendala",
            width: 20
          }
        ]

      },


      instruksi: {

        name:
          "Instruksi",

        documentType:
          "instruksi",

        title:
          "INSTRUKSI",

        kolom: [
          {
            key: "nomor",
            title: "Nomor",
            width: 20
          },
          {
            key: "tanggal",
            title: "Tanggal",
            width: 20
          },
          {
            key: "kepada",
            title: "Kepada",
            width: 30
          },
          {
            key: "perihal",
            title: "Perihal",
            width: 30
          }
        ]

      },


      memo: {

        name:
          "Memo",

        documentType:
          "memo",

        title:
          "MEMO",

        kolom: [
          {
            key: "nomor",
            title: "Nomor",
            width: 20
          },
          {
            key: "tanggal",
            title: "Tanggal",
            width: 20
          },
          {
            key: "kepada",
            title: "Kepada",
            width: 30
          },
          {
            key: "perihal",
            title: "Perihal",
            width: 30
          }
        ]

      },


      rfi: {

        name:
          "Request For Information",

        documentType:
          "rfi",

        title:
          "REQUEST FOR INFORMATION",

        kolom: [
          {
            key: "nomor",
            title: "Nomor",
            width: 20
          },
          {
            key: "tanggal",
            title: "Tanggal",
            width: 20
          },
          {
            key: "kepada",
            title: "Kepada",
            width: 30
          },
          {
            key: "perihal",
            title: "Perihal",
            width: 30
          }
        ]

      },


      inspection: {

        name:
          "Inspection",

        documentType:
          "inspection",

        title:
          "INSPECTION",

        kolom: [
          {
            key: "nomor",
            title: "Nomor",
            width: 20
          },
          {
            key: "tanggal",
            title: "Tanggal",
            width: 20
          },
          {
            key: "lokasi",
            title: "Lokasi",
            width: 30
          },
          {
            key: "item",
            title: "Item",
            width: 30
          }
        ]

      },


      inspection_result: {

        name:
          "Inspection Result",

        documentType:
          "inspection_result",

        title:
          "HASIL INSPECTION",

        kolom: [
          {
            key: "item",
            title: "Item",
            width: 30
          },
          {
            key: "hasil",
            title: "Hasil",
            width: 40
          },
          {
            key: "kesesuaian",
            title: "Kesesuaian",
            width: 30
          }
        ]

      },


      temuan: {

        name:
          "Temuan",

        documentType:
          "temuan",

        title:
          "TEMUAN",

        kolom: [
          {
            key: "nomor",
            title: "Nomor",
            width: 20
          },
          {
            key: "tanggal",
            title: "Tanggal",
            width: 20
          },
          {
            key: "lokasi",
            title: "Lokasi",
            width: 20
          },
          {
            key: "tingkat",
            title: "Tingkat",
            width: 20
          },
          {
            key: "status",
            title: "Status",
            width: 20
          }
        ]

      },


      tindak_lanjut: {

        name:
          "Tindak Lanjut",

        documentType:
          "tindak_lanjut",

        title:
          "TINDAK LANJUT",

        kolom: [
          {
            key: "nomor",
            title: "Nomor",
            width: 20
          },
          {
            key: "tanggal",
            title: "Tanggal",
            width: 20
          },
          {
            key: "penanggungJawab",
            title: "Penanggung Jawab",
            width: 30
          },
          {
            key: "status",
            title: "Status",
            width: 30
          }
        ]

      }

    };


    return this.create(
      templates[documentType] ||
      {}
    );

  },


  addColumn: function(
    data,
    column
  ) {

    if (!column) {

      throw new Error(
        "Kolom template tidak ditemukan."
      );

    }


    if (
      !column.key ||
      !String(column.key).trim()
    ) {

      throw new Error(
        "Key kolom wajib diisi."
      );

    }


    if (!data.kolom) {

      data.kolom = [];

    }


    data.kolom.push({

      key:
        column.key,

      title:
        column.title || "",

      width:
        Number(
          column.width || 20
        ),

      align:
        column.align || "left"

    });


    data.updatedAt =
      new Date().toISOString();


    return data;

  },


  removeColumn: function(
    data,
    index
  ) {

    if (!data.kolom) {

      return data;

    }


    if (
      index < 0 ||
      index >= data.kolom.length
    ) {

      return data;

    }


    data.kolom.splice(
      index,
      1
    );


    data.updatedAt =
      new Date().toISOString();


    return data;

  },


  addSection: function(
    data,
    section
  ) {

    if (!section) {

      throw new Error(
        "Bagian template tidak ditemukan."
      );

    }


    if (
      !section.key ||
      !String(section.key).trim()
    ) {

      throw new Error(
        "Key bagian wajib diisi."
      );

    }


    if (!data.bagian) {

      data.bagian = [];

    }


    data.bagian.push({

      key:
        section.key,

      title:
        section.title || "",

      order:
        Number(
          section.order ||
          data.bagian.length + 1
        ),

      fields:
        section.fields || []

    });


    data.updatedAt =
      new Date().toISOString();


    return data;

  },


  addElement: function(
    data,
    element
  ) {

    if (!element) {

      throw new Error(
        "Elemen template tidak ditemukan."
      );

    }


    if (
      !element.type ||
      !String(element.type).trim()
    ) {

      throw new Error(
        "Type elemen wajib diisi."
      );

    }


    if (!data.elemen) {

      data.elemen = [];

    }


    data.elemen.push({

      id:
        element.id ||
        "EL-" + Date.now(),

      type:
        element.type,

      x:
        Number(element.x || 0),

      y:
        Number(element.y || 0),

      width:
        Number(element.width || 100),

      height:
        Number(element.height || 30),

      text:
        element.text || "",

      field:
        element.field || "",

      style:
        element.style || {}

    });


    data.updatedAt =
      new Date().toISOString();


    return data;

  },


  removeElement: function(
    data,
    id
  ) {

    if (!data.elemen) {

      return data;

    }


    data.elemen =
      data.elemen.filter(
        element =>
          element.id !== id
      );


    data.updatedAt =
      new Date().toISOString();


    return data;

  },


  setMargin: function(
    data,
    margin = {}
  ) {

    data.margin = {

      top:
        Number(
          margin.top ??
          data.margin?.top ??
          20
        ),

      right:
        Number(
          margin.right ??
          data.margin?.right ??
          20
        ),

      bottom:
        Number(
          margin.bottom ??
          data.margin?.bottom ??
          20
        ),

      left:
        Number(
          margin.left ??
          data.margin?.left ??
          20
        )

    };


    data.updatedAt =
      new Date().toISOString();


    return data;

  },


  setOrientation: function(
    data,
    orientation
  ) {

    if (
      orientation !==
        "portrait" &&
      orientation !==
        "landscape"
    ) {

      throw new Error(
        "Orientasi harus portrait atau landscape."
      );

    }


    data.orientation =
      orientation;


    data.updatedAt =
      new Date().toISOString();


    return data;

  },


  setPaper: function(
    data,
    paper
  ) {

    const allowed = [
      "A4",
      "A5",
      "A3",
      "LETTER",
      "LEGAL"
    ];


    if (
      !allowed.includes(
        String(paper).toUpperCase()
      )
    ) {

      throw new Error(
        "Ukuran kertas tidak didukung."
      );

    }


    data.paper =
      String(paper).toUpperCase();


    data.updatedAt =
      new Date().toISOString();


    return data;

  },


  async save(data) {

    if (!data) {

      throw new Error(
        "Template tidak ditemukan."
      );

    }


    data.updatedAt =
      new Date().toISOString();


    await PAG.Storage.put(
      "reports",
      {
        id:
          data.id,

        type:
          "pdf_template",

        data,

        updatedAt:
          data.updatedAt
      }
    );


    return data;

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
        "pdf_template"
    ) {

      return null;

    }


    return record.data || null;

  },


  async list() {

    const records =
      await PAG.Storage.all(
        "reports"
      );


    return records.filter(
      item =>
        item.type ===
        "pdf_template"
    );

  },


  async getForDocument(
    documentType
  ) {

    const templates =
      await this.list();


    const found =
      templates.find(
        item =>
          item.data
            ?.documentType ===
          documentType
      );


    if (found) {

      return found.data;

    }


    return this.getDefault(
      documentType
    );

  }

};
