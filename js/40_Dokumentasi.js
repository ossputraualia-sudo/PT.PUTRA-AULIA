PAG.Dokumentasi = {

  render(v) {

    v.innerHTML = `

      <div class="hero">
        <small>PAG DOCS FIELD</small>
        <h2>Dokumentasi</h2>
        <div>Foto kegiatan lapangan</div>
      </div>

      <div class="card">

        <button
          class="btn"
          id="doc_camera"
          type="button"
        >
          📷 Buka Kamera
        </button>

        <div
          id="doc_box"
          style="margin-top:12px"
        ></div>

      </div>

    `;


    const button =
      document.getElementById(
        "doc_camera"
      );


    button.onclick =
      async () => {

        try {

          await PAG.Camera.start();

        } catch (error) {

          console.error(
            "Dokumentasi:",
            error
          );

          PAG.UI.toast(
            "Kamera gagal: " +
            error.message
          );

        }

      };

  }

};
