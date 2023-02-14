const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const{ When, Then, Before, After,setDefaultTimeout } = require("cucumber");
const { clickElement, getText } = require("../../lib/commands.js");

setDefaultTimeout(60000);

Before(async function () {
    const browser = await puppeteer.launch({headless: false, slowMo: 50});
    const page =await browser.newPage();
    this.browser = browser;
    this.page = page;
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await clickElement(page, "a:nth-child(3) > span.page-nav__day-week");
    await clickElement(page, "li > a.movie-seances__time");
});

After( async function () {
    if(this.browser) {
        await this.browser.close();
    }
});

When("user clicks on day and time, on {int} row and {int} chair and on Забронировать button",
async function(row, chair) {
    await clickElement(this.page, `a:nth-child(${row}) > span :nth-child(${chair})`);
    return await clickElement(this.page, "button.acceptin-button");
});

Then("user sees opened page with Row / Chair {string}", async function (string) {
    const actual = await getText(this.page, ".ticket__chairs");
    const expected = string;
    expect(actual).contains(expected);
});

When("user clicks on day and time, on {int} row and {int} chair and {int} chair and on Забронировать button",
async function (row8, chair2, chair3) {
    await clickElement(this.page,`a:nth-child(${row8}) > span :nth-child(${chair2} > span :nth-child(${chair3}`);
    return await clickElement(this.page, "button.acceptin-button");
});

Then("user sees opened page with Row / Chair {string}", async function (string) {
    const actual = await getText(this.page, ".ticket__chairs");
    const expected = string;
    expect(actual).contains(expected);
});

When("user clicks on day and time, on {string} chair and on Забронировать button", async function (chair){
    await clickElement(this.page,`span.buying-scheme__chair_${chair}`);
    return await clickElement(this.page, "button.acceptin-button");
});

Then("button Зaбронировать is disabled", async function() {
    const actual = await this.page.$eval(".acceptin-button", (link) => link.getAttribute("disabled"));
    expect(actual).toEqual("true");
});