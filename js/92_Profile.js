```javascript
/* =====================================================
   PAG DOCS FIELD
   PROFILE
   ===================================================== */

window.PAG = window.PAG || {};

PAG.Profile = {

  _documents: [],


  /* ===================================================
     RENDER
     =================================================== */

  async render(v) {

    if (!v) return;


    try {

      var u =
        PAG.Auth &&
        typeof PAG.Auth.get === "function"
          ? PAG.Auth.get() || {}
          : {};


      var master = {};


      try {

        if (
          PAG.WebUtamaSync &&
          typeof PAG.WebUtamaSync.getMaster ===
            "function"
        ) {

          master =
            await PAG.WebUtamaSync.getMaster() ||
            {};

        }

      } catch (error) {

        console.warn(
          "Profile Master:",
          error
        );

      }


      var paket =
        Array.isArray(master.paket)
          ? master.paket
          : [];


      var activePackage =
        paket[0] ||
        null;


      var online =
        navigator.onLine;


      var nama =
        u.name ||
        u.nama ||
        u.namaPersonil ||
        u.displayName ||
        "Personil";


      var role =
        u.role ||
        u.jabatan ||
        "Personil Lapangan";


      var userId =
        u.userId ||
        u.id ||
        "-";


      var email =
        u.email ||
        "-";


      /* =================================================
         HTML
         ================================================= */

      v.innerHTML = `

        <div class="profile-head">

          <div class="profile-avatar">
            ${PAG.Profile.initials(nama)}
          </div>

          <div class="profile-identity">

            <div class="profile-name">
              ${PAG.UI.escape(nama)}
            </div>

            <div class="profile-role">
              ${PAG.UI.escape(role)}
            </div>

            <div class="profile-status">

              <span class="profile-status-dot"></span>

              ${online ? "Online" : "Offline"}

            </div>

          </div>

        </div>


        <!-- =================================================
             DATA PERSONIL
             ================================================= -->

        <div class="profile-section">

          <div class="profile-section-title">

            <span>👤</span>

            Data Personil

          </div>


          <div class="profile-card">

            <div class="profile-row">

              <span>
                Nama
              </span>

              <b>
                ${PAG.UI.escape(nama)}
              </b>

            </div>


            <div class="profile-row">

              <span>
                ID Personil
              </span>

              <b>
                ${PAG.UI.escape(userId)}
              </b>

            </div>


            <div class="profile-row">

              <span>
                Jabatan
              </span>

              <b>
                ${PAG.UI.escape(role)}
              </b>

            </div>


            <div class="profile-row">

              <span>
                Email
              </span>

              <b>
                ${PAG.UI.escape(email)}
              </b>

            </div>

          </div>

        </div>


        <!-- =================================================
             PAKET
             ================================================= -->

        <div class="profile-section">

          <div class="profile-section-title">

            <span>📦</span>

            Paket Pekerjaan

          </div>


          <div class="profile-card">

            ${
              activePackage

                ? `

                  <div class="package-title">

                    ${PAG.UI.escape(
                      activePackage.nama ||
                      activePackage.namaPaket ||
                      activePackage.name ||
                      "Paket Pekerjaan"
                    )}

                  </div>

                  ${
                    activePackage.id
                      ? `
                        <div class="package-info">
                          ID:
                          ${PAG.UI.escape(
                            activePackage.id
                          )}
                        </div>
                      `
                      : ""
                  }

                  <div class="package-badge">
                    Paket Aktif
                  </div>

                `

                : `

                  <div class="empty-state">

                    <div class="empty-icon">
                      📦
                    </div>

                    <b>
                      Paket belum tersedia
                    </b>

                    <span>
                      Data paket belum tersinkron.
                    </span>

                  </div>

                `
            }

          </div>

        </div>


        <!-- =================================================
             CATATAN PEKERJAAN
             ================================================= -->

        <div class="profile-section">

          <div class="profile-section-title">

            <span>📁</span>

            Catatan Pekerjaan

          </div>


          <div class="profile-card documents-card">

            <div class="document-description">

              Seluruh laporan dan dokumen pekerjaan
              yang dibuat atau berkaitan dengan
              personil dan paket.

            </div>


            <div class="document-tabs">

              <button
                class="document-tab active"
                data-source="all"
                type="button"
              >
                Semua
              </button>

              <button
                class="document-tab"
                data-source="self"
                type="button"
              >
                Saya
              </button>

              <button
                class="document-tab"
                data-source="se"
                type="button"
              >
                SE
              </button>

              <button
                class="document-tab"
                data-source="admin"
                type="button"
              >
                Admin
              </button>

            </div>


            <div class="document-search">

              <input
                id="profileDocumentSearch"
                type="search"
                placeholder="Cari catatan atau dokumen..."
              >

            </div>


            <div id="profileDocuments">

              <div class="document-loading">
                Memuat catatan...
              </div>

            </div>

          </div>

        </div>


        <!-- =================================================
             SINKRONISASI
             ================================================= -->

        <div class="profile-section">

          <div class="profile-section-title">

            <span>🔄</span>

            Sinkronisasi

          </div>


          <div class="profile-card">

            <div class="sync-status-row">

              <div>

                <b>
                  Status koneksi
                </b>

                <small>
                  ${
                    online
                      ? "Terhubung ke internet"
                      : "Tidak ada koneksi internet"
                  }
                </small>

              </div>


              <span
                class="sync-indicator ${
                  online
                    ? "online"
                    : "offline"
                }"
              >
                ${
                  online
                    ? "Online"
                    : "Offline"
                }
              </span>

            </div>


            <button
              class="btn"
              id="profileSync"
              type="button"
            >
              🔄 Sinkronkan Sekarang
            </button>

          </div>

        </div>


        <!-- =================================================
             PENGATURAN
             ================================================= -->

        <div class="profile-section">

          <div class="profile-section-title">

            <span>⚙️</span>

            Pengaturan

          </div>


          <div class="profile-card">

            <button
              class="profile-menu"
              type="button"
              id="profileNotificationSetting"
            >

              <span>
                🔔
                <b>Notifikasi</b>
              </span>

              <span>
                ›
              </span>

            </button>


            <button
              class="profile-menu"
              type="button"
              id="profileStorageSetting"
            >

              <span>
                💾
                <b>Data Lokal</b>
              </span>

              <span>
                ›
              </span>

            </button>


            <button
              class="profile-menu"
              type="button"
              id="profileAbout"
            >

              <span>
                ℹ️
                <b>Tentang PAG Docs</b>
              </span>

              <span>
                ›
              </span>

            </button>

          </div>

        </div>


        <!-- =================================================
             LOGOUT
             ================================================= -->

        <div class="profile-section profile-logout-section">

          <button
            class="profile-logout"
            id="profileLogout"
            type="button"
          >
            Keluar dari PAG Docs
          </button>

        </div>

      `;


      /* =================================================
         LOAD
         ================================================= */

      await PAG.Profile.loadDocuments(
        document.getElementById(
          "profileDocuments"
        ),
        "all"
      );


      /* =================================================
         TABS
         ================================================= */

      document
        .querySelectorAll(
          ".document-tab"
        )
        .forEach(
          function (tab) {

            tab.addEventListener(
              "click",
              async function () {

                document
                  .querySelectorAll(
                    ".document-tab"
                  )
                  .forEach(
                    function (x) {

                      x.classList.remove(
                        "active"
                      );

                    }
                  );


                this.classList.add(
                  "active"
                );


                await PAG.Profile.loadDocuments(
                  document.getElementById(
                    "profileDocuments"
                  ),
                  this.dataset.source
                );

              }
            );

          }
        );


      /* =================================================
         SEARCH
         ================================================= */

      var search =
        document.getElementById(
          "profileDocumentSearch"
        );


      if (search) {

        search.addEventListener(
          "input",
          function () {

            PAG.Profile.filterDocuments(
              this.value
            );

          }
        );

      }


      /* =================================================
         SYNC
         ================================================= */

      var sync =
        document.getElementById(
          "profileSync"
        );


      if (sync) {

        sync.onclick =
          async function () {

            try {

              sync.disabled =
                true;

              sync.textContent =
                "⏳ Menyinkronkan...";


              if (
                PAG.WebUtamaSync &&
                typeof PAG.WebUtamaSync.pull ===
                  "function"
              ) {

                await PAG.WebUtamaSync.pull();

              }


              if (
                PAG.OfflineSync &&
                typeof PAG.OfflineSync.run ===
                  "function"
              ) {

                await PAG.OfflineSync.run();

              }


              await PAG.Profile.loadDocuments(
                document.getElementById(
                  "profileDocuments"
                ),
                "all"
              );


              PAG.UI.toast(
                "Sinkronisasi selesai"
              );


            } catch (error) {

              console.error(
                "Profile sync:",
                error
              );


              PAG.UI.toast(
                "Sinkronisasi gagal"
              );


            } finally {

              sync.disabled =
                false;

              sync.textContent =
                "🔄 Sinkronkan Sekarang";

            }

          };

      }


      /* =================================================
         LOGOUT
         ================================================= */

      document
        .getElementById(
          "profileLogout"
        )
        ?.addEventListener(
          "click",
          function () {

            if (
              confirm(
                "Apakah Anda yakin ingin keluar?"
              )
            ) {

              PAG.Auth.logout();

            }

          }
        );


      /* =================================================
         SETTINGS
         ================================================= */

      document
        .getElementById(
          "profileNotificationSetting"
        )
        ?.addEventListener(
          "click",
          function () {

            PAG.UI.toast(
              "Pengaturan notifikasi akan tersedia."
            );

          }
        );


      document
        .getElementById(
          "profileStorageSetting"
        )
        ?.addEventListener(
          "click",
          function () {

            PAG.UI.toast(
              "Data lokal PAG Docs tersimpan di perangkat."
            );

          }
        );


      document
        .getElementById(
          "profileAbout"
        )
        ?.addEventListener(
          "click",
          function () {

            PAG.UI.toast(
              "PAG Docs Field"
            );

          }
        );


    } catch (error) {

      console.error(
        "PROFILE ERROR:",
        error
      );


      v.innerHTML = `

        <div class="card">

          <h3>
            Profil gagal dimuat
          </h3>

          <p>
            ${PAG.UI.escape(
              error.message ||
              String(error)
            )}
          </p>

        </div>

      `;

    }

  },


  /* ===================================================
     INITIALS
     =================================================== */

  initials(name) {

    var text =
      String(
        name ||
        "P"
      );


    var parts =
      text
        .trim()
        .split(/\s+/)
        .slice(
          0,
          2
        );


    return parts
      .map(
        function (x) {

          return x
            .charAt(0);

        }
      )
      .join("")
      .toUpperCase();

  },


  /* ===================================================
     GET DOCUMENTS
     =================================================== */

  async getDocuments() {

    var result = [];


    /* =================================================
       1. LOCAL STORAGE LAPORAN
       ================================================= */

    try {

      var localReports =
        JSON.parse(
          localStorage.getItem(
            "PAG_FIELD_REPORTS"
          ) ||
          "[]"
        );


      if (
        Array.isArray(
          localReports
        )
      ) {

        localReports.forEach(
          function (report) {

            if (!report) return;


            result.push(
              PAG.Profile.normalizeDocument(
                {
                  id:
                    report.id,

                  type:
                    report.type ||
                    "laporan_harian",

                  title:
                    "Laporan Harian",

                  source:
                    "self",

                  createdBy:
                    report.dibuat ||
                    report.personil ||
                    "",

                  date:
                    report.createdAt,

                  packageId:
                    report.paket ||
                    "",

                  raw:
                    report,

                  data:
                    report

                }
              )
            );

          }
        );

      }

    } catch (error) {

      console.warn(
        "Profile local reports:",
        error
      );

    }


    /* =================================================
       2. PAG STORAGE
       ================================================= */

    try {

      if (
        PAG.Storage &&
        typeof PAG.Storage.getAll ===
          "function"
      ) {

        var stored =
          await PAG.Storage.getAll(
            "reports"
          );


        if (
          Array.isArray(
            stored
          )
        ) {

          stored.forEach(
            function (entry) {

              if (!entry) return;


              var data =
                entry.data ||
                entry;


              result.push(
                PAG.Profile.normalizeDocument(
                  {
                    id:
                      entry.id ||
                      data.id,

                    type:
                      entry.type ||
                      data.type ||
                      "laporan_harian",

                    title:
                      entry.title ||
                      data.title ||
                      "Laporan Harian",

                    source:
                      "self",

                    createdBy:
                      data.dibuat ||
                      data.personil ||
                      "",

                    date:
                      entry.createdAt ||
                      data.createdAt,

                    packageId:
                      data.paket ||
                      "",

                    raw:
                      data,

                    data:
                      data

                  }
                )
              );

            }
          );

        }

      }

    } catch (error) {

      console.warn(
        "Profile PAG Storage:",
        error
      );

    }


    /* =================================================
       3. MASTER BACKEND
       ================================================= */

    try {

      if (
        PAG.WebUtamaSync &&
        typeof PAG.WebUtamaSync.getMaster ===
          "function"
      ) {

        var master =
          await PAG.WebUtamaSync.getMaster() ||
          {};


        var collections = [

          master.documents,

          master.dokumen,

          master.catatan,

          master.laporan,

          master.laporanHarian,

          master.instruksi,

          master.memo,

          master.temuan,

          master.tindaklanjut,

          master.rfi,

          master.inspection

        ];


        collections.forEach(
          function (collection) {

            if (
              !Array.isArray(
                collection
              )
            ) {
              return;
            }


            collection.forEach(
              function (item) {

                if (!item) return;


                result.push(
                  PAG.Profile.normalizeDocument(
                    item
                  )
                );

              }
            );

          }
        );

      }

    } catch (error) {

      console.warn(
        "Profile Master Documents:",
        error
      );

    }


    /* =================================================
       DUPLICATE
       ================================================= */

    var unique =
      new Map();


    result.forEach(
      function (item) {

        if (
          item &&
          item.id
        ) {

          unique.set(
            String(item.id),
            item
          );

        }

      }
    );


    return Array
      .from(
        unique.values()
      )
      .sort(
        function (a, b) {

          return (
            new Date(
              b.date || 0
            ) -
            new Date(
              a.date || 0
            )
          );

        }
      );

  },


  /* ===================================================
     NORMALIZE
     =================================================== */

  normalizeDocument(item) {

    item =
      item ||
      {};


    var type =
      String(
        item.type ||
        item.jenis ||
        item.documentType ||
        item.kategori ||
        "Dokumen"
      );


    var sourceRaw =
      String(
        item.source ||
        item.sumber ||
        item.createdByRole ||
        ""
      )
        .toLowerCase();


    var source =
      "self";


    if (
      sourceRaw.includes(
        "admin"
      )
    ) {

      source =
        "admin";

    } else if (
      sourceRaw.includes("se") ||
      sourceRaw.includes("supervisor") ||
      sourceRaw.includes("engineer")
    ) {

      source =
        "se";

    }


    return {

      id:
        item.id ||
        item.documentId ||
        (
          "DOC-" +
          Date.now() +
          "-" +
          Math.random()
        ),

      type:
        type,

      title:
        item.title ||
        item.judul ||
        item.nama ||
        PAG.Profile.documentTitle(
          type
        ),

      source:
        source,

      createdBy:
        item.createdByName ||
        item.namaPembuat ||
        item.createdBy ||
        item.author ||
        "",

      date:
        item.createdAt ||
        item.tanggal ||
        item.date ||
        item.updatedAt ||
        "",

      packageId:
        item.packageId ||
        item.paketId ||
        "",

      raw:
        item.raw ||
        item.data ||
        item

    };

  },


  /* ===================================================
     TITLE
     =================================================== */

  documentTitle(type) {

    var t =
      String(
        type ||
        ""
      )
        .toLowerCase();


    if (
      t.includes(
        "laporan"
      )
    ) {

      return "Laporan Harian";

    }


    if (
      t.includes(
        "instruksi"
      )
    ) {

      return "Instruksi Lapangan";

    }


    if (
      t.includes(
        "memo"
      )
    ) {

      return "Memo";

    }


    if (
      t.includes(
        "temuan"
      )
    ) {

      return "Temuan";

    }


    if (
      t.includes(
        "tindak"
      )
    ) {

      return "Tindak Lanjut";

    }


    if (
      t.includes(
        "rfi"
      )
    ) {

      return "RFI";

    }


    if (
      t.includes(
        "inspection"
      )
    ) {

      return "Inspection";

    }


    return "Dokumen Pekerjaan";

  },


  /* ===================================================
     LOAD
     =================================================== */

  async loadDocuments(
    container,
    source
  ) {

    if (!container) return;


    source =
      source ||
      "all";


    container.innerHTML = `

      <div class="document-loading">
        Memuat catatan...
      </div>

    `;


    var documents =
      await PAG.Profile.getDocuments();


    var filtered =
      documents;


    if (
      source !== "all"
    ) {

      filtered =
        documents.filter(
          function (x) {

            return (
              x.source ===
              source
            );

          }
        );

    }


    PAG.Profile._documents =
      filtered;


    PAG.Profile.renderDocuments(
      container,
      filtered
    );

  },


  /* ===================================================
     RENDER
     =================================================== */

  renderDocuments(
    container,
    documents
  ) {

    if (
      !documents.length
    ) {

      container.innerHTML = `

        <div class="empty-state">

          <div class="empty-icon">
            📂
          </div>

          <b>
            Belum ada catatan
          </b>

          <span>
            Laporan dan dokumen pekerjaan
            akan muncul di sini.
          </span>

        </div>

      `;

      return;

    }


    container.innerHTML =
      documents
        .map(
          function (doc) {

            return `

              <button
                type="button"
                class="document-item"
                data-document-id="${PAG.UI.escape(
                  doc.id
                )}"
                data-search="${PAG.UI.escape(
                  (
                    doc.title +
                    " " +
                    doc.type +
                    " " +
                    doc.createdBy
                  )
                    .toLowerCase()
                )}"
              >

                <div class="document-icon">

                  ${PAG.Profile.documentIcon(
                    doc.type
                  )}

                </div>


                <div class="document-content">

                  <b>
                    ${PAG.UI.escape(
                      doc.title
                    )}
                  </b>


                  <small>

                    ${PAG.UI.escape(
                      doc.type
                    )}

                    ${
                      doc.createdBy
                        ? " • " +
                          PAG.UI.escape(
                            doc.createdBy
                          )
                        : ""
                    }

                  </small>


                  ${
                    doc.date
                      ? `

                        <small
                          class="document-date"
                        >

                          ${PAG.Profile.formatDate(
                            doc.date
                          )}

                        </small>

                      `
                      : ""
                  }

                </div>


                <span
                  class="
                    document-source
                    ${doc.source}
                  "
                >

                  ${PAG.Profile.sourceLabel(
                    doc.source
                  )}

                </span>


                <span>
                  ›
                </span>

              </button>

            `;

          }
        )
        .join("");


    /* =================================================
       CLICK DOCUMENT
       ================================================= */

    container
      .querySelectorAll(
        ".document-item"
      )
      .forEach(
        function (button) {

          button.addEventListener(
            "click",
            function () {

              PAG.Profile.openDocument(
                this.dataset.documentId
              );

            }
          );

        }
      );

  },


  /* ===================================================
     OPEN DOCUMENT
     =================================================== */

  openDocument(id) {

    var doc =
      PAG.Profile._documents.find(
        function (item) {

          return String(
            item.id
          ) === String(id);

        }
      );


    if (!doc) {

      PAG.UI.toast(
        "Dokumen tidak ditemukan."
      );

      return;

    }


    var data =
      doc.raw ||
      {};


    var items =
      Array.isArray(
        data.items
      )
        ? data.items
        : [];


    var html = `

      <div class="card">

        <div class="profile-section-title">
          📋 Laporan Harian
        </div>


        <div class="profile-row">
          <span>
            Paket
          </span>

          <b>
            ${PAG.UI.escape(
              data.paket ||
              "-"
            )}
          </b>
        </div>


        <div class="profile-row">
          <span>
            Konsultan
          </span>

          <b>
            ${PAG.UI.escape(
              data.konsultan ||
              "-"
            )}
          </b>
        </div>


        <div class="profile-row">
          <span>
            Kontraktor
          </span>

          <b>
            ${PAG.UI.escape(
              data.kontraktor ||
              "-"
            )}
          </b>
        </div>


        <div class="profile-row">
          <span>
            Dibuat oleh
          </span>

          <b>
            ${PAG.UI.escape(
              data.dibuat ||
              "-"
            )}
          </b>
        </div>


        <hr>


        ${
          items
            .map(
              function (item, index) {

                return `

                  <div class="profile-card">

                    <b>
                      Kegiatan ${index + 1}
                    </b>


                    <div class="profile-row">
                      <span>
                        Tanggal
                      </span>

                      <b>
                        ${PAG.UI.escape(
                          item.tanggal ||
                          "-"
                        )}
                      </b>
                    </div>


                    <div class="profile-row">
                      <span>
                        Divisi
                      </span>

                      <b>
                        ${PAG.UI.escape(
                          item.divisi ||
                          "-"
                        )}
                      </b>
                    </div>


                    <div class="profile-row">
                      <span>
                        STA
                      </span>

                      <b>
                        ${PAG.UI.escape(
                          item.sta ||
                          "-"
                        )}
                      </b>
                    </div>


                    <div class="profile-row">
                      <span>
                        Cuaca
                      </span>

                      <b>
                        ${PAG.UI.escape(
                          item.cuaca ||
                          "-"
                        )}
                      </b>
                    </div>


                    <div class="profile-row">
                      <span>
                        Uraian
                      </span>

                      <b>
                        ${PAG.UI.escape(
                          item.uraian ||
                          "-"
                        )}
                      </b>
                    </div>


                    ${
                      item.dokumentasiDataUrl
                        ? `

                          <img
                            src="${item.dokumentasiDataUrl}"
                            style="
                              width:100%;
                              margin-top:12px;
                              border-radius:12px;
                            "
                            alt="Dokumentasi"
                          >

                        `
                        : ""
                    }

                  </div>

                `;

              }
            )
            .join("")
        }


        <button
          type="button"
          class="btn"
          id="profileBackDocuments"
        >
          ← Kembali
        </button>

      </div>

    `;


    var view =
      document.getElementById(
        "view"
      );


    if (!view) return;


    view.innerHTML =
      html;


    document
      .getElementById(
        "profileBackDocuments"
      )
      ?.addEventListener(
        "click",
        function () {

          PAG.Router.go(
            "profile"
          );

        }
      );

  },


  /* ===================================================
     FILTER
     =================================================== */

  filterDocuments(
    keyword
  ) {

    var value =
      String(
        keyword ||
        ""
      )
        .trim()
        .toLowerCase();


    document
      .querySelectorAll(
        "#profileDocuments .document-item"
      )
      .forEach(
        function (item) {

          var text =
            item.dataset.search ||
            "";


          item.style.display =
            !value ||
            text.includes(value)
              ? ""
              : "none";

        }
      );

  },


  /* ===================================================
     ICON
     =================================================== */

  documentIcon(type) {

    var t =
      String(
        type ||
        ""
      )
        .toLowerCase();


    if (
      t.includes(
        "laporan"
      )
    ) {

      return "📋";

    }


    if (
      t.includes(
        "foto"
      )
    ) {

      return "📷";

    }


    if (
      t.includes(
        "instruksi"
      )
    ) {

      return "📢";

    }


    if (
      t.includes(
        "memo"
      )
    ) {

      return "📝";

    }


    if (
      t.includes(
        "temuan"
      )
    ) {

      return "⚠️";

    }


    if (
      t.includes(
        "rfi"
      )
    ) {

      return "❓";

    }


    if (
      t.includes(
        "inspection"
      )
    ) {

      return "🔎";

    }


    return "📄";

  },


  /* ===================================================
     SOURCE
     =================================================== */

  sourceLabel(source) {

    switch (
      source
    ) {

      case "se":
        return "SE";

      case "admin":
        return "ADMIN";

      default:
        return "SAYA";

    }

  },


  /* ===================================================
     DATE
     =================================================== */

  formatDate(value) {

    try {

      return new Intl.DateTimeFormat(
        "id-ID",
        {
          day:
            "2-digit",

          month:
            "short",

          year:
            "numeric",

          hour:
            "2-digit",

          minute:
            "2-digit"
        }
      ).format(
        new Date(value)
      );

    } catch (error) {

      return String(
        value ||
        ""
      );

    }

  }

};


console.log(
  "PAG Profile loaded:",
  !!PAG.Profile
);
```
