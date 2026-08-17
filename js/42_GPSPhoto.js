PAG.42_GPSPhoto = {

  async capturePosition() {

    return await PAG.GPS.get();

  },


  async attach(photo) {

    if (!photo) {

      throw new Error(
        "Data foto tidak ditemukan."
      );

    }


    const gps =
      photo.gps ||
      await this.capturePosition();


    return {

      ...photo,

      gps: {

        lat:
          gps.lat,

        lng:
          gps.lng,

        accuracy:
          gps.accuracy,

        capturedAt:
          gps.capturedAt ||
          new Date().toISOString()

      }

    };

  },


  format(gps) {

    if (!gps) {
      return "";
    }


    return (
      Number(gps.lat).toFixed(6) +
      ", " +
      Number(gps.lng).toFixed(6) +
      " ± " +
      Math.round(
        Number(gps.accuracy || 0)
      ) +
      " m"
    );

  }

};
