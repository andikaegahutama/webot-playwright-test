import { type Page, type Locator, expect } from "@playwright/test";
import { NavbarComponent } from "./components/navbar.component";

export class HomePage {
  readonly page: Page;
  readonly navbar: NavbarComponent;
  readonly welcomeMessageHeader: Locator;
  readonly searchInput: Locator;
  readonly cekOngkirButton: Locator;
  readonly productButton: Locator;
  readonly totalTransactionCard: Locator;
  readonly nominalCard: Locator;
  readonly addLeadButton: Locator;
  readonly addResiButton: Locator;
  readonly addBudgetButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavbarComponent(page);
    this.welcomeMessageHeader = page.getByRole("heading", { name: /Selamat/ });
    this.searchInput = page.getByPlaceholder("Search");
    this.cekOngkirButton = page.getByRole("button", { name: "Cek Ongkir" });
    this.productButton = page.getByRole("button", { name: "Produk" });
    this.addLeadButton = page.getByRole("button", { name: "Tambah Lead" });
    this.addResiButton = page.getByRole("button", { name: "Tambah Resi" });
    this.addBudgetButton = page.getByRole("button", { name: "Tambah Budget" });
    this.totalTransactionCard = page.locator('div:has-text("Total Transaksi")');
    this.nominalCard = page.locator('div:has-text("Nominal")');
  }

  async navigateTo() {
    await this.page.goto("/home");
  }

  async clickCheckOngkirButton() {
    await this.cekOngkirButton.click();
  }

  async clickProductButton() {
    await this.productButton.click();
  }

  async clickAddLead() {
    await this.addLeadButton.click();
  }

  async clickAddResi() {
    await this.addResiButton.click();
  }

  async clickAddBudget() {
    await this.addBudgetButton.click();
  }
}
