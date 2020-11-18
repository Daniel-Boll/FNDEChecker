const express = require("express");

const requestFromAPI = require("./getInfo");
const mail = require("./sendMail");
const schedule = require("node-schedule");
const env = require("dotenv").config().parsed;

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
