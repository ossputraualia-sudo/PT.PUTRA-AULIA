(async function () {

  try {

    // =====================================================
    // INITIALIZE STORAGE
    // =====================================================

    await PAG.Storage.init();


    // =====================================================
    // REGISTER SERVICE WORKER
    // =====================================================

    if ("serviceWorker" in navigator) {

      try {

        await navigator.serviceWorker.register("./sw.js");

        console.log("PAG Docs Service Worker aktif");

      } catch (error) {

        console.error(
          "Service Worker gagal:",
          error
        );

      }

    }


    // =====================================================
    // NAVIGATION
    // =====================================================

    document
      .querySelectorAll("nav button")
      .forEach(button => {

        button.addEventListener(
          "click",
          function () {

            PAG.Router.go(
              this.dataset.r
            );

          }
        );

      });


    // =====================================================
    // SYNC BUTTON
    // =====================================================

    const syncButton =
      document.getElementById("sync");

    if (syncButton) {

      syncButton.addEventListener(
        "click",
        async function () {

          try {

            syncButton.disabled = true;

            await PAG.WebUtamaSync.pull();

            await PAG.OfflineSync.run();

            if (PAG.UI && PAG.UI.toast) {

              PAG.UI.toast(
                "Sinkronisasi selesai"
              );

            }

            PAG.Router.go(
              PAG.Router.current || "home"
            );

          } catch (error) {

            console.error(
              "Sinkronisasi gagal:",
              error
            );

            if (PAG.UI && PAG.UI.toast) {

              PAG.UI.toast(
                "Sinkronisasi gagal"
              );

            }

          } finally {

            syncButton.disabled = false;

          }

        }
      );

    }


    // =====================================================
    // AUTO SYNC WHEN ONLINE
    // =====================================================

    window.addEventListener(
      "online",
      async function () {

        try {

          await PAG.WebUtamaSync.pull();

          await PAG.OfflineSync.run();

        } catch (error) {

          console.error(
            "Auto sync gagal:",
            error
          );

        }

      }
    );


    // =====================================================
    // INITIAL SYNC
    // =====================================================

    try {

      await PAG.WebUtamaSync.pull();

    } catch (error) {

      console.warn(
        "Initial sync dilewati:",
        error
      );

    }


    // =====================================================
    // OPEN DASHBOARD
    // =====================================================

    PAG.Router.go("home");


  } catch (error) {

    console.error(
      "PAG Docs gagal dijalankan:",
      error
    );

    const view =
      document.getElementById("view");

    if (view) {

      view.innerHTML = `
        <div style="
          padding:24px;
          text-align:center;
          font-family:system-ui;
        ">
          <h2>PAG Docs</h2>

          <p>
            Aplikasi gagal dimuat.
          </p>

          <small>
            ${error.message || error}
          </small>

        </div>
      `;

    }

  }

})();
