 import { defineConfig, devices } from "@playwright/test";
 
 /**
  * Visual Regression Testing configuration for GalaUI
  * Tests component rendering across viewports (mobile, tablet, desktop) and themes (light, dark).
  */
 export default defineConfig({
   testDir: "./tests/visual",
   snapshotDir: "./tests/visual/__snapshots__",
   timeout: 30 * 1000,
   expect: {
     toHaveScreenshot: {
       maxDiffPixelRatio: 0.05,
       animations: "disabled",
     },
   },
   fullyParallel: true,
   forbidOnly: !!process.env.CI,
   retries: process.env.CI ? 2 : 0,
   workers: process.env.CI ? 1 : undefined,
   reporter: [["list"]],
   use: {
     baseURL: "http://127.0.0.1:5173",
     trace: "on-first-retry",
   },
   projects: [
     {
       name: "desktop-light",
       use: {
         ...devices["Desktop Chrome"],
         viewport: { width: 1280, height: 800 },
         colorScheme: "light",
       },
     },
     {
       name: "desktop-dark",
       use: {
         ...devices["Desktop Chrome"],
         viewport: { width: 1280, height: 800 },
         colorScheme: "dark",
       },
     },
     {
       name: "tablet-light",
       use: {
         viewport: { width: 768, height: 1024 },
         colorScheme: "light",
       },
     },
     {
       name: "mobile-light",
       use: {
         ...devices["Pixel 7"],
         viewport: { width: 375, height: 667 },
         colorScheme: "light",
       },
     },
     {
       name: "mobile-dark",
       use: {
         ...devices["Pixel 7"],
         viewport: { width: 375, height: 667 },
         colorScheme: "dark",
       },
     },
   ],
   webServer: {
     command: "npm run dev -- --host 127.0.0.1 --port 5173",
     url: "http://127.0.0.1:5173",
     reuseExistingServer: !process.env.CI,
     timeout: 60 * 1000,
   },
 });
