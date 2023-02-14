const{clickElement, getText} = require("./lib/commands");

let page;

beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await clickElement(page, "a:nth-child(3) > span.page-nav__day-week");
    await clickElement(page, "li > a.movie-seances__time");
});

afterEach(() => {
    page.close();
});

test("Should book ticket", async () => {
    await clickElement(page, ".buying-scheme__row > span.buying-scheme__chair_standart:not(.buying-scheme__chair_taken)");
    await clickElement(page, "button.acceptin-button");
    await page.waitForTimeout(60000);
    const actual = await getText(page, "h2.ticket__check-title");
    expect(actual).toContain("Вы выбрали билеты:");
});

test("Should book two tickets", async () => {
    await clickElement(page, "a:nth-child(7) > span.page-nav__day-week");
    await clickElement(page,"span.buying-scheme__chair_standart:not(.buying-scheme__chair_taken)");
    await clickElement(page, "span.buying-scheme__chair_selected + :not(.buying-scheme__chair_taken)");
    await clickElement(page, "button.acceptin-button");
    await page.waitForTimeout(60000);
    const actual = await getText(page, "h2.ticket__check-title");
    expect(actual).toContain("Вы выбрали билеты:");
});

test("Should disabled", async () => {
    await clickElement(page, "span.buying-scheme__chair_taken");
    await page.waitForTimeout(60000);
    const actual = await page.$eval(".acceptin-button", (link) => link.getAttribute("disabled"));
    expect(actual).toEqual("true");
});