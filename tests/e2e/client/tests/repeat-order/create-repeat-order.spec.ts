import { test, expect } from "@playwright/test";
import { loginAsRole } from "../../utils/auth.helper";
import { mockApi } from "../../../admin/utils/mocks.helper";

test.describe("E2E - Repeat Order", () => {
  test.describe(() => {
    test.beforeEach(async ({ page }) => {
      await loginAsRole(page, "CS");
    });
    test("Payment Method: COD Warehouse: ${warehouseName}", async ({
      page,
    }) => {
      await page
        .locator("div")
        .filter({ hasText: /^Transaksi$/ })
        .nth(1)
        .click();
      await page.locator(".z-30.flex").click();
      await page
        .getByRole("button", { name: "d3u-repeat-icon-1 d3u-repeat-" })
        .click();
      await page.locator(".css-1s2u09g-control").click();
      await page.getByText("Imas Yahya (Beca) -").click();
      await page
        .locator("div")
        .filter({ hasText: /^Pilih Alamat$/ })
        .nth(1)
        .click();
      await expect(page.getByText("Loading...")).toBeHidden();
      await page.getByText("jalan a no 2 , Jawa Tengah,").click();
      await page
        .locator("div")
        .filter({ hasText: /^Pilih Tim$/ })
        .nth(2)
        .click();
      await page.getByText("PGM EDX - Vitameal", { exact: true }).click();
      await page
        .locator("div")
        .filter({ hasText: /^Pilih Shift$/ })
        .nth(3)
        .click();
      await page.locator("#react-select-15-option-1").click();
      await page
        .locator("div")
        .filter({ hasText: /^Pilih Advertiser$/ })
        .nth(1)
        .click();
      await page.getByText("Adv.Idos6282322272036").click();
      await page
        .locator("div")
        .filter({ hasText: /^Pilih Platform Adv$/ })
        .nth(1)
        .click();
      await page.getByText("Meta Awareness").click();
      await page.getByText("COD").click();
      await page
        .locator("div")
        .filter({ hasText: /^Pilih Warehouse$/ })
        .nth(1)
        .click();
      await page.getByText("EDN SURABAYA", { exact: true }).click();
      await page.getByRole("button", { name: "Add Product" }).click();
      await expect(
        page.locator(".animate-pulse > .css-1d8n9bt > .css-ackcql")
      ).toBeHidden();
      await page
        .locator("div")
        .filter({ hasText: /^Pilih Product$/ })
        .nth(1)
        .click();
      await page.getByText("Maxgreng", { exact: true }).click();
      await page.locator("#productQuantityInput").click();
      await page.locator("#productQuantityInput").fill("1");
      await page.getByRole("button", { name: "Add", exact: true }).click();
      await mockApi(page, "**/shipper/courier", { data: [] });
      await page
        .locator("div")
        .filter({ hasText: /^Pilih Courier$/ })
        .nth(1)
        .click();
      await page.getByText("DETHIX (Rp. 17,500)", { exact: true }).click();
      await page.getByRole("button", { name: "Review" }).click();
      await page.pause();
      await expect(page.getByText("Copy Data")).toBeVisible();

      await page.getByRole("button", { name: "Publish" }).click();
      await page.pause();
      await expect(page.getByText("List Transaksi")).toBeVisible();
      await expect(page.getByText("Data berhasil di input")).toBeVisible();
      await expect(
        page
          .locator(
            ".inline-flex.items-center.gap-1.text-\\[10px\\].text-main-status-packing"
          )
          .first()
      ).toBeVisible();
    });
  });
});
