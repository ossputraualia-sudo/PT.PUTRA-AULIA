PAG.API = {

  // =====================================================
  // GET
  // =====================================================

  async get(url, action, data = {}) {

    if (!url) {

      throw new Error(
        "URL API belum dikonfigurasi."
      );

    }


    if (!action) {

      throw new Error(
        "Action API belum ditentukan."
      );

    }


    try {

      const params =
        new URLSearchParams({

          action: action,

          ...data

        });


      const response =
        await fetch(
          url + "?" + params.toString(),
          {
            method: "GET",
            cache: "no-store"
          }
        );


      if (!response.ok) {

        throw new Error(
          `HTTP ${response.status} ${response.statusText}`
        );

      }


      const result =
        await response.json();


      if (
        result &&
        result.ok === false
      ) {

        throw new Error(
          result.error ||
          "API mengembalikan kesalahan."
        );

      }


      return result;


    } catch (error) {

      console.error(
        "PAG.API.get error:",
        {
          url,
          action,
          data,
          error
        }
      );


      throw error;

    }

  },


  // =====================================================
  // POST
  // =====================================================

  async post(
    url,
    action,
    payload = {}
  ) {

    if (!url) {

      throw new Error(
        "URL API belum dikonfigurasi."
      );

    }


    if (!action) {

      throw new Error(
        "Action API belum ditentukan."
      );

    }


    try {

      const response =
        await fetch(
          url,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "text/plain;charset=utf-8"
            },

            body: JSON.stringify({

              action,

              payload

            })

          }
        );


      if (!response.ok) {

        throw new Error(
          `HTTP ${response.status} ${response.statusText}`
        );

      }


      const result =
        await response.json();


      if (
        result &&
        result.ok === false
      ) {

        throw new Error(
          result.error ||
          "API mengembalikan kesalahan."
        );

      }


      return result;


    } catch (error) {

      console.error(
        "PAG.API.post error:",
        {
          url,
          action,
          payload,
          error
        }
      );


      throw error;

    }

  }

};
