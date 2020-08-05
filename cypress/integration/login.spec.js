import { EMAIL } from '../fixtures/constants'
import { authPage } from '../page_objects/login.page'
import { randomEmail } from '../utils/'

const faker = require('faker');


//let email = faker.internet.email();
let password = faker.internet.password();



describe('Login module', () => {

  before(() => {
    cy.visit('/')
  });

  beforeEach(() => {
    cy.visit('/')
    cy.get('.nav-link').contains('Login').click()
  });

  afterEach(() => {
    cy.visit('/')
  });

  after(() => {
    cy.visit('/')
  });
  // it.only('GA-19 : Login page layout ', () => {
  //   cy.visit('/')
  //   cy.get('.nav-link').contains('Login').click()
  //   cy.log(firstName)
  //   cy.get('#email').type(firstName)
  //   cy.get('form > :nth-child(2)').type(lastName)
  //   cy.get('[type=submit]').should('be.visible')   
  // })
  
  
  it.only('GA-28 : Login - valid data ', () => {
      authPage.login(randomEmail(),'sifrica1')
      cy.server()
      cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries')
      cy.wait('@galleries')
      // authPage.email.type(EMAIL.EXISTING)
      // authPage.password.type('sifrica1')
      // authPage.loginButton.click()
      // cy.wait(1000)
      cy.get('.nav-link').contains('Logout').should('be.visible')    
    })

    it('GA-22 : Login - invalid data - username ', () => {
        authPage.login(randomEmail(),'sifrica1')
        authPage.email.then(($input) => {
          expect($input[0].validationMessage).to.eq('Please include an \'@\' in the email address. \'test\' is missing an \'@\'.')
      })
        // cy.get('.alert').should('be.visible')
        //                 .should('have.text', 'Bad Credentials')
        //                 .should('have.class', 'alert')
    })

    it('GA-25 : Login - invalid data - password ', () => {
        authPage.login('test','sifrica1')
        // authPage.email.type('zoomght@gmail.com')
        // authPage.password.type(password)
        // authPage.loginButton.click()
        cy.get('.alert').should('be.visible')
                        .should('have.text', 'Bad Credentials')
                        .should('have.class', 'alert')
    })
})