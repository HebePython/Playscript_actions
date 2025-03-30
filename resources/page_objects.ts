import { Page, Locator, expect } from '@playwright/test'

export class VolvoHomePage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly navbarItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = this.page.locator('.cmp-search__input');
        this.navbarItems = this.page.locator('.cmp-navigation__item-link');
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

    async clickNavbarItem(linkText: string) {
        // Use the correct class and the exact text matching
        await this.page.locator('.cmp-navigation__item-link', { hasText: linkText }).click();
        
    }

    async verifyNavbarUrl(expectedPath: string) {
        // Make sure we're checking for the complete path
        await expect(this.page).toHaveURL(new RegExp(expectedPath));
    }

    async verifyNavbarItemNavigatesToUrl(linkText: string, expectedPath: string) {
        await this.clickNavbarItem(linkText);
        await this.verifyNavbarUrl(expectedPath);
    }

 
}