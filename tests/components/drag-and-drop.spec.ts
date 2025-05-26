import test, { expect, Locator, Page } from "@playwright/test";
import _, { random } from 'lodash';

test.beforeEach('Before each', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/drag-n-drop');
});

test('Verify select the drag and drop', async ({ page }) => {
    //1. get current left panel items
    let leftPanelXpath = `(//span[.//text()[normalize-space()='Drag n Drop']]/following::div[contains(concat(' ',normalize-space(@class),' '),' ant-space-item ')]//div[contains(concat(' ',normalize-space(@class),' '),' border-teal-500 ')])[1]`;
    let leftPanelLocator = page.locator(leftPanelXpath);
    let currentLeftPanelItems = await leftPanelLocator.locator('button').allTextContents();
    //2. get current right panel items
    let rightPanelXpath = `(//span[.//text()[normalize-space()='Drag n Drop']]/following::div[contains(concat(' ',normalize-space(@class),' '),' ant-space-item ')]//div[contains(concat(' ',normalize-space(@class),' '),' border-orange-500 ')])[1]`;
    let rightPanelLocator = page.locator(rightPanelXpath);
    let currentRightPanelItems = await rightPanelLocator.locator('button').allTextContents();      
    //3. move from left to right
    //3.1 random an item in left panel
    let randomLeftIndex = randomIndex(currentLeftPanelItems.length);
    let expectedLeftPanelItems = buildExpectedAfterDrag(randomLeftIndex, currentLeftPanelItems);
    let expectedRightPanelItems = buildExpectedAfterDrop(currentLeftPanelItems[randomLeftIndex], currentRightPanelItems);

    //3.2 drag and drop to right panel
    let randomItemLocator = leftPanelLocator.getByRole('button', {name: currentLeftPanelItems[randomLeftIndex], exact: true});
    await randomItemLocator.dragTo(rightPanelLocator);
    await expect(rightPanelLocator.getByRole('button', {name: currentLeftPanelItems[randomLeftIndex], exact: true})).toBeVisible();

    //3.3 verify left panel
    currentLeftPanelItems = await leftPanelLocator.locator('button').allTextContents();
    await verifyPanel(currentLeftPanelItems, expectedLeftPanelItems);
    //3.4 verify right panel\
    currentRightPanelItems = await rightPanelLocator.locator('button').allTextContents();
    await verifyPanel(currentRightPanelItems, expectedRightPanelItems);

    //4. move from right to left
    //4.1 random an item in right panel
    let randomRightIndex = randomIndex(currentRightPanelItems.length);
    expectedRightPanelItems = buildExpectedAfterDrag(randomRightIndex, currentRightPanelItems);
    expectedLeftPanelItems = buildExpectedAfterDrop(currentRightPanelItems[randomRightIndex], currentLeftPanelItems);

    //4.2 drag and drop to left panel
    randomItemLocator = rightPanelLocator.getByRole('button', {name: currentRightPanelItems[randomRightIndex], exact: true});
    await randomItemLocator.dragTo(leftPanelLocator);
    await expect(leftPanelLocator.getByRole('button', {name: currentRightPanelItems[randomRightIndex], exact: true})).toBeVisible();

    //4.3 verify left panel
    currentLeftPanelItems = await leftPanelLocator.locator('button').allTextContents();
    await verifyPanel(currentLeftPanelItems, expectedLeftPanelItems);

    //4.4 verify right panel
    currentRightPanelItems = await rightPanelLocator.locator('button').allTextContents();
    await verifyPanel(currentRightPanelItems, expectedRightPanelItems);
});

async function verifyPanel(acutal: string[], expected: string[]) {
    expect(acutal.length).toBe(expected.length);
    expect(acutal).toEqual(expect.arrayContaining(expected));
    expect(expected).toEqual(expect.arrayContaining(acutal));  
}

function randomIndex(max: number) {
    return Math.floor(Math.random() * (max));
}

function buildExpectedAfterDrag(randomIndex: number, panelItems: string[]) {
    let expectedPanelItems = _.cloneDeep(panelItems);
    expectedPanelItems.splice(randomIndex, 1);
    return expectedPanelItems;
}

function buildExpectedAfterDrop(newItem: string, panelItems: string[]) {
    let expectedPanelItems = _.cloneDeep(panelItems);
    expectedPanelItems.push(newItem);
    return expectedPanelItems;
}
