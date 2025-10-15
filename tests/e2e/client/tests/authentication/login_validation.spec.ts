import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";

test.describe("Login Form Validation", () => {
  const negativeLoginCases = [
    {
      caseName: "Password Salah",
      email: "cs.dien@erdigma.id",
      password: "PasswordSuperSalah123",
      expectedMessage: "Password anda salah!",
    },
    {
      caseName: "Email salah",
      email: "email.valid@contoh.com",
      password: "PasswordSuperSalah123",
      expectedMessage: "Email tidak ditemukan!",
    },
  ];

  for (const testCase of negativeLoginCases) {
    test(`Validation: ${testCase.caseName}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigateTo();

      await loginPage.emailInput.fill(testCase.email);
      await loginPage.passwordInput.fill(testCase.password);

      await loginPage.loginButton.click();

      const expectedError = page.getByText(testCase.expectedMessage);
      await expect(expectedError).toBeVisible();
    });
  }
});
