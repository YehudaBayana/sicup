import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    browserName: "chromium", // You can also test with 'firefox' or 'webkit'
    headless: true,
  },
});
