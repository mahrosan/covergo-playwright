import { Page } from "@playwright/test";
import { RoleCredentials } from "../../config/baseConfig";

export class ClientsFlow {
  constructor(
    private page: Page,
    private config: { baseUrl: string } & RoleCredentials,
  ) {}

 

  async scrapClientsName(pageNumber)
  {
     // Navigate to the clients page
     if (pageNumber != 1) {
        await this.page.getByRole("link", { name: pageNumber }).click();
      }
      
     await this.page.waitForTimeout(1000); // Allow time for content to load
     return await this.page.$$eval(
        "#archive a",
        (elements) =>
          elements
            .map((el) => {
              const name = el.querySelector("h4")?.textContent?.trim(); // Extracting company names from <h4> tags
              const imageSrc = el.querySelector("img")?.getAttribute("src"); // Extracting image src from <img> tags
              return { name, imageSrc }; // Return both name and image src
            })
            .filter((company) => company.name && company.imageSrc), // Filters out entries where name or imageSrc are undefined
      );

      
  }

  async returnExtractedClientsName() {
    const page = this.page;
    await page.goto(`${this.config.baseUrl}`);


    // Navigate to Case Studies page
    await page
      .locator("#main-nav")
      .getByRole("link", { name: "Resources" })
      .click();
    await page.getByRole("link", { name: "Case Studies", exact: true }).click();


    // Wait for the archive section to load
    // Scrap all the companies/clients name
    await page.waitForSelector("#archive");
    const companiesPage1 = await this.scrapClientsName("1");

    const companiesPage2 = await this.scrapClientsName("2")
   

    // Combine both pages' companies into a single array
    return [...companiesPage1, ...companiesPage2];
  }
}
