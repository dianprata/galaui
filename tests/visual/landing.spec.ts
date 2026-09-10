 import { test, expect } from "@playwright/test";
 import { applyTheme, waitForPageReady } from "./helpers";
 
 test.describe("Landing Page Visual Regression", () => {
   test("renders landing page hero correctly", async ({ page }, testInfo) => {
     const isDark = testInfo.project.name.includes("dark");
     await page.goto("/");
     await waitForPageReady(page);
     await applyTheme(page, isDark ? "dark" : "light");
 
     const hero = page.locator("section").first();
     await expect(hero).toBeVisible();
     await expect(hero).toHaveScreenshot(`landing-hero-${testInfo.project.name}.png`);
   });
 });
