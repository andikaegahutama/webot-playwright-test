import { type Locator, type Page } from "@playwright/test";

export class ProfilePage {
  readonly page: Page;
  readonly logoutButton: Locator;
  readonly logoutPopUp: Locator;
  readonly logoutYesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.getByRole("button", { name: "Logout" });
    this.logoutPopUp = page.getByText("Apakah Anda Ingin Keluar?");
    this.logoutYesButton = page.getByRole("button", { name: "Yes" });
  }

  async clickLogoutButton() {
    this.logoutButton.click();
    this.logoutYesButton.click();
  }
}
