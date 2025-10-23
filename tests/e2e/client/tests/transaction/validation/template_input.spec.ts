import { test, expect } from "@playwright/test";
import { HomePage } from "../../../pages/home.page";
import { TransactionInputModal } from "../../../pages/components/transaction-input-modal";
import { loginAsRole } from "../../../utils/auth.helper";

const validationTestCases = [
  {
    testName: "should show error if Name is empty",
    template: `Nama: 
Whatapp: 081234567890
Pesanan: 1 Nutriflakes`,
    expectedMessage: "Silahkan Mengisi Form Data Input",
  },
  {
    testName: "should show error if Whatsapp is empty",
    template: `Nama: Test User
Whatapp: 
Pesanan: 1 Nutriflakes`,
    expectedMessage: "Silahkan Mengisi Form Data Input",
  },
  {
    testName: "should show error if Whatsapp is less than 8 digits",
    template: `Nama: Test User
Whatapp: 08123
Pesanan: 1 Nutriflakes`,
    expectedMessage: "Silahkan Menginput Whatsapp lebih dari 8 digit",
  },
  {
    testName: "should show error if Whatsapp contains letters",
    template: `Nama: Test User
Whatapp: 08123ABCDE
Pesanan: 1 Nutriflakes`,
    expectedMessage: "Silahkan Menginput Whatsapp dengan nomor",
  },
  {
    testName: "should show error if Order is empty",
    template: `Nama: Test User
Whatapp: 081234567890
Pesanan: `,
    expectedMessage:
      "Pastikan Pesanan dengan format 'Pesanan: quantity namaProduk'",
  },
  {
    testName: "should show error if Whatsapp is banned",
    template: `Nama: Test User
Whatapp: 083895824956
Pesanan: 1 Nutriflakes`,
    expectedMessage: "Nomor 083895824956 telah dibanned 🚫",
  },
];

test.describe("Transaction Validation - Template Input Modal", () => {
  let homePage: HomePage;
  let transactionInputModal: TransactionInputModal;

  test.beforeEach(async ({ page }) => {
    await loginAsRole(page, "CS");
    homePage = new HomePage(page);
    transactionInputModal = new TransactionInputModal(page);

    await homePage.navbar.clickCreateButton();

    await expect(transactionInputModal.modalTitle).toBeVisible();

    await transactionInputModal.selectWarehouse("Ethix EDM");
  });

  for (const testCase of validationTestCases) {
    test(testCase.testName, async ({ page }) => {
      await transactionInputModal.fillOrderTemplate(testCase.template);

      await transactionInputModal.submitOrder();

      await expect(page.getByText(testCase.expectedMessage)).toBeVisible();
    });
  }
});
