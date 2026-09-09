 import { test, expect } from "@playwright/test";
 import { applyTheme, waitForPageReady } from "./helpers";
 
 test.describe("Component Pages Visual Regression", () => {
   test("renders Button component documentation and variants", async ({ page }, testInfo) => {
     const isDark = testInfo.project.name.includes("dark");
     await page.goto("/components/button");
     await waitForPageReady(page);
     await applyTheme(page, isDark ? "dark" : "light");
 
     const mainContent = page.locator("article");
     await expect(mainContent).toBeVisible();
     await expect(mainContent).toHaveScreenshot(`button-doc-${testInfo.project.name}.png`, {
       maxDiffPixelRatio: 0.08,
     });
   });
 
   test("renders Calendar component documentation", async ({ page }, testInfo) => {
     const isDark = testInfo.project.name.includes("dark");
     await page.goto("/components/calendar");
     await waitForPageReady(page);
     await applyTheme(page, isDark ? "dark" : "light");
 
     const mainContent = page.locator("article");
     await expect(mainContent).toBeVisible();
     await expect(mainContent).toHaveScreenshot(`calendar-doc-${testInfo.project.name}.png`, {
       maxDiffPixelRatio: 0.08,
     });
   });
 
   test("renders Dialog component documentation", async ({ page }, testInfo) => {
     const isDark = testInfo.project.name.includes("dark");
     await page.goto("/components/dialog");
     await waitForPageReady(page);
     await applyTheme(page, isDark ? "dark" : "light");
 
     const mainContent = page.locator("article");
     await expect(mainContent).toBeVisible();
     await expect(mainContent).toHaveScreenshot(`dialog-doc-${testInfo.project.name}.png`, {
       maxDiffPixelRatio: 0.08,
     });
   });
 
   test("renders navigation and layout properly across viewports", async ({ page }, testInfo) => {
     const isDark = testInfo.project.name.includes("dark");
     await page.goto("/components/badge");
     await waitForPageReady(page);
     await applyTheme(page, isDark ? "dark" : "light");
 
     // Top navigation header
     const header = page.locator("header").first();
     await expect(header).toBeVisible();
     await expect(header).toHaveScreenshot(`header-nav-${testInfo.project.name}.png`);
   });
 });
