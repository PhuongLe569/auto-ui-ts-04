import test, { expect, Page } from "@playwright/test";

test.beforeEach('Before each', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/checkbox');
});

test('Verify select check box', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/checkbox');
    await checkCheckbox(page, 'Apple');
    await expect(page.getByText('Selected values: Apple')).toBeVisible();
});

test('Verify uncheck check box', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/checkbox');
    await uncheckCheckbox(page, 'Apple');
    await expect(page.getByText('Selected values: Apple')).not.toBeVisible();
});

async function checkCheckbox(page: Page, label: string) {
    let xpath = `//label[.//text()[normalize-space()='${label}'] and .//input[@type='checkbox']]`;
    let checkbox = page.locator(xpath);
    let className = await checkbox.getAttribute('class');
    let classNames = className?.split(' ');
    if (!classNames?.includes('ant-checkbox-wrapper-checked')) {
        await checkbox.click();
    }
}

async function uncheckCheckbox(page: Page, label: string) {
    let xpath = `//label[.//text()[normalize-space()='${label}'] and .//input[@type='checkbox']]`;
    let checkbox = page.locator(xpath);
    let className = await checkbox.getAttribute('class');
    let classNames = className?.split(' ');
    if (classNames?.includes('ant-checkbox-wrapper-checked')) {
        await checkbox.click();
    }
}