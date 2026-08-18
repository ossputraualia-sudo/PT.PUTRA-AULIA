```javascript
/* =====================================================
   PAG DOCS FIELD
   DASHBOARD
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


    /* =================================================
       LOADING
       ================================================= */

    v.innerHTML = `
      <div class="card">
        <p>Memuat Dashboard...</p>
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
          "Auth:",
          error
        );

      }


      const userName =
        u.name ||
        u.nama ||
        "Personil Lapangan";


      /* =================================================
         MASTER
         ================================================= */

      let m = {};

      try {

        if (
          PAG.WebUtamaSync &&
          typeof PAG.WebUtamaSync.getMaster === "function"
        ) {

          m =
            await PAG.WebUtamaSync.getMaster() || {};

        }

      } catch (error) {

        console.warn(
          "Master:",
          error
        );

      }


      const paket =
        Array.isArray(m.paket)
          ? m.paket
          : [];


      const p =
        paket[0] || {};


      const namaPaket =
        p.nama ||
        p.namaPaket ||
        "Paket belum tersinkron";


      const online =
        navigator.onLine;


      /* =================================================
         DASHBOARD
         ================================================= */

      v.innerHTML = `


        <!-- =============================================
             HERO
             ============================================= -->

        <div class="hero">

          <small>
            PERSONIL LAPANGAN
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
          class="card sop-card"
          style="
            display:flex;
            align-items:center;
            gap:14px;
            text-decoration:none;
            color:inherit;
            cursor:pointer;
          "
        >

          <div
            style="
              width:46px;
              height:46px;
              min-width:46px;
              display:flex;
              align-items:center;
              justify-content:center;
              border-radius:14px;
              background:#e0f2fe;
              font-size:21px;
            "
          >
            📘
          </div>


          <div style="flex:1">

            <h3
              style="
                margin:0;
                font-size:15px;
              "
            >
              SOP Pekerjaan
            </h3>

            <p
              style="
                margin:5px 0 0;
                font-size:11px;
                color:#64748b;
              "
            >
              Standar Operasional Prosedur
            </p>

          </div>


          <span
            style="
              font-size:22px;
              color:#94a3b8;
            "
          >
            ›
          </span>

        </a>


        <!-- =============================================
             PEKERJAAN UTAMA
             ============================================= -->

        <div class="dashboard-section">

          <h4 class="section-title">
            Pekerjaan Utama
          </h4>


          <div class="grid dashboard-grid">


            <!-- ABSENSI -->

            <button
              class="action"
              type="button"
              onclick="
                if (
                  PAG.Absensi &&
                  PAG.Absensi.start
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
                Catatan pekerjaan
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


          </div>

        </div>


        <!-- =============================================
             KOMUNIKASI
             ============================================= -->

        <div class="dashboard-section">

          <h4 class="section-title">
            Komunikasi
          </h4>


          <div class="grid dashboard-grid">


            <!-- NOTIFIKASI -->

            <button
              class="action"
              type="button"
              onclick="
                PAG.Router.go('notification')
              "
            >

              <span class="action-icon">
                🔔
              </span>

              <span class="action-label">
                Notifikasi
              </span>

              <small>
                Pemberitahuan
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
                Informasi pekerjaan
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
                Masalah lapangan
              </small>

            </button>


          </div>

        </div>


        <!-- =============================================
             STATUS
             ============================================= -->

        <div
          class="card system-status"
          style="
            display:flex;
            align-items:center;
            gap:10px;
          "
        >

          <span
            style="
              width:9px;
              height:9px;
              border-radius:50%;
              background:
                ${online
                  ? "#22c55e"
                  : "#ef4444"};
            "
          ></span>


          <span
            style="
              font-size:12px;
              font-weight:600;
            "
          >
            ${online
              ? "Online"
              : "Offline"}
          </span>


          <span
            style="
              font-size:11px;
              color:#94a3b8;
            "
          >
            • ${paket.length} paket
          </span>

        </div>


      `;


    } catch (error) {

      console.error(
        "PAG Dashboard Error:",
        error
      );


      v.innerHTML = `

        <div class="card">

          <h3>
            Dashboard gagal dimuat
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


console.log(
  "PAG Dashboard loaded:",
  !!PAG.Dashboard
);
```
