import { Page, Locator, expect } from '@playwright/test'

export class VolvoHomePage {
    readonly page: Page;
    readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = this.page.locator('.cmp-search__input');
    }

    async goto() {
        await this.page.goto('https://volvogroup.com');
    }

    async verifyTitle() {
        await expect(this.page).toHaveTitle(/Volvo Group/);
    }

    async clickSearchIcon() {
        await this.page.locator('.header__searchIcon--icon').click();
    }

    async typeIntoSearchBar(searchText: string) {
        await this.page.locator('.cmp-search__input').fill(searchText);
    }

    async pressEnterInSearchBar() {
        await this.searchInput.press('Enter');
    }

    async verifySearchBarText(expectedText: string) {
        await expect(this.searchInput).toHaveValue(expectedText);
    }
}