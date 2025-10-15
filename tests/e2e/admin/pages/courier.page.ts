import { type Locator, type Page, expect } from "@playwright/test";

export class CourierPage {
  readonly page: Page;
  readonly territoryInput: Locator;
  readonly productButton: Locator;
  readonly productInput: Locator;
  readonly quantityInput: Locator;
  readonly addModalButton: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.territoryInput = page
      .locator("#teritoryLokasiInput div")
      .filter({ hasText: "Cari kecamatan atau kelurahan" })
      .nth(1);
    this.productButton = page.getByRole("button", { name: "Add Product" });
    this.productInput = page
      .locator("div")
      .filter({ hasText: /^Pilih Product$/ })
      .nth(1);
    this.quantityInput = page.locator("#productQuantityInput");
    this.addModalButton = page.getByRole("button", {
      name: "Add",
      exact: true,
    });
    this.submitButton = page.getByRole("button", { name: "Submit" });
  }

  async clickWarehouseType(warehouseName: string) {
    const warehouseOption = this.page.getByText(warehouseName, { exact: true });
    await warehouseOption.click();
  }

  // async fillTerritory(territoryName: string, districtName: string) {
  //   await this.territoryInput.click();
  //   const searchInput = this.page.locator("#react-select-5-input");
  //   await searchInput.fill(territoryName);
  //   await this.page
  //     .getByText(`Search : ${territoryName}`, { exact: true })
  //     .click();
  //   await this.page.waitForTimeout(2000);
  //   await this.page
  //     .locator("div")
  //     .filter({ hasText: /^Search : Karangpucung$/ })
  //     .nth(1)
  //     .click();
  //   // await this.page
  //   // .getByText(`Search : ${territoryName}`, { exact: true })
  //   // .click();

  //   // await this.page.waitForTimeout(300);

  //   // await this.page
  //   // .locator("div")
  //   // .filter({ hasText: /^Search\s*:/ })
  //   // .first()
  //   // .click();

  //   await this.page
  //     .getByText(districtName, {
  //       exact: true,
  //     })
  //     .click();
  // }

  // async addProduct(productName: string, quantity: number) {
  //   await this.productButton.click();
  //   await this.productInput.click();
  //   await this.page.getByRole("option", { name: productName }).click();
  //   await this.quantityInput.fill(quantity.toString());
  //   await this.addModalButton.click();
  //   await expect(this.page.getByText(productName).first()).toBeVisible();
  // // }

  async submitForm() {
    await this.submitButton.click();
    await expect(this.page.getByText("Success").first()).toBeVisible({
      timeout: 30000,
    });
  }
  async fillTerritory(territory: string, fullSelectionText: string) {
    await this.territoryInput.click();
    await this.page.locator("#react-select-5-input").fill(territory);
    await this.page.getByText(`Search : ${territory}`, { exact: true }).click();
    await this.page
      .locator("div")
      .filter({ hasText: /^Search : Karangpucung$/ })
      .first()
      .click();
    await this.page.getByText(fullSelectionText).click();
  }

  async addProduct(productName: string, quantity: string) {
    await this.productButton.click();
    await this.page
      .locator("div")
      .filter({ hasText: /^Pilih Product$/ })
      .nth(2)
      .click();
    await this.page.getByText(productName, { exact: true }).click();
    await this.quantityInput.fill(quantity);
    await this.addModalButton.click();
  }
}
