import { test, expect } from "@playwright/test";
import { loginAsRole } from "../../utils/auth.helper";
import { dataHelper } from "../../utils/randomizer.helper";
import { products } from "../../data/products.data";

test.describe("E2E - Repeat Order (Refactored from Codegen)", () => {
  test.beforeEach("", async ({ page }) => {
    await loginAsRole(page, "HO_CRM");
  });

  const randomProduct = dataHelper.randomElement(products.productEDM);
  const randomProductName = randomProduct.name!;

  test("test", async ({ page }) => {
    await page
      .locator("div")
      .filter({ hasText: /^Transaksi$/ })
      .nth(1)
      .click();
    await page.locator(".absolute > label").click();
    await page
      .getByRole("button", { name: "d3u-repeat-icon-1 d3u-repeat-" })
      .click();
    await expect(page.getByText("‌")).toBeHidden();
    await page.locator(".css-1s2u09g-control").click();
    await page.getByText("Imas Yahya (Beca) -").click();
    await page
      .locator("div")
      .filter({ hasText: /^Pilih Alamat$/ })
      .nth(1)
      .click();
    await page.getByText("jalan a no 2 , Jawa Tengah,").click();
    await page
      .locator("div")
      .filter({ hasText: /^Pilih Tim$/ })
      .nth(1)
      .click();
    await page.getByText("Kulakin", { exact: true }).click();
    await page
      .locator("div")
      .filter({ hasText: /^Pilih Shift$/ })
      .nth(2)
      .click();
    await page.getByText("-", { exact: true }).click();
    await page
      .locator("div")
      .filter({ hasText: /^Pilih Advertiser$/ })
      .nth(1)
      .click();
    await page.getByText("Adv.Gamma", { exact: true }).click();
    await page
      .locator("div")
      .filter({ hasText: /^Pilih Platform Adv$/ })
      .nth(1)
      .click();
    await page.getByText("CRM", { exact: true }).click();
    await page
      .locator("div")
      .filter({ hasText: /^Whatsapp$/ })
      .nth(1)
      .click();
    await page.getByText("Cekat Whatsapp", { exact: true }).click();
    await page.getByText("COD").click();
    await page
      .locator("div")
      .filter({ hasText: /^Pilih Warehouse$/ })
      .nth(1)
      .click();
    await page.getByText("EDN SURABAYA", { exact: true }).click();
    await page.getByRole("button", { name: "Add Product" }).click();
    await page
      .locator("div")
      .filter({ hasText: /^Pilih Product$/ })
      .nth(1)
      .click();
    await expect(
      page.locator(".animate-pulse > .css-1d8n9bt > .css-ackcql")
    ).toBeHidden();
    await page.getByText(randomProductName, { exact: true }).click();
    await page
      .locator("#ProductModalEditResultPortalId")
      .getByRole("img")
      .nth(1)
      .click();
    await expect(page.locator("#productTotalPriceInput")).toBeEditable();
    await page.getByRole("button", { name: "Add", exact: true }).click();
    await page
      .locator("div")
      .filter({ hasText: /^Pilih Courier$/ })
      .nth(1)
      .click();
    await page.getByText("DETHIX (Rp. 17,500)", { exact: true }).click();
    await page.getByRole("button", { name: "Review" }).click();
    await expect(
      page
        .locator("#TransactionFooterButtonPortalId")
        .getByText("Loading...")
        .first()
    ).toBeHidden();
    await page.getByText("Copy Data").click();
    await page.getByRole("button", { name: "Publish" }).click();

    await expect(
      page.locator("body").filter({ hasText: "ReviewCustomerNameImas Yahya" })
    ).toBeVisible();
    await expect(
      page
        .locator(
          ".inline-flex.items-center.gap-1.text-\\[10px\\].text-main-status-packing"
        )
        .first()
    ).toBeVisible();
    await expect(page.getByText(randomProductName).first()).toBeVisible();
    await expect(page.getByText("Data berhasil di input")).toBeVisible();
  });
});
