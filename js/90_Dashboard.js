PAG.Dashboard = {

  /* =====================================================
     DASHBOARD
     ===================================================== */

  async render(v) {

    try {

      /* =================================================
         LOADING
         ================================================= */

      v.innerHTML = `

        <div class="card">

          <p>
            Memuat Dashboard...
          </p>

        </div>

      `;


      /* =================================================
         AUTH
         ================================================= */

      const u =
        await PAG.Auth.ensure();


      if (!u) {

        v.innerHTML = `

          <div class="card">

            <h2>
              Login diperlukan
            </h2>

            <p>
              Data personil belum tersedia.
            </p>

          </div>

        `;

        return;

      }


      /* =================================================
         MASTER WEB UTAMA
         ================================================= */

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
        Array.isArray(
          m?.paket
        )
          ? m.paket
          : [];


      const p =
        paket[0];


      /* =================================================
         DASHBOARD
         ================================================= */

      v.innerHTML = `

        <!-- =========================================
             HERO
             ========================================= -->

        <div class="hero">

          <small>
            PERSONIL LAPANGAN
          </small>

          <h2>
            ${escapeHtml(
              u.name ||
              "Personil"
            )}
          </h2>

          <div>

            ${escapeHtml(
              p?.nama ||
              "Paket belum tersinkron"
            )}

          </div>

        </div>


        <!-- =========================================
             MENU UTAMA
             ========================================= -->

        <div class="grid">


          <!-- ABSENSI -->

          <button
            class="action"
            type="button"
            onclick="PAG.Absensi.start()"
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
              Laporan pekerjaan
            </small>

          </button>


          <!-- RFI -->

          <button
            class="action"
            type="button"
            onclick="PAG.Router.go('rfi')"
          >

            📄

            <br>

            RFI

            <small>
              Request for Information
            </small>

          </button>


          <!-- INSPECTION -->

          <button
            class="action"
            type="button"
            onclick="PAG.Router.go('inspection')"
          >

            🔎

            <br>

            Inspection

            <small>
              Pemeriksaan lapangan
            </small>

          </button>


          <!-- INSTRUKSI -->

          <button
            class="action"
            type="button"
            onclick="PAG.Router.go('instruksi')"
          >

            📢

            <br>

            Instruksi

            <small>
              Instruksi pekerjaan
            </small>

          </button>


          <!-- MEMO -->

          <button
            class="action"
            type="button"
            onclick="PAG.Router.go('memo')"
          >

            📝

            <br>

            Memo

            <small>
              Catatan pekerjaan
            </small>

          </button>


          <!-- TEMUAN -->

          <button
            class="action"
            type="button"
            onclick="PAG.Router.go('temuan')"
          >

            ⚠️

            <br>

            Temuan

            <small>
              Temuan lapangan
            </small>

          </button>


          <!-- TINDAK LANJUT -->

          <button
            class="action"
            type="button"
            onclick="PAG.Router.go('tindaklanjut')"
          >

            ✓

            <br>

            Tindak Lanjut

            <small>
              Penyelesaian temuan
            </small>

          </button>


        </div>


        <!-- =========================================
             INFORMASI PAKET
             ========================================= -->

        <div class="card">

          <h3>
            Paket Pekerjaan
          </h3>

          <p>

            ${escapeHtml(
              p?.nama ||
              "Belum ada paket"
            )}

          </p>

        </div>


      `;


    } catch (error) {

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

  return String(
    value ?? ""
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
