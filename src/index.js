const requestFromAPI = require("./getInfo");
const schedule = require("node-schedule");

schedule.scheduleJob({ hour: 20, minute: 43 }, () => requestFromAPI.getInfo());
