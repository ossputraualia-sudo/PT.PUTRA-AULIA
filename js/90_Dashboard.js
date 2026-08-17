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
      // AUTH
      // ==========================================

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


      // ==========================================
      // MASTER WEB UTAMA
      // ==========================================

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
            👤
            <br>
            Profil
          </button>

        </div>


        <div class="card">

          <h3>Status Sistem</h3>

          <p>
            ${navigator.onLine
              ? "🟢 Online"
              : "🔴 Offline"}
          </p>

          <p>
            Paket:
            <b>
              ${paket.length}
            </b>
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
