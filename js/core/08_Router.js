PAG.Router = {

  current: "home",

  async go(route) {

    if (!route) {
      route = "home";
    }

    this.current = route;

    try {

      await PAG.UI.render(route);

    } catch (error) {

      console.error(
        "PAG.Router error:",
        route,
        error
      );

    }

  }

};
