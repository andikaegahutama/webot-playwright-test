import { fakerID_ID as faker } from "@faker-js/faker";
import { dataHelper } from "./randomizer.helper";
import { team } from "../data/teams.data";
import { advertiser } from "../data/advertiser.data";
import { platform } from "../data/platforms.data";

const indoPrefixes = [
  "0811",
  "0812",
  "0813",
  "0821",
  "0822",
  "0823",
  "0851",
  "0852",
  "0853",
  "0855",
  "0856",
  "0857",
  "0858",
  "0831",
  "0832",
  "0833",
  "0838",
  "0814",
  "0815",
  "0816",
  "0881",
  "0882",
  "0883",
  "0895",
  "0896",
  "0897",
  "0898",
];

function generateIndoPhone() {
  const prefix = faker.helpers.arrayElement(indoPrefixes);
  const length = faker.number.int({ min: 9, max: 12 });
  const rest = faker.string.numeric(length - prefix.length);
  return prefix + rest;
}

export const dynamicData = {
  createTransaction: (product: string) => ({
    nama: faker.person.fullName(),
    whatsapp: generateIndoPhone(),
    alamat: faker.location.streetAddress(),
    pesanan: `${faker.number.int({ min: 1, max: 3 })} ${product}`,
    advertiser: dataHelper.randomElement(advertiser),
    platformAdv: "Snack Video",
    team: dataHelper.randomElement(team),
  }),
  createRepeatOrder: (product: string) => ({
    nama: faker.person.fullName(),
    alamat: faker.location.streetAddress(),
    pesanan: product,
    quantity: faker.number.int({ min: 1, max: 3 }),
    advertiser: dataHelper.randomElement(advertiser),
    platformAdv: dataHelper.randomElement(platform),
    team: dataHelper.randomElement(team),
  }),
};
