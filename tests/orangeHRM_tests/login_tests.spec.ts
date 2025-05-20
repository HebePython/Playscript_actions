import { test, expect } from '../../resources/util/base/orange_base'
import 'dotenv/config';

const { EMAIL, PW } = process.env;

if (!EMAIL || !PW) {
        throw new Error("EMAIL and PW must be defined in the environment variables.");
    }

test("Log into orange HRM", async ({
    loginPage,
    dashboardPage

}) => {
    await loginPage.goto();
    await loginPage.login(EMAIL, PW);
    await dashboardPage.isReady();
});
