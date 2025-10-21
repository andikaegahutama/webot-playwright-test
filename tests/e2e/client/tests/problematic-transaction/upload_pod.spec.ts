import { test, expect } from "@playwright/test";
import { loginAsRole } from "../../utils/auth.helper";
import { HomePage } from "../../pages/home.page";
import { KendalaPage } from "../../pages/kendala.page";

test.describe(() => {
  test.beforeEach("", async ({ page }) => {
    await loginAsRole(page, "CS");
  });
  test("should successfully uploading POD", async ({ page }) => {
    const homePage = new HomePage(page);
    const kendalaPage = new KendalaPage(page);

    await homePage.navbar.clickKendalaButton();
    await kendalaPage.showFirstProblematicCardBox();
    await kendalaPage.clickThreeDotProblematic();
    await kendalaPage.clickUploadPod();
    await kendalaPage.fillProblematicReason("Alamat tidak lengkap atau salah");
    await kendalaPage.fillUploadImage("tests/e2e/client/screenshots/pod.jpeg");
    await kendalaPage.clickSubmitButton();
    await kendalaPage.showToastMessage("Berhasil Upload");
    await kendalaPage.showProblematicStatus("Bukti Sudah Diserahkan");
  });
});
