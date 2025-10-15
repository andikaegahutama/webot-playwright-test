import { test, expect } from "@playwright/test";
import { loginAsRole } from "../../utils/auth.helper";

test.describe(() => {
  test.beforeEach("", async ({ page }) => {
    await loginAsRole(page, "CS");
  });
  test("should successfully uploading POD", async ({ page }) => {
    await page.goto("https://webot-dev.vitastore.id/v2/auth/login");
    await page.getByRole("textbox", { name: "Email" }).click();
    await page.locator("#auth_email").fill("cs.anggie@erdigma.id");
    await page.getByRole("textbox", { name: "Password" }).click();
    await page.locator("#auth_password").fill("5c1bb1cbbef1");
    await page.getByRole("button", { name: "Login" }).click();
    await page
      .locator("div")
      .filter({ hasText: /^Kendala$/ })
      .nth(1)
      .click();
    await page.locator(".mb-2\\.5").first().click();
    await page
      .locator("div")
      .filter({
        hasText:
          /^\+6282346675257 09:53 27\/03\/25DetailUpload PODWhatsapp Customer$/,
      })
      .locator("path")
      .click();
    await page.getByText("Upload POD").first().click();
    await page
      .locator("div")
      .filter({ hasText: /^Select\.\.\.$/ })
      .nth(1)
      .click();
    await page.locator("#react-select-5-input").fill("alamat tidak");
    await page
      .getByText("Alamat tidak lengkap atau salah", { exact: true })
      .click();
    await page
      .locator("label")
      .nth(3)
      .setInputFiles("tests/e2e/client/screenshots/pod.jpeg");
    await page
      .locator("div")
      .filter({ hasText: /^Images:$/ })
      .locator("div")
      .nth(2)
      .click();
    await page
      .locator("label")
      .nth(4)
      .setInputFiles("tests/e2e/client/screenshots/pod.jpeg");

    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByText("Berhasil Upload")).toBeVisible();
    await page.getByText("Bukti Sudah Diserahkan").click();
    await page.locator(".mb-2\\.5").first().click();
  });
});
