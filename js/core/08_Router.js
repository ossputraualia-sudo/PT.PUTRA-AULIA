PAG.Router = {

  current: "home",

  routes: {

    home: "home",
    report: "report",
    photo: "photo",
    profile: "profile",
    notification: "notification",
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

    route =
      this.routes[route]
        ? route
        : "home";

    this.current = route;

    try {

      await PAG.UI.render(route);

    } catch (error) {

      console.error(
        "ROUTER ERROR:",
        route,
        error
      );

      const view =
        document.getElementById("view");

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
              onclick="PAG.Router.go('home')"
            >
              Kembali ke Beranda
            </button>

          </div>

        `;

      }

    }

  }

};


function escapeRouterHtml(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}
