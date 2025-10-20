import { test, expect } from "@playwright/test";
import { loginAsRole } from "../../utils/auth.helper";

test.describe("E2E - Over SLA Check Reason", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsRole(page, "HO_CS");
  });

  test("should successfully showing over sla & over sla reason", async ({
    page,
  }) => {
    await page
      .locator("div")
      .filter({ hasText: /^Kendala$/ })
      .nth(1)
      .click();
    await page.getByText("Over Sla").click();
    await expect(page.getByText("Over SLA", { exact: true })).toBeVisible();
    await expect(
      page.locator(".flex.items-center.gap-3").first()
    ).toBeVisible();
    await expect(
      page
        .locator(
          ".inline-flex.items-center.gap-1.text-\\[10px\\].text-main-status-on-delivery"
        )
        .first()
    ).toBeVisible();
    await expect(page.getByText("Kurir Lambat").first()).toBeVisible();
  });
});
