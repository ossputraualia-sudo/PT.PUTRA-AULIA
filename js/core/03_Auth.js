PAG.Auth = {

  // =====================================================
  // GET USER
  // =====================================================

  get() {

    try {

      const raw =
        localStorage.getItem("pag_user");

      if (!raw) {
        return null;
      }

      return JSON.parse(raw);

    } catch (error) {

      console.error(
        "PAG.Auth.get error:",
        error
      );

      localStorage.removeItem(
        "pag_user"
      );

      return null;

    }

  },


  // =====================================================
  // ENSURE USER
  // =====================================================

  async ensure() {

    let user =
      this.get();


    // User sudah ada

    if (user) {

      return user;

    }


    // ===================================================
    // MODE UJI LOKAL
    // ===================================================

    const name =
      prompt(
        "Nama personil untuk uji PAG Docs:"
      );


    // User membatalkan

    if (
      !name ||
      !String(name).trim()
    ) {

      return null;

    }


    // ===================================================
    // CREATE LOCAL USER
    // ===================================================

    user = {

      userId:
        "LOCAL-" +
        Date.now(),

      name:
        String(name).trim(),

      role:
        "personil_lapangan",

      loginType:
        "local",

      createdAt:
        new Date().toISOString()

    };


    localStorage.setItem(
      "pag_user",
      JSON.stringify(user)
    );


    return user;

  },


  // =====================================================
  // LOGOUT
  // =====================================================

  logout() {

    localStorage.removeItem(
      "pag_user"
    );

    location.reload();

  }

};
