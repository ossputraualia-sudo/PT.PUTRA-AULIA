/* =====================================================
   PAG DOCS FIELD
   PROFILE
   ===================================================== */

window.PAG = window.PAG || {};

PAG.Profile = {

  /* =====================================================
     RENDER
     ===================================================== */

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
          typeof PAG.WebUtamaSync.getMaster === "function"
        ) {

          master =
            await PAG.WebUtamaSync.getMaster() || {};

        }

      } catch (e) {

        console.warn(
          "Master Profil tidak tersedia:",
          e
        );

      }


      /* =================================================
         PAKET
         ================================================= */

      var paket =
        Array.isArray(master.paket)
          ? master.paket
          : [];

      var activePackage =
        paket[0] || null;


      /* =================================================
         ONLINE
         ================================================= */

      var online =
        navigator.onLine;


      /* =================================================
         USER
         ================================================= */

      var nama =
        u.name ||
        u.nama ||
        "Personil";

      var role =
        u.jabatan ||
        u.role ||
        "Personil Lapangan";

      var userId =
        u.userId ||
        u.id ||
        "-";

      var email =
        u.email ||
        "-";


      /* =================================================
         RENDER
         ================================================= */

      v.innerHTML = `

        <!-- =============================================
             PROFILE HEADER
             ============================================= -->

        <div class="profile-head">

          <div class="profile-avatar">
            ${PAG.Profile.initials(nama)}
          </div>

          <div class="profile-identity">

            <div class="profile-name">
              ${PAG.Profile.escape(nama)}
            </div>

            <div class="profile-role">
              ${PAG.Profile.escape(role)}
            </div>

            <div class="profile-status">

              <span
                class="
                  profile-status-dot
                  ${online ? "online" : "offline"}
                "
              ></span>

              ${online ? "Online" : "Offline"}

            </div>

          </div>

        </div>


        <!-- =============================================
             DATA PERSONIL
             ============================================= -->

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
                ${PAG.Profile.escape(nama)}
              </b>

            </div>


            <div class="profile-row">

              <span>
                ID Personil
              </span>

              <b>
                ${PAG.Profile.escape(userId)}
              </b>

            </div>


            <div class="profile-row">

              <span>
                Jabatan
              </span>

              <b>
                ${PAG.Profile.escape(role)}
              </b>

            </div>


            <div class="profile-row">

              <span>
                Email
              </span>

              <b>
                ${PAG.Profile.escape(email)}
              </b>

            </div>

          </div>

        </div>


        <!-- =============================================
             PAKET PEKERJAAN
             ============================================= -->

        <div class="profile-section">

          <div class="profile-section-title">

            <span>
              📦
            </span>

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
                    activePackage.paket ||
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

        </div>


        <!-- =============================================
             CATATAN PEKERJAAN
             ============================================= -->

        <div class="profile-section">

          <div class="profile-section-title">

            <span>
              📁
            </span>

            Catatan Pekerjaan

          </div>


          <div class="profile-card documents-card">


            <div class="document-description">

              Laporan, catatan, dan dokumentasi
              pekerjaan yang berkaitan dengan
              personil dan paket.

            </div>


            <!-- TABS -->

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
                placeholder="Cari catatan atau dokumen..."
              >

            </div>


            <!-- DOCUMENTS -->

            <div id="profileDocuments">

              <div class="document-loading">
                Memuat catatan...
              </div>

            </div>


          </div>

        </div>


        <!-- =============================================
             SINKRONISASI
             ============================================= -->

        <div class="profile-section">

          <div class="profile-section-title">

            <span>
              🔄
            </span>

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
                class="
                  sync-indicator
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

        </div>


        <!-- =============================================
             PENGATURAN
             ============================================= -->

        <div class="profile-section">

          <div class="profile-section-title">

            <span>
              ⚙️
            </span>

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

        </div>


        <!-- =============================================
             LOGOUT
             ============================================= -->

        <div class="profile-section profile-logout-section">

          <button
            type="button"
            class="profile-logout"
            id="profileLogout"
          >
            Keluar dari PAG Docs
          </button>

        </div>

      `;


      /* =================================================
         LOAD DOCUMENTS
         ================================================= */

      var documentContainer =
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
          function(tab) {

            tab.addEventListener(
              "click",
              async function() {

                document
                  .querySelectorAll(
                    ".document-tab"
                  )
                  .forEach(
                    function(x) {

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


                var search =
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

      var search =
        document.getElementById(
          "profileDocumentSearch"
        );


      if (search) {

        search.addEventListener(
          "input",
          function() {

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
          async function() {

            try {

              sync.disabled = true;

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


              PAG.UI.toast(
                "Sinkronisasi selesai"
              );


              await PAG.Profile.loadDocuments(
                document.getElementById(
                  "profileDocuments"
                ),
                "all"
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

              sync.disabled = false;

              sync.textContent =
                "🔄 Sinkronkan Sekarang";

            }

          };

      }


      /* =================================================
         LOGOUT
         ================================================= */

      var logout =
        document.getElementById(
          "profileLogout"
        );


      if (logout) {

        logout.onclick =
          function() {

            if (
              confirm(
                "Apakah Anda yakin ingin keluar?"
              )
            ) {

              if (
                PAG.Auth &&
                typeof PAG.Auth.logout ===
                  "function"
              ) {

                PAG.Auth.logout();

              }

            }

          };

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
          function() {

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
          function() {

            PAG.UI.toast(
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
          function() {

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

    var text =
      String(name || "P");


    var parts =
      text
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2);


    return parts
      .map(
        function(x) {

          return x
            .charAt(0)
            .toUpperCase();

        }
      )
      .join("");

  },


  /* =====================================================
     GET DOCUMENTS
     ===================================================== */

  async getDocuments() {

    var result = [];


    /* =================================================
       1. MASTER WEB UTAMA
       ================================================= */

    try {

      var master = {};


      if (
        PAG.WebUtamaSync &&
        typeof PAG.WebUtamaSync.getMaster ===
          "function"
      ) {

        master =
          await PAG.WebUtamaSync.getMaster() || {};

      }


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
        function(collection) {

          if (
            !Array.isArray(collection)
          ) {

            return;

          }


          collection.forEach(
            function(item) {

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


    } catch (error) {

      console.warn(
        "Profile master documents:",
        error
      );

    }


    /* =================================================
       2. LAPORAN HARIAN LOKAL
       ================================================= */

    try {

      var localReports =
        JSON.parse(
          localStorage.getItem(
            "PAG_FIELD_REPORTS"
          ) || "[]"
        );


      if (
        Array.isArray(localReports)
      ) {

        localReports.forEach(
          function(report) {

            if (!report) return;


            result.push(
              PAG.Profile.normalizeLocalReport(
                report
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
       3. DEDUPLIKASI
       ================================================= */

    var unique =
      new Map();


    result.forEach(
      function(item) {

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


    /* =================================================
       4. SORT
       ================================================= */

    return Array
      .from(unique.values())
      .sort(
        function(a, b) {

          return (
            new Date(
              b.date || 0
            ).getTime() -

            new Date(
              a.date || 0
            ).getTime()
          );

        }
      );

  },


  /* =====================================================
     NORMALIZE LOCAL REPORT
     ===================================================== */

  normalizeLocalReport(report) {

    var data =
      report.data ||
      report;


    var items =
      Array.isArray(data.items)
        ? data.items
        : [];


    var firstItem =
      items[0] || {};


    var title =
      "Laporan Harian";


    var source =
      "self";


    return {

      id:
        data.id ||
        report.id ||
        (
          "LH-" +
          Date.now() +
          "-" +
          Math.random()
        ),


      type:
        "laporan_harian",


      title:
        title,


      source:
        source,


      createdBy:
        data.dibuat ||
        "",


      date:
        data.createdAt ||
        report.createdAt ||
        firstItem.tanggal ||
        "",


      packageId:
        data.packageId ||
        "",


      packageName:
        data.paket ||
        "",


      konsultan:
        data.konsultan ||
        "",


      kontraktor:
        data.kontraktor ||
        "",


      noKontrak:
        data.noKontrak ||
        "",


      diketahui:
        data.diketahui ||
        "",


      items:
        items,


      raw:
        data,


      isLocalReport:
        true

    };

  },


  /* =====================================================
     NORMALIZE DOCUMENT MASTER
     ===================================================== */

  normalizeDocument(item) {

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
        item.role ||
        ""
      ).toLowerCase();


    var source =
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
      sourceRaw.includes("site engineer") ||
      sourceRaw.includes("site_engineer")
    ) {

      source =
        "se";

    }


    var createdBy =
      item.createdByName ||
      item.namaPembuat ||
      item.createdBy ||
      item.author ||
      item.dibuat ||
      "";


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


      packageName:
        item.paket ||
        item.namaPaket ||
        "",


      raw:
        item,


      isLocalReport:
        false

    };

  },


  /* =====================================================
     DOCUMENT TITLE
     ===================================================== */

  documentTitle(type) {

    var t =
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
     LOAD
     ===================================================== */

  async loadDocuments(
    container,
    source
  ) {

    if (!container) return;


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
      source &&
      source !== "all"
    ) {

      filtered =
        documents.filter(
          function(doc) {

            return (
              doc.source ===
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


  /* =====================================================
     RENDER DOCUMENTS
     ===================================================== */

  renderDocuments(
    container,
    documents
  ) {

    if (
      !documents ||
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
          function(doc) {

            var itemCount =
              Array.isArray(doc.items)
                ? doc.items.length
                : 0;


            var packageText =
              doc.packageName
                ? `
                  <small>
                    📦
                    ${PAG.Profile.escape(
                      doc.packageName
                    )}
                  </small>
                `
                : "";


            var countText =
              itemCount
                ? `
                  <small>
                    📋
                    ${itemCount}
                    kegiatan
                  </small>
                `
                : "";


            var photoCount =
              PAG.Profile.countPhotos(
                doc
              );


            var photoText =
              photoCount
                ? `
                  <small>
                    📷
                    ${photoCount}
                    foto
                  </small>
                `
                : "";


            return `

              <div
                class="
                  document-item
                  ${
                    doc.isLocalReport
                      ? "local-report"
                      : ""
                  }
                "
                data-search="
                  ${PAG.Profile.escape(
                    (
                      doc.title +
                      " " +
                      doc.type +
                      " " +
                      doc.createdBy +
                      " " +
                      (
                        doc.packageName ||
                        ""
                      )
                    ).toLowerCase()
                  )}
                "
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


                  ${packageText}

                  ${countText}

                  ${photoText}


                  ${
                    doc.isLocalReport
                      ? `
                        <span
                          class="
                            document-local-badge
                          "
                        >
                          Tersimpan Lokal
                        </span>
                      `
                      : ""
                  }


                  ${
                    doc.isLocalReport
                      ? `
                        <button
                          type="button"
                          class="
                            document-view-button
                          "
                          data-report-id="
                            ${PAG.Profile.escape(
                              doc.id
                            )}
                          "
                        >
                          Lihat Detail
                        </button>
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


              </div>

            `;

          }
        )
        .join("");


    /* =================================================
       DETAIL BUTTON
       ================================================= */

    container
      .querySelectorAll(
        ".document-view-button"
      )
      .forEach(
        function(button) {

          button.addEventListener(
            "click",
            function() {

              var id =
                this.dataset.reportId;


              PAG.Profile.showReport(
                id
              );

            }
          );

        }
      );

  },


  /* =====================================================
     SHOW REPORT
     ===================================================== */

  showReport(id) {

    var reports =
      PAG.Profile._documents || [];


    var report =
      reports.find(
        function(item) {

          return (
            String(item.id) ===
            String(id)
          );

        }
      );


    if (!report) {

      PAG.UI.toast(
        "Laporan tidak ditemukan."
      );

      return;

    }


    var items =
      Array.isArray(report.items)
        ? report.items
        : [];


    var html = `

      <div class="profile-report-detail">


        <div class="profile-report-header">

          <b>
            Laporan Harian
          </b>

          <button
            type="button"
            id="profileReportClose"
          >
            ✕
          </button>

        </div>


        ${
          report.packageName
            ? `
              <div class="profile-report-package">
                📦
                ${PAG.Profile.escape(
                  report.packageName
                )}
              </div>
            `
            : ""
        }


        ${
          report.date
            ? `
              <div class="profile-report-date">
                ${PAG.Profile.formatDate(
                  report.date
                )}
              </div>
            `
            : ""
        }


        <div class="profile-report-items">

          ${
            items.length
              ? items
                  .map(
                    function(item, index) {

                      return `

                        <div
                          class="
                            profile-report-item
                          "
                        >

                          <div
                            class="
                              profile-report-item-title
                            "
                          >

                            <b>
                              Kegiatan
                              ${index + 1}
                            </b>

                          </div>


                          ${
                            item.tanggal
                              ? `
                                <div>
                                  <small>
                                    Tanggal
                                  </small>
                                  <b>
                                    ${PAG.Profile.escape(
                                      item.tanggal
                                    )}
                                  </b>
                                </div>
                              `
                              : ""
                          }


                          ${
                            item.divisi
                              ? `
                                <div>
                                  <small>
                                    Divisi
                                  </small>
                                  <b>
                                    ${PAG.Profile.escape(
                                      item.divisi
                                    )}
                                  </b>
                                </div>
                              `
                              : ""
                          }


                          ${
                            item.sta
                              ? `
                                <div>
                                  <small>
                                    STA
                                  </small>
                                  <b>
                                    ${PAG.Profile.escape(
                                      item.sta
                                    )}
                                  </b>
                                </div>
                              `
                              : ""
                          }


                          ${
                            item.cuaca
                              ? `
                                <div>
                                  <small>
                                    Cuaca
                                  </small>
                                  <b>
                                    ${PAG.Profile.escape(
                                      item.cuaca
                                    )}
                                  </b>
                                </div>
                              `
                              : ""
                          }


                          ${
                            item.uraian
                              ? `
                                <div>
                                  <small>
                                    Uraian
                                  </small>
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
                                <div>
                                  <small>
                                    Tenaga Kerja
                                  </small>
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
                                <div>
                                  <small>
                                    Peralatan
                                  </small>
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
                                <div>
                                  <small>
                                    Material
                                  </small>
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
                                <div>
                                  <small>
                                    Kendala
                                  </small>
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
                            item.dokumentasiDataUrl
                              ? `
                                <div
                                  class="
                                    profile-report-photo
                                  "
                                >

                                  <small>
                                    Dokumentasi
                                  </small>

                                  <img
                                    src="${item.dokumentasiDataUrl}"
                                    alt="Dokumentasi"
                                  >

                                </div>
                              `
                              : ""
                          }

                        </div>

                      `;

                    }
                  )
                  .join("")
              : `
                <div class="empty-state">
                  Tidak ada kegiatan.
                </div>
              `
          }

        </div>


        <div class="profile-report-sign">

          ${
            report.createdBy
              ? `
                <div>
                  <small>
                    Dibuat oleh
                  </small>
                  <b>
                    ${PAG.Profile.escape(
                      report.createdBy
                    )}
                  </b>
                </div>
              `
              : ""
          }


          ${
            report.diketahui
              ? `
                <div>
                  <small>
                    Diketahui oleh
                  </small>
                  <b>
                    ${PAG.Profile.escape(
                      report.diketahui
                    )}
                  </b>
                </div>
              `
              : ""
          }

        </div>


      </div>

    `;


    var modal =
      document.createElement(
        "div"
      );


    modal.className =
      "profile-report-modal";


    modal.innerHTML =
      html;


    document.body.appendChild(
      modal
    );


    modal
      .querySelector(
        "#profileReportClose"
      )
      ?.addEventListener(
        "click",
        function() {

          modal.remove();

        }
      );


    modal.addEventListener(
      "click",
      function(event) {

        if (
          event.target === modal
        ) {

          modal.remove();

        }

      }
    );

  },


  /* =====================================================
     COUNT PHOTOS
     ===================================================== */

  countPhotos(doc) {

    if (
      !doc ||
      !Array.isArray(doc.items)
    ) {

      return 0;

    }


    return doc.items.filter(
      function(item) {

        return (
          item &&
          (
            item.dokumentasiDataUrl ||
            item.dokumentasi
          )
        );

      }
    ).length;

  },


  /* =====================================================
     FILTER
     ===================================================== */

  filterDocuments(keyword) {

    var value =
      String(
        keyword || ""
      )
        .trim()
        .toLowerCase();


    document
      .querySelectorAll(
        "#profileDocuments .document-item"
      )
      .forEach(
        function(item) {

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


  /* =====================================================
     ICON
     ===================================================== */

  documentIcon(type) {

    var t =
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

      var d =
        new Date(value);


      if (
        isNaN(
          d.getTime()
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
      ).format(d);


    } catch (e) {

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

  }

};


/* =====================================================
   DEBUG
   ===================================================== */

console.log(
  "PAG Profile loaded:",
  !!PAG.Profile
);
