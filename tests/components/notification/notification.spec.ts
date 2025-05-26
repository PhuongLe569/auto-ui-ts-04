import test, { expect, Page } from "@playwright/test";
import { notiData } from "./notification-test-data";

test.beforeEach('Before each', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/notification');
});

for (let data of notiData){
    test(`Verify select modal notification - ${data.input}`, async ({ page }) => {
        await selectNotiByLabel(page, 'Notification', data.input);
        //await selectModalPopup(page, 'Are you sure delete this task?', 'Yes');
        await expect(page.getByText(`Notification ${data.expected}`)).toBeVisible();
        // You have clicked the SUCCESS button.
        await expect(page.getByText(`You have clicked the ${data.expected} button.`)).toBeVisible();

    });
}

async function selectNotiByLabel(page: Page, label: string, value: string) {
    let xpathButton = `(//span[.//text()[normalize-space()='${label}']]/following::button[normalize-space()='${value}'])[1]`;
    await page.locator(xpathButton).click();
}

