import { test, expect } from "@playwright/test";
import { HomePage } from "../../../pages/home.page";
import { TransactionInputModal } from "../../../pages/components/transaction-input-modal";
import { TransactionFormPage } from "../../../pages/transaction-form.page";
import { mockApi } from "../../../utils/mocks.helper";
import { loginAsRole } from "../../../utils/auth.helper";

test.describe("Transaction Validation - Customer Checks", () => {
  let homePage: HomePage;
  let transactionInputModal: TransactionInputModal;
  let transactionFormPage: TransactionFormPage;

  test.beforeEach(async ({ page }) => {
    await loginAsRole(page, "CS");
    homePage = new HomePage(page);
    transactionInputModal = new TransactionInputModal(page);
    transactionFormPage = new TransactionFormPage(page);

    await homePage.navbar.clickCreateButton();
    await expect(transactionInputModal.modalTitle).toBeVisible();
    await transactionInputModal.selectWarehouse("Ethix EDM");
  });

  test("should show popup if customer is already registered", async ({
    page,
  }) => {
    const returnerPhone = "6283896594214";
    const template = `Nama: Customer Retur
Whatapp: ${returnerPhone}
Kecamatan: secang
Kelurahan: donorejo
Pesanan: 1 Gizidat`;

    await mockApi(page, `/customer/${returnerPhone}/count/return`, {
      count: 3,
      distinct_courier: 2,
      last_3_months: true,
    });

    await transactionInputModal.fillOrderTemplate(template);
    await transactionInputModal.submitOrder();

    const popupText =
      "Nomor 6283896594214 telah terdaftar di database, silahkan lanjutBatalLanjutkan";
    await expect(page.getByText(popupText)).toBeVisible();
  });

  test("should show COD ban popup if customer has > 2 returns", async ({
    page,
  }) => {
    const returnerPhone = "083896594214";
    const template = `Nama: Andika
Whatapp: 6283896594214

Provinsi: Jawa Tengah
Kabupaten: Cilacap
Kecamatan: Karangpucung
Kelurahan: Karangpucung
Kode Pos: 53255
RT: 1
RW: 2
Alamat: Jl. BLABLABLABLEBLEBLE

Pesanan: 2 Eyebost
Jenis Pembayaran: COD
Potongan Ongkir: 5000
Biaya Admin: 1000

Advertiser: Adv.Abdul
CS: Cs Dien
Platform Adv: Meta
TIM: PGM Doni - Eyebost
Tim Shift: Shift A
Notes: JANGAN SAMPAI RETUR
`;

    await mockApi(page, `/customer/${returnerPhone}/count/return`, {
      count: 3,
      distinct_courier: 2,
      last_3_months: true,
    });

    await transactionInputModal.fillOrderTemplate(template);
    await transactionInputModal.submitOrder();

    const popupText =
      /Nomor 6283896594214 memiliki Retur 5 di 2 kurir yang berbeda dalam 3 bulan terakhir, dilarang memakai COD/;
    await expect(page.getByText(popupText)).toBeVisible();

    await page.getByRole("button", { name: "Lanjutkan" }).click();

    const popupTextReturn =
      /Nomor 6283896594214 memiliki Retur lebih dari 2 kali berurutan, dilarang memakai cod/;
    await expect(page.getByText(popupTextReturn)).toBeVisible();

    await page.getByRole("button", { name: "Lanjutkan" }).click();
    await expect(page.getByText("COD")).toBeHidden();
  });
});
