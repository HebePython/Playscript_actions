import { Page, Locator, expect } from '@playwright/test'

export class VolvoHomePage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly navbarItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = this.page.getByRole('combobox');
        this.navbarItems = this.page.locator('.cmp-navigation__item-link');
    }

    async goto() {
        try {
            await this.page.goto('https://volvogroup.com/', {
                timeout: 45000,  // Increase timeout for this specific navigation
                waitUntil: 'domcontentloaded'  // Less strict than 'networkidle'
            });
        } catch (error) {
            console.error('Navigation to Volvo page failed:', error);
            // Re-throw to make the test fail properly
            throw error;
        }
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
        await this.navbarItems.filter({ hasText: linkText }).click();
    }

    async verifyNavbarItemNavigatesToUrl(linkText: string, expectedPath: string) {
        await this.clickNavbarItem(linkText);
        await this.verifyUrl(expectedPath);
    }

    async clickExploreItem(altText: string) {
        await this.page.locator(`a:has(img[alt="${altText}"])`).click();
    }
    
    async verifyExploreItemLinks(altText: string, expectedExplorePath: string) {
        await this.clickExploreItem(altText);
        await this.verifyUrl(expectedExplorePath);
    }

    async verifyJobsItemLink(altText: string, expectedJobsPath: string) {
        const pagePromise = this.page.context().waitForEvent('page');
        await this.clickExploreItem(altText);
        const newPage = await pagePromise;
        await newPage.waitForLoadState();
        await expect(newPage).toHaveURL(new RegExp(expectedJobsPath));
        await newPage.close();
    }

    async verifyVideoAutoplay() {
        const videoElement = this.page.locator('video').first();   
        await videoElement.waitFor({ state: 'attached' });
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