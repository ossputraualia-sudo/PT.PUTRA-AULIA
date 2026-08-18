/* =====================================================
   PAG DOCS FIELD
   DASHBOARD - SEMUA MENU
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
             KATEGORI 1: KEHADIRAN & DOKUMENTASI
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
              onclick="if(PAG.Absensi && PAG.Absensi.start){PAG.Absensi.start();}else{PAG.UI.toast('Modul Absensi belum tersedia');}"
            >
              <span class="action-icon">📍</span>
              <span class="action-label">Absensi</span>
              <small>Selfie + GPS</small>
            </button>

            <!-- DOKUMENTASI -->
            <button
              class="action"
              type="button"
              onclick="PAG.Router.go('photo')"
            >
              <span class="action-icon">📷</span>
              <span class="action-label">Dokumentasi</span>
              <small>Foto Lapangan</small>
            </button>

          </div>

        </div>


        <!-- =============================================
             KATEGORI 2: PELAPORAN
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
              onclick="PAG.Router.go('report')"
            >
              <span class="action-icon">📋</span>
              <span class="action-label">Laporan Harian</span>
              <small>Progress &amp; Kondisi</small>
            </button>

            <!-- RFI -->
            <button
              class="action"
              type="button"
              onclick="PAG.Router.go('rfi')"
            >
              <span class="action-icon">❓</span>
              <span class="action-label">RFI</span>
              <small>Request for Info</small>
            </button>

            <!-- INSPECTION -->
            <button
              class="action"
              type="button"
              onclick="PAG.Router.go('inspection')"
            >
              <span class="action-icon">🔎</span>
              <span class="action-label">Inspection</span>
              <small>Pemeriksaan</small>
            </button>

            <!-- HASIL INSPECTION -->
            <button
              class="action"
              type="button"
              onclick="PAG.Router.go('inspectionResult')"
            >
              <span class="action-icon">📊</span>
              <span class="action-label">Hasil Inspection</span>
              <small>Nilai &amp; Temuan</small>
            </button>

          </div>

        </div>


        <!-- =============================================
             KATEGORI 3: MANAJEMEN PROYEK
             ============================================= -->

        <div class="dashboard-section">

          <h4 class="section-title">
            ⚙️ Manajemen Proyek
          </h4>

          <div class="grid dashboard-grid">

            <!-- INSTRUKSI -->
            <button
              class="action"
              type="button"
              onclick="PAG.Router.go('instruksi')"
            >
              <span class="action-icon">📢</span>
              <span class="action-label">Instruksi</span>
              <small>Perintah Kerja</small>
            </button>

            <!-- MEMO -->
            <button
              class="action"
              type="button"
              onclick="PAG.Router.go('memo')"
            >
              <span class="action-icon">📝</span>
              <span class="action-label">Memo</span>
              <small>Nota Dinas</small>
            </button>

            <!-- TEMUAN -->
            <button
              class="action"
              type="button"
              onclick="PAG.Router.go('temuan')"
            >
              <span class="action-icon">⚠️</span>
              <span class="action-label">Temuan</span>
              <small>Masalah &amp; Deviasi</small>
            </button>

            <!-- TINDAK LANJUT -->
            <button
              class="action"
              type="button"
              onclick="PAG.Router.go('tindaklanjut')"
            >
              <span class="action-icon">🔄</span>
              <span class="action-label">Tindak Lanjut</span>
              <small>Perbaikan &amp; Closure</small>
            </button>

          </div>

        </div>


        <!-- =============================================
             KATEGORI 4: REVISI & PERSETUJUAN
             ============================================= -->

        <div class="dashboard-section">

          <h4 class="section-title">
            ✍️ Revisi &amp; Persetujuan
          </h4>

          <div class="grid dashboard-grid">

            <!-- REVISION -->
            <button
              class="action"
              type="button"
              onclick="PAG.Router.go('revision')"
            >
              <span class="action-icon">📄</span>
              <span class="action-label">Revisi</span>
              <small>Versi Dokumen</small>
            </button>

            <!-- APPROVAL -->
            <button
              class="action"
              type="button"
              onclick="PAG.Router.go('approval')"
            >
              <span class="action-icon">✅</span>
              <span class="action-label">Approval</span>
              <small>Persetujuan</small>
            </button>

            <!-- SIGNATURE -->
            <button
              class="action"
              type="button"
              onclick="PAG.Router.go('signature')"
            >
              <span class="action-icon">✍️</span>
              <span class="action-label">Tanda Tangan</span>
              <small>Digital Signature</small>
            </button>

          </div>

        </div>


        <!-- =============================================
             KATEGORI 5: SISTEM & DOKUMEN
             ============================================= -->

        <div class="dashboard-section">

          <h4 class="section-title">
            🖥️ Sistem &amp; Dokumen
          </h4>

          <div class="grid dashboard-grid">

            <!-- NOTIFIKASI -->
            <button
              class="action"
              type="button"
              onclick="PAG.Router.go('notification')"
            >
              <span class="action-icon">🔔</span>
              <span class="action-label">Notifikasi</span>
              <small>Pemberitahuan</small>
            </button>

            <!-- AKTIVITAS -->
            <button
              class="action"
              type="button"
              onclick="PAG.Router.go('activity')"
            >
              <span class="action-icon">⌛</span>
              <span class="action-label">Aktivitas</span>
              <small>Riwayat</small>
            </button>

            <!-- QR VERIFY -->
            <button
              class="action"
              type="button"
              onclick="PAG.Router.go('qrverify')"
            >
              <span class="action-icon">📱</span>
              <span class="action-label">QR Verify</span>
              <small>Verifikasi Dokumen</small>
            </button>

            <!-- AUDIT LOG -->
            <button
              class="action"
              type="button"
              onclick="PAG.Router.go('auditlog')"
            >
              <span class="action-icon">📜</span>
              <span class="action-label">Audit Log</span>
              <small>Jejak Aktivitas</small>
            </button>

            <!-- GENERATE PDF -->
            <button
              class="action"
              type="button"
              onclick="PAG.Router.go('pdf')"
            >
              <span class="action-icon">📑</span>
              <span class="action-label">Generate PDF</span>
              <small>Cetak Laporan</small>
            </button>

            <!-- PROFIL -->
            <button
              class="action"
              type="button"
              onclick="PAG.Router.go('profile')"
            >
              <span class="action-icon">👤</span>
              <span class="action-label">Profil</span>
              <small>Data Personil</small>
            </button>

          </div>

        </div>


        <!-- =============================================
             STATUS SISTEM
             ============================================= -->

        <div
          class="card"
          style="
            display:flex;
            align-items:center;
            justify-content:space-between;
            flex-wrap:wrap;
            gap:8px;
          "
        >

          <div
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


          <button
            class="btn"
            type="button"
            style="
              padding:6px 14px;
              font-size:12px;
            "
            onclick="
              (async function(){
                try {
                  await PAG.WebUtamaSync.pull();
                  await PAG.OfflineSync.run();
                  PAG.UI.toast('Sinkronisasi selesai');
                  PAG.Router.go('home');
                } catch(e) {
                  PAG.UI.toast('Sinkronisasi gagal');
                }
              })()
            "
          >
            🔄 Sinkron Sekarang
          </button>

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
