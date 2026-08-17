PAG.SyncState = {

  async get() {

    try {

      return await PAG.Storage.get(
        "syncstate",
        "webutama"
      );

    } catch (error) {

      console.error(
        "PAG.SyncState.get:",
        error
      );

      return null;

    }

  },


  async set(status, data = {}) {

    const state = {

      id: "webutama",

      status,

      time:
        new Date().toISOString(),

      ...data

    };

    await PAG.Storage.put(
      "syncstate",
      state
    );

    return state;

  }

};
