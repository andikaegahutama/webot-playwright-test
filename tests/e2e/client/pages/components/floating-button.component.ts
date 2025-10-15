import { type Locator, type Page } from "@playwright/test";

export class FloatingButton {
  readonly page: Page;
  readonly floatingButton: Locator;
  readonly repeatOrderButton: Locator;
  readonly customerInput: Locator;
  readonly addressInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.floatingButton = page.getByRole("button", { name: "Repeat Order" });
  }
}
