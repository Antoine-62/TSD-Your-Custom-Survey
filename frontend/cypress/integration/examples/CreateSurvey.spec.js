describe('Create Survey', () => {
    beforeEach(() => {
      cy.visit('http://192.168.1.14:8080/')
      cy.contains('Sign in').click()
      cy.get('#Username').type("lolo2")
      cy.get('#Password').type("toto123")
      cy.contains('Submit').click()
      cy.location().should((loc)=>{
        expect(loc.pathname).to.eq('/ListSuveys')
      })
      cy.contains('Create a Survey').click()
      cy.location().should((loc)=>{
        expect(loc.pathname).to.eq('/CreateSurvey')
      })
    })
    
    /*  it('Submit witout enter parameter', () => {
        cy.get("form").submit().then(() => {
            cy.get('.error-message')
          })
        cy.get('#name').type("unit test").should("have.value","unitTest");
        cy.get("form").submit().then(() => {
            cy.get('.error-message')
          })
        cy.get('#name').clear().should("have.value","");
        cy.get('#Category').select('Health').should("have.value","Health");
        cy.get("form").submit().then(() => {
            cy.get('.error-message')
          })
        
      })

      it('Submit to create new survey with proper parameter', () => {
        cy.get('#Category').select('Health').should("have.value","Health");
        cy.get('#name').type("unitTest").should("have.value","unitTest");
        cy.get("form").submit().then(() => {
            cy.location().should((loc)=>{
                expect(loc.pathname).to.eq('/CreateQuestion/Health/unitTest')
              })
          })
        
      })

      it('Submit to create new question without parameter', () => {
        cy.get('#Category').select('Health').should("have.value","Health");
        cy.get('#name').type("unitTest").should("have.value","unitTest");
        cy.get("form").submit().then(() => {
            cy.location().should((loc)=>{
                expect(loc.pathname).to.eq('/CreateQuestion/Health/unitTest')
              })
          })
          cy.contains('unitTest')
          cy.contains('Health')
          cy.get("form").submit().then(() => {
            cy.get('.error-message')
          })
          cy.get('#statement').type("Do you think it's a unit test?").should("have.value","Do you think it's a unit test?");
          cy.get("form").submit().then(() => {
            cy.get('.error-message')
          })
          cy.get('#Answer1').type("Yes").should("have.value","Yes");
          cy.get("form").submit().then(() => {
            cy.get('.error-message')
          })
          cy.get('#Answer2').type("No").should("have.value","No");
          cy.get("form").submit().then(() => {
            cy.get('.error-message')
          })

          cy.get('#answerType1').check()
          cy.get('#Answer1').clear().should("have.value","");
          cy.get("form").submit().then(() => {
            cy.get('.error-message')
          })
          cy.contains("Save Survey").click().then(() => {
            cy.get('.error-message')
          })
        
        
      })*/

      it('Create Survey with 2 questions', () => {
        cy.get('#Category').select('Health').should("have.value","Health");
        cy.get('#name').type("unitTest").should("have.value","unitTest");
        cy.get("form").submit().then(() => {
            cy.location().should((loc)=>{
                expect(loc.pathname).to.eq('/CreateQuestion/Health/unitTest')
              })
          })
          cy.contains('unitTest')
          cy.contains('Health')
          cy.get('#statement').type("Do you think it's a unit test?").should("have.value","Do you think it's a unit test?");
          cy.get('#Answer1').type("Yes").should("have.value","Yes");
          cy.get('#Answer2').type("No").should("have.value","No");
          cy.get('#answerType1').check()
          cy.get("form").submit().then(() => {
            cy.location().should((loc)=>{
                expect(loc.pathname).to.eq('/CreateQuestion/Health/unitTest')
              })  
              cy.get('#statement').should("have.value","");
              cy.get('#Answer1').should("have.value","");
              cy.get('#Answer2').should("have.value","");
          })
          cy.get('#answerType2').check()
          cy.get('#statement').type("Right now, are you hungry?").should("have.value","Right now, are you hungry?");
          cy.get('#Answer1').type("Yes").should("have.value","Yes");
          cy.get('#Answer2').type("No").should("have.value","No");
          cy.get('#Answer3').type("A little").should("have.value","A little");
          cy.contains("Save Survey").click().then(() => {
            cy.get('.swal-title').contains('Survey Created!') 
            cy.get('.swal-button').click()
            cy.location().should((loc)=>{
                expect(loc.pathname).to.eq('/ListSuveys')
              })
          })
      })

    it('Delete the survey', () => {
        cy.contains('Surveys List').click()
        cy.contains('Delete').click().then(() => {
            cy.get('.swal-title').contains('Are you sure to have to delete this survey?') 
            cy.get('.swal-button--confirm').click()
            cy.wait(1000)
               // cy.get('.swal-text').contains('The survey has been deleted.') 
                cy.get('.swal-button').click()
           
        })
    })
  
    })