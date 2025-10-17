import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/home.page";
import { TransactionInputModal } from "../../../admin/pages/components/transaction-input-modal";
import { TransactionFormPage } from "../../../admin/pages/transaction-form.page";
import { mockApi } from "../../utils/mocks.helper";
import { loginAsRole } from "../../utils/auth.helper";
import { templates } from "../../data/transaction-templates.data";
import { warehouse } from "../../data/warehouses.data";

test.describe("E2E - Create Transaction", () => {
  for (const transactionTemplate of templates) {
    test.describe(`Payment Method: COD Warehouse: ${transactionTemplate.alias}`, () => {
      test.beforeEach(async ({ page }) => {
        await loginAsRole(page, "CS");
      });

      test(`should create transaction for ${transactionTemplate.alias}`, async ({
        page,
      }) => {
        const homePage = new HomePage(page);
        const transactionInputModal = new TransactionInputModal(page);
        const transactionFormPage = new TransactionFormPage(page);

        await homePage.navbar.clickCreateButton();
        await transactionInputModal.selectWarehouse(
          transactionTemplate.tabName
        );
        await transactionInputModal.fillOrderTemplate(
          transactionTemplate.template
        );
        await transactionInputModal.submitOrder();

        await expect(transactionFormPage.warehouseInput).toBeVisible({
          timeout: 20000,
        });

        const selectedWarehouse = warehouse.find(
          (w) => w.warehouseType === transactionTemplate.alias
        );
        if (!selectedWarehouse) {
          throw new Error(
            `Warehouse not found for alias: ${transactionTemplate.alias}`
          );
        }

        // =================================================================
        // PERBAIKAN DI SINI: Mock API kurir SEBELUM memilih warehouse
        // Kita siapkan jawabannya dulu...
        // =================================================================
        await mockApi(page, "**/shipper/courier", {
          data: [{ name: "Ninja Mocked", price: 15000, type: "REG" }],
        });

        // ...baru kita lakukan aksi yang memicu pertanyaan (API call)
        await transactionFormPage.selectWarehouse(selectedWarehouse.name);

        // Sekarang kita bisa memilih kurir dari data mock kita
        await transactionFormPage.selectCourier(/Ninja Mocked/);
        await transactionFormPage.clickReviewButton();

        await expect(transactionFormPage.publishButton).toBeEnabled({
          timeout: 10000,
        });
        await transactionFormPage.clickPublishButton();

        await expect(page.getByText("Data berhasil di input")).toBeVisible();
        await expect(page.getByText("List Transaksi")).toBeVisible();
        await expect(
          page
            .locator(
              ".inline-flex.items-center.gap-1.text-\\[10px\\].text-main-status-packing"
            )
            .first()
        ).toBeVisible();
      });
    });
  }

  // Bagian TF-UNIQUECODE juga kita perbaiki urutannya untuk konsistensi
  for (const transactionTemplate of templates) {
    test.describe(`Payment Method: TF-UNIQUECODE Warehouse: ${transactionTemplate.alias}`, () => {
      test.beforeEach(async ({ page }) => {
        await loginAsRole(page, "CS");
      });

      test(`should create transaction for ${transactionTemplate.alias}`, async ({
        page,
      }) => {
        const homePage = new HomePage(page);
        const transactionInputModal = new TransactionInputModal(page);
        const transactionFormPage = new TransactionFormPage(page);

        await homePage.navbar.clickCreateButton();
        await transactionInputModal.selectWarehouse(
          transactionTemplate.tabName
        );
        await transactionInputModal.fillOrderTemplate(
          transactionTemplate.template
        );
        await transactionInputModal.submitOrder();

        await expect(transactionFormPage.warehouseInput).toBeVisible({
          timeout: 20000,
        });

        await page.getByText("KODEUNIK").click();
        await page.getByText("BSI").click();

        const selectedWarehouse = warehouse.find(
          (w) => w.warehouseType === transactionTemplate.alias
        );
        if (!selectedWarehouse) {
          throw new Error(
            `Warehouse not found for alias: ${transactionTemplate.alias}`
          );
        }

        // PERBAIKAN URUTAN DI SINI JUGA
        await mockApi(page, "**/shipper/courier", {
          data: [{ name: "Ninja Mocked", price: 15000, type: "REG" }],
        });
        await transactionFormPage.selectWarehouse(selectedWarehouse.name);

        await transactionFormPage.selectCourier(/Ninja Mocked/);
        await transactionFormPage.clickReviewButton();

        await expect(page.getByText("Copy Data")).toBeVisible();
        await transactionFormPage.clickPublishButton();

        await expect(page.getByText("Data berhasil di input")).toBeVisible();
        await expect(
          page.getByText("Selesaikan Pembayaran sebelum")
        ).toBeVisible();
        await expect(page.getByText("BSI")).toBeVisible();
        await expect(page).toHaveURL(/\/v2\/payment\//, { timeout: 10000 });
      });
    });
  }
});
