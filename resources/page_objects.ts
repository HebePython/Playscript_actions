import { Page, Locator, expect } from '@playwright/test'

export class VolvoHomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://volvogroup.com');
    }

    async verifyTitle() {
        await expect(this.page).toHaveTitle(/Volvo Group/);
    }
}