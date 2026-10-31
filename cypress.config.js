const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportPageTitle: "Automation Exercise - Relatório de Testes",
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  retries: {
    openMode: 0,
    runMode: 2
  },
  e2e: {
    baseUrl: `https://automationexercise.com`,
    watchForFileChanges: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    pageLoadTimeout: 60000,
    specPattern: "e2e/automation-exercise-modules.cy.js",

    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});
