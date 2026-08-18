/* =====================================================
   PAG DOCS FIELD
   DASHBOARD
   ===================================================== */

window.PAG = window.PAG || {};

PAG.Dashboard = {

  async render(v) {

    if (!v) {
      console.error("PAG.Dashboard: view tidak ditemukan.");
      return;
    }

    /* ===================================================
       LOADING
       =================================================== */

    v.innerHTML = `
      <div class="card">
        <p>Memuat Dashboard...</p>
      </div>
    `;

    try {

      /* =================================================
         AUTH
         ================================================= */

      let u = null;

      try {

        if (
          PAG.Auth &&
          typeof PAG.Auth.ensure === "function"
        ) {

          u = await PAG.Auth.ensure();

        }

      } catch (error) {

        console.warn(
          "Auth tidak tersedia:",
          error
        );

      }


      /* =================================================
         USER FALLBACK
         ================================================= */

      u = u || {};

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
          "Master tidak tersedia:",
          error
        );

      }


      /* =================================================
         PAKET
         ================================================= */

      const paket =
        Array.isArray(m.paket)
          ? m.paket
          : [];

      const p =
        paket.length
          ? paket[0]
          : null;

      const namaPaket =
        p?.nama ||
        p?.namaPaket ||
        "Paket belum tersinkron";


      /* =================================================
         CONNECTION
         ================================================= */

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
              font-size:22px;
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


          <div
            style="
              font-size:24px;
              color:#94a3b8;
            "
          >
            ›
          </div>

        </a>


        <!-- =============================================
             ACTION GRID
             ============================================= -->

        <div class="grid">


          <!-- ABSENSI -->

          <button
            class="action"
            type="button"
            onclick="PAG.Absensi && PAG.Absensi.start
              ? PAG.Absensi.start()
              : PAG.UI.toast('Modul Absensi belum tersedia')"
          >

            📍

            <br>

            Absensi

            <small>
              Selfie + GPS
            </small>

          </button>


          <!-- LAPORAN -->

          <button
            class="action"
            type="button"
            onclick="PAG.Router.go('report')"
          >

            📋

            <br>

            Laporan Harian

            <small>
              Dokumentasi pekerjaan
            </small>

          </button>


          <!-- NOTIFIKASI -->

          <button
            class="action"
            type="button"
            onclick="PAG.Router.go('notification')"
          >

            🔔

            <br>

            Notifikasi

            <small>
              Informasi pekerjaan
            </small>

          </button>


          <!-- AKTIVITAS -->

          <button
            class="action"
            type="button"
            onclick="PAG.Router.go('activity')"
          >

            ◷

            <br>

            Aktivitas

            <small>
              Riwayat kegiatan
            </small>

          </button>


        </div>


        <!-- =============================================
             STATUS SISTEM
             ============================================= -->

        <div
          class="card"
          style="
            display:flex;
            align-items:center;
            gap:12px;
          "
        >

          <span
            style="
              width:10px;
              height:10px;
              border-radius:50%;
              background:${online ? "#22c55e" : "#ef4444"};
              display:block;
            "
          ></span>


          <div>

            <b
              style="
                font-size:13px;
              "
            >
              ${online ? "Online" : "Offline"}
            </b>

            <div
              style="
                font-size:11px;
                color:#64748b;
                margin-top:2px;
              "
            >
              ${paket.length} paket tersinkron
            </div>

          </div>

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
            onclick="PAG.Router.go('home')"
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
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* =====================================================
   DEBUG
   ===================================================== */

console.log(
  "PAG Dashboard loaded:",
  !!PAG.Dashboard
);
