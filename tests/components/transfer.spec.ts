import test, { expect, Page } from "@playwright/test";

test.beforeEach('Before each', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/transfer');
});

test('Verify transfer', async ({ page }) => {
    //Move from source to target
    await moveItems(page, 'Transfer', ['Apple', 'Banana'], 'Source', 'right');

    //verify source
    let expectedSource = ['Kiwi'];
    await verifyTransfer(page, 'Source', expectedSource);

    // Verify target
    let expectedTarget = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Strawberry'];
    await verifyTransfer(page, 'Target', expectedTarget);

    // Move from target to source
    await moveItems(page, 'Transfer', ['Pineapple', 'Strawberry'], 'Target', 'left');
    //verify source
    expectedSource = ['Kiwi', 'Pineapple', 'Strawberry'];
    await verifyTransfer(page, 'Source', expectedSource);

    // Verify target
    expectedTarget = ['Apple', 'Banana', 'Orange'];
    await verifyTransfer(page, 'Target', expectedTarget);
});

async function verifyTransfer(page: Page, label: string, expected: string[]) {
    let xpath = `(//span[.//text()[normalize-space()='Transfer']]/following::div[contains(concat(' ', normalize-space(@class), ' '), 'ant-transfer-list') and .//span[normalize-space()='${label}']]//ul)[1]`;
    let locator = page.locator(xpath).locator('li');
    let actualItems = await locator.allTextContents();
    actualItems = actualItems.map(value => value.trim());
    expect(actualItems.length).toBe(expected.length);
    expect(actualItems).toEqual(expect.arrayContaining(expected));
    expect(expected).toEqual(expect.arrayContaining(actualItems));
}

async function moveItems(page: Page, label: string, items: string[], panel: string, direction: 'left' | 'right') {

    let sourceXpath = `(//span[.//text()[normalize-space()='${label}']]/following::div[contains(concat(' ', normalize-space(@class), ' '), 'ant-transfer-list') and .//span[normalize-space()='${panel}']]//ul)[1]`;
    let sourceLocator = page.locator(sourceXpath);

    for (let item of items) {
        let itemXpath = `//li[.//span[normalize-space() = '${item}']]`;
        await sourceLocator.locator(itemXpath).click();
    }
    let buttonMoveToTargetXpath = `(//span[.//text()[normalize-space()='${label}']]/following::button[.//span[@aria-label='${direction}']])[1]`;
    await page.locator(buttonMoveToTargetXpath).click();
}