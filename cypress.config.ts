import { defineConfig } from "cypress";
import { BASE_LOCALHOST } from "./src/consts";

export default defineConfig({
  e2e: {
    baseUrl: BASE_LOCALHOST,
    viewportHeight: 900,
    viewportWidth: 1100,
    specPattern: "./cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
