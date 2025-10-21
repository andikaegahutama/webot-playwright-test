import { expect, Locator, type Page } from "@playwright/test";
export class KendalaPage {
  readonly page: Page;
  readonly firstCardProblematic: Locator;
  readonly threeDotProblematic: Locator;
  readonly uploadPod: Locator;
  readonly inputReason: Locator;
  readonly optionReason: Locator;
  readonly firstInputImage: Locator;
  readonly addImage: Locator;
  readonly secondInputImage: Locator;
  readonly submitButton: Locator;
  readonly toastMessage: Locator;
  readonly problematicStatus: Page;
  readonly tabOverSla: Locator;
  readonly overSlaStatusBadge: Locator;
  readonly overSlaReason: Page;

  constructor(page: Page) {
    this.page = page;
    this.firstCardProblematic = page.locator(".mb-2\\.5").first();
    this.threeDotProblematic = page
      .locator("div")
      .filter({
        hasText:
          /^\+6282346675257 09:53 27\/03\/25DetailUpload PODWhatsapp Customer$/,
      })
      .locator("path");
    this.uploadPod = page.getByText("Upload POD").first();
    this.inputReason = page
      .locator("div")
      .filter({ hasText: /^Select\.\.\.$/ })
      .nth(1);
    this.optionReason = page.locator("#react-select-5-input");
    this.firstInputImage = page.locator("label").nth(3);
    this.addImage = page
      .locator("div")
      .filter({ hasText: /^Images:$/ })
      .locator("div")
      .nth(2);
    this.secondInputImage = page.locator("label").nth(4);
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.toastMessage = page.locator(".Toastify");
    this.problematicStatus = page;

    this.tabOverSla = page.getByText("Over Sla");
    this.overSlaStatusBadge = page
      .locator(
        ".inline-flex.items-center.gap-1.text-\\[10px\\].text-main-status-on-delivery"
      )
      .first();
    this.overSlaReason = page;
  }

  async showFirstProblematicCardBox() {
    await expect(this.firstCardProblematic).toBeVisible();
  }

  async clickThreeDotProblematic() {
    await this.threeDotProblematic.click();
  }

  async clickUploadPod() {
    await this.uploadPod.click();
  }

  async fillProblematicReason(reasonName: string) {
    await this.inputReason.click();
    await this.page.getByText(`${reasonName}`, { exact: true }).click();
  }

  async fillUploadImage(imagePath: string) {
    await this.firstInputImage.setInputFiles(imagePath);
    await this.addImage.click();
    await this.secondInputImage.setInputFiles(imagePath);
  }

  async clickSubmitButton() {
    await this.submitButton.click();
  }

  async showToastMessage(message: RegExp | string) {
    await expect(this.toastMessage.getByText(message)).toBeVisible({
      timeout: 10000,
    });
  }

  async showProblematicStatus(statusName: string) {
    await expect(this.problematicStatus.getByText(statusName)).toBeVisible();
  }

  async clickTabOverSla() {
    await this.tabOverSla.click();
  }

  async showOverSlaStatusBadge() {
    await expect(this.overSlaStatusBadge).toBeVisible();
  }

  async showOverSlaReason(reasonName: string | RegExp) {
    await expect(
      this.overSlaReason.getByText(reasonName).first()
    ).toBeVisible();
  }
}
