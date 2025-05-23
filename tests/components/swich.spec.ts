import test, { expect, Page } from "@playwright/test";



test.beforeEach('Before each', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/switch');
});

test('Verify click switch button', async ({ page }) => {
    await selectSwitchButtonByLabel(page, 'Switch', 'false');
    await expect(page.getByText('Current Value: false')).toBeVisible();

});

async function selectSwitchButtonByLabel(page: Page, label: string, value: string) {
    let switchXpath = `(//span[.//text()[normalize-space()='${label}']]/following::button[@role='switch'])[1]`;
    let switchButton = page.locator(switchXpath);
    let isCheck = await switchButton.getAttribute('aria-checked');

    if (isCheck != value) {
        await switchButton.click();
    }

}