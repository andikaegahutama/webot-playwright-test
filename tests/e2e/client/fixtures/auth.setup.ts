import { roles } from "../data/roles.data";
import { LoginPage } from "../pages/login.page";
import { test as setup } from "@playwright/test";

for (const role of roles) {
  const authFile = `playwright/.auth/${role.name.toLowerCase()}.json`;

  setup(`Setup authentication for ${role.name}`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo();
    await loginPage.login(role.email, role.password);
    await page.waitForLoadState("networkidle");

    await page.context().storageState({ path: authFile });
  });
}
