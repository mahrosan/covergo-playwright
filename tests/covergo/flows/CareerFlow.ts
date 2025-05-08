import { expect, Page } from "@playwright/test";
import { RoleCredentials } from "../../config/baseConfig";
import { Helper } from "../../shared/helper";

export class CareerFlow {
  constructor(
    private page: Page,
    private config: { baseUrl: string } & RoleCredentials,
  ) {}

  async goToCareersPage() {
    const page = this.page;
    await page.goto(`${this.config.baseUrl}`);
    await page.goto(`${this.config.baseUrl}`);

    await page.getByRole("listitem").filter({ hasText: "Company" }).click();
    await page
      .locator("#top-bar-menu")
      .getByRole("link", { name: "Careers" })
      .click();
    await expect(
      page.getByRole("heading", { name: "View our open roles" }),
    ).toBeVisible();
    await expect(page.locator("#cta")).toContainText("View our open roles");
    await expect(page.getByRole("link", { name: "Join us" })).toBeVisible();
    await expect(page.locator("#button-container")).toContainText("Join us");
    await page.getByRole("link", { name: "Join us" }).click();
    await page.getByRole("button", { name: "Accept all" }).click();
  }

  async assertNoJobsFound() {
    const page = this.page;
    await page.goto(`${this.config.baseUrl}`);

    await this.goToCareersPage();
    await page.getByRole("searchbox", { name: "Search jobs…" }).click();
    await page
      .getByRole("searchbox", { name: "Search jobs…" })
      .fill("Random Job ");
    await expect(
      page.getByRole("heading", { name: "Sorry, no jobs found matching" }),
    ).toBeVisible();
    await expect(page.getByText("Try removing filters or")).toBeVisible();
    await expect(page.getByRole("main")).toContainText(
      "Sorry, no jobs found matching this criteria.",
    );
    await expect(page.getByRole("main")).toContainText(
      "Try removing filters or refine your search.",
    );
  }
  async searchJob() {
    const page = this.page;
    await page.goto(`${this.config.baseUrl}`);
    await this.goToCareersPage();

    await page.getByRole("button", { name: "Clear filters" }).click();
    await page.getByRole("searchbox", { name: "Search jobs…" }).click();
    await page
      .getByRole("searchbox", { name: "Search jobs…" })
      .fill("QA Engineer");
    await page.getByRole("searchbox", { name: "Search jobs…" }).press("Enter");
    await page.locator("#workplace-types-filter_input").click();
    await page
      .getByRole("option", { name: "Remote" })
      .locator("span")
      .first()
      .click();
    await page.locator("#locations-filter_input").click();
    await page
      .getByRole("searchbox", { name: "Search", exact: true })
      .fill("nepal");
    await expect(page.locator("#locations-filter_listbox")).toContainText(
      "Nepal, Bagmati Province",
    );
    await page.getByText("Nepal, Bagmati Province", { exact: true }).click();

    // await page.pause();

    await expect(
      page.getByRole("link", { name: "Senior Software QA Engineer (" }),
    ).toBeVisible();
    await page
      .getByRole("link", { name: "Senior Software QA Engineer (" })
      .click();
    await expect(page.locator("h1")).toContainText(
      "Senior Software QA Engineer (Automation Testing) - Fully Remote",
    );
    await expect(page.getByRole("banner")).toContainText(
      "Kathmandu, Bagmati Province, Nepal",
    );
    await expect(page.getByRole("banner")).toContainText("Remote");
  }

  async verifyDashboardImage() {
    const page = this.page;
    await page.goto(`${this.config.baseUrl}`);

    const heroImage = page.locator("#hero img");

    // Wait for the image to be visible
    await expect(heroImage).toBeVisible();

    // Check the image src attribute
    const imageSrc = await heroImage.getAttribute("src");
    expect(imageSrc).toBe(
      "https://covergo.com/wp-content/uploads/2024/05/0_0_homepage_header.webp",
    );

    const helper = new Helper();
    const isImageLoaded = helper.verifyImage(heroImage);

    expect(isImageLoaded).toBeTruthy();
  }
}
