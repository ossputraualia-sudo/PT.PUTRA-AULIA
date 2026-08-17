PAG.Absensi = {

  stream: null,

  // =====================================================
  // MULAI ABSENSI
  // =====================================================

  async start() {

    try {

      const view =
        document.getElementById("view");

      if (!view) {
        throw new Error(
          "Area aplikasi tidak ditemukan."
        );
      }


      // ==================================================
      // USER
      // ==================================================

      const user =
        PAG.Auth.get();

      if (!user) {

        await PAG.Auth.ensure();

      }


      // ==================================================
      // TAMPILKAN CAMERA
      // ==================================================

      view.innerHTML = `

        <div class="hero">

          <small>
            ABSENSI LAPANGAN
          </small>

          <h2>
            Selfie + GPS
          </h2>

        </div>


        <div class="card">

          <video
            id="abs_camera"
            autoplay
            playsinline
            muted
            style="
              width:100%;
              max-height:420px;
              object-fit:cover;
              border-radius:14px;
              background:#000;
            "
          ></video>


          <div
            id="abs_status"
            style="
              margin-top:12px;
              padding:10px;
              border-radius:8px;
              background:#f1f5f9;
            "
          >
            Menyiapkan kamera...
          </div>


          <button
            id="abs_capture"
            class="btn"
            type="button"
            disabled
            style="margin-top:12px"
          >
            📸 Ambil Selfie
          </button>


          <button
            id="abs_cancel"
            class="btn"
            type="button"
            style="margin-top:8px"
          >
            Batal
          </button>

        </div>

      `;


      const video =
        document.getElementById(
          "abs_camera"
        );

      const status =
        document.getElementById(
          "abs_status"
        );

      const capture =
        document.getElementById(
          "abs_capture"
        );

      const cancel =
        document.getElementById(
          "abs_cancel"
        );


      // ==================================================
      // CAMERA
      // ==================================================

      this.stream =
        await navigator.mediaDevices
          .getUserMedia({

            video: {

              facingMode: "user",

              width: {
                ideal: 720
              },

              height: {
                ideal: 960
              }

            },

            audio: false

          });


      video.srcObject =
        this.stream;


      await video.play();


      status.textContent =
        "Kamera siap. Mengambil lokasi...";


      // ==================================================
      // GPS
      // ==================================================

      const gps =
        await PAG.Device.gps();


      status.innerHTML = `
        Kamera siap.<br>
        GPS: ${gps.lat.toFixed(6)},
        ${gps.lng.toFixed(6)}<br>
        Akurasi:
        ${Math.round(gps.accuracy)} meter
      `;


      capture.disabled =
        false;


      // ==================================================
      // CAPTURE
      // ==================================================

      capture.onclick =
        async () => {

          try {

            capture.disabled =
              true;

            status.textContent =
              "Mengambil foto...";


            const canvas =
              document.createElement(
                "canvas"
              );


            canvas.width =
              video.videoWidth ||
              720;

            canvas.height =
              video.videoHeight ||
              960;


            const context =
              canvas.getContext(
                "2d"
              );


            context.drawImage(
              video,
              0,
              0,
              canvas.width,
              canvas.height
            );


            const blob =
              await new Promise(
                (resolve, reject) => {

                  canvas.toBlob(

                    result => {

                      if (result) {
                        resolve(result);
                      } else {
                        reject(
                          new Error(
                            "Foto gagal dibuat."
                          )
                        );
                      }

                    },

                    "image/jpeg",

                    0.82

                  );

                }
              );


            const id =
              "ABS-" +
              Date.now();


            // ==========================================
            // SIMPAN FOTO LOKAL
            // ==========================================

            await PAG.Storage.put(
              "photos",
              {

                id,

                type:
                  "absensi",

                blob,

                gps,

                user:
                  PAG.Auth.get(),

                createdAt:
                  new Date().toISOString()

              }
            );


            // ==========================================
            // QUEUE
            // ==========================================

            await PAG.OfflineSync.add(
              "absensi",
              {

                id,

                gps,

                user:
                  PAG.Auth.get(),

                photoId:
                  id,

                createdAt:
                  new Date().toISOString()

              }
            );


            status.textContent =
              "Absensi berhasil disimpan.";


            PAG.UI.toast(
              "Absensi tersimpan"
            );


            this.stopCamera();


            setTimeout(
              () => {

                PAG.Router.go(
                  "home"
                );

              },
              700
            );


          } catch (error) {

            console.error(
              "Absensi capture:",
              error
            );


            status.textContent =
              "Gagal mengambil foto.";


            PAG.UI.toast(
              "Foto gagal: " +
              error.message
            );


            capture.disabled =
              false;

          }

        };


      // ==================================================
      // CANCEL
      // ==================================================

      cancel.onclick =
        () => {

          this.stopCamera();

          PAG.Router.go(
            "home"
          );

        };


    } catch (error) {

      console.error(
        "Absensi:",
        error
      );


      this.stopCamera();


      PAG.UI.toast(
        "Kamera/GPS gagal: " +
        error.message
      );

    }

  },


  // =====================================================
  // STOP CAMERA
  // =====================================================

  stopCamera() {

    if (!this.stream) {
      return;
    }


    this.stream
      .getTracks()
      .forEach(
        track => track.stop()
      );


    this.stream =
      null;

  }

};
