import { type Page, expect } from "@playwright/test";
import { roles } from "../data/roles.data";
import { LoginPage } from "../pages/login.page";
import { waitForAPIResponse } from "./api.helper";

type RoleName = "CS" | "CRM" | "ADV" | "HO_CS" | "HO_CRM" | "HO_ADV";

export async function loginAsRole(page: Page, roleName: RoleName) {
  const roleData = roles.find((role) => role.name === roleName);
  if (!roleData) {
    throw new Error(`Peran "${roleName}" tidak ditemukan`);
  }

  const loginPage = new LoginPage(page);

  await loginPage.navigateTo();
  await loginPage.login(roleData.email, roleData.password);

  await expect(page.getByText(roleData.username)).toBeVisible({
    timeout: 30000,
  });
}
