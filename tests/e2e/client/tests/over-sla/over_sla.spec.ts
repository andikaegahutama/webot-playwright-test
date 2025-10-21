import { test, expect } from "@playwright/test";
import { loginAsRole } from "../../utils/auth.helper";
import { HomePage } from "../../pages/home.page";
import { KendalaPage } from "../../pages/kendala.page";

test.describe("E2E - Over SLA Check Reason", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsRole(page, "HO_CS");
  });

  test("should successfully showing over sla & over sla reason", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const kendalaPage = new KendalaPage(page);

    await homePage.navbar.clickKendalaButton();

    await kendalaPage.clickTabOverSla();
    await kendalaPage.showOverSlaStatusBadge();
    await kendalaPage.showOverSlaReason("Kurir Lambat");
  });
});
