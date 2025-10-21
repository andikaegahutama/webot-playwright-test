import { type Locator, type Page, expect } from "@playwright/test";

export class TransactionFormPage {
  readonly page: Page;
  readonly toastMessage: Locator;
  readonly modalValidation: Locator;
  readonly yesModalButton: Locator;
  readonly nextModalButton: Locator;
  readonly warehouseInput: Locator;
  readonly courierInput: Locator;
  readonly reviewButton: Locator;
  readonly publishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toastMessage = page.locator(".Toastify");
    this.modalValidation = page.locator("div");
    this.yesModalButton = page.getByRole("button", { name: "Yes" });
    this.nextModalButton = page.getByRole("button", { name: "Lanjutkan" });
    this.warehouseInput = page.locator(
      "#productWarehouseInput > .css-1s2u09g-control > .css-1d8n9bt > .css-ackcql"
    );
    this.courierInput = page.locator(
      "#productCourierInput > .css-1s2u09g-control > .css-1d8n9bt > .css-ackcql"
    );
    this.reviewButton = page.getByRole("button", { name: "Review" });
    this.publishButton = page.getByRole("button", { name: "Publish" });
  }

  async showToastMessage(message: RegExp | string) {
    await expect(this.toastMessage.filter({ hasText: message })).toBeVisible({
      timeout: 10000,
    });
  }

  async showModalPopup(modalText: RegExp | string) {
    const modal = this.page.locator("div").filter({ hasText: modalText });

    await expect(modal).toBeVisible({ timeout: 10000 });

    const nextButtonVisible = await this.nextModalButton.isVisible();
    const yesButtonVisible = await this.yesModalButton.isVisible();

    if (nextButtonVisible) {
      await this.nextModalButton.click();
    } else if (yesButtonVisible) {
      await this.yesModalButton.click();
    } else {
      throw new Error(
        "Tidak ditemukan tombol 'Lanjutkan' atau 'Yes' di modal."
      );
    }
  }

  async selectWarehouse(warehouseName: string) {
    await this.warehouseInput.click();
    await this.page.getByText(warehouseName, { exact: true }).click();
  }

  async selectCourier(courierName: RegExp) {
    await this.courierInput.click();
    await this.page.getByText(courierName, { exact: true }).click();
  }

  async clickReviewButton() {
    await this.reviewButton.click();
  }

  async clickPublishButton() {
    await this.publishButton.click();
  }
}
