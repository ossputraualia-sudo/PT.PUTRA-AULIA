PAG.UI = {

  /* =====================================================
     RENDER
     ===================================================== */

  async render(route) {

    const view =
      document.getElementById("view");

    if (!view) {

      console.error(
        "PAG.UI: #view tidak ditemukan."
      );

      return;
    }


    /* ===================================================
       ACTIVE NAV
       =================================================== */

    this.setActiveNav(route);


    try {

      view.innerHTML = `
        <div class="card">
          <p>Memuat...</p>
        </div>
      `;


      let module = null;


      switch (route) {

        /* ===============================================
           UTAMA
           =============================================== */

        case "home":

          module =
            PAG.Dashboard;

          break;


        /* ===============================================
           LAPORAN
           =============================================== */

        case "report":

          module =
            PAG.LaporanHarian;

          break;


        /* ===============================================
           FOTO / DOKUMENTASI
           =============================================== */

        case "photo":

          module =
            PAG.Dokumentasi;

          break;


        /* ===============================================
           NOTIFIKASI
           =============================================== */

        case "notification":

          module =
            PAG.Notification;

          break;


        /* ===============================================
           PROFIL
           =============================================== */

        case "profile":

          module =
            PAG.Profile;

          break;


        /* ===============================================
           ACTIVITY
           =============================================== */

        case "activity":

          module =
            PAG.Activity;

          break;


        /* ===============================================
           RFI
           =============================================== */

        case "rfi":

          module =
            PAG.RFI;

          break;


        case "inspection":

          module =
            PAG.Inspection;

          break;


        case "inspectionResult":

          module =
            PAG.InspectionResult;

          break;


        /* ===============================================
           INSTRUKSI
           =============================================== */

        case "instruksi":

          module =
            PAG.Instruksi;

          break;


        case "memo":

          module =
            PAG.Memo;

          break;


        case "temuan":

          module =
            PAG.Temuan;

          break;


        case "tindaklanjut":

          module =
            PAG.TindakLanjut;

          break;


        /* ===============================================
           DEFAULT
           =============================================== */

        default:

          console.warn(
            "Route tidak ditemukan:",
            route
          );

          route =
            "home";

          module =
            PAG.Dashboard;

          this.setActiveNav(
            "home"
          );

          break;

      }


      /* =================================================
         MODULE CHECK
         ================================================= */

      if (
        !module ||
        typeof module.render !== "function"
      ) {

        view.innerHTML = `

          <div class="card">

            <h3>
              Modul belum tersedia
            </h3>

            <p>
              Modul:
              ${this.escape(route)}
            </p>

          </div>

        `;

        return;
      }


      /* =================================================
         RENDER MODULE
         ================================================= */

      await module.render(
        view
      );


      /* =================================================
         UPDATE CONNECTION
         ================================================= */

      this.updateConnectionStatus();


    } catch (error) {

      console.error(
        "PAG.UI render error:",
        error
      );


      view.innerHTML = `

        <div class="card">

          <h3>
            Gagal memuat halaman
          </h3>

          <p>
            ${this.escape(
              error.message ||
              String(error)
            )}
          </p>


          <button
            class="btn"
            onclick="
              PAG.Router.go('home')
            "
          >
            Kembali ke Beranda
          </button>

        </div>

      `;

    }

  },


  /* =====================================================
     NAV ACTIVE
     ===================================================== */

  setActiveNav(route) {

    document
      .querySelectorAll(
        "#bottomNav button"
      )
      .forEach(button => {

        button.classList.remove(
          "active"
        );


        if (
          button.dataset.r === route
        ) {

          button.classList.add(
            "active"
          );

        }

      });

  },


  /* =====================================================
     TOAST
     ===================================================== */

  toast(
    message,
    duration = 2500
  ) {

    const toast =
      document.getElementById(
        "toast"
      );

    if (!toast) return;


    toast.textContent =
      message;


    toast.style.display =
      "block";


    clearTimeout(
      this._toastTimer
    );


    this._toastTimer =
      setTimeout(() => {

        toast.style.display =
          "none";

      }, duration);

  },


  /* =====================================================
     CONNECTION STATUS
     ===================================================== */

  updateConnectionStatus() {

    const el =
      document.getElementById(
        "connectionStatus"
      );

    if (!el) return;


    const text =
      el.querySelector(
        ".status-text"
      );


    const icon =
      el.querySelector(
        ".status-icon"
      );


    if (navigator.onLine) {

      el.classList.remove(
        "offline"
      );


      if (text) {

        text.textContent =
          "Online";

      }


      if (icon) {

        icon.textContent =
          "●";

      }

    } else {

      el.classList.add(
        "offline"
      );


      if (text) {

        text.textContent =
          "Offline";

      }


      if (icon) {

        icon.textContent =
          "●";

      }

    }

  },


  /* =====================================================
     ESCAPE HTML
     ===================================================== */

  escape(value) {

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

};


/* =====================================================
   ONLINE
   ===================================================== */

window.addEventListener(
  "online",
  function () {

    PAG.UI.updateConnectionStatus();

  }
);


/* =====================================================
   OFFLINE
   ===================================================== */

window.addEventListener(
  "offline",
  function () {

    PAG.UI.updateConnectionStatus();

  }
);


/* =====================================================
   DOM READY
   ===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    PAG.UI.updateConnectionStatus();

  }
);
