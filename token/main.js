const urlParams = new URLSearchParams(window.location.search);
const mode = decodeURIComponent(urlParams.get("mode"));
const origin = decodeURIComponent(urlParams.get("origin"));
const source = window.name;

document.getElementById("submit-btn").addEventListener("click", (event) => {
  // do the logic to generate the token
  window.opener.postMessage(
    JSON.stringify({
      source: source,
      payload: {
        token: "token",
      },
    }),
    origin
  );
  window.close();
});
