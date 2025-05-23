import test, { expect, Page } from "@playwright/test";
import { title } from "process";



test.beforeEach('Before each', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/tree-select');
});

test('Verify select tree select', async ({ page }) => {
    let input1 = 'Light';
    let input2 = 'Heavy>Walnut';
    await selectTreeSelectByLabel(page, 'TreeSelect', input2);
    //await expect(page.getByText('Current value: light')).toBeVisible();
    //Current value: walnut
    await expect(page.getByText('Current value: walnut')).toBeVisible();

});

async function selectTreeSelectByLabel(page: Page, label: string, input: string) {
    let treeSelectXpath = `(//span[.//text()[normalize-space()='${label}']]/following::div[contains(concat(' ',normalize-space(@class),' '),' ant-select-selector ')])[1]`;
    await page.locator(treeSelectXpath).click();
    let data = input.split('>');

    for (let i = 0; i < data.length; i++) {
        let value = data[i];

        if (i == data.length -1) {
            let titleInputXpath = `//span[.//text()[normalize-space()='${value}'] and contains(concat(' ',normalize-space(@class),' '),' ant-select-tree-title ')]`;
            await page.locator(titleInputXpath).click();
        } else {
            let iconXpath = `(//span[.//text()[normalize-space()='${value}'] and contains(concat(' ',normalize-space(@class),' '),' ant-select-tree-node-content-wrapper ')]/preceding-sibling::span[contains(concat(' ',normalize-space(@class),' '),' ant-select-tree-switcher ')])[1]`;
            await page.locator(iconXpath).click();
        }
    }
}