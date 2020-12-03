const puppeteer = require("puppeteer");
const url = "http://dontpad.com/eaohjs11!a--1rz4a512ga274gra";

module.exports.insertData = async function insertData(newInfo) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto(url);
  await page.type("textarea[id=text]", `${newInfo}|`, { delay: 3000 });
  await page.type("textarea[id=text]", "", { delay: 3000 });

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
