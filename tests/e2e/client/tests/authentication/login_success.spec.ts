import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { roles } from "../../data/roles.data";

test.describe("Authentication Feature", () => {
  for (const role of roles) {
    test(`Should successfully login with ${role.name}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.navigateTo();
      await loginPage.login(role.email, role.password);

      await expect(page.getByText(role.username)).toBeVisible({
        timeout: 30000,
      });

      await expect(loginPage.errorMessage).not.toBeVisible();
    });
  }
});
