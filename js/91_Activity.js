PAG.Activity = {

  async render(v) {

    try {

      v.innerHTML = `
        <div class="card">
          <h2>Aktivitas</h2>
          <p>Memuat aktivitas...</p>
        </div>
      `;

      const logs =
        await PAG.74_AuditLog.list();

      if (!logs.length) {

        v.innerHTML = `
          <div class="card">
            <h2>Aktivitas</h2>
            <p>Belum ada aktivitas.</p>
          </div>
        `;

        return;
      }

      v.innerHTML = `
        <div class="card">

          <h2>Aktivitas</h2>

          <div class="activity-list">

            ${logs.map(item => {

              const d =
                item.data || {};

              return `
                <div class="activity-item">

                  <b>
                    ${escapeHtml(d.action || "Aktivitas")}
                  </b>

                  <div>
                    ${escapeHtml(
                      d.description || "-"
                    )}
                  </div>

                  <small>
                    ${escapeHtml(
                      d.userName || "Pengguna"
                    )}
                    ·
                    ${formatActivityDate(
                      d.timestamp
                    )}
                  </small>

                </div>
              `;

            }).join("")}

          </div>

        </div>
      `;

    } catch (error) {

      console.error(
        "ACTIVITY ERROR:",
        error
      );

      v.innerHTML = `
        <div class="card">
          <h2>Aktivitas</h2>
          <p>
            Gagal memuat aktivitas.
          </p>
          <small>
            ${escapeHtml(
              error.message ||
              String(error)
            )}
          </small>
        </div>
      `;

    }

  }

};


function formatActivityDate(value) {

  if (!value) return "-";

  try {

    return new Date(value)
      .toLocaleString("id-ID");

  } catch {

    return String(value);

  }

}
