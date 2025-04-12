import { test as base } from '@playwright/test'
import { AutoBlogHomePage } from '../../resources/page_obj_models/test-auto-blogspot/testauto_homepage'

type TestFixtures = {
    autoBlog: AutoBlogHomePage;
};

const test = base.extend<TestFixtures> ({
    autoBlog: async ({ page }, use) => {
        const autoBlog = new AutoBlogHomePage(page);

        await use(autoBlog);
    },
});

test.beforeEach(async ({ autoBlog }) => {
    await autoBlog.goto();
});

test('has title', async ({ autoBlog }) => {
    await autoBlog.verifyTitle();
});

test('test name box', async ({ autoBlog }) => {
    await autoBlog.fillNameTextBox("Henrik");
    await autoBlog.verifyTextBox("Henrik", "name");
});