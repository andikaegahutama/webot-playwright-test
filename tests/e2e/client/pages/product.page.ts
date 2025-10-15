import { expect, type Locator, type Page } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly tabWarehouse: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tabWarehouse = page.getByText("Ethix EDMEthix EDXShipper");
    this.searchInput = page.getByRole("textbox", { name: "Product" });
  }

  async clickTabWarehouse(warehouseName: string) {
    await this.page.getByText(warehouseName).click();
  }

  async searchProduct(productName: RegExp) {
    await this.searchInput.fill(productName.source);
  }
}
