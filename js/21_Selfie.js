PAG.Selfie = {

  start() {
    return PAG.Absensi.start();
  },

  stop() {

    if (
      PAG.Absensi &&
      typeof PAG.Absensi.stopCamera === "function"
    ) {

      PAG.Absensi.stopCamera();

    }

  }

};
