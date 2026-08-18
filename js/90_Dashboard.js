/* =====================================================
   PAG DOCS FIELD
   DASHBOARD
   Versi sederhana - Mobile First
   ===================================================== */

window.PAG = window.PAG || {};

PAG.Dashboard = {

  async render(v) {

    if (!v) {
      console.error("PAG.Dashboard: view tidak ditemukan.");
      return;
    }

    /* ===================================================
       DEFAULT
       =================================================== */

    var userName = "Personil Lapangan";
    var namaPaket = "Paket belum tersinkron";
    var online = navigator.onLine;

    /* ===================================================
       AMBIL USER
       GAGAL BACKEND TIDAK BOLEH MEMBUAT DASHBOARD MATI
       =================================================== */

    try {

      if (
        PAG.Auth &&
        typeof PAG.Auth.ensure === "function"
      ) {

        var u = await PAG.Auth.ensure();

        if (u) {

          userName =
            u.name ||
            u.nama ||
            u.namaPersonil ||
            userName;

        }

      }

    } catch (error) {

      console.warn(
        "Dashboard: Auth tidak tersedia.",
        error
      );

    }

    /* ===================================================
       AMBIL MASTER
       =================================================== */

    try {

      if (
        PAG.WebUtamaSync &&
        typeof PAG.WebUtamaSync.getMaster === "function"
      ) {

        var master =
          await PAG.WebUtamaSync.getMaster();

        if (master) {

          var paket =
            Array.isArray(master.paket)
              ? master.paket
              : [];

          if (paket.length > 0) {

            var p = paket[0];

            namaPaket =
              p.nama ||
              p.namaPaket ||
              p.paket ||
              namaPaket;

          }

        }

      }

    } catch (error) {

      console.warn(
        "Dashboard: Master tidak tersedia.",
        error
      );

    }

    /* ===================================================
       RENDER
       =================================================== */

    v.innerHTML = `

      <!-- ===============================================
           HERO
           =============================================== -->

      <section class="hero dashboard-hero">

        <small>
          PAG DOCS FIELD
        </small>

        <h2>
          ${dashboardEscape(userName)}
        </h2>

        <div>
          ${dashboardEscape(namaPaket)}
        </div>

      </section>


      <!-- ===============================================
           SOP
           =============================================== -->

      <a
        class="card dashboard-sop"
        href="https://drive.google.com/drive/folders/17D9uxcnayGFmWLk5mX0C-fckW2Cc5RJu?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
      >

        <div class="dashboard-sop-icon">
          📘
        </div>

        <div class="dashboard-sop-content">

          <h3>
            SOP Pekerjaan
          </h3>

          <p>
            Standar Operasional Prosedur
          </p>

          <small>
            Buka dokumen SOP
          </small>

        </div>

        <div class="dashboard-arrow">
          ›
        </div>

      </a>


      <!-- ===============================================
           KEGIATAN LAPANGAN
           =============================================== -->

      <section class="dashboard-section">

        <h4 class="section-title">
          Kegiatan Lapangan
        </h4>

        <div class="grid dashboard-grid">

          <!-- ABSENSI -->

          <button
            type="button"
            class="action dashboard-action"
            id="dashboardAbsensi"
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
            type="button"
            class="action dashboard-action"
            id="dashboardDokumentasi"
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

      </section>


      <!-- ===============================================
           PELAPORAN
           =============================================== -->

      <section class="dashboard-section">

        <h4 class="section-title">
          Pelaporan
        </h4>

        <div class="grid dashboard-grid">

          <!-- LAPORAN HARIAN -->

          <button
            type="button"
            class="action dashboard-action"
            id="dashboardReport"
          >

            <span class="action-icon">
              📋
            </span>

            <span class="action-label">
              Laporan Harian
            </span>

            <small>
              Kegiatan & progress
            </small>

          </button>


          <!-- INSPECTION -->

          <button
            type="button"
            class="action dashboard-action"
            id="dashboardInspection"
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


          <!-- RFI -->

          <button
            type="button"
            class="action dashboard-action"
            id="dashboardRfi"
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

        </div>

      </section>


      <!-- ===============================================
           STATUS
           =============================================== -->

      <section class="card dashboard-status">

        <div class="dashboard-status-left">

          <span
            class="dashboard-status-dot ${online ? "online" : "offline"}"
          ></span>

          <div>

            <b>
              ${online ? "Online" : "Offline"}
            </b>

            <small>
              ${online
                ? "Siap melakukan sinkronisasi"
                : "Data akan disimpan di perangkat"
              }
            </small>

          </div>

        </div>

        <button
          type="button"
          class="dashboard-sync-button"
          id="dashboardSync"
        >
          ↻
        </button>

      </section>

    `;


    /* ===================================================
       EVENT ABSENSI
       =================================================== */

    var absensiBtn =
      document.getElementById("dashboardAbsensi");

    if (absensiBtn) {

      absensiBtn.addEventListener(
        "click",
        function () {

          try {

            if (
              PAG.Absensi &&
              typeof PAG.Absensi.start === "function"
            ) {

              PAG.Absensi.start();

            } else {

              dashboardToast(
                "Modul Absensi belum tersedia"
              );

            }

          } catch (error) {

            console.error(
              "Absensi:",
              error
            );

            dashboardToast(
              "Absensi tidak dapat dibuka"
            );

          }

        }
      );

    }


    /* ===================================================
       DOKUMENTASI
       =================================================== */

    var dokumentasiBtn =
      document.getElementById(
        "dashboardDokumentasi"
      );

    if (dokumentasiBtn) {

      dokumentasiBtn.addEventListener(
        "click",
        function () {

          dashboardGo("photo");

        }
      );

    }


    /* ===================================================
       LAPORAN
       =================================================== */

    var reportBtn =
      document.getElementById(
        "dashboardReport"
      );

    if (reportBtn) {

      reportBtn.addEventListener(
        "click",
        function () {

          dashboardGo("report");

        }
      );

    }


    /* ===================================================
       INSPECTION
       =================================================== */

    var inspectionBtn =
      document.getElementById(
        "dashboardInspection"
      );

    if (inspectionBtn) {

      inspectionBtn.addEventListener(
        "click",
        function () {

          dashboardGo("inspection");

        }
      );

    }


    /* ===================================================
       RFI
       =================================================== */

    var rfiBtn =
      document.getElementById(
        "dashboardRfi"
      );

    if (rfiBtn) {

      rfiBtn.addEventListener(
        "click",
        function () {

          dashboardGo("rfi");

        }
      );

    }


    /* ===================================================
       SYNC
       =================================================== */

    var syncBtn =
      document.getElementById(
        "dashboardSync"
      );

    if (syncBtn) {

      syncBtn.addEventListener(
        "click",
        async function () {

          syncBtn.disabled = true;
          syncBtn.textContent = "⏳";

          try {

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

            dashboardToast(
              "Sinkronisasi selesai"
            );

          } catch (error) {

            console.error(
              "Dashboard Sync:",
              error
            );

            dashboardToast(
              "Sinkronisasi gagal"
            );

          } finally {

            syncBtn.disabled = false;
            syncBtn.textContent = "↻";

          }

        }
      );

    }

  }

};


/* =====================================================
   ROUTER HELPER
   ===================================================== */

function dashboardGo(route) {

  try {

    if (
      PAG.Router &&
      typeof PAG.Router.go === "function"
    ) {

      PAG.Router.go(route);

    } else {

      dashboardToast(
        "Modul belum tersedia: " + route
      );

    }

  } catch (error) {

    console.error(
      "Dashboard Router:",
      error
    );

    dashboardToast(
      "Tidak dapat membuka modul"
    );

  }

}


/* =====================================================
   TOAST
   ===================================================== */

function dashboardToast(message) {

  try {

    if (
      PAG.UI &&
      typeof PAG.UI.toast === "function"
    ) {

      PAG.UI.toast(message);
      return;

    }

  } catch (error) {

    console.warn(error);

  }

  var toast =
    document.getElementById("toast");

  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.style.display = "block";

  setTimeout(
    function () {

      toast.style.display = "none";

    },
    2500
  );

}


/* =====================================================
   ESCAPE
   ===================================================== */

function dashboardEscape(value) {

  return String(value || "")
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
