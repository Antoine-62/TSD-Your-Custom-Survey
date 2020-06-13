describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('http://192.168.1.14:8080/')
  })
  
    it('Visits Your Custom Survey', () => {
      cy.contains('YCS') 
      
    })

    it('Log in without enter credentials', () => {
      cy.contains('Sign in').click()
      cy.contains('Submit').click().then(() => {
        cy.get('.error-message')
      })
      //We enter the username only
      cy.get('#Username').type("lolo")
      cy.contains('Submit').click().then(() => {
        cy.get('.error-message')
      })

      //We enter the password only
      cy.get('#Username').clear()
      cy.get('#Password').type("lolo")
      cy.contains('Submit').click().then(() => {
        cy.get('.error-message')
      })

    })

    it('Log in with wrong username', () => {
      cy.contains('Sign in').click()
      cy.get('#Username').type("lolo")
      cy.get('#Password').type("lolo")
      cy.contains('Submit').click().then(() => {
        cy.get('.swal-text').contains('The username is wrong') 
        cy.get('.swal-button').click()
      })
      
    })

    it('Log in with wrong password', () => {
      cy.contains('Sign in').click()
      cy.get('#Username').type("lolo2")
      cy.get('#Password').type("lolo")
      cy.contains('Submit').click().then(() => {
        cy.get('.swal-text').contains('The password is wrong') 
        cy.get('.swal-button').click()
      })

    })

    it('Log in with proper credentials', () => {
      cy.contains('Sign in').click()
      cy.get('#Username').type("Antoine123")
      cy.get('#Password').type("12345")
      cy.contains('Submit').click()
      cy.location().should((loc)=>{
        expect(loc.pathname).to.eq('/ListSuveys')
      })
      cy.contains('Surveys List') 
      cy.visit('http://192.168.1.14:8080/')
      cy.location().should((loc)=>{
        expect(loc.pathname).to.eq('/ListSuveys')
      })
    })
    
  })