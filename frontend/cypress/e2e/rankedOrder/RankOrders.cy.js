describe('Rank Orders', () => {
    it('passes', () => {
            cy.visit('http://localhost:3090')

            const username = "username1";
            const pwd = "password";
            cy.visit('http://localhost:3090/login')
            cy.get('input[name=username]').type(username)

            cy.get('input[name=password]').type(`${pwd}{enter}`)

            cy.url().should('include', 'http://localhost:3090/').wait(100).then(() => {
                    cy.visit('http://localhost:3090/rankOrders').wait(100).then(() => {
                    })
                  }
                )
            }
        )
    }
)