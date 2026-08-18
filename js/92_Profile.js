/* =====================================================
   PAG DOCS FIELD
   PROFILE
   Data Personil
   Paket
   Catatan Pekerjaan
   Sinkronisasi
   Pengaturan
   Keluar
   ===================================================== */

PAG.Profile = {

  async render(v) {

    try {

      const u = PAG.Auth.get() || {};

      let master = {};

      try {
        master = await PAG.WebUtamaSync.getMaster();
      } catch (e) {
        console.warn("Master Profil tidak tersedia:", e);
      }

      const paket = Array.isArray(master?.paket)
        ? master.paket
        : [];

      const activePackage = paket[0] || null;

      const online = navigator.onLine;

      v.innerHTML = `

        <!-- =================================================
             PROFILE HEADER
             ================================================= -->

        <div class="profile-head">

          <div class="profile-avatar">
            ${PAG.Profile.initials(u.name)}
          </div>

          <div class="profile-identity">

            <div class="profile-name">
              ${PAG.UI.escape(u.name || "Personil")}
            </div>

            <div class="profile-role">
              ${PAG.UI.escape(
                u.role ||
                u.jabatan ||
                "Personil Lapangan"
              )}
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
              <span>Nama</span>
              <b>
                ${PAG.UI.escape(u.name || "-")}
              </b>
            </div>

            <div class="profile-row">
              <span>ID Personil</span>
              <b>
                ${PAG.UI.escape(
                  u.userId ||
                  u.id ||
                  "-"
                )}
              </b>
            </div>

            <div class="profile-row">
              <span>Jabatan</span>
              <b>
                ${PAG.UI.escape(
                  u.jabatan ||
                  u.role ||
                  "-"
                )}
              </b>
            </div>

            <div class="profile-row">
              <span>Email</span>
              <b>
                ${PAG.UI.escape(
                  u.email ||
                  "-"
                )}
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
                    activePackage.name ||
                    "Paket Pekerjaan"
                  )}

                </div>

                <div class="package-info">

                  ${
                    activePackage.id
                      ? `ID: ${PAG.UI.escape(
                          activePackage.id
                        )}`
                      : ""
                  }

                </div>

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

              Seluruh catatan dan dokumen pekerjaan
              yang berkaitan dengan personil dan paket.

            </div>


            <div class="document-tabs">

              <button
                class="document-tab active"
                data-source="all"
              >
                Semua
              </button>

              <button
                class="document-tab"
                data-source="self"
              >
                Saya
              </button>

              <button
                class="document-tab"
                data-source="se"
              >
                SE
              </button>

              <button
                class="document-tab"
                data-source="admin"
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

              <div class="empty-state">

                <div class="empty-icon">
                  📂
                </div>

                <b>
                  Catatan pekerjaan
                </b>

                <span>
                  Belum ada catatan yang tersedia.
                </span>

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

                <b>Status koneksi</b>

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
                  online ? "online" : "offline"
                }"
              >
                ${online ? "Online" : "Offline"}
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


      /* =====================================================
         LOAD DOCUMENTS
         ===================================================== */

      await PAG.Profile.loadDocuments(
        document.getElementById(
          "profileDocuments"
        ),
        "all"
      );


      /* =====================================================
         DOCUMENT TABS
         ===================================================== */

      document
        .querySelectorAll(".document-tab")
        .forEach(tab => {

          tab.addEventListener(
            "click",
            async function () {

              document
                .querySelectorAll(".document-tab")
                .forEach(x =>
                  x.classList.remove("active")
                );

              this.classList.add("active");

              await PAG.Profile.loadDocuments(
                document.getElementById(
                  "profileDocuments"
                ),
                this.dataset.source
              );

            }
          );

        });


      /* =====================================================
         SEARCH
         ===================================================== */

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


      /* =====================================================
         SYNC
         ===================================================== */

      const sync =
        document.getElementById(
          "profileSync"
        );

      if (sync) {

        sync.onclick =
          async function () {

            try {

              sync.disabled = true;

              sync.textContent =
                "⏳ Menyinkronkan...";

              await PAG.WebUtamaSync.pull();

              await PAG.OfflineSync.run();

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
                "Profile sync error:",
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


      /* =====================================================
         LOGOUT
         ===================================================== */

      const logout =
        document.getElementById(
          "profileLogout"
        );

      if (logout) {

        logout.onclick =
          function () {

            if (
              confirm(
                "Apakah Anda yakin ingin keluar?"
              )
            ) {

              PAG.Auth.logout();

            }

          };

      }


      /* =====================================================
         SETTINGS
         ===================================================== */

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
        .slice(0, 2);

    return parts
      .map(x => x.charAt(0))
      .join("")
      .toUpperCase();

  },


  /* =====================================================
     DOCUMENT DATA
     ===================================================== */

  async getDocuments() {

    const result = [];

    try {

      /*
       * MASTER DARI WEB UTAMA
       */

      const master =
        await PAG.WebUtamaSync.getMaster();

      /*
       * Ambil koleksi dokumen jika tersedia.
       * Tidak mengganggu aplikasi apabila
       * backend belum mengirim koleksi tersebut.
       */

      const collections = [

        ...(Array.isArray(master?.documents)
          ? master.documents
          : []),

        ...(Array.isArray(master?.dokumen)
          ? master.dokumen
          : []),

        ...(Array.isArray(master?.catatan)
          ? master.catatan
          : []),

        ...(Array.isArray(master?.laporan)
          ? master.laporan
          : []),

        ...(Array.isArray(master?.laporanHarian)
          ? master.laporanHarian
          : []),

        ...(Array.isArray(master?.instruksi)
          ? master.instruksi
          : []),

        ...(Array.isArray(master?.memo)
          ? master.memo
          : []),

        ...(Array.isArray(master?.temuan)
          ? master.temuan
          : []),

        ...(Array.isArray(master?.tindaklanjut)
          ? master.tindaklanjut
          : []),

        ...(Array.isArray(master?.rfi)
          ? master.rfi
          : []),

        ...(Array.isArray(master?.inspection)
          ? master.inspection
          : [])

      ];


      collections.forEach(item => {

        if (!item) return;

        result.push(
          PAG.Profile.normalizeDocument(item)
        );

      });

    } catch (error) {

      console.warn(
        "Dokumen master tidak tersedia:",
        error
      );

    }


    /*
     * HAPUS DUPLIKAT
     */

    const unique =
      new Map();

    result.forEach(item => {

      if (
        item &&
        item.id
      ) {

        unique.set(
          item.id,
          item
        );

      }

    });


    return Array
      .from(unique.values())
      .sort(
        (a, b) =>
          new Date(b.date || 0) -
          new Date(a.date || 0)
      );

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


    let source = "self";

    if (
      sourceRaw.includes("admin")
    ) {

      source = "admin";

    } else if (
      sourceRaw.includes("se") ||
      sourceRaw.includes("supervisor") ||
      sourceRaw.includes("engineer")
    ) {

      source = "se";

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

      type,

      title:
        item.title ||
        item.judul ||
        item.nama ||
        PAG.Profile.documentTitle(type),

      source,

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

      raw: item

    };

  },


  /* =====================================================
     DOCUMENT TITLE
     ===================================================== */

  documentTitle(type) {

    const t =
      String(type)
        .toLowerCase();


    if (
      t.includes("laporan")
    )
      return "Laporan Harian";


    if (
      t.includes("instruksi")
    )
      return "Instruksi Lapangan";


    if (
      t.includes("memo")
    )
      return "Memo";


    if (
      t.includes("temuan")
    )
      return "Temuan";


    if (
      t.includes("tindak")
    )
      return "Tindak Lanjut";


    if (
      t.includes("rfi")
    )
      return "RFI";


    if (
      t.includes("inspection")
    )
      return "Inspection";


    return "Dokumen Pekerjaan";

  },


  /* =====================================================
     LOAD DOCUMENTS
     ===================================================== */

  async loadDocuments(container, source = "all") {

    if (!container) return;

    container.innerHTML = `

      <div class="document-loading">
        Memuat catatan...
      </div>

    `;


    const documents =
      await PAG.Profile.getDocuments();


    let filtered =
      documents;


    if (
      source !== "all"
    ) {

      filtered =
        documents.filter(
          x => x.source === source
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

  renderDocuments(container, documents) {

    if (!documents.length) {

      container.innerHTML = `

        <div class="empty-state">

          <div class="empty-icon">
            📂
          </div>

          <b>
            Belum ada catatan
          </b>

          <span>
            Tidak ada dokumen pada kategori ini.
          </span>

        </div>

      `;

      return;

    }


    container.innerHTML =
      documents
        .map(doc => `

          <div
            class="document-item"
            data-search="
              ${PAG.UI.escape(
                (
                  doc.title +
                  " " +
                  doc.type +
                  " " +
                  doc.createdBy
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
                    <small class="document-date">
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

          </div>

        `)
        .join("");

  },


  /* =====================================================
     SEARCH FILTER
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
      .forEach(item => {

        const text =
          item.dataset.search || "";

        item.style.display =
          !value ||
          text.includes(value)
            ? ""
            : "none";

      });

  },


  /* =====================================================
     ICON
     ===================================================== */

  documentIcon(type) {

    const t =
      String(type)
        .toLowerCase();


    if (t.includes("foto"))
      return "📷";

    if (t.includes("laporan"))
      return "📋";

    if (t.includes("instruksi"))
      return "📢";

    if (t.includes("memo"))
      return "📝";

    if (t.includes("temuan"))
      return "⚠️";

    if (t.includes("rfi"))
      return "❓";

    if (t.includes("inspection"))
      return "🔎";

    if (t.includes("approval"))
      return "✓";

    if (t.includes("signature"))
      return "✍️";

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

    try {

      return new Intl.DateTimeFormat(
        "id-ID",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }
      ).format(
        new Date(value)
      );

    } catch (e) {

      return String(value);

    }

  }

};
