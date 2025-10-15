import { Page } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const BASE_API_URL = process.env.BASE_URL_API || "";

export const mockApi = async (
  page: Page,
  path: string | RegExp,
  mockBody: any,
  status = 200
) => {
  let urlPattern: string | RegExp;

  if (typeof path === "string") {
    urlPattern = `${BASE_API_URL}${path.startsWith("/") ? path : `/${path}`}`;
  } else {
    urlPattern = path;
  }

  await page.route(urlPattern, async (route) => {
    console.log(`🧩 Mocked: ${urlPattern}`);

    await route.fulfill({
      status,
      contentType: "application/json",
      body: JSON.stringify(mockBody),
    });
  });
};
