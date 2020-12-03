const puppeteer = require("puppeteer");
const url = "http://dontpad.com/18237ajjk1237e";

module.exports.insertData = async function insertData(newInfo) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.type("#text", `${newInfo}|`);
  browser.close();
};

module.exports.readData = async function readData() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(url);

  const value = await page.evaluate(() => {
    return document.getElementById("text").value;
  });
  await browser.close();
  return value.split("|")[0];
};
