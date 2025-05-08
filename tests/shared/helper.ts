import { expect } from "@playwright/test";

export class Helper {
  // Helper function to assert visibility and text for any locator
  async assertTextAndVisibility(page, locator: string, texts: string[]) {
    const elementLocator = page.locator(locator);

    for (const text of texts) {
      try {
        // Check if element contains the expected text and is visible
        await expect(elementLocator).toContainText(text);
        await expect(elementLocator).toBeVisible(); // Ensure element is visible
      } catch (error) {
        // If assertion fails, logs an error message
        console.error(
          `Assertion failed for text: "${text}" at locator: ${locator}`,
        );

        // Captures a screenshot for debugging
        await page.screenshot({ path: `screenshot_${Date.now()}.png` });

        // Rethrow the error to ensure the test fails
        throw new Error(`Assertion error: ${text} not found in ${locator}`);
      }
    }
  }

  async verifyImage(heroImage) {
    // Check if the image has fully loaded
    const isImageLoaded = await heroImage.evaluate((img: HTMLImageElement) => {
      return img.complete && img.naturalWidth > 0;
    });
    return isImageLoaded;
  }
}
