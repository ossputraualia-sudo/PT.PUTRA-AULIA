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


    this.setActiveNav(route);


    try {

      view.innerHTML = `
        <div class="card">
          <p>Memuat...</p>
        </div>
      `;


      let module = null;


      switch (route) {

        case "home":
          module = PAG.Dashboard;
          break;


        case "report":
          module = PAG.LaporanHarian;
          break;


        case "photo":
          module = PAG.Dokumentasi;
          break;


        case "profile":
          module = PAG.Profile;
          break;


        case "notification":
          module = PAG.Notification;
          break;


        case "rfi":
          module = PAG.RFI;
          break;


        case "inspection":
          module = PAG.Inspection;
          break;


        case "inspectionResult":
          module = PAG.InspectionResult;
          break;


        case "instruksi":
          module = PAG.Instruksi;
          break;


        case "memo":
          module = PAG.Memo;
          break;


        case "temuan":
          module = PAG.Temuan;
          break;


        case "tindaklanjut":
          module = PAG.TindakLanjut;
          break;


        case "activity":
          module = PAG.Activity;
          break;


        default:

          console.warn(
            "Route tidak ditemukan:",
            route
          );

          module =
            PAG.Dashboard;

          route = "home";

          break;

      }


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


      await module.render(view);


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
            onclick="PAG.Router.go('home')"
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

  toast(message, duration = 2500) {

    const toast =
      document.getElementById("toast");

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


    if (navigator.onLine) {

      el.classList.remove(
        "offline"
      );


      if (text) {

        text.textContent =
          "Online";

      }

    } else {

      el.classList.add(
        "offline"
      );


      if (text) {

        text.textContent =
          "Offline";

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
   ONLINE / OFFLINE EVENT
   ===================================================== */

window.addEventListener(
  "online",
  function () {

    PAG.UI.updateConnectionStatus();

  }
);


window.addEventListener(
  "offline",
  function () {

    PAG.UI.updateConnectionStatus();

  }
);


document.addEventListener(
  "DOMContentLoaded",
  function () {

    PAG.UI.updateConnectionStatus();

  }
);
