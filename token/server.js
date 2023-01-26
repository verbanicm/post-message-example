const path = require("path");
const express = require("express");

const app = express();
const port = process.env.PORT || 4000;

app.use("/token", express.static(path.join(__dirname, "/")));

app.listen(port, () => {
  console.log(`TOKEN app listening on port ${port}`);
});
