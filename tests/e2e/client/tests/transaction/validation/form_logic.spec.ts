import { test, expect } from "@playwright/test";
import { HomePage } from "../../../pages/home.page";
import { TransactionInputModal } from "../../../pages/components/transaction-input-modal";
import { TransactionFormPage } from "../../../pages/transaction-form.page";
import { mockApi } from "../../../utils/mocks.helper";
import { loginAsRole } from "../../../utils/auth.helper";

const baseTemplate = `Nama: Acu Marachu
Whatapp: 658386018912

Kecamatan: secang
Kelurahan: donorejo
Kode Pos: 56595
RT: 3
RW: 4
Alamat: Jl. Poros KM.11 dsn. Pelangi Dua

Pesanan: 1 Gizidat
Jenis Pembayaran: COD
Potongan Ongkir: 11.000
Biaya Admin: 1000

    
Advertiser: DODO
Platform Adv: Snack Video
Platform Crm: Tiktok
TIM: PGM EDX - Eyebost
Tim Shift: Vitasma A
Notes: PROMO KILAT|WAJI 1|105000 ; DIPSIPY BELI 2 gratis 1`;

test.describe("Transaction Validation - Form UI Logic", () => {
  let homePage: HomePage;
  let transactionInputModal: TransactionInputModal;
  let transactionFormPage: TransactionFormPage;

  test.beforeEach(async ({ page }) => {
    await loginAsRole(page, "CS");
    homePage = new HomePage(page);
    transactionInputModal = new TransactionInputModal(page);
    transactionFormPage = new TransactionFormPage(page);

    await page.goto("/home");
    await homePage.navbar.clickCreateButton();
    await transactionInputModal.selectWarehouse("Ethix EDM");
    await transactionInputModal.fillOrderTemplate(baseTemplate);
    await transactionInputModal.submitOrder();
  });

  test("should show 'Toko' input when Adv Platform is Marketplace", async ({
    page,
  }) => {
    await mockApi(page, "**/store?size=100", {
      data: [{ id: 1, name: "Toko Shopee" }],
    });

    await page
      .locator("div")
      .filter({ hasText: /^Snack Video$/ })
      .nth(1)
      .click();
    await page.getByText("Marketplace").click();

    await expect(page.getByText("Toko")).toBeVisible();
  });

  test("should show notification if invoice date is in the past", async ({
    page,
  }) => {
    const transactionFormPage = new TransactionFormPage(page);
    const invoiceDateInput = page.locator("#invoiceDateInput");

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const pastDate = yesterday.toISOString().split("T")[0];

    await invoiceDateInput.fill(pastDate);
    await page.locator("body").click();

    await transactionFormPage.selectWarehouse("EDN SURABAYA");
    await page.waitForTimeout(3000);
    await transactionFormPage.selectCourier("DETHIX (Rp. 14,500)");
    await transactionFormPage.clickReviewButton();
    await expect(page.getByText("Copy Data")).toBeVisible();
    await transactionFormPage.clickPublishButton();

    await expect(
      page.getByText("Silahkan Memilih Invoice Date Di Atas Hari Ini")
    ).toBeVisible();
  });
});
