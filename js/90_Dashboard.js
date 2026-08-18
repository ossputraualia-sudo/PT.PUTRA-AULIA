/* =====================================================
   PAG DOCS FIELD
   90_Dashboard.js
   DASHBOARD STABLE
   ===================================================== */

window.PAG = window.PAG || {};

PAG.Dashboard = {

  async render(v) {

    if (!v) {
      console.error("PAG.Dashboard: view tidak ditemukan.");
      return;
    }

    var userName = "Personil Lapangan";
    var namaPaket = "Paket belum tersinkron";
    var online = navigator.onLine;

    /* ===================================================
       USER
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
            u.displayName ||
            userName;

        }

      }

    } catch (error) {

      console.warn(
        "Dashboard Auth:",
        error
      );

    }


    /* ===================================================
       MASTER
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

          if (paket.length) {

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
        "Dashboard Master:",
        error
      );

    }


    /* ===================================================
       HTML
       =================================================== */

    v.innerHTML = `

      <section class="hero dashboard-hero">

        <small>PAG DOCS FIELD</small>

        <h2>
          ${dashboardEscape(userName)}
        </h2>

        <div>
          ${dashboardEscape(namaPaket)}
        </div>

      </section>


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


      <section class="dashboard-section">

        <h4 class="section-title">
          Kegiatan Lapangan
        </h4>

        <div class="grid dashboard-grid">

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


      <section class="dashboard-section">

        <h4 class="section-title">
          Pelaporan
        </h4>

        <div class="grid dashboard-grid">

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


      <section class="card dashboard-status">

        <div class="dashboard-status-left">

          <span
            class="dashboard-status-dot ${
              online ? "online" : "offline"
            }"
          ></span>

          <div>

            <b>
              ${online ? "Online" : "Offline"}
            </b>

            <small>
              ${
                online
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
       ABSENSI
       =================================================== */

    bindDashboardButton(
      "dashboardAbsensi",
      function () {

        if (
          PAG.Absensi &&
          typeof PAG.Absensi.start === "function"
        ) {

          PAG.Absensi.start();
          return;

        }

        dashboardToast(
          "Modul Absensi belum tersedia"
        );

      }
    );


    /* ===================================================
       DOKUMENTASI
       =================================================== */

    bindDashboardButton(
      "dashboardDokumentasi",
      function () {

        dashboardOpenModule(
          "photo",
          [
            "GPSPhoto",
            "Dokumentasi",
            "Photo",
            "DokumentasiLapangan"
          ]
        );

      }
    );


    /* ===================================================
       LAPORAN
       =================================================== */

    bindDashboardButton(
      "dashboardReport",
      function () {

        dashboardOpenModule(
          "report",
          [
            "LaporanHarian"
          ]
        );

      }
    );


    /* ===================================================
       INSPECTION
       =================================================== */

    bindDashboardButton(
      "dashboardInspection",
      function () {

        dashboardOpenModule(
          "inspection",
          [
            "Inspection"
          ]
        );

      }
    );


    /* ===================================================
       RFI
       =================================================== */

    bindDashboardButton(
      "dashboardRfi",
      function () {

        dashboardOpenModule(
          "rfi",
          [
            "RFI"
          ]
        );

      }
    );


    /* ===================================================
       SYNC
       =================================================== */

    bindDashboardButton(
      "dashboardSync",
      async function (button) {

        button.disabled = true;
        button.textContent = "⏳";

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

          button.disabled = false;
          button.textContent = "↻";

        }

      }
    );

  }

};


/* =====================================================
   BIND BUTTON
   ===================================================== */

function bindDashboardButton(id, handler) {

  var button =
    document.getElementById(id);

  if (!button) {
    return;
  }

  button.addEventListener(
    "click",
    async function () {

      try {

        await handler(button);

      } catch (error) {

        console.error(
          "Dashboard button:",
          id,
          error
        );

        dashboardToast(
          "Modul tidak dapat dibuka"
        );

      }

    }
  );

}


/* =====================================================
   OPEN MODULE
   ===================================================== */

function dashboardOpenModule(route, names) {

  /* ---------------------------------------------------
     1. ROUTER UTAMA
     --------------------------------------------------- */

  try {

    if (
      PAG.Router &&
      typeof PAG.Router.go === "function"
    ) {

      var result =
        PAG.Router.go(route);

      /*
       * Jangan langsung menganggap gagal.
       * Router bisa bekerja async atau tanpa return.
       */
      if (
        result &&
        typeof result.then === "function"
      ) {

        result.catch(function (error) {

          console.warn(
            "Router async:",
            error
          );

        });

      }

      return;

    }

  } catch (error) {

    console.warn(
      "Router:",
      error
    );

  }


  /* ---------------------------------------------------
     2. CARI RENDERER LANGSUNG
     --------------------------------------------------- */

  names =
    Array.isArray(names)
      ? names
      : [];

  for (
    var i = 0;
    i < names.length;
    i++
  ) {

    var module =
      PAG[names[i]];

    if (
      module &&
      typeof module.render === "function"
    ) {

      var view =
        document.getElementById("view");

      if (view) {

        module.render(view);
        return;

      }

    }

  }


  /* ---------------------------------------------------
     3. FALLBACK
     --------------------------------------------------- */

  dashboardToast(
    "Modul belum tersedia"
  );

}


/* =====================================================
   LEGACY ROUTER HELPER
   ===================================================== */

function dashboardGo(route) {

  dashboardOpenModule(
    route,
    []
  );

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

  toast.textContent =
    message;

  toast.style.display =
    "block";

  clearTimeout(
    dashboardToast.timer
  );

  dashboardToast.timer =
    setTimeout(
      function () {

        toast.style.display =
          "none";

      },
      2500
    );

}


/* =====================================================
   ESCAPE
   ===================================================== */

function dashboardEscape(value) {

  return String(value == null ? "" : value)
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
  "PAG 90_Dashboard loaded:",
  !!PAG.Dashboard
);
