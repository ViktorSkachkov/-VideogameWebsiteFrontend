describe('Add', () => {
  it('passes', () => {
    cy.visit('http://localhost:3090')

    const username = "username1";
    const pwd = "password";
    cy.visit('http://localhost:3090/login')
    cy.get('input[name=username]').type(username)

    cy.get('input[name=password]').type(`${pwd}{enter}`)

    cy.url().should('include', 'http://localhost:3090/').wait(100).then(() => {
          cy.visit('http://localhost:3090/games')

          cy.visit('http://localhost:3090/addVideogame').wait(100).then(() => {

              const file = "wow.jpg"
              const name = "SomeName"
              const description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
              const price = 35.0;

              cy.get('input[name="name"]').type(name)

              cy.get('textarea[name="description"]').type(`${description}`)

              cy.get('input[name="price"]').type(`${price}`)

             /* cy.fixture('wow.jpg').then(fileContent => {
                  cy.get('input[type="file"]').attachFile({
                      fileContent: fileContent.toString(),
                      fileName: 'wow.jpg',
                      mimeType: 'image/jpg'
                  });
              })*/

              cy.get('.normalButton')
                  .click()
          })
        }
    );
  })
})