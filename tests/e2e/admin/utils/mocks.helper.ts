import { Page } from "@playwright/test";

export const mockApi = async (
  page: Page,
  urlPattern: string | RegExp,
  mockBody: any,
  status = 200
) => {
  await page.route(urlPattern, (route) => {
    route.fulfill({
      status,
      contentType: "application/json",
      body: JSON.stringify(mockBody),
    });
  });
};
