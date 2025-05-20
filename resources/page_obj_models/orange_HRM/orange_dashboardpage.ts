import { Page, expect, Locator } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;

    public url = "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"

    readonly homeDashboard: Locator    

    constructor(page: Page) {
        this.page = page;
    }

  

    async isReady() {
        await expect(this.page.getByRole('heading')).toContainText('Dashboard');
    }

}