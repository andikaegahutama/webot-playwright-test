import test, { expect } from "@playwright/test";
import { loginAsRole } from "../../../utils/auth.helper";

test.describe(() => {
  test.beforeEach("", async ({ page }) => {
    await loginAsRole(page, "HO_CS");
  });

  test("should successfully monitoring bermasalah reporting", async ({
    page,
  }) => {
    await page.getByText("Bermasalah").click();
    await page.getByText("List CS/CRM").click();
    await page.locator(".px-4").first().click();
    await page
      .locator("div")
      .filter({ hasText: /^4Open$/ })
      .locator("span")
      .nth(1)
      .click();

    for (let i = 2; i <= 4; i++) {
      await expect(
        page
          .locator(
            `.grid.grid-cols-3.grid-cols-4 > div:nth-child(${i}) > .text-xs`
          )
          .first()
      ).toBeVisible();
    }

    await page.locator(".grid > div:nth-child(5)").first().click();

    for (let i = 1; i <= 8; i++) {
      await expect(page.locator(`div:nth-child(${i})`).first()).toBeVisible();
    }
  });
});
