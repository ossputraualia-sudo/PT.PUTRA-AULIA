```javascript
/* =====================================================
   PAG DOCS FIELD
   30_LaporanHarian.js
   LAPORAN HARIAN
   ===================================================== */

window.PAG = window.PAG || {};

PAG.LaporanHarian = {

  async render(v) {

    if (!v) return;

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


    /* ===================================================
       MASTER
       =================================================== */

    var konsultan =
      master.konsultan || "";

    var kontraktor =
      master.kontraktor || "";

    var noKontrak =
      master.noKontrak || "";

    var tglKontrak =
      normalDate(master.tglKontrak || "");


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
       USER
       =================================================== */

    var user = {};

    try {

      if (
        PAG.Auth &&
        typeof PAG.Auth.get === "function"
      ) {

        user =
          PAG.Auth.get() || {};

      }

    } catch (error) {

      console.warn(
        "Laporan Harian User:",
        error
      );

    }


    var namaPersonil =
      user.name ||
      user.nama ||
      user.namaPersonil ||
      user.displayName ||
      "";


    var today =
      new Date()
        .toISOString()
        .slice(0, 10);


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


      <!-- =================================================
           INFORMASI PEKERJAAN
           ================================================= -->

      <section class="card laporan-card">

        <div class="laporan-section-title">
          Informasi Pekerjaan
        </div>

        <div class="laporan-info-grid">

          <div class="field">

            <label>
              Konsultan
            </label>

            <input
              id="lh_konsultan"
              type="text"
              value="${laporanEscape(konsultan)}"
              placeholder="Nama konsultan"
            >

          </div>


          <div class="field">

            <label>
              Kontraktor
            </label>

            <input
              id="lh_kontraktor"
              type="text"
              value="${laporanEscape(kontraktor)}"
              placeholder="Nama kontraktor"
            >

          </div>


          <div class="field">

            <label>
              Paket Pekerjaan
            </label>

            <input
              id="lh_paket"
              type="text"
              value="${laporanEscape(paket)}"
              placeholder="Nama paket pekerjaan"
            >

          </div>


          <div class="field">

            <label>
              No. Kontrak
            </label>

            <input
              id="lh_noKontrak"
              type="text"
              value="${laporanEscape(noKontrak)}"
              placeholder="Nomor kontrak"
            >

          </div>


          <div class="field">

            <label>
              Tanggal Kontrak
            </label>

            <input
              id="lh_tglKontrak"
              type="date"
              value="${laporanEscape(tglKontrak)}"
            >

          </div>

        </div>

      </section>


      <!-- =================================================
           KEGIATAN
           ================================================= -->

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


      <!-- =================================================
           PENGESAHAN
           ================================================= -->

      <section class="card laporan-card">

        <div class="laporan-section-title">
          Pengesahan
        </div>


        <div class="field">

          <label>
            Dibuat oleh
          </label>

          <input
            id="lh_dibuat"
            type="text"
            value="${laporanEscape(namaPersonil)}"
            placeholder="Nama personil"
          >

        </div>


        <div class="field">

          <label>
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


    var itemsContainer =
      document.getElementById(
        "lh_items"
      );

    var addBtn =
      document.getElementById(
        "lh_add_row"
      );

    var saveBtn =
      document.getElementById(
        "lh_save"
      );


    if (
      !itemsContainer ||
      !addBtn ||
      !saveBtn
    ) {

      console.error(
        "Laporan Harian: UI tidak lengkap."
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
        document.createElement(
          "div"
        );


      item.className =
        "laporan-item";


      item.innerHTML = `

        <div class="laporan-item-header">

          <div>

            <span class="laporan-item-number">
              1
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


          <!-- TANGGAL -->

          <div class="field">

            <label>
              Tanggal
            </label>

            <input
              type="date"
              class="lh_tanggal"
              value="${laporanEscape(
                data.tanggal || today
              )}"
            >

          </div>


          <!-- DIVISI -->

          <div class="field">

            <label>
              Divisi
            </label>

            <select class="lh_divisi">

              <option value="">
                Pilih Divisi
              </option>

              ${Array.from(
                { length: 10 },
                function (_, index) {

                  var value =
                    "Divisi " +
                    (index + 1);

                  return `

                    <option
                      value="${value}"
                      ${
                        data.divisi === value
                          ? "selected"
                          : ""
                      }
                    >
                      ${value}
                    </option>

                  `;

                }
              ).join("")}

            </select>

          </div>


          <!-- STA -->

          <div class="field">

            <label>
              STA
            </label>

            <input
              type="text"
              class="lh_sta"
              value="${laporanEscape(
                data.sta || ""
              )}"
              placeholder="Contoh: STA 1+200"
            >

          </div>


          <!-- CUACA -->

          <div class="field">

            <label>
              Cuaca
            </label>

            <select class="lh_cuaca">

              <option value="">
                Pilih Cuaca
              </option>

              <option
                value="Cerah"
                ${
                  data.cuaca === "Cerah"
                    ? "selected"
                    : ""
                }
              >
                Cerah
              </option>

              <option
                value="Berawan"
                ${
                  data.cuaca === "Berawan"
                    ? "selected"
                    : ""
                }
              >
                Berawan
              </option>

              <option
                value="Hujan"
                ${
                  data.cuaca === "Hujan"
                    ? "selected"
                    : ""
                }
              >
                Hujan
              </option>

              <option
                value="Hujan Lebat"
                ${
                  data.cuaca === "Hujan Lebat"
                    ? "selected"
                    : ""
                }
              >
                Hujan Lebat
              </option>

            </select>

          </div>

        </div>


        <!-- =================================================
             DETAIL
             ================================================= -->

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
            >${laporanEscape(
              data.uraian || ""
            )}</textarea>

          </div>


          <div class="field">

            <label>
              Tenaga Kerja
            </label>

            <textarea
              class="lh_tenaga"
              placeholder="Contoh: Mandor 2, Pekerja 8..."
            >${laporanEscape(
              data.tenaga || ""
            )}</textarea>

          </div>


          <div class="field">

            <label>
              Peralatan
            </label>

            <textarea
              class="lh_peralatan"
              placeholder="Contoh: Excavator 1 unit..."
            >${laporanEscape(
              data.peralatan || ""
            )}</textarea>

          </div>


          <div class="field">

            <label>
              Material
            </label>

            <textarea
              class="lh_material"
              placeholder="Material yang digunakan..."
            >${laporanEscape(
              data.material || ""
            )}</textarea>

          </div>


          <div class="field">

            <label>
              Kendala
            </label>

            <textarea
              class="lh_kendala"
              placeholder="Kendala atau kondisi khusus..."
            >${laporanEscape(
              data.kendala || ""
            )}</textarea>

          </div>


          <!-- =================================================
               DOKUMENTASI
               ================================================= -->

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
              📷 Ambil foto dokumentasi
            </small>

            <img
              class="lh_photo-preview"
              style="
                display:none;
                width:100%;
                margin-top:10px;
                border-radius:12px;
              "
              alt="Preview dokumentasi"
            >

          </div>

        </details>

      `;


      itemsContainer.appendChild(
        item
      );


      /* =================================================
         FOTO
         ================================================= */

      var fileInput =
        item.querySelector(
          ".lh_dokumentasi"
        );

      var fileName =
        item.querySelector(
          ".laporan-file-name"
        );

      var preview =
        item.querySelector(
          ".lh_photo-preview"
        );


      if (fileInput) {

        fileInput.addEventListener(
          "change",
          async function () {

            if (
              !fileInput.files ||
              !fileInput.files.length
            ) {
              return;
            }


            var originalFile =
              fileInput.files[0];


            try {

              fileName.textContent =
                "⏳ Mengambil GPS...";


              /* =========================================
                 GPS
                 ========================================= */

              var gps = null;


              if (
                PAG.GPSPhoto &&
                typeof PAG.GPSPhoto.capturePosition ===
                  "function"
              ) {

                gps =
                  await PAG.GPSPhoto.capturePosition();

              } else if (
                PAG.GPS &&
                typeof PAG.GPS.get === "function"
              ) {

                gps =
                  await PAG.GPS.get();

              }


              fileName.textContent =
                "⏳ Membuat watermark...";


              /* =========================================
                 WATERMARK
                 ========================================= */

              var watermarkedBlob =
                originalFile;


              if (
                PAG.Watermark &&
                typeof PAG.Watermark.apply ===
                  "function"
              ) {

                watermarkedBlob =
                  await PAG.Watermark.apply(
                    originalFile,
                    {
                      gps:
                        gps,

                      title:
                        "PAG DOCS FIELD",

                      date:
                        new Date()
                    }
                  );

              } else if (
                PAG["43_Watermark"] &&
                typeof PAG["43_Watermark"].apply ===
                  "function"
              ) {

                watermarkedBlob =
                  await PAG["43_Watermark"].apply(
                    originalFile,
                    {
                      gps:
                        gps,

                      title:
                        "PAG DOCS FIELD",

                      date:
                        new Date()
                    }
                  );

              }


              /* =========================================
                 DATA URL
                 ========================================= */

              var dataUrl =
                await PAG.LaporanHarian.blobToDataUrl(
                  watermarkedBlob
                );


              item._photo = {

                dataUrl:
                  dataUrl,

                fileName:
                  "PAG_" +
                  new Date()
                    .toISOString()
                    .replace(
                      /[:.]/g,
                      "-"
                    ) +
                  ".jpg",

                gps:
                  gps || null

              };


              /* =========================================
                 PREVIEW
                 ========================================= */

              if (preview) {

                preview.src =
                  dataUrl;

                preview.style.display =
                  "block";

              }


              fileName.textContent =
                "✓ Foto siap disimpan";


            } catch (error) {

              console.error(
                "Dokumentasi:",
                error
              );


              fileName.textContent =
                "❌ Gagal memproses foto: " +
                (
                  error.message ||
                  "Kesalahan"
                );

            }

          }
        );

      }


      /* =================================================
         REMOVE
         ================================================= */

      var removeBtn =
        item.querySelector(
          ".laporan-remove"
        );


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
       DEFAULT
       =================================================== */

    addItem({
      tanggal:
        today
    });


    /* ===================================================
       ADD
       =================================================== */

    addBtn.addEventListener(
      "click",
      function () {

        addItem({
          tanggal:
            today
        });


        var items =
          itemsContainer.querySelectorAll(
            ".laporan-item"
          );


        var last =
          items[
            items.length - 1
          ];


        if (last) {

          last.scrollIntoView({
            behavior:
              "smooth",
            block:
              "center"
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

        saveBtn.disabled =
          true;

        saveBtn.textContent =
          "Menyimpan...";


        try {

          var reportData = {

            id:
              "LH-" +
              Date.now(),

            type:
              "laporan_harian",

            title:
              "Laporan Harian",

            konsultan:
              getValue(
                "lh_konsultan"
              ),

            kontraktor:
              getValue(
                "lh_kontraktor"
              ),

            paket:
              getValue(
                "lh_paket"
              ),

            noKontrak:
              getValue(
                "lh_noKontrak"
              ),

            tglKontrak:
              getValue(
                "lh_tglKontrak"
              ),

            dibuat:
              getValue(
                "lh_dibuat"
              ),

            diketahui:
              getValue(
                "lh_diketahui"
              ),

            personil:
              namaPersonil,

            items:
              [],

            createdAt:
              new Date().toISOString(),

            updatedAt:
              new Date().toISOString(),

            status:
              "tersimpan"

          };


          var itemElements =
            itemsContainer.querySelectorAll(
              ".laporan-item"
            );


          if (
            !itemElements.length
          ) {

            throw new Error(
              "Minimal satu kegiatan harus diisi."
            );

          }


          itemElements.forEach(
            function (item) {

              var photo =
                item._photo || null;


              reportData.items.push({

                tanggal:
                  getInputValue(
                    item,
                    ".lh_tanggal"
                  ),

                divisi:
                  getInputValue(
                    item,
                    ".lh_divisi"
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
                  photo
                    ? photo.fileName
                    : "",

                dokumentasiDataUrl:
                  photo
                    ? photo.dataUrl
                    : "",

                gps:
                  photo
                    ? photo.gps
                    : null

              });

            }
          );


          /* =================================================
             LOCAL STORAGE
             ================================================= */

          try {

            var reports =
              JSON.parse(
                localStorage.getItem(
                  "PAG_FIELD_REPORTS"
                ) ||
                "[]"
              );


            reports =
              Array.isArray(
                reports
              )
                ? reports
                : [];


            reports.unshift(
              reportData
            );


            localStorage.setItem(
              "PAG_FIELD_REPORTS",
              JSON.stringify(
                reports.slice(
                  0,
                  50
                )
              )
            );

          } catch (localError) {

            console.warn(
              "Local report storage:",
              localError
            );

          }


          /* =================================================
             PAG STORAGE
             ================================================= */

          if (
            PAG.Storage &&
            typeof PAG.Storage.put ===
              "function"
          ) {

            await PAG.Storage.put(
              "reports",
              {
                id:
                  reportData.id,

                type:
                  "laporan_harian",

                title:
                  "Laporan Harian",

                data:
                  reportData,

                createdAt:
                  reportData.createdAt
              }
            );

          }


          /* =================================================
             OFFLINE QUEUE
             ================================================= */

          if (
            PAG.OfflineSync &&
            typeof PAG.OfflineSync.add ===
              "function"
          ) {

            await PAG.OfflineSync.add(
              "laporan_harian",
              reportData
            );

          }


          /* =================================================
             AUTO SYNC
             ================================================= */

          if (
            navigator.onLine &&
            PAG.OfflineSync &&
            typeof PAG.OfflineSync.run ===
              "function"
          ) {

            try {

              await PAG.OfflineSync.run();

            } catch (syncError) {

              console.warn(
                "Auto sync gagal:",
                syncError
              );

            }

          }


          laporanToast(
            "✓ Laporan harian tersimpan"
          );


          saveBtn.textContent =
            "Tersimpan ✓";


          /* =================================================
             KE PROFILE
             ================================================= */

          setTimeout(
            function () {

              if (
                PAG.Router &&
                typeof PAG.Router.go ===
                  "function"
              ) {

                PAG.Router.go(
                  "profile"
                );

              }

            },
            600
          );


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


          saveBtn.disabled =
            false;

        }

      }
    );

  },


  /* =====================================================
     BLOB → DATA URL
     ===================================================== */

  blobToDataUrl(blob) {

    return new Promise(
      function (resolve, reject) {

        var reader =
          new FileReader();


        reader.onload =
          function () {

            resolve(
              reader.result
            );

          };


        reader.onerror =
          reject;


        reader.readAsDataURL(
          blob
        );

      }
    );

  }

};


/* =====================================================
   GET VALUE
   ===================================================== */

function getValue(id) {

  var element =
    document.getElementById(
      id
    );


  if (!element) {
    return "";
  }


  return String(
    element.value ||
    ""
  ).trim();

}


/* =====================================================
   GET INPUT
   ===================================================== */

function getInputValue(
  parent,
  selector
) {

  var element =
    parent.querySelector(
      selector
    );


  if (!element) {
    return "";
  }


  return String(
    element.value ||
    ""
  ).trim();

}


/* =====================================================
   NORMAL DATE
   ===================================================== */

function normalDate(value) {

  if (!value) {
    return "";
  }


  var d =
    new Date(value);


  if (
    isNaN(
      d.getTime()
    )
  ) {

    return "";

  }


  return d
    .toISOString()
    .slice(
      0,
      10
    );

}


/* =====================================================
   TOAST
   ===================================================== */

function laporanToast(
  message
) {

  try {

    if (
      PAG.UI &&
      typeof PAG.UI.toast ===
        "function"
    ) {

      PAG.UI.toast(
        message
      );

      return;

    }

  } catch (error) {}


  var toast =
    document.getElementById(
      "toast"
    );


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

function laporanEscape(
  value
) {

  return String(
    value == null
      ? ""
      : value
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


/* =====================================================
   DEBUG
   ===================================================== */

console.log(
  "PAG 30_LaporanHarian loaded:",
  !!PAG.LaporanHarian
);
```
