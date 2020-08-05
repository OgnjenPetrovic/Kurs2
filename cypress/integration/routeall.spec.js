import { EMAIL } from '../fixtures/constants'
import { authPage } from '../page_objects/login.page'
import { randomEmail } from '../utils/'

describe('Route all ', () => {

  beforeEach(() => {
    cy.server()
    cy.route('GET', Cypress.env('apiUrl') + '/my-galleries?page=1&term=').as('pera')
  });

  it('Wait for request to load ', () => {
    cy.loginBe('jelllenakrstic@gmail.com', 'jelenak1908')
    // cy.request('POST', Cypress.env('apiUrl') + '/auth/login', 
    // {"email":"zoomght@gmail.com","password":"sifrica1"})
    // .then((resp)=>{
    //     cy.log(resp.body.access_token)
    //     expect(resp.body).to.have.property('access_token')
    //     expect(resp.body).to.have.property('token_type')
    //     localStorage.setItem('token', resp.body.access_token)
        
    // })    
    cy.visit('/my-galleries')
    cy.wait('@pera')
    cy.get('@pera').
    its('response').then((resp)=> {
        cy.log(resp)
        for (var i=0 ; i < 10; i++) {
        let useCaseID = resp.body.galleries[i].id
        cy.request({
            method: 'DELETE',
            url: `${Cypress.env('apiUrl')}/galleries/${useCaseID}`,
            form: true,
            followRedirect: true,
            headers: {
                authorization: `Bearer ${window.localStorage.getItem('token')}`,
            }
        })
    }
    })
    })   
})