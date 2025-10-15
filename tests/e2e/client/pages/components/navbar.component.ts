import { type Locator, type Page } from "@playwright/test";

export class NavbarComponent {
  readonly page: Page;
  readonly home: Locator;
  readonly transaction: Locator;
  readonly createTransaction: Locator;
  readonly kendala: Locator;
  readonly profile: Locator;

  constructor(page: Page) {
    this.page = page;
    this.home = page.locator('small:has-text("Home")');
    this.transaction = page.locator('small:has-text("Transaction")');
    this.createTransaction = page
      .locator("div")
      .filter({ hasText: /^HomeTransaksiKendalaProfile$/ })
      .getByRole("img")
      .nth(2);
    this.kendala = page.locator('small:has-text("Kendala")');
    this.profile = page.locator('small:has-text("Profile")');
  }

  async clickHomeButton() {
    await this.home.click();
  }
  async clickTransactionButton() {
    await this.transaction.click();
  }
  async clickCreateButton() {
    await this.createTransaction.click();
  }
  async clickKendalaButton() {
    await this.kendala.click();
  }
  async clickProfileButton() {
    await this.profile.click();
  }
}
