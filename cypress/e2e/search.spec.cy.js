describe('looking for weather in a city', () => {
    
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/')
    })

    it('overlay with input should appear if search button is clicked', () => {
        cy.contains('Search').click()
        cy.get('input[placeholder="Where?"]').should('be.visible')
        cy.contains('Will be a Smiley Sky?').should('be.visible')
    })

    it('doing research will close overlay', () => {
        cy.contains('Search').click()
        cy.get('input[placeholder="Where?"]').type('ferrara')
        cy.contains('Will be a Smiley Sky?').click()
        cy.get('input[placeholder="Where?"]').should('not.be.visible')
    })

    it('hidden input set to city to search', () => {
        cy.contains('Search').click()
        cy.get('input[placeholder="Where?"]').type('ferrara')
        cy.contains('Will be a Smiley Sky?').click()
        cy.get('input[type="hidden"]').should('have.value', 'ferrara')
    })

    it('table compliled after research', () => {
        cy.contains('Search').click()
        cy.get('input[placeholder="Where?"]').type('ferrara')
        cy.contains('Will be a Smiley Sky?').click()
        cy.get('#day1').should('not.have.text', '')
        cy.get('#date1').should('not.have.text', '')
        cy.get('#day2Icon').should('not.have.attr', 'src', '')
        cy.get('#day3minT').should('not.have.text', '')
        cy.get('#day3maxT').should('not.have.text', '')
    })

  })