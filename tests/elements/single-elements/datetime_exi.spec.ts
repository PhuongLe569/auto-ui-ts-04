import test, { expect, Page } from "@playwright/test";



test.beforeEach('Before each', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/date-time');
});


test('Verify range time picker', async ({ page }) => {
    await selectRangeTime(page, 'Time Range Picker',  2, 3, 4, 5, 54, 11);
    await expect(page.getByText('Current time range: 02:03:04 - 05:54:11')).toBeVisible();

});

async function selectRangeTime(page: Page, label: string, starthour: number, startminute: number, startsecond: number, endhour: number, endminute: number, endsecond: number) {
    let pickerXpath = `(//span[.//text()[normalize-space()='${label}']]/following::input[@placeholder='Start time'])[1]`;
    await page.locator(pickerXpath).click();
    let hourXpath = `//ul[@data-type='hour']//li[contains(concat(' ',normalize-space(@class),' '),' ant-picker-time-panel-cell ') and @data-value = '${starthour}']`;
    await page.locator(hourXpath).click();
    let minuteXpath = `//ul[@data-type='minute']//li[contains(concat(' ',normalize-space(@class),' '),' ant-picker-time-panel-cell ') and @data-value = '${startminute}']`;
    await page.locator(minuteXpath).click();
    let secondXpath = `//ul[@data-type='second']//li[contains(concat(' ',normalize-space(@class),' '),' ant-picker-time-panel-cell ') and @data-value = '${startsecond}']`;
    await page.locator(secondXpath).click();
    let pickerOkButtonCss = '.ant-picker-ranges .ant-picker-ok button';
    await page.locator(pickerOkButtonCss).click();

    let pickerXpath2 = `(//span[.//text()[normalize-space()='${label}']]/following::input[@placeholder='End time'])[1]`;
    await page.locator(pickerXpath2).click();
    let hourXpath2 = `//ul[@data-type='hour']//li[contains(concat(' ',normalize-space(@class),' '),' ant-picker-time-panel-cell ') and @data-value = '${endhour}']`;
    await page.locator(hourXpath2).click();
    let minuteXpath2 = `//ul[@data-type='minute']//li[contains(concat(' ',normalize-space(@class),' '),' ant-picker-time-panel-cell ') and @data-value = '${endminute}']`;
    await page.locator(minuteXpath2).click();
    let secondXpath2 = `//ul[@data-type='second']//li[contains(concat(' ',normalize-space(@class),' '),' ant-picker-time-panel-cell ') and @data-value = '${endsecond}']`;
    await page.locator(secondXpath2).click();
    //let pickerOkButtonCss = '.ant-picker-ranges .ant-picker-ok button';
    await page.locator(pickerOkButtonCss).click();
    
}