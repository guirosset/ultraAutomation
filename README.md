# Ultra.io Project Introduction

## Introduction

### Get Started!
The purpose of this project is to run the full workflow for e-commerce purchases.
* This project contains a regression test suite that validates inputs, buttons, matching values, etc.
* This project is using [Cypress.io](https://www.cypress.io/) UI workflow automation.
* This project is using Postman CLI [Newman](https://github.com/postmanlabs/newman) library for API workflow automation
* This project is also using [Node.js](https://nodejs.org/en/) to run [Newman](https://github.com/postmanlabs/newman)

### Getting all set!
Required actions for running the project

* **Installing Node.js** Download the installer from [Node.js Download](https://nodejs.org/en/download/) website
* **Insttaling dependencies:** Open the terminal on project folder and run the `npm i` command
* **Installing Cypress:** This project has cypress dependency listed on [package.json](./package.json) but if necessary check the official [Cypress Documentation](https://docs.cypress.io/guides/getting-started/installing-cypress)
* **Installing Newman:** This project has Newman dependency listed on [package.json](./package.json) but if necessary check the official [Newman Documentation](https://support.postman.com/hc/en-us/articles/115003703325-How-to-install-Newman)

## Understanding the structure

<details>
 <summary>Folders and Files (click to expand)</summary>

* Tests are written on [cypress/e2e](./cypress/e2e)
* Commands are writen on [cypress/support](./cypress/support) commands files

```

//Example of a regular command

Cypress.Commands.add('assertText', (description, element, text) => {
  cy.get(element).invoke('text').should('eq', text)
  console.log(description)
})

```

* Locators are mapped on [cypress/support/locators](./cypress/support/locators)

```

//Example of a locator object 

export const cartLocators = {
  productContainer: "#inventory_container",
  productHeaderTitle: ".title",
  menuIcon: "#react-burger-menu-btn",
  hilowFilter: "[data-test='product_sort_container']",
  itemsFromCart: "[class='btn btn_primary btn_small btn_inventory']",
  cartBadgeIcon: ".shopping_cart_badge",
  cartIconContainer: "#shopping_cart_container",
  itemNames: ".inventory_item_name",
  cartTitle: ".title",
  checkoutButton: "[data-test='checkout']"
}

```

* Mocked json data files goes on [cypress/fixtures](./cypress/fixtures)
* General configuration and environment variables used for cypress runner goes on [cypress.config.js](./cypress.config.js)

```

//Example of base url and environment variables

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

```

</details>

## Running the tests!

<details>

 <summary>Steps to run</summary>

  * Running Api Automation: *run the `npm run apiAutomation` command*
  * Running Cypress Automation: *run the `npx cypress open` command*
    - select e2e option
    - choose your browser
    - run the [uiInitialTest.cy.js](./cypress/e2e/ui/uiInitialTest.cy.js)
</details>
