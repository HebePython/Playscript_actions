import { test as base } from '@playwright/test'
import { VolvoHomePage } from '../../resources/page_obj_models/Volvo/home_page_object'
import { navbarItems, imageExploreLinks } from '../../resources/util/volvo_testdata/home_page_testdata';
import { setupVolvoAuth } from '../../resources/util/helpers/volvo_auth';

type TestFixtures = {
    volvoHome: VolvoHomePage;
};

const test = base.extend<TestFixtures>({
    volvoHome: async ({ page }, use) => {
        const volvoHome = new VolvoHomePage(page);

        await use(volvoHome);
    },
});

test.beforeAll(async () => {
    await setupVolvoAuth();
});

test.beforeEach(async ({ volvoHome }) => {
    await volvoHome.goto();
});

test.afterAll(async ({ volvoHome }) => {
    await volvoHome.page.close();
});

test.describe('@smoke-tests', () => {
    
    test('has title', async ({ volvoHome }) => {
        await volvoHome.verifyTitle();
    });

    test('You can type into search bar and hit enter to search', async ({ volvoHome }) => {
        await volvoHome.clickSearchIcon();
        await volvoHome.typeIntoSearchBar("jobs");
        await volvoHome.verifySearchBarText("jobs");
        await volvoHome.pressEnterInSearchBar();
        await volvoHome.verifyUrl("jobs");
    });

    for (const item of navbarItems) { // parameterized tests.
        test(`Navbar item "${item.text}" navigates to correct URL`, async ({ volvoHome }) => {
            await volvoHome.verifyNavbarItemNavigatesToUrl(item.text, item.expectedPath);
        });
    }

    for (const item of imageExploreLinks) {
        test(`Explore Item Link item "${item.text}" navigates to correct URL`, async ({ volvoHome }) => {
            await volvoHome.verifyExploreItemLinks(item.text, item.expectedExplorePath);
        });
    }

    test('When jobs image link is clicked, it opens a new tab for job opening', async ({ volvoHome }) => {
        await volvoHome.verifyJobsItemLink('Job openings', 'jobs.volvogroup.com');
    });
});

test.describe('@new-feature', () => {

    test('When homepage is opened video should play automatically', async ({ volvoHome }) => {
        await volvoHome.verifyVideoAutoplay();
    });

    test('Clicking Learn More button opens products and services page', async ({ volvoHome }) => {
        await volvoHome.verifyLearnMoreButton("about-us/Products_and_services.html");
    })
});