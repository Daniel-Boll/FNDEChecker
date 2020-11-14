const express = require("express");

const requestFromAPI = require("./getInfo");
const mail = require("./sendMail");
const schedule = require("node-schedule");
const env = require("dotenv").config().parsed;

const app = express();

console.log("Working");

schedule.scheduleJob("30 * * * * *", () => {
  // requestFromAPI.getInfo();
  mail.sendMail(
    (subject = "Bolsa provavelmente caiu!"),
    (text =
      "A API notou uma alteração nos dados, há a chance de a bolsa ter caído. ")
  );
});

// requestFromAPI.getInfo();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "FNDE Checker working!",
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening to port 3000");
});
