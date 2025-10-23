import { test, expect } from "@playwright/test";
import { HomePage } from "../../../pages/home.page";
import { TransactionInputModal } from "../../../pages/components/transaction-input-modal";
import { TransactionFormPage } from "../../../pages/transaction-form.page";
import { loginAsRole } from "../../../utils/auth.helper";

function baseTemplate(
  quantity: string,
  product: string,
  advPlatform: string,
  kecamatan: string,
  kelurahan: string,
  kodePos: string
) {
  return `Nama: Acucu
Whatapp: 6281293182912

Kecamatan: ${kecamatan}
Kelurahan: ${kelurahan}
Kode Pos: ${kodePos}
RT: 3
RW: 4
Alamat: Jl. Poros KM.11 dsn. Pelangi Dua

Pesanan: ${quantity} ${product}
Jenis Pembayaran: COD
Potongan Ongkir: 1000
Biaya Admin: 1000

    
Advertiser: DODO
Platform Adv: ${advPlatform}
Platform Crm: Tiktok
TIM: PGM EDX - Eyebost
Tim Shift: Vitasma A
Notes: PROMO KILAT|WAJI 1|105000 ; DIPSIPY BELI 2 gratis 1`;
}

test.describe("Transaction Validation - COD Rules (CS Role)", () => {
  let homePage: HomePage;
  let transactionInputModal: TransactionInputModal;
  let transactionFormPage: TransactionFormPage;

  test.beforeEach(async ({ page }) => {
    await loginAsRole(page, "CS");
    homePage = new HomePage(page);
    transactionInputModal = new TransactionInputModal(page);
    transactionFormPage = new TransactionFormPage(page);
  });

  test("should show popup if CS total exceeds 500k COD", async ({ page }) => {
    await homePage.navbar.clickCreateButton();
    await transactionInputModal.selectWarehouse("Ethix EDM");
    await transactionInputModal.fillOrderTemplate(
      baseTemplate("13", "Nutriflakes", "Meta", "secang", "donorejo", "56595")
    );
    await transactionInputModal.submitOrder();
    await transactionFormPage.selectWarehouse("EDN SURABAYA");
    await page.waitForTimeout(3000);
    await transactionFormPage.selectCourier("DETHIX (Rp. 72,500)");
    await transactionFormPage.clickReviewButton();

    await expect(
      page.getByText(
        "COD Tidak Boleh Lebih Dari 500.000, Silahkan Ganti Metode Pembayaran"
      )
    ).toBeVisible();

    await page.getByText("Yes").click();
    await page.getByText("KODEUNIK").click();
    await page.getByText("BSI").click();
    await transactionFormPage.clickReviewButton();
    await expect(page.getByText("Copy Data")).toBeVisible();
  });

  // @andikaegahutama sudah di enable di BE
  // test("should show popup if CS tries to use JNE COD", async ({ page }) => {
  //   await homePage.navbar.clickCreateButton();
  //   await transactionInputModal.selectWarehouse("Ethix EDM");
  //   await transactionInputModal.fillOrderTemplate(
  //     baseTemplate("1", "Nutriflakes", "Meta", "secang", "donorejo", "56595")
  //   );
  //   await transactionInputModal.submitOrder();
  //   await transactionFormPage.selectWarehouse("EDN SURABAYA");
  //   await page.waitForTimeout(3000);
  //   await transactionFormPage.selectCourier("JNE REG Bebas (Rp. 16,000)");
  //   await transactionFormPage.clickReviewButton();
  //   await page.waitForTimeout(3000);
  //   await transactionFormPage.clickPublishButton();

  //   await expect(page.getByText("JNE COD hanya untuk CRM")).toBeVisible();
  // });

  test("should show notification if courier has no COD coverage", async ({
    page,
  }) => {
    await homePage.navbar.clickCreateButton();
    await transactionInputModal.selectWarehouse("Ethix EDX");
    await transactionInputModal.fillOrderTemplate(
      baseTemplate(
        "1",
        "Vitameal",
        "CRM",
        "Pulau-Pulau Batu",
        "Simaluaya",
        "22881"
      )
    );
    await transactionInputModal.submitOrder();
    await transactionFormPage.selectWarehouse("Gudang Ethix Surabaya");
    await page.waitForTimeout(3000);
    await transactionFormPage.selectCourier("JNE - REG (Rp. 63,000)");
    await transactionFormPage.clickReviewButton();
    await expect(
      page.getByText(
        "Payment Method COD tidak bisa digunakan untuk Shipper ini, Silahkan Mengunakan Payment Method Lain"
      )
    ).toBeVisible();
    await expect(page.getByText("Dilarang Mengunakan COD,")).toBeVisible();

    await page.getByRole("button", { name: "Yes" }).click();
    await page.getByText("KODEUNIK").click();
    await page.getByText("BSI").click();
    await transactionFormPage.clickReviewButton();
    await expect(page.getByText("Copy Data")).toBeVisible();
  });
});

test.describe("Transaction Validation - COD Rules (CRM Role)", () => {
  let homePage: HomePage;
  let transactionInputModal: TransactionInputModal;
  let transactionFormPage: TransactionFormPage;

  test.beforeEach(async ({ page }) => {
    await loginAsRole(page, "CRM");
    homePage = new HomePage(page);
    transactionInputModal = new TransactionInputModal(page);
    transactionFormPage = new TransactionFormPage(page);

    await homePage.navbar.clickCreateButton();
    await transactionInputModal.selectWarehouse("Ethix EDM");
    await transactionInputModal.fillOrderTemplate(
      baseTemplate("13", "Nutriflakes", "Meta", "secang", "donorejo", "56595")
    );
    await transactionInputModal.submitOrder();
  });

  test("should show popup if CRM total exceeds 1m COD", async ({ page }) => {
    await transactionFormPage.selectWarehouse("EDN SURABAYA");
    await page.waitForTimeout(3000);
    await transactionFormPage.selectCourier("DETHIX (Rp. 72,500)");

    await transactionFormPage.clickReviewButton();

    await expect(
      page.getByText(
        "COD Tidak Boleh Lebih Dari 1.000.000, Silahkan Ganti Metode Pembayaran"
      )
    ).toBeVisible();

    await page.getByText("Yes").click();
    await page.getByText("KODEUNIK").click();
    await page.getByText("BSI").click();
    await transactionFormPage.clickReviewButton();
    await expect(page.getByText("Copy Data")).toBeVisible();
  });
});
