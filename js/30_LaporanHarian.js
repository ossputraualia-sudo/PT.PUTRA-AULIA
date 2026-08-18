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
      console.warn("Laporan Harian Master:", error);
    }

    var konsultan = master.konsultan || "";
    var kontraktor = master.kontraktor || "";
    var noKontrak = master.noKontrak || "";
    var tglKontrak = master.tglKontrak || "";

    var paket = "";

    if (
      Array.isArray(master.paket) &&
      master.paket.length
    ) {
      var p = master.paket[0] || {};

      paket =
        p.nama ||
        p.namaPaket ||
        p.paket ||
        "";
    }

    var user =
      PAG.Auth &&
      typeof PAG.Auth.get === "function"
        ? PAG.Auth.get() || {}
        : {};

    var namaPersonil =
      user.name ||
      user.nama ||
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
              value="${laporanEscape(
                normalDate(tglKontrak)
              )}"
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
      document.getElementById("lh_items");

    var addBtn =
      document.getElementById("lh_add_row");

    var saveBtn =
      document.getElementById("lh_save");


    if (!itemsContainer || !addBtn || !saveBtn) {
      return;
    }


    /* ===================================================
       ADD ITEM
       =================================================== */

    function addItem(data) {

      data = data || {};

      var item =
        document.createElement("div");

      item.className =
        "laporan-item";


      var nomor =
        itemsContainer.children.length + 1;


      item.innerHTML = `

        <div class="laporan-item-header">

          <div>

            <span class="laporan-item-number">
              ${nomor}
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
                (_, i) => {

                  var value =
                    "Divisi " + (i + 1);

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
                Pilih
              </option>

              <option value="Cerah"
                ${
                  data.cuaca === "Cerah"
                    ? "selected"
                    : ""
                }
              >
                Cerah
              </option>

              <option value="Berawan"
                ${
                  data.cuaca === "Berawan"
                    ? "selected"
                    : ""
                }
              >
                Berawan
              </option>

              <option value="Hujan"
                ${
                  data.cuaca === "Hujan"
                    ? "selected"
                    : ""
                }
              >
                Hujan
              </option>

              <option value="Hujan Lebat"
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


        <!-- DETAIL -->

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


          <!-- DOKUMENTASI -->

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
              Belum ada foto
            </small>

            <img
              class="lh_photo-preview"
              style="
                display:none;
                width:100%;
                margin-top:10px;
                border-radius:12px;
              "
            >

          </div>

        </details>

      `;


      itemsContainer.appendChild(item);


      /* =================================================
         FOTO + WATERMARK
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


            var file =
              fileInput.files[0];


            try {

              fileName.textContent =
                "Memproses foto...";


              var result =
                await PAG.LaporanHarian.createWatermarkPhoto(
                  file,
                  {
                    personil:
                      namaPersonil,

                    paket:
                      document.getElementById(
                        "lh_paket"
                      )?.value || "",

                    sta:
                      item.querySelector(
                        ".lh_sta"
                      )?.value || ""
                  }
                );


              item._watermarkedPhoto =
                result.dataUrl;

              item._watermarkedFileName =
                result.fileName;


              if (preview) {

                preview.src =
                  result.dataUrl;

                preview.style.display =
                  "block";

              }


              fileName.textContent =
                "✓ " +
                result.fileName;


            } catch (error) {

              console.error(
                "Watermark foto:",
                error
              );

              fileName.textContent =
                "Gagal memproses foto";

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
       UPDATE NUMBER
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
      tanggal: today
    });


    /* ===================================================
       ADD
       =================================================== */

    addBtn.addEventListener(
      "click",
      function () {

        addItem({
          tanggal: today
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

          var reportData = {

            id:
              "LH-" + Date.now(),

            type:
              "laporan_harian",

            konsultan:
              getValue("lh_konsultan"),

            kontraktor:
              getValue("lh_kontraktor"),

            paket:
              getValue("lh_paket"),

            noKontrak:
              getValue("lh_noKontrak"),

            tglKontrak:
              getValue("lh_tglKontrak"),

            dibuat:
              getValue("lh_dibuat"),

            diketahui:
              getValue("lh_diketahui"),

            items: [],

            createdAt:
              new Date().toISOString()

          };


          var itemElements =
            itemsContainer.querySelectorAll(
              ".laporan-item"
            );


          if (!itemElements.length) {
            throw new Error(
              "Minimal satu kegiatan harus diisi."
            );
          }


          itemElements.forEach(
            function (item) {

              var photo =
                item._watermarkedPhoto || "";


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
                  item._watermarkedFileName || "",

                dokumentasiDataUrl:
                  photo

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
                ) || "[]"
              );


            reports.unshift(
              reportData
            );


            localStorage.setItem(
              "PAG_FIELD_REPORTS",
              JSON.stringify(
                reports.slice(0, 50)
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


          /* =================================================
             OFFLINE QUEUE
             ================================================= */

          if (
            PAG.OfflineSync &&
            typeof PAG.OfflineSync.add === "function"
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
            typeof PAG.OfflineSync.run === "function"
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
            "Laporan harian tersimpan"
          );


          saveBtn.textContent =
            "Tersimpan ✓";


          /* =================================================
             PINDAH KE PROFIL
             ================================================= */

          setTimeout(
            function () {

              if (
                PAG.Router &&
                typeof PAG.Router.go === "function"
              ) {

                PAG.Router.go("profile");

              }

            },
            700
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

        } finally {

          saveBtn.disabled = false;

        }

      }
    );

  },


  /* =====================================================
     WATERMARK PHOTO
     ===================================================== */

  async createWatermarkPhoto(
    file,
    info
  ) {

    info =
      info || {};


    var image =
      await readImage(file);


    var canvas =
      document.createElement("canvas");


    var maxWidth =
      1600;


    var scale =
      Math.min(
        1,
        maxWidth / image.width
      );


    canvas.width =
      Math.round(
        image.width * scale
      );


    canvas.height =
      Math.round(
        image.height * scale
      );


    var ctx =
      canvas.getContext("2d");


    ctx.drawImage(
      image,
      0,
      0,
      canvas.width,
      canvas.height
    );


    /* =================================================
       WATERMARK
       ================================================= */

    var dateText =
      new Intl.DateTimeFormat(
        "id-ID",
        {
          dateStyle: "medium",
          timeStyle: "medium"
        }
      ).format(
        new Date()
      );


    var lines = [

      "PAG DOCS FIELD",

      info.personil
        ? "Personil: " + info.personil
        : "",

      info.paket
        ? "Paket: " + info.paket
        : "",

      info.sta
        ? "STA: " + info.sta
        : "",

      dateText

    ].filter(Boolean);


    var fontSize =
      Math.max(
        18,
        Math.round(
          canvas.width / 55
        )
      );


    var padding =
      Math.round(
        fontSize * 0.7
      );


    var lineHeight =
      Math.round(
        fontSize * 1.4
      );


    var boxHeight =
      padding * 2 +
      lineHeight * lines.length;


    var boxY =
      canvas.height -
      boxHeight;


    ctx.fillStyle =
      "rgba(0,0,0,0.62)";


    ctx.fillRect(
      0,
      boxY,
      canvas.width,
      boxHeight
    );


    ctx.fillStyle =
      "#ffffff";


    ctx.font =
      "600 " +
      fontSize +
      "px Arial";


    lines.forEach(
      function (line, index) {

        ctx.fillText(
          line,
          padding,
          boxY +
          padding +
          lineHeight *
            (index + 0.8)
        );

      }
    );


    var dataUrl =
      canvas.toDataURL(
        "image/jpeg",
        0.82
      );


    return {

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
        ".jpg"

    };

  }

};


/* =====================================================
   READ IMAGE
   ===================================================== */

function readImage(file) {

  return new Promise(
    function(resolve, reject) {

      var reader =
        new FileReader();


      reader.onload =
        function(event) {

          var img =
            new Image();


          img.onload =
            function() {

              resolve(img);

            };


          img.onerror =
            reject;


          img.src =
            event.target.result;

        };


      reader.onerror =
        reject;


      reader.readAsDataURL(
        file
      );

    }
  );

}


/* =====================================================
   GET VALUE
   ===================================================== */

function getValue(id) {

  var element =
    document.getElementById(id);


  if (!element) {
    return "";
  }


  return String(
    element.value || ""
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
    element.value || ""
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
    .slice(0, 10);

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
      function() {

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
