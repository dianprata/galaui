 import { type Page } from "@playwright/test";
 
 /**
  * Apply dark or light theme explicitly to the page
  */
 export async function applyTheme(page: Page, theme: "light" | "dark") {
   await page.evaluate((mode) => {
     localStorage.setItem("galaui-theme", mode);
     if (mode === "dark") {
       document.documentElement.classList.add("dark");
     } else {
       document.documentElement.classList.remove("dark");
     }
   }, theme);
   // Small delay to ensure CSS transition / styles settle
   await page.waitForTimeout(150);
 }
 
 /**
  * Wait for web fonts and main layout to stabilize before snapshot
  */
export async function waitForPageReady(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForSelector("article, main, section", { timeout: 15000 });
  await page.evaluate(async () => {
    await document.fonts?.ready;
  });
   await page.waitForTimeout(200);
 }
