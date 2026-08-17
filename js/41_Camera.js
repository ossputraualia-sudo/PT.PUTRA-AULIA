PAG.Camera = {

  stream: null,

  async start() {

    const box =
      document.getElementById("doc_box");

    if (!box) {
      throw new Error(
        "Area kamera dokumentasi tidak ditemukan."
      );
    }

    box.innerHTML = `
      <div>

        <video
          id="doc_video"
          autoplay
          playsinline
          muted
          style="
            width:100%;
            max-height:480px;
            object-fit:cover;
            border-radius:14px;
            background:#000;
          "
        ></video>

        <div style="
          display:flex;
          gap:8px;
          margin-top:10px;
        ">

          <button
            class="btn"
            id="doc_take"
            type="button"
          >
            📸 Ambil Foto
          </button>

          <button
            class="btn"
            id="doc_close"
            type="button"
          >
            Tutup
          </button>

        </div>

        <div
          id="doc_status"
          style="
            margin-top:10px;
            padding:10px;
            border-radius:8px;
            background:#f1f5f9;
          "
        >
          Menyiapkan kamera...
        </div>

      </div>
    `;


    const video =
      document.getElementById(
        "doc_video"
      );

    const take =
      document.getElementById(
        "doc_take"
      );

    const close =
      document.getElementById(
        "doc_close"
      );

    const status =
      document.getElementById(
        "doc_status"
      );


    // ==================================================
    // CAMERA
    // ==================================================

    this.stream =
      await navigator.mediaDevices.getUserMedia({

        video: {

          facingMode: {
            ideal: "environment"
          },

          width: {
            ideal: 1200
          },

          height: {
            ideal: 900
          }

        },

        audio: false

      });


    video.srcObject =
      this.stream;

    await video.play();


    status.textContent =
      "Kamera siap. Mengambil GPS...";


    // ==================================================
    // GPS
    // ==================================================

    let gps = null;

    try {

      gps =
        await PAG.GPS.get();

      status.innerHTML = `
        Kamera siap.<br>
        GPS:
        ${gps.lat.toFixed(6)},
        ${gps.lng.toFixed(6)}<br>
        Akurasi:
        ${Math.round(gps.accuracy)} meter
      `;

    } catch (error) {

      status.textContent =
        "GPS gagal: " +
        error.message;

      throw error;

    }


    // ==================================================
    // AMBIL FOTO
    // ==================================================

    take.onclick =
      async () => {

        try {

          take.disabled =
            true;

          status.textContent =
            "Mengambil foto...";


          const canvas =
            document.createElement(
              "canvas"
            );


          const width =
            video.videoWidth ||
            1200;

          const height =
            video.videoHeight ||
            900;


          canvas.width =
            width;

          canvas.height =
            height;


          const context =
            canvas.getContext(
              "2d"
            );


          context.drawImage(
            video,
            0,
            0,
            width,
            height
          );


          const blob =
            await new Promise(
              (resolve, reject) => {

                canvas.toBlob(

                  result => {

                    if (result) {

                      resolve(
                        result
                      );

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
            "DOC-" +
            Date.now();


          // ==========================================
          // SIMPAN FOTO
          // ==========================================

          await PAG.Storage.put(
            "photos",
            {

              id,

              type:
                "dokumentasi",

              blob,

              gps,

              createdAt:
                new Date().toISOString()

            }
          );


          // ==========================================
          // OFFLINE QUEUE
          // ==========================================

          await PAG.OfflineSync.add(
            "dokumentasi",
            {

              id,

              gps,

              createdAt:
                new Date().toISOString()

            }
          );


          status.textContent =
            "Foto berhasil disimpan.";


          PAG.UI.toast(
            "Foto tersimpan"
          );


          this.stop();

        } catch (error) {

          console.error(
            "Camera capture:",
            error
          );


          PAG.UI.toast(
            "Foto gagal: " +
            error.message
          );


          take.disabled =
            false;

        }

      };


    // ==================================================
    // TUTUP
    // ==================================================

    close.onclick =
      () => {

        this.stop();

        box.innerHTML = "";

      };

  },


  stop() {

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
