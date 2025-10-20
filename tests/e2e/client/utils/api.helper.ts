import { Page, Response } from "@playwright/test";

export async function waitForAPIResponse(
  page: Page,
  endpoint: string | RegExp,
  status: number | 200
): Promise<Response> {
  const baseURL = process.env.BASE_URL_API || "";

  const response = await page.waitForResponse((response) => {
    const url = response.url();
    let matches = false;

    if (typeof endpoint === "string") {
      const fullEndpoint = `${baseURL}${endpoint}`;
      matches = url.includes(fullEndpoint);
    } else {
      matches = !!url.match(endpoint);
    }

    return matches && response.status() === status;
  });

  console.log(`✅ Waited for API: ${response.url()} (${response.status()})`);
  return response;
}
