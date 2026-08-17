PAG.Profile = {

  render(v) {

    const u =
      PAG.Auth.get() || {};

    const name =
      u.name || "Personil Lapangan";

    const role =
      u.role || "personil_lapangan";

    const userId =
      u.userId || "-";

    v.innerHTML = `

      <div class="card">

        <h2>Profil</h2>

        <div style="
          text-align:center;
          padding:20px 0;
        ">

          <div style="
            width:80px;
            height:80px;
            margin:auto;
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            background:#0f172a;
            color:white;
            font-size:32px;
          ">
            👤
          </div>

          <h3>
            ${escapeHtml(name)}
          </h3>

          <p>
            ${escapeHtml(role)}
          </p>

        </div>


        <div class="field">

          <label>User ID</label>

          <div>
            ${escapeHtml(userId)}
          </div>

        </div>


        <div class="field">

          <label>Status</label>

          <div>
            🟢 Aktif
          </div>

        </div>


        <button
          class="btn"
          onclick="PAG.Auth.logout()"
        >
          Keluar
        </button>

      </div>

    `;

  }

};
