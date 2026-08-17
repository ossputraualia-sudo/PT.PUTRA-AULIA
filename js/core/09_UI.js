PAG.UI = {

  // =====================================================
  // RENDER ROUTE
  // =====================================================

  async render(route) {

    const view =
      document.getElementById("view");

    if (!view) {

      console.error(
        "PAG.UI: #view tidak ditemukan."
      );

      return;

    }


    // Bersihkan tampilan sebelumnya

    view.innerHTML = "";


    try {

      switch (route) {

        // =================================================
        // HOME / DASHBOARD
        // =================================================

        case "home":

          if (
            !PAG.Dashboard ||
            typeof PAG.Dashboard.render !== "function"
          ) {

            throw new Error(
              "Modul Dashboard tidak ditemukan."
            );

          }

          await PAG.Dashboard.render(view);

          break;


        // =================================================
        // LAPORAN
        // =================================================

        case "report":

          if (
            !PAG.LaporanHarian ||
            typeof PAG.LaporanHarian.render !== "function"
          ) {

            throw new Error(
              "Modul Laporan Harian tidak ditemukan."
            );

          }

          await PAG.LaporanHarian.render(view);

          break;


        // =================================================
        // DOKUMENTASI / FOTO
        // =================================================

        case "photo":

          if (
            !PAG.Dokumentasi ||
            typeof PAG.Dokumentasi.render !== "function"
          ) {

            throw new Error(
              "Modul Dokumentasi tidak ditemukan."
            );

          }

          await PAG.Dokumentasi.render(view);

          break;


        // =================================================
        // PROFILE
        // =================================================

        case "profile":

          if (
            !PAG.Profile ||
            typeof PAG.Profile.render !== "function"
          ) {

            throw new Error(
              "Modul Profile tidak ditemukan."
            );

          }

          await PAG.Profile.render(view);

          break;


        // =================================================
        // UNKNOWN ROUTE
        // =================================================

        default:

          console.warn(
            "Route tidak dikenal:",
            route
          );

          await this.render("home");

          return;

      }


    } catch (error) {

      console.error(
        "PAG.UI.render error:",
        route,
        error
      );


      view.innerHTML = `

        <div class="pag-error">

          <h2>PAG Docs</h2>

          <p>
            Halaman gagal dimuat.
          </p>

          <small>
            ${this.escape(
              error.message || String(error)
            )}
          </small>

          <br><br>

          <button
            type="button"
            onclick="location.reload()"
          >
            Muat Ulang
          </button>

        </div>

      `;

    }

  },


  // =====================================================
  // TOAST
  // =====================================================

  toast(message) {

    const element =
      document.getElementById("toast");

    if (!element) return;

    element.textContent =
      message || "";

    element.style.display =
      "block";

    clearTimeout(
      this._toastTimer
    );

    this._toastTimer =
      setTimeout(() => {

        element.style.display =
          "none";

      }, 2500);

  },


  // =====================================================
  // ESCAPE HTML
  // =====================================================

  escape(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }

};
