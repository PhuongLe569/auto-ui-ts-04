import test, { expect, Page } from "@playwright/test";

test.beforeEach('Before each', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/modal');
});

test('Verify select modal popup', async ({ page }) => {
    await clickButtonByLabel(page, 'Show Confirm');
    await selectModalPopup(page, 'Are you sure delete this task?', 'Yes');
    await expect(page.getByText('Status: OK')).toBeVisible();
});

async function selectModalPopup(page: Page, popupTitle: string, value: 'Yes'|'No') {
    let xpathButton = `(//span[.//text()[normalize-space()='${popupTitle}']]/following::button[normalize-space()='${value}'])[1]`;
    await page.locator(xpathButton).click();
}

async function clickButtonByLabel(page: Page, label: string) {
    await page.getByText(label).click(); 
}
