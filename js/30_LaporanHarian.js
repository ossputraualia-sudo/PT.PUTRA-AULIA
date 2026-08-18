/* =====================================================
   PAG DOCS FIELD
   LAPORAN HARIAN
   MOBILE FRIENDLY
   ===================================================== */

window.PAG = window.PAG || {};

PAG.LaporanHarian = {

  async render(v) {

    if (!v) {
      console.error(
        "PAG.LaporanHarian: view tidak ditemukan."
      );
      return;
    }


    /* =================================================
       LOADING
       ================================================= */

    v.innerHTML = `
      <div class="card">
        <p>Memuat Laporan Harian...</p>
      </div>
    `;


    try {

      /* =================================================
         MASTER
         ================================================= */

      let master = {};

      try {

        if (
          PAG.WebUtamaSync &&
          typeof PAG.WebUtamaSync.getMaster === "function"
        ) {

          master =
            await PAG.WebUtamaSync.getMaster() || {};

        }

      } catch (error) {

        console.warn(
          "Master tidak tersedia:",
          error
        );

      }


      const konsultan =
        master?.konsultan || "";

      const paket =
        master?.paket?.[0]?.nama ||
        master?.paket?.[0]?.namaPaket ||
        "";

      const noKontrak =
        master?.noKontrak || "";

      const tglKontrak =
        master?.tglKontrak || "";

      const kontraktor =
        master?.kontraktor || "";


      /* =================================================
         USER
         ================================================= */

      let user = {};

      try {

        if (
          PAG.Auth &&
          typeof PAG.Auth.ensure === "function"
        ) {

          user =
            await PAG.Auth.ensure() || {};

        }

      } catch (error) {

        console.warn(
          "User tidak tersedia:",
          error
        );

      }


      const namaUser =
        user?.name ||
        user?.nama ||
        "";


      /* =================================================
         RENDER
         ================================================= */

      v.innerHTML = `

        <div class="hero">

          <small>
            PAG DOCS FIELD
          </small>

          <h2>
            Laporan Harian
          </h2>

          <div>
            Catatan kegiatan pekerjaan lapangan
          </div>

        </div>


        <!-- =============================================
             INFORMASI PEKERJAAN
             ============================================= -->

        <div class="card">

          <h3>
            Informasi Pekerjaan
          </h3>

          <div class="lh-info-grid">

            <div class="field">

              <label>
                Konsultan
              </label>

              <input
                id="lh_konsultan"
                value="${PAG.LaporanHarian.escape(konsultan)}"
                placeholder="Nama konsultan"
              >

            </div>


            <div class="field">

              <label>
                Paket
              </label>

              <input
                id="lh_paket"
                value="${PAG.LaporanHarian.escape(paket)}"
                placeholder="Nama paket"
              >

            </div>


            <div class="field">

              <label>
                No. Kontrak
              </label>

              <input
                id="lh_no_kontrak"
                value="${PAG.LaporanHarian.escape(noKontrak)}"
                placeholder="Nomor kontrak"
              >

            </div>


            <div class="field">

              <label>
                Tanggal Kontrak
              </label>

              <input
                id="lh_tgl_kontrak"
                value="${PAG.LaporanHarian.escape(tglKontrak)}"
                placeholder="Tanggal kontrak"
              >

            </div>


            <div
              class="field"
              style="grid-column:1/-1;"
            >

              <label>
                Kontraktor
              </label>

              <input
                id="lh_kontraktor"
                value="${PAG.LaporanHarian.escape(kontraktor)}"
                placeholder="Nama kontraktor"
              >

            </div>

          </div>

        </div>


        <!-- =============================================
             TANGGAL LAPORAN
             ============================================= -->

        <div class="card">

          <h3>
            Data Hari Ini
          </h3>


          <div class="field">

            <label>
              Tanggal
            </label>

            <input
              id="lh_tanggal"
              type="date"
              value="${new Date().toISOString().slice(0,10)}"
            >

          </div>


          <div class="field">

            <label>
              Devisi
            </label>

            <input
              id="lh_devisi"
              placeholder="Contoh: Devisi 1"
            >

          </div>


          <div class="field">

            <label>
              STA / Lokasi
            </label>

            <input
              id="lh_sta"
              placeholder="STA / lokasi pekerjaan"
            >

          </div>


          <div class="field">

            <label>
              Uraian Pekerjaan
            </label>

            <textarea
              id="lh_uraian"
              placeholder="Tuliskan kegiatan pekerjaan hari ini..."
            ></textarea>

          </div>

        </div>


        <!-- =============================================
             KONDISI LAPANGAN
             ============================================= -->

        <div class="card">

          <h3>
            Kondisi Lapangan
          </h3>


          <div class="field">

            <label>
              Cuaca
            </label>

            <select id="lh_cuaca">

              <option value="">
                Pilih kondisi cuaca
              </option>

              <option value="Cerah">
                Cerah
              </option>

              <option value="Berawan">
                Berawan
              </option>

              <option value="Hujan Ringan">
                Hujan Ringan
              </option>

              <option value="Hujan Lebat">
                Hujan Lebat
              </option>

            </select>

          </div>


          <div class="field">

            <label>
              Tenaga Kerja
            </label>

            <textarea
              id="lh_tenaga"
              placeholder="Jumlah / jenis tenaga kerja"
            ></textarea>

          </div>


          <div class="field">

            <label>
              Peralatan
            </label>

            <textarea
              id="lh_peralatan"
              placeholder="Peralatan yang digunakan"
            ></textarea>

          </div>


          <div class="field">

            <label>
              Material
            </label>

            <textarea
              id="lh_material"
              placeholder="Material yang digunakan"
            ></textarea>

          </div>


          <div class="field">

            <label>
              Kendala
            </label>

            <textarea
              id="lh_kendala"
              placeholder="Kendala / masalah di lapangan"
            ></textarea>

          </div>

        </div>


        <!-- =============================================
             DOKUMENTASI
             ============================================= -->

        <div class="card">

          <h3>
            Dokumentasi
          </h3>

          <p
            style="
              margin:0 0 10px;
              font-size:12px;
              color:#64748b;
            "
          >
            Foto dokumentasi dapat ditambahkan melalui
            menu Dokumentasi.
          </p>

          <button
            class="btn"
            type="button"
            id="lh_photo"
          >
            📷 Buka Dokumentasi
          </button>

        </div>


        <!-- =============================================
             PETUGAS
             ============================================= -->

        <div class="card">

          <h3>
            Petugas
          </h3>


          <div class="field">

            <label>
              Dibuat oleh
            </label>

            <input
              id="lh_dibuat"
              value="${PAG.LaporanHarian.escape(namaUser)}"
              placeholder="Nama personil"
            >

          </div>


          <div class="field">

            <label>
              Diketahui oleh
            </label>

            <input
              id="lh_diketahui"
              placeholder="Nama SE / TL"
            >

          </div>

        </div>


        <!-- =============================================
             SIMPAN
             ============================================= -->

        <div class="card">

          <button
            class="btn"
            type="button"
            id="lh_save"
          >
            💾 Simpan Laporan
          </button>

        </div>

      `;


      /* =================================================
         REFERENSI
         ================================================= */

      const saveBtn =
        document.getElementById(
          "lh_save"
        );

      const photoBtn =
        document.getElementById(
          "lh_photo"
        );


      /* =================================================
         DOKUMENTASI
         ================================================= */

      if (photoBtn) {

        photoBtn.addEventListener(
          "click",
          () => {

            if (
              PAG.Router &&
              typeof PAG.Router.go === "function"
            ) {

              PAG.Router.go(
                "photo"
              );

            }

          }
        );

      }


      /* =================================================
         SIMPAN
         ================================================= */

      if (saveBtn) {

        saveBtn.addEventListener(
          "click",
          async () => {

            try {

              saveBtn.disabled =
                true;

              saveBtn.textContent =
                "⏳ Menyimpan...";


              const reportData = {

                id:
                  "LH-" +
                  Date.now(),

                konsultan:
                  document
                    .getElementById(
                      "lh_konsultan"
                    )
                    ?.value
                    .trim() || "",

                paket:
                  document
                    .getElementById(
                      "lh_paket"
                    )
                    ?.value
                    .trim() || "",

                noKontrak:
                  document
                    .getElementById(
                      "lh_no_kontrak"
                    )
                    ?.value
                    .trim() || "",

                tglKontrak:
                  document
                    .getElementById(
                      "lh_tgl_kontrak"
                    )
                    ?.value
                    .trim() || "",

                kontraktor:
                  document
                    .getElementById(
                      "lh_kontraktor"
                    )
                    ?.value
                    .trim() || "",

                tanggal:
                  document
                    .getElementById(
                      "lh_tanggal"
                    )
                    ?.value || "",

                devisi:
                  document
                    .getElementById(
                      "lh_devisi"
                    )
                    ?.value
                    .trim() || "",

                sta:
                  document
                    .getElementById(
                      "lh_sta"
                    )
                    ?.value
                    .trim() || "",

                cuaca:
                  document
                    .getElementById(
                      "lh_cuaca"
                    )
                    ?.value || "",

                tenaga:
                  document
                    .getElementById(
                      "lh_tenaga"
                    )
                    ?.value
                    .trim() || "",

                peralatan:
                  document
                    .getElementById(
                      "lh_peralatan"
                    )
                    ?.value
                    .trim() || "",

                material:
                  document
                    .getElementById(
                      "lh_material"
                    )
                    ?.value
                    .trim() || "",

                kendala:
                  document
                    .getElementById(
                      "lh_kendala"
                    )
                    ?.value
                    .trim() || "",

                uraian:
                  document
                    .getElementById(
                      "lh_uraian"
                    )
                    ?.value
                    .trim() || "",

                dibuat:
                  document
                    .getElementById(
                      "lh_dibuat"
                    )
                    ?.value
                    .trim() || "",

                diketahui:
                  document
                    .getElementById(
                      "lh_diketahui"
                    )
                    ?.value
                    .trim() || "",

                createdAt:
                  new Date()
                    .toISOString()

              };


              /* =======================================
                 LOCAL STORAGE
                 ======================================= */

              if (
                PAG.Storage &&
                typeof PAG.Storage.put === "function"
              ) {

                await PAG.Storage.put(
                  "reports",
                  {

                    id:
                      reportData.id,

                    type:
                      "laporan_harian",

                    data:
                      reportData,

                    createdAt:
                      reportData.createdAt

                  }
                );

              }


              /* =======================================
                 OFFLINE QUEUE
                 ======================================= */

              if (
                PAG.OfflineSync &&
                typeof PAG.OfflineSync.add === "function"
              ) {

                await PAG.OfflineSync.add(
                  "laporan_harian",
                  reportData
                );

              }


              /* =======================================
                 AUTO SYNC
                 ======================================= */

              if (
                navigator.onLine &&
                PAG.OfflineSync &&
                typeof PAG.OfflineSync.run === "function"
              ) {

                try {

                  await PAG.OfflineSync.run();

                } catch (syncError) {

                  console.warn(
                    "Sync belum berhasil:",
                    syncError
                  );

                }

              }


              /* =======================================
                 SELESAI
                 ======================================= */

              if (
                PAG.UI &&
                typeof PAG.UI.toast === "function"
              ) {

                PAG.UI.toast(
                  "Laporan berhasil disimpan"
                );

              }


              saveBtn.textContent =
                "✅ Tersimpan";


            } catch (error) {

              console.error(
                "Laporan Harian error:",
                error
              );


              if (
                PAG.UI &&
                typeof PAG.UI.toast === "function"
              ) {

                PAG.UI.toast(
                  "Gagal menyimpan laporan"
                );

              }


              saveBtn.textContent =
                "💾 Simpan Laporan";


            } finally {

              saveBtn.disabled =
                false;

            }

          }
        );

      }


    } catch (error) {

      console.error(
        "PAG.LaporanHarian ERROR:",
        error
      );


      v.innerHTML = `

        <div class="card">

          <h3>
            Laporan Harian gagal dimuat
          </h3>

          <p>
            ${PAG.LaporanHarian.escape(
              error?.message ||
              String(error)
            )}
          </p>

          <button
            class="btn"
            type="button"
            onclick="PAG.Router.go('home')"
          >
            Kembali
          </button>

        </div>

      `;

    }

  },


  /* =================================================
     ESCAPE
     ================================================= */

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
   DEBUG
   ===================================================== */

console.log(
  "PAG.LaporanHarian loaded:",
  typeof PAG.LaporanHarian,
  typeof PAG.LaporanHarian?.render
);
