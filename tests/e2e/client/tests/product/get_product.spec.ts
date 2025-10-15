import { test, expect } from "@playwright/test";
import { loginAsRole } from "../../utils/auth.helper";
import { HomePage } from "../../pages/home.page";
import { ProductPage } from "../../pages/product.page";

test.describe("Product Search Test", () => {
  const warehouseProducts = [
    { warehouseName: "Ethix EDM", productSearch: /Nutriflakes/ },
    { warehouseName: "Ethix EDX", productSearch: /Vitameal/ },
    { warehouseName: "Shipper", productSearch: /Eyebost/ },
  ];

  test.beforeEach(async ({ page }) => {
    await loginAsRole(page, "CS");
  });

  for (const { warehouseName, productSearch } of warehouseProducts) {
    test(`should search '${productSearch}' in '${warehouseName}'`, async ({
      page,
    }) => {
      const homePage = new HomePage(page);
      const productPage = new ProductPage(page);

      await homePage.clickProductButton();
      await productPage.clickTabWarehouse(warehouseName);
      await productPage.searchProduct(productSearch);

      await expect(page.getByText(productSearch).first()).toBeVisible({
        timeout: 10000,
      });
    });
  }
});
