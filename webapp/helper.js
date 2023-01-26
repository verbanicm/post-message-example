class Helper {
  static PopupMode = "popup";
  static ServerMode = "server";

  popupRef;
  popupUrl;
  popupName = "auth-popup";

  constructor({ url, mode, callback }) {
    if (!mode) mode = this.PopupMode;

    this.popupUrl = new URL(url);
    this.popupUrl.searchParams.set("mode", encodeURIComponent(mode));
    this.popupUrl.searchParams.set(
      "origin",
      encodeURIComponent(window.location.origin)
    );

    this.callback = callback;
  }

  // receiveMessage validates the validity of the popup response
  // and sends response to callback
  #receiveMessage = (event) => {
    // only trust the origin we opened
    if (event.origin !== this.popupUrl.origin) {
      throw new Error("invalid popup origin");
    }

    // parse the response data
    const data = JSON.parse(event.data);

    // only trust valid source variable
    if (data.source !== "auth-popup") {
      throw new Error("invalid popup source");
    }

    // TODO: would a nonce help with security?

    return JSON.parse(JSON.stringify(data.payload));
  };

  requestToken = () => {
    return new Promise((resolve, reject) => {
      //remove existing event listener
      window.removeEventListener(
        "message",
        (event) => {
          try {
            resolve(this.#receiveMessage(event));
          } catch (err) {
            reject(err);
          }
        },
        false
      );

      // popup never created or was closed
      if (!this.popupRef || this.popupRef.closed) {
        this.popupRef = window.open(
          this.popupUrl.toString(),
          this.popupName,
          "popup=true,width=500,height=600"
        );
      }
      // popup exists, show it
      else {
        this.popupRef.focus();
      }

      // listen for response
      window.addEventListener(
        "message",
        (event) => {
          try {
            resolve(this.#receiveMessage(event));
          } catch (err) {
            reject(err);
          }
        },
        false
      );
    });
  };
}
