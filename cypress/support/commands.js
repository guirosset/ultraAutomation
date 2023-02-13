Cypress.Commands.add('typeOnElement', (description, element, text) => {
  cy.get(element).should('be.visible').click().type(text)
  console.log(description)
})

Cypress.Commands.add('clickOnElement', (description, element) => {
  cy.get(element).should('be.visible').click()
  console.log(description)
})

Cypress.Commands.add('checkIfElementIsPresent', (description, element) => {
  cy.get(element).should('be.visible')
  console.log(description)
})

Cypress.Commands.add('assertText', (description, element, text) => {
  cy.get(element).invoke('text').should('eq', text)
  console.log(description)
})

Cypress.Commands.add('selectElement', (description, element, option) => {
  cy.get(element).select(option)
  console.log(description)
})

Cypress.Commands.add('clickOnElementByOcurrence', (description, element, index) => {
  cy.get(element).eq(index).should('be.visible').click()
  console.log(description)
})