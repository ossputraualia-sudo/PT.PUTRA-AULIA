/* =====================================================
   PAG DOCS FIELD
   LAPORAN HARIAN - FORMAT TABEL
   ===================================================== */

PAG.LaporanHarian = {

  async render(v) {

    if (!v) {
      console.error("PAG.LaporanHarian: view tidak ditemukan.");
      return;
    }

    /* ===================================================
       AMBIL DATA MASTER UNTUK HEADER
       =================================================== */

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
      master?.paket?.[0]?.nama || "";

    const noKontrak =
      master?.noKontrak || "";

    const tglKontrak =
      master?.tglKontrak || "";

    const kontraktor =
      master?.kontraktor || "";


    /* ===================================================
       RENDER FORM
       =================================================== */

    v.innerHTML = `

      <div class="hero">

        <small>
          PAG DOCS FIELD
        </small>

        <h2>
          Laporan Harian
        </h2>

        <div>
          Input data kegiatan harian
        </div>

      </div>


      <div
        class="card"
        style="margin:12px;"
      >

        <!-- =============================================
             HEADER INFORMASI
             ============================================= -->

        <div
          style="
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:8px 16px;
            margin-bottom:16px;
          "
        >

          <div>

            <label
              style="
                display:block;
                font-size:11px;
                color:#64748b;
                margin-bottom:2px;
              "
            >
              Perusahaan Konsultan
            </label>

            <input
              id="lh_konsultan"
              value="${escapeHtml(konsultan)}"
              placeholder="Konsultan"
              style="width:100%;"
            >

          </div>


          <div>

            <label
              style="
                display:block;
                font-size:11px;
                color:#64748b;
                margin-bottom:2px;
              "
            >
              Nama Paket Konsultan
            </label>

            <input
              id="lh_paket"
              value="${escapeHtml(paket)}"
              placeholder="Paket"
              style="width:100%;"
            >

          </div>


          <div>

            <label
              style="
                display:block;
                font-size:11px;
                color:#64748b;
                margin-bottom:2px;
              "
            >
              No Kontrak
            </label>

            <input
              id="lh_no_kontrak"
              value="${escapeHtml(noKontrak)}"
              placeholder="No Kontrak"
              style="width:100%;"
            >

          </div>


          <div>

            <label
              style="
                display:block;
                font-size:11px;
                color:#64748b;
                margin-bottom:2px;
              "
            >
              Tanggal Kontrak
            </label>

            <input
              id="lh_tgl_kontrak"
              value="${escapeHtml(tglKontrak)}"
              placeholder="Tanggal"
              style="width:100%;"
            >

          </div>


          <div>

            <label
              style="
                display:block;
                font-size:11px;
                color:#64748b;
                margin-bottom:2px;
              "
            >
              Perusahaan Kontraktor
            </label>

            <input
              id="lh_kontraktor"
              value="${escapeHtml(kontraktor)}"
              placeholder="Kontraktor"
              style="width:100%;"
            >

          </div>

        </div>


        <!-- =============================================
             TABEL DINAMIS
             ============================================= -->

        <div style="overflow-x:auto;">

          <table
            id="lh_table"
            style="
              width:100%;
              border-collapse:collapse;
              font-size:13px;
            "
          >

            <thead>

              <tr
                style="background:#f1f5f9;"
              >

                <th
                  style="
                    border:1px solid #ccc;
                    padding:6px;
                    text-align:center;
                    white-space:nowrap;
                  "
                >
                  No
                </th>

                <th
                  style="
                    border:1px solid #ccc;
                    padding:6px;
                    text-align:center;
                    white-space:nowrap;
                  "
                >
                  Tanggal
                </th>

                <th
                  style="
                    border:1px solid #ccc;
                    padding:6px;
                    text-align:center;
                    white-space:nowrap;
                  "
                >
                  Devisi
                </th>

                <th
                  style="
                    border:1px solid #ccc;
                    padding:6px;
                    text-align:center;
                    white-space:nowrap;
                  "
                >
                  Sta
                </th>

                <th
                  style="
                    border:1px solid #ccc;
                    padding:6px;
                    text-align:center;
                    white-space:nowrap;
                  "
                >
                  Cuaca
                </th>

                <th
                  style="
                    border:1px solid #ccc;
                    padding:6px;
                    text-align:center;
                    white-space:nowrap;
                  "
                >
                  Tenaga Kerja
                </th>

                <th
                  style="
                    border:1px solid #ccc;
                    padding:6px;
                    text-align:center;
                    white-space:nowrap;
                  "
                >
                  Peralatan
                </th>

                <th
                  style="
                    border:1px solid #ccc;
                    padding:6px;
                    text-align:center;
                    white-space:nowrap;
                  "
                >
                  Kendala
                </th>

                <th
                  style="
                    border:1px solid #ccc;
                    padding:6px;
                    text-align:center;
                    white-space:nowrap;
                  "
                >
                  Uraian pekerjaan
                </th>

                <th
                  style="
                    border:1px solid #ccc;
                    padding:6px;
                    text-align:center;
                    white-space:nowrap;
                  "
                >
                  Dokumentasi
                </th>

              </tr>

            </thead>

            <tbody id="lh_tbody">

              <!-- Baris akan ditambahkan oleh JavaScript -->

            </tbody>

          </table>

        </div>


        <!-- =============================================
             TOMBOL TAMBAH & SIMPAN
             ============================================= -->

        <div
          style="
            margin-top:10px;
            display:flex;
            gap:8px;
            flex-wrap:wrap;
          "
        >

          <button
            class="btn"
            id="lh_add_row"
            type="button"
          >
            ➕ Tambah Baris
          </button>

          <button
            class="btn"
            id="lh_save"
            type="button"
          >
            💾 Simpan & Kirim
          </button>

        </div>


        <!-- =============================================
             TANDA TANGAN
             ============================================= -->

        <div
          style="
            margin-top:16px;
            display:flex;
            gap:20px;
            flex-wrap:wrap;
          "
        >

          <div>

            <label
              style="
                display:block;
                font-size:11px;
                color:#64748b;
                margin-bottom:2px;
              "
            >
              Dibuat oleh
            </label>

            <input
              id="lh_dibuat"
              placeholder="Nama personil"
              style="width:180px;"
            >

          </div>


          <div>

            <label
              style="
                display:block;
                font-size:11px;
                color:#64748b;
                margin-bottom:2px;
              "
            >
              Diketahui oleh
            </label>

            <input
              id="lh_diketahui"
              placeholder="Nama SE/TL"
              style="width:180px;"
            >

          </div>

        </div>

      </div>

    `;


    /* ===================================================
       REFERENSI ELEMEN
       =================================================== */

    const tbody =
      document.getElementById("lh_tbody");

    const addBtn =
      document.getElementById("lh_add_row");

    const saveBtn =
      document.getElementById("lh_save");


    /* ===================================================
       FUNGSI TAMBAH BARIS
       =================================================== */

    function addRow(data = {}) {

      const row =
        document.createElement("tr");

      const no =
        tbody.children.length + 1;

      row.innerHTML = `

        <td
          style="
            border:1px solid #ccc;
            padding:4px;
            text-align:center;
          "
        >
          ${no}
        </td>

        <td
          style="
            border:1px solid #ccc;
            padding:4px;
          "
        >
          <input
            type="date"
            class="lh_tanggal"
            value="${data.tanggal || ""}"
            style="
              width:100%;
              border:0;
              background:transparent;
            "
          >
        </td>

        <td
          style="
            border:1px solid #ccc;
            padding:4px;
          "
        >
          <input
            class="lh_devisi"
            value="${escapeHtml(data.devisi || "")}"
            style="
              width:100%;
              border:0;
              background:transparent;
            "
          >
        </td>

        <td
          style="
            border:1px solid #ccc;
            padding:4px;
          "
        >
          <input
            class="lh_sta"
            value="${escapeHtml(data.sta || "")}"
            style="
              width:100%;
              border:0;
              background:transparent;
            "
          >
        </td>

        <td
          style="
            border:1px solid #ccc;
            padding:4px;
          "
        >
          <input
            class="lh_cuaca"
            value="${escapeHtml(data.cuaca || "")}"
            style="
              width:100%;
              border:0;
              background:transparent;
            "
          >
        </td>

        <td
          style="
            border:1px solid #ccc;
            padding:4px;
          "
        >
          <input
            class="lh_tenaga"
            value="${escapeHtml(data.tenaga || "")}"
            style="
              width:100%;
              border:0;
              background:transparent;
            "
          >
        </td>

        <td
          style="
            border:1px solid #ccc;
            padding:4px;
          "
        >
          <input
            class="lh_peralatan"
            value="${escapeHtml(data.peralatan || "")}"
            style="
              width:100%;
              border:0;
              background:transparent;
            "
          >
        </td>

        <td
          style="
            border:1px solid #ccc;
            padding:4px;
          "
        >
          <input
            class="lh_kendala"
            value="${escapeHtml(data.kendala || "")}"
            style="
              width:100%;
              border:0;
              background:transparent;
            "
          >
        </td>

        <td
          style="
            border:1px solid #ccc;
            padding:4px;
          "
        >
          <input
            class="lh_uraian"
            value="${escapeHtml(data.uraian || "")}"
            style="
              width:100%;
              border:0;
              background:transparent;
            "
          >
        </td>

        <td
          style="
            border:1px solid #ccc;
            padding:4px;
            text-align:center;
          "
        >
          <input
            type="file"
            accept="image/*"
            class="lh_dokumentasi"
            style="width:100%;"
          >

          ${
            data.dokumentasi
              ? `<div><small>${escapeHtml(data.dokumentasi)}</small></div>`
              : ""
          }

        </td>

      `;

      tbody.appendChild(row);

      // Update nomor urut
      updateRowNumbers();

    }


    /* ===================================================
       UPDATE NOMOR URUT
       =================================================== */

    function updateRowNumbers() {

      const rows =
        tbody.querySelectorAll("tr");

      rows.forEach((row, index) => {

        const td =
          row.querySelector("td:first-child");

        if (td) {

          td.textContent =
            index + 1;

        }

      });

    }


    /* ===================================================
       TAMBAH BARIS AWAL (1 BARIS)
       =================================================== */

    addRow();


    /* ===================================================
       EVENT TAMBAH BARIS
       =================================================== */

    addBtn.addEventListener(
      "click",
      function () {

        addRow();

      }
    );


    /* ===================================================
       EVENT SIMPAN
       =================================================== */

    saveBtn.addEventListener(
      "click",
      async function () {

        try {

          saveBtn.disabled = true;

          saveBtn.textContent =
            "⏳ Menyimpan...";


          /* =============================================
             KUMPULKAN DATA HEADER
             ============================================= */

          const konsultan =
            document
              .getElementById("lh_konsultan")
              .value.trim();

          const paket =
            document
              .getElementById("lh_paket")
              .value.trim();

          const noKontrak =
            document
              .getElementById("lh_no_kontrak")
              .value.trim();

          const tglKontrak =
            document
              .getElementById("lh_tgl_kontrak")
              .value.trim();

          const kontraktor =
            document
              .getElementById("lh_kontraktor")
              .value.trim();

          const dibuat =
            document
              .getElementById("lh_dibuat")
              .value.trim();

          const diketahui =
            document
              .getElementById("lh_diketahui")
              .value.trim();


          /* =============================================
             KUMPULKAN DATA BARIS
             ============================================= */

          const rows =
            tbody.querySelectorAll("tr");

          const items = [];

          rows.forEach(row => {

            const tanggal =
              row.querySelector(".lh_tanggal")
                .value;

            const devisi =
              row.querySelector(".lh_devisi")
                .value.trim();

            const sta =
              row.querySelector(".lh_sta")
                .value.trim();

            const cuaca =
              row.querySelector(".lh_cuaca")
                .value.trim();

            const tenaga =
              row.querySelector(".lh_tenaga")
                .value.trim();

            const peralatan =
              row.querySelector(".lh_peralatan")
                .value.trim();

            const kendala =
              row.querySelector(".lh_kendala")
                .value.trim();

            const uraian =
              row.querySelector(".lh_uraian")
                .value.trim();

            const fileInput =
              row.querySelector(".lh_dokumentasi");

            const dokumentasi =
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


          /* =============================================
             BENTUK DATA LAPORAN
             ============================================= */

          const reportData = {

            id:
              "LH-" + Date.now(),

            konsultan,

            paket,

            noKontrak,

            tglKontrak,

            kontraktor,

            dibuat,

            diketahui,

            items,

            createdAt:
              new Date().toISOString()

          };


          /* =============================================
             SIMPAN KE STORAGE & QUEUE
             ============================================= */

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


          await PAG.OfflineSync.add(
            "laporan_harian",
            reportData
          );


          /* =============================================
             COBA SINKRON
             ============================================= */

          if (navigator.onLine) {

            await PAG.OfflineSync.run();

          }


          PAG.UI.toast(
            "Laporan harian tersimpan"
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
            error.message
          );

          saveBtn.textContent =
            "💾 Simpan & Kirim";

        } finally {

          saveBtn.disabled = false;

        }

      }
    );

  }

};


/* =====================================================
   ESCAPE HTML
   ===================================================== */

function escapeHtml(value) {

  return String(value ?? "")
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
  "PAG.LaporanHarian loaded:",
  !!PAG.LaporanHarian
);
