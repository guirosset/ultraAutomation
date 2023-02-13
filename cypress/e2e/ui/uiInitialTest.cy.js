import { cartLocators } from '../../support/locators/cartLocators';
import { homeLocators } from '../../support/locators/homeLocators'

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
    cy.checkIfElementIsPresent('checking if product container exist',`${cartLocators.productContainer}`)
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
    cy.get('#react-burger-menu-btn').should('be.visible')
    cy.get('.inventory_item_name').eq(0).should('be.visible');
    cy.get('.inventory_item_name').eq(1).should('be.visible');
    cy.get('.title').invoke('text').should('eq', 'Your Cart')
    cy.get('.shopping_cart_badge').invoke('text').should('eq', '2')

    //preenchendo dados
    cy.get('#react-burger-menu-btn').should('be.visible')
    cy.get('[data-test="checkout"]').should('be.visible').click()
    cy.get('[data-test="firstName"]').type('Guilherme')
    cy.get('[data-test="lastName"]').type('Jullyano')
    cy.get('[data-test="postalCode"]').type('Brazil')

    //finalizando pedido
    cy.get('#react-burger-menu-btn').should('be.visible')
    cy.get('.title').invoke('text').should('eq', 'Checkout: Your Information')
    cy.get('[data-test="continue"]').should('be.visible').click()

    cy.get('[data-test="finish"]').should('be.visible').click()

    //assert message
    cy.get('#react-burger-menu-btn').should('be.visible')
    cy.get('.title').invoke('text').should('eq', 'Checkout: Complete!')
    cy.get('.complete-header').invoke('text').should('eq', 'THANK YOU FOR YOUR ORDER')
    cy.get('.complete-text').invoke('text').should('eq', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
    cy.get('.pony_express').should('be.visible')
  })

})