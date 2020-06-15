describe('Create Survey', () => {
    beforeEach(() => {
      cy.visit('http://192.168.1.14:8080/')
      cy.contains('Sign in').click()
      cy.get('#Username').type("Antoine123")
      cy.get('#Password').type("12345")
      cy.contains('Submit').click()
      cy.wait(300)
      cy.location().should((loc)=>{
        expect(loc.pathname).to.eq('/ListSuveys')
      })
      cy.wait(1000)
    })

      it('Edit the survey', () => {
        cy.contains('Result').click()
        const voteNum1 = cy.get('#1')
        cy.log(voteNum1)
    })

    /*it('Delete the survey', () => {
        cy.contains('Surveys List').click()
        cy.contains('Delete').click().then(() => {
            cy.get('.swal-title').contains('Are you sure to have to delete this survey?') 
            cy.get('.swal-button--confirm').click()
            cy.wait(1000)
               // cy.get('.swal-text').contains('The survey has been deleted.') 
                cy.get('.swal-button').click()
           
        })
    })*/
  
    })