import { test, expect } from "@playwright/test";
import { getCoverGoConfig } from "../config/baseConfig";
import { BaseFlow } from "../covergo/flows/BaseFlow";

test.describe("CoverGo Base Flow", () => {
  test("should assert and verify the Contents of home page", async ({
    page,
  }) => {
    // 1. Grab the Base config from environment variables
    // For now just the URL will be a used, The username and password is kept to just shows how it can be extracted.
    const baseConfig = getCoverGoConfig("baseUser");

    // 2. Create the page object with that config
    const baseFlow = new BaseFlow(page, baseConfig);

    // 3. Perform basic surf
    await baseFlow.gotoCovergo();
  });

  test("should verify button clicks and redirections", async ({ page }) => {
    // 1. Grab the Base config from environment variables
    // For now just the URL will be a used, The username and password is kept to just shows how it can be extracted.
    const baseConfig = getCoverGoConfig("baseUser");

    // 2. Create the page object with that config
    const baseFlow = new BaseFlow(page, baseConfig);

    // 3. Perform basic surf
    await baseFlow.goToTalkWithUs();
  });

  test("should fill in the contact us form and assert the validations", async ({ page }) => {
    // 1. Grab the Base config from environment variables
    // For now just the URL will be a used, The username and password is kept to just shows how it can be extracted.
    const baseConfig = getCoverGoConfig("baseUser");

    // 2. Create the page object with that config
    const baseFlow = new BaseFlow(page, baseConfig);

    // 3. Fill in the data in the form on contact us page.
    // Also reuses the navigation functionality to contact us page
    await baseFlow.fillInTheContactUsForm();
  });

  
});
