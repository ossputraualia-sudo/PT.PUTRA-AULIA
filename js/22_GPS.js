PAG.GPS = {

  async get() {

    try {

      return await PAG.Device.gps();

    } catch (error) {

      console.error(
        "PAG.GPS:",
        error
      );

      throw error;

    }

  }

};
