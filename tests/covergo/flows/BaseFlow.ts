import { Page } from "@playwright/test";
import { RoleCredentials } from "../../config/baseConfig";
import { expect } from "@playwright/test";
import { Helper } from "../../shared/helper";

export class BaseFlow {
  constructor(
    private page: Page,
    private config: { baseUrl: string } & RoleCredentials,
  ) {}

  async gotoCovergo() {
    const helper = new Helper();

    const page = this.page;
    await page.goto(`${this.config.baseUrl}`);

    const navItems = [
      "Why CoverGo",
      "Platform",
      "Use cases",
      "Who we help",
      "Resources",
      "Company",
    ];

    // Asserts the Nav text/items on a bulk
    for (const item of navItems) {
      const navItemLocator = page.locator(`#main-nav >> text=${item}`);
      // Logged into the console to verify the asserted items
      // console.log(item);

      await expect(navItemLocator).toContainText(item);
      await expect(navItemLocator).toBeVisible();
    }

    const homePageAssertions = [
      {
        locator: "#ancr-2050",
        texts: [
          "CoverGo launches next-gen AI-powered health claims management platform",
          "Learn more",
        ],
      },
      { locator: "#main-nav", texts: ["Talk with us"] },
      { locator: "#hero", texts: ["Book a demo"] },
      {
        locator: "body",
        texts: ["Trusted by leading insurance companies globally"],
      },
      { locator: "h1", texts: ["Up your insurance game."] },
      {
        locator: "#hero",
        texts: [
          "The next-gen distribution, policy admin, and claims platform for health, life, and P&C.",
          "We empower insurance companies like yours to build products faster, enable digital distribution, and streamline policy admin and claims in the most flexible, scalable and cost-effective way - powered by our AI-driven, no-code platform.",
        ],
      },
      // Additional assertions as per your request
      {
        locator: "body",
        texts: [
          "Overcome rigid legacy systems",
          "As an insurance professional, you understand that going digital is essential; however, you face significant legacy system costs and roadblocks in adapting to the changing market and customer needs. This results in legacy systems’ IT costs being 58% higher and operating costs 43% higher compared to modern systems (McKinsey).",
          "How CoverGo helps transform your insurance ecosystem",
          "CoverGo is here as your true technology partner providing a flexible, future-proof core platform to fulfill your digital transformation needs and business goals across the entire insurance value chain — from fast product building, omni-channel distribution to digital policy admin and claims.",
          "Build products faster",
          "Build insurance products your customers want in a few days instead of months and without a single line of code with our patented drag-and-drop, no-code product builder, saving over 90% of product building time and cost.",
        ],
      },
    ];

    // Loop through each section to assert text and visibility using the helper function
    for (const { locator, texts } of homePageAssertions) {
      // Helper function to assert visibility and text for any locator
      // For this scenario we will be using it just for BaseFlow test
      // This is kept on shared/utility to be used by other tests/flow as well

      await helper.assertTextAndVisibility(page, locator, texts);
      // Logged into the console to verify the asserted items
      // should be removed on the final version.
      // This is just used to verify the asserted lists in the report as well as the console itself
      // console.log(texts);
    }
  }

  async goToTalkWithUs() {
    const page = this.page;
    await page.goto(`${this.config.baseUrl}`);

    await page
      .locator("#main-nav")
      .getByRole("link", { name: "Talk with us" })
      .click();
    // Assert the URL
    await expect(page).toHaveURL("https://covergo.com/about-us/contact-us/");
  }

