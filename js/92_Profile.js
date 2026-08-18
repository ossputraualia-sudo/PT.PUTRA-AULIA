```javascript
/* =====================================================
   PAG DOCS FIELD
   92_Profile.js
   PROFILE / PERSONIL LAPANGAN

   FUNGSI:
   - Data Personil
   - Paket Pekerjaan
   - Catatan Pekerjaan
   - Menampilkan Laporan Harian tersimpan
   - Filter SAYA / SE / ADMIN
   - Pencarian dokumen
   - Sinkronisasi
   - Pengaturan
   - Logout

   TERINTEGRASI DENGAN:
   PAG.Auth
   PAG.WebUtamaSync
   PAG.Storage
   PAG.OfflineSync
   PAG.UI
   ===================================================== */

window.PAG = window.PAG || {};

PAG.Profile = {

  /* =====================================================
     RENDER
     ===================================================== */

  async render(v) {

    if (!v) {

      console.error(
        "PAG.Profile: view tidak ditemukan."
      );

      return;

    }


    try {

      /* =================================================
         USER
         ================================================= */

      const u =
        PAG.Auth &&
        typeof PAG.Auth.get === "function"
          ? PAG.Auth.get() || {}
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
          "Profile: master tidak tersedia.",
          error
        );

      }


      /* =================================================
         PAKET
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
         RENDER
         ================================================= */

      v.innerHTML = `

        <!-- =============================================
             HEADER
             ============================================= -->

        <section class="profile-head">

          <div class="profile-avatar">

            ${PAG.Profile.initials(
              u.name ||
              u.nama ||
              "P"
            )}

          </div>


          <div class="profile-identity">

            <div class="profile-name">

              ${PAG.Profile.escape(
                u.name ||
                u.nama ||
                "Personil"
              )}

            </div>


            <div class="profile-role">

              ${PAG.Profile.escape(
                u.jabatan ||
                u.role ||
                "Personil Lapangan"
              )}

            </div>


            <div class="profile-status">

              <span class="
                profile-status-dot
                ${online ? "online" : "offline"}
              "></span>

              ${online ? "Online" : "Offline"}

            </div>

          </div>

        </section>


        <!-- =============================================
             DATA PERSONIL
             ============================================= -->

        <section class="profile-section">

          <div class="profile-section-title">

            <span>👤</span>

            Data Personil

          </div>


          <div class="profile-card">

            <div class="profile-row">

              <span>Nama</span>

              <b>
                ${PAG.Profile.escape(
                  u.name ||
                  u.nama ||
                  "-"
                )}
              </b>

            </div>


            <div class="profile-row">

              <span>ID Personil</span>

              <b>
                ${PAG.Profile.escape(
                  u.userId ||
                  u.id ||
                  "-"
                )}
              </b>

            </div>


            <div class="profile-row">

              <span>Jabatan</span>

              <b>
                ${PAG.Profile.escape(
                  u.jabatan ||
                  u.role ||
                  "-"
                )}
              </b>

            </div>


            <div class="profile-row">

              <span>Email</span>

              <b>
                ${PAG.Profile.escape(
                  u.email ||
                  "-"
                )}
              </b>

            </div>

          </div>

        </section>


        <!-- =============================================
             PAKET PEKERJAAN
             ============================================= -->

        <section class="profile-section">

          <div class="profile-section-title">

            <span>📦</span>

            Paket Pekerjaan

          </div>


          <div class="profile-card">

            ${
              activePackage

                ? `

                  <div class="package-title">

                    ${PAG.Profile.escape(
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
                          ${PAG.Profile.escape(
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

        </section>


        <!-- =============================================
             CATATAN PEKERJAAN
             ============================================= -->

        <section class="profile-section">

          <div class="profile-section-title">

            <span>📁</span>

            Catatan Pekerjaan

          </div>


          <div class="profile-card documents-card">

            <div class="document-description">

              Seluruh laporan dan dokumen pekerjaan
              yang berkaitan dengan personil dan paket.

            </div>


            <!-- TAB -->

            <div class="document-tabs">

              <button
                type="button"
                class="document-tab active"
                data-source="all"
              >
                Semua
              </button>


              <button
                type="button"
                class="document-tab"
                data-source="self"
              >
                Saya
              </button>


              <button
                type="button"
                class="document-tab"
                data-source="se"
              >
                SE
              </button>


              <button
                type="button"
                class="document-tab"
                data-source="admin"
              >
                Admin
              </button>

            </div>


            <!-- SEARCH -->

            <div class="document-search">

              <input
                id="profileDocumentSearch"
                type="search"
                placeholder="Cari laporan atau dokumen..."
                autocomplete="off"
              >

            </div>


            <!-- DOCUMENT LIST -->

            <div id="profileDocuments">

              <div class="document-loading">

                Memuat catatan...

              </div>

            </div>

          </div>

        </section>


        <!-- =============================================
             SINKRONISASI
             ============================================= -->

        <section class="profile-section">

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


              <span class="
                sync-indicator
                ${online ? "online" : "offline"}
              ">

                ${online ? "Online" : "Offline"}

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


        <!-- =============================================
             PENGATURAN
             ============================================= -->

        <section class="profile-section">

          <div class="profile-section-title">

            <span>⚙️</span>

            Pengaturan

          </div>


          <div class="profile-card">

            <button
              type="button"
              class="profile-menu"
              id="profileNotificationSetting"
            >

              <span>

                🔔

                <b>
                  Notifikasi
                </b>

              </span>


              <span>
                ›
              </span>

            </button>


            <button
              type="button"
              class="profile-menu"
              id="profileStorageSetting"
            >

              <span>

                💾

                <b>
                  Data Lokal
                </b>

              </span>


              <span>
                ›
              </span>

            </button>


            <button
              type="button"
              class="profile-menu"
              id="profileAbout"
            >

              <span>

                ℹ️

                <b>
                  Tentang PAG Docs
                </b>

              </span>


              <span>
                ›
              </span>

            </button>

          </div>

        </section>


        <!-- =============================================
             LOGOUT
             ============================================= -->

        <section class="
          profile-section
          profile-logout-section
        ">

          <button
            type="button"
            class="profile-logout"
            id="profileLogout"
          >

            Keluar dari PAG Docs

          </button>

        </section>

      `;


      /* =================================================
         LOAD DOKUMEN
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
         TAB
         ================================================= */

      document
        .querySelectorAll(
          ".document-tab"
        )
        .forEach(
          tab => {

            tab.addEventListener(
              "click",
              async function () {

                document
                  .querySelectorAll(
                    ".document-tab"
                  )
                  .forEach(
                    x =>
                      x.classList.remove(
                        "active"
                      )
                  );


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

          }
        );


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
              "Data lokal dikelola otomatis oleh PAG Docs."
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


    return parts
      .map(
        x =>
          x.charAt(0)
      )
      .join("")
      .toUpperCase();

  },


  /* =====================================================
     GET DOCUMENTS
     ===================================================== */

  async getDocuments() {

    const result = [];


    /* =================================================
       1. LOCAL REPORTS
       ================================================ */

    try {

      if (
        PAG.Storage &&
        typeof PAG.Storage.getAll === "function"
      ) {

        const reports =
          await PAG.Storage.getAll(
            "reports"
          );


        if (
          Array.isArray(reports)
        ) {

          reports.forEach(
            record => {

              if (!record) return;


              const data =
                record.data ||
                record;


              result.push(
                PAG.Profile.normalizeReport(
                  data,
                  record
                )
              );

            }
          );

        }

      }

    } catch (error) {

      console.warn(
        "Profile local reports:",
        error
      );

    }


    /* =================================================
       2. MASTER WEB UTAMA
       ================================================ */

    try {

      if (
        PAG.WebUtamaSync &&
        typeof PAG.WebUtamaSync.getMaster === "function"
      ) {

        const master =
          await PAG.WebUtamaSync.getMaster() || {};


        const collections = [

          ...(Array.isArray(master.documents)
            ? master.documents
            : []),

          ...(Array.isArray(master.dokumen)
            ? master.dokumen
            : []),

          ...(Array.isArray(master.catatan)
            ? master.catatan
            : []),

          ...(Array.isArray(master.laporan)
            ? master.laporan
            : []),

          ...(Array.isArray(master.laporanHarian)
            ? master.laporanHarian
            : []),

          ...(Array.isArray(master.instruksi)
            ? master.instruksi
            : []),

          ...(Array.isArray(master.memo)
            ? master.memo
            : []),

          ...(Array.isArray(master.temuan)
            ? master.temuan
            : []),

          ...(Array.isArray(master.tindaklanjut)
            ? master.tindaklanjut
            : []),

          ...(Array.isArray(master.rfi)
            ? master.rfi
            : []),

          ...(Array.isArray(master.inspection)
            ? master.inspection
            : [])

        ];


        collections.forEach(
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

    } catch (error) {

      console.warn(
        "Profile master documents:",
        error
      );

    }


    /* =================================================
       3. DEDUPLICATE
       ================================================= */

    const unique =
      new Map();


    result.forEach(
      item => {

        if (
          !item ||
          !item.id
        ) {

          return;

        }


        unique.set(
          String(item.id),
          item
        );

      }
    );


    return Array
      .from(
        unique.values()
      )
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
     NORMALIZE REPORT
     ===================================================== */

  normalizeReport(data, record) {

    const report =
      data || {};


    const id =
      report.id ||
      record?.id ||
      `LH-${Date.now()}`;


    const createdBy =
      report.dibuat ||
      report.createdByName ||
      report.createdBy ||
      "";


    return {

      id:

        String(id),


      type:

        "laporan_harian",


      title:

        "Laporan Harian",


      source:

        "self",


      createdBy:

        createdBy,


      date:

        report.createdAt ||
        record?.createdAt ||
        "",


      packageId:

        report.packageId ||
        report.paketId ||
        "",


      raw:

        report,


      isLocal:

        true

    };

  },


  /* =====================================================
     NORMALIZE DOCUMENT
     ===================================================== */

  normalizeDocument(item) {

    const type =
      String(
        item.type ||
        item.jenis ||
        item.documentType ||
        item.kategori ||
        "Dokumen"
      );


    const sourceRaw =
      String(
        item.source ||
        item.sumber ||
        item.createdByRole ||
        ""
      ).toLowerCase();


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


    const createdBy =
      item.createdByName ||
      item.namaPembuat ||
      item.createdBy ||
      item.author ||
      "";


    return {

      id:

        item.id ||
        item.documentId ||
        `DOC-${Date.now()}-${Math.random()}`,


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


        createdBy,


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


        item,


      isLocal:


        false

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

      <div class="document-loading">

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
            item =>
              item.source === source
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
        "Load Profile Documents:",
        error
      );


      container.innerHTML = `

        <div class="empty-state">

          <div class="empty-icon">
            ⚠️
          </div>

          <b>
            Gagal memuat catatan
          </b>

          <span>
            ${PAG.Profile.escape(
              error.message ||
              String(error)
            )}
          </span>

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
          (doc, index) => {

            const raw =
              doc.raw || {};


            const itemCount =
              Array.isArray(
                raw.items
              )
                ? raw.items.length
                : 0;


            return `

              <button
                type="button"
                class="document-item"
                data-document-id="${PAG.Profile.escape(
                  doc.id
                )}"
                data-search="${PAG.Profile.escape(
                  (
                    doc.title +
                    " " +
                    doc.type +
                    " " +
                    doc.createdBy +
                    " " +
                    (raw.paket || "")
                  ).toLowerCase()
                )}"
              >

                <div class="document-icon">

                  ${PAG.Profile.documentIcon(
                    doc.type
                  )}

                </div>


                <div class="document-content">

                  <b>

                    ${PAG.Profile.escape(
                      doc.title
                    )}

                  </b>


                  <small>

                    ${PAG.Profile.escape(
                      doc.type
                    )}

                    ${
                      doc.createdBy
                        ? " • " +
                          PAG.Profile.escape(
                            doc.createdBy
                          )
                        : ""
                    }

                  </small>


                  ${
                    itemCount
                      ? `

                        <small>

                          ${itemCount}
                          kegiatan

                        </small>

                      `
                      : ""
                  }


                  ${
                    doc.date
                      ? `

                        <small class="
                          document-date
                        ">

                          ${PAG.Profile.formatDate(
                            doc.date
                          )}

                        </small>

                      `
                      : ""
                  }

                </div>


                <span class="
                  document-source
                  ${PAG.Profile.escape(
                    doc.source
                  )}
                ">

                  ${PAG.Profile.sourceLabel(
                    doc.source
                  )}

                </span>


                <span class="document-arrow">
                  ›
                </span>

              </button>

            `;

          }
        )
        .join("");


    /* =================================================
       CLICK DETAIL
       ================================================= */

    container
      .querySelectorAll(
        ".document-item"
      )
      .forEach(
        item => {

          item.addEventListener(
            "click",
            function () {

              const id =
                this.dataset.documentId;


              const doc =
                (PAG.Profile._documents || [])
                  .find(
                    x =>
                      String(x.id) ===
                      String(id)
                  );


              if (doc) {

                PAG.Profile.openDocument(
                  doc
                );

              }

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


    const raw =
      doc.raw || {};


    /* =================================================
       LAPORAN HARIAN
       ================================================= */

    if (
      doc.type ===
      "laporan_harian"
    ) {

      PAG.Profile.openReport(
        raw
      );

      return;

    }


    /* =================================================
       DOKUMEN BIASA
       ================================================= */

    PAG.Profile.toast(
      doc.title ||
      "Dokumen pekerjaan"
    );

  },


  /* =====================================================
     OPEN REPORT DETAIL
     ===================================================== */

  openReport(report) {

    if (!report) {

      return;

    }


    const items =
      Array.isArray(
        report.items
      )
        ? report.items
        : [];


    const html = `

      <div class="profile-report-detail">

        <div class="profile-report-header">

          <small>
            PAG DOCS FIELD
          </small>

          <h3>
            Laporan Harian
          </h3>


          ${
            report.createdAt
              ? `

                <small>
                  ${PAG.Profile.formatDate(
                    report.createdAt
                  )}
                </small>

              `
              : ""
          }

        </div>


        <div class="profile-report-info">

          <div>
            <span>Konsultan</span>
            <b>
              ${PAG.Profile.escape(
                report.konsultan || "-"
              )}
            </b>
          </div>


          <div>
            <span>Kontraktor</span>
            <b>
              ${PAG.Profile.escape(
                report.kontraktor || "-"
              )}
            </b>
          </div>


          <div>
            <span>Paket</span>
            <b>
              ${PAG.Profile.escape(
                report.paket || "-"
              )}
            </b>
          </div>


          <div>
            <span>No. Kontrak</span>
            <b>
              ${PAG.Profile.escape(
                report.noKontrak || "-"
              )}
            </b>
          </div>

        </div>


        <div class="profile-report-items">

          <h4>
            Kegiatan
          </h4>


          ${
            items.length

              ? items
                  .map(
                    (item, index) => `

                      <div class="
                        profile-report-item
                      ">

                        <div class="
                          profile-report-item-title
                        ">

                          <b>
                            ${index + 1}.
                            Kegiatan
                          </b>

                        </div>


                        <div class="
                          profile-report-grid
                        ">

                          <div>

                            <span>
                              Tanggal
                            </span>

                            <b>
                              ${PAG.Profile.escape(
                                item.tanggal ||
                                "-"
                              )}
                            </b>

                          </div>


                          <div>

                            <span>
                              Divisi
                            </span>

                            <b>
                              ${PAG.Profile.escape(
                                item.devisi ||
                                "-"
                              )}
                            </b>

                          </div>


                          <div>

                            <span>
                              STA
                            </span>

                            <b>
                              ${PAG.Profile.escape(
                                item.sta ||
                                "-"
                              )}
                            </b>

                          </div>


                          <div>

                            <span>
                              Cuaca
                            </span>

                            <b>
                              ${PAG.Profile.escape(
                                item.cuaca ||
                                "-"
                              )}
                            </b>

                          </div>

                        </div>


                        <div class="
                          profile-report-field
                        ">

                          <span>
                            Uraian Pekerjaan
                          </span>

                          <p>
                            ${PAG.Profile.escape(
                              item.uraian ||
                              "-"
                            )}
                          </p>

                        </div>


                        <div class="
                          profile-report-field
                        ">

                          <span>
                            Tenaga Kerja
                          </span>

                          <p>
                            ${PAG.Profile.escape(
                              item.tenaga ||
                              "-"
                            )}
                          </p>

                        </div>


                        <div class="
                          profile-report-field
                        ">

                          <span>
                            Peralatan
                          </span>

                          <p>
                            ${PAG.Profile.escape(
                              item.peralatan ||
                              "-"
                            )}
                          </p>

                        </div>


                        <div class="
                          profile-report-field
                        ">

                          <span>
                            Material
                          </span>

                          <p>
                            ${PAG.Profile.escape(
                              item.material ||
                              "-"
                            )}
                          </p>

                        </div>


                        <div class="
                          profile-report-field
                        ">

                          <span>
                            Kendala
                          </span>

                          <p>
                            ${PAG.Profile.escape(
                              item.kendala ||
                              "-"
                            )}
                          </p>

                        </div>


                        ${
                          item.dokumentasi
                            ? `

                              <div class="
                                profile-report-photo
                              ">

                                📷

                                <span>
                                  ${PAG.Profile.escape(
                                    item.dokumentasi
                                  )}
                                </span>

                              </div>

                            `
                            : ""
                        }

                      </div>

                    `
                  )
                  .join("")

              : `

                  <div class="empty-state">

                    Belum ada kegiatan.

                  </div>

                `
          }

        </div>


        <div class="
          profile-report-approval
        ">

          <div>

            <span>
              Dibuat oleh
            </span>

            <b>
              ${PAG.Profile.escape(
                report.dibuat ||
                "-"
              )}
            </b>

          </div>


          <div>

            <span>
              Diketahui oleh
            </span>

            <b>
              ${PAG.Profile.escape(
                report.diketahui ||
                "-"
              )}
            </b>

          </div>

        </div>

      </div>

    `;


    PAG.Profile.showModal(
      html
    );

  },


  /* =====================================================
     MODAL
     ===================================================== */

  showModal(content) {

    const old =
      document.getElementById(
        "profileDocumentModal"
      );


    if (old) {

      old.remove();

    }


    const modal =
      document.createElement(
        "div"
      );


    modal.id =
      "profileDocumentModal";


    modal.className =
      "profile-document-modal";


    modal.innerHTML = `

      <div class="
        profile-document-overlay
      "></div>


      <div class="
        profile-document-dialog
      ">

        <button
          type="button"
          class="
            profile-document-close
          "
          id="profileDocumentClose"
        >
          ×
        </button>


        <div class="
          profile-document-body
        ">

          ${content}

        </div>

      </div>

    `;


    document.body.appendChild(
      modal
    );


    const close =
      () => {

        modal.remove();

      };


    modal
      .querySelector(
        ".profile-document-overlay"
      )
      ?.addEventListener(
        "click",
        close
      );


    modal
      .querySelector(
        "#profileDocumentClose"
      )
      ?.addEventListener(
        "click",
        close
      );


    document.addEventListener(
      "keydown",
      function esc(e) {

        if (
          e.key === "Escape"
        ) {

          close();

          document.removeEventListener(
            "keydown",
            esc
          );

        }

      }
    );

  },


  /* =====================================================
     SEARCH
     ===================================================== */

  filterDocuments(keyword) {

    const value =
      String(keyword || "")
        .trim()
        .toLowerCase();


    document
      .querySelectorAll(
        "#profileDocuments .document-item"
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
     ICON
     ===================================================== */

  documentIcon(type) {

    const t =
      String(type || "")
        .toLowerCase();


    if (
      t.includes("laporan")
    ) {

      return "📋";

    }


    if (
      t.includes("foto")
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
        date
      );


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
        () => {

          toast.style.display =
            "none";

        },
        2500
      );

  }

};


console.log(
  "PAG 92_Profile loaded:",
  !!PAG.Profile
);
```
