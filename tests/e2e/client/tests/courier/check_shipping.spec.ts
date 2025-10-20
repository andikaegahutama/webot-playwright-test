import { test, expect } from "@playwright/test";
import { loginAsRole } from "../../utils/auth.helper";
import { CourierPage } from "../../pages/courier.page";
import { HomePage } from "../../pages/home.page";

test.describe("Courier Page Test", () => {
  const warehouseData = [
    {
      warehouseType: "Ethix EDM",
      territory: "Karangpucung",
      district: "Pamulihan, Karangpucung, Kab",
      product: "Nutriflakes",
      quantity: 2,
      warehouseName: ["EDN JAKARTA", "EDN SURABAYA"],
      courierName: ["DETHIX", "Ninja Reguler Bebas"],
    },
    {
      warehouseType: "Ethix EDX",
      territory: "Karangpucung",
      district: "Pamulihan, Karangpucung, Kab",
      product: "Vitameal",
      quantity: 3,
      warehouseName: [
        "Gudang Ethix Sampang",
        "Gudang Ethix Surabaya",
        "Gudang Ethix Medan",
        "Gudang Ethix Ciputat",
      ],
      courierName: ["SAP", "Sicepat", "Ninja Xpress"],
    },
    {
      warehouseType: "Shipper",
      territory: "Karangpucung",
      district: "Pamulihan, Karangpucung, Kab",
      product: "Eyebost",
      quantity: 1,
      warehouseName: [
        "Shipper-Pulogadung",
        "Shipper-Semarang",
        "Shipper-Tandes",
      ],
      courierName: ["SAP", "Ninja Xpress", "Sicepat"],
    },
  ];

  test.beforeEach(async ({ page }) => {
    await loginAsRole(page, "CS");
  });

  for (const {
    warehouseType,
    territory,
    district,
    product,
    quantity,
    warehouseName,
    courierName,
  } of warehouseData) {
    test(`should create courier for '${warehouseType}' with product '${product}'`, async ({
      page,
    }) => {
      const homePage = new HomePage(page);
      const courierPage = new CourierPage(page);

      await homePage.clickCheckOngkirButton();
      await courierPage.clickWarehouseType(warehouseType);
      await courierPage.fillTerritory(territory, district);
      await courierPage.addProduct(product, `${quantity}`);
      await courierPage.submitForm();

      for (const warehouse of warehouseName) {
        await expect(page.getByText(warehouse).first()).toBeVisible({
          timeout: 60000,
        });
      }

      for (const courier of courierName) {
        await expect(page.getByText(courier).first()).toBeVisible({
          timeout: 60000,
        });
      }
    });
  }
});
