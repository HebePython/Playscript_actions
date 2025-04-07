import { Page, Locator, expect } from '@playwright/test'

export class VolvoHomePage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly navbarItems: Locator;

    constructor(page: Page) {
        this.page = page;
      //  this.searchInput = this.page.locator('.cmp-search__input');
        this.searchInput = this.page.getByRole('combobox');
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
        await this.searchInput.fill(searchText);
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
      //  await this.page.locator('.cmp-navigation__item-link', { hasText: linkText }).click(); 
        await this.navbarItems.filter({ hasText: linkText }).click();
    }

    async verifyNavbarItemNavigatesToUrl(linkText: string, expectedPath: string) {
        await this.clickNavbarItem(linkText);
        await this.verifyUrl(expectedPath);
    }

    async clickExploreItem(altText: string) {
    // original:  await this.page.locator(`.img__asset.cmp-image__image.img__asset__image[alt="${altText}"]`).click();
    // Option 1: Find the parent link wrapping the image (most likely solution)    
        await this.page.locator(`a:has(img[alt="${altText}"])`).click();
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

    async verifyVideoAutoplay() {
        // Find the video element - adjust selector as needed for the actual site
        const videoElement = this.page.locator('video').first();   
        // Wait for the video element to be present
        await videoElement.waitFor({ state: 'attached' });
        // Check for autoplay attribute
        const hasAutoplay = await videoElement.evaluate(video => 
            video.hasAttribute('autoplay'));
        expect(hasAutoplay).toBeTruthy();
    }
    
    async verifyLearnMoreButton(expectedPath: string) {
        const LearnMoreBtn = this.page.getByRole('link', { name: 'Learn more' })
        await LearnMoreBtn.click();
        await this.verifyUrl(expectedPath);
    }
}