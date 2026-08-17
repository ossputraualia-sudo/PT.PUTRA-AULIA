(async function () {

  try {

    // =====================================================
    // INITIALIZE STORAGE
    // =====================================================

    await PAG.Storage.init();

    console.log("PAG Storage siap");


    // =====================================================
    // REGISTER SERVICE WORKER
    // =====================================================

    if ("serviceWorker" in navigator) {

      try {

        const registration =
          await navigator.serviceWorker.register(
            "./sw.js",
            {
              scope: "./"
            }
          );

        console.log(
          "PAG Docs Service Worker aktif:",
          registration.scope
        );

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

            const route =
              this.dataset.r;

            if (!route) return;

            PAG.Router.go(route);

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

          if (
            syncButton.disabled
          ) {

            return;

          }

          try {

            syncButton.disabled = true;

            syncButton.textContent = "⟳";


            await PAG.WebUtamaSync.pull();

            await PAG.OfflineSync.run();


            if (
              PAG.UI &&
              PAG.UI.toast
            ) {

              PAG.UI.toast(
                "Sinkronisasi selesai"
              );

            }


            PAG.Router.go(
              PAG.Router.current ||
              "home"
            );


          } catch (error) {

            console.error(
              "Sinkronisasi gagal:",
              error
            );


            if (
              PAG.UI &&
              PAG.UI.toast
            ) {

              PAG.UI.toast(
                "Sinkronisasi gagal"
              );

            }

          } finally {

            syncButton.disabled = false;

            syncButton.textContent = "↻";

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

        console.log(
          "Koneksi kembali. Menjalankan sync..."
        );

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
    // OPEN DASHBOARD FIRST
    // =====================================================
    // PENTING:
    // Dashboard dibuka SEBELUM sync.
    // Jadi UI tidak menunggu Apps Script.

    PAG.Router.go("home");


    // =====================================================
    // INITIAL SYNC
    // =====================================================

    if (navigator.onLine) {

      try {

        await PAG.WebUtamaSync.pull();

        console.log(
          "Initial sync berhasil"
        );


        // Refresh Dashboard setelah
        // master berhasil diperbarui.

        if (
          PAG.Router.current ===
          "home"
        ) {

          PAG.Router.go("home");

        }

      } catch (error) {

        console.warn(
          "Initial sync gagal:",
          error
        );

      }

    } else {

      console.log(
        "Offline - menggunakan data lokal"
      );

    }


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
          margin:20px;
          padding:24px;
          border-radius:16px;
          background:#fee2e2;
          font-family:system-ui;
        ">

          <h2>
            PAG Docs
          </h2>

          <p>
            Aplikasi gagal dimuat.
          </p>

          <small>
            ${escapeAppError(
              error.message ||
              String(error)
            )}
          </small>

          <br><br>

          <button
            onclick="location.reload()"
            style="
              padding:10px 16px;
              border:0;
              border-radius:8px;
              cursor:pointer;
            "
          >
            Muat Ulang
          </button>

        </div>

      `;

    }

  }

})();


// =====================================================
// ESCAPE ERROR
// =====================================================

function escapeAppError(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}
