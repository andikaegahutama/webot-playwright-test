import { test, expect } from "@playwright/test";
import { loginAsRole } from "../../../utils/auth.helper";

test.describe(() => {
  test.beforeEach("", async ({ page }) => {
    await loginAsRole(page, "HO_CRM");
  });

  test("should successfully monitoring crm perform", async ({ page }) => {
    await page.getByText("Customer Service").click();
    await page.getByText("SummaryHari ini").click();
    await page.getByText("Summary").click();
    await page
      .locator("#customerServiceDateRangeID div")
      .filter({ hasText: "Hari ini" })
      .first()
      .click();
    await page
      .locator("#customerServiceDateRangeID div")
      .filter({ hasText: "Hari ini" })
      .first()
      .click();
    await page.getByText("Rp.").click();
    await page.getByText("Total Omzet").click();
    await page.getByText("Oktober 2025").click();
    await page.getByText("Total Resi").click();
    await page.getByText("Total Quantity").click();
    await page.getByText("Total Closing").click();
    await page.getByText("List Customer", { exact: true }).click();
    // await page.getByText("Produk Utama").click();
    // await page
    //   .locator("div")
    //   .filter({ hasText: /^Cs DienHistory Lead$/ })
    //   .locator("span")
    //   .click();
    // await page.getByText("Snack VideoEtawalin4Up to 400").click();
    // await page.locator(".relative.px-5").click();
    // await page.locator("svg").click();
    // await page
    //   .locator("#customerServiceDateRangeID div")
    //   .filter({ hasText: "Hari ini" })
    //   .first()
    //   .click();
    // await page.getByText("Kemarin").click();
    // await page.getByText("Oktober 2025").click();
    // await expect(page.getByText("Total Omzet14 Oktober")).toBeVisible();
    await page
      .locator("div")
      .filter({ hasText: /^No List Customer ServiceEntries Yet$/ })
      .first()
      .click();
  });
});
