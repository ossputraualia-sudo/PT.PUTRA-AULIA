```javascript
PAG.Dashboard = {

  async render(v) {

    try {

      /* =====================================================
         LOADING
         ===================================================== */

      v.innerHTML = `
        <div class="card">
          <p>Memuat Dashboard...</p>
        </div>
      `;


      /* =====================================================
         AUTH
         ===================================================== */

      const u =
        await PAG.Auth.ensure();


      if (!u) {

        v.innerHTML = `
          <div class="card">

            <h2>Login diperlukan</h2>

            <p>
              Nama personil belum diberikan.
            </p>

          </div>
        `;

        return;

      }


      /* =====================================================
         MASTER WEB UTAMA
         ===================================================== */

      let m = {};

      try {

        m =
          await PAG.WebUtamaSync.getMaster();

      } catch (error) {

        console.warn(
          "Master tidak tersedia:",
          error
        );

      }


      const paket =
        Array.isArray(m?.paket)
          ? m.paket
          : [];


      const p =
        paket[0];


      /* =====================================================
         DASHBOARD
         ===================================================== */

      v.innerHTML = `

        <!-- =================================================
             HERO
             ================================================= -->

        <div class="hero">

          <small>
            PERSONIL LAPANGAN
          </small>

          <h2>
            ${escapeHtml(u.name)}
          </h2>

          <div>
            ${escapeHtml(
              p?.nama ||
              "Paket belum tersinkron"
            )}
          </div>

        </div>


        <!-- =================================================
             SOP
             ================================================= -->

        <a
          class="card sop-home-card"
          href="https://drive.google.com/drive/folders/17D9uxcnayGFmWLk5mX0C-fckW2Cc5RJu?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          style="
            text-decoration:none;
            color:inherit;
            display:flex;
            align-items:center;
            gap:13px;
            cursor:pointer;
          "
        >

          <div class="sop-home-icon">
            📘
          </div>

          <div class="sop-home-content">

            <b>
              SOP Pekerjaan
            </b>

            <span>
              Standar Operasional Prosedur
            </span>

          </div>

          <div class="sop-home-arrow">
            ›
          </div>

        </a>


        <!-- =================================================
             ACTION MENU
             ================================================= -->

        <div class="grid">


          <!-- ABSENSI -->

          <button
            type="button"
            class="action"
            onclick="PAG.Absensi.start()"
          >

            <div style="
              font-size:28px;
              margin-bottom:8px;
            ">
              📍
            </div>

            <div>
              Absensi
            </div>

            <small>
              Selfie + GPS
            </small>

          </button>


          <!-- LAPORAN -->

          <button
            type="button"
            class="action"
            onclick="PAG.Router.go('report')"
          >

            <div style="
              font-size:28px;
              margin-bottom:8px;
            ">
              📋
            </div>

            <div>
              Laporan Harian
            </div>

            <small>
              Catatan pekerjaan
            </small>

          </button>


          <!-- PEMERIKSAAN -->

          <button
            type="button"
            class="action"
            onclick="PAG.Router.go('inspection')"
          >

            <div style="
              font-size:28px;
              margin-bottom:8px;
            ">
              🔎
            </div>

            <div>
              Pemeriksaan
            </div>

            <small>
              Inspection & checklist
            </small>

          </button>


          <!-- AKTIVITAS -->

          <button
            type="button"
            class="action"
            onclick="PAG.Router.go('activity')"
          >

            <div style="
              font-size:28px;
              margin-bottom:8px;
            ">
              📝
            </div>

            <div>
              Aktivitas
            </div>

            <small>
              Riwayat pekerjaan
            </small>

          </button>


        </div>


        <!-- =================================================
             STATUS SISTEM
             ================================================= -->

        <div
          class="card"
          style="
            padding:13px 15px;
          "
        >

          <div style="
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:10px;
          ">

            <div>

              <div style="
                font-size:12px;
                font-weight:700;
                color:#334155;
              ">
                Status Sistem
              </div>

              <div style="
                margin-top:4px;
                font-size:11px;
                color:#64748b;
              ">

                ${
                  navigator.onLine
                    ? "🟢 Online"
                    : "🔴 Offline"
                }

              </div>

            </div>


            <div style="
              font-size:11px;
              color:#64748b;
              text-align:right;
            ">

              Paket

              <b style="
                color:#0f172a;
                font-size:14px;
              ">
                ${paket.length}
              </b>

            </div>

          </div>

        </div>

      `;


    } catch (error) {

      /* =====================================================
         ERROR
         ===================================================== */

      console.error(
        "DASHBOARD ERROR:",
        error
      );


      v.innerHTML = `

        <div class="card">

          <h3>
            Dashboard gagal dimuat
          </h3>

          <p>
            ${escapeHtml(
              error.message ||
              String(error)
            )}
          </p>

          <button
            type="button"
            class="btn"
            onclick="PAG.Router.go('home')"
          >
            Coba Lagi
          </button>

        </div>

      `;

    }

  }

};


/* =========================================================
   ESCAPE HTML
   ========================================================= */

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
```
