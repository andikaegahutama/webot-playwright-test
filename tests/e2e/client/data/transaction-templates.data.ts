import { dynamicData } from "../utils/dynamic-data.helper";
import { dataHelper } from "../utils/randomizer.helper";

type Warehouse = "EDM" | "EDX" | "Shipper";

const productEDX = dataHelper.randomElement(["Vitasma", "Vitameal"]);
const productEDM = dataHelper.randomElement(["Etawalin", "Nutriflakes"]);
const productShipper = dataHelper.randomElement(["Vitameal", "Eyebost"]);

const trxGlobal = dynamicData.createTransaction("");
const trxEDX = dynamicData.createTransaction(productEDX);
const trxEDM = dynamicData.createTransaction(productEDM);
const trxShipper = dynamicData.createTransaction(productShipper);

export const templates: {
  tabName: string;
  alias: Warehouse;
  template: string;
}[] = [
  {
    tabName: `Ethix EDX`,
    alias: `EDX`,
    template: `Nama: ${trxEDX.nama}
Whatapp: ${trxEDX.whatsapp}

Kecamatan: secang
Kelurahan: donorejo
Kode Pos: 56595
RT: 3
RW: 4
Alamat: Jl. Poros KM.11 dsn. Pelangi Dua

Pesanan: ${trxEDX.pesanan}
Jenis Pembayaran: COD
Potongan Ongkir: 1000
Biaya Admin: 1000

    
Advertiser: ${trxEDX.advertiser?.name}
Platform Adv: Snack Video
Platform Crm: Tiktok
TIM: ${trxGlobal.team?.name}
Tim Shift: Vitasma A
Notes: PROMO KILAT|WAJI 1|105000 ; DIPSIPY BELI 2 gratis 1`,
  },
  {
    tabName: `Ethix EDM`,
    alias: `EDM`,
    template: `Nama: ${trxEDM.nama}
Whatapp: ${trxEDM.whatsapp}

Kecamatan: secang
Kelurahan: donorejo
Kode Pos: 56595
RT: 3
RW: 4
Alamat: ${trxEDM.alamat}

Pesanan: ${trxEDM.pesanan}
Jenis Pembayaran: COD
Potongan Ongkir: 1000
Biaya Admin: 1000

    
Advertiser: DODO
Platform Adv: Snack Video
Platform Crm: Tiktok
TIM: ${trxGlobal.team?.name}
Tim Shift: Vitasma A
Notes: PROMO KILAT|WAJI 1|105000 ; DIPSIPY BELI 2 gratis 1`,
  },
  {
    tabName: `Shipper`,
    alias: `Shipper`,
    template: `Nama: ${trxShipper.nama}
Whatapp: ${trxShipper.whatsapp}

Kecamatan: secang
Kelurahan: donorejo
Kode Pos: 56595
RT: 3
RW: 4
Alamat: Jl. Poros KM.11 dsn. Pelangi Dua

Pesanan: ${trxShipper.pesanan}
Jenis Pembayaran: COD
Potongan Ongkir: 1000
Biaya Admin: 1000

    
Advertiser: DODO
Platform Adv: Snack Video
Platform Crm: Tiktok
TIM: ${trxGlobal.team?.name}
Tim Shift: Vitasma A
Notes: PROMO KILAT|WAJI 1|105000 ; DIPSIPY BELI 2 gratis 1`,
  },
];
