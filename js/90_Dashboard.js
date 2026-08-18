```javascript
/* =====================================================
   PAG DOCS FIELD
   90_Dashboard.js
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


    /* ===================================================
       DEFAULT
       =================================================== */

    var userName =
      "Personil Lapangan";

    var namaPaket =
      "Paket belum tersinkron";


    /* ===================================================
       USER
       =================================================== */

    try {

      if (
        PAG.Auth &&
        typeof PAG.Auth.ensure === "function"
      ) {

        var u =
          await PAG.Auth.ensure();


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

            var p =
              paket[0] || {};


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

      <!-- =================================================
           HERO
           ================================================= -->

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


      <!-- =================================================
           SOP
           ================================================= -->

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


      <!-- =================================================
           KEGIATAN LAPANGAN
           ================================================= -->

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


          <!-- INSTRUKSI -->

          <button
            type="button"
            class="action dashboard-action"
            id="dashboardInstruksi"
          >

            <span class="action-icon">
              📢
            </span>


            <span class="action-label">
              Instruksi
            </span>


            <small>
              Instruksi pekerjaan
            </small>

          </button>


          <!-- MEMO -->

          <button
            type="button"
            class="action dashboard-action"
            id="dashboardMemo"
          >

            <span class="action-icon">
              📝
            </span>


            <span class="action-label">
              Memo
            </span>


            <small>
              Catatan & memo
            </small>

          </button>


        </div>

      </section>


      <!-- =================================================
           PELAPORAN
           ================================================= -->

      <section class="dashboard-section">

        <h4 class="section-title">
          Pelaporan
        </h4>


        <div class="grid dashboard-grid">


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


          <!-- PROGRESS -->

          <button
            type="button"
            class="action dashboard-action"
            id="dashboardProgress"
          >

            <span class="action-icon">
              📊
            </span>


            <span class="action-label">
              Progress
            </span>


            <small>
              Progress pekerjaan
            </small>

          </button>


        </div>

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


        dashboardOpenModule(
          "absensi",
          [
            "Absensi"
          ]
        );

      }
    );


    /* ===================================================
       INSTRUKSI
       =================================================== */

    bindDashboardButton(
      "dashboardInstruksi",
      function () {

        dashboardOpenModule(
          "instruksi",
          [
            "Instruksi",
            "InstruksiLapangan"
          ]
        );

      }
    );


    /* ===================================================
       MEMO
       =================================================== */

    bindDashboardButton(
      "dashboardMemo",
      function () {

        dashboardOpenModule(
          "memo",
          [
            "Memo",
            "MemoLapangan"
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
       PROGRESS
       =================================================== */

    bindDashboardButton(
      "dashboardProgress",
      function () {

        dashboardOpenModule(
          "progress",
          [
            "Progress"
          ]
        );

      }
    );

  }

};


/* =====================================================
   BIND BUTTON
   ===================================================== */

function bindDashboardButton(
  id,
  handler
) {

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

async function dashboardOpenModule(
  route,
  names
) {

  /* ---------------------------------------------------
     NORMALISASI
     --------------------------------------------------- */

  names =
    Array.isArray(names)
      ? names
      : [];


  /* ---------------------------------------------------
     1. ROUTER
     --------------------------------------------------- */

  try {

    if (
      PAG.Router &&
      typeof PAG.Router.go === "function"
    ) {

      var result =
        PAG.Router.go(route);


      /*
       * Router bisa synchronous
       * atau asynchronous.
       */

      if (
        result &&
        typeof result.then === "function"
      ) {

        await result;

      }


      return;

    }

  } catch (error) {

    console.warn(
      "Dashboard Router:",
      route,
      error
    );

  }


  /* ---------------------------------------------------
     2. DIRECT MODULE
     --------------------------------------------------- */

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

        await module.render(
          view
        );

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

function dashboardGo(
  route
) {

  dashboardOpenModule(
    route,
    []
  );

}


/* =====================================================
   TOAST
   ===================================================== */

function dashboardToast(
  message
) {

  try {

    if (
      PAG.UI &&
      typeof PAG.UI.toast === "function"
    ) {

      PAG.UI.toast(
        message
      );

      return;

    }

  } catch (error) {

    console.warn(
      "Dashboard Toast:",
      error
    );

  }


  var toast =
    document.getElementById(
      "toast"
    );


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

function dashboardEscape(
  value
) {

  return String(
    value == null
      ? ""
      : value
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


/* =====================================================
   DEBUG
   ===================================================== */

console.log(
  "PAG 90_Dashboard loaded:",
  !!PAG.Dashboard
);
```
