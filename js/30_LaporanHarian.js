/* =====================================================
PAG DOCS FIELD
LAPORAN HARIAN
MOBILE FIRST
===================================================== */

window.PAG = window.PAG || {};

PAG.LaporanHarian = {

async render(v) {

```
if (!v) {
  console.error(
    "PAG.LaporanHarian: view tidak ditemukan."
  );
  return;
}


/* ===================================================
   LOADING
   =================================================== */

v.innerHTML = `
  <div class="card">
    <p>Memuat laporan harian...</p>
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
     RENDER
     ================================================= */

  v.innerHTML = `

    <!-- =============================================
         HEADER
         ============================================= -->

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
         INFORMASI PAKET
         ============================================= -->

    <div class="card lh-project-card">

      <div class="lh-card-title">

        <span>
          Informasi Pekerjaan
        </span>

        <span class="lh-status-badge">
          Otomatis
        </span>

      </div>


      <div class="lh-project-grid">

        <div class="lh-info">

          <small>
            Paket
          </small>

          <b>
            ${escapeHtml(
              paket || "-"
            )}
          </b>

        </div>


        <div class="lh-info">

          <small>
            Kontraktor
          </small>

          <b>
            ${escapeHtml(
              kontraktor || "-"
            )}
          </b>

        </div>


        <div class="lh-info">

          <small>
            Konsultan
          </small>

          <b>
            ${escapeHtml(
              konsultan || "-"
            )}
          </b>

        </div>


        <div class="lh-info">

          <small>
            No. Kontrak
          </small>

          <b>
            ${escapeHtml(
              noKontrak || "-"
            )}
          </b>

        </div>

      </div>

    </div>


    <!-- =============================================
         DATA PENYUSUN
         ============================================= -->

    <div class="card">

      <div class="lh-card-title">

        <span>
          Penanggung Jawab
        </span>

      </div>


      <div class="field">

        <label>
          Dibuat oleh
        </label>

        <input
          id="lh_dibuat"
          type="text"
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

    </div>


    <!-- =============================================
         KEGIATAN
         ============================================= -->

    <div class="lh-section-header">

      <div>

        <h3>
          Kegiatan Pekerjaan
        </h3>

        <small>
          Tambahkan setiap kegiatan yang terjadi hari ini
        </small>

      </div>


      <span
        id="lh_count"
        class="lh-count"
      >
        0
      </span>

    </div>


    <div
      id="lh_activity_list"
      class="lh-activity-list"
    ></div>


    <!-- =============================================
         TAMBAH KEGIATAN
         ============================================= -->

    <button
      id="lh_add_activity"
      class="lh-add-button"
      type="button"
    >

      <span class="lh-add-icon">
        +
      </span>

      <span>
        Tambah Kegiatan
      </span>

    </button>


    <!-- =============================================
         CATATAN
         ============================================= -->

    <div class="card">

      <div class="lh-card-title">

        <span>
          Catatan Tambahan
        </span>

      </div>


      <div class="field">

        <textarea
          id="lh_catatan"
          placeholder="Catatan tambahan mengenai kondisi pekerjaan..."
          style="min-height:100px;"
        ></textarea>

      </div>

    </div>


    <!-- =============================================
         BOTTOM ACTION
         ============================================= -->

    <div class="lh-save-area">

      <button
        id="lh_save"
        class="btn lh-save-button"
        type="button"
      >

        💾 Simpan & Kirim

      </button>

    </div>

  `;


  /* =================================================
     ELEMENT
     ================================================= */

  const list =
    document.getElementById(
      "lh_activity_list"
    );

  const addBtn =
    document.getElementById(
      "lh_add_activity"
    );

  const saveBtn =
    document.getElementById(
      "lh_save"
    );

  const countEl =
    document.getElementById(
      "lh_count"
    );


  /* =================================================
     TAMBAH KEGIATAN
     ================================================= */

  function addActivity(data = {}) {

    const index =
      list.children.length + 1;


    const card =
      document.createElement("div");

    card.className =
      "lh-activity-card";


    card.innerHTML = `

      <!-- HEADER -->

      <div class="lh-activity-header">

        <div>

          <span class="lh-activity-number">
            Kegiatan ${index}
          </span>

          <small>
            Data kegiatan lapangan
          </small>

        </div>


        <button
          type="button"
          class="lh-delete-button"
          title="Hapus kegiatan"
        >
          ×
        </button>

      </div>


      <!-- DATA UTAMA -->

      <div class="lh-main-fields">


        <div class="field">

          <label>
            Tanggal
          </label>

          <input
            type="date"
            class="lh_tanggal"
            value="${escapeHtml(
              data.tanggal ||
              new Date().toISOString().slice(0,10)
            )}"
          >

        </div>


        <div class="field">

          <label>
            Divisi
          </label>

          <input
            type="text"
            class="lh_devisi"
            value="${escapeHtml(
              data.devisi || ""
            )}"
            placeholder="Contoh: Divisi 1"
          >

        </div>


        <div class="field">

          <label>
            STA / Lokasi
          </label>

          <input
            type="text"
            class="lh_sta"
            value="${escapeHtml(
              data.sta || ""
            )}"
            placeholder="Contoh: STA 12+500"
          >

        </div>


        <div class="field">

          <label>
            Uraian Pekerjaan
          </label>

          <textarea
            class="lh_uraian"
            placeholder="Jelaskan pekerjaan yang dilaksanakan..."
          >${escapeHtml(
            data.uraian || ""
          )}</textarea>

        </div>


      </div>


      <!-- DETAIL -->

      <details class="lh-detail">

        <summary>
          <span>
            Detail Pekerjaan
          </span>

          <small>
            Cuaca · Tenaga · Alat · Kendala
          </small>
        </summary>


        <div class="lh-detail-content">


          <div class="field">

            <label>
              Cuaca
            </label>

            <input
              type="text"
              class="lh_cuaca"
              value="${escapeHtml(
                data.cuaca || ""
              )}"
              placeholder="Contoh: Cerah"
            >

          </div>


          <div class="field">

            <label>
              Tenaga Kerja
            </label>

            <textarea
              class="lh_tenaga"
              placeholder="Contoh: Mandor 2, Tukang 5, Pekerja 10"
            >${escapeHtml(
              data.tenaga || ""
            )}</textarea>

          </div>


          <div class="field">

            <label>
              Peralatan
            </label>

            <textarea
              class="lh_peralatan"
              placeholder="Contoh: Excavator 1 unit, Dump Truck 3 unit"
            >${escapeHtml(
              data.peralatan || ""
            )}</textarea>

          </div>


          <div class="field">

            <label>
              Kendala
            </label>

            <textarea
              class="lh_kendala"
              placeholder="Tuliskan kendala jika ada"
            >${escapeHtml(
              data.kendala || ""
            )}</textarea>

          </div>


        </div>

      </details>


      <!-- DOKUMENTASI -->

      <div class="lh-photo-section">

        <label>
          📷 Dokumentasi
        </label>


        <input
          type="file"
          accept="image/*"
          capture="environment"
          class="lh_dokumentasi"
        />


        <small>
          Ambil foto langsung dari kamera HP
        </small>

      </div>


    `;


    /* =================================================
       DELETE
       ================================================= */

    const deleteBtn =
      card.querySelector(
        ".lh-delete-button"
      );


    deleteBtn.addEventListener(
      "click",
      function () {

        card.remove();

        updateNumbers();

      }
    );


    list.appendChild(card);

    updateNumbers();

  }


  /* =================================================
     NOMOR KEGIATAN
     ================================================= */

  function updateNumbers() {

    const cards =
      list.querySelectorAll(
        ".lh-activity-card"
      );


    cards.forEach(
      (card, index) => {

        const label =
          card.querySelector(
            ".lh-activity-number"
          );

        if (label) {

          label.textContent =
            "Kegiatan " +
            (index + 1);

        }

      }
    );


    if (countEl) {

      countEl.textContent =
        cards.length;

    }

  }


  /* =================================================
     DATA AWAL
     ================================================= */

  addActivity();


  /* =================================================
     ADD BUTTON
     ================================================= */

  addBtn.addEventListener(
    "click",
    function () {

      addActivity();

      const cards =
        list.querySelectorAll(
          ".lh-activity-card"
        );

      const last =
        cards[cards.length - 1];

      if (last) {

        last.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }

    }
  );


  /* =================================================
     SAVE
     ================================================= */

  saveBtn.addEventListener(
    "click",
    async function () {

      try {

        saveBtn.disabled = true;

        saveBtn.textContent =
          "⏳ Menyimpan...";


        /* =========================================
           PENANGGUNG JAWAB
           ========================================= */

        const dibuat =
          document
            .getElementById(
              "lh_dibuat"
            )
            .value
            .trim();


        const diketahui =
          document
            .getElementById(
              "lh_diketahui"
            )
            .value
            .trim();


        const catatan =
          document
            .getElementById(
              "lh_catatan"
            )
            .value
            .trim();


        /* =========================================
           VALIDASI
           ========================================= */

        const cards =
          list.querySelectorAll(
            ".lh-activity-card"
          );


        if (!cards.length) {

          PAG.UI.toast(
            "Tambahkan minimal satu kegiatan."
          );

          return;

        }


        /* =========================================
           KUMPULKAN KEGIATAN
           ========================================= */

        const items = [];


        cards.forEach(card => {

          const tanggal =
            card.querySelector(
              ".lh_tanggal"
            ).value;


          const devisi =
            card.querySelector(
              ".lh_devisi"
            ).value.trim();


          const sta =
            card.querySelector(
              ".lh_sta"
            ).value.trim();


          const cuaca =
            card.querySelector(
              ".lh_cuaca"
            ).value.trim();


          const tenaga =
            card.querySelector(
              ".lh_tenaga"
            ).value.trim();


          const peralatan =
            card.querySelector(
              ".lh_peralatan"
            ).value.trim();


          const kendala =
            card.querySelector(
              ".lh_kendala"
            ).value.trim();


          const uraian =
            card.querySelector(
              ".lh_uraian"
            ).value.trim();


          const fileInput =
            card.querySelector(
              ".lh_dokumentasi"
            );


          const dokumentasi =
            fileInput &&
            fileInput.files &&
            fileInput.files[0]
              ? fileInput.files[0].name
              : "";


          items.push({

            tanggal,

            devisi,

            sta,

            cuaca,

            tenaga,

            peralatan,

            kendala,

            uraian,

            dokumentasi

          });

        });


        /* =========================================
           REPORT DATA
           ========================================= */

        const reportData = {

          id:
            "LH-" +
            Date.now(),

          konsultan,

          paket,

          noKontrak,

          tglKontrak,

          kontraktor,

          dibuat,

          diketahui,

          catatan,

          items,

          createdAt:
            new Date().toISOString()

        };


        /* =========================================
           STORAGE
           ========================================= */

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


        /* =========================================
           OFFLINE QUEUE
           ========================================= */

        await PAG.OfflineSync.add(

          "laporan_harian",

          reportData

        );


        /* =========================================
           AUTO SYNC
           ========================================= */

        if (
          navigator.onLine &&
          PAG.OfflineSync &&
          typeof PAG.OfflineSync.run ===
            "function"
        ) {

          await PAG.OfflineSync.run();

        }


        /* =========================================
           SUCCESS
           ========================================= */

        PAG.UI.toast(
          "Laporan harian berhasil disimpan."
        );


        saveBtn.textContent =
          "✅ Tersimpan";


      } catch (error) {

        console.error(
          "Laporan Harian error:",
          error
        );


        PAG.UI.toast(
          "Gagal menyimpan: " +
          (
            error?.message ||
            String(error)
          )
        );


        saveBtn.textContent =
          "💾 Simpan & Kirim";


      } finally {

        saveBtn.disabled =
          false;

      }

    }
  );


} catch (error) {

  console.error(
    "PAG.LaporanHarian ERROR:",
    error
  );


  v.innerHTML = `

    <div class="card">

      <h3>
        Laporan gagal dimuat
      </h3>

      <p>
        ${escapeHtml(
          error?.message ||
          String(error)
        )}
      </p>


      <button
        class="btn"
        type="button"
        onclick="
          PAG.Router.go('home')
        "
      >
        Kembali
      </button>

    </div>

  `;

}
```

}

};

/* =====================================================
ESCAPE HTML
===================================================== */

function escapeHtml(value) {

return String(value ?? "")

```
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
```

}

/* =====================================================
DEBUG
===================================================== */

console.log(
"PAG.LaporanHarian loaded:",
!!PAG.LaporanHarian
);
