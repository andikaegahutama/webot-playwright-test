import { test, expect } from "@playwright/test";
import { HomePage } from "../../../pages/home.page";
import { TransactionInputModal } from "../../../pages/components/transaction-input-modal";
import { TransactionFormPage } from "../../../pages/transaction-form.page";
import { loginAsRole } from "../../../utils/auth.helper";

const createTemplate = (discount: number) => `Nama: Test Diskon
Nama: Acuci
Whatapp: 625456781291

Kecamatan: secang
Kelurahan: donorejo
Kode Pos: 56595
RT: 3
RW: 4
Alamat: Jl. Poros KM.11 dsn. Pelangi Dua

Pesanan: 1 Gizidat
Jenis Pembayaran: COD
Potongan Ongkir: ${discount}
Biaya Admin: 1000

    
Advertiser: DODO
Platform Adv: Snack Video
Platform Crm: Tiktok
TIM: PGM EDX - Eyebost
Tim Shift: Vitasma A
Notes: PROMO KILAT|WAJI 1|105000 ; DIPSIPY BELI 2 gratis 1`;

test.describe("Transaction Validation - Pricing Rules (CS Role)", () => {
  let homePage: HomePage;
  let transactionInputModal: TransactionInputModal;
  let transactionFormPage: TransactionFormPage;

  test.beforeEach(async ({ page }) => {
    await loginAsRole(page, "CS");
    homePage = new HomePage(page);
    transactionInputModal = new TransactionInputModal(page);
    transactionFormPage = new TransactionFormPage(page);
  });

  test("should show popup if discount exceeds 50% for Ninja (CS)", async ({
    page,
  }) => {
    await homePage.navbar.clickCreateButton();
    await transactionInputModal.selectWarehouse("Ethix EDM");
    await transactionInputModal.fillOrderTemplate(createTemplate(42000));
    await transactionInputModal.submitOrder();

    await transactionFormPage.selectWarehouse("EDN SURABAYA");
    await transactionFormPage.selectCourier(/Ninja Reguler/);

    await expect(page.getByText("Shipper ini melebihi kriteria")).toBeVisible();
  });

  test("should show notification if discount exceeds 100k", async ({
    page,
  }) => {
    await homePage.navbar.clickCreateButton();
    await transactionInputModal.selectWarehouse("Ethix EDM");
    await transactionInputModal.fillOrderTemplate(createTemplate(1000));
    await transactionInputModal.submitOrder();

    await transactionFormPage.selectWarehouse("EDN SURABAYA");
    await transactionFormPage.selectCourier(/Ninja Reguler/);

    await page.locator("#productPotonganOngkirInput").fill("100002");

    await expect(page.getByText("Tidak Bisa mengisi shipping")).toBeVisible();
  });
});
