import { test } from '@playwright/test'
import { VolvoHomePage } from '../resources/page_objects'

test('has title', async ({ page }) => {
    const volvoHome = new VolvoHomePage(page);
    await volvoHome.goto();
    await volvoHome.verifyTitle();
});

test('You can type into search bar', async ({ page}) => {
    const volvoHome = new VolvoHomePage(page);
    await volvoHome.goto();
    await volvoHome.
})
