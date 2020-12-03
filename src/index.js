const express = require("express");
const getInfo = require("./getInfo");

require("core-js/stable");
require("regenerator-runtime/runtime");

const app = express();

getInfo.getInfo();

app.get("/", (_, res) => {
  res.status(200).json({
    message: "FNDE Checker working!",
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening to port 3000");
});
