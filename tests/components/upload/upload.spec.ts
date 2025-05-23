import test, { expect, Page } from "@playwright/test";
import path from 'node:path';

test.beforeEach('Before each', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/upload');
});

test('Verify upload file', async ({ page }) => {
    let filePath = '\\upload-data.txt';
    await uploadFileByLabel(page, 'Upload file', filePath);
    await expect(page.getByText('upload-data.txt')).toBeVisible();
});

async function uploadFileByLabel(page: Page, label: string, filePath: string) {
    let absolutePath = path.join(__dirname, filePath);
    // read file
    let xpathInput = `(//span[.//text()[normalize-space()='${label}']]/following::input[@type='file'])[1]`;
    await page.locator(xpathInput).setInputFiles(absolutePath);
}

