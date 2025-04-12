import { Page, expect, Locator } from '@playwright/test'

export class AutoBlogHomePage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://testautomationpractice.blogspot.com/');
    };

    async verifyTitle() {
        await expect(this.page).toHaveTitle(/Automation Testing Practice/);
    };

    async fillNameTextBox(text: string) {
        await this.page.locator('#name').fill(text);
    };
    
    async fillEmailTextBox(text: string) {
        await this.page.locator('#email').fill(text);
    };
    
    async fillPhoneTextBox(text: string) {
        await this.page.locator('#phone').fill(text);
    };

    async fillAdressTextBox(text: string) {
        await this.page.locator('#textarea').fill(text);
    };

    async verifyTextBox(expectedText: string, boxID: string) {
        await expect(this.page.locator(`#${boxID}`)).toHaveValue(expectedText);
    };
}