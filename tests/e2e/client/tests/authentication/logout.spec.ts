import test, { expect } from "@playwright/test";
import { loginAsRole } from "../../utils/auth.helper";
import { ProfilePage } from "../../pages/profile.page";
import { HomePage } from "../../../admin/pages/home.page";

test.describe("Logout Feature", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsRole(page, "CS");
  });

  test(`Should successfully logout`, async ({ page }) => {
    const homePage = new HomePage(page);
    const profilePage = new ProfilePage(page);

    await homePage.navbar.profile.click();
    await profilePage.clickLogoutButton();
    await expect(page).toHaveURL("v2/auth/login");
    await expect(page.getByText("Silahkan Login")).toBeVisible();
  });
});
