import { checkValue } from '../support/externalCommands'

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

Cypress.Commands.add('checkIfElementIsPresentIndex', (description, element, index) => {
  cy.get(element).eq(index).should('be.visible')
  console.log(description)
})

Cypress.Commands.add('checkIfTheSumOfTheItemsAreShownCorrectly', (description, el1, el2, el3, el4, el5) => {
  let priceEl1 = cy.get(el1).eq(0).invoke('text').then(($text) => {
    let priceOfElement1 = Number($text.substring(1))
    cy.get(el2).eq(1).invoke('text').then(($text2) => {
      let priceOfElement2 = Number($text2.substring(1))
      cy.get(el3).invoke('text').then(($text3) => {
        let itemTotalValue = Number($text3.substring(13))
        checkValue(priceOfElement1, priceOfElement2, itemTotalValue)
        cy.get(el4).invoke('text').then(($text4) => {
          let taxValue = Number($text4.substring(6))
          cy.get(el5).invoke('text').then(($text5) => {
            let totalValue = Number($text5.substring(8))
            let roundedItemTotalValue = Number(itemTotalValue.toFixed(2))
            checkValue(roundedItemTotalValue, taxValue, totalValue)
          })
        })
      })
    })
  })
})