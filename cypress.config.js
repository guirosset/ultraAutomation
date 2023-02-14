const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com"
  },
  env: {
    loginCredential: "standard_user",
    passwordCredential: "secret_sauce",
    nameOfUser: "Jane",
    lastNameOfUser: "Doe",
    zipCodeOfUser: "Brazil"
  }
});
