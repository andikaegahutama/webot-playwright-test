import "dotenv/config";

interface UserRole {
  name: string;
  email: string;
  password: string;
  username: string;
}

export const roles: UserRole[] = [
  {
    name: "CS",
    email: process.env.EMAIL_CS!,
    password: process.env.PASSWORD_CS!,
    username: "Cs Anggie",
  },
  {
    name: "HO_CS",
    email: process.env.EMAIL_HO_CS!,
    password: process.env.PASSWORD_HO_CS!,
    username: "Cs Dien",
  },
  {
    name: "CRM",
    email: process.env.EMAIL_CRM!,
    password: process.env.PASSWORD_CRM!,
    username: "Crm.Alvia",
  },
  {
    name: "HO_CRM",
    email: process.env.EMAIL_HO_CRM!,
    password: process.env.PASSWORD_HO_CRM!,
    username: "Crm.Laras",
  },
  {
    name: "ADV",
    email: process.env.EMAIL_ADV!,
    password: process.env.PASSWORD_ADV!,
    username: "Adv.Abdul",
  },
  {
    name: "HO_ADV",
    email: process.env.EMAIL_HO_ADV!,
    password: process.env.PASSWORD_HO_ADV!,
    username: "Adv.Agung",
  },
];
