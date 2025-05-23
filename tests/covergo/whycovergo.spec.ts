import { test, expect } from "@playwright/test";
import { getCoverGoConfig } from "../config/baseConfig";
import { WhyCoverGoFlow } from "../covergo/flows/WhyCoverGoFlow";

test.describe("Testing the Why Cover Go Page with CSV data set instead of manual data set in the code itself", () => {
  test("test using CSV data", async ({ page }) => {
    const baseConfig = getCoverGoConfig("baseUser");
    const whyCoverGo = new WhyCoverGoFlow(page, baseConfig);

    await whyCoverGo.assertThedataWithCSV();
  });
});
