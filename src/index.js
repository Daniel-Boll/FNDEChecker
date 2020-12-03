const express = require("express");
import "core-js/stable";
import "regenerator-runtime/runtime";

const requestFromAPI = require("./getInfo");

const app = express();

requestFromAPI.getInfo();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "FNDE Checker working!",
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening to port 3000");
});
