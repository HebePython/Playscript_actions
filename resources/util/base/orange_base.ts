import { test as base } from "@playwright/test"
import { LoginPage } from "../../page_obj_models/orange_HRM/orange_loginpage"
import { DashboardPage } from "../../page_obj_models/orange_HRM/orange_dashboardpage"

type MyFixtures = {
    loginPage: LoginPage,
    dashboardPage: DashboardPage
}

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use (new LoginPage(page))
    },
    dashboardPage: async ({ page }, use) => {
        await use (new DashboardPage(page))
    }
}) 

export { expect } from "@playwright/test"