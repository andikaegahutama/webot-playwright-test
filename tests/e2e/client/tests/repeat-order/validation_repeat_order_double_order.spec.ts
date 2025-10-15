import { test, expect } from "@playwright/test";
import { loginAsRole } from "../../utils/auth.helper";

test.describe(() => {
  test("should showing popup double order", async ({ page }) => {
    await loginAsRole(page, "CS");
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
    await page.getByText("Acu -").click();
    await page
      .locator("div")
      .filter({ hasText: /^Pilih Alamat$/ })
      .nth(1)
      .click();
    await expect(page.getByText("Loading...")).toBeHidden();
    await page
      .locator("div")
      .filter({
        hasText:
          /^Alamat 1-, Jawa Tengah, Kabupaten Magelang,Secang, Donorejo$/,
      })
      .nth(1)
      .click();
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
    // await page.locator("#react-select-15-input").fill("Gizidat");
    await page.getByText("Gizidat", { exact: true }).click();
    // await page.locator("#react-select-15-input").fill("Gizidat");
    // await page.locator("#react-select-15-input").press("Enter");
    await page.locator("#productQuantityInput").click();
    await page.locator("#productQuantityInput").fill("1");
    await page.getByRole("button", { name: "Add", exact: true }).click();
    await page
      .locator("div")
      .filter({ hasText: /^Pilih Courier$/ })
      .nth(1)
      .click();
    await page.getByText("DETHIX (Rp. 14,500)", { exact: true }).click();
    await page.getByRole("button", { name: "Review" }).click();
    await expect(page.getByText("Customer memesan produk yang")).toBeVisible();
    await page.getByRole("button", { name: "Close", exact: true }).click();
    await page.getByRole("button", { name: "Review" }).click();
    await expect(page.getByText("Silahkan Mengisi Metode")).toBeVisible();
    await page.getByRole("button", { name: "Yes" }).click();
    await page.getByText("KODEUNIK").click();
    await page.getByText("BSI").click();
    await page.getByRole("button", { name: "Review" }).click();
    await expect(page.getByText("Copy Data")).toBeVisible();
  });

  test("should not showing popup double order", async ({ page }) => {
    await loginAsRole(page, "CRM");
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
    await page.getByText("Acu -").click();
    await page
      .locator("div")
      .filter({ hasText: /^Pilih Alamat$/ })
      .nth(1)
      .click();
    await expect(page.getByText("Loading...")).toBeHidden();
    await page
      .locator("div")
      .filter({
        hasText:
          /^Alamat 1-, Jawa Tengah, Kabupaten Magelang,Secang, Donorejo$/,
      })
      .nth(1)
      .click();
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
    // await page.locator("#react-select-15-input").fill("Gizidat");
    await page.getByText("Gizidat", { exact: true }).click();
    // await page.locator("#react-select-15-input").fill("Gizidat");
    // await page.locator("#react-select-15-input").press("Enter");
    await page.locator("#productQuantityInput").click();
    await page.locator("#productQuantityInput").fill("1");
    await page.getByRole("button", { name: "Add", exact: true }).click();
    await page
      .locator("div")
      .filter({ hasText: /^Pilih Courier$/ })
      .nth(1)
      .click();
    await page.getByText("DETHIX (Rp. 14,500)", { exact: true }).click();
    await page.getByRole("button", { name: "Review" }).click();
    await expect(page.getByText("Copy Data")).toBeVisible();
  });
});
