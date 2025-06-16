import test, { expect, Page } from "@playwright/test";
import { LoginPage } from "../../../pages/LoginPage";
import { NewProductPage } from "../../../pages/NewProductPage";
import { ProductsPage } from "../../../pages/ProductsPage";
import { EditProductPage } from "../../../pages/EditProductPage";
import { DELETE_PRODUCT_API, LOGIN_URL, URL } from "../../../utills/constants";

let loginPage : LoginPage;
let newProductPage: NewProductPage
let productsPage: ProductsPage
let editProductPage: EditProductPage;
let listProductIds: string[] = [];
let cookie: string;

test.beforeEach('Before each', async ({ page }) => {
    loginPage = new LoginPage(page);
    newProductPage = new NewProductPage(page);
    productsPage = new ProductsPage(page);
    editProductPage = new EditProductPage(page);
    await page.goto(LOGIN_URL);
    await loginPage.loginWithAdmin();
    await expect(page.getByText('Dashboard').first()).toBeVisible();

    page.route('*/**/api/products', async (route, request) => {
        let allHeaders = await request.allHeaders();
        cookie = allHeaders.cookie;
        const response = await route.fetch();
        const json = await response.json();
        console.log(json);
        listProductIds.push(json.data.uuid);
        await route.fulfill({ response, json });
    });
});


test.afterAll('Clean up data', async ({ request }) => {
    //delete product by id
    for (let id of listProductIds) {
        await request.delete(`${URL}${DELETE_PRODUCT_API}${id}`, {
            headers: {
                'cookie': cookie
            }
        });
    }
    

});

test(`Verify create product`, async ({ page }) => {

    await loginPage.selectMenuByLabel('New Product');
    await expect(page.getByText('Create a new product')).toBeVisible();
    const random = new Date().getTime();
    const randomName = `Giày Thể Thao Biti's Hunter X - ${random}`;
    await newProductPage.inputTextBoxByLabel('Name', randomName);
    const randomSku = `SKU-${random}`;
    await newProductPage.inputTextBoxByLabel('SKU', randomSku);
    await newProductPage.inputTextBoxByLabel('Price', "100");
    await newProductPage.inputTextBoxByLabel('Weight', "200");
    await newProductPage.selectCategory('Men');
    await newProductPage.selectDropdownByLabel('Tax class', 'Taxable Goods');
    await newProductPage.uploadImages(['..\\tests\\evershop\\product\\data\\bitis.webp']);
    const randomUrlKey = `url-key-${random}`;
    await newProductPage.inputTextBoxByLabel('Url key', randomUrlKey);
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
    await newProductPage.selectMenuByLabel("Products");
    await expect(page.getByText("Products", { exact: true}).first()).toBeVisible();
    await productsPage.searchProductByName(`${random}`);
    await expect(page.getByText(randomName)).toBeVisible();
    await productsPage.clickOnLinkByText(randomName);
    await expect(page.getByText(`Editing ${randomName}`)).toBeVisible();
    expect(await editProductPage.getTextBoxValueByLabel('Name')).toEqual(randomName);
    expect(await editProductPage.getTextBoxValueByLabel('SKU')).toEqual(randomSku);
    expect(await editProductPage.getTextBoxValueByLabel('Price')).toEqual('100');
    expect(await editProductPage.getTextBoxValueByLabel('Weight')).toEqual('200');
    expect(await editProductPage.getRadioByLabel('Status', 'Disabled')).toBe(true);
    expect(await editProductPage.getRadioByLabel('Visibility', 'Not visible')).toBe(true);
    expect(await editProductPage.getRadioByLabel('Manage stock?', 'No')).toBe(true);
    expect(await editProductPage.getRadioByLabel('Stock availability', 'No')).toBe(true);
    expect(await editProductPage.getTextBoxValueByLabel('Quantity')).toEqual('10');
    expect(await editProductPage.getDropdownValueByLabel('Attribute group')).toEqual('Default');
    expect(await editProductPage.getDropdownValueByLabel('Color')).toEqual('White');
    expect(await editProductPage.getDropdownValueByLabel('Size')).toEqual('XL');
    expect(await editProductPage.getTextBoxValueByLabel('Url key')).toEqual(randomUrlKey);
    expect(await editProductPage.getTextBoxValueByLabel('Meta title')).toEqual('bitis');
    expect(await editProductPage.getTextBoxValueByLabel('Meta keywords')).toEqual('bitis');
    expect(await editProductPage.getTextAreaValueByLabel('Meta description')).toEqual("Giày Thể Thao Biti's Hunter X LiteDash Go For Love 2k25 Edition Nam Màu Nâu HSM007505NAU");

});

