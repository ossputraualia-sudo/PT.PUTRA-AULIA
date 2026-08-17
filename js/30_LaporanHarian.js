PAG.LaporanHarian = {

  async render(v) {

    try {

      // ==================================================
      // AMBIL MASTER
      // ==================================================

      const m =
        await PAG.WebUtamaSync.getMaster();

      const paket =
        Array.isArray(m?.paket)
          ? m.paket
          : [];

      const p =
        paket[0] || null;


      // ==================================================
      // TAMPILAN
      // ==================================================

      v.innerHTML = `

        <div class="hero">

          <small>
            PAG DOCS FIELD
          </small>

          <h2>
            Laporan Harian
          </h2>

          <div>
            ${this.escape(
              p?.nama ||
              "Paket belum tersinkron"
            )}
          </div>

        </div>


        <div class="card">

          <div class="field">

            <label>
              Progress
            </label>

            <textarea
              id="lh_progress"
              placeholder="Masukkan progress pekerjaan hari ini..."
            ></textarea>

          </div>


          <div class="field">

            <label>
              Cuaca & Kondisi
            </label>

            <textarea
              id="lh_cuaca"
              placeholder="Cuaca, kondisi lapangan..."
            ></textarea>

          </div>


          <div class="field">

            <label>
              Tenaga & Peralatan
            </label>

            <textarea
              id="lh_tenaga"
              placeholder="Jumlah tenaga kerja dan peralatan..."
            ></textarea>

          </div>


          <div class="field">

            <label>
              Material
            </label>

            <textarea
              id="lh_material"
              placeholder="Material yang digunakan/diterima..."
            ></textarea>

          </div>


          <div class="field">

            <label>
              Kendala
            </label>

            <textarea
              id="lh_kendala"
              placeholder="Kendala atau permasalahan..."
            ></textarea>

          </div>


          <button
            class="btn"
            id="lh_save"
            type="button"
          >
            Simpan & Kirim
          </button>

        </div>

      `;


      // ==================================================
      // SAVE
      // ==================================================

      const save =
        document.getElementById(
          "lh_save"
        );


      if (!save) {

        throw new Error(
          "Tombol Simpan tidak ditemukan."
        );

      }


      save.addEventListener(
        "click",
        async () => {

          try {

            save.disabled = true;

            save.textContent =
              "Menyimpan...";


            const user =
              PAG.Auth.get();


            const data = {

              id:
                "LH-" +
                Date.now(),

              packageId:
                p?.id || "",

              packageName:
                p?.nama || "",

              personilId:
                user?.userId || "",

              personilName:
                user?.name || "",

              tanggal:
                new Date().toISOString(),

              progress:
                document.getElementById(
                  "lh_progress"
                ).value.trim(),

              cuaca:
                document.getElementById(
                  "lh_cuaca"
                ).value.trim(),

              tenaga:
                document.getElementById(
                  "lh_tenaga"
                ).value.trim(),

              material:
                document.getElementById(
                  "lh_material"
                ).value.trim(),

              kendala:
                document.getElementById(
                  "lh_kendala"
                ).value.trim()

            };


            // ==========================================
            // SIMPAN LOKAL
            // ==========================================

            await PAG.Storage.put(
              "reports",
              {
                id:
                  data.id,

                data:
                  data,

                createdAt:
                  new Date().toISOString()
              }
            );


            // ==========================================
            // MASUK QUEUE
            // ==========================================

            await PAG.OfflineSync.add(
              "laporan_harian",
              data
            );


            // ==========================================
            // COBA SINKRONISASI
            // ==========================================

            if (navigator.onLine) {

              await PAG.OfflineSync.run();

            }


            PAG.UI.toast(
              "Laporan tersimpan"
            );


            save.textContent =
              "Tersimpan ✓";


          } catch (error) {

            console.error(
              "Laporan Harian:",
              error
            );


            PAG.UI.toast(
              "Gagal menyimpan laporan"
            );


            save.textContent =
              "Simpan & Kirim";


          } finally {

            save.disabled =
              false;

          }

        }
      );


    } catch (error) {

      console.error(
        "LaporanHarian.render:",
        error
      );


      v.innerHTML = `

        <div
          class="card"
          style="margin:16px"
        >

          <h3>
            Laporan Harian
          </h3>

          <p>
            Halaman gagal dimuat.
          </p>

          <small>
            ${this.escape(
              error.message ||
              String(error)
            )}
          </small>

        </div>

      `;

    }

  },


  // ====================================================
  // ESCAPE HTML
  // ====================================================

  escape(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }

};
