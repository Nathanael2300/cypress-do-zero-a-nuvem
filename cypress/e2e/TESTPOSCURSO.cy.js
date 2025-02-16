describe('Testando a aplicação "CAC TAT"', () => {
    beforeEach(() => {
        cy.visit('/src/index.html')
    })
    it('Prencha os dados necessarios e envie o formulario', () => {
        const firstName = "Natahael"
        const lastName = "Henrique Souza Nunes"
        const Email = "nathanaeltesth@gmail.com"

        cy.get('#firstName').type(firstName) 
        cy.get('#lastName').type(lastName)
        cy.get('#email').type(Email)

        cy.get('#product')
        .select('Cursos')
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        cy.get('input[type="checkbox"][value="email"')
        .check()
        
        const feedback = "Ótima ferramenta, gostei muito!!!"
        cy.get('#open-text-area').type(feedback)


        cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json')
        .should(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })

        cy.get('.button').click()
    });
});