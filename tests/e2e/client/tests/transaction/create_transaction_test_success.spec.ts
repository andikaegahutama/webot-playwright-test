import { test } from "@playwright/test";
import { loginAsRole } from "../../utils/auth.helper";

test("test", async ({ page }) => {
  await loginAsRole(page, "CS");
  await page
    .locator("div")
    .filter({ hasText: /^Transaksi$/ })
    .nth(1)
    .click();
  await page.locator(".z-30.flex").click();
  await page
    .locator(
      ".flex.h-full.w-full.flex-col.items-center.p-3.duration-100.ease-in.hover\\:cursor-pointer.text-\\[\\#2F58CD\\]"
    )
    .click();
  await page.getByText("Nama: Whatapp: Kabupaten:").click();
  await page.getByText("Nama: Whatapp: Kabupaten:").press("ControlOrMeta+a");
  await page
    .getByText("Nama: Whatapp: Kabupaten:")
    .fill(
      "Nama: Srihandayani\nWhatapp: 085691170813\n\nKecamatan: secang\nKelurahan: donorejo\nKode Pos: 56595\nRT: 3\nRW: 4\nAlamat: Jl. Poros KM.11 dsn. Pelangi Dua\n\nPesanan: 2 vitasma\nJenis Pembayaran: COD\nPotongan Ongkir: 11.000\nBiaya Admin: 1000\n\n    \nAdvertiser: DODO\nPlatform Adv: Snack Video\nPlatform Crm: Tiktok\nTIM: Vitasma\nTim Shift: Vitasma A\nNotes: PROMO KILAT|WAJI 1|105000 ; DIPSIPY BELI 2 gratis 1"
    );
  await page.getByRole("button", { name: "Submit" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Pilih Tim$/ })
    .nth(1)
    .click();
  await page.getByText("PGM Ozi - Vitasma Kids", { exact: true }).click();
  await page.getByText("Warehouse*Pilih Warehouse").click();
  await page.getByText("EDN SURABAYA", { exact: true }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Pilih Courier$/ })
    .nth(1)
    .click();
  await page.getByRole("button", { name: "Add Product" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Pilih Product$/ })
    .nth(1)
    .click();
  await page.getByText("Etawaku", { exact: true }).click();
  await page
    .locator("#ProductModalEditResultPortalId")
    .getByRole("img")
    .nth(1)
    .click();
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Pilih Courier$/ })
    .nth(1)
    .click();
  await page.getByText("DETHIX (Rp. 14,500)", { exact: true }).click();
  await page.getByRole("button", { name: "Review" }).click();
  await page.waitForTimeout(2000);
  await page.getByText("Copy Data").click();
  await page.getByRole("button", { name: "Publish" }).click();
  await page
    .locator(
      ".inline-flex.items-center.gap-1.text-\\[10px\\].text-main-status-packing"
    )
    .first()
    .click();
  await page.getByText("Etawaku").click();
});
