interface WarehouseType {
  newTypes: string;
  oldTypes: string;
  shippingTypes: string;
}

export const warehouseType: WarehouseType[] = [
  {
    newTypes: "EDM",
    oldTypes: "ethix",
    shippingTypes: "Ethix EDM",
  },
  {
    newTypes: "EDX",
    oldTypes: "ethix-auto",
    shippingTypes: "Ethix EDX",
  },
  {
    newTypes: "Shipper",
    oldTypes: "shipper",
    shippingTypes: "Shipper",
  },
];
