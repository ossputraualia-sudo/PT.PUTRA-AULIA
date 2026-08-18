/* =====================================================
   PAG DOCS FIELD
   DASHBOARD / BERANDA
   SIMPLE MOBILE
   ===================================================== */

window.PAG = window.PAG || {};

PAG.Dashboard = {

  async render(v) {

    if (!v) {
      console.error(
        "PAG.Dashboard: #view tidak ditemukan."
      );
      return;
    }


    /* ===================================================
       LOADING
       =================================================== */

    v.innerHTML = `
      <div class="card">
        <p>Memuat beranda...</p>
      </div>
    `;


    try {

      /* =================================================
         AUTH
         ================================================= */

      let user = {};

      try {

        if (
          PAG.Auth &&
          typeof PAG.Auth.ensure === "function"
        ) {

          user =
            await PAG.Auth.ensure() || {};

        }

      } catch (e) {

        console.warn(
          "Dashboard Auth:",
          e
        );

      }


      /* =================================================
         USER
         ================================================= */

      const userName =
        user.name ||
        user.nama ||
        user.displayName ||
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

      } catch (e) {

        console.warn(
          "Dashboard Master:",
          e
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
          : {};


      const namaPaket =
        paket.nama ||
        paket.namaPaket ||
        master.namaPaket ||
        "Paket belum tersinkron";


      /* =================================================
         STATUS
         ================================================= */

      const online =
        navigator.onLine;


      /* =================================================
         RENDER
         ================================================= */

      v.innerHTML = `

        <!-- =================================================
             SAPAAN
             ================================================= -->

        <section class="hero">

          <small>
            PAG DOCS FIELD
          </small>

          <h2>
            Selamat Datang
          </h2>

          <div>
            ${escapeDashboard(userName)}
          </div>

        </section>


        <!-- =================================================
             PAKET AKTIF
             ================================================= -->

        <div class="card dashboard-project">

          <div class="dashboard-card-icon">
            📁
          </div>

          <div class="dashboard-card-content">

            <small>
              PAKET AKTIF
            </small>

            <h3>
              ${escapeDashboard(namaPaket)}
            </h3>

          </div>

        </div>


        <!-- =================================================
             SOP
             ================================================= -->

        <a
          href="https://drive.google.com/drive/folders/17D9uxcnayGFmWLk5mX0C-fckW2Cc5RJu?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          class="card dashboard-link-card"
        >

          <div class="dashboard-card-icon sop-icon">
            📘
          </div>

          <div class="dashboard-card-content">

            <h3>
              SOP Pekerjaan
            </h3>

            <p>
              Standar Operasional Prosedur
            </p>

          </div>

          <span class="dashboard-arrow">
            ›
          </span>

        </a>


        <!-- =================================================
             AKSI UTAMA
             ================================================= -->

        <div class="dashboard-section">

          <h4 class="section-title">
            Kegiatan Lapangan
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
                Selfie & GPS
              </small>

            </button>


            <!-- LAPORAN -->

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
                Kegiatan pekerjaan
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
                Foto lapangan
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
                Pemeriksaan pekerjaan
              </small>

            </button>


          </div>

        </div>


        <!-- =================================================
             INFORMASI PEKERJAAN
             ================================================= -->

        <div class="dashboard-section">

          <h4 class="section-title">
            Dokumen & Informasi
          </h4>


          <div class="grid dashboard-grid">


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
                Perintah pekerjaan
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
                ⚠
              </span>

              <span class="action-label">
                Temuan
              </span>

              <small>
                Masalah & deviasi
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
                ↻
              </span>

              <span class="action-label">
                Tindak Lanjut
              </span>

              <small>
                Penyelesaian temuan
              </small>

            </button>


          </div>

        </div>


        <!-- =================================================
             NOTIFIKASI RINGKAS
             ================================================= -->

        <div class="card dashboard-notification">

          <div class="dashboard-card-icon">
            🔔
          </div>

          <div class="dashboard-card-content">

            <h3>
              Notifikasi
            </h3>

            <p>
              Periksa pemberitahuan terbaru
            </p>

          </div>

          <button
            type="button"
            class="dashboard-mini-button"
            onclick="
              PAG.Router.go('notification')
            "
          >
            Lihat
          </button>

        </div>


        <!-- =================================================
             STATUS SISTEM
             ================================================= -->

        <div class="dashboard-status">

          <span
            class="
              dashboard-status-dot
              ${online ? "" : "offline"}
            "
          ></span>

          <span>
            ${online ? "Online" : "Offline"}
          </span>

        </div>


      `;


      /* ===================================================
         UPDATE STATUS GLOBAL
         =================================================== */

      if (
        PAG.UI &&
        typeof PAG.UI.updateConnectionStatus === "function"
      ) {

        PAG.UI.updateConnectionStatus();

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
            ${escapeDashboard(
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

function escapeDashboard(value) {

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
