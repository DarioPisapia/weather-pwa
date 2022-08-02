describe ('intercepting api request and doing test on response', () => {

    beforeEach(() => {
        cy.intercept('GET', 'http://api.weatherapi.com/v1/forecast.json?key=ee89cb73dd414cecb5a190207221707&q=salerno&days=3&aqi=no&alerts=no', {fixture:'intercept.json'}).as('mock')
        cy.visit('http://127.0.0.1:5500/')
    })

    it('intercept api response and give mocked one', () => {
        cy.contains('Search').click()
        cy.get('input[placeholder="Where?"]').type('salerno')
        cy.contains('Will be a Smiley Sky?').click()
        cy.get('#day1minT').should('have.text', '21.4 °')
        cy.get('#day2Icon').should('have.attr', 'src', '//cdn.weatherapi.com/weather/64x64/day/302.png')
        cy.get('#day3maxT').should('have.text', '39.7 °')
    })
})