  async fillInTheContactUsForm() {
    const page = this.page;
    //Re use the navigation function to Talk with use/Contact us page
    this.goToTalkWithUs();

    await expect(page.locator("#main-nav")).toContainText("Talk with us");

    // Navigate to Contact us page
    await page
      .locator("#main-nav")
      .getByRole("link", { name: "Talk with us" })
      .click();

    // Assert Page Contents
    await expect(page.locator("h1")).toContainText(
      "Contact us or schedule a demo today",
    );
    await expect(page.locator("#hero")).toContainText(
      "Get in touch with us to learn how we can help your business.",
    );

    // Click the submit button without any data sets to trigger Frontend validation messages
    await page.getByRole("button", { name: "Submit" }).click();

    // Asserting the front-end Validation of the contact us form
    await expect(
      page.locator(
        '[data-test-id="hsForm_743309ed-d1f6-4ff8-98e8-8b04fa14721a"]',
      ),
    ).toContainText("Please complete this required field.");
    await expect(
      page.locator(
        '[data-test-id="hsForm_743309ed-d1f6-4ff8-98e8-8b04fa14721a"]',
      ),
    ).toContainText("Please complete this required field.");
    await page.getByText("Please complete all required").click();
    await expect(
      page
        .locator('[data-test-id="hsForm_743309ed-d1f6-4ff8-98e8-8b04fa14721a"]')
        .getByRole("list"),
    ).toContainText("Please complete all required fields.");

    await expect(
      page.locator(
        '[data-test-id="hsForm_743309ed-d1f6-4ff8-98e8-8b04fa14721a"]',
      ),
    ).toContainText("First name");
    await page.getByRole("textbox", { name: "First name" }).click();
    await page.getByRole("textbox", { name: "First name" }).fill("Rosan");
    await expect(
      page.locator(
        '[data-test-id="hsForm_743309ed-d1f6-4ff8-98e8-8b04fa14721a"]',
      ),
    ).toContainText("Company name");
    await page.getByRole("textbox", { name: "Company name*" }).click();
    await page
      .getByRole("textbox", { name: "Company name*" })
      .fill("Rosan Corp");
    await expect(
      page.locator(
        '[data-test-id="hsForm_743309ed-d1f6-4ff8-98e8-8b04fa14721a"]',
      ),
    ).toContainText("Email");

    await page.getByRole("button", { name: "Submit" }).click();
    await page.screenshot({
      path: "screenshots/assertion-failed.png",
      fullPage: true,
    });
    // Wrongly formated email
    await page.getByRole("textbox", { name: "Email*" }).click();
    await page.getByRole("textbox", { name: "Email*" }).fill("kanai.phinehas");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(
      page.locator(
        '[data-test-id="hsForm_743309ed-d1f6-4ff8-98e8-8b04fa14721a"]',
      ),
    ).toContainText("Email must be formatted correctly.");
    await expect(page.getByText("Email must be formatted")).toBeVisible();

    await page.getByRole("textbox", { name: "Email*" }).click();
    await page
      .getByRole("textbox", { name: "Email*" })
      .fill("kanai.phinehas@deliverydaily.org");
    await expect(
      page.locator(
        '[data-test-id="hsForm_743309ed-d1f6-4ff8-98e8-8b04fa14721a"]',
      ),
    ).toContainText("Website URL");
    await page.getByRole("textbox", { name: "Website URL" }).click();
    await page
      .getByRole("textbox", { name: "Website URL" })
      .fill("www.youtube.com");
    await expect(
      page.locator(
        '[data-test-id="hsForm_743309ed-d1f6-4ff8-98e8-8b04fa14721a"]',
      ),
    ).toContainText("Region");
    await page.getByLabel("Region").selectOption("Asia Pacific & Oceania");
    await expect(
      page.locator(
        '[data-test-id="hsForm_743309ed-d1f6-4ff8-98e8-8b04fa14721a"]',
      ),
    ).toContainText("How did you hear about CoverGo?");
    await page.getByLabel("How did you hear about").selectOption("Linkedin");
    await expect(
      page.locator(
        '[data-test-id="hsForm_743309ed-d1f6-4ff8-98e8-8b04fa14721a"]',
      ),
    ).toContainText("Message");
    await page.getByRole("textbox", { name: "Message" }).click();
    await page
      .getByRole("textbox", { name: "Message" })
      .fill(
        "This is a automated test, please ignore if seen. Conducted for test. ",
      );
    await expect(
      page.locator(
        '[data-test-id="hsForm_743309ed-d1f6-4ff8-98e8-8b04fa14721a"]',
      ),
    ).toContainText(
      "CoverGo needs the contact information you provide to us to contact you about our products and services. You may unsubscribe from these communications at anytime. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, check out our Privacy Policy.",
    );
    // await page.getByRole("button", { name: "Submit" }).click();
    // await expect(
    //   page
    //     .locator('[data-test-id="hsForm_743309ed-d1f6-4ff8-98e8-8b04fa14721a"]')
    //     .getByRole("listitem"),
    // ).toContainText("Failed to validate Captcha. Please try again.");
    // await expect(page.getByText("Failed to validate Captcha.")).toBeVisible();

    // await page.pause();
  }
}
