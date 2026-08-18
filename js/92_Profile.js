/* =====================================================
   PAG DOCS FIELD
   Profile.js
   PROFILE
   ===================================================== */

window.PAG = window.PAG || {};

PAG.Profile = {

  /* =====================================================
     RENDER PROFILE
     ===================================================== */

  async render(v) {

    if (!v) {
      console.error("PAG.Profile: view tidak ditemukan.");
      return;
    }

    try {

      /* =================================================
         USER
         ================================================= */

      const u =
        PAG.Auth && typeof PAG.Auth.get === "function"
          ? (PAG.Auth.get() || {})
          : {};


      /* =================================================
         MASTER
         ================================================= */

      let master = {};

      try {

        if (
          PAG.WebUtamaSync &&
          typeof PAG.WebUtamaSync.getMaster === "function"
        ) {

          master =
            await PAG.WebUtamaSync.getMaster() || {};

        }

      } catch (error) {

        console.warn(
          "Profile master tidak tersedia:",
          error
        );

      }


      /* =================================================
         PACKAGE
         ================================================= */

      const paket =
        Array.isArray(master.paket)
          ? master.paket
          : [];

      const activePackage =
        paket.length
          ? paket[0]
          : null;


      /* =================================================
         ONLINE
         ================================================= */

      const online =
        navigator.onLine;


      /* =================================================
         USER DATA
         ================================================= */

      const name =
        u.name ||
        u.nama ||
        u.displayName ||
        "Personil";


      const userId =
        u.userId ||
        u.id ||
        u.uid ||
        "-";


      const role =
        u.jabatan ||
        u.role ||
        "Personil Lapangan";


      const email =
        u.email ||
        "-";


      /* =================================================
         PACKAGE DATA
         ================================================= */

      let packageName = "-";

      let packageId = "";

      if (activePackage) {

        packageName =
          activePackage.nama ||
          activePackage.namaPaket ||
          activePackage.name ||
          activePackage.paket ||
          "-";

        packageId =
          activePackage.id ||
          activePackage.packageId ||
          activePackage.paketId ||
          "";

      }


      /* =================================================
         RENDER
         ================================================= */

      v.innerHTML = `

        <div class="profile-page">


          <!-- ===========================================
               PROFILE HEADER
               =========================================== -->

          <section class="profile-header-card">

            <div class="profile-avatar">
              ${PAG.Profile.initials(name)}
            </div>


            <div class="profile-header-info">

              <h2 class="profile-name">
                ${PAG.Profile.escape(name)}
              </h2>

              <div class="profile-role">
                ${PAG.Profile.escape(role)}
              </div>

              <div class="profile-online">

                <span
                  class="
                    profile-status-dot
                    ${online ? "online" : "offline"}
                  "
                ></span>

                ${
                  online
                    ? "Online"
                    : "Offline"
                }

              </div>

            </div>

          </section>


          <!-- ===========================================
               DATA PERSONIL
               =========================================== -->

          <section class="profile-section">

            <div class="profile-section-title">

              <span>👤</span>

              <span>
                Data Personil
              </span>

            </div>


            <div class="profile-card profile-data-card">

              <div class="profile-data-row">

                <span>
                  Nama
                </span>

                <strong>
                  ${PAG.Profile.escape(name)}
                </strong>

              </div>


              <div class="profile-data-row">

                <span>
                  ID Personil
                </span>

                <strong>
                  ${PAG.Profile.escape(userId)}
                </strong>

              </div>


              <div class="profile-data-row">

                <span>
                  Jabatan
                </span>

                <strong>
                  ${PAG.Profile.escape(role)}
                </strong>

              </div>


              <div class="profile-data-row">

                <span>
                  Email
                </span>

                <strong>
                  ${PAG.Profile.escape(email)}
                </strong>

              </div>

            </div>

          </section>


          <!-- ===========================================
               PAKET PEKERJAAN
               =========================================== -->

          <section class="profile-section">

            <div class="profile-section-title">

              <span>📦</span>

              <span>
                Paket Pekerjaan
              </span>

            </div>


            <div class="profile-card">

              ${
                activePackage

                  ? `

                    <div class="profile-package">

                      <div class="profile-package-icon">
                        📦
                      </div>


                      <div class="profile-package-content">

                        <strong>
                          ${PAG.Profile.escape(
                            packageName
                          )}
                        </strong>


                        ${
                          packageId
                            ? `
                              <small>
                                ID:
                                ${PAG.Profile.escape(
                                  packageId
                                )}
                              </small>
                            `
                            : ""
                        }


                        <span class="profile-package-badge">
                          Paket Aktif
                        </span>

                      </div>

                    </div>

                  `

                  : `

                    <div class="profile-empty">

                      <div class="profile-empty-icon">
                        📦
                      </div>

                      <strong>
                        Paket belum tersedia
                      </strong>

                      <small>
                        Data paket belum tersinkron.
                      </small>

                    </div>

                  `
              }

            </div>

          </section>


          <!-- ===========================================
               CATATAN PEKERJAAN
               =========================================== -->

          <section class="profile-section">

            <div class="profile-section-title">

              <span>📁</span>

              <span>
                Catatan Pekerjaan
              </span>

            </div>


            <div class="profile-card profile-documents-card">


              <div class="profile-documents-description">

                Seluruh catatan dan dokumen pekerjaan
                yang berkaitan dengan personil dan paket.

              </div>


              <!-- TABS -->

              <div class="profile-document-tabs">

                <button
                  type="button"
                  class="profile-document-tab active"
                  data-source="all"
                >
                  Semua
                </button>


                <button
                  type="button"
                  class="profile-document-tab"
                  data-source="self"
                >
                  Saya
                </button>


                <button
                  type="button"
                  class="profile-document-tab"
                  data-source="se"
                >
                  SE
                </button>


                <button
                  type="button"
                  class="profile-document-tab"
                  data-source="admin"
                >
                  Admin
                </button>

              </div>


              <!-- SEARCH -->

              <div class="profile-document-search">

                <input
                  id="profileDocumentSearch"
                  type="search"
                  placeholder="Cari catatan atau dokumen..."
                  autocomplete="off"
                >

              </div>


              <!-- DOCUMENT LIST -->

              <div id="profileDocuments">

                <div class="profile-document-loading">
                  Memuat catatan...
                </div>

              </div>


            </div>

          </section>


          <!-- ===========================================
               SINKRONISASI
               =========================================== -->

          <section class="profile-section">

            <div class="profile-section-title">

              <span>🔄</span>

              <span>
                Sinkronisasi
              </span>

            </div>


            <div class="profile-card">

              <div class="profile-sync-row">

                <div>

                  <strong>
                    Status koneksi
                  </strong>

                  <small>

                    ${
                      online
                        ? "Terhubung ke internet"
                        : "Tidak ada koneksi internet"
                    }

                  </small>

                </div>


                <span
                  class="
                    profile-sync-badge
                    ${online ? "online" : "offline"}
                  "
                >

                  ${
                    online
                      ? "Online"
                      : "Offline"
                  }

                </span>

              </div>


              <button
                type="button"
                class="btn"
                id="profileSync"
              >
                🔄 Sinkronkan Sekarang
              </button>

            </div>

          </section>


          <!-- ===========================================
               PENGATURAN
               =========================================== -->

          <section class="profile-section">

            <div class="profile-section-title">

              <span>⚙️</span>

              <span>
                Pengaturan
              </span>

            </div>


            <div class="profile-card profile-settings-card">


              <button
                type="button"
                class="profile-setting-row"
                id="profileNotificationSetting"
              >

                <span>

                  <span class="profile-setting-icon">
                    🔔
                  </span>

                  <strong>
                    Notifikasi
                  </strong>

                </span>

                <span>
                  ›
                </span>

              </button>


              <button
                type="button"
                class="profile-setting-row"
                id="profileStorageSetting"
              >

                <span>

                  <span class="profile-setting-icon">
                    💾
                  </span>

                  <strong>
                    Data Lokal
                  </strong>

                </span>

                <span>
                  ›
                </span>

              </button>


              <button
                type="button"
                class="profile-setting-row"
                id="profileAbout"
              >

                <span>

                  <span class="profile-setting-icon">
                    ℹ️
                  </span>

                  <strong>
                    Tentang PAG Docs
                  </strong>

                </span>

                <span>
                  ›
                </span>

              </button>


            </div>

          </section>


          <!-- ===========================================
               LOGOUT
               =========================================== -->

          <section class="profile-section">

            <button
              type="button"
              class="profile-logout"
              id="profileLogout"
            >
              Keluar dari PAG Docs
            </button>

          </section>


        </div>

      `;


      /* =================================================
         LOAD DOCUMENTS
         ================================================= */

      const documentContainer =
        document.getElementById(
          "profileDocuments"
        );


      await PAG.Profile.loadDocuments(
        documentContainer,
        "all"
      );


      /* =================================================
         TABS
         ================================================= */

      document
        .querySelectorAll(
          ".profile-document-tab"
        )
        .forEach(tab => {

          tab.addEventListener(
            "click",
            async function () {

              document
                .querySelectorAll(
                  ".profile-document-tab"
                )
                .forEach(x => {

                  x.classList.remove(
                    "active"
                  );

                });


              this.classList.add(
                "active"
              );


              await PAG.Profile.loadDocuments(
                documentContainer,
                this.dataset.source
              );


              const search =
                document.getElementById(
                  "profileDocumentSearch"
                );


              if (search) {

                search.value = "";

              }

            }
          );

        });


      /* =================================================
         SEARCH
         ================================================= */

      const search =
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

      const sync =
        document.getElementById(
          "profileSync"
        );


      if (sync) {

        sync.addEventListener(
          "click",
          async function () {

            try {

              sync.disabled = true;

              sync.textContent =
                "⏳ Menyinkronkan...";


              if (
                PAG.WebUtamaSync &&
                typeof PAG.WebUtamaSync.pull === "function"
              ) {

                await PAG.WebUtamaSync.pull();

              }


              if (
                PAG.OfflineSync &&
                typeof PAG.OfflineSync.run === "function"
              ) {

                await PAG.OfflineSync.run();

              }


              PAG.Profile.toast(
                "Sinkronisasi selesai"
              );


              await PAG.Profile.loadDocuments(
                documentContainer,
                "all"
              );


            } catch (error) {

              console.error(
                "Profile sync:",
                error
              );


              PAG.Profile.toast(
                "Sinkronisasi gagal"
              );


            } finally {

              sync.disabled = false;

              sync.textContent =
                "🔄 Sinkronkan Sekarang";

            }

          }
        );

      }


      /* =================================================
         LOGOUT
         ================================================= */

      const logout =
        document.getElementById(
          "profileLogout"
        );


      if (logout) {

        logout.addEventListener(
          "click",
          function () {

            if (
              confirm(
                "Apakah Anda yakin ingin keluar?"
              )
            ) {

              if (
                PAG.Auth &&
                typeof PAG.Auth.logout === "function"
              ) {

                PAG.Auth.logout();

              }

            }

          }
        );

      }


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

            PAG.Profile.toast(
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

            PAG.Profile.toast(
              "Pengaturan data lokal akan tersedia."
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

            PAG.Profile.toast(
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
            ${PAG.Profile.escape(
              error.message ||
              String(error)
            )}
          </p>

        </div>

      `;

    }

  },


  /* =====================================================
     INITIALS
     ===================================================== */

  initials(name) {

    const text =
      String(name || "P");


    const parts =
      text
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2);


    if (!parts.length) {
      return "P";
    }


    return parts
      .map(
        x =>
          x
            .charAt(0)
            .toUpperCase()
      )
      .join("");

  },


  /* =====================================================
     GET DOCUMENTS
     ===================================================== */

  async getDocuments() {

    const result = [];


    /* =================================================
       1. LOCAL STORAGE
       ================================================= */

    try {

      if (
        PAG.Storage &&
        typeof PAG.Storage.getAll === "function"
      ) {

        const stored =
          await PAG.Storage.getAll(
            "reports"
          );


        if (Array.isArray(stored)) {

          stored.forEach(
            item => {

              if (!item) return;


              const data =
                item.data ||
                item.reportData ||
                item;


              if (
                data &&
                (
                  data.type === "laporan_harian" ||
                  item.type === "laporan_harian"
                )
              ) {

                result.push(
                  PAG.Profile.normalizeDocument(
                    data
                  )
                );

              }

            }
          );

        }

      }

    } catch (error) {

      console.warn(
        "Profile reports storage:",
        error
      );

    }


    /* =================================================
       2. ALTERNATIVE STORAGE METHOD
       ================================================= */

    try {

      if (
        PAG.Storage &&
        typeof PAG.Storage.list === "function"
      ) {

        const stored =
          await PAG.Storage.list(
            "reports"
          );


        if (Array.isArray(stored)) {

          stored.forEach(
            item => {

              if (!item) return;


              const data =
                item.data ||
                item;


              if (
                data &&
                (
                  data.type === "laporan_harian" ||
                  item.type === "laporan_harian"
                )
              ) {

                result.push(
                  PAG.Profile.normalizeDocument(
                    data
                  )
                );

              }

            }
          );

        }

      }

    } catch (error) {

      console.warn(
        "Profile reports list:",
        error
      );

    }


    /* =================================================
       3. MASTER
       ================================================= */

    try {

      if (
        PAG.WebUtamaSync &&
        typeof PAG.WebUtamaSync.getMaster === "function"
      ) {

        const master =
          await PAG.WebUtamaSync.getMaster() || {};


        const collections = [

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
          collection => {

            if (
              !Array.isArray(collection)
            ) {

              return;

            }


            collection.forEach(
              item => {

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
        "Profile master documents:",
        error
      );

    }


    /* =================================================
       4. DEDUPLICATE
       ================================================= */

    const unique =
      new Map();


    result.forEach(
      item => {

        if (!item) return;


        const id =
          item.id ||
          (
            item.type +
            "_" +
            item.date +
            "_" +
            item.title
          );


        if (!unique.has(id)) {

          unique.set(
            id,
            item
          );

        }

      }
    );


    /* =================================================
       5. SORT
       ================================================= */

    return Array
      .from(unique.values())
      .sort(
        (a, b) => {

          const da =
            new Date(
              a.date || 0
            ).getTime();


          const db =
            new Date(
              b.date || 0
            ).getTime();


          return db - da;

        }
      );

  },


  /* =====================================================
     NORMALIZE DOCUMENT
     ===================================================== */

  normalizeDocument(item) {

    item =
      item || {};


    const type =
      String(
        item.type ||
        item.jenis ||
        item.documentType ||
        item.kategori ||
        "Dokumen"
      );


    /* =================================================
       SOURCE
       ================================================= */

    const sourceRaw =
      String(
        item.source ||
        item.sumber ||
        item.createdByRole ||
        item.dibuatOlehRole ||
        ""
      )
      .toLowerCase();


    let source =
      "self";


    if (
      sourceRaw.includes("admin")
    ) {

      source =
        "admin";

    } else if (
      sourceRaw.includes("se") ||
      sourceRaw.includes("supervisor") ||
      sourceRaw.includes("engineer") ||
      sourceRaw.includes("tl")
    ) {

      source =
        "se";

    }


    /* =================================================
       TITLE
       ================================================= */

    let title =
      item.title ||
      item.judul ||
      item.nama ||
      "";


    if (!title) {

      title =
        PAG.Profile.documentTitle(
          type
        );

    }


    /* =================================================
       CREATED BY
       ================================================= */

    const createdBy =
      item.createdByName ||
      item.namaPembuat ||
      item.createdBy ||
      item.author ||
      item.dibuat ||
      "";


    /* =================================================
       DATE
       ================================================= */

    const date =
      item.createdAt ||
      item.tanggal ||
      item.date ||
      item.updatedAt ||
      "";


    /* =================================================
       PACKAGE
       ================================================= */

    const packageId =
      item.packageId ||
      item.paketId ||
      "";


    /* =================================================
       REPORT DATA
       ================================================= */

    return {

      id:
        item.id ||
        item.documentId ||
        (
          "DOC-" +
          Date.now() +
          "-" +
          Math.random()
            .toString(36)
            .slice(2)
        ),


      type:


        type,


      title:


        title,


      source:


        source,


      createdBy:


        createdBy,


      date:


        date,


      packageId:


        packageId,


      raw:


        item

    };

  },


  /* =====================================================
     DOCUMENT TITLE
     ===================================================== */

  documentTitle(type) {

    const t =
      String(type || "")
        .toLowerCase();


    if (
      t.includes("laporan")
    ) {

      return "Laporan Harian";

    }


    if (
      t.includes("instruksi")
    ) {

      return "Instruksi Lapangan";

    }


    if (
      t.includes("memo")
    ) {

      return "Memo";

    }


    if (
      t.includes("temuan")
    ) {

      return "Temuan";

    }


    if (
      t.includes("tindak")
    ) {

      return "Tindak Lanjut";

    }


    if (
      t.includes("rfi")
    ) {

      return "RFI";

    }


    if (
      t.includes("inspection")
    ) {

      return "Inspection";

    }


    return "Dokumen Pekerjaan";

  },


  /* =====================================================
     LOAD DOCUMENTS
     ===================================================== */

  async loadDocuments(
    container,
    source = "all"
  ) {

    if (!container) {
      return;
    }


    container.innerHTML = `

      <div class="profile-document-loading">

        Memuat catatan...

      </div>

    `;


    try {

      const documents =
        await PAG.Profile.getDocuments();


      let filtered =
        documents;


      if (
        source !== "all"
      ) {

        filtered =
          documents.filter(
            doc =>
              doc.source === source
          );

      }


      PAG.Profile._documents =
        filtered;


      PAG.Profile.renderDocuments(
        container,
        filtered
      );


    } catch (error) {

      console.error(
        "Profile load documents:",
        error
      );


      container.innerHTML = `

        <div class="profile-empty">

          <div class="profile-empty-icon">
            📂
          </div>

          <strong>
            Gagal memuat catatan
          </strong>

          <small>
            ${PAG.Profile.escape(
              error.message ||
              String(error)
            )}
          </small>

        </div>

      `;

    }

  },


  /* =====================================================
     RENDER DOCUMENTS
     ===================================================== */

  renderDocuments(
    container,
    documents
  ) {

    if (
      !Array.isArray(documents) ||
      !documents.length
    ) {

      container.innerHTML = `

        <div class="profile-empty">

          <div class="profile-empty-icon">
            📂
          </div>

          <strong>
            Belum ada catatan
          </strong>

          <small>
            Laporan dan dokumen pekerjaan
            yang tersimpan akan muncul di sini.
          </small>

        </div>

      `;


      return;

    }


    container.innerHTML =
      documents
        .map(
          (doc, index) => {

            const searchText =
              (
                doc.title +
                " " +
                doc.type +
                " " +
                doc.createdBy
              )
              .toLowerCase();


            return `

              <button
                type="button"
                class="profile-document-item"
                data-index="${index}"
                data-search="${PAG.Profile.escape(
                  searchText
                )}"
              >


                <div class="profile-document-icon">

                  ${PAG.Profile.documentIcon(
                    doc.type
                  )}

                </div>


                <div class="profile-document-content">

                  <strong>

                    ${PAG.Profile.escape(
                      doc.title
                    )}

                  </strong>


                  <small>

                    ${PAG.Profile.escape(
                      PAG.Profile.typeLabel(
                        doc.type
                      )
                    )}

                    ${
                      doc.createdBy
                        ? `
                          •
                          ${PAG.Profile.escape(
                            doc.createdBy
                          )}
                        `
                        : ""
                    }

                  </small>


                  ${
                    doc.date
                      ? `
                        <small
                          class="profile-document-date"
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
                    profile-document-source
                    ${doc.source}
                  "
                >

                  ${PAG.Profile.sourceLabel(
                    doc.source
                  )}

                </span>


                <span class="profile-document-arrow">
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
        ".profile-document-item"
      )
      .forEach(
        item => {

          item.addEventListener(
            "click",
            function () {

              const index =
                Number(
                  this.dataset.index
                );


              const doc =
                PAG.Profile._documents &&
                PAG.Profile._documents[index];


              if (!doc) {
                return;
              }


              PAG.Profile.openDocument(
                doc
              );

            }
          );

        }
      );

  },


  /* =====================================================
     OPEN DOCUMENT
     ===================================================== */

  openDocument(doc) {

    if (!doc) {
      return;
    }


    /* ================================================
       LAPORAN HARIAN
       ================================================ */

    if (
      String(doc.type)
        .toLowerCase()
        .includes("laporan")
    ) {

      PAG.Profile.showReport(
        doc.raw || doc
      );


      return;

    }


    /* ================================================
       OTHER DOCUMENT
       ================================================ */

    PAG.Profile.toast(
      doc.title ||
      "Dokumen pekerjaan"
    );

  },


  /* =====================================================
     SHOW REPORT
     ===================================================== */

  showReport(report) {

    report =
      report || {};


    const items =
      Array.isArray(report.items)
        ? report.items
        : [];


    let html = `

      <div class="profile-report-view">


        <div class="profile-report-header">

          <div>

            <small>
              PAG DOCS FIELD
            </small>

            <h3>
              Laporan Harian
            </h3>

          </div>


          <button
            type="button"
            class="profile-report-close"
            id="profileReportClose"
          >
            ✕
          </button>

        </div>


        <div class="profile-report-info">

          ${
            report.paket
              ? `
                <div>
                  <span>Paket</span>
                  <strong>
                    ${PAG.Profile.escape(
                      report.paket
                    )}
                  </strong>
                </div>
              `
              : ""
          }


          ${
            report.konsultan
              ? `
                <div>
                  <span>Konsultan</span>
                  <strong>
                    ${PAG.Profile.escape(
                      report.konsultan
                    )}
                  </strong>
                </div>
              `
              : ""
          }


          ${
            report.kontraktor
              ? `
                <div>
                  <span>Kontraktor</span>
                  <strong>
                    ${PAG.Profile.escape(
                      report.kontraktor
                    )}
                  </strong>
                </div>
              `
              : ""
          }


          ${
            report.noKontrak
              ? `
                <div>
                  <span>No. Kontrak</span>
                  <strong>
                    ${PAG.Profile.escape(
                      report.noKontrak
                    )}
                  </strong>
                </div>
              `
              : ""
          }

        </div>


        <div class="profile-report-items">

    `;


    if (!items.length) {

      html += `

        <div class="profile-empty">

          <div class="profile-empty-icon">
            📋
          </div>

          <strong>
            Tidak ada kegiatan
          </strong>

        </div>

      `;

    } else {

      items.forEach(
        (item, index) => {

          html += `

            <div class="profile-report-item">

              <div class="profile-report-item-header">

                <strong>
                  Kegiatan ${index + 1}
                </strong>

                ${
                  item.tanggal
                    ? `
                      <span>
                        ${PAG.Profile.escape(
                          item.tanggal
                        )}
                      </span>
                    `
                    : ""
                }

              </div>


              ${
                item.devisi
                  ? `
                    <div class="profile-report-field">

                      <span>Divisi</span>

                      <strong>
                        ${PAG.Profile.escape(
                          item.devisi
                        )}
                      </strong>

                    </div>
                  `
                  : ""
              }


              ${
                item.sta
                  ? `
                    <div class="profile-report-field">

                      <span>STA</span>

                      <strong>
                        ${PAG.Profile.escape(
                          item.sta
                        )}
                      </strong>

                    </div>
                  `
                  : ""
              }


              ${
                item.cuaca
                  ? `
                    <div class="profile-report-field">

                      <span>Cuaca</span>

                      <strong>
                        ${PAG.Profile.escape(
                          item.cuaca
                        )}
                      </strong>

                    </div>
                  `
                  : ""
              }


              ${
                item.uraian
                  ? `
                    <div class="profile-report-text">

                      <span>
                        Uraian Pekerjaan
                      </span>

                      <p>
                        ${PAG.Profile.escape(
                          item.uraian
                        )}
                      </p>

                    </div>
                  `
                  : ""
              }


              ${
                item.tenaga
                  ? `
                    <div class="profile-report-text">

                      <span>
                        Tenaga Kerja
                      </span>

                      <p>
                        ${PAG.Profile.escape(
                          item.tenaga
                        )}
                      </p>

                    </div>
                  `
                  : ""
              }


              ${
                item.peralatan
                  ? `
                    <div class="profile-report-text">

                      <span>
                        Peralatan
                      </span>

                      <p>
                        ${PAG.Profile.escape(
                          item.peralatan
                        )}
                      </p>

                    </div>
                  `
                  : ""
              }


              ${
                item.material
                  ? `
                    <div class="profile-report-text">

                      <span>
                        Material
                      </span>

                      <p>
                        ${PAG.Profile.escape(
                          item.material
                        )}
                      </p>

                    </div>
                  `
                  : ""
              }


              ${
                item.kendala
                  ? `
                    <div class="profile-report-text">

                      <span>
                        Kendala
                      </span>

                      <p>
                        ${PAG.Profile.escape(
                          item.kendala
                        )}
                      </p>

                    </div>
                  `
                  : ""
              }


              ${
                item.dokumentasi
                  ? `
                    <div class="profile-report-field">

                      <span>
                        Dokumentasi
                      </span>

                      <strong>
                        📷
                        ${PAG.Profile.escape(
                          item.dokumentasi
                        )}
                      </strong>

                    </div>
                  `
                  : ""
              }

            </div>

          `;

        }
      );

    }


    html += `

        </div>


        <div class="profile-report-signature">

          ${
            report.dibuat
              ? `
                <div>
                  <span>Dibuat oleh</span>
                  <strong>
                    ${PAG.Profile.escape(
                      report.dibuat
                    )}
                  </strong>
                </div>
              `
              : ""
          }


          ${
            report.diketahui
              ? `
                <div>
                  <span>Diketahui oleh</span>
                  <strong>
                    ${PAG.Profile.escape(
                      report.diketahui
                    )}
                  </strong>
                </div>
              `
              : ""
          }

        </div>


      </div>

    `;


    /* =================================================
       MODAL
       ================================================= */

    let modal =
      document.getElementById(
        "profileReportModal"
      );


    if (!modal) {

      modal =
        document.createElement(
          "div"
        );

      modal.id =
        "profileReportModal";

      modal.className =
        "profile-report-modal";

      document.body.appendChild(
        modal
      );

    }


    modal.innerHTML =
      html;


    modal.style.display =
      "flex";


    modal
      .querySelector(
        "#profileReportClose"
      )
      ?.addEventListener(
        "click",
        function () {

          modal.style.display =
            "none";

        }
      );


    modal.addEventListener(
      "click",
      function (event) {

        if (
          event.target === modal
        ) {

          modal.style.display =
            "none";

        }

      }
    );

  },


  /* =====================================================
     FILTER DOCUMENTS
     ===================================================== */

  filterDocuments(keyword) {

    const value =
      String(
        keyword || ""
      )
      .trim()
      .toLowerCase();


    document
      .querySelectorAll(
        "#profileDocuments .profile-document-item"
      )
      .forEach(
        item => {

          const text =
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


  /* =====================================================
     DOCUMENT ICON
     ===================================================== */

  documentIcon(type) {

    const t =
      String(
        type || ""
      )
      .toLowerCase();


    if (
      t.includes("laporan")
    ) {

      return "📋";

    }


    if (
      t.includes("foto") ||
      t.includes("photo")
    ) {

      return "📷";

    }


    if (
      t.includes("instruksi")
    ) {

      return "📢";

    }


    if (
      t.includes("memo")
    ) {

      return "📝";

    }


    if (
      t.includes("temuan")
    ) {

      return "⚠️";

    }


    if (
      t.includes("tindak")
    ) {

      return "🔧";

    }


    if (
      t.includes("rfi")
    ) {

      return "❓";

    }


    if (
      t.includes("inspection")
    ) {

      return "🔎";

    }


    if (
      t.includes("approval")
    ) {

      return "✓";

    }


    if (
      t.includes("signature")
    ) {

      return "✍️";

    }


    return "📄";

  },


  /* =====================================================
     TYPE LABEL
     ===================================================== */

  typeLabel(type) {

    const t =
      String(
        type || ""
      )
      .toLowerCase();


    if (
      t.includes("laporan")
    ) {

      return "Laporan Harian";

    }


    if (
      t.includes("instruksi")
    ) {

      return "Instruksi Lapangan";

    }


    if (
      t.includes("memo")
    ) {

      return "Memo";

    }


    if (
      t.includes("temuan")
    ) {

      return "Temuan";

    }


    if (
      t.includes("tindak")
    ) {

      return "Tindak Lanjut";

    }


    if (
      t.includes("rfi")
    ) {

      return "RFI";

    }


    if (
      t.includes("inspection")
    ) {

      return "Inspection";

    }


    return "Dokumen Pekerjaan";

  },


  /* =====================================================
     SOURCE LABEL
     ===================================================== */

  sourceLabel(source) {

    switch (source) {

      case "se":
        return "SE";

      case "admin":
        return "ADMIN";

      default:
        return "SAYA";

    }

  },


  /* =====================================================
     DATE
     ===================================================== */

  formatDate(value) {

    if (!value) {
      return "";
    }


    try {

      const date =
        new Date(value);


      if (
        isNaN(
          date.getTime()
        )
      ) {

        return String(value);

      }


      return new Intl.DateTimeFormat(
        "id-ID",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }
      ).format(date);


    } catch (error) {

      return String(value);

    }

  },


  /* =====================================================
     ESCAPE
     ===================================================== */

  escape(value) {

    return String(
      value == null
        ? ""
        : value
    )
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

  },


  /* =====================================================
     TOAST
     ===================================================== */

  toast(message) {

    try {

      if (
        PAG.UI &&
        typeof PAG.UI.toast === "function"
      ) {

        PAG.UI.toast(
          message
        );

        return;

      }

    } catch (error) {

      console.warn(
        error
      );

    }


    const toast =
      document.getElementById(
        "toast"
      );


    if (!toast) {
      return;
    }


    toast.textContent =
      message;


    toast.style.display =
      "block";


    clearTimeout(
      PAG.Profile._toastTimer
    );


    PAG.Profile._toastTimer =
      setTimeout(
        function () {

          toast.style.display =
            "none";

        },
        2500
      );

  }

};


console.log(
  "PAG Profile loaded:",
  !!PAG.Profile
);
