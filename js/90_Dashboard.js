PAG.Dashboard = {

  async render(v) {

    try {

      v.innerHTML = `
        <div style="
          padding:20px;
          font-family:system-ui;
        ">
          <h2>PAG Docs Field</h2>
          <p>Memuat Dashboard...</p>
        </div>
      `;


      // ==========================================
      // TEST AUTH
      // ==========================================

      const u =
        await PAG.Auth.ensure();


      if (!u) {

        v.innerHTML = `
          <div style="padding:20px">
            <h2>Login diperlukan</h2>
            <p>Nama personil belum diberikan.</p>
          </div>
        `;

        return;

      }


      // ==========================================
      // TEST MASTER
      // ==========================================

      const m =
        await PAG.WebUtamaSync.getMaster();


      const paket =
        Array.isArray(m?.paket)
          ? m.paket
          : [];


      const p =
        paket[0];


      // ==========================================
      // DASHBOARD
      // ==========================================

      v.innerHTML = `

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


        <div class="grid">

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


          <button
            class="action"
            onclick="PAG.Router.go('report')"
          >
            📋
            <br>
            Laporan Harian
          </button>


          <button
            class="action"
            onclick="PAG.Router.go('photo')"
          >
            📷
            <br>
            Dokumentasi
          </button>


          <button
            class="action"
            onclick="PAG.Router.go('profile')"
          >
            ●
            <br>
            Profil
          </button>

        </div>

      `;


    } catch (error) {

      console.error(
        "DASHBOARD ERROR:",
        error
      );


      v.innerHTML = `

        <div style="
          margin:20px;
          padding:20px;
          border-radius:12px;
          background:#fee2e2;
        ">

          <h3>
            Dashboard gagal dimuat
          </h3>

          <p>
            ${escapeHtml(
              error.message ||
              String(error)
            )}
          </p>

          <small>
            Buka F12 → Console untuk detail.
          </small>

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
