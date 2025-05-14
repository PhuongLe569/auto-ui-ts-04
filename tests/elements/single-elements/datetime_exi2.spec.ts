import test, { expect, Locator, Page } from "@playwright/test";



test.beforeEach('Before each', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/date-time');
});



test('Verify date range picker', async ({ page }) => {

    await selectStartDate(page, 23, 'May', 2002);
    await selectEndDate(page, 29, 'Sep', 2017);
    //await page.getByText('Test With Me aka Tho Test').click();
    await expect(page.getByText('Current date range: 2002-05-23 - 2017-09-29')).toBeVisible();

});


async function selectStartDate(page: Page, day: number, month: string, year: number) {

    let datePickerXpath = `(//span[.//text()[normalize-space()='Date Range Picker']]/following::input[@placeholder='Start date'])[1]`;
    await page.locator(datePickerXpath).click();
    let startPanel = page.locator('.ant-picker-panels .ant-picker-panel:first-child');
    await selectDate(page, startPanel, day, month, year);

};

async function selectEndDate(page: Page, day: number, month: string, year: number) {

    let datePickerXpath = `(//span[.//text()[normalize-space()='Date Range Picker']]/following::input[@placeholder='End date'])[1]`;
    await page.locator(datePickerXpath).click();
    let endPanel = page.locator('.ant-picker-panels .ant-picker-panel:last-child');
    await selectDate(page, endPanel, day, month, year);

};


async function selectDate(page: Page, currentPanel: Locator, day: number, month: string, year: number) {

    //let datePickerXpath = `(//span[.//text()[normalize-space()='Date Picker']]/following::input[@placeholder='Select date'])[1]`;
    //await page.locator(datePickerXpath).click();
    let yearXpath = `//button[@class='ant-picker-year-btn']`;
    await currentPanel.locator(yearXpath).click();

    let isYearSelected = false;

    while (!isYearSelected){
        let decateCss = 'button.ant-picker-decade-btn';
        let decadeLocator = page.locator(decateCss);
        let currentRangeText = await decadeLocator.textContent();
        let currentRange = currentRangeText?.split('-');
        if (!currentRange) {
            currentRange =[];
        }
        let startRange = Number.parseInt(currentRange[0]);
        let endRange = Number.parseInt(currentRange[1]);
        if (year >= startRange && year <= endRange) {
            let toBeClickedYearCss = `td[title='${year}'].ant-picker-cell.ant-picker-cell-in-view`;
            await page.locator(toBeClickedYearCss).click();
            isYearSelected = true;
        }
        if (year < startRange) {
            let previousYearButtonCss = `(//div[@class='ant-picker-panel']//button[@class='ant-picker-header-super-prev-btn'])[1]`;
            await page.locator(previousYearButtonCss).click();
        }
        if (year > endRange) {
            let nextYearButtonCss = `(//div[@class='ant-picker-panel']//button[@class='ant-picker-header-super-next-btn'])[1]`;
            await page.locator(nextYearButtonCss).click();
        }

    }
    let monthXpath = `//div[contains(concat(' ',normalize-space(@class),' '),' ant-picker-cell-inner ') and .//text()[normalize-space()='${month}']]`;
    await page.locator(monthXpath).click();
    let dayXpath = `//td[contains(concat(' ',normalize-space(@class),' '),' ant-picker-cell-in-view ') and .//text()[normalize-space()='${day}']]`;
    await currentPanel.locator(dayXpath).click();

};


