const Nightmare = require("nightmare");
const puppeteer = require("puppeteer");
const url = "http://dontpad.com/18237ajjk1237e";

module.exports.insertData = (newInfo) => {
  new Nightmare()
    .goto(url)
    .type("#text", `${newInfo}|`)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.log(error));
};

module.exports.readData = async function readData() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  const value = await page.evaluate(() => {
    return document.getElementById("text").value;
  });
  await browser.close();
  return value.split("|")[0];
};
