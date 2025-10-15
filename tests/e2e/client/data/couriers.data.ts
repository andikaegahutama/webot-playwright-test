interface Courier {
  name: string;
  warehouseType: string;
  shipperName: string;
}

export const courier: Courier[] = [
  { name: "DETHIX", warehouseType: "EDM", shipperName: "DETHIX" },
  { name: "JNT Bebas", warehouseType: "EDM", shipperName: "Ninja" },
  {
    name: "Ninja Reguler Bebas",
    warehouseType: "EDM",
    shipperName: "Ninja",
  },
  { name: "SAP - SATRIA REG", warehouseType: "EDX", shipperName: "SAP" },
  { name: "Sicepat - REG", warehouseType: "EDX", shipperName: "Sicepat" },
  {
    name: "Ninja Xpress - Standard",
    warehouseType: "EDX",
    shipperName: "Ninja Xpress",
  },
  {
    name: "Sicepat - REG",
    warehouseType: "Shipper",
    shipperName: "Sicepat",
  },
  {
    name: "Ninja Xpress - Standard",
    warehouseType: "Shipper",
    shipperName: "Ninja Xpress",
  },
];
