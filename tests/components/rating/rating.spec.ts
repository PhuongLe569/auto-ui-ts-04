import test, { expect, Page } from "@playwright/test";
import { ratingData } from "./rating-test-data";

import { haftRatingData } from "./rating-test-data";


test.beforeEach('Before each', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/rating');
});


for (let data of ratingData) {
    test(`Verify select rating - ${data.input}`, async ({ page }) => {
        await selectRateByLabel(page, 'Rate', data.input);
        await expect(page.getByText(`Current rating: ${data.expected}`)).toBeVisible();
    });
}


async function selectRateByLabel(page: Page, label: string, rating: number) {
    let rateComponentXpath = `(//span[.//text()[normalize-space()='${label}']]/following::ul[contains(concat(' ', normalize-space(@class), ' '), 'ant-rate')])[1]`;
    let rateComponentLocator = page.locator(rateComponentXpath);
    let currentStart = await rateComponentLocator.locator('.ant-rate-star-full').count();
    if (currentStart != rating) {
        await rateComponentLocator.locator(`li:nth-child(${rating})`).click();
    }
    
}



for (let data of haftRatingData) {
    test(`Verify select half rating - ${data}`, async ({ page }) => {
        await selectHalfRatingByLabel(page, 'Haft Rate', data);
        await expect(page.getByText(`Current rating: ${data}`)).toBeVisible();
    });
}

async function selectHalfRatingByLabel(page: Page, label: string, rating: number) {
    let halfRatingXpath = `(//span[.//text()[normalize-space()='${label}']]/following::ul[contains(concat(' ', normalize-space(@class), ' '), 'ant-rate')])[1]`;
    let haftRatingLocator = page.locator(halfRatingXpath);
    let currentStart = await haftRatingLocator.locator('.ant-rate-star-full').count();
    let halfCurrentStar = await haftRatingLocator.locator('.ant-rate-star-half').count();
    let totalStart = halfCurrentStar>0 ? currentStart + 0.5 : currentStart;

    if (totalStart != rating) {
        let liIndex = Math.ceil(rating);
        let firstOrSecond = rating < liIndex ? 'ant-rate-star-first' : 'ant-rate-star-second';
        await haftRatingLocator.locator(`li:nth-child(${liIndex}) .${firstOrSecond}`).click();
        //click
    }
    
}
