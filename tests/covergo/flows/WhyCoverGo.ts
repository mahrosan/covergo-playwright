import { Page } from "@playwright/test";
import { RoleCredentials } from "../../config/baseConfig";
import { expect } from "@playwright/test";
import { LoadKeyValueCsv } from "../../shared/loadKeyValueCsv";
import path from "path";

export class WhyCoverGo {
  constructor(
    private page: Page,
    private config: { baseUrl: string } & RoleCredentials,
  ) {}

  async assertThedataWithCSV() {
    const page = this.page;
    await page.goto(`${this.config.baseUrl}`);

    // This can be extracted from an API and checked from that data set as well.
    const csvFilePath = path.resolve(
      __dirname,
      "..",
      "..",
      "data",
      "whyCoverGoContent.csv",
    );

    // Calling the data set from the helper file
    const loadKeyValueCsv = new LoadKeyValueCsv();

    await page
      .locator("#main-nav")
      .getByRole("link", { name: "Why CoverGo" })
      .click();
    // Await the result from readCSV if it returns a promise
    const data = await loadKeyValueCsv.readCSV(csvFilePath);

    // Loop through the parsed CSV data and use it in the test
    for (const row of data) {
      const { header, description } = row;

      // Check that the header and description appear on the page
      await expect(page.getByRole("heading", { name: header })).toBeVisible();
      await expect(page.locator("body")).toContainText(header);
      await expect(page.locator("body")).toContainText(description);
      //   console.log("CSV header:", header);
      //   console.log("CSV header:", description);
    }
  }
}
