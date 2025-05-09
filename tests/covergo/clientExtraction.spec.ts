import test from "@playwright/test";
import { ClientsFlow } from "../covergo/flows/ClientsFlow"
import { getCoverGoConfig } from "../config/baseConfig";

test.describe("Case studies page data extraction", () => {
  test("should extract Client list", async ({ page }) => {

    const baseConfig = getCoverGoConfig("baseUser");
    
        // 2. Create the page object with that config
        const clientsFlow = new ClientsFlow(page, baseConfig);
    
        // 3. Perform data extraction
        const allCompanies = await clientsFlow.returnExtractedClientsName();
  });
});
