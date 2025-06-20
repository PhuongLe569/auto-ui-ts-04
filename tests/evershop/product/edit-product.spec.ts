import test, { expect } from "@playwright/test";
import { EditProductPage } from "../../../pages/EditProductPage";
import { LoginPage } from "../../../pages/LoginPage";
import { NewProductPage } from "../../../pages/NewProductPage";
import { ProductsPage } from "../../../pages/ProductsPage";
import { CREATE_PRODUCT_API, DELETE_PRODUCT_API, LOGIN_URL, URL } from "../../../utils/constants";
import createProductBody from "../product/data/create-product-body-template.json"
import { create } from "lodash";

let loginPage : LoginPage;
let newProductPage: NewProductPage
let productsPage: ProductsPage
let editProductPage: EditProductPage;
let listProductIds: string[] = [];
let cookie: string;


test.beforeEach('Before each', async ({ page, context }) => {
    loginPage = new LoginPage(page);
    newProductPage = new NewProductPage(page);
    productsPage = new ProductsPage(page);
    editProductPage = new EditProductPage(page);
    await page.goto(LOGIN_URL);
    await loginPage.loginWithAdmin();
    let cookies = await context.cookies();
    let asid = cookies.filter(c => c.name == 'asid').map(fillteredCookie => fillteredCookie.value);
    let sid = cookies.filter(c => c.name == 'sid').map(fillteredCookie => fillteredCookie.value);
    cookie = `asid=${asid}; sid=${sid}`;
    await expect(page.getByText('Dashboard').first()).toBeVisible();
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

test(`Verify edit product`, async ({ page, request }) => {

    const random = new Date().getTime();
    const randomName = `Giày Thể Thao Biti's Hunter X - ${random}`;
    const randomSku = `SKU-${random}`;
    const randomUrlKey = `url-key-${random}`;
    createProductBody.name = randomName;
    createProductBody.sku = randomSku;
    createProductBody.url_key = randomUrlKey;
    let createProductRespone = await request.post(`${URL}${CREATE_PRODUCT_API}`, {
        headers: {
            'cookie' : cookie,
            'Content-Type' : 'application/json'
        },
        data: createProductBody
    });

    expect(createProductRespone.status()).toEqual(200);
    let createProductResponeJson = await createProductRespone.json();
    listProductIds.push(createProductResponeJson.data.uuid);

    await newProductPage.selectMenuByLabel("Products");
    await expect(page.getByText("Products", { exact: true}).first()).toBeVisible();
    await productsPage.searchProductByName(`${random}`);
    await expect(page.getByText(randomName)).toBeVisible();
    await productsPage.clickOnLinkByText(randomName);
    await expect(page.getByText(`Editing ${randomName}`)).toBeVisible();
    const randomNameUpdated = `Giày Thể Thao Biti's Hunter X - Updated - ${random}`;
    await editProductPage.inputTextBoxByLabel('Name', randomNameUpdated);
    await editProductPage.clickButtonByLabel('Save');
    await expect(page.getByText('Product saved successfully!')).toBeVisible();
    await editProductPage.selectMenuByLabel("Products");
    await expect(page.getByText("Products", { exact: true}).first()).toBeVisible();
    await productsPage.searchProductByName(`${random}`);
    await expect(page.getByText(randomNameUpdated)).toBeVisible();
    await productsPage.clickOnLinkByText(randomNameUpdated);
    await expect(page.getByText(`Editing ${randomNameUpdated}`)).toBeVisible();
    expect(await editProductPage.getTextBoxValueByLabel('Name')).toEqual(randomNameUpdated);
    expect(await editProductPage.getTextBoxValueByLabel('SKU')).toEqual(randomSku);
    expect(await editProductPage.getTextBoxValueByLabel('Price')).toEqual('100');
    expect(await editProductPage.getTextBoxValueByLabel('Weight')).toEqual('200');   
});