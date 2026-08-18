PAG.Router = {

  current: "home",

  routes: {

    home: "home",
    report: "report",

    // Tetap tersedia untuk dipanggil dari Dashboard
    photo: "photo",

    notification: "notification",
    profile: "profile",

    rfi: "rfi",
    inspection: "inspection",
    inspectionResult: "inspectionResult",

    instruksi: "instruksi",
    memo: "memo",
    temuan: "temuan",
    tindaklanjut: "tindaklanjut",

    revision: "revision",
    approval: "approval",
    signature: "signature",
    qrverify: "qrverify",
    auditlog: "auditlog",

    activity: "activity",

    drive: "drive",
    pdf: "pdf"

  },


  async go(route) {

    /* ================================================
       VALIDASI ROUTE
       ================================================ */

    if (!this.routes[route]) {

      console.warn(
        "Route tidak ditemukan:",
        route
      );

      route = "home";

    }


    /* ================================================
       SIMPAN ROUTE AKTIF
       ================================================ */

    this.current = route;


    /* ================================================
       RENDER
       ================================================ */

    try {

      await PAG.UI.render(
        route
      );


    } catch (error) {

      console.error(
        "ROUTER ERROR:",
        route,
        error
      );


      const view =
        document.getElementById(
          "view"
        );


      if (view) {

        view.innerHTML = `

          <div class="card">

            <h2>
              Halaman gagal dimuat
            </h2>

            <p>
              ${escapeRouterHtml(
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

    }

  }

};


/* =====================================================
   ESCAPE HTML
   ===================================================== */

function escapeRouterHtml(value) {

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
