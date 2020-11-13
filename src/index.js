const requestFromAPI = require("./getInfo");
const schedule = require("node-schedule");

schedule.scheduleJob({ hour: 21, minute: 05 }, () => requestFromAPI.getInfo());
