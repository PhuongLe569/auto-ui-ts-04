import test, { expect, Page } from "@playwright/test";

test.beforeEach('Before each', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/pop-confirm');
});

test('Verify select modal popup', async ({ page }) => {
    await clickButtonByLabel(page, 'Delete');
    await selectPopupConfirm(page, 'Delete the task', 'No');
    await expect(page.getByText('Click on No')).toBeVisible();
});

async function selectPopupConfirm(page: Page, popupTitle: string, value: 'Yes'|'No') {
    let xpathButton = `(//div[.//text()[normalize-space()='${popupTitle}']]/following::button[normalize-space()='${value}'])[1]`;
    await page.locator(xpathButton).click();
}

async function clickButtonByLabel(page: Page, label: string) {
    await page.getByText(label).click(); 
}
