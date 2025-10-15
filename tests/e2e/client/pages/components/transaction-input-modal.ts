import { type Page, type Locator, expect } from "@playwright/test";

export class TransactionInputModal {
  readonly page: Page;

  readonly modalTitle: Locator;
  readonly templateTextArea: Locator;
  readonly submitButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalTitle = page.getByRole("heading", { name: "Web Order Input" });
    this.templateTextArea = page.locator("#weborderCreateExtractInput");
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
  }

  async selectWarehouse(warehouseName: string) {
    await this.page.getByText(warehouseName).click();
  }

  async fillOrderTemplate(templateText: string) {
    await this.templateTextArea.click();
    await this.templateTextArea.clear();
    await this.templateTextArea.fill(templateText);
  }

  async submitOrder() {
    await this.submitButton.click();
  }
}
