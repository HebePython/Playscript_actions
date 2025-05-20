import { test } from '../../resources/util/base/orange_base'

const { EMAIL, PW } = process.env

test("Log into orange HRM", async ({
    loginPage,
    dashboardPage
}) => {
    await loginPage.goto();
    await loginPage.login("Admin", "admin123"); // put these in .env later.

    await dashboardPage.isReady();
})
