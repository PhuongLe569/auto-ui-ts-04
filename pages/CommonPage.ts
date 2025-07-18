import { Page } from "@playwright/test";

export class CommonPage{
    page: Page;
    constructor(page: Page){
        this.page = page;

    }

    async selectMenuByLabel(label: string){
        let xpath = `//li[contains(concat(' ',normalize-space(@class),' '),' nav-item ')]//a[.//text()[normalize-space()='${label}']]`;
        await this.page.locator(xpath).click();

    }

    async inputTextBoxByLabel(label: string, value: string) {
        let xpath = `(//label[.//text()[normalize-space()='${label}']]/following::input)[1]`;
        await this.page.locator(xpath).clear();
        await this.page.locator(xpath).fill(value);      
    }
    async selectDropdownByLabel(label: string, value: string) {
        let xpath = `(//text()[normalize-space()='${label}']//following::select)[1]`;
        await this.page.locator(xpath).selectOption(value);
    }

    async inputTextAreaByLabel(label: string, value: string) {
        let xpath = `(//label[.//text()[normalize-space()='${label}']]/following::textarea)[1]`;
        await this.page.locator(xpath).clear();
        await this.page.locator(xpath).fill(value);      
    }
    
    async selectRadioByLabel(label: string, value: string) {
        let xpath = `(//label[.//text()[normalize-space()='${label}']]/following::label[.//text()[normalize-space()='${value}']])[1]`;
        await this.page.locator(xpath).click();
    }

    async clickButtonByLabel(label: string) {
        let xpath = `//button[.//text()[normalize-space()='${label}']]`;
        await this.page.locator(xpath).click();
    }
    async clickOnLinkByText(text: string) {
        let xpath = `//a[.//text()[normalize-space()="${text}"]]`;
        await this.page.locator(xpath).click();  
    }
    async getTextBoxValueByLabel(label: string) {
        let xpath = `(//label[.//text()[normalize-space()='${label}']]/following::input)[1]`;
        let value = await this.page.locator(xpath).getAttribute("value");
        return value?.trim();
    }
        async getTextAreaValueByLabel(label: string) {
        let xpath = `(//label[.//text()[normalize-space()='${label}']]/following::textarea)[1]`;
        let value = await this.page.locator(xpath).textContent();
        return value?.trim();     
    }

    async getRadioByLabel(label: string, value: string) {
        let xpath = `(//label[.//text()[normalize-space()='${label}']]/following::label[.//text()[normalize-space()='${value}']])[1]`;
        let radioLocator = this.page.locator(xpath);
        let inputLocator = radioLocator.locator('input');
        let isChecked = await inputLocator.isChecked(); 
        //let isChecked = await inputLocator.getAttribute('checked');
        return isChecked;
    }
        async getDropdownValueByLabel(label: string) {
        let xpath = `(//text()[normalize-space()='${label}']//following::select)[1]`;
        let xpathLocator = await this.page.locator(xpath);
        let value = xpathLocator.locator('option[selected]').textContent();
        return value;
    }


}