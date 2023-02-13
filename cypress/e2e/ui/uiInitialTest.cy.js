import { cartLocators } from '../../support/locators/cartLocators';
import { homeLocators } from '../../support/locators/homeLocators';
import { formLocators } from '../../support/locators/formLocators';
import { checkoutCompleteLocators } from '../../support/locators/checkoutCompleteLocators';

context('initial test', () => {

  beforeEach('visiting home', () => {
    if (window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          registration.unregister();
        });
      });
    }
  });

  it('happy path', () => {
    cy.visit('/')
    cy.checkIfElementIsPresent('checking if logo exist', `${homeLocators.headerLogo}`)
    cy.checkIfElementIsPresent('checking if robot logo exist', `${homeLocators.robotLogo}`)
    cy.typeOnElement('typing the username', `${homeLocators.loginInput}`, Cypress.env('loginCredential'))
    cy.typeOnElement('typing the password', `${homeLocators.passwordInput}`, Cypress.env('passwordCredential'))
    cy.clickOnElement('clicking on Login button', `${homeLocators.loginButton}`)

    //comprando
    cy.checkIfElementIsPresent('checking if product container exist', `${cartLocators.productContainer}`)
    cy.assertText('asserting text from cart title', `${cartLocators.productHeaderTitle}`, 'Products')
    cy.checkIfElementIsPresent('checking if menu icon exist', `${cartLocators.menuIcon}`)
    cy.selectElement('Filtering price low to high', `${cartLocators.hilowFilter}`, 'hilo')
    cy.clickOnElementByOcurrence('clicking on first element from cart', `${cartLocators.itemsFromCart}`, 0)
    cy.assertText('checking if badge of the cart matches with added items', `${cartLocators.cartBadgeIcon}`, '1')
    cy.selectElement('Filtering price high to low', `${cartLocators.hilowFilter}`, 'lohi')
    cy.clickOnElementByOcurrence('clicking on first element from cart', `${cartLocators.itemsFromCart}`, 0)
    cy.assertText('checking if badge of the cart matches with added items', `${cartLocators.cartBadgeIcon}`, '2')
    cy.clickOnElement('clicking on cart container', `${cartLocators.cartIconContainer}`)

    //verificando items no carrinho
    cy.checkIfElementIsPresent('checking if menu icon exist', `${cartLocators.menuIcon}`)
    cy.checkIfElementIsPresentIndex('checking if item added on the car exist', `${cartLocators.itemNames}`, 0)
    cy.checkIfElementIsPresentIndex('checking if item added on the car exist', `${cartLocators.itemNames}`, 1)
    cy.assertText('Asserting cart title text', `${cartLocators.cartTitle}`, 'Your Cart')
    cy.assertText('Asserting badge value', `${cartLocators.cartBadgeIcon}`, '2')
    cy.clickOnElement('clicking on checkout button', `${cartLocators.checkoutButton}`)

    //preenchendo dados
    cy.checkIfElementIsPresent('checking if menu icon exist', `${cartLocators.menuIcon}`)
    cy.typeOnElement('typing the username', `${formLocators.firstName}`, Cypress.env('nameOfUser'))
    cy.typeOnElement('typing the username', `${formLocators.lastName}`, Cypress.env('lastNameOfUser'))
    cy.typeOnElement('typing the username', `${formLocators.zipCode}`, Cypress.env('zipCodeOfUser'))
    cy.checkIfElementIsPresent('checking if menu icon exist', `${formLocators.menuIcon}`)
    cy.assertText('Asserting title text', `${formLocators.checkoutTitle}`, 'Checkout: Your Information')
    cy.clickOnElement('clicking on continue button', `${formLocators.continueButton}`)
    cy.checkIfTheSumOfTheItemsAreShownCorrectly('', `${formLocators.inventoryItemsPrice}`, `${formLocators.inventoryItemsPrice}`, `${formLocators.subtotalLabel}`, `${formLocators.taxesLabel}`, `${formLocators.totalLabel}`)
    cy.clickOnElement('clicking on finish button', `${formLocators.finishButton}`)

    //finalizando pedido
    //assert message
    cy.checkIfElementIsPresent('checking if menu icon exist', `${checkoutCompleteLocators.menuIcon}`)
    cy.assertText('Asserting title text', `${checkoutCompleteLocators.checkoutTitle}`, 'Checkout: Complete!')
    cy.assertText('Asserting title text', `${checkoutCompleteLocators.completeHeader}`, 'THANK YOU FOR YOUR ORDER')
    cy.assertText('Asserting title text', `${checkoutCompleteLocators.completeText}`, 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
    cy.checkIfElementIsPresent('checking if ponny logo exist', `${checkoutCompleteLocators.ponnyExpressLogo}`)
  })

})