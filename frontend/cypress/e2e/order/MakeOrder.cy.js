describe('Make Order', () => {
    it('passes', () => {
        cy.visit('http://localhost:3090')

        const username = "MyNewUsername";
        const pwd = "MyNewPassword";
        cy.visit('http://localhost:3090/login')
        cy.get('input[name=username]').type(username)

        cy.get('input[name=password]').type(`${pwd}{enter}`)

        cy.url().should('include', 'http://localhost:3090/').wait(200).then(() => {
                cy.visit('http://localhost:3090/games').wait(100).then(() => {
                    cy.get('.videogameCard')
                        .eq(0)
                        .click()

                    cy.get('.buyGameButton')
                        .eq(1)
                        .click()

                    cy.visit('http://localhost:3090/cart/46').wait(100).then(() => {
                        cy.get('.arrowCartButton')
                            .eq(1)
                            .click()

                        cy.get('.arrowCartButton')
                            .eq(0)
                            .click()
                        
                        cy.get('.cartButton')
                            .click()
                    })
                })


            }
        );
    })
})