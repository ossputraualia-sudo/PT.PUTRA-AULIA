PAG.43_Watermark = {

  async apply(blob, options = {}) {

    if (!blob) {

      throw new Error(
        "Foto tidak ditemukan."
      );

    }


    const gps =
      options.gps || null;


    const title =
      options.title ||
      "PAG DOCS FIELD";


    const date =
      options.date ||
      new Date();


    const location =
      gps
        ? this.formatGPS(gps)
        : "GPS tidak tersedia";


    const image =
      await this.loadImage(blob);


    const canvas =
      document.createElement(
        "canvas"
      );


    canvas.width =
      image.naturalWidth ||
      image.width;


    canvas.height =
      image.naturalHeight ||
      image.height;


    const ctx =
      canvas.getContext(
        "2d"
      );


    // ==================================================
    // FOTO
    // ==================================================

    ctx.drawImage(
      image,
      0,
      0,
      canvas.width,
      canvas.height
    );


    // ==================================================
    // WATERMARK
    // ==================================================

    const padding =
      Math.max(
        20,
        Math.round(
          canvas.width * 0.025
        )
      );


    const fontSize =
      Math.max(
        18,
        Math.round(
          canvas.width * 0.025
        )
      );


    const lineHeight =
      fontSize * 1.35;


    const lines = [

      title,

      this.formatDate(
        date
      ),

      location

    ];


    const boxHeight =
      padding * 2 +
      lineHeight *
      lines.length;


    // Background watermark

    ctx.fillStyle =
      "rgba(0,0,0,0.55)";


    ctx.fillRect(

      0,

      canvas.height -
        boxHeight,

      canvas.width,

      boxHeight

    );


    // Text

    ctx.fillStyle =
      "#ffffff";


    ctx.font =
      `600 ${fontSize}px Arial`;


    ctx.textBaseline =
      "top";


    lines.forEach(
      (line, index) => {

        ctx.fillText(

          line,

          padding,

          canvas.height -
            boxHeight +
            padding +
            index *
              lineHeight

        );

      }
    );


    // ==================================================
    // KEMBALIKAN JPEG
    // ==================================================

    return await new Promise(
      (resolve, reject) => {

        canvas.toBlob(

          result => {

            if (result) {

              resolve(
                result
              );

            } else {

              reject(
                new Error(
                  "Watermark gagal dibuat."
                )
              );

            }

          },

          "image/jpeg",

          0.86

        );

      }
    );

  },


  // ====================================================
  // LOAD IMAGE
  // ====================================================

  loadImage(blob) {

    return new Promise(
      (resolve, reject) => {

        const url =
          URL.createObjectURL(
            blob
          );


        const image =
          new Image();


        image.onload =
          () => {

            URL.revokeObjectURL(
              url
            );

            resolve(
              image
            );

          };


        image.onerror =
          () => {

            URL.revokeObjectURL(
              url
            );

            reject(
              new Error(
                "Foto tidak dapat dibaca."
              )
            );

          };


        image.src =
          url;

      }
    );

  },


  // ====================================================
  // FORMAT GPS
  // ====================================================

  formatGPS(gps) {

    if (!gps) {

      return "GPS tidak tersedia";

    }


    return (

      Number(
        gps.lat
      ).toFixed(6) +

      ", " +

      Number(
        gps.lng
      ).toFixed(6) +

      " ± " +

      Math.round(
        Number(
          gps.accuracy || 0
        )
      ) +

      " m"

    );

  },


  // ====================================================
  // FORMAT TANGGAL
  // ====================================================

  formatDate(date) {

    const d =
      new Date(date);


    return d.toLocaleString(
      "id-ID",
      {

        day:
          "2-digit",

        month:
          "2-digit",

        year:
          "numeric",

        hour:
          "2-digit",

        minute:
          "2-digit",

        second:
          "2-digit"

      }
    );

  }

};
