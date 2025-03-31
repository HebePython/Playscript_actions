import { Page, Locator, expect } from '@playwright/test'

export class VolvoHomePage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly navbarItems: Locator;
    readonly imageExploreLinks: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = this.page.locator('.cmp-search__input');
        this.navbarItems = this.page.locator('.cmp-navigation__item-link');
        this.imageExploreLinks = this.page.locator('.img__asset.cmp-image__image.img__asset__image');
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

    async verifyUrl(expectedPath: string) {
        await expect(this.page).toHaveURL(new RegExp(expectedPath));
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
        await this.verifyUrl(expectedPath);
    }

    async clickExploreItem(altText: string) {
        await this.page.locator(`.img__asset.cmp-image__image.img__asset__image[alt="${altText}"]`).click();
    }
    
    async verifyExploreItemLinks(altText: string, expectedExplorePath: string) {
        await this.clickExploreItem(altText);
        await this.verifyUrl(expectedExplorePath);
    }

    async verifyJobsItemLink(altText: string, expectedJobsPath: string) {
        // promise will resolve when new page is opened
        const pagePromise = this.page.context().waitForEvent('page');
        // click element, opens new tab
        await this.clickExploreItem(altText);
        // wait for new page to open and get a reference to it
        const newPage = await pagePromise;
        // wait for loading
        await newPage.waitForLoadState();
        // check URL on new page with expected path
        await expect(newPage).toHaveURL(new RegExp(expectedJobsPath));
        // close new tab page
        await newPage.close();

    }

    
}