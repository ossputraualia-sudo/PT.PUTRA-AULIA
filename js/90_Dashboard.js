```javascript
/* =====================================================
   PAG DOCS FIELD
   DASHBOARD
   VERSI SEDERHANA / MOBILE FIRST
   ===================================================== */

window.PAG = window.PAG || {};

PAG.Dashboard = {

  async render(v) {

    if (!v) {
      console.error(
        "PAG.Dashboard: view tidak ditemukan."
      );
      return;
    }


    /* ===================================================
       LOADING
       =================================================== */

    v.innerHTML = `

      <div class="card">

        <p>
          Memuat Beranda...
        </p>

      </div>

    `;


    try {

      /* =================================================
         AUTH
         ================================================= */

      let u = {};

      try {

        if (
          PAG.Auth &&
          typeof PAG.Auth.ensure === "function"
        ) {

          u =
            await PAG.Auth.ensure() || {};

        }

      } catch (error) {

        console.warn(
          "Auth tidak tersedia:",
          error
        );

      }


      /* =================================================
         USER
         ================================================= */

      const userName =
        u.name ||
        u.nama ||
        u.namaPersonil ||
        "Personil Lapangan";


      const userRole =
        u.role ||
        u.jabatan ||
        "Personil Lapangan";


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
          "Master tidak tersedia:",
          error
        );

      }


      /* =================================================
         PAKET
         ================================================= */

      const paketList =
        Array.isArray(master.paket)
          ? master.paket
          : [];


      const paket =
        paketList.length
          ? paketList[0]
          : null;


      const namaPaket =
        paket?.nama ||
        paket?.namaPaket ||
        "Paket belum tersinkron";


      /* =================================================
         CONNECTION
         ================================================= */

      const online =
        navigator.onLine;


      /* =================================================
         RENDER
         ================================================= */

      v.innerHTML = `


        <!-- =============================================
             HERO
             ============================================= -->

        <div class="hero">

          <small>
            PAG DOCS FIELD
          </small>

          <h2>
            ${escapeHtml(userName)}
          </h2>

          <div>
            ${escapeHtml(namaPaket)}
          </div>

        </div>


        <!-- =============================================
             SOP
             ============================================= -->

        <a
          href="https://drive.google.com/drive/folders/17D9uxcnayGFmWLk5mX0C-fckW2Cc5RJu?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          class="sop-card"
        >

          <div class="sop-card-icon">
            📘
          </div>

          <div class="sop-card-content">

            <span class="sop-card-title">
              SOP Pekerjaan
            </span>

            <span class="sop-card-description">
              Standar Operasional Prosedur
            </span>

          </div>

          <div class="sop-card-arrow">
            ›
          </div>

        </a>


        <!-- =============================================
             KEHADIRAN & DOKUMENTASI
             ============================================= -->

        <div class="dashboard-section">

          <h4 class="section-title">
            📍 Kehadiran & Dokumentasi
          </h4>


          <div class="grid dashboard-grid">


            <!-- ABSENSI -->

            <button
              class="action"
              type="button"
              onclick="
                if (
                  PAG.Absensi &&
                  typeof PAG.Absensi.start === 'function'
                ) {

                  PAG.Absensi.start();

                } else {

                  PAG.UI.toast(
                    'Modul Absensi belum tersedia'
                  );

                }
              "
            >

              <span class="action-icon">
                📍
              </span>

              <span class="action-label">
                Absensi
              </span>

              <small>
                Selfie + GPS
              </small>

            </button>


            <!-- DOKUMENTASI -->

            <button
              class="action"
              type="button"
              onclick="
                PAG.Router.go('photo')
              "
            >

              <span class="action-icon">
                📷
              </span>

              <span class="action-label">
                Dokumentasi
              </span>

              <small>
                Foto Lapangan
              </small>

            </button>


          </div>

        </div>


        <!-- =============================================
             PELAPORAN
             ============================================= -->

        <div class="dashboard-section">

          <h4 class="section-title">
            📋 Pelaporan
          </h4>


          <div class="grid dashboard-grid">


            <!-- LAPORAN HARIAN -->

            <button
              class="action"
              type="button"
              onclick="
                PAG.Router.go('report')
              "
            >

              <span class="action-icon">
                📋
              </span>

              <span class="action-label">
                Laporan Harian
              </span>

              <small>
                Progress & Kondisi
              </small>

            </button>


            <!-- RFI -->

            <button
              class="action"
              type="button"
              onclick="
                PAG.Router.go('rfi')
              "
            >

              <span class="action-icon">
                ❓
              </span>

              <span class="action-label">
                RFI
              </span>

              <small>
                Request for Information
              </small>

            </button>


            <!-- INSPECTION -->

            <button
              class="action"
              type="button"
              onclick="
                PAG.Router.go('inspection')
              "
            >

              <span class="action-icon">
                🔎
              </span>

              <span class="action-label">
                Inspection
              </span>

              <small>
                Pemeriksaan
              </small>

            </button>


            <!-- HASIL INSPECTION -->

            <button
              class="action"
              type="button"
              onclick="
                PAG.Router.go('inspectionResult')
              "
            >

              <span class="action-icon">
                📊
              </span>

              <span class="action-label">
                Hasil Inspection
              </span>

              <small>
                Hasil & Temuan
              </small>

            </button>


          </div>

        </div>


        <!-- =============================================
             MANAJEMEN PEKERJAAN
             ============================================= -->

        <div class="dashboard-section">

          <h4 class="section-title">
            ⚙️ Manajemen Pekerjaan
          </h4>


          <div class="grid dashboard-grid">


            <!-- INSTRUKSI -->

            <button
              class="action"
              type="button"
              onclick="
                PAG.Router.go('instruksi')
              "
            >

              <span class="action-icon">
                📢
              </span>

              <span class="action-label">
                Instruksi
              </span>

              <small>
                Perintah Kerja
              </small>

            </button>


            <!-- MEMO -->

            <button
              class="action"
              type="button"
              onclick="
                PAG.Router.go('memo')
              "
            >

              <span class="action-icon">
                📝
              </span>

              <span class="action-label">
                Memo
              </span>

              <small>
                Nota Dinas
              </small>

            </button>


            <!-- TEMUAN -->

            <button
              class="action"
              type="button"
              onclick="
                PAG.Router.go('temuan')
              "
            >

              <span class="action-icon">
                ⚠️
              </span>

              <span class="action-label">
                Temuan
              </span>

              <small>
                Masalah & Deviasi
              </small>

            </button>


            <!-- TINDAK LANJUT -->

            <button
              class="action"
              type="button"
              onclick="
                PAG.Router.go('tindaklanjut')
              "
            >

              <span class="action-icon">
                🔄
              </span>

              <span class="action-label">
                Tindak Lanjut
              </span>

              <small>
                Perbaikan & Closure
              </small>

            </button>


          </div>

        </div>


        <!-- =============================================
             STATUS SINKRONISASI
             ============================================= -->

        <div class="card">

          <div class="sync-status-row">

            <div>

              <b>
                Sinkronisasi Data
              </b>

              <small>
                ${paketList.length}
                paket tersimpan
              </small>

            </div>


            <span
              class="
                sync-indicator
                ${online ? "online" : "offline"}
              "
            >

              ${online ? "ONLINE" : "OFFLINE"}

            </span>

          </div>


          <button
            class="btn"
            type="button"
            id="dashboardSyncBtn"
          >

            🔄 Sinkron Sekarang

          </button>

        </div>


      `;


      /* =================================================
         SYNC BUTTON
         ================================================= */

      const syncBtn =
        document.getElementById(
          "dashboardSyncBtn"
        );


      if (syncBtn) {

        syncBtn.addEventListener(
          "click",
          async function () {

            try {

              syncBtn.disabled = true;

              syncBtn.textContent =
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


              if (
                PAG.UI &&
                typeof PAG.UI.toast === "function"
              ) {

                PAG.UI.toast(
                  "Sinkronisasi selesai"
                );

              }


              syncBtn.textContent =
                "✅ Sinkron Selesai";


              setTimeout(
                function () {

                  syncBtn.disabled = false;

                  syncBtn.textContent =
                    "🔄 Sinkron Sekarang";

                },
                1800
              );


            } catch (error) {

              console.error(
                "Dashboard sync error:",
                error
              );


              if (
                PAG.UI &&
                typeof PAG.UI.toast === "function"
              ) {

                PAG.UI.toast(
                  "Sinkronisasi gagal"
                );

              }


              syncBtn.disabled = false;

              syncBtn.textContent =
                "🔄 Coba Sinkron Lagi";

            }

          }
        );

      }


    } catch (error) {

      console.error(
        "PAG Dashboard Error:",
        error
      );


      v.innerHTML = `

        <div class="card">

          <h3>
            Beranda gagal dimuat
          </h3>

          <p>
            ${escapeHtml(
              error?.message ||
              String(error)
            )}
          </p>

          <button
            class="btn"
            type="button"
            onclick="
              PAG.Router.go('home')
            "
          >

            Coba Lagi

          </button>

        </div>

      `;

    }

  }

};


/* =====================================================
   ESCAPE HTML
   ===================================================== */

function escapeHtml(value) {

  return String(value ?? "")

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


/* =====================================================
   DEBUG
   ===================================================== */

console.log(
  "PAG Dashboard loaded:",
  !!PAG.Dashboard
);
```
