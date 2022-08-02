describe ('get local weahter', () => {

    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/')
    })

    it('go to loading page', () => {
        cy.get('#currentPositionButton').click()
        cy.get('#overlay').should('be.visible')
    })

    it('automatically return to main page after loading data', () => {
        cy.get('#currentPositionButton').click()
        cy.get('#overlay').should('be.visible')
        cy.intercept('*/v1/**').as('apiReq')
        cy.wait('@apiReq', {timeout:10000})
        cy.get('#overlay').should('not.be.visible')
    })

    it('table is filled with data', () => {
        cy.get('#currentPositionButton').click()
        cy.get('#day2').should('not.have.text', '')
        cy.get('#date3').should('not.have.text', '')
        cy.get('#day1Icon').should('not.have.attr', 'src', '')
        cy.get('#day1minT').should('not.have.text', '')
        cy.get('#day2maxT').should('not.have.text', '')

    })
})