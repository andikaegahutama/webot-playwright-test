import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/home.page";
import { TransactionInputModal } from "../../../admin/pages/components/transaction-input-modal";
import { TransactionFormPage } from "../../../admin/pages/transaction-form.page";
import { mockApi } from "../../utils/mocks.helper";
import { loginAsRole } from "../../utils/auth.helper";
import { templates } from "../../data/transaction-templates.data";
import { warehouse } from "../../data/warehouses.data";

test.describe("E2E - Create Transaction", () => {
  // for (const transactionTemplate of templates) {
  //   test.describe(`Payment Method: COD Warehouse: ${transactionTemplate.alias}`, () => {
  //     test.beforeEach(async ({ page }) => {
  //       await loginAsRole(page, "CS");
  //     });

  //     test(`should create transaction for ${transactionTemplate.alias}`, async ({
  //       page,
  //     }) => {
  //       const homePage = new HomePage(page);
  //       const transactionInputModal = new TransactionInputModal(page);
  //       const transactionFormPage = new TransactionFormPage(page);

  //       await homePage.navbar.clickCreateButton();

  //       await transactionInputModal.selectWarehouse(
  //         transactionTemplate.tabName
  //       );
  //       await transactionInputModal.fillOrderTemplate(
  //         transactionTemplate.template
  //       );
  //       await transactionInputModal.submitOrder();

  //       const selectedWarehouse = warehouse.find(
  //         (w) => w.warehouseType === transactionTemplate.alias
  //       );

  //       if (!selectedWarehouse) {
  //         throw new Error(
  //           `Warehouse not found for alias: ${transactionTemplate.alias}`
  //         );
  //       }

  //       await transactionFormPage.selectWarehouse(selectedWarehouse.name);

  //       await mockApi(page, "/shipper/courier", { data: [] });

  //       await transactionFormPage.selectCourier(/Ninja/);
  //       await transactionFormPage.clickReviewButton();

  //       await page.waitForTimeout(2000);
  //       await transactionFormPage.clickPublishButton();
  //       await page.pause();
  //       await expect(page.getByText("List Transaksi")).toBeVisible();
  //       await expect(page.getByText("Data berhasil di input")).toBeVisible();
  //       await expect(
  //         page
  //           .locator(
  //             ".inline-flex.items-center.gap-1.text-\\[10px\\].text-main-status-packing"
  //           )
  //           .first()
  //       ).toBeVisible();
  //     });
  //   });
  // }

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

        await transactionFormPage.selectWarehouse(selectedWarehouse.name);

        await mockApi(page, "/shipper/courier", { data: [] });

        await transactionFormPage.selectCourier(/Ninja/);
        await transactionFormPage.clickReviewButton();

        await page.waitForTimeout(2000);
        await transactionFormPage.clickPublishButton();
        await page.pause();
        await expect(page.getByText("Data berhasil di input")).toBeVisible();
        await page.waitForTimeout(4000);
        // await expect(page.getByText("Total Pembayaran").first()).toBeVisible();
        await expect(page.getByText("BSI")).toBeVisible();
        // await expect(
        //   page
        //     .locator(
        //       ".inline-flex.items-center.gap-1.text-\\[10px\\].text-main-status-packing"
        //     )
        //     .first()
        // ).toBeVisible();
      });
    });
  }
});
