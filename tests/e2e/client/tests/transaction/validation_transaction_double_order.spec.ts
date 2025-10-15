import { test, expect } from "@playwright/test";
import { mockApi } from "../../utils/mocks.helper";
import { TransactionFormPage } from "../../../admin/pages/transaction-form.page";
import { loginAsRole } from "../../utils/auth.helper";

test.describe(() => {
  test.beforeEach("", async ({ page }) => {
    await loginAsRole(page, "CS");
    test("test", async ({ page }) => {
      const transactionFormPage = new TransactionFormPage(page);
      await page
        .locator("div")
        .filter({ hasText: /^HomeTransaksiKendalaProfile$/ })
        .getByRole("img")
        .nth(2)
        .click();
      await page.getByText("Nama: Whatapp: Kabupaten:").click();
      await page
        .getByText("Nama: Whatapp: Kabupaten:")
        .press("ControlOrMeta+a");
      await page
        .getByText("Nama: Whatapp: Kabupaten:")
        .fill(
          "Nama: Acu\nWhatapp: 6583860189\n\nKecamatan: secang\nKelurahan: donorejo\nKode Pos: 56595\nRT: 3\nRW: 4\nAlamat: Jl. Poros KM.11 dsn. Pelangi Dua\n\nPesanan: 1 Gizidat\nJenis Pembayaran: COD\nPotongan Ongkir: 11.000\nBiaya Admin: 1000\n\n    \nAdvertiser: DODO\nPlatform Adv: Snack Video\nPlatform Crm: Tiktok\nTIM: PGM EDX - Eyebost\nTim Shift: Vitasma A\nNotes: PROMO KILAT|WAJI 1|105000 ; DIPSIPY BELI 2 gratis 1"
        );
      await page.getByRole("button", { name: "Submit" }).click();
      await page
        .locator("div")
        .filter({ hasText: /^Pilih Warehouse$/ })
        .nth(1)
        .click();
      await page.getByText("EDN SURABAYA", { exact: true }).click();
      await page
        .locator("div")
        .filter({ hasText: /^Pilih Courier$/ })
        .nth(1)
        .click();
      await page.getByText("DETHIX (Rp. 14,500)", { exact: true }).click();
      await page.getByRole("button", { name: "Review" }).click();
      await expect(
        page.getByText("Customer memesan produk yang")
      ).toBeVisible();
      await page.getByRole("button", { name: "Close", exact: true }).click();
      await page.getByRole("button", { name: "Review" }).click();
      await page.getByText("Silahkan Mengisi Metode").isVisible();
      await page.getByRole("button", { name: "Yes" }).click();
      await page.getByText("COD").click();
      await mockApi(page, "**/shipper/courer", { data: [] });
      await page.getByRole("button", { name: "Draft" }).click();
      await expect(page.getByText("Double Order Terdeteksi!")).toBeVisible();

      await page.getByRole("button", { name: "Review" }).click();
      await page.getByText("Customer memesan produk yang").isVisible();
      await page.getByRole("button", { name: "Close", exact: true }).click();
      await page.getByRole("button", { name: "Review" }).click();
      await page.getByText("Silahkan Mengisi Metode").isVisible();
      await page.getByRole("button", { name: "Yes" }).click();
      await page.getByText("KODEUNIK").click();
      await page.getByText("BSI").click();
      await page.getByRole("button", { name: "Review" }).click();
      await expect(page.getByText("Customer")).toBeVisible();
      // await page.getByRole("button", { name: "Publish" }).click();
      // await expect(page.getByText("Selesaikan Pembayaran sebelum")).toBeVisible();
    });
  });
});
