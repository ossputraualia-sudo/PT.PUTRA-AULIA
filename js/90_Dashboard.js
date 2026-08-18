PAG.Dashboard = {

  async render(v) {

    try {

      v.innerHTML = `
        <div class="hero">
          <small>PERSONIL LAPANGAN</small>
          <h2>Memuat...</h2>
          <div>Menyiapkan data proyek</div>
        </div>
      `;


      // ==================================================
      // AUTH
      // ==================================================

      const u =
        await PAG.Auth.ensure();


      if (!u) {

        v.innerHTML = `
          <div class="card">
            <h2>Login diperlukan</h2>
            <p>Nama personil belum diberikan.</p>
          </div>
        `;

        return;

      }


      // ==================================================
      // MASTER WEB UTAMA
      // ==================================================

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


      // ==================================================
      // DASHBOARD
      // ==================================================

      v.innerHTML = `

        <!-- ============================================
             HEADER PERSONIL / PAKET
             ============================================ -->

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


        <!-- ============================================
             MENU UTAMA LAPANGAN
             ============================================ -->

        <div class="grid">


          <!-- ABSENSI -->

          <button
            class="action"
            onclick="PAG.Absensi.start()"
          >

            📍

            <br>

            Absensi

            <br>

            <small>
              Selfie + GPS
            </small>

          </button>


          <!-- LAPORAN -->

          <button
            class="action"
            onclick="PAG.Router.go('report')"
          >

            📋

            <br>

            Laporan Harian

            <br>

            <small>
              Progress & kondisi
            </small>

          </button>


          <!-- RFI -->

          <button
            class="action"
            onclick="PAG.Router.go('rfi')"
          >

            📝

            <br>

            RFI

            <br>

            <small>
              Request for Information
            </small>

          </button>


          <!-- INSPECTION -->

          <button
            class="action"
            onclick="PAG.Router.go('inspection')"
          >

            🔍

            <br>

            Inspection

            <br>

            <small>
              Pemeriksaan lapangan
            </small>

          </button>


          <!-- TEMUAN -->

          <button
            class="action"
            onclick="PAG.Router.go('temuan')"
          >

            ⚠️

            <br>

            Temuan

            <br>

            <small>
              Temuan lapangan
            </small>

          </button>


          <!-- INSTRUKSI -->

          <button
            class="action"
            onclick="PAG.Router.go('instruksi')"
          >

            📢

            <br>

            Instruksi

            <br>

            <small>
              Instruksi pekerjaan
            </small>

          </button>


          <!-- MEMO -->

          <button
            class="action"
            onclick="PAG.Router.go('memo')"
          >

            📄

            <br>

            Memo

            <br>

            <small>
              Memo lapangan
            </small>

          </button>


          <!-- TINDAK LANJUT -->

          <button
            class="action"
            onclick="PAG.Router.go('tindaklanjut')"
          >

            ✅

            <br>

            Tindak Lanjut

            <br>

            <small>
              Penyelesaian temuan
            </small>

          </button>

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
            onclick="PAG.Router.go('home')"
          >
            Coba Lagi
          </button>

        </div>

      `;

    }

  }

};


// ======================================================
// ESCAPE HTML
// ======================================================

function escapeHtml(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}
