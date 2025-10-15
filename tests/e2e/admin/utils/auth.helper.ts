import { type Page, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/login.page";
import { roles } from "../data/roles";

type RoleName = "Admin" | "CS" | "CRM" | "ADV";

export async function loginAsRole(page: Page, roleName: RoleName) {
  const roleData = roles.find((role) => role.name === roleName);
  if (!roleData) {
    throw new Error(`Peran "${roleName}" tidak ditemukan`);
  }

  const loginPage = new LoginPage(page);

  await loginPage.navigateTo();
  await loginPage.login(roleData.email, roleData.password);

  await expect(page.getByText(roleData.name)).toBeVisible({
    timeout: 30000,
  });
}
