import { test as base } from '@playwright/test'
import { VolvoHomePage } from '../resources/page_objects'

type TestFixtures = {
    volvoHome: VolvoHomePage;
};

const test = base.extend<TestFixtures>({
    volvoHome: async ({ page }, use) => {
        const volvoHome = new VolvoHomePage(page);

        await use(volvoHome);
    },
});

test('has title', async ({ volvoHome }) => {
    await volvoHome.goto();
    await volvoHome.verifyTitle();
});

test('You can type into search bar and hit enter to search', async ({ volvoHome }) => {
    await volvoHome.goto();
    await volvoHome.clickSearchIcon();
    await volvoHome.typeIntoSearchBar("jobs");
    await volvoHome.verifySearchBarText("jobs");
    await volvoHome.pressEnterInSearchBar();
});


