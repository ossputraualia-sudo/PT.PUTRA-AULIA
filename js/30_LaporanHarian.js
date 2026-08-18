/* =====================================================
   PAG DOCS FIELD
   30_LaporanHarian.js
   LAPORAN HARIAN
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


    /* ===================================================
       MASTER
       =================================================== */

    var master = {};

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
        "Laporan Harian Master:",
        error
      );

    }


    var konsultan =
      master.konsultan || "";

    var kontraktor =
      master.kontraktor || "";

    var noKontrak =
      master.noKontrak || "";

    var tglKontrak =
      master.tglKontrak || "";

    var paket =
      "";

    if (
      Array.isArray(master.paket) &&
      master.paket.length
    ) {

      var p =
        master.paket[0] || {};

      paket =
        p.nama ||
        p.namaPaket ||
        p.paket ||
        "";

    }


    /* ===================================================
       RENDER
       =================================================== */

    v.innerHTML = `

      <section class="hero laporan-hero">

        <small>
          PAG DOCS FIELD
        </small>

        <h2>
          Laporan Harian
        </h2>

        <div>
          Input kegiatan pekerjaan hari ini
        </div>

      </section>


      <section class="card laporan-card">

        <div class="laporan-section-title">
          Informasi Pekerjaan
        </div>

        <div class="laporan-info-grid">

          <div class="laporan-info-item">
            <span>Konsultan</span>
            <b>${laporanEscape(konsultan || "-")}</b>
          </div>

          <div class="laporan-info-item">
            <span>Kontraktor</span>
            <b>${laporanEscape(kontraktor || "-")}</b>
          </div>

          <div class="laporan-info-item">
            <span>Paket</span>
            <b>${laporanEscape(paket || "-")}</b>
          </div>

          <div class="laporan-info-item">
            <span>No. Kontrak</span>
            <b>${laporanEscape(noKontrak || "-")}</b>
          </div>

          <div class="laporan-info-item">
            <span>Tanggal Kontrak</span>
            <b>${laporanEscape(tglKontrak || "-")}</b>
          </div>

        </div>

      </section>


      <section class="card laporan-card">

        <div class="laporan-section-header">

          <div>

            <div class="laporan-section-title">
              Kegiatan Hari Ini
            </div>

            <small>
              Tambahkan kegiatan pekerjaan
            </small>

          </div>

          <button
            type="button"
            class="laporan-add-button"
            id="lh_add_row"
          >
            + Kegiatan
          </button>

        </div>


        <div
          id="lh_items"
          class="laporan-items"
        ></div>

      </section>


      <section class="card laporan-card">

        <div class="laporan-section-title">
          Pengesahan
        </div>


        <div class="field">

          <label for="lh_dibuat">
            Dibuat oleh
          </label>

          <input
            id="lh_dibuat"
            type="text"
            placeholder="Nama personil"
          >

        </div>


        <div class="field">

          <label for="lh_diketahui">
            Diketahui oleh
          </label>

          <input
            id="lh_diketahui"
            type="text"
            placeholder="Nama SE / TL"
          >

        </div>


        <button
          type="button"
          class="btn"
          id="lh_save"
        >
          Simpan & Kirim
        </button>

      </section>

    `;


    /* ===================================================
       REFERENSI
       =================================================== */

    var itemsContainer =
      document.getElementById("lh_items");

    var addBtn =
      document.getElementById("lh_add_row");

    var saveBtn =
      document.getElementById("lh_save");


    if (!itemsContainer || !addBtn || !saveBtn) {

      console.error(
        "Laporan Harian: elemen UI tidak lengkap."
      );

      return;

    }


    /* ===================================================
       ADD ITEM
       =================================================== */

    function addItem(data) {

      data =
        data || {};

      var item =
        document.createElement("div");

      item.className =
        "laporan-item";


      item.innerHTML = `

        <div class="laporan-item-header">

          <div>

            <span class="laporan-item-number">
              ${itemsContainer.children.length + 1}
            </span>

            <b>
              Kegiatan Pekerjaan
            </b>

          </div>

          <button
            type="button"
            class="laporan-remove"
          >
            Hapus
          </button>

        </div>


        <div class="laporan-main-grid">

          <div class="field">

            <label>
              Tanggal
            </label>

            <input
              type="date"
              class="lh_tanggal"
              value="${laporanEscape(data.tanggal || "")}"
            >

          </div>


          <div class="field">

            <label>
              Divisi
            </label>

            <input
              type="text"
              class="lh_devisi"
              value="${laporanEscape(data.devisi || "")}"
              placeholder="Contoh: Divisi 1"
            >

          </div>


          <div class="field">

            <label>
              STA
            </label>

            <input
              type="text"
              class="lh_sta"
              value="${laporanEscape(data.sta || "")}"
              placeholder="Contoh: STA 1+200"
            >

          </div>


          <div class="field">

            <label>
              Cuaca
            </label>

            <select class="lh_cuaca">

              <option value="">
                Pilih
              </option>

              <option value="Cerah"
                ${data.cuaca === "Cerah" ? "selected" : ""}
              >
                Cerah
              </option>

              <option value="Berawan"
                ${data.cuaca === "Berawan" ? "selected" : ""}
              >
                Berawan
              </option>

              <option value="Hujan"
                ${data.cuaca === "Hujan" ? "selected" : ""}
              >
                Hujan
              </option>

              <option value="Hujan Lebat"
                ${data.cuaca === "Hujan Lebat" ? "selected" : ""}
              >
                Hujan Lebat
              </option>

            </select>

          </div>

        </div>


        <details class="laporan-detail">

          <summary>
            Detail kegiatan
          </summary>


          <div class="field">

            <label>
              Uraian Pekerjaan
            </label>

            <textarea
              class="lh_uraian"
              placeholder="Jelaskan pekerjaan yang dilaksanakan..."
            >${laporanEscape(data.uraian || "")}</textarea>

          </div>


          <div class="field">

            <label>
              Tenaga Kerja
            </label>

            <textarea
              class="lh_tenaga"
              placeholder="Contoh: Mandor 2, Pekerja 8..."
            >${laporanEscape(data.tenaga || "")}</textarea>

          </div>


          <div class="field">

            <label>
              Peralatan
            </label>

            <textarea
              class="lh_peralatan"
              placeholder="Contoh: Excavator 1 unit..."
            >${laporanEscape(data.peralatan || "")}</textarea>

          </div>


          <div class="field">

            <label>
              Material
            </label>

            <textarea
              class="lh_material"
              placeholder="Material yang digunakan..."
            >${laporanEscape(data.material || "")}</textarea>

          </div>


          <div class="field">

            <label>
              Kendala
            </label>

            <textarea
              class="lh_kendala"
              placeholder="Kendala atau kondisi khusus..."
            >${laporanEscape(data.kendala || "")}</textarea>

          </div>


          <div class="field">

            <label>
              Dokumentasi
            </label>

            <input
              type="file"
              accept="image/*"
              capture="environment"
              class="lh_dokumentasi"
            >

            <small class="laporan-file-name">
              ${laporanEscape(
                data.dokumentasi || "Belum ada foto"
              )}
            </small>

          </div>

        </details>

      `;


      itemsContainer.appendChild(item);


      /* =================================================
         FILE
         ================================================= */

      var fileInput =
        item.querySelector(".lh_dokumentasi");

      var fileName =
        item.querySelector(".laporan-file-name");

      if (fileInput) {

        fileInput.addEventListener(
          "change",
          function () {

            if (
              fileInput.files &&
              fileInput.files.length
            ) {

              fileName.textContent =
                fileInput.files[0].name;

            }

          }
        );

      }


      /* =================================================
         REMOVE
         ================================================= */

      var removeBtn =
        item.querySelector(".laporan-remove");

      if (removeBtn) {

        removeBtn.addEventListener(
          "click",
          function () {

            item.remove();

            updateNumbers();

          }
        );

      }


      updateNumbers();

    }


    /* ===================================================
       NUMBER
       =================================================== */

    function updateNumbers() {

      var items =
        itemsContainer.querySelectorAll(
          ".laporan-item"
        );

      items.forEach(
        function (item, index) {

          var number =
            item.querySelector(
              ".laporan-item-number"
            );

          if (number) {

            number.textContent =
              index + 1;

          }

        }
      );

    }


    /* ===================================================
       DEFAULT ITEM
       =================================================== */

    addItem({
      tanggal:
        new Date()
          .toISOString()
          .slice(0, 10)
    });


    /* ===================================================
       ADD
       =================================================== */

    addBtn.addEventListener(
      "click",
      function () {

        addItem({
          tanggal:
            new Date()
              .toISOString()
              .slice(0, 10)
        });

        var items =
          itemsContainer.querySelectorAll(
            ".laporan-item"
          );

        var last =
          items[items.length - 1];

        if (last) {

          last.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

        }

      }
    );


    /* ===================================================
       SAVE
       =================================================== */

    saveBtn.addEventListener(
      "click",
      async function () {

        saveBtn.disabled = true;

        saveBtn.textContent =
          "Menyimpan...";


        try {

          var dibuat =
            document
              .getElementById("lh_dibuat")
              .value
              .trim();

          var diketahui =
            document
              .getElementById("lh_diketahui")
              .value
              .trim();


          var itemElements =
            itemsContainer.querySelectorAll(
              ".laporan-item"
            );

          if (!itemElements.length) {

            throw new Error(
              "Minimal satu kegiatan harus diisi."
            );

          }


          /* =========================================
             COLLECT
             ========================================= */

          var items = [];

          itemElements.forEach(
            function (item) {

              var fileInput =
                item.querySelector(
                  ".lh_dokumentasi"
                );

              var dokumentasi = "";

              if (
                fileInput &&
                fileInput.files &&
                fileInput.files.length
              ) {

                dokumentasi =
                  fileInput.files[0].name;

              }


              items.push({

                tanggal:
                  getInputValue(
                    item,
                    ".lh_tanggal"
                  ),

                devisi:
                  getInputValue(
                    item,
                    ".lh_devisi"
                  ),

                sta:
                  getInputValue(
                    item,
                    ".lh_sta"
                  ),

                cuaca:
                  getInputValue(
                    item,
                    ".lh_cuaca"
                  ),

                uraian:
                  getInputValue(
                    item,
                    ".lh_uraian"
                  ),

                tenaga:
                  getInputValue(
                    item,
                    ".lh_tenaga"
                  ),

                peralatan:
                  getInputValue(
                    item,
                    ".lh_peralatan"
                  ),

                material:
                  getInputValue(
                    item,
                    ".lh_material"
                  ),

                kendala:
                  getInputValue(
                    item,
                    ".lh_kendala"
                  ),

                dokumentasi:
                  dokumentasi

              });

            }
          );


          /* =========================================
             REPORT
             ========================================= */

          var reportData = {

            id:
              "LH-" + Date.now(),

            type:
              "laporan_harian",

            konsultan:
              konsultan,

            paket:
              paket,

            noKontrak:
              noKontrak,

            tglKontrak:
              tglKontrak,

            kontraktor:
              kontraktor,

            dibuat:
              dibuat,

            diketahui:
              diketahui,

            items:
              items,

            createdAt:
              new Date().toISOString()

          };


          /* =========================================
             STORAGE
             ========================================= */

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


          /* =========================================
             OFFLINE QUEUE
             ========================================= */

          if (
            PAG.OfflineSync &&
            typeof PAG.OfflineSync.add === "function"
          ) {

            await PAG.OfflineSync.add(
              "laporan_harian",
              reportData
            );

          }


          /* =========================================
             AUTO SYNC
             ========================================= */

          if (
            navigator.onLine &&
            PAG.OfflineSync &&
            typeof PAG.OfflineSync.run === "function"
          ) {

            try {

              await PAG.OfflineSync.run();

            } catch (syncError) {

              console.warn(
                "Auto sync gagal.",
                syncError
              );

            }

          }


          laporanToast(
            "Laporan harian tersimpan"
          );

          saveBtn.textContent =
            "Tersimpan ✓";


        } catch (error) {

          console.error(
            "Laporan Harian:",
            error
          );

          laporanToast(
            error.message ||
            "Gagal menyimpan laporan"
          );

          saveBtn.textContent =
            "Simpan & Kirim";

        } finally {

          saveBtn.disabled = false;

        }

      }
    );

  }

};


/* =====================================================
   GET INPUT
   ===================================================== */

function getInputValue(parent, selector) {

  var element =
    parent.querySelector(selector);

  if (!element) {
    return "";
  }

  return String(
    element.value || ""
  ).trim();

}


/* =====================================================
   TOAST
   ===================================================== */

function laporanToast(message) {

  try {

    if (
      PAG.UI &&
      typeof PAG.UI.toast === "function"
    ) {

      PAG.UI.toast(message);
      return;

    }

  } catch (error) {

    console.warn(error);

  }


  var toast =
    document.getElementById("toast");

  if (!toast) {
    return;
  }

  toast.textContent =
    message;

  toast.style.display =
    "block";

  clearTimeout(
    laporanToast.timer
  );

  laporanToast.timer =
    setTimeout(
      function () {

        toast.style.display =
          "none";

      },
      2500
    );

}


/* =====================================================
   ESCAPE
   ===================================================== */

function laporanEscape(value) {

  return String(
    value == null
      ? ""
      : value
  )
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* =====================================================
   DEBUG
   ===================================================== */

console.log(
  "PAG 30_LaporanHarian loaded:",
  !!PAG.LaporanHarian
);
