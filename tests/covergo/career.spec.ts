import { test, expect } from "@playwright/test";
import { getCoverGoConfig } from "../config/baseConfig";
import { CareerFlow } from "../covergo/flows/CareerFlow";

test.describe("Career Page Flow", () => {
  test("Should verify the error handling on career page", async ({ page }) => {
    const baseConfig = getCoverGoConfig("baseUser");

    const careerFlow = new CareerFlow(page,baseConfig);
    await careerFlow.assertNoJobsFound();
  });

  test("Should search Jobs based on input", async ({ page }) => {
    const baseConfig = getCoverGoConfig("baseUser");

    const careerFlow = new CareerFlow(page, baseConfig);
    await careerFlow.searchJob();
  });

  test('should verify "hero-image" from dashboard loads and has correct src', async ({
    page,
  }) => {
    const baseConfig = getCoverGoConfig("baseUser");

    const careerFlow = new CareerFlow(page, baseConfig);
    await careerFlow.verifyDashboardImage();
  });
});
