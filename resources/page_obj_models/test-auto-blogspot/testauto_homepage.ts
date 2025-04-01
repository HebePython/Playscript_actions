import { Page, expect, Locator } from '@playwright/test'

export class AutoBlogHomePage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://testautomationpractice.blogspot.com/');
    }
}