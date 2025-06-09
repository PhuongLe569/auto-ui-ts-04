import test, { expect, Page } from "@playwright/test";
import { LoginPage } from "../../../pages/LoginPage";
import { NewProductPage } from "../../../pages/NewProductPage";

let loginPage : LoginPage;
let newProductPage: NewProductPage

test.beforeEach('Before each', async ({ page }) => {
    loginPage = new LoginPage(page);
    newProductPage = new NewProductPage(page);
    await page.goto('http://localhost:3000/admin/login');
    await loginPage.loginWithAdmin();
    await expect(page.getByText('Dashboard').first()).toBeVisible();
});


test(`Verify create product`, async ({ page }) => {

    await loginPage.selectMenuByLabel('New Product');
    await expect(page.getByText('Create a new product')).toBeVisible();
    await newProductPage.inputTextBoxByLabel('Name', "Giày Thể Thao Biti's Hunter X");
    await newProductPage.inputTextBoxByLabel('SKU', "123456789");
    await newProductPage.inputTextBoxByLabel('Price', "100");
    await newProductPage.inputTextBoxByLabel('Weight', "200");
    await newProductPage.selectCategory('Men');
    await newProductPage.selectDropdownByLabel('Tax class', 'Taxable Goods');
    await newProductPage.uploadImages(['..\\tests\\evershop\\product\\data\\bitis.webp']);
    await newProductPage.inputTextBoxByLabel('Url key', "giay-the-thao-bitis");
    await newProductPage.inputTextBoxByLabel('Meta title', "bitis");
    await newProductPage.inputTextBoxByLabel('Meta keywords', "bitis");
    await newProductPage.inputTextAreaByLabel('Meta description', "Giày Thể Thao Biti's Hunter X LiteDash Go For Love 2k25 Edition Nam Màu Nâu HSM007505NAU");
    await newProductPage.selectRadioByLabel('Status' , 'Disabled');
    await newProductPage.selectRadioByLabel('Visibility' , 'Not visible');
    await newProductPage.selectRadioByLabel('Manage stock?' , 'No');
    await newProductPage.selectRadioByLabel('Stock availability' , 'No');
    await newProductPage.inputTextBoxByLabel('Quantity', "10");
    await newProductPage.selectDropdownByLabel('Attribute group', 'Default');
    await newProductPage.selectDropdownByLabel('Color', 'White');
    await newProductPage.selectDropdownByLabel('Size', 'XL');
    await newProductPage.clickButtonByLabel('Save');
    await expect(page.getByText('Product saved successfully!')).toBeVisible();
});

