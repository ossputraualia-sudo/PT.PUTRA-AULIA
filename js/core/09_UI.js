PAG.UI = {

  // =====================================================
  // RENDER ROUTE
  // =====================================================

  async render(route) {

    const view =
      document.getElementById("view");

    if (!view) {

      console.error(
        "PAG.UI: #view tidak ditemukan"
      );

      return;

    }


    // Loading

    view.innerHTML = `

      <div class="card">

        <p>
          Memuat halaman...
        </p>

      </div>

    `;


    // ===================================================
    // ROUTE → MODULE
    // ===================================================

    try {

      switch (route) {


        // ===============================================
        // HOME
        // ===============================================

        case "home":

          if (
            PAG.Dashboard &&
            PAG.Dashboard.render
          ) {

            await PAG.Dashboard.render(view);

          } else {

            this.notReady(
              view,
              "Dashboard"
            );

          }

          break;


        // ===============================================
        // LAPORAN
        // ===============================================

        case "report":

          if (
            PAG.LaporanHarian &&
            PAG.LaporanHarian.render
          ) {

            await PAG.LaporanHarian.render(view);

          } else {

            this.notReady(
              view,
              "Laporan Harian"
            );

          }

          break;


        // ===============================================
        // FOTO / DOKUMENTASI
        // ===============================================

        case "photo":

          if (
            PAG.Dokumentasi &&
            PAG.Dokumentasi.render
          ) {

            await PAG.Dokumentasi.render(view);

          } else {

            this.notReady(
              view,
              "Dokumentasi"
            );

          }

          break;


        // ===============================================
        // PROFILE
        // ===============================================

        case "profile":

          if (
            PAG.Profile &&
            PAG.Profile.render
          ) {

            await PAG.Profile.render(view);

          } else {

            this.notReady(
              view,
              "Profil"
            );

          }

          break;


        // ===============================================
        // ACTIVITY
        // ===============================================

        case "activity":

          if (
            PAG.Activity &&
            PAG.Activity.render
          ) {

            await PAG.Activity.render(view);

          } else {

            this.notReady(
              view,
              "Aktivitas"
            );

          }

          break;


        // ===============================================
        // RFI
        // ===============================================

        case "rfi":

          await this.module(
            view,
            PAG.RFI,
            "RFI"
          );

          break;


        // ===============================================
        // INSPECTION
        // ===============================================

        case "inspection":

          await this.module(
            view,
            PAG.Inspection,
            "Inspection"
          );

          break;


        // ===============================================
        // INSPECTION RESULT
        // ===============================================

        case "inspectionResult":

          await this.module(
            view,
            PAG.InspectionResult,
            "Hasil Inspection"
          );

          break;


        // ===============================================
        // INSTRUKSI
        // ===============================================

        case "instruksi":

          await this.module(
            view,
            PAG.Instruksi,
            "Instruksi"
          );

          break;


        // ===============================================
        // MEMO
        // ===============================================

        case "memo":

          await this.module(
            view,
            PAG.Memo,
            "Memo"
          );

          break;


        // ===============================================
        // TEMUAN
        // ===============================================

        case "temuan":

          await this.module(
            view,
            PAG.Temuan,
            "Temuan"
          );

          break;


        // ===============================================
        // TINDAK LANJUT
        // ===============================================

        case "tindaklanjut":

          await this.module(
            view,
            PAG.TindakLanjut,
            "Tindak Lanjut"
          );

          break;


        // ===============================================
        // REVISION
        // ===============================================

        case "revision":

          await this.module(
            view,
            PAG.Revision,
            "Revision"
          );

          break;


        // ===============================================
        // APPROVAL
        // ===============================================

        case "approval":

          await this.module(
            view,
            PAG.Approval,
            "Approval"
          );

          break;


        // ===============================================
        // SIGNATURE
        // ===============================================

        case "signature":

          await this.module(
            view,
            PAG.Signature,
            "Signature"
          );

          break;


        // ===============================================
        // QR VERIFY
        // ===============================================

        case "qrverify":

          await this.module(
            view,
            PAG.QRVerify,
            "QR Verify"
          );

          break;


        // ===============================================
        // AUDIT LOG
        // ===============================================

        case "auditlog":

          await this.module(
            view,
            PAG.AuditLog,
            "Audit Log"
          );

          break;


        // ===============================================
        // DRIVE
        // ===============================================

        case "drive":

          await this.module(
            view,
            PAG.Drive,
            "Google Drive"
          );

          break;


        // ===============================================
        // PDF
        // ===============================================

        case "pdf":

          await this.module(
            view,
            PAG.PDFGenerator,
            "PDF Generator"
          );

          break;


        // ===============================================
        // DEFAULT
        // ===============================================

        default:

          await PAG.Router.go(
            "home"
          );

      }


      // =================================================
      // UPDATE NAVIGATION
      // =================================================

      this.updateNavigation(route);


    } catch (error) {

      console.error(
        "UI RENDER ERROR:",
        route,
        error
      );


      view.innerHTML = `

        <div class="card">

          <h2>
            Gagal memuat halaman
          </h2>

          <p>
            ${escapeUIHtml(
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


  // =====================================================
  // GENERIC MODULE RENDER
  // =====================================================

  async module(
    view,
    module,
    title
  ) {

    if (
      module &&
      typeof module.render === "function"
    ) {

      await module.render(view);

      return;

    }


    // Modul masih placeholder

    view.innerHTML = `

      <div class="card">

        <h2>
          ${escapeUIHtml(title)}
        </h2>

        <p>
          Modul ${escapeUIHtml(title)}
          siap dikembangkan.
        </p>

        <button
          class="btn"
          onclick="PAG.Router.go('home')"
        >
          Kembali ke Beranda
        </button>

      </div>

    `;

  },


  // =====================================================
  // MODULE NOT READY
  // =====================================================

  notReady(view, title) {

    view.innerHTML = `

      <div class="card">

        <h2>
          ${escapeUIHtml(title)}
        </h2>

        <p>
          Modul belum tersedia.
        </p>

        <button
          class="btn"
          onclick="PAG.Router.go('home')"
        >
          Kembali ke Beranda
        </button>

      </div>

    `;

  },


  // =====================================================
  // UPDATE BOTTOM NAV
  // =====================================================

  updateNavigation(route) {

    document
      .querySelectorAll(
        "#bottomNav button"
      )
      .forEach(button => {

        const r =
          button.dataset.r;

        button.classList.toggle(
          "active",
          r === route
        );

      });

  },


  // =====================================================
  // TOAST
  // =====================================================

  toast(message) {

    const toast =
      document.getElementById("toast");

    if (!toast) return;

    toast.textContent =
      message;

    toast.style.display =
      "block";

    clearTimeout(
      this.toastTimer
    );

    this.toastTimer =
      setTimeout(
        () => {

          toast.style.display =
            "none";

        },
        2500
      );

  }

};


function escapeUIHtml(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}
