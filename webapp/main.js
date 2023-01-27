const helper = new Helper({
  url: "http://localhost:4000/token",
  mode: Helper.PopupMode,
  name: "auth-popup",
});

document.getElementById("auth-btn").addEventListener("click", async (event) => {
  try {
    const tokenResponse = await helper.requestToken();
    console.log(`tokenResponse:`, tokenResponse);
    document.getElementById("output").innerHTML = "Token response successful!";
  } catch (err) {
    alert(`Failed to get token! ${err}`);
  }
});
