import { type Locator, type Page, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly eyeIcon: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly toastMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator("#auth_email");
    this.passwordInput = page.locator("#auth_password");
    this.eyeIcon = page.locator('button:has(svg[data-icon="eye"])');
    this.loginButton = page.locator("#auth_login");
    this.errorMessage = page.locator("text=Email tidak ditemukan!");
    this.toastMessage = page.locator(".Toastify");
  }

  async navigateTo() {
    await this.page.goto("v2/auth/login");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
