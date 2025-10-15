import "dotenv/config";

interface UserRole {
  name: string;
  email: string;
  password: string;
}

export const roles: UserRole[] = [
  {
    name: "Admin",
    email: process.env.EMAIL_ADMIN!,
    password: process.env.PASSWORD_ADMIN!,
  },
  {
    name: "CS",
    email: process.env.EMAIL_CS!,
    password: process.env.PASSWORD_CS!,
  },
  {
    name: "Crm",
    email: process.env.EMAIL_CRM!,
    password: process.env.PASSWORD_CRM!,
  },
  {
    name: "Adv.Agung",
    email: process.env.EMAIL_ADV!,
    password: process.env.PASSWORD_ADV!,
  },
];
