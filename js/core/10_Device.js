PAG.Device = {

  // =====================================================
  // GPS
  // =====================================================

  async gps() {

    if (!("geolocation" in navigator)) {

      throw new Error(
        "Perangkat/browser tidak mendukung GPS."
      );

    }


    return new Promise(
      (resolve, reject) => {

        navigator.geolocation.getCurrentPosition(

          position => {

            const coords =
              position.coords;


            resolve({

              lat:
                coords.latitude,

              lng:
                coords.longitude,

              accuracy:
                coords.accuracy,

              altitude:
                coords.altitude,

              heading:
                coords.heading,

              speed:
                coords.speed,

              capturedAt:
                new Date().toISOString()

            });

          },


          error => {

            let message =
              "GPS gagal diperoleh.";


            switch (error.code) {

              case 1:

                message =
                  "Izin lokasi ditolak.";

                break;


              case 2:

                message =
                  "Lokasi tidak tersedia.";

                break;


              case 3:

                message =
                  "Pengambilan lokasi terlalu lama.";

                break;

            }


            const err =
              new Error(message);

            err.code =
              error.code;

            err.originalError =
              error;


            reject(err);

          },


          {

            enableHighAccuracy:
              true,

            timeout:
              15000,

            maximumAge:
              0

          }

        );

      }
    );

  }

};
